 
  layout = new dhtmlXLayoutObject(document.body,"4C");                       //initializes dhtmlxLayout
  layout.setSkin("dhx_web");
  
  layout.cells("a").setText("Типы документов");                                     //sets the text in the header of the 'grid' column
  layout.cells("a").setWidth(250); 
  layout.cells("b").setText("Форма поиска");                              //sets the text in the header of the 'form' column
  layout.cells("b").setHeight(200);
  layout.cells("b").collapse();
  layout.cells("c").setText("Список документов"); 
  layout.cells("c").setHeight(300);

  layout.cells("d").setText("Документ");

  menu = layout.attachMenu();                                                //initializes dhtmlxMenu
//  menu.setIconsPath("icons/");                                               //sets the path to custom icons
  menu.loadFromHTML("mainMenu", true);                                             //loads items from the "data/menu.xml" file to the menu

  toolbarMain = layout.attachToolbar();                                          //initializes dhtmlxToolbar
  toolbarMain.setIconset("awesome");//sets the path to custom images
  toolbarMain.setIconSize(48);
  toolbarMain.loadStruct("../data/toolbarMain.xml", true);                                       //loads items from the "data/toolbar.xml" file to the toolbar

  documentTree = layout.cells("a").attachTreeView({
//              parent:         "treeviewObj",  // id/object, container for treeview
    skin:           "dhx_terrace",  // string, optional, treeview's skin
    iconset:        "font_awesome", // string, optional, sets the font-awesome icons
    multiselect:    true,           // boolean, optional, enables multiselect
    checkboxes:     false,           // boolean, optional, enables checkboxes
    dnd:            false,           // boolean, optional, enables drag-and-drop
    context_menu:   true,           // boolean, optional, enables context menu
//              items:[],
//              onload:         function(){}    // callable, optional, callback for load
});
  documentTree.loadStruct("app_server/dataTree.php");
  
  toolbarA = layout.cells("a").attachToolbar()
  toolbarA.setIconset("awesome");
  toolbarA.loadStruct("../data/toolbarA.xml", true);
  


  documentsGrid = layout.cells("c").attachGrid();                             //initializes dhtmlxGrid
  documentsGrid.setHeader("file,Наименование,Дата, Num, Active, type_id",null,
                          ["","text-align:center;", "text-align:center;", "text-align:center;", "text-align:center;",""]);                            //sets the header labels
  documentsGrid.setColumnIds("file,name,date,num,active,type_id");                            //sets the column ids
  documentsGrid.setColumnHidden(0,1); //hides the 1st column
  documentsGrid.setColumnHidden(5,1); //hides the 1st column
  documentsGrid.setInitWidths("0,*,200,100,100,0");                                 //sets the initial widths of columns
  documentsGrid.setColAlign("left,left,center,center,center,center");                                //sets the horizontal alignment
  documentsGrid.setColTypes("ro,ro,ro,ro,ro,ro");                                      //sets the types of columns
  documentsGrid.setColSorting("str,str,str,str,str,str");                                 //sets the sorting types of columns
  documentsGrid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter");       //sets the filters for columns
  documentsGrid.init();

//  toolbarC = layout.cells("c").attachToolbar()
//  toolbarC.setIconset("awesome");
//  toolbarC.loadStruct("../data/toolbarC.xml", true);  
  
  toolbarD = layout.cells("d").attachToolbar()
  toolbarD.setIconset("awesome");
  toolbarD.loadStruct("../data/toolbarD.xml", true);

  layout.cells("d").attachHTMLString('<iframe id="viewer" src="" height="100%" width="100%"></iframe>')

//  var dpg = new dataProcessor("data/contacts.php");                          //inits dataProcessor
//  dpg.init(documentsGrid);
//  dpg.attachEvent("onAfterUpdate", function(sid, action, tid, tag){
//        if (action == "inserted"){
//            documentsGrid.selectRowById(tid);                                   //selects a row
//            contactForm.setFocusOnFirstActive();                               //sets focus to the 1st form's input
//        }
//    })

//===Способ загрузки
//  window.dhx4.ajax.get("app/dataTree.php", function(r){
//    documentTree.loadStruct(r.xmlDoc.responseText, function(){
//    });
//  });




  
