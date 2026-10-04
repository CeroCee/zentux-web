"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CommunityBadge, loadCommunityProfile } from './community-public-profile';

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
