<?php
 
include('db.php');
//include('db_library.php');
include ('combo_connector.php');
include ('db_pdo.php');

$data = new ComboConnector($res, "PDO");
$data->enable_log("Log",true);


 if(isset($_REQUEST['mode'])){
   switch ( $_REQUEST['mode'] ) {
    case 'name':
      $data->render_table("authors","name","name");
       break;
    default:
      $data->render_table("authors","id","name");
       break; 
   }
 }




