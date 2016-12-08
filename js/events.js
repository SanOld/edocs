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
      active_filter.mode = 'type_id';
      layout.cells("a").setText("Типы документов");
      break;
    case 'button_author':
      documentTree.clearAll();
      documentTree.loadStruct("app_server/dataTree.php?table=authors");
      active_filter.mode = 'author_id';
      layout.cells("a").setText("Издатели");
      break;
    case 'button_topic':
      documentTree.clearAll();
      documentTree.loadStruct("app_server/dataTree.php?table=topics");
      active_filter.mode = 'topic_id';
      layout.cells("a").setText("Темы");
      break;
  }
});
documentsGrid.attachEvent("onBeforeSelect", function(new_row,old_row,new_col_index){
//  switch (true) {
//    case gridEditMode:
//      editFormShow(layout);
//      gridEditMode = false;
//      return true;
//      break; 
//  }
  return true;
});
documentsGrid.attachEvent("onRowSelect", function(id,ind){
  var id = documentsGrid.getSelectedId();
  var docName = documentsGrid.cells(documentsGrid.getSelectedId(),documentsGrid.getColIndexById('file')).getValue();
//  var docType = documentsGrid.cells(documentsGrid.getSelectedId(),documentsGrid.getColIndexById('type_id')).getValue();
  
  if (gridDeleteMode) {
      documentsGrid.deleteRow(documentsGrid.getSelectedId());
      gridDeleteMode = !gridDeleteMode;    
  } else if(ENV != 'dev') {
    
      var oIframe = document.getElementsByTagName('iframe')[0];
      var path;

      
      edocs.message(docName);
      edocs.message(path);
      if (docName.search(/\.html/i) != -1){  
        oIframe.src = path + docName;
      } else {
        oIframe.src = "http://docs.google.com/viewer?url=" + docsPath + docName + "&embedded=true";
    //    oIframe.src = "https://docs.google.com/viewerng/viewer?url=http://innakhx4.bget.ru/" + docName + "&embedded=true";  
      }       

  }

  if(gridDeleteMode){

  } else {

 
  }

 
}); 
documentTree.attachEvent("onSelect", function(id, mode){
  if(mode){
    documentsGrid.clearAll();
    if(USER['type'] == 'admin' && admin_columns_show){
      gridDetachAdminColumns();
      admin_columns_show = !admin_columns_show;
    }
    active_filter.text = documentTree.getItemText(id);
//    documentsGrid.updateFromXML("app_server/dataGrid.php?connector=true&dhx_filter[" + active_filter.mode + "]=" + id, true,true,doAfterGridUpdate);
    documentsGrid.load("app_server/dataGrid.php?connector=true&dhx_filter[" + active_filter.mode + "]=" + id, doAfterGridUpdate);
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
  documentsGrid.insertColumn(0,'Вибір,','myCheck',50,'na','center','top',null);
  var columnsNumber = documentsGrid.getColumnsNum();
  documentsGrid.insertColumn(columnsNumber,'','myEdit',50,'na','center','top',null);
  var columnsNumber = documentsGrid.getColumnsNum();
  documentsGrid.insertColumn(columnsNumber,'','myDelete',50,'na','center','top',null);
}
function gridDetachAdminColumns(){
  var columnsNumber = documentsGrid.getColumnsNum();
  documentsGrid.deleteColumn(columnsNumber-1);
  documentsGrid.deleteColumn(columnsNumber-2);
  documentsGrid.deleteColumn(0);
}

dataProc.attachEvent("onBeforeUpdate", function (id, status, data) {
//     delete data['c9'];
//     delete data['c10'];
   return true;
});
dataProc.attachEvent("onAfterUpdate", function(id, action, tid, response){

  switch (action) {
    case 'updated':
      window.console.log('updated');
      window.console.log(response);
      break;
    case 'inserted':
      window.console.log('inserted');
      window.console.log(response);
      break;  
    case 'deleted':
      window.console.log('deleted');
      window.console.log(response);
      break;
    case 'invalid':
      window.console.log('invalid');
      window.console.log(response);
      break;
    case 'error':
      window.console.log('error');
      window.console.log(response);
      break;  
  return true;
  }
});
dataProc.attachEvent("onRowMark", function (id, state, mode) {
//       window.console.log(id);
//       window.console.log(state);
//       window.console.log(mode);
     return true;

//          if (state && mode == "updated") {
//            grid.forEachCell(id, function (obj) {
//                if (obj.wasChanged()) 
//                    obj.cell.style.fontWeight = "bold";
//            });
//            return 0;
//        }
});

editForm.attachEvent("onButtonClick", function(id){ 
  switch (id) {
    case 'submit':
      var dhxCalendar = editForm.getCalendar('date');
      editForm.save();  
      documentsGrid.setRowHidden(documentsGrid.getSelectedRowId(), needHide); //скрываю строку при изменении атрибута отличного от выбранного в TreeView
      needHide = false;
      break;
    case 'submit_close':
      var dhxCalendar = editForm.getCalendar('date');
      editForm.save();  
      editForm.hide();
      documentsGrid.setRowHidden(documentsGrid.getSelectedRowId(), needHide); //скрываю строку при изменении атрибута отличного от выбранного в TreeView
      needHide = false;
      break;      
    case 'close':
      editWindow.window('editWindow').hide();  
      break;
  }//attaches a handler function to the "onButtonClick" event
                                                    //sends the values of the updated row to the server
});



editForm.attachEvent("onBeforeChange", function (name, old_value, new_value){

  switch (name) {
    case 'type_name':
      if(active_filter.mode == 'type_id'){
          needHide = (active_filter.text != new_value);
      }
      break;
    case 'author_name':
      if(active_filter.mode == 'author_id'){
          needHide = (active_filter.text != new_value);
      }
      break;
    case 'topic_name':
      if(active_filter.mode == 'topic_id'){
          needHide = (active_filter.text != new_value);
      }
      break;
  }
return true;
});

toolbarC.attachEvent("onClick", function(id){
  switch (id) {
    case 'button_editor':
      window.console.log(checkObject);
      for(var t in checkObject){
        window.console.log(t + ":" + checkObject[t]);
      }
      break;

  }
})
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