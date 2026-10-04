import { authenticatedAccountRequest } from '@/lib/account-api';
export async function GET(request: Request) {
  return (await authenticatedAccountRequest(request,'/api/web/profile-customization')).response;
}
export async function PUT(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return Response.json({error:'Solicitud no permitida.'},{status:403});
  if (Number(request.headers.get('content-length') || 0) > 3000000) return Response.json({error:'Las imágenes son demasiado grandes.'},{status:413});
  try {
    const text = await request.text();
    if (text.length > 3000000) return Response.json({error:'Las imágenes son demasiado grandes.'},{status:413});
    const body = JSON.parse(text);
    // The authenticated helper overwrites the user ID from the session.
    return (await authenticatedAccountRequest(request,'/api/web/profile-customization/save',{appearance:body.appearance,images:body.images})).response;
  } catch { return Response.json({error:'No se pudo guardar el perfil. Inténtalo de nuevo.'},{status:503}); }
}
