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

/*
    Hello code readers, (future me included, and any potential employers)
    This file is quite a mess, and I'm sorry for that.
    Due to time-constraints, this was the easiest way to get the page to work.
    There is a much better way to do this, and I will be doing that in the future,
    for the 1.0.0 release of this project. (Along with fixing the rest of the code).
    Do pardon the mess, and don't forget to wipe your feet before you leave.
*/


export const load = (async ({ params, cookies }) => {
    let slug = params.slug;

    if(cookies.get('player') === undefined){
        throw redirect(302, '/login')
    }

    // Search for stages w/ UUID = slug
    let stage = Object.create(null);
    let player = Object.create(null);

    stage = await pool.query(
        `
        SELECT * FROM stages
        WHERE uuid = $1
    `,
        [slug]
    );

    player = await pool.query(
        `
        SELECT * FROM players
        WHERE studentid = $1
    `,
        [cookies.get('player')]
    );

    // Does this stage exist?
    if (Object.keys(stage.rows).length === 0) {
        return {
            status: 404,
            message: 'Stage not found',
            player: player.rows[0]
        };
    }
    else{
        // Is this their target stage?
        if(params.slug !== player.rows[0].target){
            // Get the clue for the target stage
            let clue = Object.create(null);

            clue = await pool.query(
                `
                SELECT * FROM stages
                WHERE uuid = $1
            `,
                [player.rows[0].target]
            );

            return {
                status: 403,
                message: 'Not your target stage',
                player: player.rows[0],
                clue: clue.rows[0].clue
            };
        }
        else{
            return {
                status: 200,
                stage: stage.rows[0],
                player: player.rows[0]
            };
        }
    }
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		let reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "stage" => "string"
		// }

		// Update the completed stages column in the database
        let player = Object.create(null);

        player = await pool.query(
            `
            SELECT * FROM players
            WHERE studentid = $1
        `,
            [cookies.get('player')]
        );

        let completed = player.rows[0].completedstages;

        if(completed === null){
            completed = [];
        }
        else{
            completed = completed.split(',');
        }

        completed.push(reqData.get('stage'));

        await pool.query(
            `
            UPDATE players
            SET completedstages = $1
            WHERE studentid = $2
        `,
            [completed.join(','), cookies.get('player')]
        );

        // Check list of completed stages and select a random from the stages table that isn't in the list
        let nextStage = Object.create(null);

        nextStage = await pool.query(
            `
            SELECT * FROM stages
            WHERE uuid NOT IN ($1)
            ORDER BY RANDOM()
            LIMIT 1
        `,
            [completed.join(',')]
        );

        // Update the target stage       
        await pool.query(
            `
            UPDATE players
            SET target = $1
            WHERE studentid = $2
        `,
            [nextStage.rows[0].uuid, cookies.get('player')]
        );

        // Increase Player score by 1
        await pool.query(
            `
            UPDATE players
            SET score = score + 1
            WHERE studentid = $1
        `,
            [cookies.get('player')]
        );

        throw redirect(302, `/stage`);
	}
} satisfies Actions;
