"use client";
import ProfileImage from './ProfileImage';
import { createPortal } from 'react-dom';
import { CSSProperties, FormEvent, useEffect, useRef, useState } from 'react';
import { platformLabels, ProfileAppearance } from '@/lib/profile-appearance';

async function prepareImage(file: File,kind: 'avatar'|'banner') {
  const animated=file.type==='image/gif';
  if (!['image/jpeg','image/png','image/gif'].includes(file.type) || file.size > 10 * 1024 * 1024) throw new Error('JPG, PNG o GIF: hasta 10 MB por imagen.');
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image(); image.src = url; await image.decode();
    if(animated){
      if(image.naturalWidth>4096||image.naturalHeight>4096||image.naturalWidth*image.naturalHeight>4000000)throw new Error('Reduce la resolución del GIF antes de subirlo.');
      const canvas=document.createElement('canvas'),scale=Math.min(1,640/image.naturalWidth,320/image.naturalHeight);
      canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
      const context=canvas.getContext('2d');if(!context)throw new Error('No se pudo preparar el GIF.');
      context.drawImage(image,0,0,canvas.width,canvas.height);
      let poster=canvas.toDataURL('image/jpeg',.7);
      if(poster.length>87500)poster=canvas.toDataURL('image/jpeg',.35);
      if(poster.length>87500)throw new Error('Reduce la resolución del GIF antes de subirlo.');
      const data=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(new Error('No se pudo leer el GIF.'));reader.readAsDataURL(file);});
      return {data,poster};
    }
    if (image.naturalWidth * image.naturalHeight > 40000000) throw new Error('La imagen tiene demasiados píxeles. Usa una versión más pequeña.');
    const width = kind === 'avatar' ? 512 : 1600, height = kind === 'avatar' ? 512 : 560;
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('No se pudo procesar la imagen.');
    // Center crop and re-encode: bounded static images, without embedded metadata or animation.
    const scale = Math.max(width/image.naturalWidth,height/image.naturalHeight);
    ctx.drawImage(image,(width-image.naturalWidth*scale)/2,(height-image.naturalHeight*scale)/2,image.naturalWidth*scale,image.naturalHeight*scale);
    const data = canvas.toDataURL('image/jpeg',.84);
    if (data.length > 1400000) throw new Error('La imagen es demasiado grande. Usa una versión más pequeña.');
    return {data,poster:null};
  } finally { URL.revokeObjectURL(url); }
}

export default function ProfileEditor({initial,fallback,onClose,onSaved}:{initial:ProfileAppearance;fallback:{name:string;avatar:string|null};onClose:()=>void;onSaved:(value:ProfileAppearance)=>void}) {
  const [draft,setDraft] = useState(() => structuredClone(initial));
  const [images,setImages] = useState<Partial<Record<'avatar'|'banner',string|null>>>({});
  const [posters,setPosters] = useState<Partial<Record<'avatar'|'banner',string|null>>>({});
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const [progress,setProgress] = useState('');
  const [processing,setProcessing] = useState(false);
  const [previewExpanded,setPreviewExpanded] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const alive = useRef(true);
  const update = <K extends keyof ProfileAppearance>(key:K,value:ProfileAppearance[K]) => setDraft(current => ({...current,[key]:value}));
  const premiumMedia=initial.premiumMedia === true;
  useEffect(() => {
    alive.current = true; closeButton.current?.focus({preventScroll:true});
    const root = document.documentElement,previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {alive.current = false;root.style.overflow = previous;};
  },[]);
  async function upload(file:File|undefined,kind:'avatar'|'banner') {
    if (!file) return;
    if (!premiumMedia && (kind==='banner'||file.type==='image/gif')) {setError('Necesitas una licencia activa de Zentux para usar banners o avatares GIF.');return;}
    setError('');setProcessing(true);
    try { const {data,poster} = await prepareImage(file,kind); if (alive.current) {setImages(current => ({...current,[kind]:data}));setPosters(current => ({...current,[kind]:poster}));update(kind,data);} }
    catch (failure) {if (alive.current) setError(failure instanceof Error ? failure.message : 'No se pudo leer la imagen.');}
    finally {if (alive.current) setProcessing(false);}
  }
  async function save(event:FormEvent) {
    event.preventDefault();setBusy(true);setError('');
    try {
      const appearance = {displayName:draft.displayName,status:draft.status,bio:draft.bio,accent:draft.accent,nameStyle:draft.nameStyle,decoration:draft.decoration,frame:draft.frame,links:draft.links};
      const prepared: Partial<Record<'avatar'|'banner',string|null|{uploadId:string}>>={...images};
      for(const kind of ['avatar','banner'] as const){
        const value=images[kind];
        if(!value?.startsWith('data:image/gif;'))continue;
        const encoded=value.slice(value.indexOf(',')+1),size=encoded.length/4*3-(encoded.endsWith('==')?2:encoded.endsWith('=')?1:0);
        const send=async(body:Record<string,unknown>)=>{
          const response=await fetch('/api/account/appearance/upload',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
          const data=await response.json();if(!response.ok)throw new Error(data.error||'No se pudo subir el GIF. Vuelve a guardar para reintentar.');
          return data.appearance as {uploadId:string;offset:number};
        };
        const started=await send({action:'start',kind,size});let offset=0;
        for(let position=0;position<encoded.length;position+=1048576){
          setProgress(`Subiendo ${kind==='avatar'?'avatar':'banner'}… ${Math.round(position/encoded.length*100)} %`);
          const result=await send({action:'chunk',kind,uploadId:started.uploadId,offset,chunk:encoded.slice(position,position+1048576)});
          offset=result.offset;
        }
        prepared[kind]={uploadId:started.uploadId};
      }
      setProgress('Guardando…');
      const response = await fetch('/api/account/appearance',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({appearance,images:prepared,posters}),signal:AbortSignal.timeout(30000)});
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo guardar el perfil.');
      if (alive.current) onSaved(data.appearance);
    } catch (failure) {if (alive.current) setError(failure instanceof Error ? failure.message : 'No se pudo guardar el perfil.');}
    finally {if (alive.current) {setBusy(false);setProgress('');}}
  }
  const previewAvatar = draft.avatar || fallback.avatar || '/icon-48.png';
  return createPortal(<div className="profile-editor-overlay" onPointerDown={event => {if (event.target === event.currentTarget && !busy && !processing) onClose();}}>
    <div ref={dialog} className="profile-editor" role="dialog" aria-modal="true" aria-labelledby="profile-editor-title" style={{'--profile-accent':draft.accent} as CSSProperties} onKeyDown={event => {
      event.stopPropagation();
      if (event.key === 'Escape' && !busy && !processing) {event.preventDefault();onClose();}
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialog.current!.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),a[href]')).filter(element => element.getClientRects().length > 0);
      const first = controls[0],last = controls[controls.length-1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last?.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first?.focus();}
    }}>
      <aside className="profile-editor-preview"><p className="profile-editor-eyebrow">Así verán tu perfil en el chat</p>
        <button type="button" className="profile-preview-toggle" aria-expanded={previewExpanded} aria-controls="profile-editor-preview-body" onClick={() => setPreviewExpanded(value => !value)}>Vista previa de tu tarjeta {previewExpanded ? '▴' : '▾'}</button>
        <div id="profile-editor-preview-body" className={`profile-preview-body${previewExpanded ? ' is-open' : ''}`}>
        <div className={`profile-preview-card profile-frame-${draft.frame}${premiumMedia ? '' : ' profile-no-premium-media'}`}>
          {premiumMedia && <div className="profile-preview-banner">{draft.banner && <ProfileImage src={draft.banner} stillPreview={posters.banner || undefined} alt="Vista previa del banner" fill sizes="380px" />}</div>}
          <div className="profile-preview-content"><ProfileImage allowAnimation={premiumMedia} src={previewAvatar} stillPreview={posters.avatar || undefined} alt="Vista previa del avatar" width={86} height={86} className={`profile-preview-avatar profile-decoration-${draft.decoration}`} />
            {draft.status && <p className="profile-status">{draft.status}</p>}
            <h2 className={`profile-name-${draft.nameStyle}`}>{draft.displayName || fallback.name}</h2>
            <p className="profile-preview-username">{fallback.name} · Zentux.gg</p>
            {draft.bio && <p className="profile-bio">{draft.bio}</p>}
            <div className="profile-links">{draft.links.filter(link => link.public && link.url).map(link => <span key={link.platform}>{platformLabels[link.platform]}</span>)}</div>
          </div>
        </div>
        <p className="profile-editor-note">Tu identidad de Discord y tus insignias oficiales se mantienen. Las licencias y los pagos nunca aparecen en esta tarjeta.</p>
        </div>
      </aside>
      <form onSubmit={save} className="profile-editor-form">
        <div className="profile-editor-heading"><div><p className="profile-editor-eyebrow">TU IDENTIDAD EN ZENTUX</p><h2 id="profile-editor-title">Editar perfil</h2></div><button ref={closeButton} type="button" aria-label="Cerrar editor" disabled={busy || processing} onClick={onClose}>×</button></div>
        <fieldset disabled={busy || processing}>
          <legend>Avatar y banner</legend>
          <div className="profile-image-options">{(['avatar','banner'] as const).map(kind => <div key={kind}>
            <label className="profile-upload">{kind === 'avatar' ? 'Cambiar avatar' : 'Cambiar banner'}<input aria-label={kind === 'avatar' ? 'Subir avatar' : 'Subir banner'} type="file" disabled={kind==='banner'&&!premiumMedia} accept={premiumMedia ? 'image/png,image/jpeg,image/gif' : 'image/png,image/jpeg'} onChange={event => {void upload(event.target.files?.[0],kind);event.target.value='';}} /></label>
            <button type="button" className="profile-reset-image" onClick={() => {setImages(current => ({...current,[kind]:null}));update(kind,null);}}>{kind === 'avatar' ? 'Usar avatar de Discord' : 'Quitar banner personalizado'}</button>
          </div>)}</div>
          <p className="profile-editor-note">{premiumMedia ? 'JPG y PNG: hasta 10 MB, con recorte y optimización. GIF animados: hasta 10 MB por avatar o banner; conservan su animación. Con movimiento reducido se muestra una imagen estática.' : 'Puedes usar un avatar JPG o PNG de hasta 10 MB. Los banners y los avatares GIF requieren una licencia activa de Zentux. Sin licencia activa no se muestra ningún banner, incluido el de Discord.'}</p>
          <label>Nombre para mostrar<input maxLength={32} value={draft.displayName} placeholder={fallback.name} onChange={event => update('displayName',event.target.value)} /><small>{draft.displayName.length}/32 · No cambia tu usuario de Discord.</small></label>
          <label>Estado personalizado<input maxLength={120} value={draft.status} placeholder="Tu frase, con emojis si quieres" onChange={event => update('status',event.target.value)} /><small>{draft.status.length}/120</small></label>
          <label>Acerca de mí<textarea rows={3} maxLength={300} value={draft.bio} placeholder="Cuéntale algo a la comunidad" onChange={event => update('bio',event.target.value)} /><small>{draft.bio.length}/300</small></label>
          <label>Color del perfil</label><div className="profile-color-options">{['#a855f7','#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#ec4899','#d4d4d8'].map(color => <button key={color} type="button" aria-label={`Color ${color}`} aria-pressed={draft.accent === color} style={{background:color}} onClick={() => update('accent',color)} />)}</div>
          <div className="profile-style-options">
            <label>Estilo del nombre<select value={draft.nameStyle} onChange={event => update('nameStyle',event.target.value as ProfileAppearance['nameStyle'])}><option value="plain">Clásico</option><option value="glow">Brillo suave</option><option value="serif">Elegante</option></select></label>
            <label>Decoración del avatar<select value={draft.decoration} onChange={event => update('decoration',event.target.value as ProfileAppearance['decoration'])}><option value="none">Sin decoración</option><option value="ring">Anillo de color</option><option value="halo">Halo suave</option></select></label>
            <label>Marco del perfil<select value={draft.frame} onChange={event => update('frame',event.target.value as ProfileAppearance['frame'])}><option value="none">Discreto</option><option value="outline">Borde de color</option><option value="gradient">Doble tono</option></select></label>
          </div>
        </fieldset>
        <fieldset disabled={busy || processing}><legend>Enlaces de tus perfiles</legend><p className="profile-editor-note">Añade tus enlaces y elige cuáles mostrar. Estos enlaces no verifican ni conectan tu cuenta.</p>
          {Object.entries(platformLabels).map(([platform,label]) => {
            const link = draft.links.find(item => item.platform === platform);
            return <div className="profile-link-editor" key={platform}><label>{label}<input type="url" maxLength={300} placeholder={platform === 'steam' ? 'https://steamcommunity.com/id/tuusuario' : platform === 'spotify' ? 'https://open.spotify.com/user/tuusuario' : platform === 'roblox' ? 'https://www.roblox.com/users/123/profile' : 'https://profile.playstation.com/tuusuario'} value={link?.url || ''} onChange={event => {
              const rest = draft.links.filter(item => item.platform !== platform);
              update('links',event.target.value ? [...rest,{platform,url:event.target.value,public:link?.public || false}] : rest);
            }} /></label><label className="profile-link-public"><input type="checkbox" checked={link?.public || false} disabled={!link?.url} onChange={event => update('links',draft.links.map(item => item.platform === platform ? {...item,public:event.target.checked} : item))} />Mostrar públicamente</label></div>;
          })}
        </fieldset>
        {error && <p className="profile-editor-error" role="alert">{error}</p>}
        <div className="profile-editor-actions"><button type="button" disabled={busy || processing} onClick={onClose}>Cancelar</button><button type="submit" disabled={busy || processing}>{processing ? 'Procesando imagen…' : busy ? progress || 'Guardando…' : 'Guardar cambios'}</button></div>
      </form>
    </div>
  </div>,document.body);
}
