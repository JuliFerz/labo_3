'use strict';

import { Vehiculo } from "./Vehiculo.js";

export class Terrestre extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        if (cantPue <= -1) {
            alert('❌ El campo "Cantidad Puertas" debe ser mayor a -1')
            throw new Error('El campo "Cantidad Puertas" debe ser mayor a -1');
        } else if (cantRue <= 0) {
            alert('❌ El campo "Cantidad Ruedas" debe ser mayor a 0')
            throw new Error('El campo "Cantidad Ruedas" debe ser mayor a 0');
        }
        super(id, modelo, anoFab, velMax);
        this.tipo = 'Terrestre';
        this.cantPue = cantPue;
        this.cantRue = cantRue;
    }
}