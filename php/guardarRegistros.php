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

echo "<pre>";
print_r($registros);
echo "</pre>";

// Iterarar Registros y hacer un archivo txt con los datos
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
    


    foreach($registro['answers'] as $answer){
        echo "<p>{$answer['answer']}</p>";
        $answer['correct'] ? print("Correcta") : print("Incorrecta");
    }
}

?>

