<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        return response()->json(Location::all(), 200);
    }

    public function store(Request $request)
    {
        $location = Location::create($request->all());
        return response()->json($location, 201);
    }
}

