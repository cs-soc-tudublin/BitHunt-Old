import type { PageServerLoad } from './$types';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const load: PageServerLoad = async ({ request, cookies }) => {
	// Check cookie and redirect if invalid
    const cookie = cookies.get('player');
    let validCookie = false;
    let player;

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

    console.log(player.rows[0].score)

    if (player.rows[0].score >= stages.rows.length) {
        return {
            status: 200,
            message: 'You win!',
            cookie: cookie
        }
    }
    else{
        return{
            status: 403,
            message: 'You have not completed all the stages!'
        }
    }
};
