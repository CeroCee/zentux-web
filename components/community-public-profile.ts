export type CommunityBadge = 'owner' | 'staff' | 'buyer';
import type { ProfileAppearance } from '@/lib/profile-appearance';
export type PublicCommunityProfile = { userId: string; name: string; username: string; avatar: string | null; banner: string | null; memberSince: string; staffRole: 'admin' | 'moderator' | null; badge: CommunityBadge | null; roles: { name: string; color: string }[]; appearance?: ProfileAppearance };
const cache = new Map<string, { profile: PublicCommunityProfile; until: number }>();
const pending = new Map<string, Promise<PublicCommunityProfile>>();
export function invalidateCommunityProfile(id: string) { cache.delete(id); }
const queue: (() => void)[] = [];
let active = 0;

// The chat's badges and floating profile share one bounded cache and in-flight request.
// Four concurrent reads avoid flooding the trusted Discord bridge on long histories.
export function loadCommunityProfile(userId: string, fresh = false): Promise<PublicCommunityProfile> {
  const cached = cache.get(userId);
  if (!fresh && cached && cached.until > Date.now()) return Promise.resolve(cached.profile);
  const existing = pending.get(userId);
  if (existing) return existing;
  const promise = new Promise<PublicCommunityProfile>((resolve, reject) => {
    const run = () => {
      active++;
      void (async () => {
        try {
          const response = await fetch(`/api/community-chat/profiles/${userId}`, { cache: 'no-store', signal: AbortSignal.timeout(12000) });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || 'No se pudo cargar el perfil.');
          if (data.userId !== userId) throw new Error('No se pudo verificar el perfil.');
          if (cache.size >= 100) cache.delete(cache.keys().next().value!);
          cache.set(userId, { profile: data, until: Date.now() + 30000 });
          resolve(data);
        } catch (error) { reject(error); }
        finally { active--; pending.delete(userId); queue.shift()?.(); }
      })();
    };
    if (active < 4) run(); else queue.push(run);
  });
  pending.set(userId, promise);
  return promise;
}
