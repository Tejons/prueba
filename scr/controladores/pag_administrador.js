module.exports = {
	
	index: function(req,res,next){
		res.render('administrador/solicitudes',{
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	}
}