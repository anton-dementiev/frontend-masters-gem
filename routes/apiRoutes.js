const e = require('express');
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
                      res.json({message: `Could not delete client with id ${id}`});
                   
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

//Find employee by id
router.get("/employees/:id", (req, res)=>{
    const id = req.params.id;
    db.employees.findByPk(id)
                .then(employee => {
                    res.status(200).json(employee);
                });
});


router.post("/employees/new", (req, res)=>{
    if (!req.body.first_name) {
        res.status(400).send('Content cannot be empty');
    }

    let {first_name, last_name, email, payment_card, role, label, folder_id, created_at, deleted_at} = req.body;

    const employee = {
        first_name: first_name,
        last_name : last_name,
        email: email,
        payment_card: payment_card,
        role: role,
        label: label,
        folder_id: folder_id,
        created_at: created_at,
        deleted_at: deleted_at,
    };

    //Doesn't handle exceptions properly

    try {
        db.employees.create(employee)
        .then(data=>{
            res.json(data);
        }).catch(err => {
          res.status(500).send({message: `Server issue - } : ${err}`});
        });
    } catch(err) {
        res.status(500).send({message: `Server issue -  ${id} : ${err}`});
    }
   
});

//Delete employee by id
router.delete("/employees/:id", (req, res)=>{
        const id = req.params.id;

        try {
            db.employees.destroy( {where: {id: id}})
                        .then( status => {
                            if (status === 1) {
                                res.status(200).json({message: `Employee with id ${id} was successfully deleted`});
                            } else {
                                res.status(200).json({message: `Could not delete employee with id ${id}`});
                            }
                        }).catch(err=>{
                            res.status(500).send({message: `Server issue -  ${id} : ${err}`});
                        });
        } catch(err) {
            res.status(500).send({message: `Server issue -  ${id} : ${err}`});

        }
});

//Update an employee
router.put("/employees/:id", (req, res)=>{
    const id = req.params.id;

    db.employees.update(req.body, {where: {id: id}})
              .then(employee=>{
                      res.status(200).json({employee});     
              }).catch(err => {
                  res.status(500).send({message: `Server issue -  ${err}`});
              });
});


//Transations - Revenue
//Retrieve all transactions
router.get("/revenue/all", (req, res)=>{
    db.transactions_revenue.findAll().then(transactions => res.status(200).json(transactions));
});

//Find revenue transaction by id 
router.get("/revenue/:id", (req, res)=>{
    const id = req.params.id;
    db.transactions_revenue.findByPk(id).then(transaction => res.status(200).json(transaction))

});

//Create new rev transaction
router.post("/revenue/new", (req, res) => {
    if (!req.body.amount | ! req.body.date | !req.body.currency | ! req.body.client_id) {
        res.status(400).send('Content cannot be empty');
    }
    let {amount,date, currency, exchange_rate, invoice_id, client_id, description} = req.body;
   let trdate = date.split("/");
    trdate = `${trdate[2]}-${trdate[1]}-${trdate[0]}`;

    const transactionRev = {
        amount: amount, 
        date: trdate,
        currency: currency,
        exchange_rate: exchange_rate,
        invoice_id: invoice_id,
        client_id: client_id,
        description: description,
    };

    console.log(transactionRev);

    try {
        db.transactions_revenue.create(transactionRev)
        .then(data=>{
            res.json(data);
        }).catch(err => {
          res.status(500).send({message: `Server issue - } : ${err}`});
        });
    } catch(err) {
        res.status(500).send({message: `Server issue -  ${id} : ${err}`});
    }
   

});


//Update revenue transaction by id 
router.put("/revenue/:id", (req, res)=>{
    const id = req.params.id;

    db.transactions_revenue.update(req.body, {where: {id: id}})
    .then(employee=>{
            res.status(200).json({employee});     
    }).catch(err => {
        res.status(500).send({message: `Server issue -  ${err}`});
    });
});

//Delete revenue transaction by id 
router.delete("/revenue/:id", (req, res) =>{
    const id = req.params.id;
    try {
        db.transactions_revenue.destroy( {where: {id: id}})
                    .then( status => {
                        if (status === 1) {
                            res.status(200).json({message: `Revenue record with id ${id} was successfully deleted`});
                        } else {
                            res.status(200).json({message: `Could not delete revenue transaction with id ${id}`});
                        }
                    }).catch(err=>{
                        res.status(500).send({message: `Server issue -  ${id} : ${err}`});
                    });
    } catch(err) {
        res.status(500).send({message: `Server issue -  ${id} : ${err}`});

    }

});



//#######################################################################

//Expense 
//Get all expenses
router.get("/expense/all", (req, res)=> {
    db.transactions_expense.findAll().then(transactions => res.status(200).json(transactions));
});

//Find expense transaction by id
router.get("/expense/:id", (req, res)=> {
    const id = req.params.id;
    db.transactions_expense.findByPk(id).then(transaction => res.status(200).json(transaction));
});

//Add expense transaction
router.post("/expense/new", (req, res)=>{
    if (!req.body.amount | !req.body.currency | ! req.body.date) {
        res.status(400).send('Content cannot be empty');
    }

    let {amount, date, currency, exchange_rate, category, project_id, employee_id, description} = req.body;
    let trdate = date.split("/");
    trdate = `${trdate[2]}-${trdate[1]}-${trdate[0]}`;

    const transactionExp = {
        amount: amount,
        date: trdate,
        currency: currency,
        exchange_rate: exchange_rate ? exchange_rate : null,
        category,
        project_id,
        employee_id, 
        description,
    };

    try {
        db.transactions_expense.create(transactionExp)
        .then(data=>{
            res.json(data);
        }).catch(err => {
          res.status(500).send({message: `Server issue - } : ${err}`});
        });
    } catch(err) {
        res.status(500).send({message: `Server issue -  ${id} : ${err}`});
    }
   


});

//Update expense transaction
router.put('/expense/:id', (req, res)=>{
    const id = req.params.id;
    req.body.exchange_rate = req.body.exchange_rate ? req.body.exchange_rate : null;
 
    db.transactions_expense.update(req.body, {where: {id: id}})
    .then(employee=>{
            res.status(200).json({employee});     
    }).catch(err => {
        res.status(500).send({message: `Server issue -  ${err}`});
    });
});


//Delete expense transaction by id 
router.delete("/expense/:id", (req, res)=>{
    const id = req.params.id;
   
    try {
        db.transactions_expense.destroy( {where: {id: id}})
                    .then( status => {
                        if (status === 1) {
                            res.status(200).json({message: `Expense record with id ${id} was successfully deleted`});
                        } else {
                            res.status(200).json({message: `Could not delete expense record with id ${id}`});
                        }
                    }).catch(err=>{
                        res.status(500).send({message: `Server issue -  ${id} : ${err}`});
                    });
    } catch(err) {
        res.status(500).send({message: `Server issue -  ${id} : ${err}`});

    }


});

module.exports = router;