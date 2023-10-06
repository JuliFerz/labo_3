'use strict';

import { Vehiculo } from "./Vehiculo.js";

export class Aereo extends Vehiculo {
    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        if (altMax <= 0) {
            alert('❌ El campo "Altura Máxima" debe ser mayor a 0')
            throw new Error('El campo "Altura Máxima" debe ser mayor a 0');
        } else if (autonomia <= 0) {
            alert('❌ El campo "Autonomia" debe ser mayor a 0')
            throw new Error('El campo "Autonomia" debe ser mayor a 0');
        }
        super(id, modelo, anoFab, velMax);
        this.tipo = 'Aereo';
        this.altMax = altMax;
        this.autonomia = autonomia;
    }
}