import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

// Read in info from .env file
import { config } from 'dotenv';
config();

// Load and grab cookie
export const load: PageServerLoad = async ({ cookies }) => {
	// Check if cookie is set
	const cookie = cookies.get('player');
	let validCookie = false;
	let player;

	// Check if cookie is valid
	if (cookie) {
		player = await prisma.players.findUnique({
			where: {
				StudentID: cookie
			}
		});

		if (player) {
			validCookie = true;
		} else {
			throw redirect(302, '/');
		}
	}
	
	// Check if get player.score and see if it equals the amount of stages
	const stages = await prisma.stages.findMany();

	if (player?.Score === stages.length) {
		await prisma.players.update({
			where: {
				StudentID: cookie
			},
			data: {
				FinishedEvent: true
			}
		});

		throw redirect(302, '/win/' + cookie);
	}

	// Check if target is null:
	if (player?.Target === null) {
		await prisma.players.update({
			where: {
				StudentID: cookie
			},
			data: {
				Target: {
					set: JSON.stringify({
						UUID: {
							select: {
								uuid: true
							},
							orderBy: {
								random: true
							},
							take: 1
						}
					})
				}
			}
		});

	}

	// Check if target exists
	const target = await prisma.stages.findUnique({
		where: {
			UUID: player?.Target
		}
	});

	if (target) {
		await prisma.players.update({
			where: {
				StudentID: cookie
			},
			data: {
				Target: {
					set: JSON.stringify({
						UUID: {
							select: {
								uuid: true
							},
							orderBy: {
								random: true
							},
							take: 1
						}
					})
				}
			}
		});
	}

	// Get current target stage
	const stage = await prisma.stages.findUnique({
		where: {
			UUID: player?.Target
		}
	});

	return {
		validCookie,
		player: player,
		clue: stage.Clue
	};
};
