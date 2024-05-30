<?php

class Statistics {

    public function parseResults($results) {
        $parsedResults = [];
        
        foreach ($results as $result) {
            preg_match("/Usuario: (.*)/", $result, $matches);
            $user = $matches[1];

            preg_match("/Respuestas:(.*)Puntos obtenidos: (\d+)/s", $result, $matches);
            $answers = trim($matches[1]);
            $score = (int) $matches[2];

            preg_match("/Fecha y Hora: (.*)/", $result, $matches);
            $dateTime = $matches[1];

            preg_match("/Tiempo en minutos: (\d+)/", $result, $matches);
            $timeTaken = (int) $matches[1];

            $parsedResults[] = [
                'user' => $user,
                'answers' => $answers,
                'score' => $score,
                'dateTime' => $dateTime,
                'timeTaken' => $timeTaken
            ];
        }

        return $parsedResults;
    }

    public function getGeneralStatistics($parsedResults) {
        $totalPractices = count($parsedResults);
        
        $maxTime = max(array_column($parsedResults, 'timeTaken'));
        $minTime = min(array_column($parsedResults, 'timeTaken'));

        $studentsByScores = array_count_values(array_column($parsedResults, 'score'));

        return [
            'totalPractices' => $totalPractices,
            'maxTime' => $maxTime,
            'minTime' => $minTime,
            'studentsByScores' => $studentsByScores
        ];
    }

    public function getStudentsWithPerfectScore($parsedResults) {
        return array_filter($parsedResults, function($result) {
            return $result['score'] === 3; // Ajustar según el puntaje máximo posible
        });
    }

    public function getTop10FastestStudents($parsedResults) {
        usort($parsedResults, function($a, $b) {
            return $a['timeTaken'] - $b['timeTaken'];
        });
        return array_slice($parsedResults, 0, 10);
    }

    public function getStudentsWithScoreBelow($parsedResults, $threshold) {
        return array_filter($parsedResults, function($result) use ($threshold) {
            return $result['score'] < $threshold;
        });
    }

    public function getStudentsWhoFailedQuestion($parsedResults, $questionNumber) {
        return array_filter($parsedResults, function($result) use ($questionNumber) {
            return strpos($result['answers'], "$questionNumber. Incorrecta") !== false;
        });
    }
}

?>
