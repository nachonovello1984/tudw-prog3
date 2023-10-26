function Persona(nombre, apellido) {
  
  // Variables privadas (ocultas)
  let nombrePrivado = nombre;
  let apellidoPrivado = apellido;

  // Métodos públicos para acceder y modificar atributos privados
  Persona.prototype.getNombre = function () {
    return nombrePrivado;
  };

  Persona.prototype.setNombre = function (nombre) {
    nombrePrivado = nombre;
  };

  Persona.prototype.getApellido = function () {
    return apellidoPrivado;
  };

  Persona.prototype.setApellido = function (apellido) {
    apellidoPrivado = apellido;
  };

  Persona.prototype.toString = function () {
    return `Persona(${this.getNombre()}, ${this.getApellido()})`;
  };
}

const persona1 = new Persona("Ignacio", "Novello")
console.log(persona1); //OK
console.log(persona1.toString());

const persona2 = new Persona("Cristian", "Faure")
console.log(persona2); //OK
console.log(persona2.toString());