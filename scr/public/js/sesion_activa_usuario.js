var url = window.location.pathname;
$.ajax({
      url: '/sesion_activa_usuario',
      type: 'GET',
      //data: formData,
      //processData: false,
      //contentType: false,
      success: function(data){
             if(data == 'true'){
                 //console.log(data);
                 if(url=='/login_usuario'||url=='/registro'||url=='/'){
                     location.href ='/publicaciones';
                 }
                }else if(url=='/publicaciones'&&data=='false'){
                        location.href ='/';
                         }        
      }
    });