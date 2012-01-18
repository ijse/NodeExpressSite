
/*
 * GET home page.
 */
exports.index = function(req, res){
	debugger;
	res.local("movie", { name:"3d Arival" });

	
	res.render('../default/index', { title: 'Express'});
};

exports.test = function(req, res) {
	res.local("movie", { name:"3d Arival" });
	res.render('index', { title: 'ijse' });
};

