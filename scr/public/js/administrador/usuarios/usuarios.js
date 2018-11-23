var id_usuario;
var correo_usuario;
$( document ).ready(function() {
    $('#usuarios').addClass('active');
});

var a = $('#cont_alerta').text();
a = a.replace(/\s/g,"");
if(a !== ""){
    if(a == 'eusuarioS'){
        alerta('Datos actualizados','success');     
    }
    else if(a == 'eusuarioE'){
        alerta('Ha ocurrido un error','error'); 
    }
}
$('.btn_eliminar_usuario').on('click', function (){
     id_usuario = $(this).attr('id');
     correo_usuario = $('#td'+id_usuario).text();
     $('#cont_1_usuarios').slideDown();
     
});

$('#btn_confirmacion_aceptar_usuario').on('click', function (){
     eliminarUsuario(id_usuario);
     $('#cont_1_usuarios').slideUp();
     
});
$('#btn_confirmacion_cancelar_usuario').on('click', function (){
     $('#cont_1_usuarios').slideUp();
     
});

$('#tabla_usuarios').on('click', '.filas', function(){
    var id_fila = $(this).attr('id');
    id_fila = id_fila.substr(2);
  });
/*$('body').on('click', '.btn_eliminar_usuario', function(){
    alert('holo');
  });*/

$('#txt_buscar_usuario').on('keyup', function (){
    if($('#txt_buscar_usuario').val() != ''){
       buscarRegistro($('#txt_buscar_usuario').val());
    }else{
        $('.filasB').remove();
        $('.filas').show();
    }
     
});





function buscarRegistro(registro) {
    $.ajax({
      url: '/buscar_registro',
      type: 'POST',
      data: {
          registro:registro
      },
      //processData: false,
      //contentType: false,
      success: function(data){
          var tabla = $('#tabla_usuarios');
          if(data.length > 0){
             $('.filas').hide();
              data.forEach(registro=>{
                  //$('#tr'+registro.id_usuario).addClass('registro');
                  $('.filasB').remove();
                  tabla.append('<tr id="tr'+registro.id_usuario+'" class="filasB"> <td class="sub_th"><strong>N° </strong>'+data.length+'</td><td id="td_n">'+data.length+'</td><th class="sub_th">Nombre</th><td>'+registro.nombre_usuario+'</td><th class="sub_th">Correo</th><td id="td'+registro.id_usuario+'">'+registro.correo_usuario+'</td><th class="sub_th">Fecha de registro</th><td>'+registro.fecha_creacion_usuario+'</td><th class="sub_th">Validación</th><td class="tdcentrado">'+registro.validacion_usuario+'</td><td><button type="button" class="btn_eliminar_usuario" id="'+registro.id_usuario+'">Eliminar</button></td></tr>');
                  $('#tr'+registro.id_usuario).addClass('registro');
              });
          }else{
              
          }
         
      }
    });

};
function eliminarUsuario(id_usuario) {
    $.ajax({
        url: '/eliminar_usuario/' + id_usuario,
        method: 'DELETE',
        data: {
            correo: correo_usuario
        },
        error: function () {

        },
        success: function (respuesta) {
            if (respuesta == 'success') {
                alerta('Usuario eliminado correctamente', 'success');
                $('#tr' + id_usuario).remove();
            } else if (respuesta == 'errorA') {
                alerta('Error al eliminar el usuario', 'info');
            } else if (respuesta == 'errorC') {
                alerta('Error al eliminar el usuario', 'info');
            }

        }
    });

};