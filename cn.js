const mysql = require('mysql2');

let cn = mysql.createConnection(
    {
        host     : 'localhost',
        user     : 'anton',
        password : '123',
        database : 'fundemic'
      }
);

cn.connect();

cn.query("select * from clients", function(error, results, fields){
    if (error) throw error;
    console.log("Successfully connected to the database on the server");
});

cn.end();