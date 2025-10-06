<?php

namespace Database\Seeders;

use App\Models\Core\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        // admin
        User::factory()->create([
            'first_name' => 'Admin',
            'middle_name' => null,
            'last_name' => 'JayTech',
            'suffix' => null,
            'email' => 'admin@gmail.com',
            'is_admin' => true,
            'password' => Hash::make('P@ssword123!'),
            'account_type' => 'Main',
        ]);

        // technician
        User::factory()->create([
            'first_name' => 'Technician',
            'middle_name' => null,
            'last_name' => 'JayTech',
            'suffix' => null,
            'email' => 'technician@gmail.com',
            'is_admin' => false,
            'password' => Hash::make('P@ssword123!'),
            'account_type' => 'Technician',
        ]);

        // customer
        User::factory()->create([
            'first_name' => 'Customer',
            'middle_name' => null,
            'last_name' => 'JayTech',
            'suffix' => null,
            'email' => 'customer@gmail.com',
            'is_admin' => false,
            'password' => Hash::make('P@ssword123!'),
            'account_type' => 'Customer',
        ]);

        // reseller
        User::factory()->create([
            'first_name' => 'Reseller',
            'middle_name' => null,
            'last_name' => 'JayTech',
            'suffix' => null,
            'email' => 'reseller@gmail.com',
            'is_admin' => false,
            'password' => Hash::make('P@ssword123!'),
            'account_type' => 'Reseller',
        ]);

        // agent
        User::factory()->create([
            'first_name' => 'Agent',
            'middle_name' => null,
            'last_name' => 'JayTech',
            'suffix' => null,
            'email' => 'agent@gmail.com',
            'is_admin' => false,
            'password' => Hash::make('P@ssword123!'),
            'account_type' => 'Agent',
        ]);

        // Run the database seeds
        $this->call([
            MailTemplateSeeder::class,
        ]);
        $this->call([
            NotificationSeeder::class,
        ]);
        // $this->call([
        //     ServiceSeeder::class,
        // ]);
        $this->call([
            SystemSettingSeeder::class,
        ]);
    }
}
