var estrategialocal = require('passport-local').Strategy;
const comando = require('../mysql/mysql');
const encrip = require('bcryptjs');

module.exports= function(passport){
    
    passport.serializeUser(function(user,done){
        done(null,user);
    });
    
    passport.deserializeUser(function(obj,done){
       done(null,obj); 
    });
    
    passport.use('validar-administrador',new estrategialocal({
        usernameField : 'correo',
        passwordField : 'contrasena',
        passReqToCallback : true
    },function(req,correo,contrasena,done){
        
             comando.query('SELECT * FROM administrador WHERE correo_administrador =?',correo,(err,row)=>{
             if(err){
                 throw err;
             } 
             if(row.length > 0){
                 var user = row[0];
                 if (encrip.compareSync(contrasena, user.contrasena_administrador)) {
                     admin = {
                         id_administrador: user.id_administrador
                     }
                     comando.query('SELECT * FROM fecha_ingreso_administrador WHERE id_administrador =?', user.id_administrador, (err, row) => {
                         if (err) {
                             console.log(err);
                         }
                         if (row.length > 0) {
                             comando.query('DELETE FROM fecha_ingreso_administrador WHERE id_administrador =?', user.id_administrador, (err, result) => {
                                 if (err) {
                                     console.log(err);
                                 } else {
                                     comando.query('INSERT INTO fecha_ingreso_administrador SET?', admin, (err, result) => {
                                         if (err) {
                                             console.log(err);
                                         } else {
                                             return done(null, {
                                                 id: user.id_administrador,
                                                 tipo: 'administrador',
                                                 nombre: user.nombre_administrador,
                                                 correo: user.correo_administrador
                                             });
                                             //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
                                         }
                                     });

                                 }

                             });
                         } else {
                             comando.query('INSERT INTO fecha_ingreso_administrador SET?', admin, (err, result) => {
                                 if (err) {
                                     console.log(err);
                                 } else {
                                     return done(null, {
                                         id: user.id_administrador,
                                         tipo: 'administrador',
                                         nombre: user.nombre_administrador,
                                         correo: user.correo_administrador
                                     });
                                     //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
                                 }
                             });
                         }
                     });

                 } else {
                         return done(null,false, req.flash('info',' Contraseña incorrecta'));
                     }
             }else{
                 return done(null,false, req.flash('info','Correo  incorrecto'));
             }
            });
 
    }));
    
    passport.use('validar-usuario',new estrategialocal({
        usernameField : 'correo',
        passwordField : 'contrasena',
        passReqToCallback : true
    },function(req,correo,contrasena,done){
             comando.query('SELECT * FROM usuario WHERE correo_usuario =?', correo,(err,row)=>{
              if(err){
                 throw err;
                 }
              if (row.length > 0) {
                  if (row[0].validacion_usuario != 'F') {
                      var user = row[0];
                      if (encrip.compareSync(contrasena, user.contrasena_usuario)) {
                          usuario = {
                              id_usuario: user.id_usuario
                          }
                          comando.query('SELECT * FROM fecha_ingreso_usuario WHERE id_usuario =?', user.id_usuario, (err, row) => {
                              if (err) {
                                  console.log(err);
                              }
                              if (row.length > 0) {
                                  comando.query('DELETE FROM fecha_ingreso_usuario WHERE id_usuario =?', user.id_usuario, (err, result) => {
                                      if (err) {
                                          console.log(err);
                                      } else {
                                          comando.query('INSERT INTO fecha_ingreso_usuario SET?', usuario, (err, result) => {
                                              if (err) {
                                                  console.log(err);
                                              } else {
                                                  return done(null, {
                                                      id: user.id_usuario,
                                                      tipo: 'usuario',
                                                      nombre: user.nombre_usuario,
                                                      correo: user.correo_usuario
                                                  });
                                                  //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
                                              }
                                          });

                                      }

                                  });
                              } else {
                                  comando.query('INSERT INTO fecha_ingreso_usuario SET?', usuario, (err, result) => {
                                      if (err) {
                                          console.log(err);
                                      } else {
                                          return done(null, {
                                              id: user.id_usuario,
                                              tipo: 'usuario',
                                              nombre: user.nombre_usuario,
                                              correo: user.correo_usuario
                                          });
                                          //res.render('administrador/suscripcion',{user:req.user,suscripciones:row});
                                      }
                                  });
                              }
                          });



                      } else {
                          return done(null, false, req.flash('info', ' Contraseña incorrecta'));
                      }
                  } else {
                      return done(null, false, req.flash('info', 'Valide cuenta desde correo electronico'));
                  }
              } else {
                  return done(null, false, req.flash('info', 'Correo  incorrecto'));
              }
            });
 
    }));
}