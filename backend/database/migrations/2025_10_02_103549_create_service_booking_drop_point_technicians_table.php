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
        Schema::create('service_booking_drop_point_technicians', function (Blueprint $table) {
            $table->id();

            $table->foreignId('technician_id')
                ->constrained('users', 'id')
                ->cascadeOnDelete();

            $table->foreignId('service_booking_drop_point_id');

            $table->foreignId('service_id')
                ->constrained('services', 'id')
                ->cascadeOnDelete();

            $table->foreign('service_booking_drop_point_id', 'sbdpu_sbdp_id_foreign')
                ->references('id')
                ->on('service_booking_drop_points')
                ->cascadeOnDelete();

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
        Schema::dropIfExists('service_booking_drop_point_users');
    }
};
