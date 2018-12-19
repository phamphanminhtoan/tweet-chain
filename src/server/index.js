const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var path = require('path');
const app = express();
const Parse = require('parse/node');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use('/api', routes);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

//connect to database

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'CpENWYqSAVkGnRKsXe4ip03UVnnaOAPyqOUjJT1O', // This is your Application ID
  'Bn1u0GSOZNqGEQLYGCPOgU4CqixAoUnteUT4h1cg', // This is your Javascript key
  'opPkV9bgL4tq5aZQkoNnOp0GwYcf71oqKx8VAqa5' // This is your Master key (never use it in the frontend)
);

global.Parse = Parse;
app.listen(8080, () => console.log('Listening on port 8080!'));
