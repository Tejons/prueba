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
    $('#dispositivos').addClass('active');
     $("#cont_alerta").removeClass('correcto').removeClass('error').removeClass('info');
});
$('#btn_nuevo_dispositivo').on('click', function (){
    NumeroDispositivosDisponibles();
});


function NumeroDispositivosDisponibles(){
    $.ajax({
      url: '/solicitar_dispositivos_disponibles_usuario',
      type: 'GET',
      //data: formData,
      //processData: false,
      //contentType: false,
      success: function(data){
          if(data){
             $('#cont_registro_dispositivo').toggle('slow');
             $('#nombre_dis').val('');
             $('#codigo_dis').val('');
             $('#nombre_dis').focus();
          }else{
             alerta('Has sobrepasado el limite de tus dispositivos disponibles','info');
          }
          
      }
    }); 
}
$('#txt_buscar_dispositivo').on('keyup', function (){
    if($('#txt_buscar_dispositivo').val() != ''){
       BuscarDispositivo($('#txt_buscar_dispositivo').val());
    }else{
        $('.dispositivos_totales').show();
    }
     
});
function BuscarDispositivo(nombre){
    $.ajax({
      url: '/buscar_dispositivo/'+nombre,
      type: 'GET',
      //data: formData,
      //processData: false,
      //contentType: false,
      success: function(data){
          if(data.length > 0){
              //$('#cont_'+<%=data[i].codigo_dispositivo_usuario%>+'')
              var contDisp = $('#cont_4_dispositivos');
              $('.dispositivos_totales').hide();
              data.forEach(dispositivo=>{
                  $('#cont_'+dispositivo.codigo_dispositivo_usuario).show();
                  
              });
          }else{
             
          }
          
      }
    }); 
}