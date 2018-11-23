var id_usuario_s,correo_usuario_s;
var nombre_dispositivo;
function solicitarIdUsuario(){
    $.ajax({
      url: '/solicitar_id_usuario',
      type: 'GET',
      //data: formData,
      //processData: false,
      //contentType: false,
      success: function(data){
          if(data.length > 0){
            id_usuario_s = data[0].id_usuario;
            correo_usuario_s = data[0].correo_usuario; 
          }
      }
    }); 
}

var fechaActual = new Date();
solicitarIdUsuario();
CalcularHoraDesconexion();

$(function () {
    
    const socket = io.connect();
    
    var codigo_dispositivo_usuario;
    

    socket.emit('dispositivos:conectados',{
       id:id_usuario_s            
    });

      $('body').on('click','.info_dispositivo', function (){
           nombre_dispositivo = $(this).text();

      });
    
      $('body').on('click', '.eliminar_dispositivo', function(){
          codigo_dispositivo_usuario = $(this).attr('id');
          $("#cont_5_dispositivos").slideDown();
        });

      $('#btn_confirmacion_aceptar_dispositivo').on('click', function (){
           socket.emit('eliminar:dispositivo',codigo_dispositivo_usuario,callback =>{
              if(callback){
                  eliminarDispositivo(codigo_dispositivo_usuario);
                  $('#cont_5_dispositivos').slideUp();
                  
              }else{
                  eliminarDispositivo(codigo_dispositivo_usuario);
                   $('#cont_5_dispositivos').slideUp();
              }
           });
           
     
      });
      $('#btn_confirmacion_cancelar_dispositivo').on('click', function (){
           $('#cont_5_dispositivos').slideUp();
     
      });

    
    $('#btn_agregar_dispositivo').on('click', function (){
    
        var codigo =$('#codigo_dis').val();
        if(codigo !='' && $('#nombre_dis').val() !='' ){
        codigo = codigo.toUpperCase();   
        socket.emit('registrar:dispositivo',{id:id_usuario_s,codigo:codigo},callback => { 
        if(callback) {
            
            $.ajax({
                 url: '/registrar_dispositivo',
                 type: 'POST',
                 data: {
                     nombre:$('#nombre_dis').val(),
                     codigo:codigo
                 },
                 success: function(data){
                     if(data == 'exist'){
                         alerta('El codigo ya existe', 'info'); 
                         $('#codigo_dis').val('');
                         $('#codigo_dis').focus();
                     }
                     else if(data.success){
                         //$('#cont_registro_dispositivo').hide('slow');
                         //alerta('Dispositivo agregado', 'success'); 
                         //$("#cont_alerta").show('slow');
                         //$('#nombre_dis').val('');
                         //$('#codigo_dis').val('');
                         //$('#dispositivosRegistrados').text('# '+data.data.length);
                         /*var ultimoRegistro = data.data.length - 1;
                         $('#cont_4_dispositivos').append('<div id="cont_'+data.data[ultimoRegistro].codigo_dispositivo_usuario+'"><div id="cont_dispositivo"><div id="nombre_dispositivo"><span class="icon-tablet"> '+data.data[ultimoRegistro].nombre_dispositivo_usuario+'</span></div><div id="conexion_dispositivos"><div id="iconos_conexion"><div class="iconos_conexion desconectado" id="sincronizacion_dispositivo_'+data.data[ultimoRegistro].codigo_dispositivo_usuario+'"><span class="icon-spinner"></span></div><div class="iconos_conexion desconectado" id="conexion_dispositivo_'+data.data[ultimoRegistro].codigo_dispositivo_usuario+'"><span class="icon-rss"></span></div><div class="iconos_conexion desconectado" id="posicion_dispositivo_'+data.data[ultimoRegistro].codigo_dispositivo_usuario+'"><span class="icon-map-marker"></span></div></div><span class="lbl_ultima_conexion"id="ultima_conexion_'+data.data[ultimoRegistro].codigo_dispositivo_usuario+'"></span><span id="'+data.data[ultimoRegistro].codigo_dispositivo_usuario+'" class="icon-trash-o eliminar_dispositivo"></span></div></div></div>');
                         socket.emit('dispositivos:conectados',{
                             msn:'?'            
                         });*/
                         location.reload();
                     }
                 }
            });
        } else{
            alerta('El dispositivo no está conectado al servidor, reinicie la aplicación', 'info'); 
        }
      });
     }else{
          alerta('Complete los campos', 'info'); 
     }
    }); 
    socket.on('dispositivo:conectado',(data)=>{
        if(id_usuario_s == data.id){
            //$('#sincronizacion_dispositivo_'+data.codigo).removeClass('desconectado').addClass('sincronizado');
            $('#conexion_dispositivo_'+data.codigo).removeClass('desconectado').addClass('conectado');
            $('#posicion_dispositivo_'+data.codigo).removeClass('desconectado').addClass('posicion');
            $('#ultima_conexion_'+data.codigo).text('Conectado');
            SincronizaionDispositivo(data.id,data.codigo);
        }
    });
    socket.on('dispositivo:desconectado',(data)=>{
         $('#sincronizacion_dispositivo_'+data.codigo).removeClass('sincronizado').addClass('desconectado');
         $('#conexion_dispositivo_'+data.codigo).removeClass('conectado').addClass('desconectado');
         $('#posicion_dispositivo_'+data.codigo).removeClass('posicion').addClass('desconectado');
         $('#ultima_conexion_'+data.codigo).text('Desconectado');
            /*$.ajax({
                 url: '/fecha_desconexion_dispositivo',
                 type: 'POST',
                 data: {
                     id:id_usuario_s,
                     codigo:data.codigo
                 },
                 success: function(data){
                     if(data){
                          console.log('fecha');
                        }
                 }
            });*/
       
    });
    
    socket.on('sincronizacion:dispositivo',(data)=>{
        if(id_usuario_s == data.id){
           $('#sincronizacion_dispositivo_'+data.codigo).removeClass('desincronizado').addClass('sincronizado');
        }
    });
    /*socket.on('dispositivo:eliminado',(data)=>{
       if(data){
            console.log('FUERA D-E'); 
       }
    });*/ 
    function eliminarDispositivo(codigo_dispositivo_usuario) {
                $.ajax({
                    url: '/eliminar_dispositivo/'+codigo_dispositivo_usuario,
                    method: 'DELETE',
                    //data: {},
                    //error: function() {
    
                    //},
                    success: function(data) {
                        if (data.success) {
                            alerta('El dispositivo ha sido eliminado.', 'success');
                            $('#dispositivosRegistrados').text('# '+data.row.length);
                            $('#cont_'+codigo_dispositivo_usuario).remove();
                            
                        } else {
                            alerta('Error al intentar eliminar el dispositivo.', 'error');
                            //$("#cont_alerta").show('slow');
                        }
  
                    }
                });
    
            };
    function SolicitudEliminacionDispositivo(codigo_dispositivo_usuario){
        $.ajax({
                 url: '/registrar_solicitud',
                 type: 'POST',
                 data: {
                     solicitud_tipo:'eliminar',
                     solicitud_codigo_dispositivo:codigo_dispositivo_usuario
                 },
                 success: function(data){
                     if(data){
                        
                     }
                     else{
                         
                         
                     }
                 }
            });
    };
   
});
function SincronizaionDispositivo(id,codigo){
    $.ajax({
      url: '/sincronizacion_dispositivo',
      type: 'POST',
      data: {id:id,codigo:codigo},
      success: function(data){
          if(data){
              console.log('sincronizacion usuario');
              $('#sincronizacion_dispositivo_'+codigo).removeClass('desconectado').addClass('desincronizado');
          }else{
              $('#sincronizacion_dispositivo_'+codigo).removeClass('desconectado').addClass('sincronizado');
          }
      }
    }); 
}
function CalcularHoraDesconexion(){
        
    $.ajax({
      url: '/solicitar_fecha_desconexion_dispositivo',
      type: 'GET',
      //data:,
      //processData: false,
      //contentType: false,
      success: function(data){
        for(var i =0;i < data.length;i++){  
        var fechaDesconexion = data[i].fecha_desconexion_dispositivo;
        fechaDesconexion = new Date(fechaDesconexion);
        //console.log(fechaDesconexion.getDay());
         var dia = fechaDesconexion.getDay(),
            fecha = fechaDesconexion.getDate(),
            mes = fechaDesconexion.getMonth(),
            año = fechaDesconexion.getFullYear(),
            hora = fechaDesconexion.getHours(),
            minuto = fechaDesconexion.getMinutes();
        
        var diaA = fechaActual.getDay(),
            fechaA = fechaActual.getDate(),
            mesA = fechaActual.getMonth(),
            añoA = fechaActual.getFullYear(),
            horaA = fechaActual.getHours(),
            minutoA = fechaActual.getMinutes();
            /*console.log(añoA+'-'+año);
            console.log(mesA+'-'+mes);
            console.log(fechaA+'-'+fecha);
            console.log(horaA+'-'+hora);
            console.log(fechaActual+'-'+fechaDesconexion);*/
        if(fechaDesconexion < fechaActual){
            var a = añoA-año;
            if(a == 0){
                var m = mesA-mes;
                 if(m == 0){
                       var f = fechaA-fecha;
                       if(f == 0){
                          var h = horaA-hora;
                          var m = minutoA-minuto;   
                                  if(h == 0){
                                      if(m == 1){
                                          $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+m+' minuto');
                                      }else{
                                      $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+m+' minutos');
                                      }
                                  }
                                  else if(h == 1 && m < 0){
                                       m = m + 60;
                                       $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+m+' minutos');   
                                  }
                                  else if(h == 1 && m == 0){
                    
                                       $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+h+' hora');   
                                  }
                                  else if(h == 1 && m > 0){
                    
                                       $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+h+' hora');   
                                  }
                                  else if(h > 1){
                                       $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+h+' horas');   
                                  }
                                  else if(h < 0){
                                       h = (h*(-1))
                                       $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+h+' horas');   
                                  }
                       }
                       else if(f == 1){
                               $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+f+' dia'); 
                       }
                       else if(f > 1){
                               $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+f+' dias'); 
                       }
                 }
                 else if( m == 1){
                      $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+m+' mes');
                 }
                 else if( m > 1){
                      $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+m+' meses');
                 }
            }
            else if(a == 1){
                $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+a+' año');
            }
            else if(a > 1){
                $('#ultima_conexion_'+data[i].codigo_dispositivo_usuario).text('Ultima conexion hace '+a+' años');
            }  
        }
      }
      }
    }); 
        
        //$('#ultima_conexion_'+codigo).text('');
        

    }
