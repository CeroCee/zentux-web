import { authenticatedAccountRequest } from '@/lib/account-api';

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return Response.json({error:'Solicitud no permitida.'},{status:403});
  if (Number(request.headers.get('content-length') || 0) > 1500000) return Response.json({error:'Parte de imagen demasiado grande.'},{status:413});
  try {
    const text=await request.text();
    if(text.length>1500000)return Response.json({error:'Parte de imagen demasiado grande.'},{status:413});
    const body=JSON.parse(text);
    // Identity is always supplied by the authenticated session, never by the upload.
    return (await authenticatedAccountRequest(request,'/api/web/profile-customization/upload',{
      action:body.action,kind:body.kind,size:body.size,uploadId:body.uploadId,offset:body.offset,chunk:body.chunk
    })).response;
  } catch {return Response.json({error:'No se pudo subir la imagen. Vuelve a guardar para reintentar.'},{status:503});}
}
