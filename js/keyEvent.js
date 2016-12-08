document.onkeydown=function(e){return Do(e||window.event,(e||window.event).keyCode);};
function Do(e, kode){

    switch (kode){
        case 27://esc
        if (typeof uploadWindow == 'object' && uploadWindow.unload != null) {
          uploadWindow.unload();
          uploadWindow = null;
        }
        if ( editWindow instanceof dhtmlXWindows ) {
          editWindow.window('editWindow').hide();
        }
        if (searchWindow instanceof dhtmlXWindows ) {
          searchWindow.window('searchWindow').hide();
        }

                break;
        case 46://delete
                break;
        case 8://backspace
 
                break;
        case 13://enter
          if (searchWindow instanceof dhtmlXWindows && searchWindow.isWindow('searchWindow')) {
            searchFormSend();
            searchWindow.window('searchWindow').close();
          }
          break;
        default:
//                alert(kode);
                break;  
    }
    return true;
}