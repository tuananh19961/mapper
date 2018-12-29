<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('provinces', 'API\ProvinceController');    

Route::get('districts/{id_district}/fillter','API\DistrictController@filldistrict');
Route::resource('districts', 'API\DistrictController');    

Route::get('motels/fill/{id_province}/{id_district?}','API\MotelController@fillter');
Route::resource('motels', 'API\MotelController'); 
Auth::routes();