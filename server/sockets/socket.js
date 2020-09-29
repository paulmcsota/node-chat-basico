const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client) => {
   client.on('entrarChat', (data, callback) => {
      if (!data.nombre || !data.sala) {
         return callback({
            error: true,
            message: 'El nombre y sala son necesarios.'
         });
      }

      client.join(data.sala);

      const personasSala = usuarios.agregarPersona(client.id, data.nombre, data.sala);

      client.broadcast.to(data.sala).emit('listaPersonas', personasSala);
      client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se conectó.`));

      callback(personasSala);
   });

   client.on('crearMensaje', (data, callback) => {
      const persona = usuarios.getPersona(client.id);
      const mensaje = crearMensaje(persona.nombre, data.mensaje);
      client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);   
      callback(mensaje);
   });

   client.on('disconnect', () => {
      const personaBorrada = usuarios.borrarPersona(client.id);
      client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} se desconectó.`));
      client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
   });

   // Mensajes privados
   client.on('mensajePrivado', (data) => {
      const persona = usuarios.getPersona(client.id);
      client.broadcast.to(persona.sala).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
   });
});