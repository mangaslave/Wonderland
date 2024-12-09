import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { users } from '../db/schema';

export async function createUser(db: any, userData: {
  username: string,
  email: string,
  firstName?: string,
  lastName?: string
}) {
  try {
    const newUser = await db.insert(users).values({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      createdAt: new Date()
    }).returning();

    return newUser[0];
  } catch (error) {
    console.error('User creation error:', error);
    throw new Error('Failed to create user');
  }
}