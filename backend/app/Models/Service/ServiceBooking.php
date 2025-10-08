<?php

namespace App\Models\Service;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Core\User;

class ServiceBooking extends Model {
    use SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    public function customer() {
        return $this->belongsTo(User::class);
    }

    public function service_brand_model() {
        return $this->belongsTo(ServiceBrandModel::class);
    }

    public function service_booking_drop_point_technician() {
        return $this->belongsTo(ServiceBookingDropPointTechnician::class);
    }

    public function service_booking_drop_point() {
        return $this->hasMany(ServiceBookingDropPoint::class);
    }
}
