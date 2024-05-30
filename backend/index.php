<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas de Prácticas Educativas</title>
    <link rel="stylesheet" href="../css/styles2.css">
</head>
<body>
    <div class="container">
        <h1>Estadísticas de Prácticas Educativas</h1>

        <div class="statistics">
            <h2>Estadística General</h2>
            <?php
                require_once 'controllers/practiceController.php';
                require_once 'utils/statistics.php';

                $practiceController = new PracticeController();
                $statistics = new Statistics();

                $allResults = $practiceController->getAllPracticeResults();
                $parsedResults = $statistics->parseResults($allResults);
                $generalStats = $statistics->getGeneralStatistics($parsedResults);

                echo "<p>Cantidad de prácticas completadas: {$generalStats['totalPractices']}</p>";
                echo "<p>Tiempo máximo en resolver: {$generalStats['maxTime']} minutos</p>";
                echo "<p>Tiempo mínimo en resolver: {$generalStats['minTime']} minutos</p>";
                echo "<p>Cantidad de estudiantes por puntajes correctos:</p>";
                echo "<ul>";
                foreach ($generalStats['studentsByScores'] as $score => $count) {
                    echo "<li>Puntaje $score: $count estudiantes</li>";
                }
                echo "</ul>";
            ?>
        </div>

        <div class="queries">
            <h2>Consultas</h2>
            <form action="" method="get">
                <label for="date">Estadísticas por fecha:</label>
                <input type="date" id="date" name="date">
                <button type="submit">Consultar</button>
            </form>
            <?php
                if (isset($_GET['date'])) {
                    $date = $_GET['date'];
                    $resultsByDate = $practiceController->getPracticeResultsByDate($date);
                    if (!empty($resultsByDate)) {
                        $parsedResultsByDate = $statistics->parseResults($resultsByDate);
                        $statsByDate = $statistics->getGeneralStatistics($parsedResultsByDate);

                        echo "<h3>Estadísticas para la fecha $date</h3>";
                        echo "<p>Cantidad de prácticas completadas: {$statsByDate['totalPractices']}</p>";
                        echo "<p>Tiempo máximo en resolver: {$statsByDate['maxTime']} minutos</p>";
                        echo "<p>Tiempo mínimo en resolver: {$statsByDate['minTime']} minutos</p>";
                        echo "<p>Cantidad de estudiantes por puntajes correctos:</p>";
                        echo "<ul>";
                        foreach ($statsByDate['studentsByScores'] as $score => $count) {
                            echo "<li>Puntaje $score: $count estudiantes</li>";
                        }
                        echo "</ul>";
                    } else {
                        echo "<p>No hay resultados para la fecha $date.</p>";
                    }
                }
            ?>
        </div>

        <div class="queries">
            <h2>Lista de Estudiantes con Práctica Perfecta</h2>
            <?php
                $perfectScoreStudents = $statistics->getStudentsWithPerfectScore($parsedResults);
                if (!empty($perfectScoreStudents)) {
                    echo "<ul>";
                    foreach ($perfectScoreStudents as $student) {
                        echo "<li>{$student['user']}</li>";
                    }
                    echo "</ul>";
                } else {
                    echo "<p>No hay estudiantes con práctica perfecta.</p>";
                }
            ?>
        </div>

        <div class="queries">
            <h2>Lista de los 10 Estudiantes más Rápidos</h2>
            <?php
                $top10FastestStudents = $statistics->getTop10FastestStudents($parsedResults);
                if (!empty($top10FastestStudents)) {
                    echo "<ol>";
                    foreach ($top10FastestStudents as $index => $student) {
                        echo "<li>{$student['user']} - Tiempo: {$student['timeTaken']} minutos</li>";
                    }
                    echo "</ol>";
                } else {
                    echo "<p>No hay estudiantes con resultados suficientes para mostrar.</p>";
                }
            ?>
        </div>

        <div class="queries">
            <h2>Lista de Estudiantes con Puntajes Inferiores a 7</h2>
            <?php
                $studentsBelowScore7 = $statistics->getStudentsWithScoreBelow($parsedResults, 7);
                if (!empty($studentsBelowScore7)) {
                    echo "<ul>";
                    foreach ($studentsBelowScore7 as $student) {
                        echo "<li>{$student['user']} - Puntaje: {$student['score']}</li>";
                    }
                    echo "</ul>";
                } else {
                    echo "<p>No hay estudiantes con puntajes inferiores a 7.</p>";
                }
            ?>
        </div>

        <div class="queries">
            <h2>Lista de Estudiantes que Han Fallado la Pregunta 2</h2>
            <?php
                $studentsWhoFailedQuestion = $statistics->getStudentsWhoFailedQuestion($parsedResults, 2);
                if (!empty($studentsWhoFailedQuestion)) {
                    echo "<ul>";
                    foreach ($studentsWhoFailedQuestion as $student) {
                        echo "<li>{$student['user']} - Respuestas: {$student['answers']}</li>";
                    }
                    echo "</ul>";
                } else {
                    echo "<p>No hay estudiantes que hayan fallado la pregunta 2.</p>";
                }
            ?>
        </div>
    </div>
</body>
</html>
