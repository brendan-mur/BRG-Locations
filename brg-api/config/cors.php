<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ensure both paths are included
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',    // Docker frontend port
        'http://localhost:5173',   // Vite dev server port
        'http://127.0.0.1:3000',   // Alternative localhost
        'http://127.0.0.1:5173',   // Alternative localhost
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // <-- THIS IS CRITICAL
];