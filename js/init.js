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

var editWindow; //объявлена глобально для keyEvents
var editWindowElement;
var editForm;

var searchWindow; //объявлена глобально для keyEvents
var searchWindowElement;
var searchForm;

$(document).ready(function() {
  edocs.message("Режим: " + ENV);
  if(ENV == 'dev'){
    docsPath = "http://expert/docs/";
    docsUploaded = "http://expert/uploaded/";  } else {
    docsPath = "http://innakhx4.beget.tech/docs/";
  } 
  
  include("/js/utils.js?"+HASH); 
  include("/js/uploadForm.js?"+HASH); //форма загрузки файлов
  include("/js/editForm.js?"+HASH); //форма редактирования файлов
  include("/js/searchForm.js?"+HASH); //форма поиска документов
  include("/js/keyEvent.js?"+HASH); // события нажатия клавиатуры
  include("/js/script.js?"+HASH); 
  include("/js/events.js?"+HASH); 

})
