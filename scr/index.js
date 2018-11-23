const app = require('./config/server');
const routers = require('./routers/router');


//CONFIGURACION DEL SERVIDOR

//------------------------
//------------------------
//ROUTERS*/
app.use(routers);
//------------------------

//ARANCAR SERVIDOR
const server = app.listen(app.get('port'),() => {
  console.log('server activo',app.get('port'));    
});

//------------------------
//-------PETICION POST PARA GUARDAR ARCHIVO EN EL SERVIDOR



//inicializacion de socket----------------
const socket = require('socket.io');
const io = socket(server);
require('./socket/server_socket.js')(io);

//------------------------------------------
//cargar archivo al servidor----------------

//------------------------------------------