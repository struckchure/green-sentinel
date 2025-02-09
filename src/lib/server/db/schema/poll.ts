import { relations, sql } from 'drizzle-orm';
import { pgTable, primaryKey, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { candidate } from './candidate';

export const poll = pgTable('polls', {
	id: uuid('id').defaultRandom().primaryKey(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at')
		.defaultNow()
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

	title: varchar('title', { length: 256 }).notNull(),
	description: varchar('description', { length: 256 }),
	image: varchar('image', { length: 256 })
});

export const pollsRelations = relations(poll, ({ many }) => ({
	candidatesToPolls: many(candidatesToPolls)
}));

export const candidatesToPolls = pgTable(
	'candidates_to_polls',
	{
		candidateId: uuid('candidate_id')
			.notNull()
			.references(() => candidate.id),
		pollId: uuid('poll_id')
			.notNull()
			.references(() => poll.id)
	},
	(t) => [primaryKey({ columns: [t.candidateId, t.pollId] })]
);

export const candidatesToPollsRelations = relations(candidatesToPolls, ({ one }) => ({
	poll: one(poll, { fields: [candidatesToPolls.pollId], references: [poll.id] }),
	user: one(candidate, { fields: [candidatesToPolls.candidateId], references: [candidate.id] })
}));
