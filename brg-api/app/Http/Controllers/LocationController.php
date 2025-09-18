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
        $validated = $request->validate([
            'number' => 'required|string|unique:locations,number|regex:/^\d+$/',
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20|regex:/^\d*$/',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|size:2|alpha',
            'zip' => 'required|string|max:10|regex:/^\d{5}(-\d{4})?$/',
            'construction' => 'required|boolean',
            'open' => 'required|boolean',
        ]);

        // Optionally trim string fields
        $validated = array_map(function($value) {
            return is_string($value) ? trim($value) : $value;
        }, $validated);

        $location = Location::create($validated);
        return response()->json($location, 201);
    }

    public function update(Request $request, $number)
    {
        $location = Location::where('number', $number)->first();

        if (!$location) {
            return response()->json(['message' => 'Store not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20|regex:/^\d*$/',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|size:2|alpha',
            'zip' => 'required|string|max:10|regex:/^\d{5}(-\d{4})?$/',
            'construction' => 'required|boolean',
            'open' => 'required|boolean',
        ]);

        $validated = array_map(function($value) {
            return is_string($value) ? trim($value) : $value;
        }, $validated);

        $location->update($validated);

        return response()->json($location, 200);
    }

    public function destroy($number)
    {
        $location = Location::where('number', $number)->first();

        if (!$location) {
            return response()->json(['message' => 'Store not found'], 404);
        }

        $location->delete();

        return response()->json(['message' => 'Store deleted'], 200);
    }
}

