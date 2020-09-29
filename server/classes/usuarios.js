class Usuarios {
   constructor() {
      this.personas = [];
   }

   agregarPersona(id, nombre, sala) {
      const persona = { id, nombre, sala };
      this.personas.push(persona);

      return this.personas.filter(persona => persona.sala === sala);
   }

   getPersona(id) {
      const persona = this.personas.filter(persona => persona.id === id)[0];
      
      return persona;
   }

   getPersonas() {
      return this.personas;
   }

   getPersonasPorSala(sala) {
      const personasEnSala = this.personas.filter(persona => persona.sala === sala);

      return personasEnSala;
   }

   borrarPersona(id) {
      const personaBorrada = this.getPersona(id);
      this.personas = this.personas.filter(persona => persona.id !== id);

      return personaBorrada;
   }
}

module.exports = {
   Usuarios
}