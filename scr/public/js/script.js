var expresion = /\w+@\w+\.+[a-z]/, 
   numeros =  /[0-9]/, 
   letras = /^[A-Za-z\s]+$/g;
 
$('#entrar').on('click',function(e){
     /*e.preventDefault();
     var n = $('#txt_nombre_cliente').val();
     var c = $('#txt_correo_cliente').val();
     var nu = $('#txt_telefono_cliente').val();
     ValidarCajaTextoCorreo(c);
     ValidarCajaTextoLetras(n);
     ValidarCajaTextoNumeros(nu);*/
});

/*txt_nombre_cliente
txt_correo_cliente
txt_telefono_cliente*/


function ValidarCajaTextoCorreo(caja) {
    if (!expresion.test(caja)) {
        console.log('no correo')
    } else {
        console.log('si correo')
    }
}
function ValidarCajaTextoLetras(caja){
    if(!letras.test(caja)){
         console.log('no letras')
    }else{
        console.log('si letras')
    }
 }
function ValidarCajaTextoNumeros(caja){
    if(!numeros.test(caja)){
         console.log('no numeros')
    }else{
        if(caja.length ==10){
           console.log('si numeros');
        }else{
            console.log('Introduce 10 digitos')
        }
    }
 }
function CaracteresNombre(){}
function CaracteresContrasena(){}
function Caracteres(){}