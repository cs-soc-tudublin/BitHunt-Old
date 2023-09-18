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

    console.log(player.rows[0]);

    if(player.rows[0].finishedevent){

        return{
            status: 200,
            name: player.rows[0].name,
            winner: 2
        }
    }
    else{
        const eventCount = await pool.query(
            'SELECT count(*) from events'
        );
        if(eventCount > player.rows[0].score){
            return {
                status: 200,
                name: player.rows[0].name,
                winner: 0
            }
        }
        else{
            return {
                status: 200,
                name: player.rows[0].name,
                winner: 1
            }
        }
    }

    return{
        status: 200,
        name: player.rows[0].name,
        winner: 0
    }
};

export const actions = {
	login: async ({ cookies, request }) => {
		let reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "password" => "string"
		// }

		// Check if password is correct from .env file
		if (reqData.get('password') === process.env.ADMIN_PASSWORD) {
			// Set cookie to true, with age of 2 hours
			cookies.set('admin', 'true', {
				maxAge: 7200,
				secure: false
			});

			// Return success
			return {
				status: 200,
				message: 'Successfully logged in'
			};
		} else {
			// Return failure
			return {
				status: 500,
				message: 'Incorrect password'
			};
		}
	},
	logout: async ({ cookies }) => {
		// Set cookie to false, with age of -1 (expires immediately)
		cookies.set('admin', 'false', {
			maxAge: -1,
			path: '/'
		});
	}
} satisfies Actions;
