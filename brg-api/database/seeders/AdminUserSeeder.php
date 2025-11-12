<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        $email = env('ADMIN_EMAIL', 'admin@brg.com');
        $password = env('ADMIN_PASSWORD', 'admin123');
        
        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'Admin User',
                'email' => $email,
                'password' => Hash::make($password),
            ]
        );
    }
}