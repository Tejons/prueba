const comando = require('../mysql/mysql');
const encrip = require('bcryptjs');
var fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
 
module.exports ={    
getLoginAdministrador : function(req,res,next){
 
     res.render('login_administrador',{isAuthenticated : req.isAuthenticated(),msn:req.flash('info')});   
 
},
getSolicitudes : (req,res,next)=>{
    //var numeroSolicitudes = 0;
    comando.query('SELECT * FROM nuevo_usuario WHERE confirmacion_nuevo_usuario = "F"',(err,row)=>{
        if (err) {
            console.log(err);
        } else {
            comando.query('SELECT * FROM suscripcion_usuario', (err, suscripcion) => {
                if (err) {
                    console.log(err);
                }
                for (var i = 0; i < row.length; i++) {
                    var fechaHora = row[i].fecha_creacion_nuevo_usuario;
                    var dia = fechaHora.getDay(),
                        fecha = fechaHora.getDate(),
                        mes = fechaHora.getMonth(),
                        año = fechaHora.getFullYear(),
                        hora = fechaHora.getHours(),
                        minuto = fechaHora.getMinutes(),
                        segundo = fechaHora.getSeconds(),
                        ampm;

                    if (hora >= 12) {
                        hora = hora - 12;
                        ampm = 'PM';
                    } else {
                        ampm = 'AM';
                    }
                    if (hora == 0) {
                        hora = 12;
                    }
                    if (minuto < 10) {
                        minuto = '0' + minuto;
                    }
                    if (segundo < 10) {
                        segundo = '0' + segundo;
                    }

                    var semana = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                        meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', '   Dic'];

                    fechaHora = semana[dia] + ' ' + fecha + ' de ' + meses[mes] + ' del ' + año + ' Hora: ' + hora + ':' + minuto + ':' + segundo + ' ' + ampm;
                    row[i].fecha_creacion_nuevo_usuario = fechaHora;
                }
                res.render('administrador/solicitudes', {
                    user: req.user,
                    solicitudes: row,
                    suscripcion: suscripcion,
                    msn: req.flash('info')
                });

            });
        }
    });

},
getClientes : (req,res,next)=>{
    //var numeroSolicitudes = 0;
    comando.query('SELECT * FROM registro_cliente WHERE estado_cliente = "F"',(err,row)=>{
        if(err){
            console.log(err);
        }else{
            res.render('administrador/clientes',{user:req.user,clientes:row,msn:req.flash('info')});
        }
    });

},
eliminarSolicitudUsuario : (req,res,next)=>{
    var id = req.params.id;
   comando.query('DELETE FROM nuevo_usuario WHERE id_nuevo_usuario =?',id,(err,result)=>{
                   if(err){
                       req.flash('info','solicitudesE');
                       res.redirect('/solicitudes');
                       console.log(err);
                   }else{
                       req.flash('info','solicitudesS');
                       res.redirect('/solicitudes');
                   }
                   //res.send('success');
               });

},    
eliminarCliente : (req,res,next)=>{
    var id = req.params.id;
   comando.query('DELETE FROM registro_cliente WHERE id_cliente =?',id,(err,result)=>{
                   if(err){
                       req.flash('info','clienteE');
                       res.redirect('/clientes');
                       console.log(err);
                   }else{
                       req.flash('info','clienteS');
                       res.redirect('/clientes');
                   }
                   //res.send('success');
               });

},       
getUsuarios : (req,res,next)=>{
    //var numeroUsuarios = 0;
    comando.query('SELECT U.id_usuario,U.nombre_usuario,U.correo_usuario,U.dispositivos_disponibles,U.fecha_creacion_usuario,U.validacion_usuario,FIU.fecha_ingreso_usuario FROM usuario AS U INNER JOIN fecha_ingreso_usuario AS FIU ON U.id_usuario = FIU.id_usuario',(err,row)=>{
        if(err){
            console.log(err);
        }
        /*for(var i=0; i < row.length ;i++){
            numeroUsuarios = i+1;
        }*/
        for(var i=0; i < row.length ;i++){
            var fechaHora = row[i].fecha_creacion_usuario;
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
               meses=   ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','   Dic'];
        
        fechaHora = semana[dia]+' '+fecha+' de '+meses[mes]+' del '+año+' Hora: '+hora+':'+minuto+':'+segundo+' '+ampm;
        row[i].fecha_creacion_usuario = fechaHora;    
        }
        
        for(var i=0; i < row.length ;i++){
            var fechaHora = row[i].fecha_ingreso_usuario;
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
               meses=   ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','   Dic'];
        
        fechaHora = semana[dia]+' '+fecha+' de '+meses[mes]+' del '+año+' Hora: '+hora+':'+minuto+':'+segundo+' '+ampm;
        row[i].fecha_ingreso_usuario = fechaHora;    
        }
        console.log(row);
        res.render('administrador/usuarios',{user:req.user,usuarios:row,msn:req.flash('info')});
        
    });

},
registrarUsuarios: (req, res, next) => {
    var salt = encrip.genSaltSync(10);
    var contr = req.body.contrasena;
    var contrasenaE = encrip.hashSync(req.body.contrasena, salt);
    var usuario = {
        nombre_usuario: req.body.nombre,
        correo_usuario: req.body.correo,
        dispositivos_disponibles: req.body.dispositivos,
        contrasena_usuario: contrasenaE,
        id_suscripcion: req.body.suscripcion
    }
    comando.query('SELECT * FROM usuario WHERE correo_usuario =?', usuario.correo_usuario, (err, row) => {
        if (err) {
            throw err;
        }
        if (row.length > 0) {
            res.send('exists');
        } else {
            fs.mkdir(path.join(__dirname, '../public/video/', usuario.correo_usuario), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    comando.query('INSERT INTO usuario SET?', usuario, (err, result) => {
                        if (err) {
                            res.send('error');
                            console.log(err);
                        } else {
                            
                            let transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'aca.anunciate@gmail.com', // generated ethereal user
                                    pass: 'Acapulco1' // generated ethereal password
                                }
                            });


                            let mailOptions = {
                                from: 'AcaNunciate <aca.anunciate@gmail.com>', // sender address
                                to: usuario.correo_usuario, // list of receivers
                                subject: 'Confirmacion de cuenta ✔', // Subject line
                                text: '', // plain text body
                                html: '<!DOCTYPE html>' +
                                    '<html lang="es">' +
                                    '<head>' +
                                    '<title></title>' +
                                    ' <meta charset="utf-8">' +
                                    '<style type="text/css">' +
                                    'body{width: 100%;background-color:#FDEBD0;}' +
                                    'p{text-align: justify;}' +
                                    'button{ background-color:#218838 ; color:white;border: none;font-size: 15px;border-radius: 5px;color: aliceblue;padding: 5px;}' +
                                    'h1{width: 100%; background-color: #D35400;text-align: center;color:white;}' +
                                    '.div_boton{text-align: center;}' +
                                    '.cont_general{width: 70%; margin: auto;}'+
                                    '</style>' +
                                    '</head>' +
                                    ' <body>' +
                                    '<div class="cont_general">' +
                                    '<h1>AcaNunciate</h1>' +
                                    '<p>Hola ' + usuario.nombre_usuario + '</p>' +
                                    '<span>Cuenta: '+usuario.correo_usuario+'</span><br>'+
                                    '<span>Contraseña: '+contr+'</span>'+
                                    '<p>Gracias por probar con nosotros! AcaNunciate es un sistema de señalización digital en la nube de fácil utilización. Nuestra solución para la gestión de señalización digital está disponible para Android.</p>' +
                                    '<p>A partir de ahora, usted tendrá acceso a todas las funcionalidades de la cuenta. Queremos hacer que su gestión de señalización digital sea fácil. Por lo tanto, estamos constantemente mejorando nuestra plataforma</p>' +
                                    '<p>Por favor validar su dirección de correo electrónico haciendo clic en el botón de abajo</p>' +
                                    '<div class="div_boton">' +
                                    '<a href="http://192.168.1.76:5000/validacion_correo/'+usuario.correo_usuario+'"><button>Validar correo electrónico</buttton></a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</body>' +
                                    ' </html>' // html body
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Correo enviado: %s', info.messageId);
                                res.send('success');
                            });
                            /*res.json({
                                success:'success',
                                usuario:usuario
                            });*/
                        }
                    });
                }
            });
        }
    });

},
getEditarUsuario : (req,res,next)=>{
    var id = req.params.id;
    
    comando.query('SELECT * FROM usuario WHERE id_usuario =?',id,(err,row)=>{
        if(err){
            throw err;
        } 
        else if(row.length > 0){
           res.render('administrador/ventanas/editar_usuario',{user:req.user,usuario:row});
        }else{
             
        }
    });

},
editarUsuario: (req,res,next)=>{
    var id = req.params.id;
    var usuario={
        nombre_usuario: req.body.nombre_usuario,
        correo_usuario: req.body.correo_usuario,
        dispositivos_disponibles: req.body.dispositivos_disponibles ,
        validacion_usuario: req.body.validacion_usuario ,
        id_suscripcion: req.body.tipo_suscripcion
    }
    comando.query('UPDATE usuario SET? WHERE id_usuario =?',[usuario,id],(err,result)=>{
       if(err){
           req.flash('info','eusuarioE');
           res.redirect('/usuarios');
           console.log(err);
       }else{
           req.flash('info','eusuarioS');
           res.redirect('/usuarios');
       }
   });


},    
eliminarUsuario: function (req, res) {
        var cont = 0;
        var id_usuario = req.params.id_usuario;
        var correo_usuario = req.body.correo;
        correo_usuario = correo_usuario.replace(/\s/g,"");
        console.log(correo_usuario);
        fs.stat(path.join(__dirname, '../public/video/' + correo_usuario), (err, stat) => {
            if (err) {
                comando.query('DELETE FROM usuario WHERE id_usuario =?', id_usuario, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('1');
                        res.send('success');
                    }
                    //res.send('success');
                });

            } else {
                fs.readdir(path.join(__dirname, '../public/video/' + correo_usuario + '/'), (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    if (data.length > 0) {

                        data.forEach(function (file) {
                            fs.unlinkSync(path.join(__dirname, '../public/video/' + correo_usuario + '/', file), function (err) {
                                /*if(err){
                                    console.log('DELETE-ERROR: ' + err);
                                    res.send('errorA');
                                       }else{
                                           console.log('DELETE-SUCCESS',file);
                                       }*/
                            });
                            cont++;
                            console.log('DELETE-SUCCESS', file);
                        });
                        if (cont == data.length) {
                            fs.rmdir(path.join(__dirname, '../public/video/', correo_usuario), (err) => {
                                if (err) {
                                    console.log('DELETE-ERROR-CARPETA: ' + err);
                                    res.send('errorC');
                                }
                                console.log('DELETE-SUCCESS-CARPETA->0');
                                comando.query('DELETE FROM usuario WHERE id_usuario =?', id_usuario, (err, result) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log('2');
                                    res.send('success');
                                });
                            });
                        }
                    } else {
                        fs.rmdir(path.join(__dirname, '../public/video/', correo_usuario), (err) => {
                            if (err) {
                                console.log('DELETE-ERROR-CARPETA: ' + err);
                                res.send('errorC');
                            }
                            console.log('DELETE-SUCCESS-CARPETA-<0');
                            comando.query('DELETE FROM usuario WHERE id_usuario =?', id_usuario, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('3');
                                res.send('success');
                            });
                        });
                    }

                });
            }
        });
},
getSuscripcion : (req,res,next)=>{
    //var numeroSolicitudes = 0;
    comando.query('SELECT * FROM suscripcion_usuario',(err,row)=>{
        if(err){
            console.log(err);
        }
        /*for(var i=0; i < row.length ;i++){
            numeroSolicitudes = i+1;
        }*/
        res.render('administrador/suscripcion',{user:req.user,suscripciones:row,msn:req.flash('info')});
        
    });

},
registrarSuscripcion: (req,res,next)=>{
    var suscripcion ={
        tipo_suscripcion: req.body.txt_tipo_suscripcion,
        precio_suscripcion: req.body.txt_precio_suscripcion
    }
    comando.query('INSERT INTO suscripcion_usuario SET?',suscripcion,(err,result)=>{
       if(err){
           req.flash('info','suscripcionE');
           res.redirect('/suscripcion');
           console.log(err);
       }else{
           req.flash('info','suscripcionS');
           res.redirect('/suscripcion');
           //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
       }
   });


},
editarSuscripcionDatos: (req,res,next)=>{
    var id = req.params.id;
    comando.query('SELECT * FROM suscripcion_usuario WHERE id_suscripcion =?',[id],(err,row)=>{
       if(err){
           res.send('error');
           console.log(err);
       }else{
           //req.flash('info','esuscripcionS');
           res.send(row);
           //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
       }
   });


},    
editarSuscripcionNuevos: (req,res,next)=>{
    var id = req.params.id;
    var datos={
        tipo_suscripcion: req.body.txt_tipo_suscripcion_update,
        precio_suscripcion: req.body.txt_precio_suscripcion_update
    }
    comando.query('UPDATE suscripcion_usuario SET? WHERE id_suscripcion =?',[datos,id],(err,result)=>{
       if(err){
           req.flash('info','esuscripcionE');
           res.redirect('/suscripcion');
           console.log(err);
       }else{
           req.flash('info','esuscripcionS');
           res.redirect('/suscripcion');
           //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
       }
   });


},
buscarRegistro: (req,res,next)=>{
    
    var registro = req.body.registro;
    
    
    comando.query('SELECT * FROM usuario WHERE nombre_usuario LIKE "%'+registro+'%" OR correo_usuario LIKE "%'+registro+'%"',(err,row)=>{
       if(err){
           res.send('error');
           console.log(err);
       }else{
           for(var i=0; i < row.length ;i++){
            var fechaHora = row[i].fecha_creacion_usuario;
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
               meses=   ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','   Dic'];
        
        fechaHora = semana[dia]+' '+fecha+' de '+meses[mes]+' del '+año+' Hora: '+hora+':'+minuto+':'+segundo+' '+ampm;
        row[i].fecha_creacion_usuario = fechaHora;    
        }
           //req.flash('info','esuscripcionS');
           res.send(row);
           //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
       }
   });


},    
sesionActivaAdministrador : function(req,res){
    if(req.isAuthenticated()){
        res.send('true');
    }else{
        res.send('false');
    }
},  
salirAdministrador : function(req,res,next){
		// esta es una llamada a la función cerrar sesión de pasaporte
		req.logout();
		res.redirect('/login_administrador');
	}    
};

/*function EliminarVideosCarpeta(correo_usuario,data){
    data.forEach(function(file){
              fs.unlink(path.join(__dirname,'../public/video/'+correo_usuario+'/',file),function(err){
                if(err){
                    console.log('DELETE-ERROR: ' + err);
                       }else{
                           console.log('DELETE-SUCCESS',file);
                       }
                });
          });
};*/
