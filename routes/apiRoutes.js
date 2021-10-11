const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const db = require('../models');



//CLIENTS

//Find all clients
router.get("/clients/all", (req, res)=>{
    db.clients.findAll().then(clients => {
        res.json(clients);
    });
});



//Find one client by id
router.get("/clients/:id", (req, res)=>{
    const id = req.params.id;
    db.clients.findByPk(id).then(client => {
        res.json(client);
    });
});


router.post("/clients/new", (req, res)=>{
    if (!req.body.name) {
        res.status(400).send('Content cannot be empty');
    }

    let {name, description, address, city, state, zip, country, website, label, folder_id, created_at, deleted_at} = req.body;

    const client = {
        name: name,
        description: description,
        address: address,
        city: city, 
        state: state,
        zip: zip,
        country: country,
        website: website,
        label: label,
        folder_id: folder_id,
        created_at: created_at,
        deleted_at: deleted_at,
    };

    db.clients.create(client)
              .then(data=>{
                  res.json(data);
              });
});


//Update a client by id
router.put("/clients/:id", (req, res)=>{
    const id = req.params.id;
    db.clients.update(req.body, {where: {id: id}})
              .then(num=>{
                  res.json(num);
              });
});


//Delete a client by id
router.delete("/clients/:id", (req, res)=>{
    const id = req.params.id;
    db.clients.destroy({where: {id:id}})
              .then(status => {
                  if (status === 1) {
                      res.status(200).json({message: `Client with id ${id} was successfully deleted`});
                  } else {
                      res.json({message: `Client with id ${id} was successfully deleted`});
                   
                  }
              }).catch( err => {
                  res.status(500).json({message: `Server issue - could not delete client with id ${id} : ${err}`});
              });
});


//EMPLOYEES
//Find all employees
router.get('/employees/all', (req, res)=>{
    db.employees.findAll()
                .then( employees => {
                    res.status(200).json(employees);
                });
});

router.get("/employees/:id", (req, res)=>{
    const id = req.params.id;
    db.employees.findByPk(id)
                .then(employee => {
                    res.status(200).json(employee);
                });
})

module.exports = router;