export async function POST(request: Request) {
  await request.json().catch(() => ({}));
  return Response.json(
    {
      code: "verification_not_configured",
      error:
        "Zentux Rewards verification is temporarily disabled until LootLabs server-side verification is connected.",
    },
    { status: 503 },
  );
}
