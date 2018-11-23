//verContenido();
function verContenido(){
    $.ajax({
      url: '/ver_contenido',
      type: 'GET',
      //data: formData,
      //processData: false,
      //contentType: false,
      success: function(data){
          //console.log(data);
          //console.log(data[0].id_archivo_general);
          //console.log(data[0].nombre_archivo_general);
          //alert(data);
          var ul = $('#lista_videos');
          data.row.forEach( video => {
             
               var nse = video.nombre_video_usuario.slice(0,-4);
               ul.append('<li id="li'+nse+'"><div id="div" class=""><video src="video/'+data.correo+'/'+video.nombre_video_usuario+'" controls width="150" height="150" class="videohover"></video><div class="cont_btn"><label id="'+video.id_video_usuario+'">'+nse+'</label><span id="'+video.id_video_usuario+'" class="eliminar_contenido  icon-trash-o"></span></div></div></li> ');
             
          });
      }
    });
}

function ultimoContenido(){
    $.ajax({
        url: '/ultimo_contenido',
          type: 'GET',
          //data: formData,
          //processData: false,
          //contentType: false,
          success: function(data){
               var ul = $('#lista_videos');
               data.row.forEach(video => {
               var nse = video.nombre_video_usuario.replace(/_/g," ").slice(0,-4);
               ul.append('<li id="li'+nse+'"><div id="div" class=""><video src="video/'+data.correo+'/'+video.nombre_video_usuario+'" controls width="150" height="150" class="videohover"></video><div class="cont_btn"><label>'+nse+'</label><span id="'+video.id_video_usuario+'" class="eliminar_archivo  icon-trash-o"></span></div></div></li> ');
             });
          }
        });
}