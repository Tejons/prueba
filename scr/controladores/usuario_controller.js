const comando = require('../mysql/mysql');
const encrip = require('bcryptjs');
var fs = require('fs');
const path = require('path');
 
module.exports ={    
getLoginUsuario : function(req,res,next){
     res.render('login_usuario',{isAuthenticated : req.isAuthenticated(),msn:req.flash('info')});   
 
},   
getContenidoUsuario : (req,res,next)=>{
    comando.query('SELECT * FROM video_usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }
        res.render('usuario/contenido',{user:req.user,contenido:row});
        
    });
    
},
getDispositivoUsuario : (req,res,next)=>{
    
    comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }else{
            
            res.render('usuario/dispositivos',{user:req.user,data:row});
        }   
    });
    
},
getPerfilUsuario : (req,res,next)=>{
    comando.query('SELECT * FROM usuario WHERE id_usuario =?',req.user.id,(err,usuario)=>{
        if(err){
            console.log(err);
        }else{
            comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =?',req.user.id,(err,disp)=>{
               if(err){
                   console.log(err);
               }else{
                   comando.query('SELECT * FROM factura_usuario WHERE estado_factura_usuario="pagado" AND id_usuario =?',req.user.id,(err,factura)=>{
                      if(err){
                          console.log(err);
                      }else{ 
                          comando.query('SELECT DFU.nombre_compania,DFU.identificador_impuesto,DFU.telefono_datos_factura_usuario,DFU.correo_datos_factura_usuario,DU.calle_usuario,DU.numero_usuario,DU.colonia_usuario,DU.ciudad_usuario,DU.estado_usuario,DU.codigo_postal_usuario FROM usuario AS U INNER JOIN datos_factura_usuario AS DFU ON U.id_usuario = DFU.id_usuario INNER JOIN direccion_usuario AS DU ON U.id_usuario = DU.id_usuario WHERE  U.id_usuario =?',req.user.id,(err,datosfactura)=>{
                              if(err){
                                  console.log(err);
                              }else{ 
                                    comando.query('SELECT * FROM suscripcion_usuario WHERE id_suscripcion =?',usuario[0].id_suscripcion,(err,suscripcion)=>{
                                       if(err){
                                           console.log(err);
                                       }else{
                                           for(var i=0; i < usuario.length ;i++){
                               var fechaHora = usuario[i].fecha_creacion_usuario;
                               var dia = fechaHora.getDay(),
                               fecha = fechaHora.getDate(),
                               mes = fechaHora.getMonth(),
                               año = fechaHora.getFullYear(),
                               hora = fechaHora.getHours(),
                               minuto = fechaHora.getMinutes(),
                               segundo = fechaHora.getSeconds(),
                               ampm;
            
                                if(hora >= 12){
                                    hora = hora-12;
                                    ampm = 'PM';
                                }else{
                                    ampm = 'AM';
                                }
                               if(hora == 0){
                                   hora = 12;
                               }
                               if(minuto < 10){
                                   minuto = '0'+minuto;
                               }
                               if(segundo < 10){
                                   segundo = '0'+segundo;
                               }
       
                               var semana=['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
                                  meses=   ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        
                            fechaHora = semana[dia]+' '+fecha+' de '+meses[mes]+' del '+año;
                            usuario[i].fecha_creacion_usuario = fechaHora;
             }
                                           res.render('usuario/perfil_usuario',{user:req.user,usuario:usuario,dispositivos:disp,factura:factura,datosfactura:datosfactura,suscripcion:suscripcion,msn:req.flash('info')});
                                       }   
                                   });
                              }   
                          });
                      }   
                  });
               }   
           });
        }   
    });
    
},    
getPublicacionInfo : (req,res,next)=>{
    var nombre_video_dispositivo_usuario = req.params.nombre_video_dispositivo_usuario;
    comando.query('SELECT VDU.nombre_video_dispositivo_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE  U.id_usuario =? AND VDU.nombre_video_dispositivo_usuario =?',[req.user.id,nombre_video_dispositivo_usuario],(err,row)=>{
        if(err){
            console.log(err);
        }else{
            comando.query('SELECT VU.id_video_usuario,VU.nombre_video_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE  U.id_usuario =? AND VDU.nombre_video_dispositivo_usuario =? GROUP BY VU.nombre_video_usuario',[req.user.id,nombre_video_dispositivo_usuario],(err,videos)=>{
                       if(err){
                           console.log(err);
                       }else{
                          comando.query('SELECT DU.id_dispositivo_usuario,DU.nombre_dispositivo_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE  U.id_usuario =? AND VDU.nombre_video_dispositivo_usuario =? GROUP BY DU.nombre_dispositivo_usuario',[req.user.id,nombre_video_dispositivo_usuario],(err,dispositivos)=>{
                       if(err){
                           console.log(err);
                       }else{
                           comando.query('SELECT DU.id_dispositivo_usuario,DU.nombre_dispositivo_usuario,DU.codigo_dispositivo_usuario FROM dispositivo_usuario AS DU JOIN usuario AS U ON DU.id_usuario = U.id_usuario WHERE DU.id_usuario =?',[req.user.id],(err,dis)=>{
                       if(err){
                           console.log(err);
                       }else{
                           for(var i=0;i<dispositivos.length;i++){
                               for(var j=0;j<dis.length;j++){
                                   if(dispositivos[i].id_dispositivo_usuario === dis[j].id_dispositivo_usuario){
                                        dis.splice(j,1);
                                      }
                               
                               }
                           }
                           disN = dis;
                           res.render('usuario/publicaciones_info',{user:req.user,publicacion:row,videos:videos,dispositivos:dispositivos,dispositivosN:disN,msn:req.flash('info')});
                      }
        
                   });
                      }
        
                   }); 
                      }
        
                   });
            
        }   
    });
     
},
getDispositivosInfo : function(req,res,next){
    var id_dispositivo_usuario = req.params.id;
    
    comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =? AND id_dispositivo_usuario=?',[req.user.id,id_dispositivo_usuario],(err,row)=>{
        if(err){
            console.log(err);
        }else{
            comando.query('SELECT DU.nombre_dispositivo_usuario,EDU.evento_dispositivo_tipo,EDU.evento_dispositivo_informacion,EDU.fecha_hora_evento_disposito FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN evento_dispositivo_usuario AS EDU ON DU.id_dispositivo_usuario= EDU.id_dispositivo_usuario WHERE  U.id_usuario =?  AND DU.id_dispositivo_usuario =? ORDER BY EDU.fecha_hora_evento_disposito DESC',[req.user.id,id_dispositivo_usuario],(err,row1)=>{
        if(err){
            console.log(err);
        }else{
             for(var i=0; i < row1.length ;i++){
            var fechaHora = row1[i].fecha_hora_evento_disposito;
            var dia = fechaHora.getDay(),
            fecha = fechaHora.getDate(),
            mes = fechaHora.getMonth(),
            año = fechaHora.getFullYear(),
            hora = fechaHora.getHours(),
            minuto = fechaHora.getMinutes(),
            segundo = fechaHora.getSeconds(),
            ampm;
            
            if(hora >= 12){
                hora = hora-12;
                ampm = 'PM';
            }else{
                ampm = 'AM';
            }
           if(hora == 0){
               hora = 12;
           }
           if(minuto < 10){
               minuto = '0'+minuto;
           }
           if(segundo < 10){
               segundo = '0'+segundo;
           }
       
           var semana=['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
               meses=   ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        
        fechaHora = semana[dia]+' '+fecha+' de '+meses[mes]+' del '+año+' Hora: '+hora+':'+minuto+':'+segundo+' '+ampm;
        row1[i].fecha_hora_evento_disposito = fechaHora;
             }
             res.render('usuario/dispositivos_info',{user:req.user,disp:row,dispoInfo:row1,msn:req.flash('info')});
        }
    });
        }   
    });
    
}, 
eliminarPublicacionInfo : (req,res,next)=>{
    var nombre_video_dispositivo_usuario = req.params.nombre_video_dispositivo_usuario;
    comando.query('DELETE FROM video_dispositivo_usuario WHERE nombre_video_dispositivo_usuario =?',nombre_video_dispositivo_usuario,(err,result)=>{
        if(err){
            console.log(err);
              res.send(false); 
        }else{
               res.send(true);             
         
        }
            
    });
     
},    
sesionActivaUsuario : function(req,res){
    if(req.isAuthenticated()){
        res.send('true');
    }else{
        res.send('false');
    }
},
solicitarFechaDesconexionDispositivo : function(req,res){
    
    comando.query('SELECT DU.id_dispositivo_usuario,DU.id_usuario,DU.codigo_dispositivo_usuario,DD.fecha_desconexion_dispositivo FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN desconexion_dispositivo AS DD ON DU.id_dispositivo_usuario= DD.id_dispositivo_usuario WHERE U.id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }
        if(row.length > 0){
            res.send(row);
        }
        else{
            res.send('false');
        }
    });
},    
/*fechaDesconexionDispositivo: function(req,res,next){
    var id_usuario = req.body.id;
    var codigo_dispositivo_usuario = req.body.codigo;
    var id_dispositivo_usuario_d;
    
    comando.query('SELECT id_dispositivo_usuario FROM dispositivo_usuario WHERE id_usuario =? AND codigo_dispositivo_usuario =?',[id_usuario,codigo_dispositivo_usuario],(err,row)=>{
        if(err){
            console.log('1',err);
        }
        if(row.length > 0){
            //console.log(row[0].id_dispositivo_usuario);
            id_dispositivo_usuario_d = row[0].id_dispositivo_usuario;
            var dispositivo={
                           id_dispositivo_usuario : id_dispositivo_usuario_d
                       }
            comando.query('SELECT * FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?',row[0].id_dispositivo_usuario,(err,row)=>{
                   if(err){
                       console.log('2',err);
                   }
                   if(row.length > 0){
                       comando.query('DELETE FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?',row[0].id_dispositivo_usuario,(err,result)=>{
                           if(err){
                               console.log('3',err);
                          }else{
                            comando.query('INSERT INTO desconexion_dispositivo SET?',dispositivo,(err,result)=>{
                               if(err){
                                  console.log('4',err);
                               }else{
                                   comando.query('SELECT * FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?',id_dispositivo_usuario_d,(err,row)=>{
                                       if(err){
                                          console.log('5',err);
                                       }
                                       if(row.length > 0){
                                           res.send(true);
                                           console.log('fecha en servidor');
                                       }
                                   });
                               } 
                            });
         
                          }
            
                      });
                   }else{
                       //console.log('R:',id_dispositivo_usuario_d);
                       comando.query('INSERT INTO desconexion_dispositivo SET?',dispositivo,(err,result)=>{
                               if(err){
                                  console.log('4R',err);
                               }else{
                                   comando.query('SELECT * FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?',id_dispositivo_usuario_d,(err,row)=>{
                                       if(err){
                                          console.log('5R',err);
                                       }
                                       if(row.length > 0){
                                           res.send(true);
                                       }
                                   });
                               } 
                            });
                   } 
           });
        }else{
            res.end('false');
        }
        
        
    });
},*/    
solicitarIdUsuario: function(req,res,next){
    if(req.user.id == null){
        res.end('false');
    }else{
    comando.query('SELECT id_usuario,correo_usuario FROM usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }else{
            res.send(row);
            //console.log(row[0].id_usuario);
        }
        
     });
   }
},    
PublicarVideoDispositivoUsuario: function (req, res, next) {
    var id_video_usuario = req.body.id_video;
    var dispositivos = req.body.dispositivos;
    var publicaciones = req.body.nombre_publicacion;
    var frm = req.body.info;
    var publ = 0,
        disp = 0,
        insert = 0,
        insert1 = 0;
    

    for (var j = 0; j < publicaciones.length; j++) {
        for (var i = 0; i < dispositivos.length; i++) {
            comando.query('SELECT VDU.nombre_video_dispositivo_usuario,VU.nombre_video_usuario,DU.nombre_dispositivo_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE  U.id_usuario =? AND VU.id_video_usuario=? AND DU.id_dispositivo_usuario=? AND VDU.nombre_video_dispositivo_usuario =?', [req.user.id, id_video_usuario, dispositivos[i], publicaciones[j]], (err, row) => {
                if (err) {
                    console.log(err);
                } else if (row.length > 0) {
                    res.end('exists');
                } else {
                    //disp++;
                    if (publicaciones.length == publ) {
                        publ = 0;
                        //console.log('IF-------------------------******');
                        //if(dispositivos.length == disp){
                        for (var k = 0; k < publicaciones.length; k++) {
                            //console.log(publicaciones.length);
                            //console.log('FOR 3: ',k,'---------Publicacion-INSERT',insert1,'-----------',publicaciones[insert1]);
                            for (var o = 0; o < dispositivos.length; o++) {
                                //console.log('FOR 4: ',o,'---------Dispositivo-INSERT',insert,'-----------',dispositivos[insert]);
                                data = {
                                    id_video_usuario: id_video_usuario,
                                    id_dispositivo_usuario: dispositivos[insert],
                                    nombre_video_dispositivo_usuario: publicaciones[insert1]
                                }
                               
                                comando.query('INSERT INTO video_dispositivo_usuario SET?', data, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    } else {}
                                });
                                insert++;
                            }
                            insert = 0;
                            insert1++;
                            if (publicaciones.length == insert1) {
                                comando.query('SELECT VDU.id_video_dispositivo_usuario,U.correo_usuario,DU.codigo_dispositivo_usuario,VU.nombre_video_usuario,VDU.estado_descarga FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE VDU.estado_descarga ="F" AND U.id_usuario =?', req.user.id, (err, row) => {
                                    if (err) {
                                        //if(frm == '2'){
                                           req.flash('info','publicacionInfoS');
                                        //}
                                        console.log(err);
                                    } else {
                                        //if(frm == '2'){
                                           req.flash('info','publicacionInfoS');
                                        //}
                                        res.json({
                                            success: true,
                                            row: row
                                        });
                                    }
                                });
                                //res.end('success');
                            }
                        }
                        //}
                    }
                }
            });

        }
        publ++;
    }
    //res.send('success');    
},
sincronizacionDispositivo : function(req,res,next){
         var codigo_dispositivo_usuario = req.body.codigo;
         var id_usuario = req.body.id;
		 comando.query('SELECT VDU.estado_descarga,DU.codigo_dispositivo_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario = VDU.id_dispositivo_usuario WHERE DU.id_usuario =? AND DU.codigo_dispositivo_usuario=? AND VDU.estado_descarga="F"',[id_usuario,codigo_dispositivo_usuario],(err,row)=>{
             if(err){
                console.log(err);
             }
             else if(row.length > 0){
                 res.send(true);
                 
             }else{
                 res.send(false);
                 
             }
         });
},
ActualizarDatosUsuario: function(req,res,next){
    var nombre_usuario = req.body.txt_cuenta_nombre;
    var correo_usuario = req.body.txt_cuenta_correo;
    
    comando.query('SELECT * FROM usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }
        else if(row.length > 0){
            if(row[0].correo_usuario == correo_usuario){
                  comando.query('UPDATE usuario SET nombre_usuario=? WHERE id_usuario =?',[nombre_usuario,req.user.id],(err,row)=>{
                    if(err){
                        req.flash('info','userE');
                        res.redirect('/perfil');
                        console.log(err);
                    }else{
                        req.flash('info','userS');
                        res.redirect('/perfil');
                    }
                 });  
            }else{
                fs.rename(path.join(__dirname,'../public/video/'+row[0].correo_usuario),path.join(__dirname,'../public/video/'+correo_usuario), function(err) {
                           if (err){
                                 req.flash('info','userE');
                                 res.redirect('/perfil');
                                 console.log('ERROR: ' + err);
                            }else{
                                 req.user.correo = correo_usuario;
                                 comando.query('UPDATE usuario SET nombre_usuario=?,correo_usuario=? WHERE id_usuario =?',[nombre_usuario,correo_usuario,req.user.id],(err,row)=>{
                                     if(err){
                                         req.flash('info','userE');
                                         res.redirect('/perfil');
                                         console.log(err);
                                     }else{
                                         req.flash('info','userS');
                                         res.redirect('/perfil');
                                     }
                                 });      
                            }  
                });
                
            }
                   
            
        }
        
     });
         /*req.flash('x',' success');
         res.redirect('/perfil');*/
		 
},    
ActualizarContrasenaUsuario : function(req,res,next){
    var salt = encrip.genSaltSync(10);
    var contrasena_actual = req.body.txt_contrasena;
    var contrasena_nueva = encrip.hashSync(req.body.txt_nueva_contrasena, salt);
    
    comando.query('SELECT * FROM usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }
        else if(row.length > 0){
            if (encrip.compareSync(contrasena_actual,row[0].contrasena_usuario)) {
                 comando.query('UPDATE usuario SET contrasena_usuario=? WHERE id_usuario =?',[contrasena_nueva,req.user.id],(err,row)=>{
                    if(err){
                        console.log(err);
                    }else{
                        req.flash('info','passwS');
                        res.redirect('/perfil');
                    }
                 });    
            }else{
                req.flash('info','passwI');
                res.redirect('/perfil');
            }
        }
        
     });
         /*req.flash('x',' success');
         res.redirect('/perfil');*/
		 
},
ActualizarNombreDispositivo : function(req,res,next){
    var id = req.body.txt_id_dispositivo_info;
    var nombre = req.body.txt_nuevo_nombre_dispositivo_info;
    comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =? AND id_dispositivo_usuario =?',[req.user.id,id],(err,row)=>{
        if(err){
            console.log(err);
        }
        else if(row.length > 0){
            
                 comando.query('UPDATE dispositivo_usuario SET nombre_dispositivo_usuario=? WHERE id_dispositivo_usuario =?',[nombre,id],(err,row)=>{
                    if(err){
                        req.flash('info','nombreDE');
                        res.redirect('/dispositivos/info/'+id)
                        console.log(err);
                    }else{
                        req.flash('info','nombreDS');
                        res.redirect('/dispositivos/info/'+id)
                    }
                 });    
            
        }
        
     });
         /*req.flash('x',' success');
         res.redirect('/perfil');*/
		 
},    
eliminarUsuario : (req,res,next)=>{
    
    var cont = 0;
    var id_usuario = req.params.id_usuario;
    if(id_usuario == req.user.id){
    var correo_usuario = req.user.correo;
    fs.stat(path.join(__dirname,'../public/video/'+correo_usuario),(err,stat)=>{
        if(err){
           comando.query('DELETE FROM usuario WHERE id_usuario =?',id_usuario,(err,result)=>{
                   if(err){
                       console.log(err);
                   }else{
                       req.logout();
		               res.redirect('/');
                   }
                   //res.send('success');
               });

        }else{
            fs.readdir(path.join(__dirname,'../public/video/'+correo_usuario+'/'), (err, data) => {
                if(err){
                    console.log(err);
                }
                 if(data.length > 0){     
       
                   data.forEach(function(file){
                       fs.unlinkSync(path.join(__dirname,'../public/video/'+correo_usuario+'/',file),function(err){
                  
                         });
                       cont++;
                       console.log('DELETE-SUCCESS',file);
                   });
                   if(cont == data.length){
                       fs.rmdir(path.join(__dirname,'../public/video/',correo_usuario),(err)=>{
                        if(err){
                            console.log('DELETE-ERROR-CARPETA: ' + err);
                            req.flash('info','errorU');
                            res.render('/perfil');
                            //res.send('errorC');
                        }
                        console.log('DELETE-SUCCESS-CARPETA->0');
                        comando.query('DELETE FROM usuario WHERE id_usuario =?',id_usuario,(err,result)=>{
                            if(err){
                                console.log(err);
                            }else{
                                req.logout();
		                        res.redirect('/');
                            }
                            //res.send('success');
                        });
                    }); 
                   }    
                 
              }else{
                fs.rmdir(path.join(__dirname,'../public/video/',correo_usuario),(err)=>{
                    if(err){
                        console.log('DELETE-ERROR-CARPETA: ' + err);
                        req.flash('info','errorU');
                        res.render('/perfil');
                        //res.send('errorC');
                    }
                    console.log('DELETE-SUCCESS-CARPETA-<0');
                    comando.query('DELETE FROM usuario WHERE id_usuario =?',id_usuario,(err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            req.logout();
		                    res.redirect('/');
                        }
                        //res.send('success');
                    });
                });
            }
        
          });
        }
    
    /**/
     });
     
    }
   
     
},
registrarFactura : function(req,res,next){
		var datos_factura = {
             id_usuario: req.user.id,
             nombre_compania: req.body.txt_nombre_compania_factura,
             identificador_impuesto: req.body.txt_impuesto_factura,
             telefono_datos_factura_usuario: req.body.txt_telefono_factura,
             correo_datos_factura_usuario: req.body.txt_correo_factura   
        };
        var direccion_usuario = {
             id_usuario: req.user.id,
             calle_usuario: req.body.txt_calle_factura,
             numero_usuario: req.body.txt_numero_factura,
             colonia_usuario: req.body.txt_colonia_factura ,
             ciudad_usuario: req.body.txt_ciudad_factura, 
             estado_usuario: req.body.txt_estado_factura,
             codigo_postal_usuario: req.body.txt_codigo_postal_factura 
        };
    
    comando.query('INSERT INTO datos_factura_usuario SET?',[datos_factura],(err,result)=>{
        if(err){
            req.flash('info','facturaE');
            res.redirect('/perfil');
            console.log(err);
        }else{
            comando.query('INSERT INTO direccion_usuario SET?',[direccion_usuario],(err,result)=>{
               if(err){
                   req.flash('info','facturaE');
                   res.redirect('/perfil');
                   console.log(err);
               }else{
                   req.flash('info','facturaS');
                   res.redirect('/perfil');
               }
           });
        }
    });
		



},
ActualizarDatosFactura : function(req,res,next){
		var datos_factura = {
             id_usuario: req.user.id,
             nombre_compania: req.body.txt_nombre_compania_factura_update,
             identificador_impuesto: req.body.txt_impuesto_factura_update,
             telefono_datos_factura_usuario: req.body.txt_telefono_factura_update,
             correo_datos_factura_usuario: req.bodytxt_correo_factura_update   
        };
        var direccion_usuario = {
             id_usuario: req.user.id,
             calle_usuario: req.body.txt_calle_factura_update,
             numero_usuario: req.body.txt_numero_factura_update,
             colonia_usuario: req.body.txt_colonia_factura_update,
             ciudad_usuario: req.body.txt_ciudad_factura_update, 
             estado_usuario: req.body.txt_estado_factura_update,
             codigo_postal_usuario: req.body.txt_codigo_postal_factura_update 
        };
    comando.query('SELECT * FROM datos_factura_usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
        if(err){
            console.log(err);
        }else{
            comando.query('UPDATE datos_factura_usuario SET? WHERE id_usuario =?',[datos_factura,req.user.id],(err,result)=>{
                if(err){
                    req.flash('info','facturaE');
                    res.redirect('/perfil');
                    console.log(err);
                }else{
                    comando.query('UPDATE direccion_usuario SET?  WHERE id_usuario =?',[direccion_usuario,req.user.id],(err,result)=>{
                       if(err){
                           req.flash('info','facturaE');
                           res.redirect('/perfil');
                           console.log(err);
                       }else{
                           req.flash('info','facturaS');
                           res.redirect('/perfil');
                       }
                   });
                }
            });
      }
    });
		



},
getCoordenadaDispositivo : function(req,res,next){
    
    var id_dispositivo = req.params.id;
    
    comando.query('SELECT CD.coordenada_tipo,CD.dispositivo_latitud,CD.dispositivo_longitud,CD.direccion_coordenada,DU.nombre_dispositivo_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN coordenada_dispositivo AS CD ON  DU.id_dispositivo_usuario = CD.id_dispositivo_usuario WHERE  U.id_usuario =? AND DU.id_dispositivo_usuario =? ORDER BY CD.dispositivo_fecha_coordenada DESC',[req.user.id,id_dispositivo],(err,coordenada)=>{
        if(err){
            console.log(err);
        }
        else if(coordenada.length > 0){
            res.send(coordenada);
        }else{
            res.send('false');
        }
        
     });
         /*req.flash('x',' success');
         res.redirect('/perfil');*/
		 
},    
getFactura : function(req,res,next){
		
		res.render('/usuario/factura');
},    
salir_usuario : function(req,res,next){
		// esta es una llamada a la función cerrar sesión de pasaporte
		req.logout();
		res.redirect('/');
	}    
}

