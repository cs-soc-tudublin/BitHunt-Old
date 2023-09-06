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
    // Check if cookie is set
    const cookie = cookies.get('player');
    let validCookie = false;

    let message = cookies.get('message');
    cookies.set('message', '', { path: '/' })

    // Check if cookie is valid
    if(cookie) {
        const player = await pool.query(`
            SELECT *
            FROM players
            WHERE studentid = $1
        `, [cookie]);

        if(player.rows.length > 0) {
            validCookie = true;
        }
    }

    // Get a list of all events
    const events = await pool.query(`
        SELECT *
        FROM events
    `);

    // Loop through and see if any events are active
    let active = false;

    for(let event of events.rows) {
        if(event.active) {
            active = true;

            return{
                status: 200,
                event: event,
                validCookie: validCookie,
                log: message
            }
        }
    }

    if(!active){
        return {
            status: 404,
            message: 'No active events',
            log: message
        }
    }
}