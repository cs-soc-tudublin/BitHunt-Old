import { redirect } from '@sveltejs/kit';
import { databaseIntegrity } from '$lib/server/database';
import type { PageServerLoad, Actions } from './$types';

// Read in info from .env file
import { config } from 'dotenv';
config();

export const load: PageServerLoad = async ({ request, cookies }) => {
    // Check database integrity
    const dbSecure = await databaseIntegrity(process.env.DATABASE_URL);
    let dbMessage = "";

    if(dbSecure == 0) {
        dbMessage = "Database repaired."
    }
    else{
        dbMessage = "Database integrity verified."
    }

    // Check if admin cookie is set
    if (cookies.get('admin') === 'true') {
        // Return success
        return {
            status: 200,
            message: 'Successfully logged in, ' + dbMessage
        }
    } else {
        // Return failure
        return {
            status: 500,
            message: 'Not logged in, ' + dbMessage
        }
    }
}

export const actions = {
    login: async ({ cookies, request }) => {
        let reqData = await request.formData()

        // Returns as format:
        // FormData {
        //  "password" => "string"
        // }

        // Check if password is correct from .env file
        if (reqData.get('password') === process.env.ADMIN_PASSWORD) {
            // Set cookie to true, with age of 2 hours
            cookies.set('admin', 'true', {
                maxAge: 7200,
                secure: false
            })

            // Return success
            return {
                status: 200,
                message: 'Successfully logged in'
            }
        } else {
            // Return failure
            return {
                status: 500,
                message: 'Incorrect password'
            }
        }
    },
    logout: async ({ cookies }) => {
        console.log("logging out");
        // Set cookie to false, with age of -1 (expires immediately)
        cookies.set('admin', 'false', {
            maxAge: -1,
            path: '/'
        })

        throw redirect(307, '/admin');
    }
} satisfies Actions;