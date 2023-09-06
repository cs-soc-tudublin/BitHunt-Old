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

export const load: PageServerLoad = async () => {
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
                event: event
            }
        }
    }

    if(!active){
        return {
            status: 404,
            message: 'No active events'
        }
    }
}