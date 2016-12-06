<?php
include('config.php');
include('auth.php');
include('app_server/db.php');
//include('db_library.php');
include ('app_server/grid_connector.php');
include ('app_server/db_pdo.php');

// print_r($_REQUEST);
//
// die();
 
$grid_connector = new GridConnector($res, "PDO");
$grid_connector->enable_log("Log",true);

//авторизация временная
$auth = new Auth();
switch ( $auth->type ) {
  case 'admin':
$grid_connector->sql('');

    break;

  default:
    break;
}