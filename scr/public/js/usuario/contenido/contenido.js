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

$( document ).ready(function() {
    $('#contenido').addClass('active');
    $("#cont_alerta").removeClass('correcto').removeClass('error').removeClass('info');
});

$('#btn_subir_archivo').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){
    var file = $(this).get(0).files;
    if (file.length > 1){
       alerta('Se seleccionaron mas de un archivo', 'info'); 
       //$("#cont_alerta").show('slow');
       }else if(file.length > 0 && file.length < 2){
           if(file[0].type=="video/mp4"){
            // añadimos los archivos al objeto formData
              var formData = new FormData();
              formData.append('uploads[]', file[0], file[0].name);
           }else{
               alerta('Su archivo no tiene formato mp4', 'info'); 
               //$("#cont_alerta").show('slow');
               return;
               }
            $.ajax({
      url: '/subir_contenido',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          if(data == 'success'){
              
             alerta('Archivo cargado con éxito', 'success'); 
              //$("#cont_alerta").show('slow');
              $('.progress-bar').text('0%');
              $('.progress-bar').width('0%');
              //$('#lista_videos').empty();
              ultimoContenido();
             }
          else if (data == 'error'){
              alerta('Error en la carga intentelo de nuevo', 'error'); 
              //$("#cont_alerta").show('slow');
              $('.progress-bar').text('0%');
              $('.progress-bar').width('0%');
              
             }
          else if(data == 'exists'){
               console.log(data);
              alerta('El nombre del video ya existe', 'info'); 
              //$("#cont_alerta").show('slow');
              $('.progress-bar').text('0%');
              $('.progress-bar').width('0%');
              //location.reload();
              
             }
          
      },
      xhr: function() {
        // creamos un objeto XMLHttpRequest
        var xhr = new XMLHttpRequest();
 
        // gestionamos el evento 'progress'
        xhr.upload.addEventListener('progress', function(evt) {
 
          if (evt.lengthComputable) {
            // calculamos el porcentaje completado de la carga de archivos
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
 
            // actualizamos la barra de progreso con el nuevo porcentaje
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');
 
            // una vez que la carga llegue al 100%, ponemos la progress bar como Finalizado
            if (percentComplete === 100) {
              $('.progress-bar').html('Finalizado');
                
            }
          }
        }, false);
 
        return xhr;
      }
    });
  }else{
      
  }
});
            