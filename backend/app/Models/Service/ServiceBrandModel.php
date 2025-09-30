<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ServiceBrandModel extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // belongs to ServiceBrand;
    public function service_brand() {
        return $this->belongsTo(ServiceBrand::class);
    }

    // belongs to ServiceBrandCategory;
    public function service_brand_category() {
        return $this->belongsTo(ServiceBrandCategory::class);
    }
}
