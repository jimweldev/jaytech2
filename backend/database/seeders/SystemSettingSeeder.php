<?php

namespace Database\Seeders;

use App\Models\System\SystemSetting;

use Illuminate\Database\Seeder;

class SystemSettingSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        try {
            SystemSetting::create([
                'label' => 'Default Checkup Price',
                'value' => '5.00',
                'notes' => 'This is the default price for a checkup.',
            ]);
        } catch (\Throwable $th) {
            // throw $th;
        }
    }
}
