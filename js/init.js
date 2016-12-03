var docsPath;
var docsUploaded; 
var layout,
    menu,
    toolbarMain,
    documentTree,
    toolbarA,
    documentsGrid,
    toolbarC,
    toolbarD;
var active_filter = 'type_id';

$(document).ready(function() {
  if(env == 'dev'){
    docsPath = "http://expert/docs/";
    docsUploaded = "http://expert/uploaded/";    
  } else {
    docsPath = "http://innakhx4.beget.tech/docs/";
    docsUploaded = "http://innakhx4.beget.tech/uploaded/"; 
  } 
  
  include("/js/utils.js?"+hash); //форма загрузки файлоф
  include("/js/upoadForm.js?"+hash); //форма загрузки файлоф
  include("/js/keyEvent.js?"+hash); // события нажатия клавиатуры
  include("/js/script.js?"+hash); //форма загрузки файлоф
  include("/js/events.js?"+hash); //форма загрузки файлоф

})
