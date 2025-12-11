<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\Routing\NetworkGraph;
use App\Services\Routing\Station;

class NetworkGraphTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_loading_data(): void
    {
        /** @var NetworkGraph $graph */
        $graph = $this->app->make(NetworkGraph::class);

        $stations = $graph->getAllStations();
        $this->assertNotEmpty($stations);

        // Assert specific stations exist (from provided JSON)
        $this->assertArrayHasKey('MX', $stations);
        $this->assertArrayHasKey('ZW', $stations);

        $mx = $graph->getStation('MX');
        $this->assertEquals('Montreux', $mx->longName);
    }

    public function test_graph_edges(): void
    {
        /** @var NetworkGraph $graph */
        $graph = $this->app->make(NetworkGraph::class);

        // MX -> CGE (0.65)
        $neighbors = $graph->getNeighbors('MX');
        $this->assertArrayHasKey('CGE', $neighbors);
        $this->assertEquals(0.65, $neighbors['CGE']);

        // Undirected check: CGE -> MX should exist
        $cgeNeighbors = $graph->getNeighbors('CGE');
        $this->assertArrayHasKey('MX', $cgeNeighbors);
        $this->assertEquals(0.65, $cgeNeighbors['MX']);
    }
}
