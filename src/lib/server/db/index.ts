import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '$env/dynamic/private';
import { candidate } from './schema/candidate';
import { poll } from './schema/poll';
import { vote } from './schema/vote';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema: { poll, candidate, vote } });
