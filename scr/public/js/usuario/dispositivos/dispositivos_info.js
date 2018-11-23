var nombred;

$( document ).ready(function() {
    $('#dispositivos').addClass('active');
    $('#eventos').addClass('seleccionar');
    nombred = $('#txt_nuevo_nombre_dispositivo_info').val();
    
});

var a = $('#cont_alerta').text();
a = a.replace(/\s/g,"");
if(a !== ""){
        
    if(a == 'nombreDS'){
        alerta('Datos actualizados','success');     
    }
    else if(a == 'nombreDE'){
        alerta('Ha ocurrido un error','error'); 
    }
}







var id_dispositivo = $('.id_dispositivo').attr('id');
CoordenadasDispositivo();
//clase seleccionar li
$('#eventos').on('click', function (){
    $('#eventos').addClass('seleccionar');
    $('#ubicacion').removeClass('seleccionar');
    $('#ajustes').removeClass('seleccionar');
});
$('#ajustes').on('click', function (){
    $('#ajustes').addClass('seleccionar');
    $('#ubicacion').removeClass('seleccionar');
    $('#eventos').removeClass('seleccionar');
});
$('#ubicacion').on('click', function (){
    $('#ubicacion').addClass('seleccionar');
    $('#eventos').removeClass('seleccionar');
    $('#ajustes').removeClass('seleccionar');
});
//select eventos
$('#mostrar_eventos').on('change', function (){
    var opcion = $(this).val();
    if(opcion == 'etodos'){
        $('.liconectado').show();
        $('.lireproduccion').show();
        $('.lidesconectado').show();
        $('.livdescargado').show();
        $('.lierrord').show();
        $('.liveliminado').show();
    
    }
    else if(opcion == 'econectado'){
        $('.liconectado').show();
        $('.lireproduccion').hide();
        $('.lidesconectado').hide();
        $('.livdescargado').hide();
        $('.lierrord').hide();
        $('.liveliminado').hide();
    }
    else if(opcion == 'edesconectado'){
        $('.liconectado').hide();
        $('.lireproduccion').hide();
        $('.livdescargado').hide();
        $('.lierrord').hide();
        $('.liveliminado').hide();
        $('.lidesconectado').show();    
    }
    else if(opcion == 'evideoreproducido'){
        $('.liconectado').hide();
        $('.lireproduccion').show();
        $('.lidesconectado').hide();
        $('.livdescargado').hide();
        $('.lierrord').hide();
        $('.liveliminado').hide();
    }
    else if(opcion == 'edescargado'){
        $('.liconectado').hide();
        $('.lireproduccion').hide();
        $('.lidesconectado').hide();
        $('.livdescargado').show();
        $('.lierrord').hide();
        $('.liveliminado').hide();
    }
    else if(opcion == 'eeliminado'){
        $('.liconectado').hide();
        $('.lireproduccion').hide();
        $('.lidesconectado').hide();
        $('.livdescargado').hide();
        $('.lierrord').hide();
        $('.liveliminado').show();
    }
    else if(opcion == 'eerrores'){
        $('.liconectado').hide();
        $('.lireproduccion').hide();
        $('.lidesconectado').hide();
        $('.livdescargado').hide();
        $('.lierrord').show();
        $('.liveliminado').hide();
    }

});
//--------------------
$('#eventos').on('click', function (){
    $('#cont_2_dispositivos_info').show();
});

$('#ubicacion').on('click', function (){
    $('#cont_3_dispositivos_info').show();
});



$('#txt_nuevo_nombre_dispositivo_info').on('keyup',function(){
     if(nombred == $('#txt_nuevo_nombre_dispositivo_info').val()){
            $('#btn_actualizar_nuevo_nombre_dispositivo_info').hide('slow');
        }else{
            $('#btn_actualizar_nuevo_nombre_dispositivo_info').show('slow');
        }
     
});

function CoordenadasDispositivo() {
    $.ajax({
        url: '/coordenada_dispositivo/'+id_dispositivo,
        //type: 'GET',
        //data: formData,
        //processData: false,
        //contentType: false,
        success: function (data) {
            
            if (data == 'false') {
                $('#div_ubicacion_mapa').text('No hay coordenadas');
            } else {
                var map = L.map('div_ubicacion_mapa').setView([data[0].dispositivo_latitud, data[0].dispositivo_longitud, 16], 17);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                let I =  L.marker([data[0].dispositivo_latitud, data[0].dispositivo_longitud, 16]).addTo(map)
                     .bindPopup(data[0].nombre_dispositivo_usuario+'.<br> Esta aqui.')
                     .openPopup();
                /*let F = L.marker([data[1].dispositivo_latitud, data[1].dispositivo_longitud, 16]).addTo(map)
                     .bindPopup(data[0].nombre_dispositivo_usuario+'.<br> Termino aquí.')
                     .openPopup();
                L.Routing.control({
                    waypoints: [
                                 L.latLng([data[0].dispositivo_latitud, data[0].dispositivo_longitud, 16]),
                                 L.latLng([data[1].dispositivo_latitud, data[1].dispositivo_longitud, 16])
                               ]
                }).addTo(map);*/
            }
        }
    });
}



$('#ajustes').on('click', function (){
    $('#cont_actualizar_dispositivos_info').show('slow');
});

$('#btn_cancelar_nuevo_nombre_dispositivo_info').on('click', function (){
    $('#cont_actualizar_dispositivos_info').hide('slow');
});