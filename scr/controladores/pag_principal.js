module.exports = {
	
	index: function(req,res,next){
		res.render('principal',{
			//isAuthenticated : req.isAuthenticated(),
			//user : req.user
		});
	}
}