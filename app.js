const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
	
	res.send('This sample app was developed for Frontend Masters course. Pushed from Github repo');

});

app.listen(port, ()=> console.log(`Example app listening on port ${port}`));
