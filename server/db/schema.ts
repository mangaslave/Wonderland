import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clerkId: text('clerk_id').unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
});

export const watchlist = sqliteTable("watchlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull().references(() => users.clerkId), 
  movieId: text("movie_id").notNull(),
  title: text("title").notNull(), 
  poster_path: text("poster_path"), 
  vote_average: integer("rating"), 
  watched: integer("watched").default(0), 
  createdAt: integer("created_at", { mode: "timestamp" }), 
});
