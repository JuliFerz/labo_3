// // let vector = [{idLegajo: 888888, nombre: "Julian", apellido: "Fernandez"}];

// function $(id) {
//     return document.getElementById(id);
// }


// let tabla = $("tabla");

// /**** ENCABEZADO ****/
// let secEncabezado = document.createElement("thead"); // tenemos el elemento, pero aún no está en el DOM, no existe
// let filaEncabezado = document.createElement("tr");
// let celda1 = document.createElement("th");
// let texto1 = document.createTextNode("Nombre"); // se pasa el string que querramos
// /*
//     En una práctica real, el texto de un textNode puede venir de otro lado. 
//     El texto de TextNode SIEMPRE se crea como texto plano, por un tema de seguridad (por ejemplo si le pasamos un link).
//     No se usa innerText porque no hace texto plano, es decir, se le puede inyectar links, cosas maliciosas.
// */
// let celda2 = document.createElement("th");

// celda2.setAttribute("idLegajo", "888888");

// let texto2 = document.createTextNode("Apellido"); // se pasa el string que querramos

// tabla.appendChild(secEncabezado); // se agrega al elemento un nodo hijo (se agrega al dom como hijo de <table>). Esta función recibe un nodo
// secEncabezado.appendChild(filaEncabezado);
// filaEncabezado.appendChild(celda1);

// celda1.appendChild(texto1);

// filaEncabezado.appendChild(celda2); // append -> Se appendiza al final

// celda2.appendChild(texto2);


// /**** CUERPO ****/
// let tbody = document.createElement("tbody");
// let trBody = document.createElement("tr");
// // let data1 = document.createElement("td");

// tabla.appendChild(tbody);
// tbody.appendChild(trBody);

// // forma mas resumida
// // tbody.appendChild((document.createElement("td").appendChild(document.createTextNode("Julian"))));

// let celda3 = document.createElement("td");

// trBody.appendChild(celda3);

// let nombre = document.createTextNode("Julian");

// celda3.appendChild(nombre);

// let celda4 = document.createElement("td");

// trBody.appendChild(celda4);

// let apellido = document.createTextNode("Fernandez");

// celda4.appendChild(apellido);


// // document.getElementById("tabla"). // VScode sabe que es un elemento HTML, por lo que sugiere métodos despues del "."
// // $("tabla"). // VSCode también sabe que esto va a ser un elemento HTML, por lo que también sugiere los métodos

// // Remover nodo hijo de un elemento padre
// // Esta función remueve TODOS los nodos hijos
// // e.g. si le paso $("tabla"), elimina hasta las columnas
// function Vaciar(elemento){
//     while(elemento.hasChildNodes()){ // mientras tenga nodos hijos
//         elemento.removeChild(elemento.lastChild); // eliminar del padre el último elemento insertado
//     }
// }

// /* function Vaciar2(elmento) {
//     elemento. // Aca VSCode NO entiende que esto va a ser un elemento HTML, por lo que no puede sugerir métodos despues del "."
//               // Se debe escribir a mano los métodos
// } */


// //////////// Métodos con ATRIBUTOS
// // BUSCAR
// console.log($("tabla").hasAttribute("id")); // true -> busca si tiene el atributo
// console.log($("tabla").hasAttribute("idddd")); // false
// console.log($("tabla").getAttribute("id")); // mostrar el valor del atributo "id" del elemento tabla
// console.log($("tabla").getAttribute("attrQueNoExiste")); // Si no existe el atributo, devuelve NULL

// // CREAR
// $("tabla").setAttribute("tamaño", "chico"); // se le pasa el nombre del atributo y luego el string del valor (chequear en los elementos de la consola el nuevoatributo)

// // ELIMINAR
// $("tabla").removeAttribute("tamaño");



// // Si tengo que añadir filas (líneas de una base de datos), se le puede añadir id's por cada uno (correspondiente a cada fila de la BD):
// // filaEncabezado.setAttribute("idObjeto", "id_de_la_base_de_datos")
// filaEncabezado.setAttribute("idObjeto", "123654");
// /* 
//     Y por ejemplo, puedo entonces abrir un formulario por cada fila (del html), luego editar 
//     el objeto, y cuando guarde, se dispare un evento con el ID del que trabajé para que luego haga esa edición en la BD 
// */



// //////////////////////////// CLASE 3

// let cuerpo = $("cuerpo");
// let btn = document.createElement("Mi boton");

// btn.appendChild(document.createTextNode("Mi boton"))

// btn.setAttribute("idObjeto", "Mi super boton")

// cuerpo.appendChild(btn);

// function saludar(e){
//     alert("hola");
//     elemento = e.currentTarget;
//     console.log(elemento.getAttribute("idObjeto"));
// }

// /*
// El botón se suscribe a la función "saludar"?
// */
// // btn.addEventListener("string_del_evento", function_que_debe_ejecutar);
// btn.addEventListener("click", saludar);


// function mostrarLegajo(e){
//     elemento = e.currentTarget
//     alert(elemento.getAttribute("idLegajo"))
// }

// celda2.addEventListener("dblclick", mostrarLegajo)


// /* let numeros = [1, 61, 3];
// let nuevosNumeros = numeros.map((elemento, indice, vector) => {
// 	return {"valor": elemento, "posicion": indice}
// })
// console.log(nuevosNumeros); */


// vector = [{idLegajo: 888888, nombre: "Julian", apellido: "Fernandez"}];
// let arrayFilas = vector.map(
//     (el) => {
//         let f = document.createElement("tr");
//         let td1 = document.createElement("td");
//         td1.appendChild(document.createTextNode(el.nombre));
//         f.appendChild(td1);
//         return f;
//     }
// )

function Mueble(p_peso){
	this.peso = p_peso
}
Mueble.prototype.altura = 30

function Mesa(p_color){
	this.__proto__ = new Mueble(10);
	this.patas = 4;
	this.color = p_color;
	this.romper = function(){ console.log("rompi la mesa :(") }
}

let mesa = {__proto__: new Mesa("blanco")}

console.log(mesa.peso); // 10
console.log(mesa instanceof Mesa); // false
console.log(mesa instanceof Mueble); // true
console.log(mesa.__proto__ instanceof Mueble); // true
console.log(mesa);


class Persona {
    nombre="";
    apellido="";
    constructor(){}
    saludar(){
        console.log("hola");
    }
}

class Ciudadano extends Persona {
    dni=0
    #cuil=0;
    constructor(){
        super();
    }
    identificarse(){
        console.log("me identifico");
    }
}
var c = new Ciudadano();