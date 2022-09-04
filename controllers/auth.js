const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const db = mysql.createConnection({
    host: 'localhost',
    port:'8889',
    user: 'root',
    password: 'root',
    database: process.env.DATABASE
})

exports.register = (req, res)=>{
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?',[email],async (error, results)=>{
        if(error){
           console.log(error) 
        }

        if(results.length>0){
            return res.render('register',{
                message:"This email is already in used"
            })
        }else if(password !== passwordConfirm){
            return res.render('register',{
                message:"Password do not match"
            })
        }

        let hasedPassword = await bcrypt.hash(password, 8);
        console.log(hasedPassword)

        db.query("INSERT INTO users SET ?",{name:name, email:email,password:hasedPassword},(error, results)=>{
            if(error){
                console.log(error)
            }else{
                console.log(results);
                return res.render('register',{
                    message:"User register"
                });
            }

        })
    });

}