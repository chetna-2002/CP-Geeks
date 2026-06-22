export async function POST(req: Request) {
  const payload = await req.json();

  console.log("WEBHOOK:", payload);

  return Response.json({
    success: true
  });
}
