<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'first_name' => 'Malda',
            'last_name' => 'Motuma',
            'email' => 'maldamotuma@gmail.com',
            'username' => 'malda',
            'password' => '1ADMIN1.malda',
            'is_super' => 1
        ]);
    }
}
