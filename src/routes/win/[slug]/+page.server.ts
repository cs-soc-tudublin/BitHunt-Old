import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

// Read in info from .env file
import { config } from 'dotenv';
config();

export const load: PageServerLoad = async ({ cookies }) => {
	// Check cookie and redirect if invalid
    const cookie = cookies.get('player');
    let player;

    if (cookie) {
        player = await prisma.players.findFirst({
            where: {
                StudentID: cookie
            }
        });

        if (!player) {
            throw redirect(302, '/');
        }
    }

    // Check if get player.score and see if it equals the amount of stages
    const stages = await prisma.stages.findMany();

    console.log(player?.Score);

    if (player && player?.Score >= stages.length) {
        return {
            status: 200,
            message: 'You win!',
            cookie: cookie
        }
    }
    else{
        return{
            status: 403,
            message: 'You have not completed all the stages!'
        }
    }
};
