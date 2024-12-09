const API_KEY = process.env.TMDB_API_KEY;


export default async function fetchTop10Movies() {
    const TMDB_URL = "https://api.themoviedb.org/3/trending/movie/day";
  
    try {
      const response = await fetch(`${TMDB_URL}?api_key=${API_KEY}`);
      const data = await response.json();
      const top10 = data.results.slice(0, 10);

      console.log("top", top10);
  
      return new Response(JSON.stringify(top10), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch Top 10 movies" }),
        { headers: { "Content-Type": "application/json" }, status: 500 }
      );
    }
  }