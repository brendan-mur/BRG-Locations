<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\AuthController; // Add this

// --- Public Routes ---
// These routes are accessible without authentication.
Route::post('/login', [AuthController::class, 'login']);
Route::get('/locations', [LocationController::class, 'index']);
// --- Protected Routes ---
// These routes require a valid Sanctum token to be accessed.
Route::middleware('auth:sanctum')->group(function () {
    // Logout route is protected because we need to know which user is logging out.
    Route::post('/logout', [AuthController::class, 'logout']);

    // All your location management routes go here.
    Route::post('/locations', [LocationController::class, 'store']);
    Route::put('/locations/{number}', [LocationController::class, 'update']);
    Route::delete('/locations/{number}', [LocationController::class, 'destroy']);
});