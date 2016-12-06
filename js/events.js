toolbarMain.attachEvent("onClick", function(id){
  switch (id) {
    case 'button_upload':
      upoadFormShow(layout);
      break;
    case 'button_upload_folder':
      upoadFormShow(layout, true);
      break;  
  }
});
toolbarMain.attachEvent("onStateChange", function(id, state){
  //обновление состояния кнопок тулбара
  toolbarMain.forEachItem(function(itemId){
    if(itemId != id){
      toolbarMain.setItemState(itemId,!toolbarMain.getItemState(id));
    }
  });
  //действия в зависимости от выбора фильтра
  switch (id) {
    case 'button_type':
      documentTree.clearAll();
      documentTree.loadStruct("app_server/dataTree.php?table=types");
      active_filter = 'type_id';
      layout.cells("a").setText("Типы документов");
      break;
    case 'button_author':
      documentTree.clearAll();
      documentTree.loadStruct("app_server/dataTree.php?table=authors");
      active_filter = 'author_id';
      layout.cells("a").setText("Издатели");
      break;
    case 'button_topic':
      documentTree.clearAll();
      documentTree.loadStruct("app_server/dataTree.php?table=topics");
      active_filter = 'topic_id';
      layout.cells("a").setText("Темы");
      break;
  }
});
documentsGrid.attachEvent("onRowSelect", function(id,ind){

  var docName = documentsGrid.cells(documentsGrid.getSelectedId(),documentsGrid.getColIndexById('file')).getValue();
  var docType = documentsGrid.cells(documentsGrid.getSelectedId(),documentsGrid.getColIndexById('type_id')).getValue();
  var oIframe = document.getElementsByTagName('iframe')[0];
  var path;

  path = (docType == 8) ? docsUploaded : docsPath
  edocs.message(docName);
  edocs.message(path);
  if (docName.search(/\.html/i) != -1){  
    oIframe.src = path + docName;
  } else {
    oIframe.src = "http://docs.google.com/viewer?url=" + path + docName + "&embedded=true";
//    oIframe.src = "https://docs.google.com/viewerng/viewer?url=http://innakhx4.bget.ru/" + docName + "&embedded=true";  
  }
}); 

var admin_columns_show = false;
documentTree.attachEvent("onSelect", function(id, mode){
  if(mode){
    documentsGrid.clearAll();
    if(USER['type'] == 'admin' && admin_columns_show){
      gridDetachAdminColumns();
      admin_columns_show = !admin_columns_show;
    }
    
//    documentsGrid.updateFromXML("app_server/dataGrid.php?connector=true&dhx_filter[" + active_filter + "]=" + id, true,true,doAfterGridUpdate);
    documentsGrid.load("app_server/dataGrid.php?connector=true&dhx_filter[" + active_filter + "]=" + id, doAfterGridUpdate);
//    documentsGrid.refresh();

  }
});  


function doAfterGridUpdate(){
    if(USER['type'] == 'admin' && !admin_columns_show){
      gridAttachAdminColumns();
      admin_columns_show = !admin_columns_show;
    }
    return true;
}


function gridAttachAdminColumns(){
  var columnsNumber = documentsGrid.getColumnsNum();
  documentsGrid.insertColumn(0,'Вибір,','ch',50,'na','center','top',null);
  var columnsNumber = documentsGrid.getColumnsNum();
  documentsGrid.insertColumn(columnsNumber,'Видалити','myDelete',50,'na','center','top',null);
}

function gridDetachAdminColumns(){
  var columnsNumber = documentsGrid.getColumnsNum();
  documentsGrid.deleteColumn(columnsNumber-1);
  documentsGrid.deleteColumn(0);
}


//toolbarMain.attachEvent("onclick",function(id){                                //attaches a handler function to the "onclick" event
//    if(id=="newContact"){                                                  //'newContact' is the id of the button in the toolbar
//        var rowId=documentsGrid.uid();                                      //generates an unique id
//        var pos = documentsGrid.getRowsNum();                               //gets the number of rows in the grid
//        documentsGrid.addRow(rowId,["New contact","",""],pos);              //adds a new row to the grid. The 'addRow()' method takes 3 parameters: the row id (must be unique), the initial values of the row, the  position where the new must be inserted
//    };
//    if(id=="delContact"){                                                  //'delContact' is the id of the button in the toolbar
//        var rowId = documentsGrid.getSelectedRowId();                       //gets the id of the currently selected row
//        var rowIndex = documentsGrid.getRowIndex(rowId);                    //gets the index of the row with the specified id
//
//        if(rowId!=null){
//            documentsGrid.deleteRow(rowId);                                 //deletes the currently selected row
//            if(rowIndex!=(documentsGrid.getRowsNum()-1)){                   //checks whether  the currently selected row is NOT last in the grid
//                documentsGrid.selectRow(rowIndex+1,true);                   //if the currently selected row isn't last - moves selection to the next row
//            } else{                                                        //otherwise, moves selection to the previous row
//                documentsGrid.selectRow(rowIndex-1,true)
//            }
//        }
//    }
//});