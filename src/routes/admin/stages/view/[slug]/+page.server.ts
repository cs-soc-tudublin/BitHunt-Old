import type { PageServerLoad, Actions } from './$types';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const load: PageServerLoad = async ({ params }) => {
	let slug = params.slug;

	let stage = Object.create(null);

	stage = await pool.query(
		`
        SELECT * FROM stages
        WHERE id = $1
    `,
		[slug]
	);

	let events = Object.create(null);

	events = await pool.query(
		`
		SELECT * FROM events
	`
	);

	if (Object.keys(stage.rows).length === 0) {
		return {
			status: 404,
			message: 'Stage not found'
		};
	}

	return {
		stage: stage.rows[0],
		events: events.rows
	};
};

export const actions = {
	default: async ({ cookies, request }) => {
		let reqData = await request.formData();

		// Update stage
		await pool.query(
			`
            UPDATE stages
            SET name = $1, clue = $2, event = $3 WHERE id = $4
        `,
			[
				reqData.get('name'),
				reqData.get('clue'),
				reqData.get('event'),
				reqData.get('id')
			]
		);
	}
} satisfies Actions;
