// 'use strict';

import { Empleado } from './clases/Empleado.js';
import { Cliente } from './clases/Cliente.js';

import { capitalize, parseData, validateClient, validateEmployee } from './utils/auxFunctions.js';
import { createUser, modifyUser, deleteUser } from './utils/auxRequests.js';

const URL = "http://localhost/PersonasEmpleadosClientes.php"
const TIMEOUT = 1000;
const tituloDefaultABM = 'Formulario';
let xmlData = '';


const strColumns = ['id', 'nombre', 'apellido', 'edad', 'compras', 'telefono', 'sueldo', 'ventas'];
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
    sueldo: document.getElementById('sueldoAbm'),
    ventas: document.getElementById('ventasAbm'),
    compras: document.getElementById('comprasAbm'),
    telefono: document.getElementById('telefonoAbm'),
}
const opcionesPersonas = {
    Empleado: document.getElementById('opcionEmpleado'),
    Cliente: document.getElementById('opcionCliente')
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
        alert(`No se pudo acceder a la API. Verifique la URL.\nMensaje:\n${err.message}`)
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
            // BORRAR?
            objUsuario.id.classList.add('blocked');
            objUsuario.nombre.classList.add('blocked');
            objUsuario.apellido.classList.add('blocked');
            objUsuario.edad.classList.add('blocked');
            objUsuario.compras.classList.add('blocked');
            objUsuario.telefono.classList.add('blocked');
            objUsuario.sueldo.classList.add('blocked');
            objUsuario.ventas.classList.add('blocked');
            objUsuario.id.classList.add('blocked-color');
            objUsuario.nombre.classList.add('blocked-color');
            objUsuario.apellido.classList.add('blocked-color');
            objUsuario.edad.classList.add('blocked-color');
            objUsuario.compras.classList.add('blocked-color');
            objUsuario.telefono.classList.add('blocked-color');
            objUsuario.sueldo.classList.add('blocked-color');
            objUsuario.ventas.classList.add('blocked-color');
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
        opcionEmpleado.selected = false;
        opcionCliente.selected = false;
        tipoPersonaAbm.classList.remove('blocked')
        tipoPersonaAbm.classList.remove('blocked-color')
    }

}

agregarUsuario.addEventListener('click', () => {
    alternarFormulariosEdicion();
})


// pasar a auxfunctions
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
        case 'cliente':
            mostrarCampos('abmUsuario');
            mostrarCampos('cliente');
            ocultarCampos('empleado');
            ocultarCampos('abmTextoDefault');
            break;
        case 'empleado':
            mostrarCampos('abmUsuario');
            ocultarCampos('cliente');
            mostrarCampos('empleado');
            ocultarCampos('abmTextoDefault');
            break;
        default:
            ocultarCampos('abmUsuario');
            ocultarCampos('cliente');
            ocultarCampos('empleado');
            mostrarCampos('abmTextoDefault');
    }
})

function reiniciarVisibilidadCampos() {
    ocultarCampos('abmUsuario');
    ocultarCampos('cliente');
    ocultarCampos('empleado');
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

// // ------------ CREAR
function instanciarPersona(tipoPersona, id) {
    const nombre = objUsuario.nombre.value;
    const apellido = objUsuario.apellido.value;
    const edad = objUsuario.edad.value;
    switch (tipoPersona) {
        case 'empleado':
            return new Empleado(
                id,
                nombre,
                apellido,
                edad,
                objUsuario.sueldo.value,
                objUsuario.ventas.value
            )
        case 'cliente':
            return new Cliente(
                id,
                nombre,
                apellido,
                edad,
                objUsuario.compras.value,
                objUsuario.telefono.value
            )
    }
}

function crearUsuario() {
    let mensaje = '';
    return new Promise((resolve, reject) => {
        if (!tipoPersonaAbm.value) {
            mensaje = 'Primero seleccione un tipo de usuario.';
            reject(new Error('Primero seleccione un tipo de usuario.'));
            return;
        }

        const strJsonBody = {
            nombre: objUsuario.nombre.value,
            apellido: objUsuario.apellido.value,
            edad: objUsuario.edad.value,
            sueldo: objUsuario.sueldo.value,
            ventas: objUsuario.ventas.value,
            compras: objUsuario.compras.value,
            telefono: objUsuario.telefono.value
        };
        createUser(URL, JSON.stringify(strJsonBody))
            .then((response) => {
                tipoPersonaAbm.value == 'empleado'
                    ? validateEmployee(objUsuario)
                    : validateClient(objUsuario);

                let nuevoUsuario = instanciarPersona(tipoPersonaAbm.value, JSON.parse(response).id);
                objArray.push(nuevoUsuario);
                poblarBody([nuevoUsuario], strColumns);

                mensaje = '✅ Nueva persona creada con éxito';
                resolve(mensaje);
            })
            .catch((err) => {
                mensaje += 'No se pudo realizar la operación';
                mensaje += '\n' + err;
                console.error(err);
                reject(err);
            })
    })
}

formAbm.addEventListener('submit', (e) => {
    e.preventDefault();
    crearUsuario()
        .then((res) => {
            spinnerForm(true);
            esperar(TIMEOUT)
                .then(() => {
                    alternarFormulariosEdicion();
                    reiniciarVisibilidadCampos();
                    alert(res);
                })
        })
        .catch((err) => {
            spinnerForm(true);
            esperar(TIMEOUT)
                .then(() => {
                    alternarFormulariosEdicion();
                    reiniciarVisibilidadCampos();
                    alert(err);
                })
        })
        .finally(() => {
            formAbm.reset();
        });
})

// //----------------- EDITAR
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
                const texto = objUsuario[campo].value != '' ? objUsuario[campo].value : 'N/A'
                datoFila.textContent = texto
            }
        }
    }
}

async function editarObjeto() {
    let mensaje = '';
    try {
        const strJsonBody = {
            id: objUsuario.id.value,
            nombre: objUsuario.nombre.value,
            apellido: objUsuario.apellido.value,
            edad: objUsuario.edad.value,
            sueldo: objUsuario.sueldo.value,
            ventas: objUsuario.ventas.value,
            compras: objUsuario.compras.value,
            telefono: objUsuario.telefono.value
        };
        const response = JSON.parse(await modifyUser(URL, JSON.stringify(strJsonBody)));

        tipoPersonaAbm.value == 'empleado'
            ? validateEmployee(objUsuario)
            : validateClient(objUsuario);

        spinnerForm(true);
        await esperar(TIMEOUT);

        editarListaObjetos();
        actualizarFilaObjeto();
        mensaje = `✅ Usuario "[${objUsuario.id.value}] ${objUsuario.nombre.value} ${objUsuario.apellido.value}" editado correctamente`;
    } catch (err) {
        mensaje = err;
    } finally {
        spinnerForm(true);
        await esperar(TIMEOUT);
        alternarFormulariosEdicion();
        reiniciarVisibilidadCampos();
        alert(mensaje);
        formAbm.reset();
    }
}
editarAbm.addEventListener('click', () => editarObjeto())


// // ---------------- ELIMINAR
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
        const response = JSON.parse(await deleteUser(URL, JSON.stringify(strJsonBody)));

        spinnerForm(true);
        await esperar(TIMEOUT);
        const res = window.confirm(`Seguro de eliminar al usuario ${objUsuario.id.value}?`);


        if (res) {
            const filaEliminada = document.getElementById(objUsuario.id.value)
            const padreFila = filaEliminada.parentNode;
            objArray = filtrarListaUsuarios(objArray);
            padreFila.removeChild(filaEliminada)
            spinnerForm();
            objUsuario.nombre.classList.remove('blocked');
            objUsuario.apellido.classList.remove('blocked');
            objUsuario.edad.classList.remove('blocked');
            objUsuario.compras.classList.remove('blocked');
            objUsuario.telefono.classList.remove('blocked');
            objUsuario.sueldo.classList.remove('blocked');
            objUsuario.ventas.classList.remove('blocked');
            objUsuario.nombre.classList.remove('blocked-color');
            objUsuario.apellido.classList.remove('blocked-color');
            objUsuario.edad.classList.remove('blocked-color');
            objUsuario.compras.classList.remove('blocked-color');
            objUsuario.telefono.classList.remove('blocked-color');
            objUsuario.sueldo.classList.remove('blocked-color');
            objUsuario.ventas.classList.remove('blocked-color');
        }
    } catch (err) {
        mensaje = '';
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


// // ----------------- CANCELAR
async function cancelarOperacion() {
    await alternarFormulariosEdicion();
    reiniciarVisibilidadCampos();
    objUsuario.nombre.classList.remove('blocked');
    objUsuario.apellido.classList.remove('blocked');
    objUsuario.edad.classList.remove('blocked');
    objUsuario.compras.classList.remove('blocked');
    objUsuario.telefono.classList.remove('blocked');
    objUsuario.sueldo.classList.remove('blocked');
    objUsuario.ventas.classList.remove('blocked');
    objUsuario.nombre.classList.remove('blocked-color');
    objUsuario.apellido.classList.remove('blocked-color');
    objUsuario.edad.classList.remove('blocked-color');
    objUsuario.compras.classList.remove('blocked-color');
    objUsuario.telefono.classList.remove('blocked-color');
    objUsuario.sueldo.classList.remove('blocked-color');
    objUsuario.ventas.classList.remove('blocked-color');
    formAbm.reset();
}
cancelarAbm.addEventListener('click', () => cancelarOperacion())
