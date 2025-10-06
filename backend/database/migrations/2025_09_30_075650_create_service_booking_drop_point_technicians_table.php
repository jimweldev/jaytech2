<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('service_booking_drop_point_technicians', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED ✅

            $table->unsignedBigInteger('technician_id');
            $table->foreign('technician_id', 'sbpt_tech_fk')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();

            $table->unsignedBigInteger('service_booking_drop_point_id');
            $table->foreign('service_booking_drop_point_id', 'sbpt_drop_point_fk')
                ->references('id')
                ->on('service_booking_drop_points')
                ->cascadeOnDelete();

            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id', 'sbpt_service_fk')
                ->references('id')
                ->on('services')
                ->cascadeOnDelete();

            $table->softDeletes();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    public function down(): void {
        Schema::dropIfExists('service_booking_drop_point_technicians');
    }
};
