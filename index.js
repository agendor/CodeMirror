
var express = require('express');
var app = express();
var host = '0.0.0.0' || process.env.NODE_HOST;
var port = 3000 || process.env.PORT;

// app.get('/', function (req, res) {
//   res.send('ae');
// });

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static('public'));
app.use(express.static('bower_components'));

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});