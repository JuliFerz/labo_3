// 'use strict';

import { Futbolista } from './clases/Futbolista.js';
import { Profesional } from './clases/Profesional.js';

import { capitalize, parseData, validarFutbolista, validarProfesional } from './utils/auxFunctions.js';
import { createUser, modifyUser, deleteUser } from './utils/auxRequests.js';

const URL = "http://localhost/personasFutbolitasProfesionales.php"
const TIMEOUT = 1000;
const tituloDefaultABM = 'Formulario';
let xmlData = '';


const strColumns = ['id', 'nombre', 'apellido', 'edad', 'equipo', 'posicion', 'cantidadGoles', 'titulo', 'facultad', 'anioGraduacion'];
const strAdditionalColumns = ['modificar', 'borrar'];
const bodyPersonas = document.getElementById('bodyPersonas');
const spinner = document.getElementById('spinner');
const divDatos = document.getElementById('divDatos');

const tipoPersonaAbm = document.getElementById('tipoPersonaABM');
const agregarUsuario = document.getElementById('agregarUsuario');
const formDatos = document.getElementById('formDatos');
const formAbm = document.getElementById('formAbm');
const tituloAbm = document.getElementById('tituloAbm');
const eliminarAbm = document.getElementById('eliminarAbm');
const cancelarAbm = document.getElementById('cancelarAbm');
const editarAbm = document.getElementById('editarAbm');
const objUsuario = {
    id: document.getElementById('idAbm'),
    nombre: document.getElementById('nombreAbm'),
    apellido: document.getElementById('apellidoAbm'),
    edad: document.getElementById('edadAbm'),
    equipo: document.getElementById('equipoAbm'),
    posicion: document.getElementById('posicionAbm'),
    cantidadGoles: document.getElementById('cantidadGolesAbm'),
    titulo: document.getElementById('tituloUniAbm'),
    facultad: document.getElementById('facultadAbm'),
    anioGraduacion: document.getElementById('anioGraduacionAbm')
}
const opcionesPersonas = {
    Futbolista: document.getElementById('opcionFutbolista'),
    Profesional: document.getElementById('opcionProfesional')
}
let objArray = [];
let usuarioAEditar;

function xmlGet(URL) {
    let xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200) {
            parseData(xml.response, objArray);
            spinnerForm();
        }
    }
    xml.open("GET", URL, false);
    try {
        xml.send();
    } catch (err) {
        alert(`No se pudo acceder a la API.\nMensaje:\n${err.message}`)
        console.error({ 'message': err.message, 'url': URL })
        spinnerForm();
    }
}
function esperar(tiempo) {
    return new Promise(resolve => {
        setTimeout(resolve, tiempo);
    })
}
async function iniciar() {
    spinnerForm(true);
    await esperar(150);
}
await iniciar();
xmlGet(URL);


function poblarBody(data) {
    for (const obj of data) {
        const tr = document.createElement('tr');
        tr.setAttribute('id', obj.id);
        tr.setAttribute('class', 'filaDato');
        for (const column of strColumns) {
            const td = document.createElement('td');
            td.setAttribute('class', column);
            const txt = (obj[column] || obj[column] === 0) ? obj[column] : 'N/A';
            td.appendChild(document.createTextNode(txt));
            tr.appendChild(td);
        }
        for (const column of strAdditionalColumns) {
            const td = document.createElement('td');
            const button = document.createElement('button');
            td.setAttribute('class', column);
            button.type = 'button';
            if (column == 'modificar') {
                button.addEventListener('click', () => { alternarFormulariosEdicion(parseInt(obj.id), column) });
            }
            else if (column == 'borrar') {
                button.addEventListener('click', () => { alternarFormulariosEdicion(parseInt(obj.id), column) });
            }
            button.textContent = capitalize(column);
            td.appendChild(button);
            tr.appendChild(td);
        }
        bodyPersonas.appendChild(tr);
    }
}
poblarBody(objArray, strColumns);

async function alternarFormulariosEdicion(id = '', columnHeader = '') {
    spinnerForm(true);
    await esperar(TIMEOUT)
    alternarForms(id, columnHeader);
}

function alternarForms(id, columnHeader) {
    spinnerForm();
    if (formDatos.classList.contains('hidden')) {
        formDatos.classList.remove('hidden')
        formAbm.classList.add('hidden')
    } else {
        formDatos.classList.add('hidden')
        formAbm.classList.remove('hidden')
    }
    if (id) {
        if (columnHeader == 'modificar') {
            editarAbm.classList.remove('hidden')
        } else if (columnHeader == 'borrar') {
            eliminarAbm.classList.remove('hidden');
            objUsuario.id.classList.add('blocked');
            objUsuario.nombre.classList.add('blocked');
            objUsuario.apellido.classList.add('blocked');
            objUsuario.edad.classList.add('blocked');
            objUsuario.equipo.classList.add('blocked');
            objUsuario.posicion.classList.add('blocked');
            objUsuario.cantidadGoles.classList.add('blocked');
            objUsuario.titulo.classList.add('blocked');
            objUsuario.facultad.classList.add('blocked');
            objUsuario.anioGraduacion.classList.add('blocked');

            objUsuario.id.classList.add('blocked-color');
            objUsuario.nombre.classList.add('blocked-color');
            objUsuario.apellido.classList.add('blocked-color');
            objUsuario.edad.classList.add('blocked-color');
            objUsuario.equipo.classList.add('blocked-color');
            objUsuario.posicion.classList.add('blocked-color');
            objUsuario.cantidadGoles.classList.add('blocked-color');
            objUsuario.titulo.classList.add('blocked-color');
            objUsuario.facultad.classList.add('blocked-color');
            objUsuario.anioGraduacion.classList.add('blocked-color');
        }
        aceptarAbm.classList.add('hidden')
        tituloAbm.textContent = `${tituloDefaultABM} ${capitalize(columnHeader)}`;
        usuarioAEditar = objArray.find((el) => el.id === id);
        opcionesPersonas[usuarioAEditar.tipo].selected = true;
        tipoPersonaAbm.classList.add('blocked');
        objUsuario.id.classList.add('blocked');
        tipoPersonaAbm.classList.add('blocked-color');
        objUsuario.id.classList.add('blocked-color');
        ocultarCampos('abmTextoDefault');
        mostrarCampos('abmUsuario');
        mostrarCampos(usuarioAEditar.tipo.toLowerCase());
        for (const campo of strColumns) {
            objUsuario[campo].value = usuarioAEditar[campo]
        }
    } else {
        tituloAbm.textContent = `${tituloDefaultABM} Agregar`;
        aceptarAbm.classList.remove('hidden');
        editarAbm.classList.add('hidden');
        eliminarAbm.classList.add('hidden');
        opcionFutbolista.selected = false;
        opcionProfesional.selected = false;
        tipoPersonaAbm.classList.remove('blocked')
        tipoPersonaAbm.classList.remove('blocked-color')

        objUsuario.nombre.classList.remove('blocked');
        objUsuario.apellido.classList.remove('blocked');
        objUsuario.edad.classList.remove('blocked');
        objUsuario.equipo.classList.remove('blocked');
        objUsuario.posicion.classList.remove('blocked');
        objUsuario.cantidadGoles.classList.remove('blocked');
        objUsuario.titulo.classList.remove('blocked');
        objUsuario.facultad.classList.remove('blocked');
        objUsuario.anioGraduacion.classList.remove('blocked');

        objUsuario.nombre.classList.remove('blocked-color');
        objUsuario.apellido.classList.remove('blocked-color');
        objUsuario.edad.classList.remove('blocked-color');
        objUsuario.equipo.classList.remove('blocked-color');
        objUsuario.posicion.classList.remove('blocked-color');
        objUsuario.cantidadGoles.classList.remove('blocked-color');
        objUsuario.titulo.classList.remove('blocked-color');
        objUsuario.facultad.classList.remove('blocked-color');
        objUsuario.anioGraduacion.classList.remove('blocked-color');
    }

}

agregarUsuario.addEventListener('click', () => {
    alternarFormulariosEdicion();
})

function mostrarCampos(campo) {
    for (const el of document.getElementsByClassName(campo)) {
        el.classList.remove('hidden');
    }
}
function ocultarCampos(campo) {
    for (const el of document.getElementsByClassName(campo)) {
        el.classList.add('hidden');
    }
}

tipoPersonaABM.addEventListener('change', () => {
    switch (tipoPersonaABM.value) {
        case 'futbolista':
            mostrarCampos('abmUsuario');
            mostrarCampos('futbolista');
            ocultarCampos('profesional');
            ocultarCampos('abmTextoDefault');
            break;
        case 'profesional':
            mostrarCampos('abmUsuario');
            ocultarCampos('futbolista');
            mostrarCampos('profesional');
            ocultarCampos('abmTextoDefault');
            break;
        default:
            ocultarCampos('abmUsuario');
            ocultarCampos('futbolista');
            ocultarCampos('profesional');
            mostrarCampos('abmTextoDefault');
    }
})

function reiniciarVisibilidadCampos() {
    ocultarCampos('abmUsuario');
    ocultarCampos('futbolista');
    ocultarCampos('profesional');
    mostrarCampos('abmTextoDefault');
}

async function spinnerForm(hide = false) {
    if (hide) {
        spinner.classList.remove('hidden');
        divDatos.classList.add('blocked');
        divDatos.classList.add('blur');
    } else {
        spinner.classList.add('hidden');
        divDatos.classList.remove('blocked');
        divDatos.classList.remove('blur');
    }
}

// // // ------------ CREAR
function instanciarPersona(tipoPersona, id) {
    const nombre = objUsuario.nombre.value;
    const apellido = objUsuario.apellido.value;
    const edad = objUsuario.edad.value;
    switch (tipoPersona) {
        case 'profesional':
            return new Profesional(
                id,
                nombre,
                apellido,
                edad,
                objUsuario.titulo.value,
                objUsuario.facultad.value,
                objUsuario.anioGraduacion.value
            )
        case 'futbolista':
            return new Futbolista(
                id,
                nombre,
                apellido,
                edad,
                objUsuario.equipo.value,
                objUsuario.posicion.value,
                objUsuario.cantidadGoles.value
            )
    }
}

async function crearUsuario() {
    let mensaje = '';
    try {
        if (!tipoPersonaAbm.value) {
            mensaje = 'Primero seleccione un tipo de usuario.';
            return;
        }

        const strJsonBody = {
            nombre: objUsuario.nombre.value,
            apellido: objUsuario.apellido.value,
            edad: objUsuario.edad.value,
            equipo: objUsuario.equipo.value,
            posicion: objUsuario.posicion.value,
            cantidadGoles: objUsuario.cantidadGoles.value,
            titulo: objUsuario.titulo.value,
            facultad: objUsuario.facultad.value,
            anioGraduacion: objUsuario.anioGraduacion.value
        };
        const response = await createUser(URL, JSON.stringify(strJsonBody))
        tipoPersonaAbm.value == 'profesional'
            ? validarProfesional(objUsuario)
            : validarFutbolista(objUsuario);

        let nuevoUsuario = instanciarPersona(tipoPersonaAbm.value, JSON.parse(response).id);
        objArray.push(nuevoUsuario);
        poblarBody([nuevoUsuario], strColumns);

        mensaje = '✅ Nuevo usuario creado con éxito';

    } catch (err) {
        mensaje += 'No se pudo realizar la operación';
        mensaje += '\n' + err;
        console.error(err);
    } finally {
        spinnerForm(true);
        await esperar(TIMEOUT)
        alternarFormulariosEdicion();
        reiniciarVisibilidadCampos();
        alert(mensaje);
        formAbm.reset();
    }
}

formAbm.addEventListener('submit', (e) => {
    e.preventDefault();
    crearUsuario()
})

function editarListaObjetos() {
    return objArray.map((el) => {
        if (el.id === parseInt(objUsuario.id.value)) {
            for (const campo of strColumns) {
                if (el[campo]) {
                    el[campo] = typeof (el[campo]) === 'number' ? parseInt(objUsuario[campo].value) : objUsuario[campo].value;
                }
            }
        }
        return el;
    })
}

function actualizarFilaObjeto() {
    for (const fila of bodyPersonas.rows) {
        if (fila.id === objUsuario.id.value) {
            for (const campo of strColumns) {
                const datoFila = fila.getElementsByClassName(campo)[0];
                const texto = (!objUsuario[campo].value || objUsuario[campo].value == 'undefined') ? 'N/A' : objUsuario[campo].value;
                datoFila.textContent = texto
            }
        }
    }
}

function editarObjeto() {
    let mensaje = '';
    return new Promise((resolve, reject) => {
        const strJsonBody = {
            id: objUsuario.id.value,
            nombre: objUsuario.nombre.value,
            apellido: objUsuario.apellido.value,
            edad: objUsuario.edad.value,
            equipo: objUsuario.equipo.value,
            posicion: objUsuario.posicion.value,
            cantidadGoles: objUsuario.cantidadGoles.value,
            titulo: objUsuario.titulo.value,
            facultad: objUsuario.facultad.value,
            anioGraduacion: objUsuario.anioGraduacion.value
        };

        modifyUser(URL, JSON.stringify(strJsonBody))
            .then((response) => {
                if (objUsuario.id.value == 666) {
                    throw 'Error No se pudo procesar';
                }
                tipoPersonaAbm.value == 'profesional'
                    ? validarProfesional(objUsuario)
                    : validarFutbolista(objUsuario);
                spinnerForm(true);
                esperar(TIMEOUT)
                    .then(() => {
                        editarListaObjetos();
                        actualizarFilaObjeto();
                        mensaje = `✅ Usuario "[${objUsuario.id.value}] ${objUsuario.nombre.value} ${objUsuario.apellido.value}" editado correctamente`;
                    });
            })
            .catch((err) => {
                mensaje = err;
            })
            .finally(() => {
                spinnerForm(true);
                esperar(TIMEOUT)
                    .then(() => {
                        alternarFormulariosEdicion();
                        reiniciarVisibilidadCampos();
                        alert(mensaje);
                        formAbm.reset();
                    });
            });
    })
}
editarAbm.addEventListener('click', () => editarObjeto())


// // // ---------------- ELIMINAR
function filtrarListaUsuarios(objArray) {
    return objArray.filter((el) => {
        return el.id != parseInt(objUsuario.id.value);
    })
}

async function eliminarUsuario() {
    let mensaje = '';
    try {
        const strJsonBody = {
            id: objUsuario.id.value
        };
        const response = await deleteUser(URL, JSON.stringify(strJsonBody));

        spinnerForm(true);
        await esperar(TIMEOUT);
        const res = window.confirm(`Seguro de eliminar al usuario ${objUsuario.id.value}? (${objUsuario.nombre.value} ${objUsuario.apellido.value})`);

        if (res) {
            const filaEliminada = document.getElementById(objUsuario.id.value)
            const padreFila = filaEliminada.parentNode;
            objArray = filtrarListaUsuarios(objArray);
            padreFila.removeChild(filaEliminada)
            spinnerForm();
            objUsuario.nombre.classList.remove('blocked');
            objUsuario.apellido.classList.remove('blocked');
            objUsuario.edad.classList.remove('blocked');
            objUsuario.equipo.classList.remove('blocked');
            objUsuario.posicion.classList.remove('blocked');
            objUsuario.cantidadGoles.classList.remove('blocked');
            objUsuario.titulo.classList.remove('blocked');
            objUsuario.facultad.classList.remove('blocked');
            objUsuario.anioGraduacion.classList.remove('blocked');
            objUsuario.nombre.classList.remove('blocked-color');
            objUsuario.apellido.classList.remove('blocked-color');
            objUsuario.edad.classList.remove('blocked-color');
            objUsuario.equipo.classList.remove('blocked-color');
            objUsuario.posicion.classList.remove('blocked-color');
            objUsuario.cantidadGoles.classList.remove('blocked-color');
            objUsuario.titulo.classList.remove('blocked-color');
            objUsuario.facultad.classList.remove('blocked-color');
            objUsuario.anioGraduacion.classList.remove('blocked-color');
        }
    } catch (err) {
        mensaje = err;
    } finally {
        spinnerForm(true);
        await esperar(TIMEOUT);
        alternarFormulariosEdicion();
        reiniciarVisibilidadCampos();
        if (mensaje)
            alert(mensaje);
        formAbm.reset();
    }
}
eliminarAbm.addEventListener('click', () => eliminarUsuario());


// // // ----------------- CANCELAR
async function cancelarOperacion() {
    await alternarFormulariosEdicion();
    reiniciarVisibilidadCampos();
    objUsuario.nombre.classList.remove('blocked');
    objUsuario.apellido.classList.remove('blocked');
    objUsuario.edad.classList.remove('blocked');
    objUsuario.equipo.classList.remove('blocked');
    objUsuario.posicion.classList.remove('blocked');
    objUsuario.cantidadGoles.classList.remove('blocked');
    objUsuario.titulo.classList.remove('blocked');
    objUsuario.facultad.classList.remove('blocked');
    objUsuario.anioGraduacion.classList.remove('blocked');
    objUsuario.nombre.classList.remove('blocked-color');
    objUsuario.apellido.classList.remove('blocked-color');
    objUsuario.edad.classList.remove('blocked-color');
    objUsuario.equipo.classList.remove('blocked-color');
    objUsuario.posicion.classList.remove('blocked-color');
    objUsuario.cantidadGoles.classList.remove('blocked-color');
    objUsuario.titulo.classList.remove('blocked-color');
    objUsuario.facultad.classList.remove('blocked-color');
    objUsuario.anioGraduacion.classList.remove('blocked-color');
    formAbm.reset();
}
cancelarAbm.addEventListener('click', () => cancelarOperacion())
