const Pool= require('pg').Pool;

require('dotenv').config({
    path:'./.env'
});



const pool = new Pool({
    user:'postgres',
    password:'root',
    host:'localhost',
    port:5432,
    database:"dbtareas"
});

module.exports=pool;
