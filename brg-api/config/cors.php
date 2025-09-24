<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ensure both paths are included
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // Your frontend's exact origin
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // <-- THIS IS CRITICAL
];