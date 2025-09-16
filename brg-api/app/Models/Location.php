<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'number', 'name', 'phone', 'latitude', 'longitude', 'address', 'city', 'state', 'zip', 'open', 'construction'
    ];
}
