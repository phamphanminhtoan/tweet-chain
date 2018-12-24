const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var path = require('path');
const app = express();
const Parse = require('parse/node');
var http = require("http-https");

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

Parse.serverURL = 'http://tweetchain-database.glitch.me/api'; // This is your Server URL
Parse.initialize(
  '14488a89b90d1701fa0d334fb85fad55eac86824', // This is your Application ID
  '0aa56f45a45838c710c511558c2110a0dde9b578', // This is your Javascript key
  'cd3881320fcb98ab539ee4de0a64ab9ea4dbb1c3' // This is your Master key (never use it in the frontend)
);

global.Parse = Parse;
//http.get('https://tweetchain.glitch.me/api/block/sync');
//http.get('https://tweetchain.glitch.me/api/block/get-lastest-block');
app.listen(8080, () => console.log('Listening on port 8080!'));
