$( document ).ready(function() {
    $('#suscripcion').addClass('active');
    //$("#cont_alerta").removeClass('correcto').removeClass('error').removeClass('info');
});

var a = $('#cont_alerta').text();btn_nueva_suscripcion
a = a.replace(/\s/g,"");
console.log(a);
if(a !== ""){
    if(a =='suscripcionS'){
        alerta('Nueva suscripción agregada','success');
    }
    else if(a == 'suscripcionE' ){
        alerta('Error al registrar la nueva suscripción','error');
    }
    else if(a == 'esuscripcionE' ){
        alerta('Error al editar los datos','error');
    }
    else if(a == 'esuscripcionS' ){
        alerta('Datos actualizados','success');
    }
}


$('#btn_nueva_suscripcion').on('click', function (){
       $("#cont_form_nueva_suscripcion").toggle('slow');
});


$('#cont_suscripciones').on('click', '.btn_update', function(){
    var id = $(this).attr('id');
    
    $.ajax({
      url: '/editar_suscripcion/'+id,
      type: 'GET',
      success: function(data){
          console.log(data[0].tipo_suscripcion);
          if(data == 'error'){
             
          }else{
              $('#form_update_suscripcion').attr('action','/editar_suscripcion/'+data[0].id_suscripcion);
              $('#txt_tipo_suscripcion_update').val(data[0].tipo_suscripcion);
              $('#txt_precio_suscripcion_update').val(data[0].precio_suscripcion);
              $('#cont_4_suscripcion_update').slideDown();
          }
      }
    });
  });

$('#btn_cancelar_editar_suscripcion').on('click', function (){
       $('#cont_4_suscripcion_update').slideUp();
});