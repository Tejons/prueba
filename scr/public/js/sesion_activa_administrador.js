var url = window.location.pathname;
$.ajax({
      url: '/sesion_activa_administrador',
      type: 'GET',
      success: function(data){
             if(data == 'true'){
                 //console.log(data);
                 if(url=='/login_usuario'|| url=='/login_administrador'||url=='/registro'||url=='/'){
                     location.href ='/publicaciones';
                 }
             }else if(url=='/solicitudes'&&data=='false'){
                        location.href ='/';
                         }        
      }
    });