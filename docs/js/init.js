//#################################################################
//# Javascript Code Generator
//# GNU Public License V3 - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus
//# 2012 University Koblenz-Landau
//#################################################################
// DOM_Global Hash is used to store global values in LocalStorage and in vJSON_JS
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
vDOM_Global.push("tLibraries");
vDOM_Global.push("tDatabases"); // List of all included Databases
vDOM_Global.push("tExportPrefix"); // Export Prefix for Databases
vDOM_Global.push("sExportPrefix"); //Checkbox if Export Prefix should be used for Databases. Unchecked i.e. pure JSON export
vDOM_Global.push("sShowGeneralizations"); //UML-Settings for Diagram Export
vDOM_Global.push("sShowAggregations"); //UML-Settings for Diagram Export
vDOM_Global.push("sShowAssociations"); //UML-Settings for Diagram Export
//-------------------------------
vDOM_File.push("tElementIDs"); // Pipe separated ID String
vDOM_File.push("tElementID"); // the edit string of selected Element ID - used to edit a new Element ID
vDOM_File.push("sElementList"); // the select Box setting of selected Element ID
vDOM_File.push("tElementHTML"); // Content of Element Definition
vDOM_File.push("tFilename"); // Is the Filename
vDOM_File.push("sAppClassHTML"); // is the main App that is instantiated when a web site is loaded.
vDOM_File.push("tAppInitCall"); // Init Call when App is started
vDOM_File.push("tTemplateHTML"); // Template for HTML-File
vDOM_File.push("tPageIDs"); // Used Pages in HTML-File

//-------------------------------
vDOM_TPL.push("tDefaultAppPath"); // default is "app_LSAC/" needed as path to store the exported files for the WebApp.
vDOM_TPL.push("tTplHTML"); // template for "app.html" main file
vDOM_TPL.push("tTplSCRIPT"); // Script Tag for import Javascript Libraries
vDOM_TPL.push("tTplSCRIPTSTANDALONE"); // Script Tag for injection of Javascript code in ___JSCODE___
vDOM_TPL.push("tTplPAGE");  // Template for a DIV page of app.html (iterate for all pages of App)
vDOM_TPL.push("tTplMENU"); // Creates the template for a Menu of Childpages replace ID ___MENU_CONTENT___
vDOM_TPL.push("tTplMENUITEM"); // Definition of a single Menu Item replace IDs ___PAGE_ID___ and ___PAGE_TITLE___
vDOM_TPL.push("tTplPageLinkBUTTON"); // Definition of Header Buttons of an App, to link between pages
vDOM_TPL.push("tDefaultBUTTON"); // Default button that must be edited by user, contains an alert as event handler
vDOM_TPL.push("tTplQUIT"); // Main Quit Button (red) which will close the window
vDOM_TPL.push("tHeader"); // Class Header for Javascript Classes
vDOM_TPL.push("tMethodsHeaderTpl"); // Contains the methods header of definitions of methods
vDOM_TPL.push("tTplSuperClassProto"); // SuperClass definition with Prototype approach in Javascript
vDOM_TPL.push("tTplSuperClass"); // SuperClass definition without Prototype approach (more memory consumption for instances)
vDOM_TPL.push("tClassTail"); // Defines the End of the Class Definition
vDOM_TPL.push("tTplAttribute"); // Defines the Attributes definition in a Constructor
vDOM_TPL.push("tMethodHeader"); // Defines the comments before each Method definition
vDOM_TPL.push("tMethodPrefix"); //Defines prefix for defining a method
vDOM_TPL.push("tMethodPrefixProto"); // Defines the prefiv for defining a method with the protoype approach
vDOM_TPL.push("tClassTail"); // Defines the template appended at the end of class definition
vDOM_TPL.push("tTplLoopArray"); // Defines the Code for Loop over an Array
vDOM_TPL.push("tTplLoopHash"); // Defines the Code for Loop over Hash-IDs
vDOM_TPL.push("tCommentPrefix");  // Default is '//' as Javascript comment
vDOM_TPL.push("tCommentBoxPrefix"); // Default is '#'
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
vDOM_ID.push("tDate"); // Generated Date of Class
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
vDOM_ID.push("tMethodName");
vTYPE_ID.push("String");
vDOM_ID.push("tMethodComment");
vTYPE_ID.push("Textarea");
vDOM_ID.push("sMethodList");
vTYPE_ID.push("String");
//vTYPE_ID.push("Select");
vDOM_ID.push("tArrayLoop");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tMethodLoop");
vTYPE_ID.push("String");
//vDOM_ID.push("");


function initCodeCreator() {
  // if Local Storage is supported by Browser try to Load JSON DB with Classes
  console.log("initCodeCreator()-Call");
  var vDB = null;
  var vSelectedClass = getValueDOM("tClassname");
  console.log("initCodeCreator() Selected Class ["+vSelectedClass+"]");
  loadProjectJSON();
  if (typeof(Storage) != "undefined") {
     //alert("Local Storage");
     loadLocalStorage("dom");
     vDB = loadLocalStorage("json");
     if (vDB) {
       console.log("JSON Database exists in Local Storage");
       top.vJSON_JS = vDB;
       vSelectedClass = top.vJSON_JS["SelectedClass"] || "";
       vSelectedFile  = top.vJSON_JS["SelectedFile"]  || "";
       clearForm4Class(vSelectedClass);
       clearForm4File(vSelectedFile);
       updateJSON2Form(vSelectedClass);
       console.log("Selected Class ["+vSelectedClass+"] in JSON Database");
      } else {
        if (vJSON_JS.hasOwnProperty("ClassList") && vJSON_JS.hasOwnProperty("FileList")) {
          console.log("vJSON_JS was loaded from Library prog/project.js");
        } else if ((vJSON_JS["init_type"]) && vJSON_JS["init_type"] == "JSCC") {
          console.log("vJSON_JS was loaded from Library prog/project.js");
        } else {
          console.log("vJSON_JS was loaded from Definition in HTML Form of JSCC");
          top.vJSON_JS["init_type"] = "JSCC";
          top.vJSON_JS["init_date"] = getDateTime();
          top.vJSON_JS["mod_date"] = "";
          loadForm2JSON(vSelectedClass);
        };
      };
  } else {
      alert("Sorry, your browser does not support Local Storage...");
  };
  updateSelectors(); //select.js:140
  //document.fCreator.sClassList.value;
  //initClassJS(vSelectedClass);
  checkInterface4Class(vSelectedClass);
  updateClasses();
  //vClassJSON = vJSON_JS["ClassList"][vSelectedClass];
  //initLocalDB("vJSON_JS",pJSONDB)
  initLabelsHTML();
  //setTimeout('alert(readFile("tpl/test.txt"))',5000);
  initEditorContent();
  setClassSelectorDefault(vSelectedClass); // set selectedClass in Select-Tag with id="sClassList"
  updateJSON2tClassList();
  populateForm2TemplateJSON();
  createClassSelect();
  setClassSelectorDefault(vSelectedClass);
  createMethodSelect();
  createFileSelect();
  setDefaultSelectors();
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
  // init the selector settings from vJSON_JS
  var vClassJS = getClassJSON();
  var vFileID = vJSON_JS["SelectedFile"] || "";
  var vElementID = vJSON_JS["SelectedElement"] || "";
  var vPageID = vJSON_JS["SelectedPage"] || "";
  var vPageTypeID = vJSON_JS["SelectedPageType"] || "";
  var vButtonID = vJSON_JS["SelectedButton"] || "";
  if (vFileID != "") {
    selectFileJS(vFileID);
    write2value("sFileHTML",vFileID);
    write2value("sFileList",vFileID);
    write2value("sFileListHTML",vFileID);
    writeFileTitle(vFileID);
  };
  if (vElementID != "") {
    selectElementJS(vElementID);
    write2value("sElementList",vElementID);
  } else {
    write2value("sElementList","");
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
}

function initLabelsHTML() {
  var vSep = " | ";
  write2innerHTML("labelPageRecord",vPageRECDEF.join(vSep));
  write2innerHTML("labelPageTypeRecord",vPageTypeRECDEF.join(vSep));
  write2innerHTML("labelButtonRecord",vButtonRECDEF.join(vSep));
};

function initFormClassList() {
  console.log("initFormClassList()");
  var vClassTypeHash = getForm2ClassTypeHash(); //read from tClassList in  classes.js 413
  top.vJSON_JS["ClassType"] = vClassTypeHash;
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
     top.vJSON_JS["SelectedFile"] = vArr[0];
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
    if (!top.vJSON_JS) {
      var vError = "WARNING: initButtonJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    //------------------------------------
    top.vJSON_JS["SelectedButton"] = vButtonID;
    //------------------------------------
    if (top.vJSON_JS["ButtonList"]) {
      console.log("vJSON_JS['ButtonList'] exists");
    } else {
      top.vJSON_JS["ButtonList"] = {};
      console.log("vJSON_JS['ButtonList'] created");
    };
    if (top.vJSON_JS["ButtonList"][vButtonID]) {
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
    var vPageTypeJS = vJSON_JS["PageType"][pPageTypeID];
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
    if (!top.vJSON_JS) {
      var vError = "WARNING: initPageTypeJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    //------------------------------------
    top.vJSON_JS["SelectedTypePage"] = pPageType;
    //------------------------------------
    if (top.vJSON_JS["PageType"]) {
      console.log("vJSON_JS['PageType'] exists");
    } else {
      top.vJSON_JS["PageType"] = {};
      console.log("vJSON_JS['PageType'] created");
    };
    if (top.vJSON_JS["PageType"][pPageType]) {
      console.log("Page '"+pPageType+"' exists in JSON DB");
    } else {
      //top.createPageTypeJS(pPageType);
      top.vJSON_JS["PageType"][pPageType] = pPageTypeHash;
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
    if (!top.vJSON_JS) {
      var vError = "WARNING: initPageJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    //------------------------------------
    top.vJSON_JS["SelectedPage"] = vPageID;
    //------------------------------------
    if (top.vJSON_JS["PageList"]) {
      console.log("vJSON_JS['PageList'] exists");
    } else {
      top.vJSON_JS["PageList"] = {};
      console.log("vJSON_JS['PageList'] created");
    };
    if (top.vJSON_JS["PageList"][vPageID]) {
      console.log("Page '"+vPageID+"' exists in JSON DB");
    } else {
      top.createPageJS(pPageHash);
      console.log("Page '"+vPageID+"' created and updated from HTML Form with default values");
    };
  };
};


function initFormDatabaseList() {
  console.log("initFormDatabaseList()");
   var vDatabaseArr = getDatabaseArray(); //read from tDatabases in  classes.js 413
   for (var i = 0; i < vDatabaseArr.length; i++) {
     initDatabaseJS(vDatabaseArr[i]);
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
    if (!top.vJSON_JS) {
      var vError = "WARNING: initDatabaseJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    if (top.vJSON_JS["DatabaseList"]) {
      console.log("vJSON_JS['DatabaseList'] exists");
    } else {
      top.vJSON_JS["DatabaseList"] = {};
      console.log("vJSON_JS['DatabaseList'] created");
    };
    if (top.vJSON_JS["DatabaseList"][pDatabase]) {
      console.log("Database '"+pDatabase+"' exists in JSON DB");
    } else {
      top.vJSON_JS["DatabaseList"][pDatabase] = "{\n  \"name\": \""+pDatabase+"\"\n}";
      console.log("Database '"+pDatabase+"' created and updated from HTML Form with default values");
    };
  };
}


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
  var vFileList = vJSON_JS["FileList"] || {};
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
  var vClassList = vJSON_JS["ClassList"] || {};
  var vClassTypeHash = vJSON_JS["ClassType"] || {};
  var vTypeDef = "";
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClassArr.push(iClass);
      vTypeDef = vClassTypeHash[iClass] || "";
      if (vTypeDef != "") {
        vJSON_JS["ClassList"][iClass]["sClassType"] = vTypeDef;
        vTypeDef = " = " + vTypeDef;
      };
      vClassTypeArr.push(iClass+vTypeDef);
    };
  };
  write2value("tClassList",getJSON2ClassString());
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createClassSelect(vClassArr);
  createAttribTypeSelect();
  createAttribSelect();
  createMethodSelect(); //dom.js:13
};

function initButtonSelector() {
  write2value("tButtonList",getButtonListString());
  //var vButton = getValueDOM("tButtonname");
  //initButtonJS(vButton);
  var vArr = getArray4HashID(vJSON_JS["ButtonList"]);
  createButtonSelect(vArr);
};


function initPageTypeSelector() {
  write2value("tPageTypes",getPageTypeString());
  //var vButton = getValueDOM("tButtonname");
  //initButtonJS(vButton);
  var vArr = getArray4HashID(vJSON_JS["PageType"]);
  createPageTypeSelect(vArr);
};

function createArray4HashID(pHash) {
  var vArr = [];
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
      vArr.push(iID);
    };
  };
  return vArr;
}

function initButtonSelector() {
  var vButtonArr = [];
  var vButtonList = vJSON_JS["ButtonList"];
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
  var vPageArr = getArray4HashID(vJSON_JS["PageList"]);
  //initPageJS(vPage);
  createPageSelect(vPageArr);
};

function initDatabaseSelector() {
  var vDatabaseArr = [];
  var vDatabaseList = vJSON_JS["DatabaseList"];
  for (var iDatabase in vDatabaseList) {
    if (vDatabaseList.hasOwnProperty(iClass)) {
      vDatabaseArr.push(iClass);
    };
  };
  //ClassList update
  //document.fCreator.tClassList += "\n"+vClass;
  write2value("tDatabases",vDatabaseArr.join("\n"));
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createDatabaseSelect(vDatabaseArr);
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
