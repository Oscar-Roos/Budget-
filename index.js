const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./api.js');

module.exports = app;

const PORT = process.env.PORT || 4001;

app.use((req,res,next) => {
  console.log('Request to Index made')
  next()
})

app.use(bodyParser.json());

app.use(cors());

app.use(apiRouter);

if (!module.parent) { 
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}