<?php
define('BASE_PATH', dirname(__DIR__) . "/");
define('UPLOAD_PATH', BASE_PATH . "upload/");
define('ENV', 'prod'); //prod or dev

switch ( ENV ) {
  case 'prod':
    define('DB_HOST', 'innakhx4.beget.tech');
    define('DB_USER', 'innakhx4_edocs'); 
    define('DB_PASSWORD', 'ygNhDVlE');
    define('DB_DATABASE', 'innakhx4_edocs');  
    break;
  case 'dev':
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root'); 
    define('DB_PASSWORD', ''); 
    define('DB_DATABASE', 'expert');
    break;
}






