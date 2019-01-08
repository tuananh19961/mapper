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

Route::get('motels/fillter/{id_province}/{id_district?}','API\MotelController@fillter');
Route::resource('motels', 'API\MotelController'); 

// USER API
Route::post('auth/register', 'UserController@register');
Route::post('auth/login', 'UserController@login');
Route::get('user/verify/{verification_code}', 'UserController@verifyUser');

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('user-info', 'UserController@getUserInfo');
    Route::get('user-logout', 'UserController@logout');
});

Auth::routes();