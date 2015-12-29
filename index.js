
var express = require('express');
var exphbs = require('express-handlebars');
var favicon = require('serve-favicon');
var app = express();
var routes = require('./lib/routes')
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static('views'));
app.use(express.static('bower_components'));

app.get('/', routes.instructions);
app.get('/instructions', routes.instructions);
app.get('/start', routes.start);
// app.get('/instructions', function (req, res) {
//   res.render('instructions');
// });

// app.get('/front-end-engineer', function (req, res) {
//   res.render('front-end-engineer');
// });

// app.get('/start', function (req, res) {
//   var email = req.query.email;
//   if (isEmailValid(email)) {
//     res.render('front-end-engineer', {
//       email: email
//     });  
//   } else {
//     res.render('instructions', {
//       error: "This e-mail was already used or is invalid."
//     });  
//   }
  
// });

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});