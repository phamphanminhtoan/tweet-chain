const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var path = require('path');

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
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
app.listen(8080, () => console.log('Listening on port 8080!'));
