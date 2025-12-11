<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\Routing\DijkstraPathFinder;
use App\Services\Routing\NetworkGraph;
use Mockery;

class DijkstraTest extends TestCase
{
    public function test_shortest_path_simple(): void
    {
        // Use real NetworkGraph but with mock data?
        // Or integration test with real data?
        // Real data is robust.

        /** @var DijkstraPathFinder $finder */
        $finder = $this->app->make(DijkstraPathFinder::class);

        // MX -> CGE is direct 0.65
        $result = $finder->findShortestPath('MX', 'CGE');
        $this->assertEquals(0.65, $result['distance']);
        $this->assertEquals(['MX', 'CGE'], $result['path']);
    }

    public function test_shortest_path_multistep(): void
    {
        /** @var DijkstraPathFinder $finder */
        $finder = $this->app->make(DijkstraPathFinder::class);

        // MX -> CGE -> VUAR
        // MX-CGE: 0.65, CGE-VUAR: 0.35 => Total 1.00
        $result = $finder->findShortestPath('MX', 'VUAR');
        $this->assertEquals(1.00, $result['distance']);
        $this->assertEquals(['MX', 'CGE', 'VUAR'], $result['path']);
    }

    public function test_longer_path(): void
    {
        /** @var DijkstraPathFinder $finder */
        $finder = $this->app->make(DijkstraPathFinder::class);

        // Test Montreux (MX) to Zweisimmen (ZW)
        // This is a long path across the network.
        $result = $finder->findShortestPath('MX', 'ZW');

        $this->assertNotEmpty($result['path']);
        $this->assertGreaterThan(10, $result['distance']); // Approximate check
        $this->assertEquals('MX', $result['path'][0]);
        $this->assertEquals('ZW', end($result['path']));
    }
}
