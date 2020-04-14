const { Pool } = require('mysql')

const pool = new Pool({
    user: 'test',
    host: 'cs336-skkza.c7ce4qsxirkj.us-east-2.rds.amazonaws.com',
    database: 'flightinator',
    password: process.env.DATABASE_PASSWORD,
    post: 3306
})

module.exports = pool