<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>

<div style="text-align:center">
    @if($success == true)
        <h1>THANK YOU!</h1>
    @else
        <h1>SORRY!</h1>
    @endif

    <br>
        @if($success == true)
        <b style="color:#38c172">{{$message}}</b>
        @else
        <b style="color:red">{{$message}}</b>
        @endif
    <br>

    <p>Please click on the link below to comback home page.</p>

    <br>

    <a href="{{ url('/')}}">Come back home page!</a>

    <br/>
</div>

</body>
</html>