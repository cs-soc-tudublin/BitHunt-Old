import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const actions = {
    default: async ({cookies, request}) => {
        let reqData = await request.formData();
        // Returns as format:
        // FormData {
        //  'name' => "string",
        //  'date' => "string",
        //  'location' => "string",
        //  'description' => "string",
        //  'prize' => "string",
        //  'prizeCount' => "number",
        //  'status' => "string",

        // Change Status to boolean
        let status = reqData.get('status') === "true" ? true : false;

        // Add to database
        await pool.query(
            'INSERT INTO events (name, date, location, description, prize, prizeCount, active) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [reqData.get('name'), reqData.get('date'), reqData.get('location'), reqData.get('description'), reqData.get('prize'), reqData.get('prizeCount'), status]
        );

        return{
            status: 200,
            message: reqData.get('name') + " created successfully"
        }

    }
} satisfies Actions;