function alerta(mensaje,ok){
    $("#cont_alerta").hide();
    $("#cont_alerta").removeClass('correcto').removeClass('error').removeClass('info').html(mensaje);
                if(ok=='success'){   
                    $("#cont_alerta").addClass('correcto'); 
                    $("#cont_alerta").show('slow');
                    var timer = setInterval(function(){
                            $("#cont_alerta").hide('slow');
                            clearInterval(timer);
                    },5000);
                }else if(ok=='error'){
                    $("#cont_alerta").addClass('error');
                    $("#cont_alerta").show('slow');
                    var timer = setInterval(function(){
                            $("#cont_alerta").hide('slow');
                            clearInterval(timer);
                    },5000);
                }else if(ok=='info'){
                    $("#cont_alerta").addClass('info');
                    $("#cont_alerta").show('slow');
                    var timer = setInterval(function(){
                            $("#cont_alerta").hide('slow');
                            clearInterval(timer);
                    },5000);
                }
}

