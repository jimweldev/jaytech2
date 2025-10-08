<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('service_bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');

            $table->unsignedBigInteger('service_booking_drop_point_technician_id');
            $table->foreign('service_booking_drop_point_technician_id', 'sb_dp_tech_fk')
                ->references('id')
                ->on('service_booking_drop_point_technicians')
                ->onDelete('cascade');

            $table->string('tracking_number')->unique();

            // Brand, Model, Item
            $table->foreignId('service_brand_id')->nullable()->constrained('service_brands')->onDelete('cascade');
            $table->foreignId('service_brand_model_id')->nullable()->constrained('service_brand_models')->onDelete('cascade');
            $table->foreignId('service_brand_model_item_id')->nullable()->constrained('service_brand_model_items')->onDelete('cascade');

            // Other Brand, Model, Item
            $table->string('service_brand_other')->nullable();
            $table->string('service_brand_model_other')->nullable();
            $table->string('service_brand_model_item_other')->nullable();

            $table->string('booking_type')->nullable(); // book an appointment/choose a drop point

            $table->text('details')->nullable();
            $table->string('status')->default('Pending');
            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('service_bookings');
    }
};
