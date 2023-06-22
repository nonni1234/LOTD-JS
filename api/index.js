require('dotenv').config();
const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password
})

const query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

module.exports = { query }