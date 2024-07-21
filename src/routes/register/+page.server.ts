import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

// Read in info from .env file
import { config } from 'dotenv';
config();

export const actions = {
	default: async ({ cookies, request }) => {
		const reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "name" => "string",
		//  "studentid" => "string",
		//  "privacy" => "integer"
		// }

		// Check if account already exists

		const existingPlayer = await prisma.players.findFirst({
			where: {
				StudentID: reqData.get('studentid')?.toString().toLowerCase()
			}
		});

		if (existingPlayer) {
			// Account already exists
			return {
				status: 500,
				message: 'Account already exists'
			};
		}

		// Create account

		// Get current event name

		const currentEvent = await prisma.events.findFirst({
			where: {
				Active: true
			}
		});

		if (currentEvent) {
			// No active event
			return {
				status: 500,
				message: 'No active event'
			};
		}

		// Create account

		// Turn privacy into boolean
		let privacy = false;
		if (reqData.get('privacy') == '1') {
			privacy = true;
		}

		const createQuery = {
			text: 'INSERT INTO Players (name, studentid, privacy, event, score) VALUES ($1, $2, $3, $4, $5)',
			values: [
				reqData.get('name')?.toString(),
				reqData.get('studentid')?.toString().toLowerCase(),
				privacy,
				currentEvent.rows[0].id,
				0
			]
		};

		const createdPlayer = await prisma.players.create({
			data: {
				Name: reqData.get('name')?.toString(),
				StudentID: reqData.get('studentid')?.toString().toLowerCase(),
				Privacy: privacy,
				Event: currentEvent.rows[0].id,
				Score: 0
			}
		});

		const player = await prisma.players.findUnique({
			where: {
				StudentID: reqData.get('studentid')?.toString().toLowerCase()
			}
		});

		// Check if target is null:
		if (!player?.Target) {
			await prisma.players.update({
				where: {
					StudentID: reqData.get('studentid')?.toString().toLowerCase()
				},
				data: {
					Target: {
						set: {
							UUID: true
						}
					}
				}
			});
		}

		// Check if target exists
		const target = await pool.query(
			`
				SELECT *
				FROM stages
				WHERE uuid = $1
			`,
			[player.rows[0].target]
		);

		if (target.rows.length === 0) {
			await pool.query(
				`
				UPDATE players
				SET target = (
					SELECT UUID FROM stages
					ORDER BY RANDOM()
					LIMIT 1
				)
				WHERE studentid = $1
			`,
				[reqData.get('studentid').toString().toLowerCase()]
			);
		}

		// Set cookie
		cookies.set('player', reqData.get('studentid').toString().toLowerCase(), {
			maxAge: 7200,
			secure: false
		});

		// Set message
		cookies.set('message', 'Account Created!', { path: '/stage' });

		throw redirect(302, '/stage');
	}
} satisfies Actions;
