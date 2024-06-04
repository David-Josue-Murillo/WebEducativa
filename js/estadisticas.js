import { obtenerRegistros } from './api.js';

// Variables que almacenan elementos del DOM
const practCompletadas = document.getElementById('practCompletadas');
const tiempoMinimo = document.getElementById('tiempoMinimo');
const tiempoMaximo = document.getElementById('tiempoMaximo');

async function verRegistros() {
    const registros = await obtenerRegistros();
    return registros;
}

console.log(verRegistros());

// Funciones
function practicasCompletadas(registros) {
    const practicas = registros.filter(registro => registro.puntaje >= 5);
    return practicas.length;
}