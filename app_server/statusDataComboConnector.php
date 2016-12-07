<?php
 
include('db.php');
//include('db_library.php');
include ('combo_connector.php');
include ('db_pdo.php');

 
$data = new ComboConnector($res, "PDO");
$data->enable_log("Log",true);
$data->render_table("statuses","id","name");


