import fetchTop10Movies from "./route";
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { createUser } from "./routes/users";

const sqlite = new Database('wonderland.sqlite');
const db = drizzle(sqlite);


Bun.serve({
    async fetch(req) {
      const url = new URL(req.url);
  
      // Home Page
      if (url.pathname === "/") {
        return new Response("Welcome to Wonderland! Your go-to movie mood explorer.");
      }
  
      // Top 10 Movies
      if (url.pathname === "/api/top10") {
        return fetchTop10Movies();
      }

      // Add new users
      if (url.pathname === "/api/users/sync" && req.method === "POST") {
        try {
          const userData = await req.json();
          const newUser = await createUser(db, userData);
          return new Response(JSON.stringify(newUser), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error: any) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
  
      // 404 
      return new Response("404 - Not Found", { status: 404 });
    },
    port: 3000,
  });
  
  console.log("Server running on http://localhost:3000");
  

