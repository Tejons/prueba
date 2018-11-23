const comando = require('../mysql/mysql');
const encrip = require('bcryptjs');
const nodemailer = require('nodemailer');



 
module.exports ={

getEnvioSolicitudCliente : function(req,res,next){
    res.render('cliente',{msn:req.flash('info')});
},    
getEnvioSolicitudRegistro : function(req,res,next){
    res.render('registro',{msn:req.flash('info')});
},
registrarNuevoUsuario : function(req,res,next){
    var expresion = /\w+@\w+\.+[a-z]/, 
        numeros =  /[0-9]/, 
        letras = /^[A-Za-z\s]+$/g;
    


    var nombre = req.body.nombre_nuevo_usuario;
    var correo = req.body.correo_nuevo_usuario;
    var contrasena = req.body.contrasena_nuevo_usuario;
    
    if (letras.test(nombre) && nombre.length <= 150) {
        if (expresion.test(correo) && correo.length <= 50) {
            if (contrasena.length <= 20) {
                   
                    var usuario = {
                        nombre_nuevo_usuario: nombre,
                        correo_nuevo_usuario: correo,
                        contrasena_nuevo_usuario: contrasena
                    }

                    comando.query('INSERT INTO nuevo_usuario SET?', usuario, (err, result) => {
                        if (err) {
                            req.flash('info', 'Ups, Error en el registro intentelo mas tarde');
                            res.redirect('/cliente');
                            console.log(err);
                        } else {
                            res.redirect('/registro_exitoso');
                        }
                    });
                
                
            } else {
                console.log(telefono);
                req.flash('info', 'Tu contraseña debe ser menor a 20 caracteres');
                res.redirect('/cliente');
            }

        } else {
            console.log(correo);
            req.flash('info', 'Su correo no es valido');
            res.redirect('/cliente');
        }
    } else {
        req.flash('info', 'Su nombre solo debe contener letras');
        res.redirect('/cliente');
    }
    
         
     
        
},    
registrarCliente : function(req,res,next){
    var expresion = /\w+@\w+\.+[a-z]/, 
        numeros =  /[0-9]/, 
        letras = /^[A-Za-z\s]+$/g;
    
    var nombre = req.body.txt_nombre_cliente;
    var correo = req.body.txt_correo_cliente;
    var telefono = req.body.txt_telefono_cliente;
    
    if (letras.test(nombre) && nombre.length <= 150) {
        if (expresion.test(correo) && correo.length <= 50) {
            if (numeros.test(telefono)) {
                if (telefono.length < 10 || telefono.length > 10) {
                    req.flash('info', 'Su numero debe contener 10 digitos');
                    res.redirect('/registro');
                } else {
                    
                    var cliente = {
                        nombre_cliente: nombre,
                        correo_cliente: correo,
                        telefono_cliente: telefono
                    }

                    comando.query('INSERT INTO registro_cliente SET?', cliente, (err, result) => {
                        if (err) {
                            req.flash('info', 'Ups, Error en el registro intentelo mas tarde');
                            res.redirect('/registro');
                            console.log(err);
                        } else {
                            res.redirect('/registro_exitoso');
                        }
                    });
                }
                
            } else {
                console.log(telefono);
                req.flash('info', 'Solo se permiten numeros');
                res.redirect('/registro');
            }

        } else {
            console.log(correo);
            req.flash('info', 'Su correo no es valido');
            res.redirect('/registro');
        }
    } else {
        req.flash('info', 'Su nombre solo debe contener letras');
        res.redirect('/registro');
    }
    
         
     
        
},
restablecerContrasenaGet: function (req, res, next) {
    res.render('restablecer_contrasena',{msn:req.flash('info')});
},    
restablecerContrasena: function (req, res, next) {
    var salt = encrip.genSaltSync(10);
    var caracteres = "ABC1DEF2GHI3JKL4MNO5PQR6STU7VWX8YZ9";
    var contrasena="";
    for(var i=0;i<10;i++){
    contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
     var contrasenaE = encrip.hashSync(contrasena, salt);
    var correo = req.body.correo_usuario_contrasena_restablecer_contrasena;
    comando.query('SELECT * FROM usuario WHERE correo_usuario =?', [correo], (err, row) => {
        if (err) {
            console.log(err);
        } else if (row.length > 0) {
            comando.query('UPDATE usuario SET contrasena_usuario=? WHERE id_usuario =?', [contrasenaE, row[0].id_usuario], (err, result) => {
                        if (err) {
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
                                to: row[0].correo_usuario, // list of receivers
                                subject: 'Nueva contraseña ✔', // Subject line
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
                                    '.cont_general{width: 70%; margin: auto;}' +
                                    '</style>' +
                                    '</head>' +
                                    ' <body>' +
                                    '<div class="cont_general">' +
                                    '<h1>AcaNunciate</h1>' +
                                    '<p>Hola ' + row[0].nombre_usuario + '</p>' +
                                    '<p>Tu nueva contraseña es:</p>' +
                                    '<span>Cuenta: ' + row[0].correo_usuario + '</span><br>' +
                                    '<span>Contraseña: ' + contrasena + '</span>' +
                                    '</div>' +
                                    '</body>' +
                                    ' </html>' // html body
                            };

                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    return console.log(error);
                                }
                                console.log('Message senviado: %s', info.messageId);
                                req.flash('info','Los datos se enviaron al correo');
                                res.redirect('/login_usuario');
                            });
                }
            }); 
            


        }

    });




},
validacionCorreo : function(req,res,next){
    var correo = req.params.correo;
    comando.query('UPDATE usuario SET validacion_usuario = "V" WHERE correo_usuario =?',[correo],(err,result)=>{
       if(err){
           
           console.log(err);
       }else{
           res.redirect('/login_usuario');
       }
   });
}    
}
function ValidarCajaTextoCorreo(caja){
    if(expresion.test(caja)){
        return true;
    }else{
        return false;
    }
 }
function ValidarCajaTextoLetras(caja){
    if(letras.test(caja)){
        return true;
    }else{
        return false;
    }
 }
function ValidarCajaTextoNumeros(caja){
    if(!isNaN(caja)){
        return true;
    }else{
        return false;
    }
 }