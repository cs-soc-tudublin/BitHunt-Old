import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

// Read in info from .env file
import { config } from 'dotenv';
config();

/*
    Hello code readers, (future me included, and any potential employers)
    This file is quite a mess, and I'm sorry for that.
    Due to time-constraints, this was the easiest way to get the page to work.
    There is a much better way to do this, and I will be doing that in the future,
    for the 1.0.0 release of this project. (Along with fixing the rest of the code).
    Do pardon the mess, and don't forget to wipe your feet before you leave.
*/


export const load = (async ({ params, cookies }) => {
    const slug = params.slug;

    if(cookies.get('player') === undefined){
        throw redirect(302, '/login')
    }

    // Search for stages w/ UUID = slug
    let stage = Object.create(null);
    let player = Object.create(null);

    stage = await prisma.stages.findUnique({
        where: {
            UUID: slug
        }
    });

    player = await prisma.players.findUnique({
        where: {
            StudentID: cookies.get('player')
        }
    });

    // Does this stage exist?
    if (stage) {
        return {
            status: 404,
            message: 'Stage not found',
            player: player
        };
    }
    else{
        // Is this their target stage?
        if(params.slug !== player.Target){
            // Get the clue for the target stage
            let clue = Object.create(null);

            clue = await prisma.stages.findUnique({
                where: {
                    UUID: player.rows[0].target
                }
            });

            return {
                status: 403,
                message: 'Not your target stage',
                player: player,
                clue: clue.Clue
            };
        }
        else{
            return {
                status: 200,
                stage: stage.rows[0],
                player: player.rows[0]
            };
        }
    }
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ cookies, request }) => {
		const reqData = await request.formData();

		// Returns as format:
		// FormData {
		//  "stage" => "string"
		// }

		// Update the completed stages column in the database
        let player = Object.create(null);

        player = await prisma.players.findUnique({
            where: {
                StudentID: cookies.get('player')
            }
        });

        let completed = player.rows[0].completedstages;

        if(completed === null){
            completed = [];
        }
        else{
            completed = completed.split(',');
        }

        completed.push(reqData.get('stage'));

        await prisma.players.update({
            where: {
                StudentID: cookies.get('player')
            },
            data: {
                CompletedStages: {
                    set: completed
                }
            }
        });


        // Check list of completed stages and select a random from the stages table that isn't in the list
        let nextStage = Object.create(null);

        let queryString = 'SELECT * FROM stages WHERE uuid NOT IN (';

        for(let i = 0; i < completed.length; i++){
            queryString += `'` + completed[i] + `'`;

            if(i !== completed.length - 1){
            queryString += `, `;
            }
        }

        queryString = queryString.slice(0, -1) + `') ORDER BY RANDOM() LIMIT 1`;

        console.log(queryString);

        nextStage = await prisma.$queryRaw`${queryString}`;

        // Increase Player score by 1
        await prisma.players.update({
            where: {
            StudentID: cookies.get('player')
            },
            data: {
            Score: {
                increment: 1
            }
            }
        });

        // Check length of nextStage
        if(nextStage.length === 0){
            await prisma.players.update({
                where: {
                    StudentID: cookies.get('player')
                },
                data: {
                    FinishedEvent: true
                }
            });

            throw redirect(302, '/win/' + cookies.get('player'));
        }

        // Update the target stage       
        await prisma.players.update({
            where: {
                StudentID: cookies.get('player')
            },
            data: {
                Target: nextStage.rows[0].uuid
            }
        });

        throw redirect(302, `/stage`);
	}
} satisfies Actions;
