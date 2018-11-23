const comando = require('../mysql/mysql');
var cont =0;
module.exports ={
    
    registrarDispositivo : function(req,res,next){
         
        var dispositivo={
          id_usuario:req.user.id,
          nombre_dispositivo_usuario: req.body.nombre,
          codigo_dispositivo_usuario: req.body.codigo
        };
        comando.query('SELECT * FROM dispositivo_usuario WHERE codigo_dispositivo_usuario =? AND id_usuario =?',[dispositivo.codigo_dispositivo_usuario,req.user.id],(err,row)=>{
            if(err){
                console.log(err);
            }
            if(row.length > 0){
              res.send('exist')
            }else{
               comando.query('INSERT INTO dispositivo_usuario SET?',dispositivo,(err,result)=>{
                  if(err){
                      console.log(err);
                  }else{
                      comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
                         if(err){
                             
                         }else{
                             res.json({
                                       success:true,
                                       data:row
                             });
                         } 
                          
                      });
                  }
                    
               });
            } 
        });
    },
    eliminarDispositivo: function(req,res,next){
        var codigo_dispositivo_usuario = req.params.codigo_dispositivo_usuario;
        //console.log(id);
        //var data ={};
        comando.query('DELETE FROM dispositivo_usuario WHERE id_usuario=? AND codigo_dispositivo_usuario =?',[req.user.id,codigo_dispositivo_usuario],(err,result)=>{
            if(err){
                console.log(err);
                res.json({
                           success:false
                       });
            }else{
                
         
            }
            
        });
        comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
                   if(err){
                       console.log(err);
                   }else{
                       res.json({
                           success:true,
                           row:row
                       });
                   } 
                });
    },
    dispositivosDisponibles: function(req,res,next){
        var dispositivos_actuales,numero_dispositivos;
        comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =?',[req.user.id],(err,dispositivos)=>{
            if(err){
                console.log(err);
            }else if(dispositivos.length > 0){
                
                dispositivos_actuales = dispositivos.length;       
                comando.query('SELECT dispositivos_disponibles FROM usuario WHERE id_usuario =?',[req.user.id],(err,dispositivosDisponibles)=>{
                    if(err){
                        console.log(err);
                    }else{
                        numero_dispositivos = dispositivosDisponibles[0].dispositivos_disponibles;
                        if(dispositivos_actuales < numero_dispositivos){
                           res.send(true);
                        }else{
                            res.send(false);
                        }
                
                    }
            
                });
            }else{
                res.send(true);
            }
            
        });
    },
    BuscarDispositivo: function(req,res,next){
        var nombre =  req.params.nombre;
        comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =? AND nombre_dispositivo_usuario LIKE "%'+nombre+'%"',[req.user.id],(err,dispositivo)=>{
            if(err){
                console.log(err);
            }else if(dispositivo.length > 0){
                res.send(dispositivo);
            }else{
                res.send(false);
            }
            
        });
    },
     EliminarDispositivoPublicacion: function (req, res, next) {
         var dispositivos = req.body.dispositivo;
         var nombre_publicacion = req.body.nombre_publicacion;
         var conta = 0;
         for (var i = 0; i < dispositivos.length; i++) {
             conta++;
             comando.query('DELETE FROM video_dispositivo_usuario WHERE nombre_video_dispositivo_usuario=? AND id_dispositivo_usuario =?', [nombre_publicacion, dispositivos[i]], (err, result) => {
                 if (err) {
                     console.log(err);
                     res.send(false);
                 } else {
                     if (dispositivos.length == conta) {
                         req.flash('info', 'edispositivoPS');
                         res.send(true);
                     }

                 }
             });

         }
     }
};