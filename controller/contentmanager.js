const express = require('express');
const db = require('../database');
const { check, validationResult } = require('express-validator');

exports.createContent = async (req, res) => {
	try { 
		const title = req.body.title;
		const desc = req.body.desc;
		const image = req.body.image;
		const click = req.body.click;
		// Create success
		if (title != undefined && desc != undefined && image != undefined && click != undefined){
			db.query(`INSERT INTO content(title, description, image_source, amount_click) VALUES ("${title}", "${desc}", "${image}", "${click}")`, (err, result)=>{
				if (err) {
					throw new Error("Duplicate entry for Content Title!")
				}
				res.status(200).send({
					message: "Content successfully registered"
				})
			});
		}
		else {
			throw new Error("Your data is not complete!")
		}
	} catch (e) {
			res.status(400).send({ msg: e.message });
	}
}

exports.updateContent = async (req, res) => {
	try {
		const id = req.params.id;
		const title = req.body.title;
		const desc = req.body.desc;
		const image = req.body.image;
		const click = req.body.click;

		db.query(`UPDATE pabrik SET title = "${title}", description = "${desc}", image_source = "${image}", amount_click = "${click}" WHERE id = "${id}"`, (err, result)=>{
			if (err) {
				throw new Error("Id not found or credentials not complete!")
			}
			console.log(result);
			res.status(200).send({
				message: result.message
			})
		});
		
	} catch (e) {
			res.status(400).send({ msg: e.message });
	}
}

exports.updateClick = async (req, res) => {
	try {
		const id = req.params.id;

		db.query(`UPDATE content SET amount_click = amount_click+1 WHERE id = "${id}"`, (err, result)=>{
			if (err) {
				throw new Error("Id not found or credentials not complete!")
			}
			console.log(result);
			res.status(200).send({
				message: result.message
			})
		});
		
	} catch (e) {
			res.status(400).send({ msg: e.message });
	}
}


exports.getContent = async (req, res) => {
	try {
		db.query(`SELECT * FROM content`, (err, result)=>{
			if (err) throw err;
			console.log(result);
			res.status(200).send({
				message: "Here is your Request",
				data: result
			})
		})    
	} catch (e) {
		console.log(e.stack);
		res.status(400)
   		 .send({msg: e.stack});
	}
}

exports.deleteContent = async (req, res) => {
	try {
	  var id = req.params.id;
	  db.query(`DELETE FROM content WHERE id = ${id}`, (err, result)=>{
		if (err) throw err;
		console.log(result);
		res.status(200).send({
			message: "Successfully Deleted!",
		})
	}) 
	} catch (e) {
	  console.log(e.stack)
	  res.status(400)
		.send({ msg: e.stack })
	}
  }
  