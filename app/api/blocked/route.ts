export function GET() {
  return new Response("Slow down!!", {
    status: 429,
  });
}
