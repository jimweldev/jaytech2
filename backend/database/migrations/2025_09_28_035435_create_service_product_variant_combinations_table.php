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
        Schema::create('service_product_variant_combinations', function (Blueprint $table) {
            $table->id();

            // Shorter foreign key names
            $table->unsignedBigInteger('service_product_variant_id');
            $table->unsignedBigInteger('service_product_variant_value_id');

            $table->foreign('service_product_variant_id', 'spvc_variant_fk')
                ->references('id')
                ->on('service_product_variants')
                ->onDelete('cascade');

            $table->foreign('service_product_variant_value_id', 'spvc_value_fk')
                ->references('id')
                ->on('service_product_variant_values')
                ->onDelete('cascade');

            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();

            // compound index for faster lookups
            $table->index(['service_product_variant_id', 'service_product_variant_value_id'], 'variant_value_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_product_variant_combinations');
    }
};
