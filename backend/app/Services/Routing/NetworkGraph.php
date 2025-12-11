<?php

namespace App\Services\Routing;

use Illuminate\Support\Facades\Log;

class NetworkGraph
{
    /** @var array<string, Station> Indexé par shortName */
    private array $stations = [];

    /** @var array<string, array<string, float>> Liste d'adjacence : [from => [to => distance]] */
    private array $adjacencyList = [];

    public function __construct(
        private readonly string $stationsPath,
        private readonly string $distancesPath
    ) {
        $this->loadData();
    }

    private function loadData(): void
    {
        if (!file_exists($this->stationsPath) || !file_exists($this->distancesPath)) {
            Log::error("Fichiers de données introuvables", [
                'stations' => $this->stationsPath,
                'distances' => $this->distancesPath
            ]);

            return;
        }

        $stationsData = json_decode(file_get_contents($this->stationsPath), true);
        foreach ($stationsData as $s) {
            $station = Station::fromArray($s);
            $this->stations[$station->shortName] = $station;
        }

        $distancesData = json_decode(file_get_contents($this->distancesPath), true);
        foreach ($distancesData as $network) {
            foreach ($network['distances'] as $edge) {
                $from = $edge['parent'];
                $to = $edge['child'];
                $dist = (float) $edge['distance'];

                // Le graphe est non-orienté pour les trains car les lignes vont dans les deux sens.
                // Le JSON utilise "parent" et "child", suggérant une hiérarchie ou direction.
                // Cependant, les trains peuvent revenir en arrière.
                // On suppose un graphe NON-ORIENTÉ.

                $this->addEdge($from, $to, $dist);
                $this->addEdge($to, $from, $dist);
            }
        }
    }

    private function addEdge(string $from, string $to, float $distance): void
    {
        if (!isset($this->stations[$from]) || !isset($this->stations[$to])) {
            Log::warning("Arête ignorée avec une station inconnue : $from -> $to");

            return;
        }
        $this->adjacencyList[$from][$to] = $distance;
    }

    public function getStation(string $shortName): ?Station
    {
        return $this->stations[$shortName] ?? null;
    }

    public function getNeighbors(string $shortName): array
    {
        return $this->adjacencyList[$shortName] ?? [];
    }

    public function getAllStations(): array
    {
        return $this->stations;
    }
}
