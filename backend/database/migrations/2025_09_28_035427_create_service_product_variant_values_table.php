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
        Schema::create('service_product_variant_values', function (Blueprint $table) {
        $table->id();

        // Create the column manually
        $table->unsignedBigInteger('service_product_variant_attribute_id');

        // Add a shorter named FK
        $table->foreign('service_product_variant_attribute_id', 'spv_attr_fk')
            ->references('id')
            ->on('service_product_variant_attributes')
            ->onDelete('cascade');

        $table->string('value')->index();
        $table->unsignedInteger('display_order')->default(1);
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
        Schema::dropIfExists('service_product_variant_values');
    }
};
