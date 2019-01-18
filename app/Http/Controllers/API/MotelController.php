<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Motel;
use App\Detail;
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
            $query->select('id','_name','_prefix');}])->where('id_province','=',3)->get();
        return response() -> json($motel);
    }

    public function fillter($id_province, $id_district = null){
        if($id_district == null){
            $motel = Motel::with([
            'details',
            'provinces' => function($query){
                $query->select('id','_name');
            },
            'districts'=> function($query){
                $query->select('id','_name','_prefix');
            }
            ])->where('id_province','=',$id_province)->get();
        }
        else{
            $motel = Motel::with([
                'details',
                'provinces' => function($query){
                    $query->select('id','_name');
                },
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

       $motel = new Motel();
       $motel->id_user = $request->get('id_user');
       $motel->id_district = $request->get('district');
       $motel->id_province = $request->get('province');
       $motel->address = $request->get('address');
       $motel->title = $request->get('title');
       $motel->description = $request->get('description');
       $motel->num_room = $request->get('room');
       $motel->area = $request->get('area');
       $motel->price = $request->get('price');
       $motel->latitude = $request->get('latitude');
       $motel->longitude = $request->get('longitude');
       $motel->save();
    
       
       if($request->hasfile('images'))
         {
            foreach($request->file('images') as $file)
            {
                $detail = new Detail();
                $origin = $file->getClientOriginalName();
                $name = str_random(5)."_".$origin;
                while(file_exists("upload/motel/".$name)){
                    $name = str_random(5)."_".$origin;
                }
                $file->move(public_path().'/upload/motel/', $name);   
                $detail->id_motel = $motel->id;
                $detail->image = $name;
                $detail->save();
            }
        }else{
            $detail->id_motel = $motel->id;
            $detail->image = '1.jpg';
            $detail->save();
        }

        return response() -> json('Success!');
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
