<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ServiceProductVariantCombination extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    // service_product_variant
    public function service_product_variant() {
        return $this->belongsTo(ServiceProductVariant::class, 'service_product_variant_id', 'id');
    }

    // service_product_variant_value
    public function service_product_variant_value() {
        return $this->belongsTo(ServiceProductVariantValue::class, 'service_product_variant_value_id', 'id');
    }
}
