export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const params = new URL(request.url).searchParams;
    const language = params.get("language") || "en-US";
    const res = await fetch(
      `https://api.themoviedb.org/3/watch/providers/regions?language=${language}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        },
      }
    );

    const data = await res.json();
    return Response.json({ status: true, data });
  } catch (error) {
    return Response.json({ status: false, error });
  }
}
