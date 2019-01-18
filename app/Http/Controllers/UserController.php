<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use JWTAuthException;
use Hash;
use Validator;
use Illuminate\Support\Facades\Mail;
use DateTime;

class UserController extends Controller
{
    private $user;

    public function __construct(User $user){
        $this->user = $user;
    }

    // LOGIN FUNCTION
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token = null;

        $credentials['is_verified'] = 1;

        try {
           if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['Sai email hoặc mật khẩu hoặc bạn chưa kích hoạt tài khoản!'], 422);
           }
        } catch (JWTAthException $e) {
            return response()->json(['failed_to_create_token'], 500);
        }
            if($token != null){
                $user = User::where('email', $request->email)->get()->first();
                $user->remember_token = $token;
                $user->save();
            }
            return response()->json(compact('token'));
    }


    // REGISTER FUNCTION
    public function register(Request $request){
        $credentials = $request->only('name', 'email', 'password','phone');

        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|unique:users'
        ];

        $validator = Validator::make($credentials, $rules);

        if($validator->fails()) {

            $error = $validator->messages();
            // $error sẽ trả ra email.unique

            return response()->json(['success'=> false, 'error'=> 'Email đã được sử dụng!'], 401);
        }
        else
        {
            $name = $request->get('name');
            $email = $request->get('email');
            $password = $request->get('password');
            $phone = $request->get('phone');
    
            $user = $this->user->create([
              'name' => $name,
              'email' => $email,
              'phone' => $phone,
              'password' => Hash::make($password)
            ]);
    
            $verification_code = str_random(30);
            $this->user->where('id','=',$user->id)->update(['remember_token' => $verification_code]);
    
            $subject = "Please verify your email address.";
            Mail::send('email.verify', ['name' => $name, 'verification_code' => $verification_code],
                function($mail) use ($email, $name, $subject){
                    $mail->to($email, $name);
                    $mail->subject($subject);
                });
    
            return response()->json(['success'=> true, 'message'=> 'Thanks for signing up! Please check your email to complete your registration.'],200);
        }  
    }

    // GET INFO USER BY TOKEN
    public function getUserInfo(Request $request){
        $user = JWTAuth::toUser($request->token);
        return response()->json(['result' => $user]);
    }

    // LOGOUT 
    public function logout(Request $request) {
        $this->validate($request, ['token' => 'required']);
        
        try {

            $user = User::where('remember_token','=',$request->token)->first();
            if($user){
                $user->remember_token = null;
                $user->save();
                JWTAuth::invalidate($request->input('token'));
                return response()->json(['success' => true, 'message'=> "You have successfully logged out."]);
            } 

        } catch (JWTException $e) {
            return response()->json(['success' => false, 'message' => 'Failed to logout, please try again.'], 500);
        }
    }

    //  VERIFY FUNCTION
    public function verifyUser($verification_code)
    { 
        $check = $this->user->where('remember_token','=',$verification_code)->first();
        if(!is_null($check)){
            if($check->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }
            $now = new DateTime();

            $check->email_verified_at = $now;
            $check->is_verified = 1;
            $check->remember_token = null;
            $check->save();

            $message = 'You have successfully verified your email address.';
            $success = true;
            return view('email.result',compact(['message','success']));
        }else{
            $message = 'Verification code is invalid.';
            $success = false;
            return view('email.result',compact(['message','success']));
        } 
    }
}
