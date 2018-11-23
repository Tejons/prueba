//PAGINA PRINCIPAL

$('#cont_boton_menu_principal').on('click', function (){
    $('#cont_menu_principal').slideToggle('slow');
});
$('#cont_boton_menu_AU').on('click', function (){
    $('#cont_menu_AU').toggle('slow');
    $('#sub_menu').hide('slow');
});
$('#usuario').on('click', function (){
    $('#sub_menu').slideToggle();
});

$(window).on('resize', function(){
    if($(this).width() > 820){
        $('#cont_menu_AU').show();
        $('#cont_menu_principal').show();
        
    }
    else if($(this).width() < 820){
        //$('#cont_menu_AU').hide();
        //$('#cont_menu_principal').hide();
        
    }
});

$('#slider')
$('#btn_atras')
$('#btn_adelante')
$('#slider section:last').insertBefore('#slider section:first');
$('#slider').css('margin-left','-'+100+'%');

function moverDerecha(){
    $('#slider').animate({marginLeft:'-'+200+'%'},700,function(){
        $('#slider section:first').insertAfter('#slider section:last');
        $('#slider').css('margin-left','-'+100+'%');
    })
}
function moverIzquierda(){
    $('#slider').animate({marginLeft:0},700,function(){
        $('#slider section:last').insertBefore('#slider section:first');
        $('#slider').css('margin-left','-'+100+'%');
    })
}
$('#btn_atras').on('click', function (){
    moverIzquierda();
});
$('#btn_adelante').on('click', function (){
    moverDerecha();
});

function auto(){
    interval = setInterval(function(){
        moverDerecha();
    },5000);
}
auto();

$('.btn_arriba').on('click', function (){
    $('body,html').animate({
        scrollTop:'0px'
    });
});
$(window).scroll( function (){
    if($(this).scrollTop()>0){
       $('.btn_arriba').slideDown(200);
    }else{
       $('.btn_arriba').slideUp(200); 
    }
});