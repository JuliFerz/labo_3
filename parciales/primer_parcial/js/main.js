'use strict';

import { Terrestre } from './clases/Terrestre.js';
import { Aereo } from './clases/Aereo.js';

const data = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]';
const strColumns = ['id', 'modelo', 'anoFab', 'velMax', 'altMax', 'autonomia', 'cantPue', 'cantRue'];
const bodyVehiculos = document.getElementById('bodyVehiculos');
const toggleColumns = document.getElementsByName('toggleColumn');
const tipoVehiculoABM = document.getElementById('tipoVehiculoABM');
const filtroDatos = document.getElementById('filtroDatos');
const calcularPromedioVelMax = document.getElementById('btnCalcularPromedioVelMax');
const velocidadMaximaPromedio = document.getElementById('velocidadMaximaPromedio');
const agregarVehiculo = document.getElementById('agregarVehiculo');
const formDatos = document.getElementById('formDatos');
const formAbm = document.getElementById('formAbm');
const eliminarAbm = document.getElementById('eliminarAbm');
const cancelarAbm = document.getElementById('cancelarAbm');
const editarAbm = document.getElementById('editarAbm');
const sorts = document.getElementsByClassName('sort');
const objVehiculo = {
    id: document.getElementById('idAbm'),
    modelo: document.getElementById('modeloAbm'),
    anoFab: document.getElementById('anoFabAbm'),
    velMax: document.getElementById('velMaxAbm'),
    altMax: document.getElementById('altMaxAbm'),
    autonomia: document.getElementById('autonomiaAbm'),
    cantPue: document.getElementById('cantPueAbm'),
    cantRue: document.getElementById('cantRueAbm'),
}
const opcionesVehiculo = {
    Aereo: document.getElementById('opcionAereo'),
    Terrestre: document.getElementById('opcionTerrestre')
}
let objArray = [];
let filteredRows = [];
let filteredIds = [];
let sortFlag = true;
let vehiculoAEditar;


function parseData(data) {
    for (const obj of JSON.parse(data)) {
        if (obj['altMax'] && obj['autonomia'])
            objArray.push(createAereo(obj));
        else if (obj['cantPue'] > -1 && obj['cantRue'])
            objArray.push(createTerrestre(obj));
        else
            console.log('Información incorrecta. Falta un dato.');
    }
}
parseData(data)

function createAereo(obj) {
    return new Aereo(
        parseInt(obj['id']),
        obj['modelo'],
        parseInt(obj['anoFab']),
        parseInt(obj['velMax']),
        parseInt(obj['altMax']),
        parseInt(obj['autonomia'])
    );
}

function createTerrestre(obj) {
    return new Terrestre(
        parseInt(obj['id']),
        obj['modelo'],
        parseInt(obj['anoFab']),
        parseInt(obj['velMax']),
        parseInt(obj['cantPue']),
        parseInt(obj['cantRue'])
    );
}


function poblarBody(data) {
    for (const obj of data) {
        const tr = document.createElement('tr');
        tr.setAttribute('id', obj.id);
        tr.setAttribute('class', 'filaDato');
        for (const column of strColumns) {
            const td = document.createElement('td');
            td.setAttribute('class', column);
            const txt = (obj[column] || obj[column] === 0) ? obj[column] : '--';
            td.appendChild(document.createTextNode(txt));
            tr.appendChild(td);
        }
        tr.addEventListener('dblclick', () => { alternarFormulariosEdicion(parseInt(obj.id)) })
        bodyVehiculos.appendChild(tr);
    }
}
poblarBody(objArray, strColumns);

function alternarFormulariosEdicion(id = '') {
    if (formDatos.classList.contains('hidden')) {
        formDatos.classList.remove('hidden')
        formAbm.classList.add('hidden')
    } else {
        formDatos.classList.add('hidden')
        formAbm.classList.remove('hidden')
    }
    if (id) {
        aceptarAbm.classList.add('hidden')
        editarAbm.classList.remove('hidden')
        vehiculoAEditar = objArray.find((el) => el.id === id);
        opcionesVehiculo[vehiculoAEditar.tipo].selected = true;
        eliminarAbm.classList.remove('hidden')
        tipoVehiculoABM.classList.add('blocked')
        objVehiculo.id.classList.add('blocked')
        ocultarCampos('abmTextoDefault')
        mostrarCampos('abmVehiculo')
        mostrarCampos(vehiculoAEditar.tipo.toLowerCase());
        for (const campo of strColumns) {
            objVehiculo[campo].value = vehiculoAEditar[campo]
        }
    } else {
        aceptarAbm.classList.remove('hidden');
        editarAbm.classList.add('hidden');
        eliminarAbm.classList.add('hidden');
        opcionAereo.selected = false;
        opcionTerrestre.selected = false;
        tipoVehiculoABM.classList.remove('blocked')
        objVehiculo.id.classList.remove('blocked')
    }

}


function alternarColumna(clase) {
    const columna = document.getElementsByClassName(clase);
    for (const el of columna) {
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    }
}

function ocultarFilas(filas) {
    let ids = filas.map((el) => el.id)
    filteredIds.push(...objArray.filter((el => !ids.includes(el.id))).map((el) => el.id))

    for (const id of ids) {
        const row = document.getElementById(String(id));
        filteredRows.push(row);
        row.classList.add('hidden');
    }
}


toggleColumns.forEach((e) => {
    e.addEventListener('change', () => {
        alternarColumna(e.id);
    })
})

filtroDatos.addEventListener('change', () => {
    if (filteredRows) {
        filteredRows.map((el) => el.classList.remove('hidden'));
        filteredRows = [];
        filteredIds = [];
    }
    velocidadMaximaPromedio.value = '';
    let rowsToHide;
    switch (filtroDatos.value) {
        case 'aereo':
            rowsToHide = objArray.filter((el) => {
                return el.cantPue > -1 && el.cantRue
            })
            ocultarFilas(rowsToHide);
            break;
        case 'terrestre':
            rowsToHide = objArray.filter((el) => {
                return el.altMax && el.autonomia
            })
            ocultarFilas(rowsToHide);
            break;
        case 'todos':
            break;
    }
})

calcularPromedioVelMax.addEventListener('click', () => {
    const cantidad = filteredIds.length > 0 ? filteredIds.length : objArray.length;
    const actualElements = filteredIds.length > 0 ? objArray.filter((el) => filteredIds.includes(el.id)) : objArray;
    const promedioVelocidad = actualElements.reduce((x, y) => x + y.velMax, 0) / cantidad;
    velocidadMaximaPromedio.value = `Vel. Max. Promedio: ${String(promedioVelocidad.toFixed(2))}`;
})

agregarVehiculo.addEventListener('click', () => {
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

function validarIdVehiculo(idVehiculo) {
    return objArray.filter((vehiculo) => vehiculo.id === parseInt(idVehiculo)).length > 0 ? true : false
}

tipoVehiculoABM.addEventListener('change', () => {
    switch (tipoVehiculoABM.value) {
        case 'aereo':
            mostrarCampos('abmVehiculo');
            mostrarCampos('aereo');
            ocultarCampos('terrestre');
            ocultarCampos('abmTextoDefault');
            break;
        case 'terrestre':
            mostrarCampos('abmVehiculo');
            ocultarCampos('aereo');
            mostrarCampos('terrestre');
            ocultarCampos('abmTextoDefault');
            break;
        default:
            ocultarCampos('abmVehiculo');
            ocultarCampos('aereo');
            ocultarCampos('terrestre');
            mostrarCampos('abmTextoDefault');
    }
})

function reiniciarVisibilidadCampos() {
    ocultarCampos('abmVehiculo');
    ocultarCampos('aereo');
    ocultarCampos('terrestre');
    mostrarCampos('abmTextoDefault');
}

// ------------ CREAR
function instanciarVehiculo(tipoVehiculo) {
    const idNuevo = parseInt(objVehiculo.id.value);
    const modeloNuevo = objVehiculo.modelo.value;
    const anioNuevo = objVehiculo.anoFab.value ? parseInt(objVehiculo.anoFab.value) : 0;
    const velMaxNuevo = objVehiculo.velMax.value ? parseInt(objVehiculo.velMax.value) : 0;
    switch (tipoVehiculo) {
        case 'aereo':
            return new Aereo(
                idNuevo,
                modeloNuevo,
                anioNuevo,
                velMaxNuevo,
                objVehiculo.altMax.value ? parseInt(objVehiculo.altMax.value) : 0,
                objVehiculo.autonomia.value ? parseInt(objVehiculo.autonomia.value) : 0
            )
        case 'terrestre':
            return new Terrestre(
                idNuevo,
                modeloNuevo,
                anioNuevo,
                velMaxNuevo,
                objVehiculo.cantPue.value ? parseInt(objVehiculo.cantPue.value) : 0,
                objVehiculo.cantRue.value ? parseInt(objVehiculo.cantRue.value) : 0
            )
    }
}

function crearVehiculo() {
    if (!tipoVehiculoABM.value) {
        alert('Primero seleccione un tipo de vehiculo.')
        return;
    }
    if (validarIdVehiculo(objVehiculo.id.value)) {
        alert('❌ Error, ya existe un vehiculo con ese ID.');
        return;
    }

    let nuevoVehiculo = instanciarVehiculo(tipoVehiculoABM.value);

    objArray.push(nuevoVehiculo);
    poblarBody([nuevoVehiculo], strColumns);
    alternarFormulariosEdicion()

    reiniciarVisibilidadCampos();
    alert('✅ Nuevo vehiculo creado con éxito');
    filteredIds = [];
    formAbm.reset();
}

formAbm.addEventListener('submit', (e) => {
    e.preventDefault();
    crearVehiculo();
})

//----------------- EDITAR
function editarListaVehiculos() {
    return objArray.map((el) => {
        if (el.id === parseInt(objVehiculo.id.value)) {
            for (const campo of strColumns) {
                if (el[campo]) {
                    el[campo] = typeof (el[campo]) === 'number' ? parseInt(objVehiculo[campo].value) : objVehiculo[campo].value;
                }
            }
        }
        return el;
    })
}

function actualizarFilaVehiculo() {
    for (const fila of bodyVehiculos.rows) {
        if (fila.id === objVehiculo.id.value) {
            for (const campo of strColumns) {
                const datoFila = fila.getElementsByClassName(campo)[0];
                const texto = objVehiculo[campo].value != '' ? objVehiculo[campo].value : '--'
                datoFila.textContent = texto
            }
        }
    }
}

function editarVehiculo() {
    editarListaVehiculos();
    actualizarFilaVehiculo();
    alternarFormulariosEdicion();

    reiniciarVisibilidadCampos();
    alert(`✅ Vehiculo "[${objVehiculo.id.value}] ${objVehiculo.modelo.value}" editado correctamente`)
    formAbm.reset();
}
editarAbm.addEventListener('click', () => editarVehiculo())


// ---------------- ELIMINAR
function filtrarListaVehiculos(objArray) {
    return objArray.filter((el) => {
        return el.id != parseInt(objVehiculo.id.value);
    })
}

function eliminarVehiculo() {
    const filaEliminada = document.getElementById(objVehiculo.id.value)
    const padreFila = filaEliminada.parentNode;
    objArray = filtrarListaVehiculos(objArray);
    padreFila.removeChild(filaEliminada)

    alternarFormulariosEdicion();
    reiniciarVisibilidadCampos();
    alert(`✅ Vehiculo "[${objVehiculo.id.value}] ${objVehiculo.modelo.value}" eliminado correctamente`)
    filteredIds = [];
    formAbm.reset();
}
eliminarAbm.addEventListener('click', () => eliminarVehiculo());


// ----------------- CANCELAR
function cancelarOperacion() {
    alternarFormulariosEdicion();
    reiniciarVisibilidadCampos();
    formAbm.reset();
}
cancelarAbm.addEventListener('click', () => cancelarOperacion())



function getTypeField(campo) {
    for (const el of objArray) {
        if (!el[campo]) {
            continue
        }
        return typeof (el[campo]);
    }
}

function sortRows(campo) {
    let tipoDato = getTypeField(campo);

    if (sortFlag) {
        objArray.sort((el1, el2) => {
            if (el1[campo] === undefined) {
                return 1
            } else if (el2[campo] === undefined) {
                return -1
            } else if (tipoDato === 'number') {
                return el1[campo] - el2[campo];
            } else if (tipoDato === 'string') {
                return el1[campo].localeCompare(el2[campo]);
            }
        })
    } else {
        objArray.sort((el1, el2) => {
            if (el1[campo] === undefined) {
                return 1
            } else if (el2[campo] === undefined) {
                return -1
            } else if (tipoDato === 'number') {
                return el2[campo] - el1[campo];
            } else if (tipoDato === 'string') {
                return el2[campo].localeCompare(el1[campo]);
            }
        })
    }
    sortFlag = !sortFlag;
}

for (const button of sorts) {
    button.addEventListener('click', () => {
        const filas = document.getElementsByClassName('filaDato');
        if (filas.length <= 0) {
            alert('❌ Cree vehiculos antes de ordernar columnas');
            return;
        }

        const padreFilas = filas[0].parentElement
        while (padreFilas.childNodes) {
            if (filas[0] === undefined) {
                break;
            }
            padreFilas.removeChild(filas[0])
        }
        sortRows(button.classList[0]);
        poblarBody(objArray)
    })
}