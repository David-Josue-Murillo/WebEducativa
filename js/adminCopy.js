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

    const div = crearDiv();
    const tabla = crearTabla(registros);
    tabla.style.border = '1px solid #d42a5b';

    div.appendChild(tabla);
    results.appendChild(div);
}

function verConsultasFecha() {
    const div = crearDiv();

    div.innerHTML = `
        <div class="divButtons">
            <button id="btnConsultasF" data-value="1">Registors de ayer</button>
            <button id="btnConsultasF" data-value="2">Registros de la semana</button>
            <button id="btnConsultasF" data-value="3">Registros del mes</button> 
            <button id="btnConsultasF" data-value="4">Registros del año</button>
        </div>
    `;

    // Crear botoness para cada fecha
    results.appendChild(div);

    // Crear evento para cada boton
    const btnConsultasF = document.querySelectorAll('#btnConsultasF');
    btnConsultasF.forEach(button => {
        button.addEventListener('click', async (e) => {
            const data_value = Number(e.target.dataset.value);
            const registros = await obtenerRegistros();

            const div = crearDiv();
            const tabla = crearTabla(registros, data_value);

            tabla.style.border = '1px solid #3a68d6';
            div.appendChild(tabla);
            results.appendChild(div);
        });
    });
}

function crearDiv() {
    limpiarDiv();
    const div = document.createElement('div');
    div.classList.add('resultados');
    return div;
}

function limpiarDiv() {
    const divs = document.querySelector('.resultados');
    if (divs) {
        divs.remove();
    }
}

function crearTabla(datos, value) {
    const table = document.createElement('table');
    table.classList.add('tableResultado');

    table.innerHTML = `
    <thead>
        <th>Usuario</th>
        <th>Respuestas</th>
        <th>Tiempo</th>
        <th>Puntaje</th>
        <th>Fecha</th>
    </thead>
        `;

    if (value) {
        const tableF = mostrarRespuestasPorFecha(datos, value);
        table.appendChild(tableF);
    } else {
        const tableDatos = iterarDatos(datos);
        table.appendChild(tableDatos);
    }


    return table;
}

function mostrarRespuestasPorFecha(datos, value) {
    const tableF = iterarDatos(datos, value);
    return tableF;
}

function iterarDatos(datos, value) {
    const row = document.createElement('tbody');

    //Fecha actual
    const diaComp = (new Date().getDate()) - 1;
    const semanaComp = (new Date().getDate()) - 7;
    const mesComp = (new Date().getMonth());
    const yearComp = (new Date().getFullYear()) - 1;
    //console.log('Dia: ', dia);
    //console.log('Semana: ', semana);
    //console.log('Mes: ', mes);
    //console.log('Año: ', year);

    if (value === 1) {
        datos.forEach(dato => {
            const { user, answers, time, puntaje, date } = dato;

            if ((Number(date.split('/')[0]) >= diaComp) && (Number(date.split('/')[2]) === new Date().getFullYear())) {
                row.innerHTML += `
                <tr>
                    <td>${user}</td>
                    <td>
                        <ul>
                            ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                        </ul>
                    </td>
                    <td>${time} Segundos</td>
                    <td>${puntaje} puntos</td>
                    <td>${date}</td>
                </tr>
                `;
            }
        });

    } else if (value === 2) {
        datos.forEach(dato => {
            const { user, answers, time, puntaje, date } = dato;

            if ((Number(date.split('/')[0]) >= semanaComp) && (Number(date.split('/')[2]) === new Date().getFullYear())) {
                row.innerHTML += `
                <tr>
                    <td>${user}</td>
                    <td>
                        <ul>
                            ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                        </ul>
                    </td>
                    <td>${time} Segundos</td>
                    <td>${puntaje} puntos</td>
                    <td>${date}</td>
                </tr>
                `;
            }
        });

    } else if (value === 3) {
        datos.forEach(dato => {
            const { user, answers, time, puntaje, date } = dato;
            if ((Number(date.split('/')[1]) >= mesComp) && (Number(date.split('/')[2]) === new Date().getFullYear())) {
                row.innerHTML += `
                <tr>
                    <td>${user}</td>
                    <td>
                        <ul>
                            ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                        </ul>
                    </td>
                    <td>${time} Segundos</td>
                    <td>${puntaje} puntos</td>
                    <td>${date}</td>
                </tr>
                `;
            }
        });

    } else if (value === 4) {
        datos.forEach(dato => {
            const { user, answers, time, puntaje, date } = dato;
            if (Number(date.split('/')[2]) >= yearComp) {
                row.innerHTML += `
                <tr>
                    <td>${user}</td>
                    <td>
                        <ul>
                            ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                        </ul>
                    </td>
                    <td>${time} Segundos</td>
                    <td>${puntaje} puntos</td>
                    <td>${date}</td>
                </tr>
                `;
            }
        });

    } else {
        datos.forEach(dato => {
            const { user, answers, time, puntaje, date } = dato;

            row.innerHTML += `
                <td>${user}</td>
                <td>
                    <ul>
                        ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                    </ul>
                </td>
                <td>${time} Segundos</td>
                <td>${puntaje} puntos</td>
                <td>${date}</td>
            `;
        });
    }

    return row;
}

async function verPracticasPerfectas() {
    const registros = await obtenerRegistros();

    const div = crearDiv();
    const tabla = document.createElement('table');
    tabla.classList.add('tableResultado');
    tabla.style.border = '1px solid #49be84';

    tabla.innerHTML = `
    <thead>
        <th>Usuario</th>
        <th>Respuestas</th>
        <th>Tiempo</th>
        <th>Puntaje</th>
        <th>Fecha</th>
    </thead>
        `;

    registros.forEach(dato => {
        const { user, answers, time, puntaje, date } = dato;

        const perfectas = answers.filter(answer => answer.correct === true).length === answers.length;

        if (perfectas) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user}</td>
                <td>
                    <ul>
                        ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                    </ul>
                </td>
                <td>${time} Segundos</td>
                <td>${puntaje} puntos</td>
                <td>${date}</td>
            `;
            tabla.appendChild(row);
        }
    });

    div.appendChild(tabla);
    results.appendChild(div);
}

async function verTop10Tiempos() {
    const registros = await obtenerRegistros();
    const div = crearDiv();
    const tabla = document.createElement('table');
    tabla.style.border = '1px solid #b148b0';

    tabla.classList.add('tableResultado');
    tabla.innerHTML = `
    <thead>
        <th>Usuario</th>
        <th>Respuestas</th>
        <th>Tiempo</th>
        <th>Puntaje</th>
        <th>Fecha</th>
    </thead>
    `;

    registros.forEach(dato => {
        const { user, answers, time, puntaje, date } = dato;
        console.log(time);

        if (time <= 10) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${user}</td>
            <td>
                <ul>
                    ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                </ul>
            </td>
            <td>${time} Segundos</td>
            <td>${puntaje} puntos</td>
            <td>${date}</td>
        `;
            tabla.appendChild(row);
        }
    });

    div.appendChild(tabla);
    results.appendChild(div);

}
async function verPuntaje() {
    const registros = await obtenerRegistros();
    const div = crearDiv();
    const tabla = document.createElement('table');
    tabla.style.border = '1px solid #a7684f';

    tabla.classList.add('tableResultado');
    tabla.innerHTML = `
    <thead>
        <th>Usuario</th>
        <th>Respuestas</th>
        <th>Tiempo</th>
        <th>Puntaje</th>
        <th>Fecha</th>
    </thead>
    `;

    registros.forEach(dato => {
        const { user, answers, time, puntaje, date } = dato;

        if (puntaje < 7) {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${user}</td>
            <td>
                <ul>
                    ${answers.map(answer => `<li>${answer.answer}</li>`).join('')}
                </ul>
            </td>
            <td>${time} Segundos</td>
            <td>${puntaje} puntos</td>
            <td>${date}</td>
        `;
            tabla.appendChild(row);
        }
    });

    div.appendChild(tabla);
    results.appendChild(div);
}

async function verFallas() {
    //Listado de todos los que han fallado una determinada pregunta
    const registros = await obtenerRegistros();
    const div = crearDiv();
    const divQuestion = document.createElement('div');

    divQuestion.classList.add('navFallas');
    div.classList.add('divFallas');

    div.innerHTML = `
        <h2>Estudiantes con fallas por pregunta</h2>
    `; 0

    for (let i = 0; i < 10; i++) {
        const { answers } = registros[0];
        const { question } = answers[i];

        divQuestion.innerHTML += `
        <nav>
            <h3>Pregunta ${i + 1}: ${question}</h3>
        </nav>
        
        <ul>
            ${registros.filter(dato => dato.answers[i].correct === false).map (dato => `<li>${dato.user}</li>`).join('')}
        </ul>
        `;
        div.appendChild(divQuestion);
    }

    results.appendChild(div);
}

// Eventos
estadisticasGenerales.addEventListener('click', verEstadisticasGenerales);
consultasFecha.addEventListener('click', verConsultasFecha);
practicasPerfectas.addEventListener('click', verPracticasPerfectas);
top10Tiempos.addEventListener('click', verTop10Tiempos);
puntaje.addEventListener('click', verPuntaje);
fallas.addEventListener('click', verFallas);
