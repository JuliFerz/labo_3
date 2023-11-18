import { Futbolista } from '../clases/Futbolista.js';
import { Profesional } from '../clases/Profesional.js';

export function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
};

export function parseData(data, objArray) {
    for (const obj of JSON.parse(data)) {
        if (obj['equipo'] && obj['posicion'])
            objArray.push(crearFutbolista(obj));
        else if (obj['titulo'] && obj['facultad'] && obj['añoGraduacion'])
            objArray.push(crearProfesional(obj));
        else
            console.log('Información incorrecta.');
    }
}

export function validarFutbolista(data) {
    validarDatosComunes(data);
    const equipo = data.equipo.value ? data.equipo.value : '';
    const posicion = data.posicion.value ? data.posicion.value : '';
    const cantidadGoles = data.cantidadGoles.value ? parseInt(data.cantidadGoles.value) : 0;
    if (!equipo || !posicion) {
        throw new Error('Error en la creación del Futbolista. Revise los datos de entrada');
    } else if (cantidadGoles < 0) {
        throw new Error('El Futbolista debe tener mínimo 0 goles');
    }
}

export function validarProfesional(data) {
    validarDatosComunes(data)
    const titulo = data.titulo.value ? data.titulo.value : '';
    const facultad = data.facultad.value ? data.facultad.value : '';
    const anioGraduacion = data.anioGraduacion.value ? parseInt(data.anioGraduacion.value) : 0;
    if (!titulo || !facultad) {
        throw new Error('Error en la creación del Futbolista. Revise los datos de entrada');
    } else if (anioGraduacion <= 1950) {
        throw new Error('El año de graduación debe ser mayor a 1950');
    }
}

function validarDatosComunes(data) {
    const nombre = data.nombre.value ? data.nombre.value : '';
    const apellido = data.apellido.value ? data.apellido.value : '';
    const edad = data.edad.value ? parseInt(data.edad.value) : 0;
    if (!nombre || !apellido) {
        throw new Error('La persona debe tener nombre y apellido');
    }
    if (edad <= 15) {
        throw new Error('La edad debe ser mayor a 15');
    }
}

function crearFutbolista(obj) {
    return new Futbolista(
        parseInt(obj['id']),
        obj['nombre'],
        obj['apellido'],
        parseInt(obj['edad']),
        obj['equipo'],
        obj['posicion'],
        parseInt(obj['cantidadGoles'])
    );
}

function crearProfesional(obj) {
    return new Profesional(
        parseInt(obj['id']),
        obj['nombre'],
        obj['apellido'],
        parseInt(obj['edad']),
        obj['titulo'],
        obj['facultad'],
        parseInt(obj['añoGraduacion'])
    );
}