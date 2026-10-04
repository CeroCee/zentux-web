"use client";
import ProfileImage from './ProfileImage';
import dynamic from 'next/dynamic';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { defaultAppearance, platformLabels, ProfileAppearance } from '@/lib/profile-appearance';
import { invalidateCommunityProfile } from './community-public-profile';
import './profile-personalization.css';
const ProfileEditor = dynamic(() => import('./ProfileEditor'));

export default function ProfileIdentity({userId,name,avatar,memberLabel}:{userId:string;name:string;avatar:string|null;memberLabel:string}) {
  const [appearance,setAppearance] = useState<ProfileAppearance>(defaultAppearance);
  const [editing,setEditing] = useState(false);
  const [ready,setReady] = useState(false);
  const [error,setError] = useState('');
  const [attempt,setAttempt] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let active = true;
    void fetch('/api/account/appearance',{cache:'no-store'}).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo cargar la personalización.');
      if (active) { setAppearance(data.appearance); setReady(true); }
    }).catch(failure => { if (active) setError(failure.message); });
    return () => { active = false; };
  },[userId,attempt]);
  const close = () => { setEditing(false); button.current?.focus({preventScroll:true}); };
  return <>
    <header className={`profile-identity profile-frame-${appearance.frame}`} style={{'--profile-accent':appearance.accent} as CSSProperties}>
      <div className="profile-identity-banner">{appearance.banner && <ProfileImage src={appearance.banner} alt="" fill sizes="100vw" />}</div>
      <div className="profile-identity-main">
        <ProfileImage src={appearance.avatar || avatar || '/icon-48.png'} alt="Tu avatar" width={132} height={132} className={`profile-identity-avatar profile-decoration-${appearance.decoration}`} />
        <div className="profile-identity-details">
          {appearance.status && <p className="profile-status">{appearance.status}</p>}
          <h1 className={`profile-name-${appearance.nameStyle}`}>{appearance.displayName || name}</h1>
          <span className="profile-membership">{memberLabel}</span>
          <p className="profile-discord-id">Discord vinculado · {userId}</p>
          {appearance.bio && <p className="profile-bio">{appearance.bio}</p>}
          <nav className="profile-links" aria-label="Tus enlaces públicos">{appearance.links.filter(link => link.public).map(link => <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer nofollow" referrerPolicy="no-referrer">{platformLabels[link.platform]} ↗</a>)}</nav>
        </div>
        <button ref={button} className="profile-edit-button" disabled={!ready} onClick={() => setEditing(true)}>✎ {ready ? 'Editar perfil' : 'Cargando personalización…'}</button>
      </div>
      {error && <p role="alert" className="profile-load-error">{error} <button onClick={() => {setError('');setAttempt(value => value + 1);}}>Reintentar</button></p>}
    </header>
    {editing && <ProfileEditor initial={appearance} fallback={{name,avatar}} onClose={close} onSaved={value => {setAppearance(value);invalidateCommunityProfile(userId);close();}} />}
  </>;
}
