import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Read in info from .env file
import { config } from 'dotenv';
config();

export const load: PageServerLoad = async ({ request, cookies }) => {
	// Remove 'player' cookie
	cookies.delete('player');

	cookies.set('message', 'Logged out Successfully', { path: '/' });
	throw redirect(307, '/');
};
