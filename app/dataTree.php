<?php

  include('config.php');
  
  if( $curl = curl_init() ) {
    curl_setopt($curl, CURLOPT_URL, DATA_HOST . 'app_server/dataTree.php?'.http_build_query($_GET));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($_POST));
    $out = curl_exec($curl);
    curl_close($curl);
    print_r ($out);

  }

