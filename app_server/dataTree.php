<?php

include('db.php');
//include('db_library.php');
include ('treegroup_connector.php');
include ('data_connector.php');
include ('db_pdo.php');

$table = (isset($_REQUEST['table'])) ? $_REQUEST['table'] : 'types';


//$tree->render_table("docs","id",getTaskColumns(),"","type_id" );
$details = new JSONDataConnector($res);
$details->configure("docs","id","name","","");


$tree = new TreeGroupConnector($res, "PDO");
$tree->enable_log("Log",true);

//$tree->render_sql("Select *, docs.name as doc_name from docs, types  where  docs.type_id=types.id", 
//    "id","docs.name(doc_name)","","types.name");

//function formatting($row){
//
////  
//    $row->set_userdata("some_data",$row->get_value("name"));
//     print_r($row[]);die();
//}
//
//$tree->event->attach("beforeRender","formatting");


$tree->render_sql(
    "SELECT t1.id,t1.parent, t1.name as leaf_name, t2.name as node_name, t2.id as parent
    FROM ".$table." as t1
    INNER JOIN ".$table." as t2 
    ON t1.parent = t2.id",
    "id","t1.id(leaf_name)","","t2.name");
?>

 
