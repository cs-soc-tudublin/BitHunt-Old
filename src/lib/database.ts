import { Client } from 'pg';
import Schema from '$lib/schema.json';

interface Table {
    [key: string]: {
        [key: string]: string;
    };
}

interface Database {
    Tables: Table;
}

// This checks the Database to see if the correct tables are present, and if not, creates them
// It also checks if the correct columns are present, and if not, creates them.
// It returnes multiple values:
// 0: Database was missing tables/columns but they have been created,
// 1: Database is secure,
export const databaseIntegrity = async (databaseURL: any) => {
    let returnVal = 0;
    // Open and parse schema
    const schema = JSON.parse(JSON.stringify(Schema));

    // Connect to database
    const client = new Client({
        connectionString: databaseURL
    });

    await client.connect();

    // Get list of all tables
    const res = await client.query(`
        SELECT *
        FROM pg_catalog.pg_tables
        WHERE schemaname != 'pg_catalog' AND
            schemaname != 'information_schema'
    `);

    // Create list of all tables in db
    let tables = [];
    for (const row of res.rows) {
        tables.push(row.tablename);
    }

    // Create list of all tables in schema
    let schemaTables = [];
    for (const table in schema.Tables) {
        schemaTables.push(table.toLowerCase());
    }

    // Check what schema tables are missing from DB
    let missingTables = [];

    for (const table of schemaTables) {
        if (!tables.includes(table)) {
            missingTables.push(table);
        }
    }

    if(missingTables.length === 0) {
        returnVal = 1;
    }

    // Create missing tables using schema
    for (const table of missingTables) {
        // Capitalise table name
        const capitalisedTable = table.charAt(0).toUpperCase() + table.slice(1);

        // Create query string
        let queryString = `CREATE TABLE ${capitalisedTable} (`;

        // Add columns to query string
        for (const column in schema.Tables[capitalisedTable]) {
            queryString += `${column} ${schema.Tables[capitalisedTable][column]}, `;
        }

        // Remove last comma and space
        queryString = queryString.slice(0, -2);

        // Add closing bracket
        queryString += ');';

        // Execute query
        await client.query(queryString);
    }

    // Check all tables in DB are not malformed
    const newres = await client.query(`
        SELECT *
        FROM pg_catalog.pg_tables
        WHERE schemaname != 'pg_catalog' AND
            schemaname != 'information_schema'
    `);

    // Create list of all tables in db
    let newTables = [];
    for (const row of newres.rows) {
        newTables.push(row.tablename);
    }

    // Check all tables in DB are not malformed
    for (const table of newTables) {
        // Capitalise table name
        const capitalisedTable = table.charAt(0).toUpperCase() + table.slice(1);

        // Get columns in table
        const columns = await client.query(`
            SELECT *
            FROM information_schema.columns
            WHERE table_name = '${table}'
        `);

        // Create list of all columns in table
        let columnNames = [];
        for (const row of columns.rows) {
            columnNames.push(row.column_name);

            // Make all lowercase
            columnNames = columnNames.map((column) => {
                return column.toLowerCase();
            });
        }

        // Check all columns in table are not malformed
        for (const column in schema.Tables[capitalisedTable]) {
            // Make all lowercase
            const capitalisedColumn = column.toLowerCase();

            if (!columnNames.includes(capitalisedColumn)) {
                // Create query string
                let queryString = `ALTER TABLE ${capitalisedTable} ADD COLUMN ${column} ${schema.Tables[capitalisedTable][column]};`;    

                // Execute query
                await client.query(queryString);

                returnVal = 1;
            }
        }
    }

    return returnVal;
};