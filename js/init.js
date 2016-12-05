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
  if(ENV == 'dev'){
    docsPath = "http://expert/docs/";
    docsUploaded = "http://expert/uploaded/";    
  } else {
    docsPath = "http://innakhx4.beget.tech/docs/";
    docsUploaded = "http://innakhx4.beget.tech/uploaded/"; 
  } 
  
  include("/js/utils.js?"+HASH); //форма загрузки файлоф
  include("/js/upoadForm.js?"+HASH); //форма загрузки файлоф
  include("/js/keyEvent.js?"+HASH); // события нажатия клавиатуры
  include("/js/script.js?"+HASH); //форма загрузки файлоф
  include("/js/events.js?"+HASH); //форма загрузки файлоф

})
