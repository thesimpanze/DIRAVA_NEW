<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpeedDetectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('SpeedDetectorDashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/showSpeed', [SpeedDetectionController::class, 'show'])->middleware(['auth', 'verified'])->name('speed.show');
Route::get('/home', function(){
    return Inertia::render('SpeedDetectorDashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});
Route::post('/speed-detection', [SpeedDetectionController::class, 'store'])->name('speed.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::post('/deleteAll', [SpeedDetectionController::class, 'destroyAll'])->name('deleteAll');
require __DIR__.'/auth.php';
