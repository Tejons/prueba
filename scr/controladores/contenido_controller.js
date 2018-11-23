const comando = require('../mysql/mysql');
var formidable = require('formidable');
var fs = require('fs');
const path = require('path');

module.exports ={
    
subirContenido: function (req, res, next) {
    var contenido_correo_usuario;
    comando.query('SELECT correo_usuario FROM usuario WHERE id_usuario =?', req.user.id, (err, row) => {
        if (err) {
            console.log(err);
            res.end('error');
        } else if (row.length > 0) {
            contenido_correo_usuario = row[0].correo_usuario;
            // creamos un objeto IncomingForm de formidable
            var form = new formidable.IncomingForm();
            // especificamos que queremos permitir al usuario subir varios archivos en un único request
            form.multiples = true;
            form.keepExtensions = true;
            form.maxFileSize = 5120 * 1024 * 1024;
            // guardamos todos los archivos entrantes en la carpeta /uploads
            form.uploadDir = path.join(__dirname, '../public/video/' + contenido_correo_usuario);
            form.on('fileBegin', function (field, file) {

            });
            // cada vez que un archivo haya sido cargado con éxito, lo renombramos con su nombre original
            form.on('file', function (field, file) {
                var nombre_video_usuario = file.name;
                nombre_video_usuario = nombre_video_usuario.replace(/ /g, "_");

                comando.query('SELECT * FROM video_usuario WHERE nombre_video_usuario =? AND id_usuario', [nombre_video_usuario, req.user.id], (err, row) => {
                    if (err) {
                        console.log('ERROR: ' + err);
                    }
                    if (row.length > 0) {
                        fs.unlink(path.join(file.path), function (err) {
                            if (err) {
                                console.log('DELETE-ERROR: ' + err);
                            } else {
                                console.log('DELETE-SUCCESS');
                            }
                        });
                        res.send('exists');

                    } else {
                        var video_usuario = {
                            id_usuario: req.user.id,
                            nombre_video_usuario: nombre_video_usuario
                        }
                        fs.rename(file.path, path.join(form.uploadDir, nombre_video_usuario), function (err) {
                            if (err) {
                                console.log('ERROR: ' + err);
                            } else {
                                comando.query('INSERT INTO video_usuario SET?', video_usuario, (err, result) => {
                                    if (err) {
                                        console.log('ERROR: ' + err);
                                    } else {
                                        res.end('success');
                                    }
                                });
                            }
                        });

                    }
                });
            });

            // logueamos todos los errores que puedan ocurrir
            form.on('error', function (err) {
                console.log('Se ha producido un error: \n' + err);
                res.end('error');

            });

            // una vez que todos los archivos hayan sido subidos, se envía una respuesta al usuario
            form.on('end', function () {

            });

            // parseamos la petición entrante que contiene los datos del formulario
            form.parse(req);
        } else {
            console.log('SIN CORREO');
            res.end('error');
        }
    });

},

verContenido: function(req,res,next){
    
    comando.query('SELECT id_video_usuario,nombre_video_usuario FROM video_usuario WHERE id_usuario =?',req.user.id,(err,row)=>{
       if(err){
           
       } else{
           //res.send(row);
           res.json({
              correo:req.user.correo,
              row:row
        });
       }
    });
},

ultimoContenido: function(req,res,next){
    
    comando.query('SELECT id_video_usuario,nombre_video_usuario FROM video_usuario WHERE id_usuario =? order by id_video_usuario DESC LIMIT 1',req.user.id,(err,row)=>{
       if(err){
           
       } else{
           //res.send(row);
           res.json({
                     correo:req.user.correo,
                     row:row
          });
       }
    });
},
    
eliminarContenido: function(req,res,next){
     var id = req.params.id;
     var nombre = req.body.nombre;
    
     fs.unlink(path.join(__dirname, '../public/video/'+req.user.correo+'/',nombre+'.mp4'),function(err){
                if(err){
                    res.send('error');
                    console.log('DELETE-ERROR: ' + err);
                       }else{
                           console.log('DELETE-SUCCESS');
                           comando.query('DELETE FROM video_usuario WHERE id_video_usuario=?',id,(err,row)=>{
                                   if(err){
                                       console.log('BD-ERROR: ' + err);
                                    } else{
                                        res.send('success');
                                    }
                            });
                       }
            });
    
}    
}