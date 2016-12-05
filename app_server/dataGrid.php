<?php
 
include('db.php');
//include('db_library.php');
include ('grid_connector.php');
include ('db_pdo.php');

 
$grid_connector = new GridConnector($res, "PDO");
$grid_connector->enable_log("Log",true);
function getTaskColumns() {
	$columns = array (
                    'file'
                    ,'type_id'
                    ,'name'
                    ,'date'
                    ,'num'
                    ,'active'
    
                    
                    ,'author_id'
                    ,'topic_id'
                                    );
	return implode ( ',', $columns );
}

 function color_rows($row){
//$row[data:protected]
//die();
}
 
$grid_connector->event->attach("beforeRender","color_rows");


$grid_connector->mix("open", 1);
//$gantt->filter("smeta_id","1");
//$gantt->enable_order("sortorder");

$grid_connector->render_table("docs","id",getTaskColumns(),"" );


?>
