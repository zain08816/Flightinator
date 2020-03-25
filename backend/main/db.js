const { Pool } = require('mysql')

const pool = new Pool({
    user: 'skkza',
    host: 'localhost',
    database: 'mysql',
    password: '',
    post: 6000
})

module.exports = pool