
/**
 * Module dependencies.
 */
var express = require('express')
, routes = require('./routes')
, path = require('path')

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
		app.set('basepath', __dirname);
		app.set('views', __dirname + '/views/my');
		app.set('view engine', 'ejs');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'my session secret key' }));

		app.use(app.router);
		app.use(function(req, res, next) {
			if(/\.ejs$/.test(req.url)) {
				next();
				return ;
			}
			res.sendfile(app.set('views') + req.url);
		});
		app.use(express.static(__dirname + "/views/default"));
		//app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
		app.use(express.errorHandler()); 
});

// View helpers
/*
app.helpers({
	
});
*/
app.dynamicHelpers({
	session: function(req,res) {
		return req.session;
	}
});

// Routes
app.get('/', routes.index);
app.get('/dw', routes.test);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
