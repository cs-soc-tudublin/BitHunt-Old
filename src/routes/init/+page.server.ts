import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import pg from 'pg';
import { uuid } from 'uuidv4';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const load = (async () => {

    // List all tables in the database
    const res = await pool.query(`
        SELECT *
        FROM pg_catalog.pg_tables
        WHERE schemaname != 'pg_catalog' AND
            schemaname != 'information_schema'
    `);

    let tables = res.rows.map((row) => row.tablename);

    if(!tables.includes("users")){
        await pool.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    studentid TEXT NOT NULL,
                    uuid TEXT NOT NULL,
                    level INTEGER NOT NULL
                )
            `);
    }

    if(!tables.includes("clues")){
            await pool.query(`
                CREATE TABLE clues (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    level INTEGER NOT NULL,
                    password TEXT NOT NULL,
                    next TEXT NOT NULL,
                    uuid TEXT NOT NULL
                )
            `);
    }

    // Check if admin user exists
    const admin = await pool.query(
        'SELECT * FROM users WHERE name = $1',
        ["admin"]
    );

    // If admin user exists, redirect to admin page
    if(admin.rows.length > 0){
        throw redirect(302, "/admin");
    }
    else{
        return{
            code: 400
        }
    }
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ cookies, request }) => {
        let reqData = await request.formData()

        // Returns as format:
        // FormData {
        //   "password" => "string"
        // }

        // Check if admin user exists
        let res = await pool.query(
            'SELECT * FROM users WHERE name = $1',
            ["admin"]
        );

        // If admin user exists, check if password is correct
        if(res.rows.length > 0){
            if(reqData.get('password') == "admin"){
                // Redirect to admin page
                throw redirect(302, "/admin");
            }
            else{
                throw redirect(302, "/");
            }
        }
        else{
            // Write to table Users
            await pool.query(
                'INSERT INTO users (name, studentid, uuid, level) VALUES ($1, $2, $3, $4)',
                ["admin", reqData.get('password'), uuid(), 9999]
            );

            // Redirect to admin page
            throw redirect(302, "/admin");
        }
    }
} satisfies Actions;