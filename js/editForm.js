
function editFormCreate(){

var editWindowElement;
//window properties
var width = 500;
var height = 500;
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

//editForm = editWindowElement.attachForm(formData);
editForm = editWindowElement.attachForm();

editForm.loadStruct("data/form.xml");                                   //loads controls, specified in the "data/form.xml" file to the form
editForm.bind(documentsGrid);

editWindow.window('editWindow').hide();
}

function editFormShow (){
//  editWindowElement.show();
editWindow.window('editWindow').show();
  documentsGrid.selectRow(documentsGrid.getSelectedId());
}