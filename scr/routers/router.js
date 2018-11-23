const express = require('express');
const router = express.Router();
const passport = require('passport');
var controllers = require('../controladores');
var middleware = require('../middleware/loggeado');

//---------RAIZ-------------------------------------------------------
router.get('/',middleware.isnotLogged,controllers.pag_principal.index);
//--------REGISTRO CLINTE---------------------------------------------
router.get('/cliente',controllers.cliente_controller.getEnvioSolicitudRegistro);
router.get('/registro',controllers.cliente_controller.getEnvioSolicitudCliente);
router.post('/registro_nuevo_usuario',controllers.cliente_controller.registrarNuevoUsuario);
router.post('/registro_cliente',controllers.cliente_controller.registrarCliente);
router.get('/registro_exitoso',controllers.pag_registro_exitoso.index );
router.get('/restablecer_contrasena',controllers.cliente_controller.restablecerContrasenaGet );
router.post('/restablecer_contrasena',controllers.cliente_controller.restablecerContrasena );
router.get('/validacion_correo/:correo',controllers.cliente_controller.validacionCorreo );

//--------LOGIN ADMINISTRADOR-----------------------------------------------
router.get('/login_administrador',middleware.isnotLoggedAdministrador,controllers.administrador_controller.getLoginAdministrador);
//--------SESION USUARIO ADMINISTRADOR---------------------------------------
router.post('/iniciar_sesion_administrador', passport.authenticate('validar-administrador',{
    successRedirect : '/solicitudes',
    failureRedirect : '/login_administrador',
    failureFlash: true
}));
//--------SESION ACTIVA ADMINISTRADOR-----------------------------------------
router.get('/sesion_activa_administrador',controllers.administrador_controller.sesionActivaAdministrador);
//--------ADMINISTRADOR-------------------------------------------------------
router.get('/solicitudes',middleware.isLoggedAdministrador,controllers.administrador_controller.getSolicitudes);
router.get('/clientes',middleware.isLoggedAdministrador,controllers.administrador_controller.getClientes);
router.get('/usuarios',middleware.isLoggedAdministrador,controllers.administrador_controller.getUsuarios);
router.get('/suscripcion',middleware.isLoggedAdministrador,controllers.administrador_controller.getSuscripcion);
//--------SALIR ADMINISTRADOR--------------------------------------------------
router.get('/salir_administrador',controllers.administrador_controller.salirAdministrador);

//---------PETICIONES POST ADMINISTRADOR-----------------------------------
router.post('/agregar_usuario',controllers.administrador_controller.registrarUsuarios);
router.get('/editar_usuario/:id',controllers.administrador_controller.getEditarUsuario);
router.post('/editar_usuario/:id',controllers.administrador_controller.editarUsuario);
router.delete('/eliminar_usuario/:id_usuario',controllers.administrador_controller.eliminarUsuario);
router.post('/registrar_suscripcion',controllers.administrador_controller.registrarSuscripcion);
router.get('/editar_suscripcion/:id',controllers.administrador_controller.editarSuscripcionDatos);
router.post('/editar_suscripcion/:id',controllers.administrador_controller.editarSuscripcionNuevos);
router.get('/eliminar_solicitud_usuario/:id',controllers.administrador_controller.eliminarSolicitudUsuario);
router.get('/eliminar_solicitud_cliente/:id',controllers.administrador_controller.eliminarCliente);


router.post('/buscar_registro',controllers.administrador_controller.buscarRegistro);
//--------LOGIN USUARIO---------------------------------------
router.get('/login_usuario',middleware.isnotLoggedUsuario,controllers.usuario_controller.getLoginUsuario);
//--------SESION USUARIO ADMIN---------------------------------------
router.post('/iniciar_sesion_usuario', passport.authenticate('validar-usuario',{
    successRedirect : '/publicaciones',
    failureRedirect : '/login_usuario',
    failureFlash: true
}));
//----------SESION ACTIVA USUARIO------------------------------
router.get('/sesion_activa_usuario',controllers.usuario_controller.sesionActivaUsuario);
//----------USUARIO--------------------------------------------
router.get('/publicaciones',middleware.isLoggedUsuario,controllers.pag_usuario.index);
router.get('/publicaciones/info/:nombre_video_dispositivo_usuario',middleware.isLoggedUsuario,controllers.usuario_controller.getPublicacionInfo);
router.get('/dispositivos/info/:id',middleware.isLoggedUsuario,controllers.usuario_controller.getDispositivosInfo);
router.get('/contenido',middleware.isLoggedUsuario,controllers.usuario_controller.getContenidoUsuario);
router.get('/dispositivos',middleware.isLoggedUsuario,controllers.usuario_controller.getDispositivoUsuario);
router.get('/perfil',middleware.isLoggedUsuario,controllers.usuario_controller.getPerfilUsuario);
router.get('/factura',middleware.isLoggedUsuario,controllers.usuario_controller.getFactura);
//---------SALIR USUARIO-----------------------------------------
router.get('/salir_usuario',controllers.usuario_controller.salir_usuario);




//---------PETICIONES POST USUARIO-----------------------------------
router.post('/subir_contenido',controllers.contenido_controller.subirContenido);
router.get('/ver_contenido',controllers.contenido_controller.verContenido);
router.get('/ultimo_contenido',controllers.contenido_controller.ultimoContenido);
router.get('/solicitar_id_usuario',controllers.usuario_controller.solicitarIdUsuario);
router.get('/solicitar_fecha_desconexion_dispositivo',controllers.usuario_controller.solicitarFechaDesconexionDispositivo);
router.post('/sincronizacion_dispositivo',controllers.usuario_controller.sincronizacionDispositivo);
router.delete('/eliminar_contenido/:id',controllers.contenido_controller.eliminarContenido);
router.delete('/eliminar_dispositivo/:codigo_dispositivo_usuario',controllers.dispositivo_controller.eliminarDispositivo);
router.post('/registrar_dispositivo',controllers.dispositivo_controller.registrarDispositivo);
//router.post('/fecha_desconexion_dispositivo',controllers.usuario_controller.fechaDesconexionDispositivo);
router.post('/publicar_video_dispositivo_usuario',controllers.usuario_controller.PublicarVideoDispositivoUsuario);
router.delete('/eliminar_publicacion_info/:nombre_video_dispositivo_usuario',controllers.usuario_controller.eliminarPublicacionInfo);
router.post('/actualizar_datos_usuario',controllers.usuario_controller.ActualizarDatosUsuario);
router.post('/actualizar_contrasena_usuario',controllers.usuario_controller.ActualizarContrasenaUsuario);
router.post('/registrar_datos_factura',controllers.usuario_controller.registrarFactura);
router.post('/actualizar_datos_factura',controllers.usuario_controller.ActualizarDatosFactura);
router.get('/coordenada_dispositivo/:id',controllers.usuario_controller.getCoordenadaDispositivo);
router.get('/coordenada_dispositivo/:id',controllers.usuario_controller.getCoordenadaDispositivo);
router.get('/solicitar_dispositivos_disponibles_usuario',controllers.dispositivo_controller.dispositivosDisponibles);
router.get('/buscar_dispositivo/:nombre',controllers.dispositivo_controller.BuscarDispositivo);
router.post('/eliminar_dispositivo_publicacion_info',controllers.dispositivo_controller.EliminarDispositivoPublicacion);

router.get('/eliminar_usuario/:id_usuario',controllers.usuario_controller.eliminarUsuario);


module.exports = router;