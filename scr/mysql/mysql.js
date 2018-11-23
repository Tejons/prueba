const mysql = require('mysql');


comando = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'rendon',
   database:'acanunciate'    
});

module.exports = comando;