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
                    ,'name'
                    ,'date'
                    ,'num'
                    ,'active'
    
                    ,'type_id'
                    ,'author_id'
                    ,'topic_id'
                                    );
	return implode ( ',', $columns );
}

 
$grid_connector->mix("open", 1);
//$gantt->filter("smeta_id","1");
//$gantt->enable_order("sortorder");
$grid_connector->render_table("docs","id",getTaskColumns(),"" );

?>
