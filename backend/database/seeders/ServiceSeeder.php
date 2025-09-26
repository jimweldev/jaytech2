<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service\ServiceCategory;
use App\Models\Service\ServiceFormType;
use App\Models\Service\Service;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create service categories            
        $categories = [
            [
                'label' => 'Phone Repair',
                'slug' => 'phone-repair',
                'description' => 'Repair your phone.',
            ],
            [
                'label' => 'Tablet Repair',
                'slug' => 'tablet-repair',
                'description' => 'Repair your tablet.',
            ],
            [
                'label' => 'Computer Repair',
                'slug' => 'computer-repair',
                'description' => 'Repair your computer.',
            ],
            [
                'label' => 'Smartwatch Repair',
                'slug' => 'smartwatch-repair',
                'description' => 'Repair your smartwatch.',
            ],
            [
                'label' => 'Motherboard Repair',
                'slug' => 'motherboard-repair',
                'description' => 'Repair your motherboard.',
            ],
            [
                'label' => 'Car Upgrade',
                'slug' => 'car-upgrade',
                'description' => 'Upgrade your car.',
            ],
        ];

        ServiceCategory::insert($categories);

        // Create service form types
        $formTypes = [
            [
                'label' => 'Default Form',
            ]
        ];

        ServiceFormType::insert($formTypes);

        // Create services
        $services = [
            [
                'service_category_id' => 1,
                'label' => 'Screen Replacement',
                'slug' => 'screen-replacement',
                'description' => 'Replace the screen of your phone.',
            ],
        ];

        Service::insert($services);
    }
}
