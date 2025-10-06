<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\Models\Core\User;

class ServiceClaimedVoucher extends Model {
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function service_voucher() {
        return $this->belongsTo(ServiceVoucher::class);
    }

    public function customer() {
        return $this->belongsTo(User::class);
    }
}
