<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function service_brands() {
        return $this->belongsToMany(ServiceBrand::class, 'service_brand_categories')
            ->withTimestamps()
            ->withPivot('id');
    }
}
