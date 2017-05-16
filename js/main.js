var nombre = document.getElementById("name");
var apellido = document.getElementById("lastname");
var correo = document.getElementById("input-email");
var contrasena = document.getElementById("input-password");
var tipoBici = document.getElementsByTagName("select")[0];
var twitter = document.getElementById("input-social");
var checkbox = document.getElementsByClassName("checkbox")[0].firstElementChild.firstElementChild;

var requeridos = [nombre, apellido, correo, contrasena, tipoBici];
var mayusculaIniciales = [nombre, apellido];
var correos = [correo];
var contrasenas = [contrasena];

requeridos.forEach(function(nodo){
	nodo.setAttribute("required", "");
	var span = document.createElement('span');
	var text = document.createTextNode('Campo Requerido');
	span.appendChild(text);
	ocultar(span);
	span.setAttribute('role','requerido');
	nodo.parentNode.insertBefore(span,nodo.nextSibling); 
});

mayusculaIniciales.forEach(function(nodo){
	var span = document.createElement('span');
	var text = document.createTextNode('Debe comenzar por mayúscula');
	span.appendChild(text);
	ocultar(span);
	span.setAttribute('role','mayusculaInicial');
	nodo.parentNode.insertBefore(span,nodo.nextSibling); 
});

correos.forEach(function(nodo){
	var span = document.createElement('span');
	var text = document.createTextNode('Correo Inválido (nombre@ejemplo.com)');
	span.appendChild(text);
	ocultar(span);
	span.setAttribute('role','correo');
	nodo.parentNode.insertBefore(span,nodo.nextSibling); 
});

contrasenas.forEach(function(nodo){
	var span = document.createElement('span');
	var text = document.createTextNode('Contraseña Inválida (min 6 caracteres)');
	span.appendChild(text);
	ocultar(span);
	span.setAttribute('role','contrasena');
	nodo.parentNode.insertBefore(span,nodo.nextSibling); 
});

tipoBici.firstElementChild.setAttribute("disabled","");
tipoBici.firstElementChild.setAttribute("selected","");

function validateForm(){
	/* Escribe tú código aquí */

	return (
		validarRequeridos(requeridos) &&
		validarMayusculaInicial(nombre) && 
		validarMayusculaInicial(apellido) &&
		validarCorreo(correo) &&
		validarContrasena(contrasena)
	);

}

function validarMayusculaInicial(nodo) {
	var str = nodo.value;
	var valido = (str.charCodeAt(0) >= 65 && str.charCodeAt(0) <= 90);
	var span = obtenerSpan(nodo,'mayusculaInicial');
	if (valido) {
		ocultar(span);
	} else {
		mostrar(span);
	}
	return valido;
}

function validarContrasena(nodo) {
	var str = nodo.value;
	var valido = (str.length >= 6 && str != "123456" && str != "098754" && str != "password"); 
	var span = obtenerSpan(nodo,'contrasena');  
	if (valido) {
		ocultar(span);
	} else {
		mostrar(span);
	}
	return valido;
}

function validarRequerido(nodo) {
	var str = nodo.value;
	var valido = (str.length > 0 && str != '0');
	var span = obtenerSpan(nodo,'requerido');
	if (valido) {
		ocultar(span);
	} else {
		mostrar(span);
	}
	return valido;
}

function validarCorreo(nodo) {
	var str = nodo.value;
	var valido = nodo.checkValidity();
	var span = obtenerSpan(nodo,'correo');
	if (valido) {
		ocultar(span);
	} else {
		mostrar(span);
	}
	return valido;
}

function validarRequeridos(nodos) {
	var validos = true;
	nodos.forEach(function(nodo){
		validos = validos && validarRequerido(nodo);
	});
	return validos;
}

function obtenerSpan(nodo,rol){
	return Array.from(nodo.parentNode.children).find(function(nd){
		return (nd.getAttribute('role') == rol);
	});
}

function mostrar(elemento){
	elemento.setAttribute('style','display:inline;');
}

function ocultar(elemento){
	elemento.setAttribute('style','display:none;');
}
