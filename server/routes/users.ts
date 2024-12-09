import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { users } from '../db/schema';
import { eq } from "drizzle-orm";

export async function createUser(db: any, userData: {
  username: string,
  email: string,
  firstName?: string,
  lastName?: string,
  clerkId: string,
}) {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where((row: { clerkId: string; email: string; }) => row.clerkId === userData.clerkId || row.email === userData.email);

    if (existingUser.length > 0) {
      console.log('User already exists:', existingUser[0]);
      return existingUser[0]; 
    }

    const newUser = await db.insert(users).values({
      clerkId: userData.clerkId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date(),
    }).returning();

    return newUser[0];
  } catch (error) {
    console.error('User creation error:', error);
    throw new Error('Failed to create user');
  }
}

export async function updateUser(db: any, req: Request) {
    try {
      const { name, email, profilePicture, userId } = await req.json();
  
      if (!userId) {
        return new Response("User ID is required", { status: 400 });
      }
  
      await db
        .update(users)
        .set({ name, email, profilePicture })
        .where(eq(users.id, userId));
  
      return new Response("User updated successfully", { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Failed to update user", { status: 500 });
    }
  }