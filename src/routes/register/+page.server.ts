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
        //  "name" => "string",
        //  "studentid" => "string",
        //  "privacy" => "integer"
        // }

        // Check if account already exists

        const checkQuery = {
            text: 'SELECT * FROM Players WHERE studentid = $1',
            values: [reqData.get('studentid')?.toString().toLowerCase()]
        }

        const checkResult = await pool.query(checkQuery);

        if(checkResult.rowCount != 0) {
            // Account already exists
            return {
                status: 500,
                message: 'Account already exists'
            }
        }

        // Create account

        // Get current event name

        const currentEvent = await pool.query('SELECT * FROM Events WHERE active = true');

        if(currentEvent.rowCount == 0) {
            // No active event
            return {
                status: 500,
                message: 'No active event'
            }
        }

        // Create account

        // Turn privacy into boolean
        let privacy = false;
        if(reqData.get('privacy') == "1") {
            privacy = true;
        }

        const createQuery = {
            text: 'INSERT INTO Players (name, studentid, privacy, event, score) VALUES ($1, $2, $3, $4, $5)',
            values: [reqData.get('name')?.toString(), reqData.get('studentid')?.toString().toLowerCase(), privacy, currentEvent.rows[0].id, 0]
        }

        await pool.query(createQuery);

        // Set cookie
        

        // Set message
        cookies.set('message', 'Account Created!', { path: '/stage' });

        throw redirect(301, '/stage');

    }
} satisfies Actions;