<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\RouteController;
use App\Http\Controllers\Api\V1\StatsController;

Route::prefix('v1')->group(function () {
    Route::post('/routes', [RouteController::class, 'store']);
    Route::get('/stats/distances', [StatsController::class, 'index']);
});
