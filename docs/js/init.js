//#################################################################
//# Javascript Code Generator
//# GNU Public License V3 - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus
//# 2012 University Koblenz-Landau
//#################################################################
// DOM_Global Hash is used to store global values in LocalStorage and in vJSCC_DB
// see saveDOM2LocalStorage() in localstorage.js:125
// The following DOM elements are defined in index.html
vDOM_Global.push("sStandalone"); //YES/NO for Standalone export of HTML
vDOM_Global.push("tMainAuthor");
vDOM_Global.push("tMainEMail");
vDOM_Global.push("tPages");
vDOM_Global.push("tPageTypes");
vDOM_Global.push("tButtons");
vDOM_Global.push("sPageTypeHTML");
vDOM_Global.push("sPageHTML"); // Selector for PageID
vDOM_Global.push("sButtonHTML"); // Selector for ButtonID
//vDOM_Global.push("sButtonHeader1"); // Selector for ButtonHeader 1
//vDOM_Global.push("sButtonHeader2"); // Selector for ButtonHeader 2
vDOM_Global.push("tGlobalLibs");
vDOM_Global.push("tDatabases"); // List of all included Databases
vDOM_Global.push("tExportPrefix"); // Export Prefix for Databases
vDOM_Global.push("sExportPrefix"); //Checkbox if Export Prefix should be used for Databases. Unchecked i.e. pure JSON export
vDOM_Global.push("sShowGeneralizations"); //UML-Settings for Diagram Export
vDOM_Global.push("sShowAggregations"); //UML-Settings for Diagram Export
vDOM_Global.push("sShowAssociations"); //UML-Settings for Diagram Export
//-------------------------------
vDOM_File.push("tElementFileIDs"); // Pipe separated ID String
vDOM_File.push("tElementID"); // the edit string of selected Element ID - used to edit a new Element ID
vDOM_File.push("sElementsFileList"); // the select Box setting of selected Element ID
vDOM_File.push("tElementHTML"); // Content of Element Definition
vDOM_File.push("tFilename"); // Is the Filename
vDOM_File.push("sAppClassHTML"); // is the main App that is instantiated when a web site is loaded.
vDOM_File.push("tAppInitCall"); // Init Call when App is started
vDOM_File.push("tTemplateHTML"); // UNUSED Template for HTML-File (unused currently - later to use more than one basic HTML template for different Look&Feels)
vDOM_File.push("tPageIDs"); // Used Pages in HTML-File

//-------------------------------
vDOM_TPL.push("tDefaultAppPath"); // default is "app_LSAC/" needed as path to store the exported files for the WebApp.
vDOM_TPL.push("tTplHTML"); // Main template for file generation of "index.html", "app.html", ... Source Template: tpl/Default.html
vDOM_TPL.push("tTplSCRIPT"); // Script Tag for import Javascript Libraries
vDOM_TPL.push("tTplSCRIPTSTANDALONE"); // Script Tag for injection of Javascript code in ___JSCODE___
vDOM_TPL.push("tTplPAGE");  // Template for a DIV page of app.html (iterate for all pages of App)
vDOM_TPL.push("tTplMENU"); // Creates the template for a Menu of Childpages replace ID ___MENU_CONTENT___
vDOM_TPL.push("tTplMENUITEM"); // Definition of a single Menu Item replace IDs ___PAGE_ID___ and ___PAGE_TITLE___
vDOM_TPL.push("tTplPageLinkBUTTON"); // Definition of Header Buttons of an App, to link between pages
vDOM_TPL.push("tDefaultBUTTON"); // Default button that must be edited by user, contains an alert as event handler
vDOM_TPL.push("tTplQUIT"); // Main Quit Button (red) which will close the window
vDOM_TPL.push("tClassHeader"); // Class Header for Javascript Classes
vDOM_TPL.push("tTplMethodsHeader"); // Contains the methods header of definitions of methods
vDOM_TPL.push("tTplSuperClassProto"); // SuperClass definition with Prototype approach in Javascript
vDOM_TPL.push("tTplSuperClass"); // SuperClass definition without Prototype approach (more memory consumption for instances)
vDOM_TPL.push("tTplClassTail"); // Defines the End of the Class Definition
vDOM_TPL.push("tTplAttribute"); // Public Defines the Attributes definition in a Constructor
vDOM_TPL.push("tTplAttributePrivate"); // Private Defines the Private Attributes definition in a Constructor
vDOM_TPL.push("tTplMethodHeader"); // Public Defines the comments before each Method definition
vDOM_TPL.push("tTplMethodPrivate"); // Private Defines the comments before each Method definition
vDOM_TPL.push("tMethodPrefix"); //Defines prefix for defining a method
vDOM_TPL.push("tTplMethodConstructorComment"); //Defines a comment in the constructor for a method with Prototype definition
vDOM_TPL.push("tMethodPrefixProto"); // Defines the prefiv for defining a method with the protoype approach
vDOM_TPL.push("tTplClassTail"); // Defines the template appended at the end of class definition
vDOM_TPL.push("tTplLoopArray"); // Defines the Code for Loop over an Array
vDOM_TPL.push("tTplLoopHash"); // Defines the Code for Loop over Hash-IDs
vDOM_TPL.push("tCommentPrefix");  // Default is '//' as Javascript comment to preceed a comment line
vDOM_TPL.push("tCommentBoxPrefix"); // Default is '#' insert before the Class and Method Headers
//vDOM_TPL.push("");
//-------------------------------
//var vDOM_ID = ["tClassname","tSuperClassname","tAuthor","tEMail","tAttributes","tMethods"];
// The following DOM-IDs are used to store for all classes,
vDOM_ID.push("tClassname");
vTYPE_ID.push("String");
vDOM_ID.push("tSuperClassname");
vTYPE_ID.push("String");
vDOM_ID.push("sClassType");
vTYPE_ID.push("String");
//vTYPE_ID.push("Select");
vDOM_ID.push("JSCC_mod_date"); // Generated Date of Class
vTYPE_ID.push("String");
vDOM_ID.push("tAuthor");
vTYPE_ID.push("String");
vDOM_ID.push("tEMail");
vTYPE_ID.push("EMail");
vDOM_ID.push("tAttributes");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tMethods");
vTYPE_ID.push("Textarea");
vDOM_ID.push("sAttribList");
vTYPE_ID.push("String");
//vTYPE_ID.push("Select");
vDOM_ID.push("tAttribName");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribType");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribComment");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribDefault");
vTYPE_ID.push("String");
vDOM_ID.push("sAttribTypeList");
vTYPE_ID.push("Select");
vDOM_ID.push("tMethodHeader");
vTYPE_ID.push("String");
vDOM_ID.push("tMethodName");
vTYPE_ID.push("String");
vDOM_ID.push("tMethodComment");
vTYPE_ID.push("Textarea");
vDOM_ID.push("sMethodList");
vTYPE_ID.push("String");
vDOM_ID.push("tMethodCode"); // Stores the EditorContent
vTYPE_ID.push("Textarea");
//vTYPE_ID.push("Select");
vDOM_ID.push("tLoopObject");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tLoopMethod");
vTYPE_ID.push("String");
//vDOM_ID.push("");


function initCodeCreator() {
  // if Local Storage is supported by Browser try to Load JSON DB with Classes
  var vRestoreForm = {}; // use to restore editor content
  console.log("initCodeCreator()-Call");
  var vDB = null;
  var vLocalStorageLoad = false;
  var vSelectedClass = "";
  var vSelectedFile = "";
  var vSelectedPage =  "";
  var vSelectedMethod = "";
  var vSelectedPageType = "";
  console.log("initCodeCreator()");
  //loadProjectJSON();
  if (typeof(Storage) != "undefined") {
     //alert("Local Storage");
     loadLocalStorage("dom");
     vDB = loadLocalStorage("json");
     if (vDB) {
       console.log("initCodeCreator(): JSCC Project exists as JSON in Local Storage");
       top.vJSCC_DB = vDB;
       vLocalStorageLoad = true;
       console.log("initCodeCreator() JSON Database");
    } else {
        if (vJSCC_DB.hasOwnProperty("ClassList") && vJSCC_DB.hasOwnProperty("FileList")) {
          console.log("initCodeCreator() vJSCC_DB was loaded from Library prog/project.js");
          updateJSON2Form(vSelectedClass,vSelectedFile);
        } else if ((vJSCC_DB["JSCC_type"]) && vJSCC_DB["JSCC_type"] == "JSCC") {
          console.log("initCodeCreator() - Typ vJSCC_DB was loaded from Library prog/project.js");
          updateJSON2Form(vSelectedClass,vSelectedFile);
        } else {
          console.log("vJSCC_DB was loaded from Definition in HTML Form of JSCC");
          top.vJSCC_DB["JSCC_type"] = "JSCC";
          top.vJSCC_DB["JSCC_version"] = vJSCC_Version;
          top.vJSCC_DB["init_date"] = getDateTime();
          top.vJSCC_DB["mod_date"] = "";
          loadForm2JSON(vSelectedClass);
        };
      };
  } else {
      alert("Sorry, your browser does not support Local Storage...");
  };
  vSelectedClass = vJSCC_DB["SelectedClass"] || "";
  vSelectedFile  = vJSCC_DB["SelectedFile"]  || "";
  vSelectedPage  = vJSCC_DB["SelectedPage"]  || "";
  vSelectedDatabase = vJSCC_DB["SelectedDatabase"]  || "";
  vSelectedPageType = vJSCC_DB["SelectedPageType"] || "";
  vSelectedElement  = getSelectedElement4File(vSelectedFile);
  vSelectedMethod  = vJSCC_DB["ClassList"][vSelectedClass]["sMethodList"] || "";
  //Hack: MethodCode is not properly initialized, when Data is coming from LocalStorage
  console.log("initCodeCreator() Selected File='"+vSelectedFile+"' Class='"+vSelectedClass+"' Method='"+vSelectedMethod+"'");
  vRestoreForm["tMethodCode"] = getMethodCode4Editor(vSelectedClass);
  vRestoreForm["tPageTypeHTML"] = getPageTypeCode4Editor(vSelectedPageType);
  for (var i = 0; i < vDOM_ID.length; i++) {
    vRestoreForm[vDOM_ID[i]] = vJSCC_DB["ClassList"][vSelectedClass][vDOM_ID[i]] || "";
  };
  initLabelsHTML();
  updateBasicClassJSON2Form();
  //--- Create Selectors
  createFileSelect(vSelectedFile);
  createClassSelect(vSelectedClass);
  createPageSelect(vSelectedPage);
  createPageTypeSelect(vSelectedPageType);
  createElementsDBSelect();
  checkDatabaseListJSON();
  createDatabaseSelect(vSelectedDatabase);
  //--- Call of updateClassJSON2Form(vSelectedClass)
  //--- writes the UML-Mapper-List in tClasses
  updateClassJSON2Form(vSelectedClass);
  //createElementsFileSelect(vSelectedFile);
  //selectElementFileJS(vSelectedElement)
  //initEditorContent(vSelectedClass); //iframe.js:80
  //updateClassJSON2Form(vSelectedClass);
  //checkInterface4Class(vSelectedClass);
  //updateClasses();
  //setTimeout('alert(readFile("tpl/test.txt"))',5000);
  //getPageTypeCode4Editor(vSelectedPageType)
  updateFileListJSON2Form(vSelectedFile);
  updateElementsFileJSON2Form(getArray4HashID(vJSCC_DB["Element"]));
  populateForm2TemplateJSON();
  //createFileSelect();
  //updateSelectors(vSelectedClass,vSelectedFile); //select.js:140
  //setDefaultSelectors();
  //console.log("checkDatabaseListJSON()-Call");
  updateButtonJSON2Form();
  updateGlobalLibsJSON2Form();
  updateDatabasesJSON2Form();
  if (vLocalStorageLoad == true) {
    //write2value("tMethodCode",vRestoreForm["tMethodCode"]);
    //OK   write2value("tPageTypeHTML",vRestoreForm["tPageTypeHTML"]);

    //write2value("tSuperClassname",vRestoreForm["tSuperClassname"]);
    //write2value("sSuperClassname",vRestoreForm["tSuperClassname"]);
    //for (var i = 0; i < vDOM_ID.length; i++) {
    //  write2value(vDOM_ID[i],vRestoreForm[vDOM_ID[i]]);
    //};
    // selectSuperClass(vRestoreForm["tSuperClassname"]);
    //updateJSON2tMethods(vSelectedClass);
  };
  loadHTML2iFrame("tpl/index.html");
};

function loadForm2JSON(pSelectedClass,pSelectedFile) {
  var vSelectedFile = pSelectedFile   || getValueDOM("tFilename");
  var vSelectedClass = pSelectedClass || getValueDOM("tClassname");
  console.log("loadForm2JSON()");
  var vClassTypeID = getFormClassType4Class(vSelectedClass);
  initClassJS(vSelectedClass,vClassTypeID,"loadForm2JSON()");
  initFormClass(vSelectedClass);
  //console.log("DEBUG 1: "+getValueDOM("tClassList"));
  initFormClassList();
  initFormDatabaseList();
  //Button before PageTypes, because Buttons are used in PageTypes
  initFormButtonList();
  //PageType before Pages, because Pages are of create of a type from PageTypes
  initFormPageType();
  initFormPageList();
  initFormFileHTMLList();
  initFormSelectors();
  updateClasses(); // reads the tClassList and updates the JSON Classes
  updateFormGlobal2JSON();
  clearPageTypeForm();
  initMenuPageType("MenuPage");
};

function setDefaultSelectors() {
  // init the selector settings from vJSCC_DB
  checkMainAppClass4File();
  var vClassJS = getClassJSON();
  var vClassID = vJSCC_DB["SelectedClass"] || "";
  var vFileID = vJSCC_DB["SelectedFile"] || "";
  var vElementID = vJSCC_DB["SelectedElement"] || "";
  var vPageID = vJSCC_DB["SelectedPage"] || "";
  var vPageTypeID = vJSCC_DB["SelectedPageType"] || "";
  var vButtonID = vJSCC_DB["SelectedButton"] || "";
  if (vClassID != "") {
    selectClass_do(vClassID);
  };
  if (vFileID != "") {
    selectFileJS(vFileID);
    write2value("sFileHTML",vFileID);
    write2value("sFileList",vFileID);
    write2value("sFileListHTML",vFileID);
    writeFileTitle(vFileID);
  };
  if (vElementID != "") {
    selectElementFileJS(vElementID);
    write2value("sElementsFileList",vElementID);
  } else {
    write2value("sElementsFileList","");
  };
  if (vPageID != "") {
    selectPageJS(vPageID);
    write2value("sPageHTML",vPageID);
  };
  if (vPageTypeID != "") {
    selectPageTypeJS(vPageTypeID);
    write2value("sPageTypeHTML",vPageTypeID);
  };
  if (vButtonID != "") {
    selectButtonJS(vButtonID);
    write2value("sButtonHTML",vButtonID);
  };
  var vAttribName = getValueDOM("tAttribName");
  if (vAttribName != "") {
    write2value("sAttribList",vAttribName);
  }
};

function checkMainAppClass4File() {
  console.log("checkMainAppClass4File()");
  var vMainClass4File = getValueDOM("sAppClassHTML") || "";
  var vMainInitCall4File = getValueDOM("tAppInitCall") || "";
  if (vMainClass4File == "") {
    write2value("sAppClassHTML","App");
  };
  if (vMainInitCall4File == "") {
    write2value("tAppInitCall","init(document,vDataJSON)");
  }
};


function initLabelsHTML() {
  var vSep = " | ";
  //write2innerHTML("labelDatabaseRecord",vDataRECDEF.join(vSep));
  write2innerHTML("labelPageRecord",vPageRECDEF.join(vSep));
  write2innerHTML("labelPageTypeRecord",vPageTypeRECDEF.join(vSep));
  write2innerHTML("labelButtonRecord",vButtonRECDEF.join(vSep));
};

function initFormClassList() {
  console.log("initFormClassList()");
  var vClassTypeHash = getForm2ClassTypeHash(); //read from tClassList in  classes.js 413
  top.vJSCC_DB["ClassType"] = vClassTypeHash;
  var vClass = "";
  var vClassTypeID = "";
  var vClassArr = getClassArray(); //read from tClassList in  classes.js 413
   for (var i = 0; i < vClassArr.length; i++) {
     vClass = reduceVarName(vClassArr[i])
     vClassTypeID = vClassTypeHash[vClass] || "";
     initClassJS(vClassArr[i],vClassTypeID,"initFormClassList()");
     setClassTypeJSON(vClassArr[i],vClassTypeID,"initFormClassList()");
   };
};

function setClassType(pClass,pClassType,pCaller) {
  var vCaller = pCaller ||"Caller unknown";
  console.log("setClassType('"+pClass+"','"+pClassType+"','"+vCaller+"')");
  setClassTypeJSON(pClass,pClassType,pCaller);
};


function initFormFileHTMLList() {
  console.log("initFormFileHTMLList()");
   var vArr = getAllFilesArray(); //read from tButtonList in  classes.js 413
   for (var i = 0; i < vArr.length; i++) {
     console.log("Call: initFileHTML() for ID='"+vArr[i]+"'");
     //alert("ID='"+vArr[i]["BUTTON_ID"]+"'");
     initFileHTML(vArr[i]);
   };
   if (vArr.length > 0) {
     top.vJSCC_DB["SelectedFile"] = vArr[0];
     selectFilenameHTML_do(vArr[0]);
     write2value("tFilename",vArr[0]);
   };
};

function initFileHTML(pFileName) {
  if (!pFileName) {
    console.log("Call: initButtonJS(pButtonHash) with pButtonHash undefined");
  } else {
      console.log("initFileHTML(pFileName)-Call for ID='"+pFileName+"'");
      checkFileHTML(pFileName);
  };
};


function initFormButtonList() {
  console.log("initFormButtonList()");
   var vArr = getButtonArrayWithHashes(); //read from tButtonList in  classes.js 413
   for (var i = 0; i < vArr.length; i++) {
     console.log("Call: initButtonJS() for ID='"+vArr[i]["BUTTON_ID"]+"'");
     //alert("ID='"+vArr[i]["BUTTON_ID"]+"'");
     initButtonJS(vArr[i]);
   };
};

function initButtonJS(pButtonHash) {
  if (!pButtonHash) {
    console.log("Call: initButtonJS(pButtonHash) with pButtonHash undefined");
  } else {
      var vButtonID = reduceVarName(pButtonHash["BUTTON_ID"]);
      console.log("initButtonJS(pButtonHash)-Call for ID='"+vButtonID+"'");
      initButtonJS_do(pButtonHash);
  }
};

function initButtonJS_do(pButtonHash) {
  console.log("initButtonJS_do() ID:'"+pButtonHash["BUTTON_ID"]+"'");
  var vButtonID = reduceVarName(pButtonHash["BUTTON_ID"]);
  if (vButtonID == "") {
    console.log("initButtonJS()-Call: Button-ID undefined");
  } else {
    if (!top.vJSCC_DB) {
      var vError = "WARNING: initButtonJS() [init.js]: JSON Database 'vJSCC_DB' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSCC_DB = {};
    } else {
      console.log("JSON Database 'vJSCC_DB' exists.");
    };
    //------------------------------------
    top.vJSCC_DB["SelectedButton"] = vButtonID;
    //------------------------------------
    if (top.vJSCC_DB["ButtonList"]) {
      console.log("vJSCC_DB['ButtonList'] exists");
    } else {
      top.vJSCC_DB["ButtonList"] = {};
      console.log("vJSCC_DB['ButtonList'] created");
    };
    if (top.vJSCC_DB["ButtonList"][vButtonID]) {
      console.log("Button '"+vButtonID+"' exists in JSON DB");
    } else {
      console.log("initButtonJS_do(pButtonHash)-Call for ID='"+vButtonID+"'");
      top.createButtonJS(pButtonHash);
      console.log("Button '"+vButtonID+"' created and updated from HTML Form with default values");
    };
  };
}



function initFormPageList() {
   var vPageArr = getPageListArrayWithHashes(); //read from tPages in  pages.js 413
   console.log("initFormPageList() with "+vPageArr.length+" Pages");
   for (var i = 0; i < vPageArr.length; i++) {
     initPageJS(vPageArr[i]);
   };
};

function initFormPageType() {
   console.log("initFormPageType()");
   var vPageArr = getPageTypeArray(); //read from tPageTypes in  pages.js 413
   for (var i = 0; i < vPageArr.length; i++) {
     initPageTypeJS(vPageArr[i]);
   };
};

function initMenuPageType(pPageTypeID) {
  console.log("initMenuPageType('"+pPageTypeID+"')");
  if (existsPageTypeJS(pPageTypeID)) {
    var vPageTypeJS = vJSCC_DB["PageTypeList"][pPageTypeID];
    var vTemplate = vPageTypeJS["template"];
    vPageTypeJS["template"] = replaceString(vTemplate,"___PAGE_CONTENT___","___PAGE_CONTENT___\n          ___MENU_CONTENT___");
  } else {
    console.log("ERROR: MenuPageType '"+pPageTypeID+"' does not exist!");
  }
}

function initPageTypeJS(pPageTypeHash) {
  if (!pPageTypeHash) {
    console.log("Call: initPageTypeJS(pClass) with pPageHash undefined");
  } else {
      initPageTypeJS_do(pPageTypeHash)
  }
};

function initPageTypeJS_do(pPageTypeHash) {
  var pPageType = reduceVarName(pPageTypeHash["page-type"]);
  if (pPageType == "") {
    console.log("initPageTypeJS()-Call: Page-ID undefined");
  } else {
    if (!top.vJSCC_DB) {
      var vError = "WARNING: initPageTypeJS() [init.js]: JSON Database 'vJSCC_DB' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSCC_DB = {};
    } else {
      console.log("JSON Database 'vJSCC_DB' exists.");
    };
    //------------------------------------
    top.vJSCC_DB["SelectedTypePage"] = pPageType;
    //------------------------------------
    if (top.vJSCC_DB["PageTypeList"]) {
      console.log("vJSCC_DB['PageType'] exists");
    } else {
      top.vJSCC_DB["PageTypeList"] = {};
      console.log("vJSCC_DB['PageType'] created");
    };
    if (top.vJSCC_DB["PageTypeList"][pPageType]) {
      console.log("Page '"+pPageType+"' exists in JSON DB");
    } else {
      //top.createPageTypeJS(pPageType);
      top.vJSCC_DB["PageTypeList"][pPageType] = pPageTypeHash;
      console.log("Page '"+pPageType+"' created and updated from HTML Form with default values");
    };
  };
}


function initPageJS(pPageHash) {
  if (!pPageHash) {
    console.log("Call: initPageJS(pPageHash) with pPageHash undefined");
  } else {
    console.log("initPageJS(pPageHash) Type: "+typeof(pPageHash));
    initPageJS_do(pPageHash)
  }
};

function initPageJS_do(pPageHash) {
  var vPageID = reduceVarName(pPageHash["PAGE_ID"]);
  if (vPageID == "") {
    console.log("initPageJS()-Call: Page-ID undefined");
  } else {
    if (!top.vJSCC_DB) {
      var vError = "WARNING: initPageJS() [init.js]: JSON Database 'vJSCC_DB' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSCC_DB = {};
    } else {
      console.log("JSON Database 'vJSCC_DB' exists.");
    };
    //------------------------------------
    top.vJSCC_DB["SelectedPage"] = vPageID;
    //------------------------------------
    if (top.vJSCC_DB["PageList"]) {
      console.log("vJSCC_DB['PageList'] exists");
    } else {
      top.vJSCC_DB["PageList"] = {};
      console.log("vJSCC_DB['PageList'] created");
    };
    if (top.vJSCC_DB["PageList"][vPageID]) {
      console.log("Page '"+vPageID+"' exists in JSON DB");
    } else {
      top.createPageJS(pPageHash);
      console.log("Page '"+vPageID+"' created and updated from HTML Form with default values");
    };
  };
};


function initFormDatabaseList() {
  console.log("initFormDatabaseList()");
   var vDataJSONArr = getDatabaseArray(); //read from tDatabases in  classes.js 413
   for (var i = 0; i < vDataJSONArr.length; i++) {
     initDatabaseJS(vDataJSONArr[i]);
   };
};

function initDatabaseJS(pDatabase) {
  if (!pDatabase) {
    console.log("Call: initDatabaseJS(pDatabase) with pDatabase undefined");
  } else {
      initDatabaseJS_do(pDatabase)
  }
};

function initDatabaseJS_do(pDatabase) {
  //pDatabase = reduceVarName(pDatabase);
  if (pDatabase == "") {
    console.log("initDatabaseJS()-Call: Databasename undefined");
  } else {
    if (!top.vJSCC_DB) {
      var vError = "WARNING: initDatabaseJS() [init.js]: JSON Database 'vJSCC_DB' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSCC_DB = {};
    } else {
      console.log("JSON Database 'vJSCC_DB' exists.");
    };
    if (top.vJSCC_DB["DatabaseList"]) {
      console.log("vJSCC_DB['DatabaseList'] exists");
    } else {
      top.vJSCC_DB["DatabaseList"] = {};
      console.log("vJSCC_DB['DatabaseList'] created");
    };
    if (top.vJSCC_DB["DatabaseList"][pDatabase]) {
      console.log("Database '"+pDatabase+"' exists in JSON DB");
    } else {
      top.vJSCC_DB["DatabaseList"][pDatabase] = getDefaultDatabaseJSON(pDatabase);
      console.log("Database '"+pDatabase+"' created and updated from HTML Form with default values");
    };
  };
};

function initFormSelectors() {
  // get current ClassName
  initClassSelector();
  initFileSelector();
  initPageSelector();
  initPageTypeSelector();
  initButtonSelector();
};

function initFileSelector() {
  var vFileArr = [];
  var vFileList = vJSCC_DB["FileList"] || {};
  for (var iFile in vFileList) {
    if (vFileList.hasOwnProperty(iFile)) {
      vFileArr.push(iFile);
    };
  };
  createFileSelect(vFileArr);
};


function initClassSelector() {
  var vClassArr = [];
  var vClassTypeArr = [];
  var vClassList = vJSCC_DB["ClassList"] || {};
  var vClassTypeHash = vJSCC_DB["ClassType"] || {};
  var vTypeDef = "";
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClassArr.push(iClass);
      vTypeDef = vClassTypeHash[iClass] || "";
      if (vTypeDef != "") {
        vJSCC_DB["ClassList"][iClass]["sClassType"] = vTypeDef;
        vTypeDef = " = " + vTypeDef;
      };
      vClassTypeArr.push(iClass+vTypeDef);
    };
  };
  write2value("tClassList",getJSON2ClassString());
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createClassSelect4Array(vClassArr);
  createAttribTypeSelect();
  createAttribSelect();
  createMethodSelect(); //dom.js:13
};

function initButtonSelector() {
  write2value("tButtonList",getButtonListString());
  //var vButton = getValueDOM("tButtonname");
  //initButtonJS(vButton);
  var vArr = getArray4HashID(vJSCC_DB["ButtonList"]);
  createButtonSelect(vArr);
};


function initPageTypeSelector() {
  write2value("tPageTypes",getPageTypeString());
  createPageTypeSelect();
};

function initButtonSelector() {
  var vButtonArr = [];
  var vButtonList = vJSCC_DB["ButtonList"];
  for (var iButton in vButtonList) {
    if (vButtonList.hasOwnProperty(iButton)) {
      vButtonArr.push(iButton);
    };
  };
  //ButtonList update
  //document.fCreator.tButtonList += "\n"+vButton;
  write2value("tButtonList",vButtonArr.join("\n"));
  //var vButton = getValueDOM("tButtonname");
  //initButtonJS(vButton);
  createButtonSelect(vButtonArr);
};

function initPageSelector() {
  var vPageArr = getArray4HashID(vJSCC_DB["PageList"]);
  //initPageJS(vPage);
  createPageSelect4Array(vPageArr);
};

function initDatabaseSelector() {
  var vDataJSONArr = [];
  var vDataJSONList = vJSCC_DB["DatabaseList"];
  for (var iDatabase in vDataJSONList) {
    if (vDataJSONList.hasOwnProperty(iClass)) {
      vDataJSONArr.push(iClass);
    };
  };
  //ClassList update
  //document.fCreator.tClassList += "\n"+vClass;
  write2value("tDatabases",vDataJSONArr.join("\n"));
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createDatabaseSelect4Array(vDataJSONArr);
}


function initFormClass(pClass) {
  var vClassTypeHash = getForm2ClassTypeHash();
  var vClassType = vClassTypeHash[pClass] || "";
  var vSuperClass = getValueDOM("tSuperClassname");
  if (vSuperClass && vSuperClass != "") {
    initClassJS(vSuperClass,vClassType,"initFormClass()");
  };
  updateForm2JSON(pClass,vClassType); // jsondb.js:157
  console.log("initFormClass('"+pClass+"') DONE");
}
