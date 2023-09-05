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
        //  "password" => "string"
        // }

        console.log(reqData.get('password'));

        let res = await pool.query('SELECT * FROM Users WHERE name = $1', ["admin"]);

        const clues = await pool.query('SELECT * FROM Clues');

        const users = await pool.query('SELECT * FROM Users');

        if(res.rows[0].studentid == reqData.get('password')){
            return{
                status: 200,
                clues: clues.rows,
                users: users.rows
            }
        }
        else{
            throw redirect(302, "/")
        }
    }
} satisfies Actions;