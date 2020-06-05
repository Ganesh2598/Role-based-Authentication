const db = require("../models/db");
const bcrypt = require("bcrypt");
const user = db.user;
const roles = db.roles;
const options = db.Sequelize.Op;
const jwt = require("jsonwebtoken");

require("dotenv").config();



exports.create=(req, res) =>{
    if(!req.query.email || !req.query.password || !req.query.name){
        res.status(400).send({
            msg : "No empty fields allowed"
        })
    }

    const User = {
        name : req.query.name,
        email : req.query.email,
        password : bcrypt.hashSync(req.query.password,10)
    }

    const role = {
        role_name : req.query.role,
        permission : req.query.permission
    }

    if (role.role_name != "user" && role.role_name != "seller"){
        res.status(400).send({
            msg : "Invalid role"
        })
    }
    
    roles.findOne({where : {role_name : role.role_name}})
    .then(data =>{
        User.roleId = data.dataValues.role_id;
        if (role.role_name == "user"){
            User.status = "Approved"
        }
        if (role.role_name == "seller"){
            User.status = "Pending"
        }
        user.create(User)
        .then(data =>{
            res.send({
                msg : "inserted successfully"
            })
        })
        .catch(err =>{
            msg : err.message
        })
    })
    .catch(err =>{
        msg : err.message
    })
}

exports.findAll = (req,res) =>{
    user.findAll()
        .then(data => {
            console.log(data)
            res.status(200).send({
                msg : "viewed"
            })
        })
        .catch(err => {
            res.send(500).send({
                msg : err.message || "something happened"
            })
        })
}

exports.findOne = (req,res) =>{
    const email = req.query.email
    const password = req.query.password

    user.findOne({where : {email : email}})
        .then(data =>{
            if(data){
                if(bcrypt.compareSync(password,data.password)){
                    if (data.dataValues.status == "Approved"){
                        const token = jwt.sign({
                            email : data.email,
                            password : data.password
                        },process.env.SECRET,
                        {
                            expiresIn : "1h"
                        })
                        
                        res.send({
                            msg : "Successful",
                            token : token
                        })
                    }else{
                        res.send({
                            msg : "Waiting for the approval"
                        })
                    }
                    
                }else{
                    res.status(200).send({
                        msg : "Invalid Password"
                    })
                }

            }else{
                res.status(200).send({
                    password : "no user found"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg : err.message || "something went wrong"
            })
        })
}
