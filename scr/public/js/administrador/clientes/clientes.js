$( document ).ready(function() {
    $('#clientes').addClass('active');
});

var a = $('#cont_alerta').text();
a = a.replace(/\s/g,"");
if(a !== ""){
     
    if(a == 'clienteS'){
        alerta('Solicitud eliminada','success');     
    }
    else if(a == 'clienteE'){
        alerta('Ha ocurrido un error','error');     
    }
}