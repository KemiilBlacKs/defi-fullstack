<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Route extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'from_station_id',
        'to_station_id',
        'analytic_code',
        'distance_km',
        'path',
    ];

    protected $casts = [
        'path' => 'array',
        'distance_km' => 'float',
    ];
    //
}
