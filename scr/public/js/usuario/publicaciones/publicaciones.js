$(function () {
const socket = io.connect();
     socket.on('sesion:caducada',(data)=>{
         if(data.sesion == 'sesion'){
             $.ajax({
                 url: '/sesion_activa_usuario',
                 type: 'GET',
                 //data: formData,
                 //processData: false,
                 //contentType: false,
                 success: function (data) {
                     if (data == 'true') {
                        //location.href = '/login_usuario';  
                     }else if(data == 'false'){
                         alert('Tu sesion ha caducado');
                        location.href ='/login_usuario';
                     }   
                 }
             });
             }
     });
});

var id_video_dispositivo_usuario;

$( document ).ready(function() {
    $('#publicaciones').addClass('active');
});

var a = $('#cont_alerta').text();
a = a.replace(/\s/g,"");
if(a !== ""){
        
    if(a == 'publicacionInfoS'){
        alerta('Publicacion exitosa','success');
        
    }
    else if(a == 'publicacionInfoE'){
        alerta('Ha ocurrido un error','error');
        
    }
   
}

$('#btn_publicar_video').on('click', function (){
    if($('#lista_videos_publicar').children().length != 0){
        $('#cont_general_publicar_video').toggle('slow');
    }else{
        alerta('Sube tu primer video en la pestaña contenido','info');
    }
});
 



