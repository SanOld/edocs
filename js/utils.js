function showDocs(oLink) {
    var oBlock = oLink.getElementsByTagName('div')[0];
    var oIframe = oLink.getElementsByTagName('iframe')[0];
    var oIframeUrl = oLink.getAttribute('url-show');
    if(oBlock.style.height == 0+'px') {
        oBlock.style.height = 980+'px';
        if(oIframe.src != oIframeUrl) {oIframe.src = oIframeUrl};
    } else {
        oBlock.style.height = 0+'px';
    }
}

function searchFormSend(){
        searchForm.send("app_server/dataGrid.php?connector=true", "get", function(loader, response){
        documentsGrid.clearAll();
        doBeforeGridUpdate();
        documentsGrid.parse(response);
        var num = documentsGrid.getRowsNum();
        if(num){
          dhtmlx.message("Знайдено: " + documentsGrid.getRowsNum() + " документів")
        } else {
          dhtmlx.message("За вашим запитом нічого не знайдено!")
        }
        
        doAfterGridUpdate();
      });
}

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
