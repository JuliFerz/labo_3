'use strict';

export class Persona {
    constructor(id, nombre, apellido, edad) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    toString() {
        return `ID: ${this.id}\nNombre: ${this.nombre}\nApellido: ${this.apellido}\nEdad: ${this.edad}`;
    }
}