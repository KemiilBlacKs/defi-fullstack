<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Route;

class ApiRoutesTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_calculate_route_success(): void
    {
        $payload = [
            'fromStationId' => 'MX',
            'toStationId' => 'ZW',
            'analyticCode' => 'TEST-01',
        ];

        $response = $this->postJson('/api/v1/routes', $payload);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'from_station_id',
                'to_station_id',
                'analytic_code',
                'distance_km',
                'path',
                'created_at',
            ]);

        $this->assertDatabaseHas('routes', [
            'from_station_id' => 'MX',
            'to_station_id' => 'ZW',
            'analytic_code' => 'TEST-01',
        ]);
    }

    public function test_calculate_route_invalid_station(): void
    {
        $payload = [
            'fromStationId' => 'UNKNOWN',
            'toStationId' => 'ZW',
            'analyticCode' => 'TEST-02',
        ];

        $response = $this->postJson('/api/v1/routes', $payload);

        $response->assertStatus(422);
    }

    public function test_get_stats_aggregation(): void
    {
        // Seed some data
        Route::create([
            'from_station_id' => 'MX',
            'to_station_id' => 'CGE',
            'analytic_code' => 'ANA-A',
            'distance_km' => 0.65,
            'path' => ['MX', 'CGE'],
            'created_at' => now()->subDay(),
        ]);

        Route::create([
            'from_station_id' => 'MX',
            'to_station_id' => 'CGE', // Short distance
            'analytic_code' => 'ANA-A',
            'distance_km' => 0.65,
            'path' => ['MX', 'CGE'],
            'created_at' => now(),
        ]);

        Route::create([
            'from_station_id' => 'ZW',
            'to_station_id' => 'MX',
            'analytic_code' => 'ANA-B',
            'distance_km' => 10.0,
            'path' => ['ZW', 'MX'],
            'created_at' => now(),
        ]);

        $r1 = Route::first();
        if (abs($r1->distance_km - 0.65) > 0.001) {
             throw new \Exception("Persistence failed: Expected 0.65, got {$r1->distance_km}");
        }

        // dump(Route::all()->toArray());

        $response = $this->getJson('/api/v1/stats/distances');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'analyticCode' => 'ANA-A',
                'totalDistanceKm' => 1.3,
            ])
            ->assertJsonFragment([
                'analyticCode' => 'ANA-B',
                'totalDistanceKm' => 10.0,
            ]);
    }
}
