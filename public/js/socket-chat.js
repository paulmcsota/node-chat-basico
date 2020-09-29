var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
   window.location = 'index.html';
   throw new Error('El nombre y sala son necesarios.');
}

var usuario = {
   nombre: params.get('nombre'),
   sala: params.get('sala')
};

socket.on('connect', function() {
   console.log('Conectado al servidor');
   socket.emit('entrarChat', usuario, function(resp) {
      console.log('Usuarios conectados: ', resp);
   });
});

// escuchar
socket.on('disconnect', function() {
   console.log('Perdimos conexión con el servidor');
});


// escuchar
socket.on('crearMensaje', function(resp) {
   console.log(resp);
});
// escuchar
socket.on('listaPersonas', function(personas) {
   console.log(personas);
});

socket.on('mensajePrivado', function(mensaje) {
   console.log('Mensaje privado', mensaje);
});