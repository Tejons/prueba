var id,nombre;
//function btn_eliminar(){
$('body').on('click', '.eliminar_contenido', function(){
    id = $(this).attr('id');
    nombre = $('#'+id).text();
    nombre = nombre.replace(/ /g,"_");
    $('#cont_5_contenido').slideDown();
    //eliminarContenido(id,nombre);
  });
//}
$('#btn_confirmacion_aceptar_contenido').on('click', function (){
    eliminarContenido(id,nombre);    
});
$('#btn_confirmacion_cancelar_contenido').on('click', function (){
     $('#cont_5_contenido').slideUp();    
});


function eliminarContenido(id,nombre) {
    $("#cont_alerta").hide('slow');
                $.ajax({
                    url: '/eliminar_contenido/'+id,
                    method: 'DELETE',
                    //timeout: 10000,
                    data: {nombre:nombre},
                    success: function(respuesta) {
                        //nombre = "#"+nombre;
                        if (respuesta == 'success') {
                            $('#cont_5_contenido').slideUp();
                            alerta('El video ha sido eliminado.', 'success');
                            //$("#cont_alerta").show('slow');
                            $('#li'+nombre).remove();
                        } else if(respuesta == 'error') {
                            $('#cont_5_contenido').slideUp();
                            alerta('Error al intentar eliminar el video.', 'error');
                            //$("#cont_alerta").show('slow');
                        }
                
                       	//mostrarElementos();
                    }
                });
    
            };