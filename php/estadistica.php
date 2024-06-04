<?php
//header('location: ../html/index.html');

$url = "http://localhost:3000/registros";
$content = file_get_contents($url);

if($content === false){
    die("No se pudo cargar el archivo");
}

$registros = json_decode($content, true);

if(json_last_error() !== JSON_ERROR_NONE){
    die("No se pudo decodificar el archivo");
}

$tiempoMaximo = 0;
$tiempoMinimo = 0;
$puntajeObtenido = [0,1,2,3,4,5,6,7,8,9,10];
$puntajesEstudiantes = [0,0,0,0,0,0,0,0,0,0,0];
$cantAciertas = [0,0,0,0,0,0,0,0,0,0];
$cantFallas = [0,0,0,0,0,0,0,0,0,0];

if($registros !== null){
    foreach($registros as $registro){
    
        
        $name = $registro['user'];
        $answers = $registro['answers'];
        $puntaje = $registro['puntaje'];
        $time = $registro['time'];
        $date = $registro['date'];
    
        $file = fopen("../data/{$name}.txt", "w");
        fwrite($file, "Nombre del usuario: {$name}\n\n");
        foreach($answers as $answer){
            fwrite($file, "Pregunta: {$answer['question']}\n");
            fwrite($file, "Respuesta: {$answer['answer']}\n\n");
            //$answer['correct'] ? fwrite($file, "Correcta\n") : fwrite($file, "Incorrecta\n");
        }
        fwrite($file, "Puntos Obtenidos: {$puntaje}\n");
        fwrite($file, "Fecha: {$date}\n");
        fwrite($file, "Tiempo: {$time} segundos\n");
        fclose($file);
    }

    $tiempoMaximo = max(array_column($registros, 'time'));
    $tiempoMinimo = min(array_column($registros, 'time'));

    foreach($registros as $registro){
        $puntajesEstudiantes[$registro['puntaje']]++;
    }

    for ($i=0; $i < count($registros); $i++) { 
        $listAnswers = $registros[$i]['answers'];
        
        for ($j=0; $j < count($listAnswers); $j++) { 
            if($listAnswers[$j]['correct']){
                $cantAciertas[$j]++;
            }else{
                $cantFallas[$j]++;
            }
        }
    }
    

    $estadistica = fopen("../data/Estadisticas.txt", "w");
    fwrite($estadistica, "Cantidad de encuestas realizadas: " . count($registros) . "\n");
    fwrite($estadistica, "Tiempo máximo en resolver: " . $tiempoMaximo . " segundos\n");
    fwrite($estadistica, "Tiempo mínimo en resolver: " . $tiempoMinimo . " segundos\n");
    fwrite($estadistica, "\nCantidad de estudiantes por puntajes correctos\nPunt. Obtenido    Cant. de estudiantes \n     0         ->         {$puntajesEstudiantes[0]}\n     1         ->         {$puntajesEstudiantes[1]}\n     2         ->         {$puntajesEstudiantes[2]}\n     3         ->         {$puntajesEstudiantes[3]}\n     4         ->         {$puntajesEstudiantes[4]}\n     5         ->         {$puntajesEstudiantes[5]}\n     6         ->         {$puntajesEstudiantes[6]}\n     7         ->         {$puntajesEstudiantes[7]}\n     8         ->         {$puntajesEstudiantes[8]}\n     9         ->         {$puntajesEstudiantes[9]}\n    10         ->         {$puntajesEstudiantes[10]}\n");
    fwrite($estadistica, "\nEstadisticas de aciertos y fallas\nPregunta  Aciertos  Fallas \n    1        {$cantAciertas[0]}         {$cantFallas[0]}\n    2        {$cantAciertas[1]}         {$cantFallas[1]}\n    3        {$cantAciertas[2]}         {$cantFallas[2]}\n    4        {$cantAciertas[3]}         {$cantFallas[3]}\n    5        {$cantAciertas[4]}         {$cantFallas[4]}\n    6        {$cantAciertas[5]}         {$cantFallas[5]}\n    7        {$cantAciertas[6]}         {$cantFallas[6]}\n    8        {$cantAciertas[7]}         {$cantFallas[7]}\n    9        {$cantAciertas[8]}         {$cantFallas[8]}\n   10        {$cantAciertas[9]}         {$cantFallas[9]}\n");
    fclose($estadistica);
    
} 
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/estadisticas.css">
</head>

<body>
    <header>
        <h1>Web Educativa</h1>
    </header>
    
    <main>
        <section class="section-estadisticas">
            <div class="estadisticas-title">
                <h2>Estadísticas de las prácticas</h2>
            </div>

            <div class="estadisticas-content">
                <div class="estadisticas-content-item" id="practCompletadas">
                    <h3>Cantidad de prácticas completadas</h3>
                    <?php echo "<p>" . count($registros) . "</p>"; ?>
                </div>
                <div class="estadisticas-content-item" id="tiempoMinimo">
                    <h3>Tiempo mínimo en resolver</h3>
                    <?php echo "<p>" . $tiempoMinimo . " Segundos</p>"; ?>
                </div>
                <div class="estadisticas-content-item" id="tiempoMaximo">
                    <h3>Tiempo máximo en resolver</h3>
                    <?php echo "<p>" . $tiempoMaximo . " Segundos</p>"; ?>
                </div>
            </div>
        </section>

        <section class="section-charts">
            <div>
                hola mundo
            </div>
        </section>
        
        <button onclick="location.href='index.html'">Volver al Inicio</button>
    </main>

    <script type="module" src="../js/estadisticas.js"></script>
</body>

</html>