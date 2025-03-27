<?php

namespace App\Http\Controllers;

use App\Models\SpeedDetection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpeedDetectionController extends Controller
{
    public function index()
    {
        $speedDetections = SpeedDetection::latest()->get();
        return Inertia::render('SpeedDetections/Index', [
            'speedDetections' => $speedDetections
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'timestamp' => 'required|date',
            'last_speed' => 'required|numeric',
            'speed_limit' => 'required|numeric'
        ]);

        // Jika kecepatan 0, tidak perlu disimpan
        if ($validated['last_speed'] == 0) {
            return ;
        }

        // Cek data terakhir
        $lastRecord = SpeedDetection::latest('timestamp')->first();

        // Jika ada data sebelumnya dan kecepatannya sama, tidak perlu disimpan
        if ($lastRecord && $lastRecord->last_speed == $validated['last_speed']) {
            return ;
        }

        // Jika lolos semua validasi, simpan data
        SpeedDetection::create($validated);

        return ;
    }

    public function show(SpeedDetection $speedDetection)
    {
        return Inertia::render('Dashboard', [
            'speedDetection' => SpeedDetection::orderBy('id', 'desc')->get()
        ]);
    }

    public function update(Request $request, SpeedDetection $speedDetection)
    {
        $validated = $request->validate([
            'timestamp' => 'required|date',
            'last_speed' => 'required|numeric',
            'speed_limit' => 'required|numeric'
        ]);

        // Cek jika kecepatan baru adalah 0
        if ($validated['last_speed'] == 0) {
            return response()->json([
                'message' => 'Kecepatan tidak bisa diupdate menjadi 0'
            ], 422);
        }

        $existingSpeed = SpeedDetection::where('id', '!=', $speedDetection->id)
            ->where('last_speed', $validated['last_speed'])
            ->exists();

        if ($existingSpeed) {
            return response()->json([
                'message' => 'Kecepatan sama dengan data yang sudah ada'
            ], 422);
        }

        $speedDetection->update($validated);

        return response()->json([
            'message' => 'Data kecepatan berhasil diperbarui'
        ], 200);
    }

    public function destroy(SpeedDetection $speedDetection)
    {
        $speedDetection->delete();

        return response()->json([
            'message' => 'Data kecepatan berhasil dihapus'
        ], 200);
    }

    // Method tambahan untuk mendapatkan kecepatan terakhir
    public function getLastSpeed()
    {
        $lastSpeed = SpeedDetection::latest('timestamp')->first();
        return response()->json([
            'last_speed' => $lastSpeed ? $lastSpeed->last_speed : 0
        ]);
    }
    public function destroyAll(Request $request, SpeedDetection $speedDetection){
        $speedDetection->truncate();
        
    }
}