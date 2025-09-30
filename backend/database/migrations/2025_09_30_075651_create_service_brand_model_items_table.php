<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_brand_model_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_brand_model_id')->constrained('service_brand_models')->onDelete('cascade');
            $table->foreignId('service_item_id')->constrained('service_items')->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_brand_model_items');
    }
};
