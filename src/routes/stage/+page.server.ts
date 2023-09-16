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

// Load and grab cookie
export const load: PageServerLoad = async ({ request, cookies }) => {
	// Check if cookie is set
	const cookie = cookies.get('player');
	let validCookie = false;
	let player;

	// Check if cookie is valid
	if (cookie) {
		player = await pool.query(
			`
            SELECT *
            FROM players
            WHERE studentid = $1
        `,
			[cookie]
		);

		if (player.rows.length > 0) {
			validCookie = true;
		} else {
			throw redirect(302, '/');
		}
	}
	
	// Check if get player.score and see if it equals the amount of stages
	const stages = await pool.query(
		`
			SELECT *
			FROM stages
		`
	);

	if (player.rows[0].score === stages.rows.length) {
		throw redirect(302, '/win/' + cookie);
	}

	// Check if target is null:
	if (player.rows[0].target === null) {
		await pool.query(
			`
			UPDATE players
			SET target = (
				SELECT UUID FROM stages
				ORDER BY RANDOM()
				LIMIT 1
			)
			WHERE studentid = $1
		`,
			[cookie]
		);

	}

	// Check if target exists
	const target = await pool.query(
		`
			SELECT *
			FROM stages
			WHERE uuid = $1
		`,
		[player.rows[0].target]
	);

	if (target.rows.length === 0) {
		await pool.query(
			`
			UPDATE players
			SET target = (
				SELECT UUID FROM stages
				ORDER BY RANDOM()
				LIMIT 1
			)
			WHERE studentid = $1
		`,
			[cookie]
		);
	}

	// Get current target stage
	const stage = await pool.query(
		`
            SELECT *
            FROM stages
            WHERE uuid = $1
        `,
		[player.rows[0].target]
	);

	return {
		validCookie,
		player: player.rows[0],
		clue: stage.rows[0].clue
	};
};
