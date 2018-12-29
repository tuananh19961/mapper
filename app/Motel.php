<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Motel extends Model
{
    protected $table = "motels";

    public function provinces(){
        return $this->belongsTo('App\Province','id_province','id');
    }

    public function districts(){
        return $this->belongsTo('App\District','id_district','id');
    }

    public function details(){
        return $this->hasMany('App\Detail','id_motel','id');
    }
    
    public function users(){
        return $this->belongsTo('App\User','id_user','id');
    }

}
