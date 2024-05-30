document.addEventListener('DOMContentLoaded', function () {
    const questions = [
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

    const usuario = prompt("¿Cual es tu nombre?");
    let indicePreguntasActuales = 0;
    let puntaje = 0;
    let horaInicio = new Date();
    let temporizador;
    let usuarioRespuesta = [];

    const preguntaNumeroElemento = document.getElementById('question-number');
    const preguntaTextoElemento = document.getElementById('question-text');
    const opcionesElementos = document.querySelectorAll('.option');
    const comentarioElementos = document.getElementById('feedback');
    const enviarBotonRespuesta = document.getElementById('submit-answer');
    const botonSiguientePregunta = document.getElementById('next-question');

    opcionesElementos.forEach( button => {
        button.addEventListener('click', () => {
            opcionesElementos.forEach(btn => btn.classList.remove('seleccionado'));
            button.classList.add('seleccionado');
        });
    });

    function horaInicior() {
        const elementoTemporizador = document.createElement('div');
        elementoTemporizador.id = 'timer';  
        document.body.prepend(elementoTemporizador);

        temporizador = setInterval(() => {
            const now = new Date();
            const tiempoUsado = Math.round((now - horaInicio) / 1000);
            elementoTemporizador.textContent = `Tiempo: ${tiempoUsado} segundos`;
        }, 1000);
    }

    function limpiarIntervalo(intervalo) {
        clearInterval(intervalo);
        const elementoTemporizador = document.getElementById('timer');
        if (elementoTemporizador) {
            elementoTemporizador.remove();
        }
    }

    function detenerTemporizador() {
        limpiarIntervalo(temporizador);
    }

    function mostrarPreguntas(index) {
        const question = questions[index];

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
        const opcionSeleccionada = document.querySelector('.option.selected');
        if (!opcionSeleccionada) {
            comentarioElementos.textContent = 'Por favor selecciona una opción.';
            return;
        }

        const respuestaUsuario = parseInt(opcionSeleccionada.dataset.value);
        const respuestaCorrecta = questions[indicePreguntasActuales].correct;

        if (respuestaUsuario === respuestaCorrecta) {
            puntaje++;
            comentarioElementos.textContent = 'Correcto!';
            opcionSeleccionada.classList.add('correct');
        } else {
            comentarioElementos.textContent = 'Incorrecto!';
            opcionSeleccionada.classList.add('incorrect');
        }

        usuarioRespuesta.push({ question: questions[indicePreguntasActuales].text, answer: opcionSeleccionada.textContent, correct: respuestaUsuario === respuestaCorrecta });

        enviarBotonRespuesta.style.display = 'none';
        botonSiguientePregunta.style.display = 'inline-block';
    }

    function siguientePreguntas() {
        indicePreguntasActuales++;
        if (indicePreguntasActuales < questions.length) {
            mostrarPreguntas(indicePreguntasActuales);
        } else {
            mostrarResultados();
        }
    }

    function mostrarResultados() {
        detenerTemporizador();
        const endTime = new Date();
        const tiempoUsado = Math.round((endTime - horaInicio) / 1000); // Tiempo en segundos
        alert(`Evaluación completada. Puntaje: ${puntaje}/${questions.length}. Tiempo: ${tiempoUsado} segundos.`);
        // Aquí puedes redirigir a la página de resultados o mostrar un resumen

        // Guardar los resultados
        const resultData = {
            user: usuario, 
            answers: usuarioRespuesta,
            puntaje: puntaje,
            time: tiempoUsado,
            date: new Date().toLocaleString()
        };
        localStorage.setItem('resultData', JSON.stringify(resultData));
    }

    opcionesElementos.forEach(button => {
        button.addEventListener('click', () => {
            opcionesElementos.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    enviarBotonRespuesta.addEventListener('click', manejarRespuestaEnviar);
    botonSiguientePregunta.addEventListener('click', siguientePreguntas);

    horaInicior();
    mostrarPreguntas(indicePreguntasActuales);
});
