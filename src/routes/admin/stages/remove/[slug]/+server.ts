import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const GET: RequestHandler = async ({ params, cookies }) => {
	let slug = params.slug;

	// Check the event exists
	let event = Object.create(null);

	event = await pool.query(
		`
        SELECT * FROM stages
        WHERE id = $1
    `,
		[slug]
	);

	// If it doesn't set cookie and redirect
	if (Object.keys(event.rows).length === 0) {
		cookies.set('message', 'Stage not found', { path: '/admin/stages' });
		throw redirect(301, '/admin/stages');
	} else {
		// Delete event
		const result = await pool.query(
			`
            DELETE FROM stages
            WHERE id = $1
        `,
			[slug]
		);

		cookies.set('message', 'Stage deleted', { path: '/admin/stages' });

		throw redirect(302, '/admin/stages');
	}
};
