<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceBrand extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function services() {
        return $this->belongsToMany(Service::class, 'service_brand_categories')
            ->withTimestamps()
            ->withPivot('id');
    }

    // service_brand_categories
    public function service_brand_categories() {
        return $this->hasMany(ServiceBrandCategory::class);
    }

    public function models() {
        return $this->hasManyThrough(
            ServiceBrandModel::class,
            ServiceBrandCategory::class,
            'service_brand_id',
            'service_brand_category_id',
            'id',
            'id'
        );
    }
}
