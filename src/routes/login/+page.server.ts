import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const actions = {
	default: async ({ cookies, request }) => {
		let reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "studentid" => "string"
		// }

		// Check if account exists

		const checkQuery = {
			text: 'SELECT * FROM Players WHERE studentid = $1',
			values: [reqData.get('studentid')?.toString().toLowerCase()]
		};

		const checkResult = await pool.query(checkQuery);

		if (checkResult.rowCount != 0) {
			// Set cookie and redirect
			cookies.set('player', reqData.get('studentid').toString().toLowerCase(), {
				maxAge: 7200,
				secure: false
			});

			throw redirect(302, '/stage');
		} else {
			// Account doesn't exist
			return {
				status: 500,
				message: 'Account does not exist'
			};
		}
	}
} satisfies Actions;
