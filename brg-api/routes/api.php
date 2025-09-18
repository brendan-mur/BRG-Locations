<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocationController;

Route::middleware('api')->group(function () {
    Route::get('/locations', [LocationController::class, 'index']);
    Route::post('/locations', [LocationController::class, 'store']);
    Route::put('/locations/{number}', [LocationController::class, 'update']);
    Route::delete('/locations/{number}', [LocationController::class, 'destroy']);
});