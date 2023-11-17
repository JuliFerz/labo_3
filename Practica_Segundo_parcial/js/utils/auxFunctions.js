import { Empleado } from '../clases/Empleado.js';
import { Cliente } from '../clases/Cliente.js';

export function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
};

export function parseData(data, objArray) {
    for (const obj of JSON.parse(data)) {
        if (obj['sueldo'] && obj['ventas'])
            objArray.push(createEmployee(obj));
        else if (obj['compras'] && obj['telefono'])
            objArray.push(createClient(obj));
        else
            console.log('Información incorrecta.');
    }
}

export function validateEmployee(data) {
    validateCommonFields(data)
    const sueldo = data.sueldo.value ? parseInt(data.sueldo.value) : 0;
    const ventas = data.ventas.value ? parseInt(data.ventas.value) : 0;
    if (!sueldo || !ventas) {
        throw new Error('Error en la creación de Empleado. Revise los datos de entrada');
    } else if (sueldo <= 0 || ventas <= 0) {
        throw new Error('El empleado debe tener "sueldo" y "ventas" válido');
    }
}

export function validateClient(data) {
    validateCommonFields(data);
    const compras = data.compras.value ? parseInt(data.compras.value) : 0;
    const telefono = data.telefono.value ? parseInt(data.telefono.value) : 0;
    if (!compras || !telefono) {
        throw new Error('Error en la creación de Cliente. Revise los datos de entrada');
    } else if (compras <= 0) {
        throw new Error('El cliente debe tener "compras" y "teléfono" válido');
    }
}

function validateCommonFields(data) {
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

function createEmployee(obj) {
    return new Empleado(
        parseInt(obj['id']),
        obj['nombre'],
        obj['apellido'],
        parseInt(obj['edad']),
        parseInt(obj['sueldo']),
        parseInt(obj['ventas'])
    );
}

function createClient(obj) {
    return new Cliente(
        parseInt(obj['id']),
        obj['nombre'],
        obj['apellido'],
        parseInt(obj['edad']),
        parseInt(obj['compras']),
        parseInt(obj['telefono'])
    );
}