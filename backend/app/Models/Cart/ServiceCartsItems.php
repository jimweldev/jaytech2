<?php

namespace App\Models\Cart;

use Illuminate\Database\Eloquent\Model;
use App\Models\Service\ServiceBrandModelItem;

class ServiceCartsItems extends Model
{
    protected $table = 'service_cart_items';

    protected $guarded = ['id', 'created_at', 'updated_at'];

    // Each cart item belongs to a specific cart
    public function cart()
    {
        return $this->belongsTo(ServiceCarts::class, 'service_cart_id', 'id');
    }

    // Each cart item references a specific model item
    public function model_item()
    {
        return $this->belongsTo(ServiceBrandModelItem::class, 'service_brand_model_item_id', 'id');
    }
}
