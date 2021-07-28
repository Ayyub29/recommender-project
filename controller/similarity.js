const con = require('../database');

//insert program value into similarity matrix
exports.beliKue = async (req, res) => {
    try {
        const kue = req.query.kue;
        const userQueryResp = await new Promise((resolve, reject) => { //checking if program available in the matrix
            con.query(`SELECT * FROM kue WHERE nama_kue = "${kue}"`, (err, result)=>{
                if(err) throw err;
                return resolve(result);
            })    
        });
        if (userQueryResp[0] === undefined) { //if program not in similarity matrix, insert program
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

//get similarity matrix
exports.liatKue = async (req, res) => {
	try {
		con.query(`SELECT * FROM cardsimilarity`, (err, result)=>{
			if (err) throw err;
            var result_data = [];
			for (var i in result){
                var row = [result[i].card1,result[i].card2,result[i].card3,result[i].card4,result[i].card5,result[i].card6];
                result_data.push(row);
            }
			res.status(200).send({
				message: "Here is your Request",
				data: result_data
			});
		}) 
	} catch (e) {
		console.log(e.stack);
		res.status(400)
   		 .send({msg: e.stack});
	}
}

//Updating similarity matrix
exports.updateKue = async (req, res) => {
	try {
        const daftarKue = await new Promise((resolve, reject) => {
            con.query(`SELECT * FROM kue`, (err, result)=>{
                if(err) throw err;
                return resolve(result);
            })    
        });
        daftar_kue = [];
        for (i in daftarKue){
            if (daftarKue[i].nama_kue != 'undefined'){
                var kue = daftarKue[i].nama_kue.split('a');
                var meanKue = getMeanArr(kue);
                var maxKue = parseInt(getMaxArr(kue));
                var minKue = parseInt(getMinArr(kue));
                for (j in kue){
                    kue[j] = (kue[j] - meanKue) / (maxKue - minKue);
                }
                daftar_kue.push(kue);
            }
        }
        similarity_list = {};
        list_kue = transpose(daftar_kue);
        for (k in list_kue){
            for (l in list_kue){
                var sim = getSimilarity(list_kue[k],list_kue[l]).toFixed(3);
                if (k in similarity_list){
                    similarity_list[k][l] = sim;
                } else {
                    similarity_list[k] = [sim];
                }
            }
        }
        for (m in similarity_list){
            var var_name = parseInt(parseInt(m) + 1).toString();
            con.query(`UPDATE cardsimilarity SET card1 = ${parseFloat(similarity_list[m][0])}, card2 = ${parseFloat(similarity_list[m][1])},card3 = ${parseFloat(similarity_list[m][2])},card4 = ${parseFloat(similarity_list[m][3])},card5 = ${parseFloat(similarity_list[m][4])},card6 = ${parseFloat(similarity_list[m][5])} WHERE name=${var_name}`, (err, result) => {
				if (err) throw err;
                // console.log(result);
			})
        }
        res.status(200).send({
            message: "Here is your Request",
            data: similarity_list
        });
	} catch (e) {
		console.log(e.stack);
		res.status(400)
   		 .send({msg: e.stack});
	}
}

//searching max value of a regular array
// @param array
// @result maximum value of an array
function getMaxArr(arr) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i]) > parseInt(max))
            max = arr[i];
    }
    return max;
}

//searching min value of a regular array
// @param array
// @result minimum value of an array
function getMinArr(arr) {
    var min;
    for (var i=0 ; i<arr.length ; i++) {
        if (min == null || parseInt(arr[i]) < parseInt(min))
            min = arr[i];
    }
    return min;
}

//searching mean value of a regular array
// @param array
// @result mean value of an array
function getMeanArr(arr) {
    var sum = 0;
    for (var i=0 ; i < arr.length ; i++) {
        sum += parseInt(arr[i]);
    }
    return sum/(arr.length);
}

//calculate dot product of two vector
// @param two vector
// @result dot product of two vector
function getDotProduct(vec1, vec2){
    var result = 0;
    for (var i=0 ; i < vec1.length ; i++){
        result += vec1[i] * vec2[i];
    }
    return result;
}

//calculate magnitude of a vector
// @param vector
// @result magnitude of a vector
function getMagnitude(vec){
    var result = 0;
    for (var i=0 ; i < vec.length ; i++){
        result += vec[i] * vec[i];
    }
    return Math.sqrt(result);
}

// calculate the result of similarity of two vector
// @param two vector
// @result similarity between vector
function getSimilarity(card1,card2){
    try{
        dotProduct = getDotProduct(card1,card2);
        mag_1 = getMagnitude(card1);
        mag_2 = getMagnitude(card2);
        return dotProduct / (mag_1 * mag_2)
    } catch (error) {
        console.error(error);
    }
}

// transpose a matrix
// @param matrix
// @result transposed matrix
function transpose(list){
    try{
        transposed_list = {};
        for (i in list){
            for (j in list[i]){
                if (j in transposed_list){
                    transposed_list[j].push(list[i][j]);
                } else {
                    transposed_list[j] = [list[i][j]];
                }
            }
        }
        return transposed_list;
    } catch (error) {
        console.error(error);
    }
}