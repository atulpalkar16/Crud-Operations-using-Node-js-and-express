import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const con = mysql.createConnection( {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

con.connect((err)=> {
    if(err) return console.error('could not connect with db');
     
    console.log('connected');
});

export default con;