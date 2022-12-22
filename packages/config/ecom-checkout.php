<?php

return [

    'logo' => [
        "regular" => [ "src" => "/assets/images/logo.jpg", "width" => "85px", "height" => "85px" ],
        "compact" => [ "src" => "/assets/images/logo-compact.png", "width" => "40px", "height" => "40px;" ],
    ],

    //this key is required for addresses with long/lat selection
    'google_maps_key' => env('GOOGLE_MAPS_KEY'),
    'boostrap_css' => [
        "en" => '/css/main-en.css',
        "ar" => '/css/main-ar.css',
    ]

];
