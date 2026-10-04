export async function GET(_request: Request,{params}:{params:Promise<{id:string;kind:string;version:string}>}) {
  const {id,kind,version} = await params;
  if (!/^\d{16,22}$/.test(id) || !['avatar','banner'].includes(kind) || !/^[0-9a-f-]{36}$/i.test(version)) return new Response(null,{status:404});
  const base = String(process.env.LICENSE_API_URL || process.env.NEXT_PUBLIC_LICENSE_API_URL || '').replace(/\/+$/,'');
  try {
    const upstream = await fetch(`${base}/api/public-profile-images/${id}/${kind}/${version}`,{signal:AbortSignal.timeout(10000)});
    const mime = upstream.headers.get('content-type')?.split(';')[0];
    if (!upstream.ok || !['image/png','image/jpeg'].includes(mime || '')) return new Response(null,{status:upstream.ok ? 404 : upstream.status});
    const data = await upstream.arrayBuffer();
    if (data.byteLength > 1048576) return new Response(null,{status:413});
    return new Response(data,{headers:{'Content-Type':mime!,'X-Content-Type-Options':'nosniff','Cache-Control':'public,max-age=86400,immutable','Content-Security-Policy':"default-src 'none'; sandbox"}});
  } catch { return new Response(null,{status:503}); }
}
