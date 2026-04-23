<?php

use Illuminate\Support\Facades\Route;
use App\Models\SeoSetting;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/{any?}', function () {
    return view('admin');
})->where('any', '.*');

Route::get('/robots.txt', function () {
    $robots = SeoSetting::where('key', 'robots_txt')->first();
    return response($robots ? $robots->value : "User-agent: *\nDisallow:", 200)
        ->header('Content-Type', 'text/plain');
});

Route::get('/sitemap.xml', function () {
    $sitemap = SeoSetting::where('key', 'sitemap_xml')->first();
    return response($sitemap ? $sitemap->value : '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', 200)
        ->header('Content-Type', 'application/xml');
});

