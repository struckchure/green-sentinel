import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const vote = pgTable('votes', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

	fullname: varchar('fullname', { length: 255 }).notNull(),
	party: varchar('party', { length: 255 }).notNull(),
	party_logo: varchar('party_logo', { length: 255 }).notNull()
});
