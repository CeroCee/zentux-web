export async function GET(_request: Request,{params}:{params:Promise<{id:string;kind:string;version:string}>}) {
  const {id,kind,version} = await params;
  if (!/^\d{16,22}$/.test(id) || !['avatar','banner'].includes(kind) || !/^[0-9a-f-]{36}$/i.test(version)) return new Response(null,{status:404});
  const base = String(process.env.LICENSE_API_URL || process.env.NEXT_PUBLIC_LICENSE_API_URL || '').replace(/\/+$/,'');
  try {
    const still=new URL(_request.url).searchParams.get('still')==='1' ? '?still=1' : '';
    const upstream = await fetch(`${base}/api/public-profile-images/${id}/${kind}/${version}${still}`,{signal:AbortSignal.timeout(30000)});
    const mime = upstream.headers.get('content-type')?.split(';')[0];
    if (!upstream.ok || !['image/png','image/jpeg','image/gif'].includes(mime || '')) return new Response(null,{status:upstream.ok ? 404 : upstream.status});
    if (!upstream.body || Number(upstream.headers.get('content-length')) > 10485760) return new Response(null,{status:413});
    // Stream large GIFs rather than buffering a response above the platform payload limit.
    let bytes=0;
    const bounded=upstream.body.pipeThrough(new TransformStream<Uint8Array,Uint8Array>({transform(chunk,controller){
      bytes+=chunk.byteLength;
      if(bytes>10485760){controller.error(new Error('Image too large'));return;}
      controller.enqueue(chunk);
    }}));
    return new Response(bounded,{headers:{'Content-Type':mime!,'X-Content-Type-Options':'nosniff','Cache-Control':'public,max-age=86400,immutable','Content-Security-Policy':"default-src 'none'; sandbox"}});
  } catch { return new Response(null,{status:503}); }
}
