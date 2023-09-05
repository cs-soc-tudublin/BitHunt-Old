import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import pg from 'pg';
import { uuid } from 'uuidv4';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const actions = {
    default: async ({ cookies, request }) => {
        let reqData = await request.formData()
        
        // Returns as format:
        // FormData {
        //     "name" => "string",
        //     "studentid" => "string",

        // Check if user exists by Student ID
        let res = await pool.query(
            'SELECT * FROM users WHERE studentid = $1',
            [reqData.get('studentid')]
        );

        // If user exists, say so
        if(res.rows.length > 0){
            return{
                code: 500,
                message: "User exists"
            }
        }
        else{
            // Write to table Users
            await pool.query(
                'INSERT INTO users (name, studentid, uuid, level) VALUES ($1, $2, $3, $4)',
                [reqData.get('name'), reqData.get('studentid'), uuid(), 0]
            );

            // Redirect to clue 1
            throw redirect(302, "/clue/1");
        }

        
    }
} satisfies Actions;