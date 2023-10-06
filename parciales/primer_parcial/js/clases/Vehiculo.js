'use strict';

export class Vehiculo {
    constructor(id, modelo, anoFab, velMax) {
        if (!id || id <= 0) {
            alert('❌ El campo "ID" debe ser mayor a 0')
            throw new Error('El campo "ID" debe ser mayor a 0');
        } else if (!modelo) {
            alert('❌ El campo "Modelo" no puede estar vacío')
            throw new Error('El campo "Modelo" no puede estar vacío');
        } else if (anoFab <= 1885) {
            alert('❌ El campo "Año de Fabricación" debe ser mayor al año 1885')
            throw new Error('El campo "Año de Fabricación" debe ser mayor al año 1885');
        } else if (velMax <= 0) {
            alert('❌ El campo "Velocidad Máxima" debe ser mayor a 0')
            throw new Error('El campo "Velocidad Máxima" debe ser mayor a 0');
        }
        this.id = id;
        this.modelo = modelo;
        this.anoFab = anoFab;
        this.velMax = velMax;
    }

    toString() {
        return `ID: ${this.id}\nModelo: ${this.modelo}\nAño Fabricación: ${this.anoFab}\nVelocidad Máxima: ${this.velMax}`;
    }
}