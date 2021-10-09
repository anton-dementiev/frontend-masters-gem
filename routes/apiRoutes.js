const express = require('express');
const router = express.Router();
const db = require('../models');

//Routes for clients
router.get("/clients/all", (req, res)=>{
    db.clients.findAll().then(clients => {
        res.send(clients);
    });
})

module.exports = router;