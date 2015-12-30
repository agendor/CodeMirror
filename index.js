
var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var app = express();
var routes = require('./lib/routes')
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(favicon(__dirname + '/views/favicon.ico'));

app.use(express.static('views'));
app.use(express.static('bower_components'));

app.use(bodyParser.json());

app.get('/', routes.instructions);
app.get('/instructions', routes.instructions);
app.get('/start', routes.start);
app.post('/submit', routes.submit);

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});