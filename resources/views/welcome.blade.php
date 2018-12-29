<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <base href="{{asset('')}}"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- The above 4 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Title  -->
    <title>Motel Map | Choose your way</title>

    <!-- Favicon  -->
    <link rel="icon" href="/client/img/core-img/favicon.ico">

    <!-- Core Style CSS -->
    <link rel="stylesheet" href="/client/css/core-style.css">
    <link rel="stylesheet" type="text/css" href="/client/css/style.css">
   
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
   
    <link rel="stylesheet" href="/client/css/custom.css">
    </head>
    <body class="overlay-active">
         <div id="app"></div>

         <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>

         <script src="/client/js/jquery/jquery-2.2.4.min.js"></script>
        <!-- Popper js -->
        <script src="/client/js/popper.min.js"></script>
        <!-- Bootstrap js -->
        <script src="/client/js/bootstrap.min.js"></script>
        <!-- Plugins js -->
        <script src="/client/js/plugins.js"></script>
        <!-- Classy Nav js -->
        <script src="/client/js/classy-nav.min.js"></script>
        <!-- Active js -->
        <script src="/client/js/active.js"></script>
    </body>
</html>
