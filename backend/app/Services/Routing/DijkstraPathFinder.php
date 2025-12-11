<?php

namespace App\Services\Routing;

use RuntimeException;

class DijkstraPathFinder
{
    public function __construct(
        private readonly NetworkGraph $graph
    ) {}

    /**
     * Calcule le plus court chemin entre deux stations.
     *
     * @return array{distance: float, path: string[]}
     * @throws RuntimeException Si le chemin n'est pas trouvé ou si les stations sont invalides
     */
    public function findShortestPath(string $startNode, string $endNode): array
    {
        $allStations = $this->graph->getAllStations();

        if (!isset($allStations[$startNode]) || !isset($allStations[$endNode])) {
            throw new RuntimeException("Codes de station invalides : $startNode, $endNode");
        }

        // Algorithme de Dijkstra
        $distances = [];
        $previous = [];
        $queue = new \SplPriorityQueue();

        foreach ($allStations as $code => $station) {
            $distances[$code] = INF;
            $previous[$code] = null;
        }

        $distances[$startNode] = 0;
        // La file de priorité stocke [distance, noeud]. Distance faible = Priorité haute.
        // SplPriorityQueue extrait le max, donc on utilise une distance négative.
        $queue->insert($startNode, 0);

        $visited = [];

        while (!$queue->isEmpty()) {
            $u = $queue->extract();

            if (isset($visited[$u])) {

                continue;
            }
            $visited[$u] = true;

            if ($u === $endNode) {

                break;
            }

            $currentDist = $distances[$u];
            if ($currentDist === INF) {

                break; // Les noeuds restants sont inaccessibles
            }

            $neighbors = $this->graph->getNeighbors($u);
            foreach ($neighbors as $v => $weight) {
                if (isset($visited[$v])) {

                    continue;
                }

                $alt = $currentDist + $weight;
                if ($alt < $distances[$v]) {
                    $distances[$v] = $alt;
                    $previous[$v] = $u;
                    $queue->insert($v, -$alt);
                }
            }
        }

        if ($distances[$endNode] === INF) {
            throw new RuntimeException("Aucun chemin trouvé entre $startNode et $endNode");
        }

        // Reconstruction du chemin
        $path = [];
        $u = $endNode;
        while (isset($previous[$u]) || $u === $startNode) {
            array_unshift($path, $u);
            $u = $previous[$u];
            if ($u === null) break;
        }

        return [
            'distance' => $distances[$endNode],
            'path' => $path
        ];
    }
}
