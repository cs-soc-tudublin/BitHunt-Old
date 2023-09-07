import type { PageServerLoad, Actions } from './$types';
import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const load: PageServerLoad = async ({ request }) => {

	let client = await pool.connect();
	let result = await client.query('SELECT * FROM events');
	let events = result.rows;

	return {
		status: 200,
		events: events
	};
};

export const actions = {
	default: async ({ cookies, request }) => {
		let reqData = await request.formData();
		// Format:
		// FormData {
		//   'name' => 'STRING',
		//   'clue' => 'STRING',
		//   'event' => 'STRING' (event id)

		const stage = await pool.query(
			`INSERT INTO stages (name, clue, event, uuid) VALUES ($1, $2, $3, $4)`,
			[reqData.get('name'), reqData.get('clue'), reqData.get('event'), uuidv4()]
		);

		return {
			status: 200,
			message: reqData.get('name') + ' created successfully'
		};
	}
} satisfies Actions;
