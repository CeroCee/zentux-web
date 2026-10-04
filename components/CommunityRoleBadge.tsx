"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CommunityBadge, loadCommunityProfile } from './community-public-profile';
import ProfileImage from './ProfileImage';

const icons = {
  owner: { src: '/community-owner.png', label: 'Director o propietario de Zentux' },
  staff: { src: '/community-staff.png', label: 'Staff o soporte de Zentux' },
  buyer: { src: '/community-buyer.png', label: 'Comprador de Zentux' },
};

export function RoleBadgeIcon({ badge }: { badge: CommunityBadge | null }) {
  if (!badge) return null;
  const icon = icons[badge];
  return <Image className="community-role-icon" src={icon.src} alt={icon.label} title={icon.label} width={20} height={20} unoptimized />;
}

export function CommunityChatAvatar({ userId, src }: { userId: string; src: string | null }) {
  const element = useRef<HTMLSpanElement>(null);
  const [permission, setPermission] = useState<{ userId: string; active: boolean } | null>(null);
  useEffect(() => {
    let disposed = false, visible = false;
    const update = () => {
      if (!visible || document.visibilityState !== 'visible') return;
      void loadCommunityProfile(userId).then(profile => {
        if (!disposed) setPermission({ userId, active: profile.appearance?.premiumMedia === true });
      }).catch(() => { if (!disposed) setPermission(null); });
    };
    const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); if (visible) update(); });
    if (element.current) observer.observe(element.current);
    const timer = setInterval(update, 60000);
    document.addEventListener('visibilitychange', update);
    return () => { disposed = true; observer.disconnect(); clearInterval(timer); document.removeEventListener('visibilitychange', update); };
  }, [userId]);
  return <span ref={element}><ProfileImage className="community-chat-avatar" src={src || '/icon-48.png'} alt="" width={36} height={36} allowAnimation={permission?.userId === userId && permission.active} onError={event => { event.currentTarget.src = '/icon-48.png'; }} /></span>;
}

export default function CommunityRoleBadge({ userId }: { userId: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const [badge, setBadge] = useState<CommunityBadge | null>(null);
  useEffect(() => {
    let disposed = false, visible = false;
    const update = () => {
      if (!visible || document.visibilityState !== 'visible') return;
      void loadCommunityProfile(userId).then(profile => { if (!disposed) setBadge(profile.badge); }).catch(() => { if (!disposed) setBadge(null); });
    };
    const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); if (visible) update(); });
    if (element.current) observer.observe(element.current);
    const timer = setInterval(update, 60000);
    document.addEventListener('visibilitychange', update);
    return () => { disposed = true; observer.disconnect(); clearInterval(timer); document.removeEventListener('visibilitychange', update); };
  }, [userId]);
  return <span ref={element} className="community-chat-badge"><RoleBadgeIcon badge={badge} /></span>;
}
