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


var usuario,correo;
var mail = /\w+@\w+\.+[a-z]/, 
        numeros =  /[0-9]/, 
        letras = /^[A-Za-z\s]+$/g,
        numerosletras = /^[A-Za-z0-9\s]+$/;

usuario = $('#txt_cuenta_nombre').val();
correo = $('#txt_cuenta_correo').val();

var a = $('#cont_alerta').text();
a = a.replace(/\s/g,"");
if(a !== ""){
    if(a =='success'){
        alerta('Datos actualizados', a);
    }
    else if(a == 'info' ){
        alerta('La contraseña actual es incorrecta', a);
    }
    else if(a == 'error'){
        alerta('Error al editar los datos', a);
    }else if(a == 'errorU'){
        alerta('Hubo un problema al eliminar la cuenta','error');     
    }else if(a == 'passwI'){
        alerta('La contraseña actual no coincide','info');     
    }else if(a == 'passwS'){
        alerta('Datos actualizados','success');     
    }
    else if(a == 'userS'){
        alerta('Datos actualizados','success');     
    }
    else if(a == 'userE'){
        alerta('Ha ocurrido un error','error');     
    }
    else if(a == 'facturaS'){
        alerta('Datos agregados','success');     
    }
    else if(a == 'facturaE'){
        alerta('Ha ocurrido un error','error');     
    }else if(a == 'nombreDS'){
        alerta('Datos actualizados','success');     
    }
    else if(a == 'nombreDE'){
        alerta('Ha ocurrido un error','error'); 
    }
}

$('#cuenta').addClass('seleccionar');

$('#cuenta').on('click', function (){
    $('#panel_cuenta').show();
    $('#panel_suscripcion').hide();
    $('#panel_reportes_generados').hide();
    $('#cuenta').addClass('seleccionar');
    $('#suscripcion').removeClass('seleccionar');
    $('#reportes_generados').removeClass('seleccionar');
});

$('#suscripcion').on('click', function (){
    $('#panel_suscripcion').show();
    $('#panel_cuenta').hide();
    $('#panel_reportes_generados').hide();
    $('#suscripcion').addClass('seleccionar');
    $('#cuenta').removeClass('seleccionar');
    $('#reportes_generados').removeClass('seleccionar');
});

$('#reportes_generados').on('click', function (){
    $('#panel_reportes_generados').show();
    $('#panel_cuenta').hide();
    $('#panel_suscripcion').hide();
    $('#reportes_generados').addClass('seleccionar');
    $('#suscripcion').removeClass('seleccionar');
    $('#cuenta').removeClass('seleccionar');
});

$('#txt_cuenta_nombre').on('keyup',function(){
    if(usuario == $('#txt_cuenta_nombre').val()){
            $('#btn_actualizar_perfil_usuario').hide('slow');
        }else{
            $('#btn_actualizar_perfil_usuario').show('slow');
        }
     
});
$('#txt_cuenta_correo').on('keyup',function(){
    if(correo == $('#txt_cuenta_correo').val()){
            $('#btn_actualizar_perfil_usuario').hide('slow');
        }else{
            $('#btn_actualizar_perfil_usuario').show('slow');
        }
     
     
});

$('#btn_eliminar_perfil_usuario').on('click', function (){
    $('#cont_2_perfil_usuario').slideDown();
});


$('#btn_confirmacion_cancelar_eliminar_cuenta').on('click', function (){
    $('#cont_2_perfil_usuario').slideUp();
});

$('#txt_cuenta_contrasena').on('click',function(){
     $('#cont_nueva_contrasena_perfil_usuario').slideDown();
     $('#txt_contrasena').focus();
});

$('#btn_confirmacion_cancelar_nueva_contrasena_perfil_usuario').on('click',function(e){
     //e.preventDefault();
     $('#cont_nueva_contrasena_perfil_usuario').slideUp();
});
//comprar contraseñas
//txt_nueva_contrasena
$('#txt_nueva_contrasena').on('keyup',function(){
     if($('#txt_nueva_contrasena').val() === $('#txt_conf_contrasena').val() ){
           $('#btn_confirmacion_aceptar_nueva_contrasena_perfil_usuario').show('slow');
        }else{
            $('#btn_confirmacion_aceptar_nueva_contrasena_perfil_usuario').hide('slow');
        }
});
$('#txt_conf_contrasena').on('keyup',function(){
     if($('#txt_nueva_contrasena').val() === $('#txt_conf_contrasena').val() ){
           $('#btn_confirmacion_aceptar_nueva_contrasena_perfil_usuario').show('slow');
        }else{
            $('#btn_confirmacion_aceptar_nueva_contrasena_perfil_usuario').hide('slow');
        }
});

//formulario facturar

$('#btn_facturar').on('click',function(){
     $('#cont_factura_cuenta').slideDown();
     $('#txt_contrasena').focus();
});
$('#btn_confirmacion_cencelar_factura_cuenta').on('click',function(){
     $('#cont_factura_cuenta').slideUp();
});
$('#btn_confirmacion_cencelar_factura_cuenta_update').on('click',function(){
     $('#cont_factura_cuenta_update').slideUp();
});
$('#btn_editar_datos_facturacion').on('click',function(){
     $('#cont_factura_cuenta_update').slideDown();
     $('#txt_contrasena').focus();
});

//validar datos del formulario factura
$('#txt_nombre_compania_factura').on('keyup',function(){
     if($('#txt_nombre_compania_factura').val().length > 150){
          alert('El nombre sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_nombre_compania_factura').val())){
           var n = $('#txt_nombre_compania_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_nombre_compania_factura').val(n);
           alert('Caracteres no permitidos');
     }
});

$('#txt_impuesto_factura').on('keyup',function(){
     if($('#txt_impuesto_factura').val().length > 50){
          alert('El impuesto sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!letras.test($('#txt_impuesto_factura').val())){
           var n = $('#txt_impuesto_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_impuesto_factura').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_telefono_factura').on('keyup',function(){
     if($('#txt_telefono_factura').val().length > 10){
          alert('El telefono sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numeros.test($('#txt_telefono_factura').val())){
           var n = $('#txt_telefono_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_telefono_factura').val(n);
           alert('Solo se aceptan numeros');
     }
});
//---------------------------------------------------

$('#txt_calle_factura').on('keyup',function(){
     if($('#txt_calle_factura').val().length > 150){
          alert('La calle sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_calle_factura').val())){
           var n = $('#txt_calle_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_calle_factura').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_numero_factura').on('keyup',function(){
     if($('#txt_numero_factura').val().length > 150){
          alert('El numero sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_numero_factura').val())){
           var n = $('#txt_numero_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_numero_factura').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_colonia_factura').on('keyup',function(){
     if($('#txt_colonia_factura').val().length > 150){
          alert('La colonia sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_colonia_factura').val())){
           var n = $('#txt_colonia_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_colonia_factura').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_ciudad_factura').on('keyup',function(){
     if($('#txt_ciudad_factura').val().length > 100){
          alert('La cuidad sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_ciudad_factura').val())){
           var n = $('#txt_ciudad_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_ciudad_factura').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_estado_factura').on('keyup',function(){
     if($('#txt_estado_factura').val().length > 10){
          alert('El estado/provincia sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_estado_factura').val())){
           var n = $('#txt_estado_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_estado_factura').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_codigo_postal_factura').on('keyup',function(){
     if($('#txt_codigo_postal_factura').val().length > 15){
          alert('El telefono sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_codigo_postal_factura').val())){
           var n = $('#txt_codigo_postal_factura').val();
           n = n.substr(0,n.length-1);
           $('#txt_codigo_postal_factura').val(n);
           alert('Caracteres no permitidos');
     }
});
//formulario factura update

$('#txt_nombre_compania_factura_update').on('keyup',function(){
     if($('#txt_nombre_compania_factura_update').val().length > 150){
          alert('El nombre sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_nombre_compania_factura_update').val())){
           var n = $('#txt_nombre_compania_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_nombre_compania_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});

$('#txt_impuesto_factura_update').on('keyup',function(){
     if($('#txt_impuesto_factura_update').val().length > 50){
          alert('El impuesto sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!letras.test($('#txt_impuesto_factura_update').val())){
           var n = $('#txt_impuesto_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_impuesto_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_telefono_factura_update').on('keyup',function(){
     if($('#txt_telefono_factura_update').val().length > 10){
          alert('El telefono sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numeros.test($('#txt_telefono_factura_update').val())){
           var n = $('#txt_telefono_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_telefono_factura_update').val(n);
           alert('Solo se aceptan numeros');
     }
});
//---------------------------------------------------

$('#txt_calle_factura_update').on('keyup',function(){
     if($('#txt_calle_factura_update').val().length > 150){
          alert('La calle sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_calle_factura_update').val())){
           var n = $('#txt_calle_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_calle_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_numero_factura_update').on('keyup',function(){
     if($('#txt_numero_factura_update').val().length > 150){
          alert('El numero sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_numero_factura_update').val())){
           var n = $('#txt_numero_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_numero_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_colonia_factura_update').on('keyup',function(){
     if($('#txt_colonia_factura_update').val().length > 150){
          alert('La colonia sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_colonia_factura_update').val())){
           var n = $('#txt_colonia_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_colonia_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_ciudad_factura_update').on('keyup',function(){
     if($('#txt_ciudad_factura_update').val().length > 100){
          alert('La cuidad sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_ciudad_factura_update').val())){
           var n = $('#txt_ciudad_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_ciudad_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_estado_factura_update').on('keyup',function(){
     if($('#txt_estado_factura_update').val().length > 10){
          alert('El estado/provincia sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_estado_factura_update').val())){
           var n = $('#txt_estado_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_estado_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});
$('#txt_codigo_postal_factura_update').on('keyup',function(){
     if($('#txt_codigo_postal_factura_update').val().length > 15){
          alert('El telefono sobrepasa los caracteres permitidos, por favor reduzcalo');
     }else if(!numerosletras.test($('#txt_codigo_postal_factura_update').val())){
           var n = $('#txt_codigo_postal_factura_update').val();
           n = n.substr(0,n.length-1);
           $('#txt_codigo_postal_factura_update').val(n);
           alert('Caracteres no permitidos');
     }
});















