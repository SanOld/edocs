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
var active_filter = {mode:'type_id', text:''};
var needHide = false; //флаг для удаления записи из таблицы при изменении параметра отличного от фильтра
var gridDeleteMode = false;
var admin_columns_show = false;
var checkObject = {}; //j,]trn чекнутых строк

var editWindow //объявлена глобально для keyEvents
var editWindowElement;
var editForm

$(document).ready(function() {
  edocs.message("Режим: " + ENV);
  if(ENV == 'dev'){
    docsPath = "http://expert/docs/";
    docsUploaded = "http://expert/uploaded/";  } else {
    docsPath = "http://innakhx4.beget.tech/docs/";
  } 
  
  include("/js/utils.js?"+HASH); //форма загрузки файлоф
  include("/js/upoadForm.js?"+HASH); //форма загрузки файлоф
  include("/js/editForm.js?"+HASH); //форма загрузки файлоф
  include("/js/keyEvent.js?"+HASH); // события нажатия клавиатуры
  include("/js/script.js?"+HASH); //форма загрузки файлоф
  include("/js/events.js?"+HASH); //форма загрузки файлоф

})
