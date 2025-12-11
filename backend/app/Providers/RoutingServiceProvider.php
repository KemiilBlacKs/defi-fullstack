<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Routing\NetworkGraph;

class RoutingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(NetworkGraph::class, function ($app) {

            return new NetworkGraph(
                '/app_data/stations.json',
                '/app_data/distances.json'
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
