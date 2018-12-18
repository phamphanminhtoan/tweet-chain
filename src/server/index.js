const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var path = require('path');
var mongoose = require("mongoose");
const app = express();

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
mongoose.connect(
  'mongodb://admin:React2018@ds113871.mlab.com:13871/acetest',
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("[i] - ket noi den Database thanh cong!");
    }
  }
);

app.listen(8080, () => console.log('Listening on port 8080!'));
