import { obtenerRegistros } from './api.js';

// Variables que almacenan elementos del DOM
const estadisticasGenerales = document.getElementById('estadisticasGenerales');
const consultasFecha = document.getElementById('consultasFecha');
const practicasPerfectas = document.getElementById('practicasPerfectas');
const top10Tiempos = document.getElementById('top10Tiempos');
const puntaje = document.getElementById('puntaje');
const fallas = document.getElementById('fallas');
const results = document.querySelector('.results');

// Funciones de eventos
async function verEstadisticasGenerales() {
    const registros = await obtenerRegistros();

    const div = document.createElement('div');
    const table = document.createElement('table');
    
    div.classList.add('resultados');
    table.classList.add('tableResultado');

    table.innerHTML = `
        <th>Usuario</th>
        <th>Respuestas</th>
        <th>Tiempo</th>
        <th>Puntaje</th>
    `;
    
    registros.forEach(registro => {
        const { user, answers, time, puntaje} = registro;
        const row = document.createElement('tr');

        row.innerHTML += `
            <td>${user}</td>
            <td>
                <ul>
                    ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                </ul>
            </td>
            <td>${time} Segundos</td>
            <td>${puntaje} puntos</td>
        `;
       
        table.appendChild(row);
    });

    div.appendChild(table);
    results.appendChild(div);
}

function verConsultasFecha() {
    console.log('clickk');
}

// Eventos
estadisticasGenerales.addEventListener('click', verEstadisticasGenerales);
consultasFecha.addEventListener('click', verConsultasFecha);
