export function GET() {
  return new Response(
    "google.com, pub-2865991938661915, DIRECT, f08c47fec0942fa0\n",
    { headers: { "Content-Type": "text/plain" } },
  );
}
