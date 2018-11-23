$('#nombre_usuario').on('keyup',function(){
     if($('#contrasena_usuario').val() === $('#confirmar_contrasena_usuario').val() && $('#contrasena_usuario').val() !='' && $('#confirmar_contrasena_usuario').val() != '' ){
           if($('#nombre_usuario').val() !='' && $('#correo_usuario').val() != ''){
                 $('#btn_agregar_nuevo_usuario').show('slow');
              }else{
                 $('#btn_agregar_nuevo_usuario').hide('slow');
              }
        }else{
            $('#btn_agregar_nuevo_usuario').hide('slow');
        }
});
$('#correo_usuario').on('keyup',function(){
     if($('#contrasena_usuario').val() === $('#confirmar_contrasena_usuario').val() && $('#contrasena_usuario').val() !='' && $('#confirmar_contrasena_usuario').val() != '' ){
           if($('#nombre_usuario').val() !='' && $('#correo_usuario').val() != ''){
                 $('#btn_agregar_nuevo_usuario').show('slow');
              }else{
                 $('#btn_agregar_nuevo_usuario').hide('slow');
              }
        }else{
            $('#btn_agregar_nuevo_usuario').hide('slow');
        }
});

$('#contrasena_usuario').on('keyup',function(){
     if($('#contrasena_usuario').val() === $('#confirmar_contrasena_usuario').val() && $('#contrasena_usuario').val() !='' && $('#confirmar_contrasena_usuario').val() != '' ){
           if($('#nombre_usuario').val() !='' && $('#correo_usuario').val() != ''){
                 $('#btn_agregar_nuevo_usuario').show('slow');
              }else{
                 $('#btn_agregar_nuevo_usuario').hide('slow');
              }
        }else{
            $('#btn_agregar_nuevo_usuario').hide('slow');
        }
});
$('#confirmar_contrasena_usuario').on('keyup',function(){
     if($('#contrasena_usuario').val() === $('#confirmar_contrasena_usuario').val() && $('#contrasena_usuario').val() !='' && $('#confirmar_contrasena_usuario').val() != '' ){
           if($('#nombre_usuario').val() !='' && $('#correo_usuario').val() != ''){
                 $('#btn_agregar_nuevo_usuario').show('slow');
              }else{
                 $('#btn_agregar_nuevo_usuario').hide('slow');
              }
        }else{
            $('#btn_agregar_nuevo_usuario').hide('slow');
        }
});


$('#btn_agregar_nuevo_usuario').on('click', function (){
     if($('#lista_suscripciones').val() != 'Tipo de suscripcion'){      
        $.ajax({
              url: '/agregar_usuario',
              type: 'POST',
              data: {
                    suscripcion:$('#lista_suscripciones').val(),
                    nombre:$('#nombre_usuario').val(),
                    correo:$('#correo_usuario').val(),
                    dispositivos:$('#num_dispositivos_usuario').val(),
                    contrasena:$('#contrasena_usuario').val()},
              success: function(data){
                  if(data == 'success'){
                     alerta('Usuario registrado', 'success');
                     $('#nombre_usuario').val('');
                     $('#correo_usuario').val('');
                     $('#contrasena_usuario').val('');
                     $("#cont_formulario_nuevo_usuario").hide('slow'); 
                     }
                  else if (data == 'error'){
                      alerta('Error al registrar', 'error'); 
              
                     }
                  else if(data == 'exists'){
                      alerta('El correo ya existe', 'info'); 
              
                     }
          
              }
            });
      }else{
          alerta('Selecione un tipo de suscripcion','info');
      }
});