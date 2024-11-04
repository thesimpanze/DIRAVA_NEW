<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SpeedDetection extends Model
{
    protected $fillable = [
        'timestamp',
        'last_speed',
        'speed_limit'
    ];

    protected $casts = [
        'timestamp' => 'datetime',
        'last_speed' => 'float',
        'speed_limit' => 'float'
    ];
}
