<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ServiceProductVariant extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function product() {
        return $this->hasOne(ServiceProduct::class, 'id', 'product_id');
    }
}
