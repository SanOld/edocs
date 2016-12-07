
function editFormCreate(){

var editWindowElement;
//window properties
var width = 450;
var height = 300;
var left = ($(window).width() - width)/2;
var right = ($(window).height() - height)/2;

//var formData = [
//      {type: "fieldset", label: "Загрузчик", list:[
//        {type: "input"
//          , name: "myFiles"
//          , inputWidth: width - 100
//          , inputHeight: 300
//          , url: "../app/dhtmlxform_item_upload.php"
//          , swfPath: "uploader.swf"
//          , swfUrl: "../app/dhtmlxform_item_upload.php"
//        }  
//      ]}
//    ];

editWindow = new dhtmlXWindows();
//			editWindow.attachViewportTo("winVP");
editWindowElement = editWindow.createWindow('editWindow', left, right, width, height);
editWindow.window('editWindow').button('close').hide();
//editWindow.window('editWindow').setModal(true);
editWindow.attachViewportTo("bd");
editWindow.window('editWindow').keepInViewport(true);
editWindowElement.setText("Редактор записи");

var formData = [
  {type:"settings", labelWidth: "100", inputWidth: "300"},
  {type: "combo", label: "Статус", name: "status_name", connector: "app_server/statusDataComboConnector.php", filtering:"true"}
 ,{type: "combo", label: "Видавник", name: "author_name", connector: "app_server/authorDataComboConnector.php", filtering:"true"}
 ,{type: "combo", label: "Вид", name: "type_name", connector: "app_server/typeDataComboConnector.php", filtering:"true"}

 ,{type:"input",name:"name",label:"Назва",value:""}
 ,{
      type: "calendar", 
      name: "date", 
      label: "Дата",
      enableTime: true, 
      enableTodayButton: true,
      calendarPosition: "right",
      dateFormat: "%d-%m-%Y",
      inputWidth: "200"
  }
 ,{type:"input",name:"num",label:"Номер",value:""} 

 ,{type: "block", blockOffset: 0, offsetTop: 20, list: [
    ,{type: "button", name: "submit", value: "Сохранить", width: 100}
    ,{type: "newcolumn", offset:10}
    ,{type: "button", name: "close", value: "Закрыть", width: 100}
  ]} 
];


editForm = editWindowElement.attachForm();
editForm = editWindowElement.attachForm(formData);
//editForm.loadStruct("data/form.xml");                                   //loads controls, specified in the "data/form.xml" file to the form
editForm.bind(documentsGrid);

editWindow.window('editWindow').hide();
}

function editFormShow (){
//  editWindowElement.show();

editWindow.window('editWindow').show();
setTimeout(function(){documentsGrid.selectRow(documentsGrid.getSelectedId());},0);

  
}