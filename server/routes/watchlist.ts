import { eq } from "drizzle-orm";
import { watchlist } from "../db/schema";

export async function fetchWatchlist(db: any, userId: string) {
    try {
      const userWatchlist = await db
        .select()
        .from(watchlist)
        .where(eq(watchlist.userId, userId));
  
      if (!Array.isArray(userWatchlist)) {
        console.error("Watchlist is not an array:", userWatchlist);
      }

      console.log("watch", userWatchlist);
  
      return new Response(JSON.stringify(userWatchlist), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      return new Response("Failed to fetch watchlist.", { status: 500 });
    }
  }
  

export async function updateWatchlist(db: any, req: Request) {
    try {
      const { movieId, watched } = await req.json();
  
      await db
        .update(watchlist)
        .set({ watched })
        .where(eq(watchlist.movieId, movieId));
  
      return new Response("Watchlist updated successfully!", { status: 200 });
    } catch (error) {
      console.error("Error updating watchlist:", error);
      return new Response("Failed to update watchlist.", { status: 500 });
    }
  }

