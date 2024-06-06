import { nuevoRegistro } from "./api.js";

document.addEventListener('DOMContentLoaded', function () {
    // Variables de configuración
    const questions = obtenerPreguntas();
    const usuario = prompt("¿Cuál es tu nombre?");
    let indicePreguntasActuales = 0;
    let puntaje = 0;
    let horaInicio = new Date();
    let temporizador;
    let usuarioRespuesta = [];

    // Elementos del DOM
    const elementosDOM = obtenerElementosDOM();

    // Inicialización de eventos
    inicializarEventos(elementosDOM);

    // Funciones principales
    function obtenerPreguntas() {
        return [
            { text: "¿Qué significa HTML?", options: ["Lenguaje de marcado de hipertexto", "Lenguaje de máquina de texto alto", "Hipertexto y enlaces Lenguaje de marcado", "Ninguno de esos"], correct: 1 },
            { text: "¿Qué es CSS?", options: ["Hojas de estilo en cascada", "Hojas de estilo de computadora", "Hojas de estilo creativo", "Hojas de estilo coloridas"], correct: 1 },
            { text: "¿Qué significa JS?", options: ["JustScript", "JavaSuper", "JavaScript", "JScript"], correct: 3 },
            { text: "¿Qué es un lenguaje de programación?", options: ["Un lenguaje que los humanos entienden", "Un lenguaje que los animales entienden", "Un lenguaje que los robots entienden", "Un lenguaje que las computadoras entienden"], correct: 4 },
            { text: "¿Qué es un algoritmo?", options: ["Un conjunto de instrucciones para hacer café", "Un conjunto de instrucciones para resolver un problema", "Un conjunto de instrucciones para hacer ejercicio", "Un conjunto de instrucciones para hacer una pizza"], correct: 2 },
            { text: "¿Cual es un framework de JavaScript?", options: ["React", "Spring", "Laravel", "Todas las anteriores"], correct: 1 },
            { text: "¿Qué es un IDE?", options: ["Entorno de desarrollo interactivo", "Entorno de desarrollo inteligente", "Entorno de desarrollo integrado", "Entorno de desarrollo interesante"], correct: 3 },
            { text: "Cual es un sistema operativo?", options: ["Windows", "Linux", "MacOS", "Todas las anteriores"], correct: 4 },
            { text: "¿Qué es un servidor?", options: ["Un ordenador que recibe datos de otros ordenadores", "Un ordenador que no hace nada", "Un ordenador que juega videojuegos", "Un ordenador que proporciona datos a otros ordenadores"], correct: 4 },
            { text: "¿Cual es un lenguaje de programación usado para ciencia de datos?", options: ["Python", "Kotlin", "C++", "JavaScript"], correct: 1}
        ];
    }

    function obtenerElementosDOM() {
        return {
            preguntaNumeroElemento: document.getElementById('question-number'),
            preguntaTextoElemento: document.getElementById('question-text'),
            opcionesElementos: document.querySelectorAll('.option'),
            comentarioElementos: document.getElementById('feedback'),
            enviarBotonRespuesta: document.getElementById('submit-answer'),
            botonSiguientePregunta: document.getElementById('next-question'),
            guardarDatos: document.getElementById('guardarDatos')
        };
    }

    function inicializarEventos(elementos) {
        elementos.opcionesElementos.forEach(button => {
            button.addEventListener('click', () => {
                seleccionarOpcion(button, elementos.opcionesElementos);
            });
        });
        elementos.enviarBotonRespuesta.addEventListener('click', manejarRespuestaEnviar);
        elementos.botonSiguientePregunta.addEventListener('click', siguientePreguntas);
        iniciarTemporizador();
        mostrarPreguntas(indicePreguntasActuales);
    }

    function seleccionarOpcion(button, opcionesElementos) {
        opcionesElementos.forEach(btn => btn.classList.remove('seleccionado'));
        button.classList.add('seleccionado');
    }

    function iniciarTemporizador() {
        const elementoTemporizador = document.createElement('div');
        elementoTemporizador.id = 'timer';
        document.body.prepend(elementoTemporizador);

        temporizador = setInterval(() => {
            const now = new Date();
            const tiempoUsado = Math.round((now - horaInicio) / 1000);
            elementoTemporizador.textContent = `Tiempo: ${tiempoUsado} segundos`;
        }, 1000);
    }

    function detenerTemporizador() {
        clearInterval(temporizador);
        const elementoTemporizador = document.getElementById('timer');
        if (elementoTemporizador) {
            elementoTemporizador.remove();
        }
    }

    function mostrarPreguntas(index) {
        const question = questions[index];
        const { preguntaNumeroElemento, preguntaTextoElemento, opcionesElementos, comentarioElementos, enviarBotonRespuesta, botonSiguientePregunta } = elementosDOM;

        preguntaNumeroElemento.textContent = index + 1;
        preguntaTextoElemento.textContent = question.text;

        opcionesElementos.forEach((button, i) => {
            button.textContent = question.options[i];
            button.classList.remove('correct', 'incorrect');
        });

        comentarioElementos.textContent = '';
        enviarBotonRespuesta.style.display = 'inline-block';
        botonSiguientePregunta.style.display = 'none';
    }

    function manejarRespuestaEnviar() {
        const opcionSeleccionada = document.querySelector('.option.seleccionado');
        if (!opcionSeleccionada) {
            elementosDOM.comentarioElementos.textContent = 'Por favor selecciona una opción.';
            return;
        }

        const respuestaUsuario = parseInt(opcionSeleccionada.dataset.value);
        const respuestaCorrecta = questions[indicePreguntasActuales].correct;

        if (respuestaUsuario === respuestaCorrecta) {
            puntaje++;
            elementosDOM.comentarioElementos.textContent = '¡Correcto!';
            opcionSeleccionada.classList.add('correct');
        } else {
            elementosDOM.comentarioElementos.textContent = '¡Incorrecto!';
            opcionSeleccionada.classList.add('incorrect');
        }

        usuarioRespuesta.push({ question: questions[indicePreguntasActuales].text, answer: opcionSeleccionada.textContent, correct: respuestaUsuario === respuestaCorrecta });

        elementosDOM.enviarBotonRespuesta.style.display = 'none';
        elementosDOM.botonSiguientePregunta.style.display = 'inline-block';
    }

    function siguientePreguntas() {
        indicePreguntasActuales++;
        if (indicePreguntasActuales < questions.length) {
            mostrarPreguntas(indicePreguntasActuales);
        } else {
            const resultData = mostrarResultados();
            //nuevoRegistro(resultData);
            enviarDatos(resultData, elementosDOM.guardarDatos);
        }
    }

    function mostrarResultados() {
        detenerTemporizador();
        const endTime = new Date();
        const tiempoUsado = Math.round((endTime - horaInicio) / 1000); // Tiempo en segundos
        alert(`Usuario: ${usuario}\nEvaluación completada. Puntaje: ${puntaje}/${questions.length}. Tiempo: ${tiempoUsado} segundos.`);

        // Guardar los resultados
        return {
            user: usuario,
            answers: usuarioRespuesta,
            puntaje: puntaje,
            time: tiempoUsado,
            date: new Date().toLocaleDateString()
        };
    }

    function enviarDatos(datos, elemento) {
        /*const btnEnviar = document.createElement('button');
        btnEnviar.textContent = 'Guardar Datos';
        btnEnviar.style.display = 'block';
        btnEnviar.style.margin = '10px auto';
        btnEnviar.style.cursor = 'pointer';
        
        elemento.appendChild(btnEnviar);

        btnEnviar.addEventListener('click', (e) => {
            e.preventDefault();
            
            nuevoRegistro(datos);
        });*/
        
        elementosDOM.botonSiguientePregunta.textContent = 'Ver respuestas correctas';
        elementosDOM.botonSiguientePregunta.style.display = 'block';
        elementosDOM.botonSiguientePregunta.style.margin = '10px auto';
        elementosDOM.botonSiguientePregunta.style.cursor = 'pointer';
    }
});
