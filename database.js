var mysql = require('mysql');

var con = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b7792828cd87b5",
  password: "e038462c",
  database: "heroku_64fbd5fa886485b",
  port: 3306
});


module.exports = con;