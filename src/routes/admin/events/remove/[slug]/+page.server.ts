import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const load = (async ({ params, cookies }) => {
	let slug = params.slug;

	// Check the event exists
	let event = Object.create(null);

	event = await pool.query(
		`
        SELECT * FROM events
        WHERE id = $1
    `,
		[slug]
	);

	// If it doesn't set cookie and redirect
	if (Object.keys(event.rows).length === 0) {
		cookies.set('message', 'Event not found', { path: '/admin/events' });
		throw redirect(301, '/admin/events');
	} else {
		// Delete event
		const result = await pool.query(
			`
            DELETE FROM events
            WHERE id = $1
        `,
			[slug]
		);

		cookies.set('message', 'Event deleted', { path: '/admin/events' });

		throw redirect(307, '/admin/events');
	}
}) satisfies PageServerLoad;
