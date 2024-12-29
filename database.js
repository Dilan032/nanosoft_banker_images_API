const mysql = require('mysql2');
require('dotenv').config(); // Get environment variables from the .env file

// Function to create and maintain MySQL connections
function handleDisconnect() {
    const db1 = mysql.createConnection({
        host: process.env.DATABASE_1_HOST,
        user: process.env.DATABASE_1_USER,
        password: process.env.DATABASE_1_PASSWORD,
        database: process.env.DATABASE_1,
    });

    const db2 = mysql.createConnection({
        host: process.env.DATABASE_2_HOST,
        user: process.env.DATABASE_2_USER,
        password: process.env.DATABASE_2_PASSWORD,
        database: process.env.DATABASE_2,
    });

    const connectToDatabase = (db, dbName) => { 
        db.connect((err) => {
            if (err) {
                console.error(`Error connecting to ${dbName}:`, err);
                setTimeout(() => connectToDatabase(db, dbName), 2000); // Retry connection after 2 seconds
            } else {
                console.log(`Connected to ${dbName}`);
            }
        });

        db.on('error', (err) => {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error(`${dbName} connection lost. Reconnecting...`);
                connectToDatabase(db, dbName); // Reconnect on connection lost
            } else {
                throw err;
            }
        });
    };

    connectToDatabase(db1, 'Database 1');
    connectToDatabase(db2, 'Database 2');

    return { db1, db2 };
}

// Establish initial connections
const { db1, db2 } = handleDisconnect();

// Export the database connections
module.exports = { db1, db2 };
