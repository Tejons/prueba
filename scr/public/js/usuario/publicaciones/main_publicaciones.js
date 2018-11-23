$( document ).ready(function() {
     if($('#lbl_sin_publicaciones').text() == 'No hay publicaciones'){
         $('#cont_nombre_nueva_publicacion').show('slow');
     }else{
         $('#cont_nombre_nueva_publicacion').hide('slow');
     }
});

var id_video_usuario;
var id_dispositivo_usuario;
var dispositivos=[];
var publicaciones=[];
var cont = 0;
var id_usuario_s,correo_usuario_s;
var nombre_publicacion;
function solicitarIdUsuario(){
    $.ajax({
      url: '/solicitar_id_usuario',
      type: 'GET',
      //data: formData,
      //processData: false,
      //contentType: false,
      success: function(data){
        if(data == 'false'){
           id_usuario_s = 'caducada';
        }else{  
          id_usuario_s = data[0].id_usuario;
          correo_usuario_s = data[0].correo_usuario;
        }
      }
    }); 
}

solicitarIdUsuario();
$(function () {
const socket = io.connect();

    socket.on('verificar:sesion',(data)=>{
        

    });
    /*var URLProtocolo = window.location.protocol;
    var URLDominio = window.location.host;
    var URLdescarga = URLProtocolo+'//'+URLDominio+'/video/';
    socket.emit('url',{url:URLdescarga,correo:correo_usuario_s+'/'});*/

$('#cont_general_publicar_video').on('click', '.publicar_video', function(){
          id_video_usuario = $(this).attr('id');
          $('#cont_general_formulario_publicar_video').slideDown();
});
    
$('.lbl_nombre_nueva_publicacion').on('click', function(){
          $('#cont_nombre_nueva_publicacion').toggle('slow');
          $('#txt_nombre_publicacion').focus();
});
    
$('#btn_publicar_video_aceptar').on('click', function(){
          if($('#txt_nombre_publicacion').val() || publicaciones.length > 0){
              if($('#txt_nombre_publicacion').val() != ''){
                   publicaciones.push($('#txt_nombre_publicacion').val());
              }
              if(dispositivos.length > 0){
                  
               $.ajax({
                   url: '/publicar_video_dispositivo_usuario',
                   type: 'POST',
                   data: {
                       nombre_publicacion:publicaciones,
                       id_video:id_video_usuario,
                       dispositivos:dispositivos
                   },
                   success: function(data){
                       if(data.success){
                           LimpiarCheckBoxDispositivos();
                           $('#cont_general_formulario_publicar_video').slideUp();
                           socket.emit('enviar:publicaciones',data.row);
                           location.reload();
                       }
                       else if (data == 'error'){
                           $('#cont_general_formulario_publicar_video').slideUp();
                           alerta('Error en la publicación', 'error'); 
                          }
                       else if(data == 'exists'){
                           $('#cont_general_formulario_publicar_video').slideUp();
                           alerta('La publicación ya existe', 'info');              
                          }
          
                   }
               });
          }else{
              $('#cont_general_formulario_publicar_video').slideUp();
              alerta('No seleccionaste ningun dispositivo', 'info'); 
          }
          }else{
               $('#cont_general_formulario_publicar_video').slideUp();
               alerta('Es necesario nombre de la publicación', 'info'); 
          }
          
});

$('#btn_publicar_video_cancelar').on('click', function(){
          LimpiarCheckBoxDispositivos();
});

$('#formulario_publicar_video').on('click', '.select_dispositivo', function(){
          id_dispositivo_usuario = $(this).attr('id');
          if(dispositivos.indexOf(id_dispositivo_usuario.slice(0,-4)) != -1){
              dispositivos.splice(dispositivos.indexOf(id_dispositivo_usuario.slice(0,-4)),1);
              $('#'+id_dispositivo_usuario).removeClass('icon-check').addClass('icon-circle-thin');
          }else{
              dispositivos.push(id_dispositivo_usuario.slice(0,-4));
              $('#'+id_dispositivo_usuario).removeClass('icon-circle-thin').addClass('icon-check'); 
          }
});

$('#formulario_publicar_video').on('click', '.select_publicacion', function(){
          nombre_publicacion = $(this).attr('id');
          if(publicaciones.indexOf(nombre_publicacion.slice(0,-4)) != -1){
              publicaciones.splice(publicaciones.indexOf(nombre_publicacion.slice(0,-4)),1);
              $('#'+nombre_publicacion).removeClass('icon-check').addClass('icon-square-o');
          }else{
              publicaciones.push(nombre_publicacion.slice(0,-4));
              $('#'+nombre_publicacion).removeClass('icon-square-o').addClass('icon-check'); 
          }
});    

function LimpiarCheckBoxDispositivos(){
          for(var i=0; i < dispositivos.length;i++){
              $('#'+dispositivos[i]+'disp').removeClass('icon-check').addClass('icon-circle-thin'); 
          }
          dispositivos.length = 0;   
          $('#cont_general_formulario_publicar_video').slideUp();

    
}
});    