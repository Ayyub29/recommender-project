const express = require('express');
const db = require('../database');

const crypto = require('crypto');
// const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const cookies_lifetime = 7 * 24 * 3600; // 7 Days

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    // console.log(email);
    const userQueryResp = await new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE Email = "${email}" OR username = "${email}"`, (err, result)=>{
            if(err) throw err;
            return resolve(result);
        })    
    });
    console.log(userQueryResp[0]);
    if (userQueryResp[0] !== undefined) {
      const hashedPassword = await bcrypt.compare(req.body.password, userQueryResp[0].Password);
      if (hashedPassword){
        const userData = userQueryResp[0];
        const token = crypto.randomBytes(10).toString('hex');
        db.query(`UPDATE users SET token = "${token}" WHERE ID = "${userData.ID}"`, (err, result)=>{
            if(err) throw err;
            const response = {
              token,
              ID: userData.ID,     
              role: userData.Role,
              username: userData.Username
            }
            res.status(200)
            .cookie('token', token, { maxAge: cookies_lifetime, path: '/' })
            .cookie('ID', userData.ID)
            .send({ data: response });
        })
      }
    } else {
      res.status(404).send({ msg: "Email or Password Not Found" });
    }
  } catch(e) {
    console.log(e);
    res
    .status(500)
    .send({msg: e.stack});
  }
}

exports.validateToken = async (req, res) => {
  try {
    const { token } = req.body || req.cookies;
    const tokenQueryResp = await db.query(`SELECT * FROM users WHERE token = "${token}"`);
    if(tokenQueryResp.rows.length !== 0) {
      const userData = tokenQueryResp.rows[0];
      const response = {
        token: userData.token,
        ID: userData.ID,
        Role: userData.Role 
      }
      res.status(200)
      .cookie('token', token, { maxAge: cookies_lifetime })
      .cookie('ID', userData.ID, { maxAge: cookies_lifetime })
      .send({ data: response });
    } else {
      // logout user cuz not valid
      res.status(404)
      .cookie('token', '', { maxAge: 0 })
      .cookie('ID', '', { maxAge: 0 })
      .send({ msg: "token didn't valid" });
    }
  } catch (e) {
    console.log(e.stack);
    res
    .status(500)
    .send({msg: e.stack});
  }
}

exports.logout = async (req, res) => {
  try {
    const { ID , token } = req.cookies;
    const userQueryResp = await db.query(`SELECT * FROM users WHERE ID = "${ID}" AND token = "${token}"`);
    if(userQueryResp != undefined) {
      const token = crypto.randomBytes(100).toString('hex');
      const updateTokenQuery = await db.query(`UPDATE users SET token = "${token}" WHERE ID = "${ID}"`);
      res.status(200)
      .cookie('token', '', { maxAge: 0 })
      .cookie('ID', '', { maxAge: 0 })
      .send({ msg: "Logged out" });
    } else {
      res.status(404)
      .cookie('token', '', { maxAge: 0 })
      .cookie('ID', '', { maxAge: 0 })
      .send({ msg: "user not found" });
    }
  } catch (e) {
    console.log(e.stack);
    res.status(500)
    .send({msg: e.stack});
  }
}