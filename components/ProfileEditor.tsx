"use client";
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { CSSProperties, FormEvent, useEffect, useRef, useState } from 'react';
import { platformLabels, ProfileAppearance } from '@/lib/profile-appearance';

async function prepareImage(file: File,kind: 'avatar'|'banner') {
  if (!['image/jpeg','image/png'].includes(file.type) || file.size > 10 * 1024 * 1024) throw new Error('Elige una imagen JPG o PNG de hasta 10 MB.');
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image(); image.src = url; await image.decode();
    if (image.naturalWidth * image.naturalHeight > 40000000) throw new Error('La imagen tiene demasiados píxeles. Usa una versión más pequeña.');
    const width = kind === 'avatar' ? 512 : 1600, height = kind === 'avatar' ? 512 : 560;
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('No se pudo procesar la imagen.');
    // Center crop and re-encode: bounded static images, without embedded metadata or animation.
    const scale = Math.max(width/image.naturalWidth,height/image.naturalHeight);
    ctx.drawImage(image,(width-image.naturalWidth*scale)/2,(height-image.naturalHeight*scale)/2,image.naturalWidth*scale,image.naturalHeight*scale);
    const data = canvas.toDataURL('image/jpeg',.84);
    if (data.length > 1400000) throw new Error('La imagen es demasiado grande. Usa una versión más pequeña.');
    return data;
  } finally { URL.revokeObjectURL(url); }
}

export default function ProfileEditor({initial,fallback,onClose,onSaved}:{initial:ProfileAppearance;fallback:{name:string;avatar:string|null};onClose:()=>void;onSaved:(value:ProfileAppearance)=>void}) {
  const [draft,setDraft] = useState(() => structuredClone(initial));
  const [images,setImages] = useState<Partial<Record<'avatar'|'banner',string|null>>>({});
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const [processing,setProcessing] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const alive = useRef(true);
  const update = <K extends keyof ProfileAppearance>(key:K,value:ProfileAppearance[K]) => setDraft(current => ({...current,[key]:value}));
  useEffect(() => { alive.current = true; closeButton.current?.focus({preventScroll:true}); return () => {alive.current = false;}; },[]);
  async function upload(file:File|undefined,kind:'avatar'|'banner') {
    if (!file) return;
    setError('');setProcessing(true);
    try { const data = await prepareImage(file,kind); if (alive.current) {setImages(current => ({...current,[kind]:data}));update(kind,data);} }
    catch (failure) {if (alive.current) setError(failure instanceof Error ? failure.message : 'No se pudo leer la imagen.');}
    finally {if (alive.current) setProcessing(false);}
  }
  async function save(event:FormEvent) {
    event.preventDefault();setBusy(true);setError('');
    try {
      const appearance = {displayName:draft.displayName,status:draft.status,bio:draft.bio,accent:draft.accent,nameStyle:draft.nameStyle,decoration:draft.decoration,frame:draft.frame,links:draft.links};
      const response = await fetch('/api/account/appearance',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({appearance,images}),signal:AbortSignal.timeout(20000)});
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'No se pudo guardar el perfil.');
      if (alive.current) onSaved(data.appearance);
    } catch (failure) {if (alive.current) setError(failure instanceof Error ? failure.message : 'No se pudo guardar el perfil.');}
    finally {if (alive.current) setBusy(false);}
  }
  const previewAvatar = draft.avatar || fallback.avatar || '/icon-48.png';
  return createPortal(<div className="profile-editor-overlay" onPointerDown={event => {if (event.target === event.currentTarget && !busy && !processing) onClose();}}>
    <div ref={dialog} className="profile-editor" role="dialog" aria-modal="true" aria-labelledby="profile-editor-title" style={{'--profile-accent':draft.accent} as CSSProperties} onKeyDown={event => {
      event.stopPropagation();
      if (event.key === 'Escape' && !busy && !processing) {event.preventDefault();onClose();}
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialog.current!.querySelectorAll<HTMLElement>('button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),a[href]'));
      const first = controls[0],last = controls[controls.length-1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last?.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first?.focus();}
    }}>
      <aside className="profile-editor-preview"><p className="profile-editor-eyebrow">Así verán tu perfil en el chat</p>
        <div className={`profile-preview-card profile-frame-${draft.frame}`}>
          <div className="profile-preview-banner">{draft.banner && <Image src={draft.banner} alt="Vista previa del banner" fill unoptimized sizes="380px" />}</div>
          <div className="profile-preview-content"><Image src={previewAvatar} alt="Vista previa del avatar" width={86} height={86} unoptimized className={`profile-preview-avatar profile-decoration-${draft.decoration}`} />
            {draft.status && <p className="profile-status">{draft.status}</p>}
            <h2 className={`profile-name-${draft.nameStyle}`}>{draft.displayName || fallback.name}</h2>
            <p className="profile-preview-username">{fallback.name} · Zentux.gg</p>
            {draft.bio && <p className="profile-bio">{draft.bio}</p>}
            <div className="profile-links">{draft.links.filter(link => link.public && link.url).map(link => <span key={link.platform}>{platformLabels[link.platform]}</span>)}</div>
          </div>
        </div>
        <p className="profile-editor-note">Tu identidad de Discord y tus insignias oficiales se mantienen. Las licencias y los pagos nunca aparecen en esta tarjeta.</p>
      </aside>
      <form onSubmit={save} className="profile-editor-form">
        <div className="profile-editor-heading"><div><p className="profile-editor-eyebrow">TU IDENTIDAD EN ZENTUX</p><h2 id="profile-editor-title">Editar perfil</h2></div><button ref={closeButton} type="button" aria-label="Cerrar editor" disabled={busy || processing} onClick={onClose}>×</button></div>
        <fieldset disabled={busy || processing}>
          <legend>Avatar y banner</legend>
          <div className="profile-image-options">{(['avatar','banner'] as const).map(kind => <div key={kind}>
            <label className="profile-upload">{kind === 'avatar' ? 'Cambiar avatar' : 'Cambiar banner'}<input aria-label={kind === 'avatar' ? 'Subir avatar' : 'Subir banner'} type="file" accept="image/png,image/jpeg" onChange={event => {void upload(event.target.files?.[0],kind);event.target.value='';}} /></label>
            <button type="button" className="profile-reset-image" onClick={() => {setImages(current => ({...current,[kind]:null}));update(kind,null);}}>{kind === 'avatar' ? 'Usar avatar de Discord' : 'Quitar banner personalizado'}</button>
          </div>)}</div>
          <p className="profile-editor-note">JPG o PNG, hasta 10 MB. Recorte centrado y optimización automática.</p>
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
        <div className="profile-editor-actions"><button type="button" disabled={busy || processing} onClick={onClose}>Cancelar</button><button type="submit" disabled={busy || processing}>{processing ? 'Procesando imagen…' : busy ? 'Guardando…' : 'Guardar cambios'}</button></div>
      </form>
    </div>
  </div>,document.body);
}
