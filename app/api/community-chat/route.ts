export async function GET() {
  const base = String(process.env.LICENSE_API_URL || process.env.NEXT_PUBLIC_LICENSE_API_URL || "").replace(/\/+$/, "");
  try {
    const response = await fetch(`${base}/api/community-chat`, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Unavailable");
    // Only the public Render URL is exposed, never web/bot secrets.
    return Response.json({ ...await response.json(), eventsUrl: `${base}/api/community-chat/events` }, { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "El chat no está disponible." }, { status: 503 }); }
}
