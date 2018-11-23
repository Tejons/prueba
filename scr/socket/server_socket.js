const comando = require('../mysql/mysql');
var fs = require('fs');
const path = require('path');

module.exports = function(io){
    
    let dispositivosConectados={};
    let dispositivo={};
    let dispositivosNuevos={};
    let dispositivoCliente={};
    let listaVideos={};
    var caracteres = "ABC1DEF2GHI3JKL4MNO5PQR6STU7VWX8YZ9";
    var codigo="";
    var urlservidor = 'http://acanunciate.com/video/';
   
    
    function generarCodigo(){
    codigo="";    
    for(var i=0;i<5;i++){
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
        /*comando.query('SELECT * FROM dispositivo_usuario WHERE codigo_dispositivo_usuario =?',codigo,(err,row)=>{
       if(err){
            throw err;
        } 
        if(row.length > 0){
            console.log('codigo repetido');
            generarCodigo();
        }
    });*/
    }
    

    io.on('connection',(socket) =>{
        
        //console.log('Nuevo dispositivo---------');
         io.sockets.emit('sesion:caducada',{
            sesion:'sesion'             
         });
        
        socket.emit('verificar:dispositivo',{
            msn:socket.id 
         });
        
        
        socket.on('dispositivos:conectados',(data)=>{
            
            for( var codigo in dispositivosConectados ){
                if(dispositivosConectados[codigo].hasOwnProperty('id_u')){
                    socket.emit('dispositivo:conectado',{
                        id:dispositivosConectados[codigo].id_u,
                        codigo:codigo
                     });
                }      
            }
           //socket.emit('dispositivo:conectado') 
        });
        
        socket.on('dispositivo:conectado', (data) => {
        
            if (data.codigo_dispositivo in dispositivosConectados) {
                //console.log('SI ESTA',data.codigo_dispositivo);
            } else {
                dispositivosConectados[data.codigo_dispositivo] = socket;
                //console.log('NO ESTA',data.codigo_dispositivo,'cont:',cont);
                comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =? AND codigo_dispositivo_usuario =?', [data.id_usuario, data.codigo_dispositivo], (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    if (row.length > 0) {
                        socket.codigo = data.codigo_dispositivo;
                        socket.id_u = data.id_usuario;
                        socket.id_d = data.id_dispositivo;
                        socket.latitud = data.latitud;
                        socket.longitud = data.longitud;
                        socket.direccion = data.direccion;
                        dispositivo[socket.codigo] = socket;
                        if (data.id_dispositivo == 'Null') {
                            dispositivo[row[0].codigo_dispositivo_usuario].emit('id:dispositivo', {
                                id_dispositivo: row[0].id_dispositivo_usuario
                            });
                            socket.id_d = row[0].id_dispositivo_usuario;
                        }
                        dispositivosConectados[socket.codigo] = dispositivo[socket.codigo];
                        delete dispositivo[socket.codigo];
                        io.sockets.emit('dispositivo:conectado', {
                            id: data.id_usuario,
                            codigo: data.codigo_dispositivo
                        });
                        conectado = {
                            id_dispositivo_usuario: row[0].id_dispositivo_usuario,
                            evento_dispositivo_tipo: 'conectado',
                            evento_dispositivo_informacion: 'Dispositivo conectado'
                        };
                        coordenadas = {
                            id_dispositivo_usuario: row[0].id_dispositivo_usuario,
                            coordenada_tipo: 'I',
                            dispositivo_latitud: socket.latitud,
                            dispositivo_longitud: socket.longitud,
                            direccion_coordenada: socket.direccion

                        };
                        comando.query('INSERT INTO evento_dispositivo_usuario SET?', [conectado], (err, row) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (socket.latitud != 0 && socket.longitud != 0) {
                                    comando.query('INSERT INTO coordenada_dispositivo SET?', [coordenadas], (err, row) => {
                                        if (err) {
                                            console.log(err);
                                        } else {

                                        }

                                    });
                                }

                            }

                        });
                        comando.query('SELECT VDU.id_video_dispositivo_usuario,U.correo_usuario,DU.codigo_dispositivo_usuario,VU.nombre_video_usuario,VDU.estado_descarga FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE VDU.estado_descarga ="F" AND U.id_usuario =? AND DU.codigo_dispositivo_usuario =?', [data.id_usuario, data.codigo_dispositivo], (err, row) => {
                            if (err) {
                                console.log(err);
                            }
                            if (row.length > 0) {
                                console.log('NEW-VIDEO:', row[0].nombre_video_usuario);
                                if (row[0].codigo_dispositivo_usuario in dispositivosConectados) {
                                    dispositivosConectados[row[0].codigo_dispositivo_usuario].emit('nombre:video', {
                                        msn: urlservidor + row[0].correo_usuario + '/' + row[0].nombre_video_usuario,
                                        name: row[0].nombre_video_usuario,
                                        id: row[0].id_video_dispositivo_usuario
                                    });
                                }
                            } else {
                                console.log('SIN-VIDEO');
                            }
                        });
                        console.log('CONECTADO CODIGO:', socket.codigo, ' IP:', socket.handshake.address, ' Usuario ID:', socket.id_u, ' *');
                    } else {
                        dispositivo[socket.codigo].emit('eliminar:dispositivo', {
                            msn: socket.codigo
                        });
                        console.log('No esta en la BD');
                        console.log(socket.codigo);
                    }
                });
            }


        });
        
        
        
        
        socket.on('solicitar:codigo',()=>{
            generarCodigo(); 
            socket.codigo = codigo;
            dispositivosNuevos[socket.codigo] = socket;
            dispositivosNuevos[socket.codigo].emit('envio:codigo',{
               msn: codigo
            });
        
        console.log('Nuevo Codigo:'+socket.codigo+' IP:',socket.handshake.address,' +');
        //console.log('codigo '+codigo+' enviado a ',socket.handshake.address);
        });
    
        socket.on('verificar:codigo',(data)=>{
        socket.codigo = data;
        dispositivosNuevos[socket.codigo] = socket;
        console.log('Registro Codigo:',socket.codigo,' IP:',socket.handshake.address,' *');
        });
        
        socket.on('registrar:dispositivo',(data,callback)=>{
        //cb(true);
           if(data.codigo in dispositivosNuevos){
              callback(true);
              socket.codigo = data.codigo;
              var id = data.id;
              //dispositivosConectados[socket.codigo]= dispositivosNuevos[socket.codigo];
              //delete dispositivosNuevos[socket.codigo];
              dispositivosNuevos[socket.codigo].emit('dispositivo:registrado',{
                 id:id,    
                 codigo: socket.codigo
              });   
            delete dispositivosNuevos[socket.codigo];
           }else{
              callback(false);
            
           }
        });
        
        socket.on('video:iniciado',(data)=>{
            //console.log(data.codigo);
            if (data.codigo in dispositivosConectados) {
                comando.query('SELECT VU.nombre_video_usuario,DU.id_dispositivo_usuario,DU.nombre_dispositivo_usuario,DU.codigo_dispositivo_usuario FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE  U.id_usuario =? AND DU.id_dispositivo_usuario=? AND VU.nombre_video_usuario =?', [data.id_usuario, data.id_dispositivo, data.nombrevideo], (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    if (row.length > 0) {

                        reproduccion = {
                            id_dispositivo_usuario: row[0].id_dispositivo_usuario,
                            evento_dispositivo_tipo: 'reproduccion',
                            evento_dispositivo_informacion: 'Video reproducido: ' + data.nombrevideo.slice(0, -4)
                        };
                        comando.query('INSERT INTO evento_dispositivo_usuario SET?', [reproduccion], (err, row) => {
                            if (err) {
                                console.log(err);
                            } else {

                            }

                        });
                    } else {

                        if (data.codigo in dispositivosConectados) {
                            //console.log('ENVIANDO VIDEO A ELIMINAR',data.nombrevideo,' a ',data.id_dispositivo);
                            dispositivosConectados[data.codigo].emit('eliminar:video', {
                                msn: data.nombrevideo
                            });
                        } else {
                            console.log('DISPOSITIVO NO ESTA CONECTADO');
                        }
                    }
                });
            }
            
        });
        
        
        socket.on('coordenadas:dispositivo',(data)=>{
            if (!socket.codigo) return;
            //console.log('COORDENADAS: ',socket.id_d,socket.direccion);
            if (socket.latitud == 0 && socket.longitud == 0) {
                
                socket.latitud = data.latitud;
                socket.longitud = data.longitud;
                socket.direccion = data.direccion;
                console.log('COORDENADAS 0-0:',socket.id_d,socket.direccion);
                
                coordenadas={
                      id_dispositivo_usuario: socket.id_d,
                      coordenada_tipo:'I',
                      dispositivo_latitud: socket.latitud,
                      dispositivo_longitud: socket.longitud,
                      direccion_coordenada: socket.direccion
                      
                  };
                comando.query('INSERT INTO coordenada_dispositivo SET?', [coordenadas], (err, row) => {
                    if (err) {
                        console.log(err);
                    } else {

                    }

                });
            }
    
        });
        
        socket.on('eliminar:dispositivo',(data,callback)=>{
           if(data in dispositivosConectados){
              callback(true);
              dispositivosConectados[data].emit('eliminar:dispositivo',{
                  msn:data
              });
           }else{
              callback(false);
           }
           
        });
        
        
        socket.on('informacion:video',(data)=>{
            
           comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =? AND id_dispositivo_usuario =?', [data.id_usuario, data.id_dispositivo], (err, row) => {
                        if (err) {
                            console.log(err);
                        } else if (row.length > 0) {
                            eliminado = {
                                id_dispositivo_usuario: data.id_dispositivo,
                                evento_dispositivo_tipo: 'vEliminado',
                                evento_dispositivo_informacion: 'Video eliminado ' + data.nombre.slice(0,-4)
                            };
                            comando.query('INSERT INTO evento_dispositivo_usuario SET?', [eliminado], (err, row) => {
                                if (err) {
                                    console.log(err);
                                } else {

                                }

                            });

                        }
                    }); 
        });
        
        socket.on('informacion:dispositivo',(data)=>{
           var codigo = data.codigo;
           var accion = data.accion;
              if(accion =='Eliminado'){
                 io.sockets.emit('dispositivo:eliminado',{
                    success:true 
                 });
                 console.log('IDE') 
              }
              else if(accion =='Error'){
                 io.sockets.emit('dispositivo:eliminado',{
                    success:false 
                 });
              }
            
        });
        
        socket.on('errores:dispositivo', (data) => {
            errores = {
                id_dispositivo_usuario: data.id_dispositivo,
                evento_dispositivo_tipo: 'errorD',
                evento_dispositivo_informacion: data.info_error
            };
            comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =? AND id_dispositivo_usuario =?', [data.id_usuario, data.id_dispositivo], (err, row) => {
                if (err) {
                    console.log(err);
                } else if (row.length > 0) {
                    comando.query('INSERT INTO evento_dispositivo_usuario SET?', [errores], (err, row) => {
                        if (err) {
                            console.log(err);
                        } else {

                        }

                    });

                }
            });


        });
        socket.on('url',(data)=>{
            //urlservidor = data.url;
           console.log(urlservidor); 
        });
        
        socket.on('off',(data)=>{
            //urlservidor = data.url;
           console.log(data); 
        });
        
        socket.on('verificar:publicaciones',(data)=>{
            console.log('VERIFICAR:PUBLICACIONES');
                
        });
        
        socket.on('enviar:publicaciones',(data)=>{
            for(var i=0; i<data.length;i++){
                if(data[i].codigo_dispositivo_usuario in dispositivosConectados){
                    dispositivosConectados[data[i].codigo_dispositivo_usuario].emit('nombre:video',{
                        msn:urlservidor+data[0].correo_usuario+'/'+data[i].nombre_video_usuario,
                        name:data[i].nombre_video_usuario,
                        id:data[i].id_video_dispositivo_usuario
                    });
                 }
               //console.log(data[i].nombre_video_usuario);   
            }
        });
         
        socket.on('video:descargado', (data) => {
            comando.query('UPDATE video_dispositivo_usuario SET estado_descarga="V" WHERE id_video_dispositivo_usuario =? AND id_dispositivo_usuario =?', [data.id_video_dispositivo_usuario,data.id_dispositivo], (err, row) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('UPDATE-SUCCESS: ID USUARIO', data.id_usuario, ' ID DISPOSITIVO', data.id_dispositivo, 'NOMBRE DE VIDEO ', data.nombre_video, );

                    comando.query('SELECT * FROM dispositivo_usuario WHERE id_usuario =? AND id_dispositivo_usuario =?', [data.id_usuario, data.id_dispositivo], (err, row) => {
                        if (err) {
                            console.log(err);
                        } else if (row.length > 0) {
                            descargado = {
                                id_dispositivo_usuario: data.id_dispositivo,
                                evento_dispositivo_tipo: 'vDescargado',
                                evento_dispositivo_informacion: 'Video descargado: "' + data.nombre_video.slice(0, -4)+' Size: ' + data.tamaño_video+'"'
                            };
                            comando.query('INSERT INTO evento_dispositivo_usuario SET?', [descargado], (err, row) => {
                                if (err) {
                                    console.log(err);
                                } else {

                                }

                            });

                        }
                    });

                    /*comando.query('INSERT INTO evento_dispositivo_usuario SET?', [datos], (err, row) => {
                        if (err) {
                            console.log(err);
                        } else {

                        }

                    });*/


                    comando.query('SELECT VDU.id_video_dispositivo_usuario,U.correo_usuario,DU.codigo_dispositivo_usuario,VU.nombre_video_usuario,VDU.estado_descarga FROM usuario AS U INNER JOIN dispositivo_usuario AS DU ON U.id_usuario = DU.id_usuario INNER JOIN video_dispositivo_usuario AS VDU ON DU.id_dispositivo_usuario= VDU.id_dispositivo_usuario INNER JOIN video_usuario AS VU ON VDU.id_video_usuario = VU.id_video_usuario WHERE VDU.estado_descarga ="F" AND U.id_usuario =? AND DU.codigo_dispositivo_usuario =?', [data.id_usuario, data.codigo_dispositivo], (err, row) => {
                        if (err) {
                            console.log(err);
                        }
                        if (row.length > 0) {
                            if (row[0].codigo_dispositivo_usuario in dispositivosConectados) {
                                dispositivosConectados[row[0].codigo_dispositivo_usuario].emit('nombre:video', {
                                    msn: urlservidor + row[0].correo_usuario + '/' + row[0].nombre_video_usuario,
                                    name: row[0].nombre_video_usuario,
                                    id: row[0].id_video_dispositivo_usuario
                                });
                            }
                        } else {
                            io.sockets.emit('sincronizacion:dispositivo', {
                                id: data.id_usuario,
                                codigo: data.codigo_dispositivo
                            });
                        }
                    });
                }
            });
        });
        
    socket.on('disconnect',function(){
        //console.log('cliente desconectado',socket.id);
        if(!socket.codigo)return;
        if(socket.codigo in dispositivosConectados){
             var id_dispositivo_usuario = socket.id_d;
             io.sockets.emit('dispositivo:desconectado',{
                         codigo:socket.codigo
             });
             datos={
                      id_dispositivo_usuario: socket.id_d,
                      evento_dispositivo_tipo:'desconectado',
                      evento_dispositivo_informacion:'Dispositivo desconectado'
                  };
            coordenadas={
                      id_dispositivo_usuario: socket.id_d,
                      coordenada_tipo:'F',
                      dispositivo_latitud: socket.latitud,
                      dispositivo_longitud: socket.longitud,
                      direccion_coordenada: socket.direccion
                      
                  };
            //console.log(datos);
                  comando.query('INSERT INTO evento_dispositivo_usuario SET?', [datos], (err, row) => {
                      if (err) {
                          console.log('DESC: ', err);
                      } else {
                          if (socket.latitud != 0 && socket.longitud != 0) {
                              comando.query('INSERT INTO coordenada_dispositivo SET?', [coordenadas], (err, row) => {
                                  if (err) {
                                      console.log(err);
                                  } else {
                                      
                                  }

                              });
                          }
                      }

                  });
                  var fechaDispositivo={
                           id_dispositivo_usuario : id_dispositivo_usuario
                  }
                  comando.query('SELECT * FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?',id_dispositivo_usuario, (err, row) => {
                      if (err) {
                          console.log(err);
                      }
                      if (row.length > 0) {
                          comando.query('DELETE FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?',id_dispositivo_usuario, (err, result) => {
                              if (err) {
                                  console.log(err);
                              } else {
                                  comando.query('INSERT INTO desconexion_dispositivo SET?',fechaDispositivo, (err, result) => {
                                      if (err) {
                                          console.log(err);
                                      } else {
                                          /*comando.query('SELECT * FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?', id_dispositivo_usuario, (err, row) => {
                                              if (err) {
                                                  console.log(err);
                                              }
                                              if (row.length > 0) {
                                        
                                              }
                                          });*/
                                      }
                                  });

                              }

                          });
                      } else {
                          //console.log('R:',id_dispositivo_usuario_d);
                          comando.query('INSERT INTO desconexion_dispositivo SET?',fechaDispositivo, (err, result) => {
                              if (err) {
                                  console.log(err);
                              } else {
                                  /*comando.query('SELECT * FROM desconexion_dispositivo WHERE id_dispositivo_usuario =?', id_dispositivo_usuario, (err, row) => {
                                      if (err) {
                                          console.log(err);
                                      }
                                      if (row.length > 0) {
                                          
                                      }
                                  });*/
                              }
                          });
                      }
                  });
            delete dispositivosConectados[socket.codigo];
            console.log('Desconectado Codigo:', socket.codigo, ' IP:', socket.handshake.address, ' -');
             
        }
        /*if(socket.codigo in dispositivosNuevos){
         console.log('Desconectado Codigo:',socket.codigo,' IP:',socket.handshake.address,' PRIMER SOCKET');
        }*/
    });
       
});
    
    
}


