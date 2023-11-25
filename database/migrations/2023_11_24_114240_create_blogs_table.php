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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->foreignId("admin_id")->nullable();
            $table->foreignId("user_id")->nullable();
            $table->foreignId("category_id");
            $table->string("title");
            $table->text("article");
            $table->longText("body");
            $table->string("image")->nullable();
            $table->text("meta_keywords");
            $table->boolean("is_active")->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
