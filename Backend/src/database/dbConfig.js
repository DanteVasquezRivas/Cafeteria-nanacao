require('dotenv').config();
const { Pool } = require('pg');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const database = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    password: '1234',
    database: 'cafeteria',
    allowExitOnIdle: true
});

// console.log('DB_HOST:', DB_HOST);
// console.log('DB_USER:', DB_USER);
// console.log('DB_PASSWORD:', DB_PASSWORD);
// console.log('DB_NAME:', DB_NAME);

async function verificarConexion() {
    try {
        const client = await database.connect();
        console.log('Conexión exitosa a la base de datos');
        client.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

verificarConexion();

const initDB = async () => {
    await database.query(`
        CREATE TABLE IF NOT EXISTS cafes (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(20) NOT NULL
        );
    `);
};

const clearDB = async () => {
    await database.query(`
        DELETE FROM cafes;
    `);
};

module.exports = {
    database,
    query: (text, params) => database.query(text, params),
    initDB,
    clearDB
};
