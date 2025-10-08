<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('service_brand_model_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_brand_model_id')->constrained('service_brand_models')->onDelete('cascade');
            $table->string('label');
            $table->decimal('price', 10, 2);
            $table->text('details')->nullable();
            $table->string('warranty')->nullable();
            $table->boolean('has_appointment')->default(true);
            $table->string('form_type')->default('default_form');
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('service_brand_model_items');
    }
};
