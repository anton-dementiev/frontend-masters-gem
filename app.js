const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;




app.get('/', (req, res) => {
	let cn = mysql.createConnection(
		{
			host     : 'localhost',
			user     : 'anton',
			password : '123',
			database : 'test'
		  }
	);
	
	cn.connect();
	
	cn.query("select * from test", function(error, results, fields){
		if (error) throw error;
		console.log("Successfully connected to the database on the server");
	});
	
	cn.end();
	res.send('This sample app was developed for Frontend Masters course. Pushed from Github repo');

});

app.listen(port, ()=> console.log(`Example app listening on port ${port}`));
