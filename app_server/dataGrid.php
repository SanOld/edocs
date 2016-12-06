<?php
 
include('db.php');
//include('db_library.php');
include ('grid_connector.php');
include ('db_pdo.php');

// print_r($_REQUEST);
//
// die();




$grid_connector = new GridConnector($res, "PDO");
$grid_connector->enable_log("Log",true);





function getTaskColumns() {
	$columns = array (
                    'file'
                    ,'type_id'
                    ,'status_name'
                    ,'author_name'
                    ,'type_name'
                    ,'name'
                    ,'date'
                    ,'num'
                  );
	return implode ( ',', $columns );
}

//$gantt->filter("smeta_id","1");
//$gantt->enable_order("sortorder");

//$grid_connector->render_table("docs","id",getTaskColumns(),"" );

$filter1 = new OptionsConnector($res);
$filter1->render_table("types","id","name");
$grid_connector->set_options("type_id",$filter1);

$filter2 = new OptionsConnector($res);
$filter2->render_table("statuses","id","name");
$grid_connector->set_options("status_id",$filter2);

$filter3 = new OptionsConnector($res);
$filter3->render_table("authors","id","name");
$grid_connector->set_options("author_id",$filter3);

$filter4 = new OptionsConnector($res);
$filter4->render_table("topics","id","name");
$grid_connector->set_options("topic_id",$filter4);

 
//$grid_connector->render_table("docs","id",getTaskColumns());

//



$sql = "
  SELECT 
   docs.id
  ,file
  ,type_id
  ,sts.name as status_name 
  ,aus.name as author_name
  ,tps.name as type_name
  ,docs.name
  ,date
  ,num
  FROM docs
  LEFT JOIN statuses as sts ON docs.status_id = sts.id
  LEFT JOIN types as tps ON docs.type_id = tps.id
  LEFT JOIN authors as aus ON docs.author_id = aus.id
  ";


$action = $_REQUEST['ids']."_!nativeeditor_status";

switch ( $_REQUEST[$action] ) {
  case 'updated':
    $grid_connector->render_sql($sql, 'id', getTaskColumns());
    break;
  case 'deleted':
    $grid_connector->render_table('docs', 'id', getTaskColumns());
    break;

  default:
    $grid_connector->render_sql($sql, 'id', getTaskColumns());
    break;
}

?>
