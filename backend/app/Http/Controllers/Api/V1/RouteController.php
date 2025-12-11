<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreateRouteRequest;
use App\Services\Routing\DijkstraPathFinder;
use App\Models\Route;


class RouteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function store(CreateRouteRequest $request, DijkstraPathFinder $dijkstra)
    {
        try {
            $from = $request->input('fromStationId');
            $to = $request->input('toStationId');
            $code = $request->input('analyticCode');

            $result = $dijkstra->findShortestPath($from, $to);

            $route = Route::create([
                'from_station_id' => $from,
                'to_station_id' => $to,
                'analytic_code' => $code,
                'distance_km' => $result['distance'],
                'path' => $result['path'],
            ]);

            return response()->json($route, 201);

        } catch (\RuntimeException $e) {
            // Distinguer entre station invalide et aucun chemin ?
            // Message "Codes de station invalides" dans Dijkstra
            return response()->json([
                'message' => $e->getMessage(),
                'code' => 'INVALID_REQUEST'
            ], 422);
        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Internal Error',
                'details' => [$e->getMessage()]
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
