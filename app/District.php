<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    protected $table = "districts";

    public function motels(){
        return $this->hasMany('App\Motel','id_district','id');
    }
}
