import type { PageServerLoad} from './$types';
import pg from 'pg';
const { Pool } = pg;

// Read in info from .env file
import { config } from 'dotenv';
config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

export const load: PageServerLoad = async ({ params }) => {
	let slug = params.slug;

	let stage = Object.create(null);

	stage = await pool.query(
		`
        SELECT * FROM stages
        WHERE id = $1
    `,
		[slug]
	);

	if (Object.keys(stage.rows).length === 0) {
		return {
			status: 404,
			message: 'Stage not found'
		};
	}

	return {
		status: 200,
		name: stage.rows[0].name,
		UUID: stage.rows[0].uuid,
	};
};