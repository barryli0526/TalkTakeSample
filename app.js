
/**
 * Module dependencies.
 */

var path = require('path');
var express = require('express');
var config = require('./config/base').config;
var routes = require('./routes');


var app = express.createServer();

app.configure(function () {
  var viewsRoot = path.join(__dirname, 'views');
  app.set('view engine', 'html');
  app.set('views', viewsRoot);
  app.register('.html', require('ejs'));
  app.use(express.cookieParser());

  app.use(express.static(__dirname + '/public'));
});


// routes
routes(app);

  app.listen(config.port);
  console.log("You can debug your app with http://" + config.hostname + ':' + config.port);
//}

module.exports = app;

/*
 * Catch uncaught exceptions
 */

process.on('uncaughtException', function(err){
    console.log('Exception: ' + err.stack);
    fs.appendFile(path.resolve('log.txt'),err.stack,function(err){

    })
});
