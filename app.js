
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

//Database - @TODO delete
const sequelize = require('sequelize');

//Load models into sequelize
const db = require('./models/index');



app.get('/', (req, res) => {
	
	res.send('This sample app was developed for Frontend Masters course. Pushed from Github repo');
	

});

app.get('/clients', (req, res) => {

	const clients =  db.clients.findAll({
		where: {
			id: 1,
		}
	}).then( result =>{
		console.log('Queried table');
		console.log(result);
	});

})

app.listen(port, ()=> console.log(`Example app listening on port ${port}`));
