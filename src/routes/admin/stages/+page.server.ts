import type { PageServerLoad } from './$types';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const load: PageServerLoad = async ({ cookies }) => {
	// Get a list of all events
	const stages = await pool.query(`
        SELECT *
        FROM stages
    `);

	return {
		status: 200,
		stages: stages.rows
	};
};
