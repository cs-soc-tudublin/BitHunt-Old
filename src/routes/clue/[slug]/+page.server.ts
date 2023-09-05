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

let slug;
let clue: { password: FormDataEntryValue | null; next: any; };

export const load: PageServerLoad = async ({ params }) => {
    slug = params.slug;

    if(slug == "1"){
        const res = await pool.query('SELECT * FROM Clues WHERE Level = $1', [slug]);
        clue = res.rows[0];

        return{
            number: 1,
            slug: slug,
            clue: res.rows[0]
        }
    }
};

export const actions = {
    default: async ({ cookies, request }) => {
        let reqData = await request.formData()

        // Returns as format:
        // FormData {
        //     'answer' => [ 'answer' ]
        //   }

        let answer = reqData.get('answer');

        if(answer == clue.password){
            return{
                status: 200,
                message: clue.next
            }
        }
        else{
            return{
                status: 400,
                message: "Incorrect password."
            }
        }
    }
} satisfies Actions;