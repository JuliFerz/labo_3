'use strict';

import { Persona } from "./Persona.js";

export class Cliente extends Persona {
    constructor(id, nombre, apellido, edad, compras, telefono) {
        super(id, nombre, apellido, edad);
        this.tipo = 'Cliente';
        this.compras = compras;
        this.telefono = telefono;
    }

    toString() {
        return super.toString() + `\nCompras: ${this.compras}\nTelefono: ${this.telefono}`;
    }

    toJson() {
        return {
            ...super.toJson(),
            compras: this.compras,
            telefono: this.telefono,
        }
    }
}