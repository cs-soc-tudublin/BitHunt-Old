import type { PageServerLoad } from './$types';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


export const load: PageServerLoad = async ({ cookies }) => {
    // Get a list of all events
    const events = await pool.query(`
        SELECT *
        FROM events
    `);

    let message = cookies.get('message');
    cookies.set('message', '', { path: '/admin/events' })

    return {
        status: 200,
        events: events.rows,
        message: message
    };
};