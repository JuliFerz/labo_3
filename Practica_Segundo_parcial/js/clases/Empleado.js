'use strict';

import { Persona } from "./Persona.js";

export class Empleado extends Persona {
    constructor(id, nombre, apellido, edad, sueldo, ventas) {
        super(id, nombre, apellido, edad);
        this.tipo = 'Empleado';
        this.sueldo = sueldo;
        this.ventas = ventas;
    }

    toString() {
        return super.toString() + `\nSueldo: ${this.sueldo}\nVentas: ${this.ventas}`;
    }

    toJson() {
        return {
            ...super.toJson(),
            sueldo: this.sueldo,
            ventas: this.ventas,
        }
    }
}