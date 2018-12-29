<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    protected $table = "details";

    public function motels(){
        return $this->belongsTo('App\Motel','id_motel','id');
    }
}
