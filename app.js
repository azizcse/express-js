const express = require('express')
const path = require('path')
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({
    path:'./.env'
})

const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    port:'8889',
    user: 'root',
    password: 'root',
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

//For form submission
app.use(express.urlencoded({extended:false}));
//Parse JSON bodies (as sent by api clients)
app.use(express.json());
//


app.set('view engine','hbs');

db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log('My sql connected')
    }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5001,()=>{
    console.log("server started from")
})