<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('service_cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_cart_id')->constrained('service_carts')->onDelete('cascade');
            $table->foreignId('service_brand_model_item_id')->constrained('service_brand_model_items')->onDelete('cascade');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('service_cart_items');
    }
};
