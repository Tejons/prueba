var id_dispositivo_usuario;
var NuevoDispositivo=[];
var publicaciones=[];
var eliminardispositivos=[];
var id_video_usuario;
var textoTXT;
var nombre_video_dispositivo_usuario;



$( document ).ready(function() {
    $('#publicaciones').addClass('active');
    textoTXT = $('#txt_nombre_publicacion_info').val();
});

var a = $('#cont_alerta').text();
a = a.replace(/\s/g,"");
if(a !== ""){
        
    if(a == 'publicacionInfoS'){
        alerta('Dispositivo agregado','success');     
    }
    else if(a == 'publicacionInfoE'){
        alerta('Ha ocurrido un error','error'); 
    }
    else if(a == 'edispositivoPS'){
        alerta('Datos actualizados','success'); 
    }
    else if(a == 'edispositivoPE'){
        alerta('Ha ocurrido un error','error'); 
    }
}


$('#cont_botones_publicaciones_info').on('click', '.eliminar_publicaciones_info', function(){
          nombre_video_dispositivo_usuario = $(this).attr('id');
          $('#cont_general_confirmacion_eliminar_publicacion').slideDown();
});

$('#btn_confirmacion_cancelar_publicacion').on('click', function(){
          $('#cont_general_confirmacion_eliminar_publicacion').slideUp();
});

$('#btn_confirmacion_aceptar_publicacion').on('click', function(){
         eliminarPublicacionInfo(nombre_video_dispositivo_usuario);
});
//agregar dispositivo de la publicacion
$('#btn_nuevo_dispositivo_publicacion').on('click', function(){
    $('#cont_nuevo_dispositivo_publicacion').toggle('slow');
    id_video_usuario = $('.video_publicar_info').attr('id');
});
//eliminar dispositivo de la publicacion
$('#btn_eliminar_dispositivo_publicacion').on('click', function(){
    $('#cont_eliminar_dispositivo_publicacion').toggle('slow');
    id_video_usuario = $('.video_publicar_info').attr('id');
});

$('#txt_nombre_publicacion_info').on('keyup',function(){
     if(textoTXT == $('#txt_nombre_publicacion_info').val()){
            $('#btn_guardar_publicaciones_info').hide('slow');
        }else{
            $('#btn_guardar_publicaciones_info').show('slow');
        }
});

$('#div_nuevo_dispositivo_publicacion').on('click', '.select_nuevo_dispositivo_publicacion', function(){
          id_dispositivo_usuario = $(this).attr('id');
          if(NuevoDispositivo.indexOf(id_dispositivo_usuario.slice(0,-4)) != -1){
              NuevoDispositivo.splice(NuevoDispositivo.indexOf(id_dispositivo_usuario.slice(0,-4)),1);
              $('#'+id_dispositivo_usuario).removeClass('icon-check').addClass('icon-circle-thin');
          }else{
              NuevoDispositivo.push(id_dispositivo_usuario.slice(0,-4));
              $('#'+id_dispositivo_usuario).removeClass('icon-circle-thin').addClass('icon-check');
              $('btn_publicar_video_info_aceptar').show('slow');
          }
          if(NuevoDispositivo.length > 0){
              $('#btn_publicar_video_info_aceptar').show('slow');
          }else{
              $('#btn_publicar_video_info_aceptar').hide('slow');
          }
});
//marcar dispositivos a eliminar
$('#div_eliminar_dispositivo_publicacion').on('click', '.select_eliminar_dispositivo_publicacion', function(){
          id_dispositivo_usuario = $(this).attr('id');
          if(eliminardispositivos.indexOf(id_dispositivo_usuario.slice(0,-4)) != -1){
              eliminardispositivos.splice(eliminardispositivos.indexOf(id_dispositivo_usuario.slice(0,-4)),1);
              $('#'+id_dispositivo_usuario).removeClass('icon-check').addClass('icon-circle-thin');
          }else{
              eliminardispositivos.push(id_dispositivo_usuario.slice(0,-4));
              $('#'+id_dispositivo_usuario).removeClass('icon-circle-thin').addClass('icon-check');
              $('btn_eliminar_video_info_aceptar').show('slow');
          }
          if(eliminardispositivos.length > 0){
              $('#btn_eliminar_video_info_aceptar').show('slow');
          }else{
              $('#btn_eliminar_video_info_aceptar').hide('slow');
          }
});

$(function () {
const socket = io.connect();
$('#btn_publicar_video_info_aceptar').on('click', function(){
    
    publicaciones.push($('#txt_nombre_publicacion_info').val());
    if(NuevoDispositivo.length > 0){
                  
               $.ajax({
                   url: '/publicar_video_dispositivo_usuario',
                   type: 'POST',
                   data: {
                       nombre_publicacion:publicaciones,
                       id_video:id_video_usuario,
                       dispositivos:NuevoDispositivo
                      
                   },
                   success: function(data){
                       if(data.success){
                           $('#cont_nuevo_dispositivo_publicacion').hide('slow');
                           LimpiarCheckBoxDispositivosInfo();
                           $('#div_nuevo_dispositivo_publicacion').append('');
                           //alerta('Publicaación exitosa', 'success');
                           socket.emit('enviar:publicaciones',data.row);
                           location.reload();
                       }
                       else if (data == 'error'){
                           alerta('Error en la publicación', 'error'); 
                          }
                       else if(data == 'exists'){
                           alerta('La publicación ya existe', 'info');              
                          }
          
                   }
               });
          }else{
              $('#cont_general_formulario_publicar_video').slideUp();
              alerta('No seleccionaste ningun dispositivo', 'info'); 
          }
});

$('#btn_eliminar_video_info_aceptar').on('click', function(){
    if(eliminardispositivos.length > 0){
       eliminarDispositivosPublicacionInfo(eliminardispositivos);
    }else{
        alerta('No seleccionaste ningun dispositivo','info');
    }
    
});
$('#btn_publicar_video_info_cancelar').on('click', function(){
        LimpiarCheckBoxDispositivosInfo();
        $('#cont_nuevo_dispositivo_publicacion').hide('slow');
});
//cancelar eliminar dispositivo de publicacion    
$('#btn_eliminar_video_info_cancelar').on('click', function(){
        LimpiarCheckBoxDispositivosInfoE();
        $('#cont_eliminar_dispositivo_publicacion').hide('slow');
});
    
});
function LimpiarCheckBoxDispositivosInfo(){
          for(var i=0; i < NuevoDispositivo.length;i++){
              $('#'+NuevoDispositivo[i]+'publ').removeClass('icon-check').addClass('icon-circle-thin'); 
          }
          NuevoDispositivo.length = 0; 
    
}

function LimpiarCheckBoxDispositivosInfoE(){
          for(var i=0; i < eliminardispositivos.length;i++){
              $('#'+eliminardispositivos[i]+'pube').removeClass('icon-check').addClass('icon-circle-thin'); 
          }
          eliminardispositivos.length = 0; 
    
}

function eliminarDispositivosPublicacionInfo(n) {
                $.ajax({
                    url: '/eliminar_dispositivo_publicacion_info',
                    method: 'POST',
                    data: {dispositivo:n,
                          nombre_publicacion:textoTXT},
                    //error: function() {
    
                    //},
                    success: function(data) {
                        if (data) {
                            location.reload();
                        } else if(data == false) {
                            alerta('Error al intentar eliminar.', 'error');
                            //$("#cont_alerta").show('slow');
                        }
  
                    }
                });
    
            };

function eliminarPublicacionInfo(nombre_video_dispositivo_usuario) {
                $.ajax({
                    url: '/eliminar_publicacion_info/'+nombre_video_dispositivo_usuario,
                    method: 'DELETE',
                    //data: {},
                    //error: function() {
    
                    //},
                    success: function(data) {
                        if (data) {
                            location.href ='/publicaciones';
                            
                        } else if(data == false) {
                            alerta('Error al intentar eliminar la publicación.', 'error');
                            //$("#cont_alerta").show('slow');
                        }
  
                    }
                });
    
            };