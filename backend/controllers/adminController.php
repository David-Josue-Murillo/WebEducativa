<?php

class AdminController {

    private $resultsFilePath = '../data/practiceResults.txt';

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

    public function getStudentsWithPerfectScore() {
        $results = file_get_contents($this->resultsFilePath);
        $resultsByUser = preg_split("/\n\n(?=Usuario:)/", $results);

        $perfectScoreStudents = array_filter($resultsByUser, function($result) {
            return strpos($result, "Puntos obtenidos: 3") !== false; // Ajustar según el puntaje máximo posible
        });

        return $perfectScoreStudents;
    }

    public function getTop10FastestStudents() {
        $results = file_get_contents($this->resultsFilePath);
        $resultsByUser = preg_split("/\n\n(?=Usuario:)/", $results);

        usort($resultsByUser, function($a, $b) {
            preg_match("/Tiempo en minutos: (\d+)/", $a, $matchesA);
            preg_match("/Tiempo en minutos: (\d+)/", $b, $matchesB);
            $timeA = (int) $matchesA[1];
            $timeB = (int) $matchesB[1];
            return $timeA - $timeB;
        });

        return array_slice($resultsByUser, 0, 10);
    }

    public function getStudentsWithScoreBelow($threshold) {
        $results = file_get_contents($this->resultsFilePath);
        $resultsByUser = preg_split("/\n\n(?=Usuario:)/", $results);

        $studentsBelowScore = array_filter($resultsByUser, function($result) use ($threshold) {
            preg_match("/Puntos obtenidos: (\d+)/", $result, $matches);
            $score = (int) $matches[1];
            return $score < $threshold;
        });

        return $studentsBelowScore;
    }

    public function getStudentsWhoFailedQuestion($questionNumber) {
        $results = file_get_contents($this->resultsFilePath);
        $resultsByUser = preg_split("/\n\n(?=Usuario:)/", $results);

        $studentsWhoFailed = array_filter($resultsByUser, function($result) use ($questionNumber) {
            return strpos($result, "$questionNumber. Incorrecta") !== false;
        });

        return $studentsWhoFailed;
    }
}

?>
