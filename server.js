var express = require('express'),
	exphbs = require('express-handlebars'),
	http = require('http'),
	mongoose = require('mongoose'),
	twitter = require('ntwitter'),
	routes = require('./routes'),
	config = require('./config'),
	streamHandler = require('./utils/streamHandler');

// Create an express app and port variable
var app = express();
var port = process.env.PORT || 8080;

// Set Handlebars and templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'})); // call the engine handlebars 
app.set('view engine', 'handlebars'); // setting the variable 'view engine' to 'handlebars', what the engine is called

// disable etag headers in the response
app.disable('etag'); // app.disable(value) is the equivalent of app.set(value, false);

// connect to our mongo database
mongoose.connect('mongodb://localhost/react-tweets/');

// set up our ntwitter instance
var twit = new twitter(config.twitter);

// set up the index route
app.get('/', routes.index);

// set up the page route
app.get('/page/:page/:skip', routes.page);

// set static directory
app.use('/', express.static(__dirname + '/static'));

// fire up the server
var server = http.createServer(app).listen(port, function () {
	console.log('listening on port: ' + port);
});

// have socket io listen to the server
var io = require('socket.io').listen(server);

twit.stream('statuses/filter', {track: 'scotch.io, #scotchio'}, function (stream) {
	streamHandler(stream, io);
});