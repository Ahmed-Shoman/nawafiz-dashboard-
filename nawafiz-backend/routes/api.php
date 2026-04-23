<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ContactSubmissionController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\SeoSettingController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\TestimonialController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes (no auth required)
|--------------------------------------------------------------------------
*/
Route::get('/sections', [SectionController::class, 'index']);
Route::get('/sections/{key}', [SectionController::class, 'show']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{slug}', [ServiceController::class, 'show']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);
Route::get('/seo', [SeoSettingController::class, 'index']);
Route::get('/settings', [SiteSettingController::class, 'index']);
Route::post('/contact', [ContactSubmissionController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
Route::post('/admin/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Admin API Routes (auth required)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Sections
    Route::get('/sections', [SectionController::class, 'adminIndex']);
    Route::put('/sections/{key}', [SectionController::class, 'update']);

    // Services
    Route::get('/services', [ServiceController::class, 'adminIndex']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Projects
    Route::get('/projects', [ProjectController::class, 'adminIndex']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    // Testimonials
    Route::get('/testimonials', [TestimonialController::class, 'adminIndex']);
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

    // Blogs
    Route::get('/blogs', [BlogController::class, 'adminIndex']);
    Route::get('/blogs/{id}', [BlogController::class, 'adminShow']);
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);

    // SEO Settings
    Route::get('/seo', [SeoSettingController::class, 'adminIndex']);
    Route::put('/seo', [SeoSettingController::class, 'update']);

    // Site Settings
    Route::get('/settings', [SiteSettingController::class, 'adminIndex']);
    Route::put('/settings', [SiteSettingController::class, 'update']);

    // Contact Submissions
    Route::get('/contact-submissions', [ContactSubmissionController::class, 'index']);
    Route::put('/contact-submissions/{id}/read', [ContactSubmissionController::class, 'markRead']);
    Route::delete('/contact-submissions/{id}', [ContactSubmissionController::class, 'destroy']);

    // Media
    Route::post('/upload', [MediaController::class, 'upload']);
    Route::delete('/media', [MediaController::class, 'destroy']);
});
