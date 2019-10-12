const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '1995op1995',
    host: "localhost",
    post: 5432,
    database: 'drivers'
});

module.exports = client;