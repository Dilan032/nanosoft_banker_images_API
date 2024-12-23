const mysql = require('mysql2');
require('dotenv').config(); // get envirment variables in (.env file)

// Function to create and maintain MySQL connection
function handleDisconnect() {
    const db1 = mysql.createConnection({
        host: process.env.DATABASE_1_HOST,
        user: process.env.DATABASE_1_USER,
        password: process.env.DATABASE_1_PASSWORD,
        database: process.env.DATABASE_1
    });

    const db2 = mysql.createConnection({
        host: process.env.DATABASE_2_HOST,
        user: process.env.DATABASE_2_USER,
        password: process.env.DATABASE_2_PASSWORD,
        database: process.env.DATABASE_2
    });

    // Connect to the MySQL server db1
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
            setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds if error occurs
        } else {
            console.log('Connected to MySQL database');
        }
    });

    // Connect to the MySQL server db2
    db2.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL database:', err);
            setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds if error occurs
        } else {
            console.log('Connected to MySQL database');
        }
    });

    // Handle connection errors and automatic reconnection db1
    db1.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('MySQL database connection lost. Reconnecting...');
            handleDisconnect(); // Reconnect on connection lost
        } else {
            throw err; 
        }
    });

     // Handle connection errors and automatic reconnection db2
     db2.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('MySQL database connection lost. Reconnecting...');
            handleDisconnect(); // Reconnect on connection lost
        } else {
            throw err; 
        }
    });

    return db1, db2;
}

// Establish initial connection
const db1 = handleDisconnect();
const db2 = handleDisconnect();

//export the db (connection)
module.exports = db1, db2;