const con = require('../database')
const bcrypt = require('bcrypt')

var count = 4;

exports.register = async (req, res) => {

    console.log(req.body);
    var is_not_registered = await can_register(req.body.email);

    if(!is_not_registered){
        res.status(400).send({
            message: "User has already registered"
        })
    }else{
        if (checkPassword(req.body.password, req.body.confirmPassword)){
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                
                var id  = await getCount();

                const employee = {
                    email: req.body.email,
                    password: hashedPassword,
                    role: 0,
                    username: req.body.username,
                }
    
                con.query("INSERT INTO users SET ?", employee, (err, result)=>{
                    if(err) throw err;
                    count ++;
    
                    res.status(200).send({
                        message: "User successfully registered"
                    })
                })
            } catch(e) {
                console.log(e);
                res.status(400).send({
                    message:"Register failed"
                })
            }

        } else {
            console.log(req.body.password, req.body.confirmPassword);
            res.status(400).json({
                message: "Please check your password or confirmation password"
            })
        }
    }
}

function can_register(email){
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE Email = "${email}"`, (err, result)=>{
            if(err) throw err;
            if(result.length == 0){
                resolve(true)
            }else{
                resolve(false)
            }
        })    
    })
}


function checkPassword (pass, conPass){

    if(pass === "" || pass === undefined){
        return false
    }

    if(conPass === "" || conPass === undefined){
        return false
    }

    if(pass !== conPass){
        return false
    }

    return true
}


function getCount(){
    return new Promise((resolve, reject) => {
        con.query(`SELECT COUNT(ID) as count FROM users`, (err, result) =>{
            if (err) throw err;
            resolve(result[0].count + 1)
        })
    })
}

exports.beliKue = async (req, res) => {
    try {
        const kue = req.body.kue;
        const userQueryResp = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM kue WHERE nama_kue = "${kue}"`, (err, result)=>{
                if(err) throw err;
                return resolve(result);
            })    
        });
        if (userQueryResp[0] === undefined) {
            con.query(`INSERT INTO kue SET ?`, kue, (err, result)=>{
                if(err) throw err;
                res.status(200)
                .send({ message: "kuenya laku 1" });
            });
        }
    } catch(e) {
      console.log(e);
      res
      .status(500)
      .send({msg: e.stack});
    }
}