 
 function eXcell_myDate(cell){ // the eXcell name is defined here
    if (cell){            // the default pattern, just copy it
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function(){} //read-only cell doesn't have edit method
    // the cell is read-only, so it's always in the disabled state
    this.isDisabled = function(){ return true; } 
    this.setValue=function(val){
        // actual data processing may be placed here, for now we just set value as it is
        var date = window.dhx.str2date(val, "%Y-%m-%d %H:%i:%s");
        val = window.dhx.date2str(date, "%d-%m-%Y");
        this.setCValue(val); 
    }
}
eXcell_myDate.prototype = new eXcell;// nests all other methods from the base class



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
//  toolbarMain.loadStruct("../data/toolbarMain.xml", true);                                       //loads items from the "data/toolbar.xml" file to the toolbar
  toolbarMain.addButtonTwoState('button_type', 1, 'Тип',"fa fa-th-list",false);   
  toolbarMain.setItemToolTip('button_type',"Фильтр документов по типам");
  
  toolbarMain.addButtonTwoState('button_author', 2, 'Издатель',"fa fa-edit",false);   
  toolbarMain.setItemToolTip('button_author',"Фильтр документов по издателю");
  
  toolbarMain.addButtonTwoState('button_topic', 3, 'Тема',"fa fa-text-height",false);   
  toolbarMain.setItemToolTip('button_topic',"Фильтр документов по темам");  


  

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
  
//  toolbarA = layout.cells("a").attachToolbar()
//  toolbarA.setIconset("awesome");
//  toolbarA.loadStruct("../data/toolbarA.xml", true);
  


  documentsGrid = layout.cells("c").attachGrid();                             //initializes dhtmlxGrid
  documentsGrid.setImagePath("../imgs/dhxgrid_material/");
  documentsGrid.setHeader("file,type_id,Наименование,Дата, Num, Active",null,
                          [  "text-align:center;"
                            ,"text-align:center;"
                            ,"text-align:center;"
                            ,"text-align:center;"
                            ,"text-align:center;"
                            ,"text-align:center;"
                          ]);                            //sets the header labels
  documentsGrid.setColumnIds("file,type_id,name,date,num,active");                            //sets the column ids
  documentsGrid.setInitWidths("0,0,*,200,100,100");                                 //sets the initial widths of columns
  documentsGrid.setColAlign("left,left,left,left,center,center,center");                                //sets the horizontal alignment
   
  documentsGrid.setColTypes("ro,ro,ro,myDate,ro,ro");                                      //sets the types of columns
//  documentsGrid.setColSorting("str,str,str,str,str,str,str");                                 //sets the sorting types of columns
//  documentsGrid.attachHeader(",,#text_filter,#text_filter,#text_filter,#text_filter,#text_filter");       //sets the filters for columns
  documentsGrid.setColumnHidden(0,1); //hides the 1st column
  documentsGrid.setColumnHidden(1,1); //hides the 1st column
  documentsGrid.init();
//documentsGrid.insertColumn(2); 


  
  
//  toolbarD = layout.cells("d").attachToolbar()
//  toolbarD.setIconset("awesome");
//  toolbarD.loadStruct("../data/toolbarD.xml", true);

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

  if(USER['type'] == 'admin'){
    toolbarMain.addButton     ('button_upload', 4, 'Загрузить файлы...',"fa fa-upload",false);   
    toolbarMain.setItemToolTip('button_upload',"Загрузка файлов");
    toolbarMain.addButton     ('button_upload_folder', 5, 'Загрузить из папки...',"fa fa-cloud-upload",false);   
    toolbarMain.setItemToolTip('button_upload_folder',"Загрузка файлов массово из папки");
    
    documentsGrid.insertColumn(0,'Some text','ch',50,'na','center','top',null);
    
    toolbarC = layout.cells("c").attachToolbar()
    toolbarC.setIconset("awesome");
    toolbarC.addButton('button_editor', 5, 'Редактор',"fa fa-pencil",false); 
    toolbarC.setItemToolTip('button_editor',"Редактор документов");
  }


  
