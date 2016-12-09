<?php
 
include('db.php');
include ('grid_connector.php');
include ('db_pdo.php');

$grid_connector = new GridConnector($res, "PDO");
$grid_connector->enable_log("Log",true);
$grid_connector->event->attach("beforeProcessing",'handleBeforeProcessing');

function getTaskColumns() {
	$columns = array (
                    'file'
                    ,'topic_name'
                    ,'status_name'
                    ,'author_name'
                    ,'type_name'
                    ,'name'
                    ,'date'
                    ,'num'
                  );
	return implode ( ',', $columns );
}


function custom_filter($filter_by){
    if (!sizeof($filter_by->rules)) {
      $filter_by->add("docs.name","%".$_GET['name']."%","LIKE");
      $filter_by->add("topic_id",     $_GET['topic_id'],"LIKE");
      $filter_by->add("status_id",    $_GET['status_id'],"LIKE");
      $filter_by->add("author_id",    $_GET['author_id'],"LIKE");
      $filter_by->add("type_id",      $_GET['type_id'],"LIKE");
      $filter_by->add("num",          $_GET['num'],"LIKE");
      $filter_by->add("date",         $_GET['date'],"LIKE");     
    }
}
if(isset($_GET['search'])){
  $grid_connector->event->attach("beforeFilter","custom_filter");
}




function dateRange_filter($data){
  if(isset($_GET['dateStart']) && $_GET['dateStart'] != ''){
    if ($data->get_value("date") < $_GET['dateStart']){$data->skip();}
  }
  if(isset($_GET['dateStart']) && $_GET['dateEnd'] != ''){
    if ($data->get_value("date") > $_GET['dateEnd']){$data->skip();}
  }  
         //not include into output
}
$grid_connector->event->attach("beforeRender","dateRange_filter");


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





$sql = "
  SELECT 
   docs.id
  ,file
  ,tcs.name as topic_name
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
  LEFT JOIN topics as tcs ON docs.topic_id = tcs.id
  ";

//используется для первоначального отображения грида
if(isset($_GET['limit'])){
  $grid_connector->set_limit($_GET['limit']);
  $grid_connector->sort('date','DESC');
  $grid_connector->render_sql($sql, 'id', getTaskColumns());
}


$ids = array('default');
if (isset($_REQUEST['ids'])){
  if (preg_match ("/,/", $_REQUEST['ids'])) {
      $ids = explode(",",$_REQUEST['ids']);
  } else {
      $ids[0] = $_REQUEST['ids'];
  }  
}

foreach ( $ids as $value ) {
  $action = $value."_!nativeeditor_status";

  switch ( $_REQUEST[$action] ) {
    case 'updated':
      $grid_connector->render_table('docs', 'id', getTaskColumns());
      break;
    case 'deleted':
      $grid_connector->render_table('docs', 'id', getTaskColumns());
      break;
    default:
      $grid_connector->render_sql($sql, 'id', getTaskColumns());
      break;
  }  
}






function handleBeforeProcessing($action){

$res = new PDO ( "mysql:dbname=" . DB_DATABASE . ";host=" . DB_HOST, DB_USER, DB_PASSWORD );
$connector = new Connector($res, "PDO");
//$temp->configure("some_table");
  
  $fieldArray = array( 'status_name'=> array('table'=>'statuses','field'=>'status_id')
                      ,'author_name'=> array('table'=>'authors','field'=>'author_id')
                      ,'type_name'=>   array('table'=>'types','field'=>'type_id')
                      ,'topic_name'=>   array('table'=>'topics','field'=>'topic_id')
  );
  foreach ( $fieldArray as $key => $value ) {

    $result = $connector->sql->query("SELECT id FROM ".$value['table']." WHERE name='".$action->get_value($key)."'");
    $data = $connector->sql->get_next($result);

    $action->add_field($value['field'],$data['id']);
    $action->set_value($value['field'],$data['id']);
    $action->remove_field($key,$action->get_value($key));
  }

//  $action->success(); //завершение процесс коннектора
}

?>
