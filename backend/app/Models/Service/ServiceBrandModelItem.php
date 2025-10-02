<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceBrandModelItem extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function service_brand_model() {
        return $this->belongsTo(ServiceBrandModel::class);
    }

    public function service_item() {
        return $this->belongsTo(ServiceItem::class);
    }
}
