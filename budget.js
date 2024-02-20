const express = require('express');
const budgetRouter = express.Router();
const {expenses, income, expensesCounter, incomeCounter} = require('./db.js');
const {getElementById ,getIndexById, sumArr, addToArr, removeFromArr, updateArr} = require('./utils.js');

//logging middleware to confirm reach of router
budgetRouter.use((req,res,next) => {
    console.log(`User reached the Budget Router`);
    next();
});

//Get basic information
budgetRouter.get('/', (req, res, next) => {
    const totalIncome = sumArr(income);
    const totalExpenses = sumArr(expenses);
    res.send(`Total Income is ${totalIncome}, Total expenses is ${totalExpenses}. Leftover money is ${totalIncome - totalExpenses}`);
});

//Get information based on path
budgetRouter.get('/:path', (req, res, next) => {
    if (req.params.path === 'income') {
        const totalIncome = sumArr(income);
        res.send(`Total Income is ${totalIncome}, Detailed info is: ${JSON.stringify(income)}`);
    } else if (req.params.path === 'expenses') {
        const totalExpenses = sumArr(expenses);
        res.send(`Total Expenses is ${totalExpenses}, Detailed info is: ${JSON.stringify(expenses)}`);
    } else {
        next();
    }

});

//Get information based on id
budgetRouter.get('/:path/:id', (req, res, next) => {
    if (req.params.path === 'income') {
        const foundId = getElementById(req.params.id, income);
        if (foundId) {
            res.send(foundId);
        } else {
            res.status(404).send('Error 404');
            console.log('Couldn\'t find id: ' + foundId + ' '+ req.params.id);
        }
    } else if (req.params.path === 'expenses') {
        const foundId = getElementById(req.params.id, expenses);
        if (foundId) {
            res.send(foundId);
        } else {
            res.status(404).send('Error 404');
            console.log('Couldn\'t find id: ' + foundId + ' '+ req.params.id);
        }
    } else {
        next()
    }
});

budgetRouter.post('/:path/:source/:sum', (req, res, next) => {
    if (req.params.path === 'expenses') {
        addToArr(req.params.path, req.params.source, req.params.sum, expensesCounter, expenses);
        res.status(201).send('success');
    } else if (path === 'income') {
        addToArr(req.params.path, req.params.source, req.params.sum, incomeCounter, income);
        res.status(201).send('success');
    } else {
        next();
    }
});

budgetRouter.put('/:path/:id/:source/:sum', (req, res, next) => {
    if (req.params.path === 'income') {
        let resp = updateArr(req.params.id, req.params.source, req.params.sum, income);
        res.status(200).send(resp);
    } else if (req.params.path === 'expenses') {
        let resp = updateArr(req.params.id, req.params.source, req.params.sum, expenses);
        res.status(200).send(resp);
    } else {
        console.log('test');
        next();
    }
});

budgetRouter.delete('/:path/:id', (req, res, next) => {
    if (req.params.path === 'income') {
        let resp = removeFromArr(req.params.id, income);
        res.status(resp).send();
    } else if (req.params.path === 'expenses') {
        let resp = removeFromArr(req.params.id, expenses);
        res.status(resp).send();
    } else {
        next();
    }
});

budgetRouter.use((req,res,next) => {
    res.send('Invalid request, try: -get, get-/path(income/expenses), get-/path/id, post-/path/:source/:sum, put-/path/:source/:sum, delete-/path/:ID');
});

module.exports = budgetRouter;