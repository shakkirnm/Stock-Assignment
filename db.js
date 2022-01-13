const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "asdfgh",
    database : "stocks",
    host : "localhost",
    port : 5432
})

module.exports = pool ; 