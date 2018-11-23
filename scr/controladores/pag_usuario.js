const comando = require('../mysql/mysql');

module.exports = {
	
	index: function(req,res,next){
        comando.query('SELECT * FROM video_usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }
        comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =?',req.user.id,(err,row1)=>{
        if(err){
            console.log(err);
        }
            comando.query('SELECT VDU.id_video_dispositivo_usuario,VDU.nombre_video_dispositivo_usuario,VU.nombre_video_usuario,DU.codigo_dispositivo_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE  U.id_usuario =? GROUP BY VDU.nombre_video_dispositivo_usuario',req.user.id,(err,pub)=>{
                if(err){
                   console.log(err);
                }else{
                    res.render('usuario/publicaciones',{
			               isAuthenticated : req.isAuthenticated(),
			               user : req.user,
                           data:row1,
                           contenido:row,
                           publicacion:pub,
                           msn:req.flash('info')
		                   });
                 }
            });    
        
        });
        
      });
		
	}
}