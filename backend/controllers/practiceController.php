<?php

class PracticeController {

    private $resultsFilePath = '../data/practiceResults.txt';

    public function savePracticeResult($data) {
        $resultString = "
Usuario: {$data['user']}
Respuestas:
";
        foreach ($data['answers'] as $index => $answer) {
            $resultString .= ($index + 1) . ". $answer\n";
        }

        $resultString .= "Puntos obtenidos: {$data['score']}\n";
        $resultString .= "Fecha y Hora: " . date('Y-m-d H:i:s') . "\n";
        $resultString .= "Tiempo en minutos: " . round($data['timeSpent'] / 60) . "\n\n";

        file_put_contents($this->resultsFilePath, $resultString, FILE_APPEND);
    }

    public function getAllPracticeResults() {
        $results = file_get_contents($this->resultsFilePath);
        return explode("\n\n", trim($results));
    }

    public function getPracticeResultsByDate($dateString) {
        $allResults = file_get_contents($this->resultsFilePath);
        $resultsByDate = preg_split("/\n\n(?=Usuario:)/", $allResults);
        
        $filteredResults = array_filter($resultsByDate, function($result) use ($dateString) {
            return strpos($result, "Fecha y Hora: $dateString") !== false;
        });

        return $filteredResults;
    }
}

?>
