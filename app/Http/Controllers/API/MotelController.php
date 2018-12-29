<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Motel;
class MotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $motel = Motel::with(['details',
        'provinces' => function($query){
            $query->select('id','_name');}
        ,
        'districts'=> function($query){
            $query->select('id','_name','_prefix');}])->get();
        return response() -> json($motel);
    }

    public function fillter($id_province, $id_district = null){
        if($id_district == null){
            $motel = Motel::with([
            'provinces' => function($query){
                $query->select('id','_name');
            }
            ])->where('id_province','=',$id_province)->get();
        }
        else{
            $motel = Motel::with([
                'provinces' => function($query){
                    $query->select('id','_name');}
                ,
                'districts'=> function($query){
                    $query->select('id','_name','_prefix');}
                ])
                ->where('id_province','=',$id_province)->where('id_district','=',$id_district)->get();
        }
        return response() -> json($motel);  
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   
        $motel = Motel::with(['users','details','districts','provinces'])->find($id);
        return response() ->json($motel);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
