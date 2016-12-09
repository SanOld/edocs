document.onkeydown=function(e){return Do(e||window.event,(e||window.event).keyCode);};
document.onkeyup=function(e){return Do2(e||window.event,(e||window.event).keyCode);};
var isCRTL = false;
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
        case 70://F
          if(isCRTL){
            searchFormShow();
          }
          break;
        case 17://ctrl
          isCRTL = true;
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

function Do2(e, kode){
    switch (kode){
        case 17://ctrl
          isCRTL = false;
          break;
        default:
//        alert(kode);
          break;  
    }
    return true;
}