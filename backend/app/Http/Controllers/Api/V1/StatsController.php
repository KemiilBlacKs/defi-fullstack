<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Route;


class StatsController extends Controller
{
    public function index(Request $request)
    {
        $query = Route::query();

        if ($request->has('from')) {
            $query->whereDate('created_at', '>=', $request->input('from'));
        }
        if ($request->has('to')) {
            $query->whereDate('created_at', '<=', $request->input('to'));
        }

        // Agrégation de base par analytic_code
        $stats = $query->selectRaw('analytic_code, SUM(distance_km) as total_distance_km, MIN(created_at) as first_date, MAX(created_at) as last_date')
            ->groupBy('analytic_code')
            ->get();

        $items = $stats->map(function ($stat) {
            return [
                'analyticCode' => $stat->analytic_code,
                'totalDistanceKm' => (float) $stat->total_distance_km,
                'periodStart' => $stat->first_date, // Simplifié
                'periodEnd' => $stat->last_date,     // Simplifié
            ];
        });

        return response()->json([
            'from' => $request->input('from'),
            'to' => $request->input('to'),
            'groupBy' => $request->input('groupBy', 'none'),
            'items' => $items,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
