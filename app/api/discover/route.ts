export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    let url = "https://api.themoviedb.org/3/discover/movie?";

    for (const [key, value] of new URL(request.url).searchParams) {
      url += `${key}=${value}&`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });

    const data = await res.json();
    return Response.json({ status: true, data });
  } catch (error) {
    return Response.json({ status: false, error });
  }
}
