<?php
 
include('db.php');
include ('grid_connector.php');
include ('db_pdo.php');

$grid_connector = new GridConnector($res, "PDO");
$grid_connector->enable_log("Log",true);

$grid_connector->event->attach("beforeProcessing",'handleBeforeProcessing');
$grid_connector->event->attach("beforeRender","dateRange_filter");
$grid_connector->event->attach("beforeFilter","custom_filter");

//===список полей грида
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


//===Преобразование фильтра при выборе группового элемента в дереве
if(isset($_GET['dhx_filter'])){
   $res = new PDO ( "mysql:dbname=" . DB_DATABASE . ";host=" . DB_HOST, DB_USER, DB_PASSWORD );
   
  foreach ( $_GET['dhx_filter'] as $key => $value ) {
    switch ( $key ) {
      case 'type_id':
        $table = 'types';
        break;
      case 'topic_id':
        $table = 'topics';
        break;
      case 'author_id':
        $table = 'authors';
        break;
    }
    
    if (preg_match ("/group_param/", $_GET['dhx_filter'][$key])) {
      $name_example = explode('__',$_GET['dhx_filter'][$key]);
//      unset($_GET['dhx_filter']['type_id']);
      
      $sql_example = "
                    SELECT 
                      id,
                      name
                    FROM " . $table . "
                    WHERE parent in (SELECT id FROM " . $table . " WHERE name ='".$name_example[0]."' )
                    ";
      
      foreach ($res->query($sql_example) as $row) {
           $filter_example[] = $row['id'];
       }    
      $value = implode(",",$filter_example);
      $_GET['dhx_filter'][$key] = "(" . $value . ")";
      
      $_GET['group'] = array();
      $_GET['group'][$key]['filter'] = $key;
      $_GET['group'][$key]['operation'] = 'IN';
      $_GET['group'][$key]['table'] = $table;
      
    }

      
  }
}
//===Преобразование фильтра при выборе группового элемента в дереве
  
//===блок для формы поиска
function custom_filter($filter_by){
 
  if(isset($_GET['search'])){
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
  
  if(isset($_GET['group'])){
    foreach ( $_GET['group'] as $key => $value ) {
      if (!sizeof($filter_by->rules)){
//        $filter_by->claear();
        $filter_by->add($_GET['group'][$key]['filter'],$value,"LIKE");
      } 
        
      $index = $filter_by->index($_GET['group'][$key]['filter']);
      if ($index!==false){  //a client-side input for the filter}
        $filter_by->rules[$index]["operation"]=$_GET['group'][$key]['operation'];
      }      
    }

  }
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
//===блок для формы поиска




$filter2 = new OptionsConnector($res);
$filter2->render_table("statuses","id","name");
$grid_connector->set_options("status_id",$filter2);

$filter3 = new OptionsConnector($res);
$filter3->render_table("authors","id","name");
$grid_connector->set_options("author_id",$filter3);

$filter4 = new OptionsConnector($res);
$filter4->render_table("topics","id","name(value)");
$grid_connector->set_options("topic_id",$filter4);


$sql = "
  SELECT 
   docs.id
  ,file
  ,topics.name as topic_name
  ,statuses.name as status_name 
  ,authors.name as author_name
  ,types.name as type_name
  ,docs.name
  ,date
  ,num
  FROM docs
  LEFT JOIN statuses ON docs.status_id = statuses.id
  LEFT JOIN types ON docs.type_id = types.id
  LEFT JOIN authors  ON docs.author_id = authors.id
  LEFT JOIN topics  ON docs.topic_id = topics.id
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
