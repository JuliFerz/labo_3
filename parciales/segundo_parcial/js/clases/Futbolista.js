'use strict';

import { Persona } from "./Persona.js";

export class Futbolista extends Persona {
    constructor(id, nombre, apellido, edad, equipo, posicion, cantidadGoles) {
        super(id, nombre, apellido, edad);
        this.tipo = 'Futbolista';
        this.equipo = equipo;
        this.posicion = posicion;
        this.cantidadGoles = cantidadGoles;
    }

    toString() {
        return super.toString() + `\ntipo: ${this.tipo}\nequipo: ${this.equipo}\nposicion: ${this.posicion}\ncantidadGoles: ${this.cantidadGoles}`;
    }
}