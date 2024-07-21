import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
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

    let player = Object.create(null);

	player = await pool.query(
		`
        SELECT * FROM players
        WHERE studentid = $1
    `,
		[slug]
	);

    if (Object.keys(player.rows).length === 0) {
		return {
			status: 404,
			message: 'Player not found'
		};
	}

	if(player.rows[0].finishedevent){
		if(player.rows[0].score == -1){
			return {
				status: 200,
				name: player.rows[0].name,
				studentid: player.rows[0].studentid,
				winner: 2
			}
		}
		else{
			return {
				status: 200,
				name: player.rows[0].name,
				studentid: player.rows[0].studentid,
				winner: 1
			}
		}
	}
	else{
		return {
			status: 200,
			name: player.rows[0].name,
			studentid: player.rows[0].studentid,
			winner: 0
		}
	}
};

export const actions = {
	default: async ({ cookies, request }) => {
		let reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "studentid" => "string"
		// }

		let studentid = reqData.get('studentid');

		let player = Object.create(null);

		// We know that the student exists, so set the score to -1 to indicate that they have finished the event
		player = await pool.query(
			`
			UPDATE players
			SET score = -1, finishedevent = true
			WHERE studentid = $1
		`,
			[studentid]
		);

		throw redirect(302, '/admin');
	}
} satisfies Actions;
