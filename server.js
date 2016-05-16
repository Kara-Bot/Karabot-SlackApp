var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var dotenv = require('dotenv');

// load environment variables,
// either from .env files (development),
// heroku environment in production, etc...
dotenv.load();

// parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing url encoded

// routes
require('./bot/config/routes')(app);

// port for Heroku
app.set('port', (process.env.PORT));

// botkit (apres port)
require('./bot/karabot');

// START ===================================================
http.listen(app.get('port'), function listenPort() {
  console.log('listening on port ' + app.get('port'));
});
