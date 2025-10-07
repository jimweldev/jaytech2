<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Model;
use App\Models\Service\ServiceBrandModel;
use App\Models\Cart\ServiceCartsItems;

class ServiceCarts extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function service_brand_model()
    {
        return $this->belongsTo(ServiceBrandModel::class);
    }

    public function items()
    {
        return $this->hasMany(ServiceCartsItems::class, 'service_cart_id', 'id');
    }
}
