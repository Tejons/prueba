const comando = require('../mysql/mysql');
 
module.exports ={    
registrarSolicitud : function(req,res,next){
    var solicitud ={
        id_usuario : req.user.id,
        solicitud_codigo_dispositivo : req.body.solicitud_codigo_dispositivo,
        solicitud_tipo : req.body.solicitub_tipo
    }
    
    comando.query('INSERT INTO solicitud_usuario SET?',solicitud,(err,result)=>{
       if(err){
           res.send(false);
           console.log(err);
       }else{
           res.send(true);
           console.log('Solicitud registrada');
       } 
    });
 
}
}