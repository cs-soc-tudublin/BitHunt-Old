import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

// Read in info from .env file
import { config } from 'dotenv';
config();

export const load: PageServerLoad = async ({ cookies }) => {
	// Check if cookie is set
	const cookie = cookies.get('player');
	let validCookie = false;

	const message = cookies.get('message');
	cookies.set('message', '', { path: '/' });

	// Check if cookie is valid
	if (cookie) {
		const player = await prisma.players.findUnique({
			where: {
				StudentID: cookie
			}
		})

		// Set validCookie to true if so
		if (player) {
			validCookie = true;
		}
	}

	// Get a list of all events
	const events = await prisma.events.findMany({
		where: {
			OR: [
				{
					Active: true
				},
				{
					Active: false
				}
			]
		}
	});

	// Loop through and see if any events are active
	let active = false;

	for (const event of events) {
		if (event.Active) {
			active = true;

			return {
				status: 200,
				event: event,
				validCookie: validCookie,
				log: message
			};
		}
	}

	if (!active) {
		return {
			status: 404,
			message: 'No active events',
			log: message
		};
	}
};
