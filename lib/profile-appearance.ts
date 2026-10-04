export type ProfileAppearance = {
  displayName: string; status: string; bio: string; accent: string;
  nameStyle: 'plain' | 'glow' | 'serif'; decoration: 'none' | 'ring' | 'halo'; frame: 'none' | 'outline' | 'gradient';
  avatar: string | null; banner: string | null;
  premiumMedia?: boolean;
  links: { platform: string; url: string; public?: boolean }[];
};
export const defaultAppearance: ProfileAppearance = { displayName: '', status: '', bio: '', accent: '#a855f7', nameStyle: 'plain', decoration: 'none', frame: 'none', avatar: null, banner: null, links: [] };
export const platformLabels: Record<string,string> = { steam: 'Steam', spotify: 'Spotify', playstation: 'PlayStation', roblox: 'Roblox' };
export const platformHosts: Record<string,string[]> = { steam: ['steamcommunity.com'], spotify: ['open.spotify.com'], playstation: ['profile.playstation.com','www.playstation.com'], roblox: ['www.roblox.com','roblox.com'] };
// Explicit public projection, including safe enum values and first-party image paths.
export function publicAppearance(value: Partial<ProfileAppearance> | null | undefined): ProfileAppearance {
  const v = value || {};
  const text = (x: unknown,n: number) => typeof x === 'string' ? x.slice(0,n) : '';
  const image = (x: unknown) => typeof x === 'string' && /^\/api\/profile-images\/\d{16,22}\/(avatar|banner)\/[0-9a-f-]{36}$/i.test(x) ? x : null;
  return { displayName: text(v.displayName,32), status: text(v.status,120), bio: text(v.bio,300), accent: /^#[0-9a-f]{6}$/i.test(v.accent || '') ? v.accent! : defaultAppearance.accent,
    nameStyle: ['plain','glow','serif'].includes(v.nameStyle || '') ? v.nameStyle! : 'plain',
    decoration: ['none','ring','halo'].includes(v.decoration || '') ? v.decoration! : 'none',
    frame: ['none','outline','gradient'].includes(v.frame || '') ? v.frame! : 'none', avatar: image(v.avatar), banner: v.premiumMedia === true ? image(v.banner) : null, premiumMedia: v.premiumMedia === true,
    links: Array.isArray(v.links) ? v.links.slice(0,4).flatMap(link => {
      try { const url = new URL(link.url); return platformHosts[link.platform]?.includes(url.hostname) && url.protocol === 'https:' && !url.username && !url.password && !url.port && link.public !== false ? [{platform: link.platform,url:url.href}] : []; } catch { return []; }
    }) : [] };
}
