<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceVoucher extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];
}
