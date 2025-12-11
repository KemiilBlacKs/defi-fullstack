<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\Routing\DijkstraPathFinder;
use App\Services\Routing\NetworkGraph;
use Mockery;

class DijkstraPathFinderTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
    }

    public function test_it_finds_shortest_path()
    {
        // Setup a simple graph mock
        // A --(10)--> B --(10)--> C
        // A --(50)--> C

        $graph = Mockery::mock(NetworkGraph::class);

        $graph->shouldReceive('getAllStations')->andReturn([
            'A' => [], 'B' => [], 'C' => []
        ]);

        $graph->shouldReceive('getNeighbors')->with('A')->andReturn(['B' => 10, 'C' => 50]);
        $graph->shouldReceive('getNeighbors')->with('B')->andReturn(['C' => 10, 'A' => 10]);
        $graph->shouldReceive('getNeighbors')->with('C')->andReturn(['B' => 10, 'A' => 50]);

        $dijkstra = new DijkstraPathFinder($graph);
        $result = $dijkstra->findShortestPath('A', 'C');

        $this->assertEquals(20, $result['distance']);
        $this->assertEquals(['A', 'B', 'C'], $result['path']);
    }

    public function test_it_throws_exception_for_invalid_stations()
    {
        $graph = Mockery::mock(NetworkGraph::class);
        $graph->shouldReceive('getAllStations')->andReturn(['A' => []]);

        $dijkstra = new DijkstraPathFinder($graph);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Codes de station invalides');

        $dijkstra->findShortestPath('A', 'Z');
    }

    public function test_it_throws_exception_if_no_path_found()
    {
        // A and B are disconnected
        $graph = Mockery::mock(NetworkGraph::class);

        $graph->shouldReceive('getAllStations')->andReturn([
            'A' => [], 'B' => []
        ]);

        $graph->shouldReceive('getNeighbors')->with('A')->andReturn([]);

        $dijkstra = new DijkstraPathFinder($graph);

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Aucun chemin trouvé');

        $dijkstra->findShortestPath('A', 'B');
    }
}
