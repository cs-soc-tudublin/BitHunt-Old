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

	let event = Object.create(null);

	event = await pool.query(
		`
        SELECT * FROM events
        WHERE id = $1
    `,
		[slug]
	);

	if (Object.keys(event.rows).length === 0) {
		return {
			status: 404,
			message: 'Event not found'
		};
	}

	return {
		event: event.rows[0]
	};
};

export const actions = {
	default: async ({ cookies, request }) => {
		let reqData = await request.formData();
		// Returns as format:
		// FormData {
		//   'id' => 'int',
		//   'name' => 'string',
		//   'description' => 'string',
		//   'date' => 'string',
		//   'location' => 'string',
		//   'prize' => 'string',
		//   'prizecount' => 'int',
		//   'status' => 'string'
		// }

		// Convert status to boolean
		let status = reqData.get('status') === 'active' ? true : false;

		// Update event
		await pool.query(
			`
            UPDATE events
            SET name = $1, description = $2, date = $3, location = $4, prize = $5, prizecount = $6, active = $7
            WHERE id = $8
        `,
			[
				reqData.get('name'),
				reqData.get('description'),
				reqData.get('date'),
				reqData.get('location'),
				reqData.get('prize'),
				reqData.get('prizecount'),
				status,
				reqData.get('id')
			]
		);
	}
} satisfies Actions;
