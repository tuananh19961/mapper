<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $table = "provinces";

    public function motels(){
        return $this->hasMany('App\Motel','id_province','id');
    }
}
