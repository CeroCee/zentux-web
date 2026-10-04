"use client";
import Image, { ImageProps } from 'next/image';
import { useSyncExternalStore } from 'react';
const subscribe=(notify:()=>void)=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');query.addEventListener('change',notify);return()=>query.removeEventListener('change',notify);};
const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const serverReduced=()=>true;
export default function ProfileImage({src,stillPreview,...props}:Omit<ImageProps,'src'> & {src:string;stillPreview?:string}) {
  const staticOnly=useSyncExternalStore(subscribe,reduced,serverReduced);
  const firstParty=src.startsWith('/api/profile-images/');
  const source=staticOnly ? firstParty ? `${src}?still=1` : src.startsWith('data:image/gif;') ? stillPreview || '/icon-48.png' : src : src;
  return <Image {...props} alt={props.alt} src={source} unoptimized />;
}
