'use strict';

import { Persona } from "./Persona.js";

export class Profesional extends Persona {
    constructor(id, nombre, apellido, edad, titulo, facultad, anioGraduacion) {
        super(id, nombre, apellido, edad);
        this.tipo = 'Profesional';
        this.titulo = titulo;
        this.facultad = facultad;
        this.anioGraduacion = anioGraduacion;
    }

    toString() {
        return super.toString() + `\ntipo: ${this.tipo}\ntitulo: ${this.titulo}\nfacultad: ${this.facultad}\nanioGraduacion: ${this.anioGraduacion}`;
    }
}