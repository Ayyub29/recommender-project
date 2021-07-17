const con = require('../database');

exports.beliKue = async (req, res) => {
    try {
        const kue = req.query.kue;
        const userQueryResp = await new Promise((resolve, reject) => {
            con.query(`SELECT * FROM kue WHERE nama_kue = "${kue}"`, (err, result)=>{
                if(err) throw err;
                return resolve(result);
            })    
        });
        if (userQueryResp[0] === undefined) {
            con.query(`INSERT INTO kue (nama_kue) VALUES ("${kue}")`, kue, (err, result)=>{
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

exports.liatKue = async (req, res) => {
	try {
		con.query(`SELECT * FROM cardsimilarity`, (err, result)=>{
			if (err) throw err;
			console.log(result);
			res.status(200).send({
				message: "Here is your Request",
				data: result
			});
		})    
	} catch (e) {
		console.log(e.stack);
		res.status(400)
   		 .send({msg: e.stack});
	}
}

exports.updateKue = async (req, res) => {
	try {
		con.query(`SELECT * FROM kue`, (err, result)=>{
			if (err) throw err;
			console.log(result);
			res.status(200).send({
				message: "Here is your Request",
				data: result
			});
		})    
	} catch (e) {
		console.log(e.stack);
		res.status(400)
   		 .send({msg: e.stack});
	}
}