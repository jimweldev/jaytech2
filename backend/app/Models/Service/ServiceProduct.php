<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class ServiceProduct extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function service() {
        return $this->hasOne(Service::class, 'id', 'service_id');
    }
}
