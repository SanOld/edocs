<?php
require_once 'config.php';

class Auth{
  public $user = array();
  private $secret_key = null;
  public function __construct() {
    $this->user['type'] = 'guest';
  
    $this->login();
  }
  
  function login(){
    if(isset($_REQUEST['secret_key'])){
      $this->secret_key = $_REQUEST['secret_key'];
    }
    
    if($this->secret_key && $this->secret_key == SECRET_KEY){
      $this->user['type'] = 'admin';
    }
  }
  
  function isAdmin(){
    switch ( $this->user['type'] ) {
      case 'admin':
        return true;
        break;
      default:
        return false;
        break;
    }
  }
}
