
require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);


app.get('/', (req, res) => {
	
	res.send(`Production environment is ${process.env.NODE_ENV}`);

});

db.sequelize.sync().then(()=>{
	app.listen(port, ()=>{
		console.log(`App listening on port ${port}`)
	});
});

//app.listen(port, ()=> console.log(`Example app listening on port ${port}`));
