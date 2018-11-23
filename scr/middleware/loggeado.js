module.exports ={
	isLoggedAdministrador:function(req,res,next){
		// si esta autentificado continua en caso contrario ira a la página de registro
		if(req.isAuthenticated()){
			next();
		}else{
			res.redirect('/login_administrador');
		}
	},
    isnotLoggedAdministrador:function(req,res,next){
		// si esta autentificado continua en caso contrario ira a la página de registro
		if(req.isAuthenticated()){
			res.redirect('/administrador');
		}else{
			next();
		}
	},
    isLoggedUsuario:function(req,res,next){
		// si esta autentificado continua en caso contrario ira a la página de registro
		if(req.isAuthenticated()){
			next();
		}else{
			res.redirect('/login_usuario');
		}
	},
    isnotLogged:function(req,res,next){
		// si esta autentificado continua en caso contrario ira a la página de registro
		if(req.isAuthenticated()){
            if(req.tipo == 'administrador'){
                res.redirect('/administrador');
               }
            else if(req.tipo == 'usuario'){
                    res.redirect('/publicaciones');
                    }
		}else{
			next();
		}
	},
    isnotLoggedUsuario:function(req,res,next){
		// si esta autentificado continua en caso contrario ira a la página de registro
		if(req.isAuthenticated()){
			res.redirect('/publicaciones');
		}else{
			next();
		}
	}
}