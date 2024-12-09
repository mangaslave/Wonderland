import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clerkId: text('clerk_id').unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
});

