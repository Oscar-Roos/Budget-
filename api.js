const express = require('express');
const apiRouter = express.Router();
const budget = require('./budget.js');
const routes = '/budget'

//logging middleware to confirm reach of router
apiRouter.use('/', (req, res, next) => {
    console.log(`User reached the API Router`);
    next();
  })

//directing Budget requests to budget router
apiRouter.use(`/budget/`, budget);


//Displaying valid routers if invalid was chosen
apiRouter.use('/', (req, res, next) => {
    console.log('Invalid request made, sending valid options back');
    res.send('Route invalid, please try from valid routes: ' + routes);
});

module.exports = apiRouter;