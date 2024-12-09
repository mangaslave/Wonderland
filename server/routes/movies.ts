import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { watchlist } from "../db/schema";
import { eq } from "drizzle-orm";

export async function saveFavorite(db: any, req: Request) {
  const date = new Date();
  try {
    const { movieId, title, posterPath, rating, watched = false, userid } = await req.json();

    if (!userid) {
      return new Response("Missing user ID", { status: 400 });
    }

    const existingMovie = await db
      .select()
      .from(watchlist)
      .where(eq(watchlist.userId, userid))
      .where(eq(watchlist.movieId, movieId))
      .limit(1);

    if (existingMovie.length > 0) {
      return new Response("Movie is already in the watchlist", { status: 400 });
    }

    await db.insert(watchlist).values({
      userId: userid,
      movieId,
      title,
      posterPath,
      rating,
      watched,
      createdAt: date,
    });

    return new Response("Favorite saved successfully!", { status: 201 });
  } catch (error) {
    console.error("Error saving favorite:", error);
    return new Response("Failed to save favorite.", { status: 500 });
  }
}


export async function isMovieSaved(db: any, req: Request) {
    try {
      const { userid, movieId } = await req.json();
      const savedMovie = await db
        .select()
        .from(watchlist)
        .where(eq(watchlist.userId, userid))
        .where(eq(watchlist.movieId, movieId))
        .limit(1);
  
      return new Response(JSON.stringify({ isSaved: savedMovie.length > 0 }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error checking movie saved:", error);
      return new Response("Failed to check movie.", { status: 500 });
    }
  }

  export async function removeFavorite(db: any, req: Request) {
    try {
      const { userid, movieId } = await req.json();
  
      await db
        .delete(watchlist)
        .where(eq(watchlist.userId, userid))
        .where(eq(watchlist.movieId, movieId));
  
      return new Response("Favorite removed successfully!", { status: 200 });
    } catch (error) {
      console.error("Error removing favorite:", error);
      return new Response("Failed to remove favorite.", { status: 500 });
    }
  }

  
