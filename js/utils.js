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
        doAfterGridUpdate();
      });
}
