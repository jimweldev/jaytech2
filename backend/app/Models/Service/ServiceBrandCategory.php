<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceBrandCategory extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function service_brand() {
        return $this->belongsTo(ServiceBrand::class);
    }

    public function service() {
        return $this->belongsTo(Service::class);
    }
}
