<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'v1', 'as' => 'api.'], function () {
    Route::post('auth/login', 'Auth\AuthController@login')->name('auth.login');

    Route::group(['middleware' => 'auth'], function () {

        Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
            Route::get('me', 'AuthController@me')->name('auth.me');
            Route::post('logout', 'AuthController@logout')->name('auth.logout');
        });

        Route::resource('employees', 'EmployeeController')->except('create', 'edit');
    });
});
