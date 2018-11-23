var contNuevoUsuario = 0,id_nuevo_usuario;
$( document ).ready(function() {
    $('#solicitudes').addClass('active');
    //$("#cont_alerta").removeClass('correcto').removeClass('error').removeClass('info');
});

var a = $('#cont_alerta').text();
a = a.replace(/\s/g,"");
if(a !== ""){
    if(a == 'solicitudesS'){
        alerta('Datos eliminados','success');     
    }
    else if(a == 'solicitudesE'){
        alerta('Ha ocurrido un error','error'); 
    }
}

$('#btn_nuevo_usuario').on('click', function (){
    $("#cont_alerta").removeClass('correcto').removeClass('error').removeClass('info');
     //contNuevoUsuario++;
    //if(contNuevoUsuario == 1){
       $("#cont_formulario_nuevo_usuario").toggle('slow');
        $('#nombre_usuario').val('');
        $('#correo_usuario').val('');
        $('#contrasena_usuario').val('');
        $('#confirmar_contrasena_usuario').val('');
       //$('#nombre_usuario').focus();    
       //}
    //if(contNuevoUsuario == 2){
        //contNuevoUsuario = 0;
        //$("#cont_formulario_nuevo_usuario").hide('slow');
    //}
     
});

$('.btn_eliminar_solicitud').on('click', function (){
     id_nuevo_usuario = $(this).attr('id');
     $('#cont_3_solicitud').slideDown();
     
});
$('#btn_confirmacion_aceptar_solicitud').on('click', function (){
     //$('#cont_3_solicitud').slideUp();
     location.href="/eliminar_solicitud_usuario/"+id_nuevo_usuario;
     
});
$('#btn_confirmacion_cancelar_solicitud').on('click', function (){
     $('#cont_3_solicitud').slideUp();
     
});

