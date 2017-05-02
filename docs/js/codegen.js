function compressCode4Class() {
  console.log("compressCode4Class() not used in JSCC");
  displayCompress();
  // var vCompCode = compressCodeJS();
  // console.log("compressed length="+vCompCode.length);
  // setEditorValue("iOutput",vCompCode);
};

function compressCodeJS() {
  var vCode = getEditorValue("iOutput");
  console.log("compressCodeJS() length="+vCode.length+" not used in JSCC so far");
  var vCodeTree = UglifyJS.parse(vCode);
  vCodeTree.figure_out_scope();
  var vCompressorOptions = {
    sequences     : true,  // join consecutive statemets with the “comma operator”
    properties    : true,  // optimize property access: a["foo"] → a.foo
    dead_code     : true,  // discard unreachable code
    drop_debugger : true,  // discard “debugger” statements
    unsafe        : false, // some unsafe optimizations (see below)
    conditionals  : true,  // optimize if-s and conditional expressions
    comparisons   : true,  // optimize comparisons
    evaluate      : true,  // evaluate constant expressions
    booleans      : true,  // optimize boolean expressions
    loops         : true,  // optimize loops
    unused        : true,  // drop unused variables/functions
    hoist_funs    : true,  // hoist function declarations
    hoist_vars    : false, // hoist variable declarations
    if_return     : true,  // optimize if-s followed by return/continue
    join_vars     : true,  // join var declarations
    cascade       : true,  // try to cascade `right` into `left` in sequences
    side_effects  : true,  // drop side-effect-free statements
    warnings      : true,  // warn about potentially dangerous optimizations/code
    global_defs   : {}     // global definitions
  };
  compressor = UglifyJS.Compressor(vCompressorOptions);
  ast = ast.transform(compressor);
  code = ast.print_to_string();
}

function createProjectJSON() {
  //hide("bSaveJSON");
  var vExportFile = "project";
  updateForm2JSON(getValueDOM("tClassname"));
  saveCode4JSON_JS(vJSON_JS,vExportFile,"Project JSON");
};

function createDatabaseJSON() {
  var vDB = getValueDOM("sDatabases");
  if (vDB == "") {
    //vDB = "project";
    console.log("WARNING: createDatabaseJSON() vDB undefined");
    alert("No Database was selected! Will export [Project JSON]");
    createProjectJSON();
  } else {
    var vType = "JSON"; //i.e. JS or JSON
    if (getCheckBox("checkUsePrefix") == true) {
      vType = "JS";
    };
    var vFileDB = writeFilenameWithPath4DB(vDB);
    write2exportedDB(vDB);
    // sExportPrefix = "JSON" means do not use the export prefix, it is pure JSON,
    selectDatabase();
    alert("Exported Database: '"+vFileDB+"' Format: '"+vType+"'");
    var vFileName = getSaveFilename4DB(vDB);
    var vContent = getEditorValue("iJSONDB");
    saveFile2HDD(vFileName,pContent);
  };
};

function write2exportedDB(pDB) {
  var vDB = pDB || "";
  if (vDB != "") {
    var vFileDB = writeFilenameWithPath4DB(vDB);
    write2innerHTML("labExportFile",vFileDB);
    write2value("tExportedJSON",vDB);
  };
};

function getSaveFilename4DB(pDB) {
  var vDB = pDB || "";
  var vExtension = getExtension4DB(vDB);
  if (vDB != "") {
    vDB = vDB.replace(/[^A-Za-z0-9_\.]/g,"_");
  };
  return vDB+vExtension;
}

function getExtension4DB(pDB) {
  var vDB = pDB || "";
  var vExtension = ".json";
  if (getCheckBox("checkUsePrefix") == true) {
    vExtension = ".js";
  };
  if (vDB == "") {
    vExtension = "";
  };
  return vExtension;
}

function writeFilenameWithPath4DB(pDB) {
  var vDB = pDB || "";
  var vPath = "";
  var vExtension = getExtension4DB(vDB);
  if (vJSON_JS["DatabaseList"][vDB]) {
    console.log("writeFilenameWithPath4DB()-Call: Database ["+vDB+"] exists");
    vPath = getValueDOM("tDefaultAppPath")+"db/";  // this is the default app_Path
  } else {
    vPath = "prog/";
  };
  vPath += vDB + vExtension
  return vPath;
};

function saveCode4JSON_JS(pJSONDB,pDB,pTitle) {
  // creates the JSON String (stringify) and saves to HDD
  var vFileName = getSaveFilename4DB(pDB);
  createCode4JSON_JS(pJSONDB,pDB,pTitle);
  var vContent = getEditorValue("iJSONDB");
  saveFile2HDD(vFileName,vContent)
}

function createCode4JSON_JS(pJSONDB,pDB,pTitle) {
  // creates the JSON String (stringify)
  var vTitle = pTitle || "";
  var vDB = pDB || "project"; //means vJSON_JS will be export as project JSON
  // set modification data of JSON
  pJSONDB["mod_date"] = getDateTime();
  var vContent = getCode4JSON_JS(pJSONDB);
  var vType = "JSON";
  var vMode =  "ace/mode/json";
  if (getCheckBox("checkUsePrefix") == true) {
    vType = "JS";
    vContent = getExportPrefix4DB(vDB)+vContent;
    vMode =  "ace/mode/javascript";
  };
  var vExportFile = writeFilenameWithPath4DB(vDB);
  if (pJSONDB) {
    console.log("Create JSON Code from vJSON_JS Title: '"+vTitle+"' - File: '"+vExportFile+"' - Type: '"+vType+"'");
    write2editor("JSONDB",vContent,vMode);
    // Write the selected DB into innerHTML of DOM and into value of "tExportedJSON"
    write2exportedDB(vDB);
    if (vTitle != "") {
      alert("JSON '"+vTitle+"' exported. File: '"+vExportFile+"'");
    };
    //document.fCreator.tJSONDB.value = getCode4JSON_JS(pJSONDB);
  } else {
    console.log("createCode4JSON_JS()-Call Error pJSONDB undefined");
  }
}

function saveFile2HDD(pFilename,pContent) {
  var file = new File([pContent], {type: "text/plain;charset=utf-8"});
  saveAs(file,pFilename);
}

function getCode4JSON_JS(pJSONDB) {
  return JSON.stringify(pJSONDB, null, 4);
};

function exportHTML() {
  var vFile = getValueDOM("sFileHTML");
  var vStandanlone = getValueDOM("sStandalone") || "NO";
  if (existsFileJS(vFile)) {
    exportHTML4File(vFile,vStandanlone);
  } else {
    alert("WARNING: Definition for File '"+vFile+"' does not exist");
  };
}

function exportHTML4File(pFile,pStandalone) {
  var vHTML = getHTML4File(pFile,pStandalone);
  //write2value("tMainHTML",vHTML);
  write2editor("MainHTML",vHTML);
};

function saveCode4Class() {
  var vClassID = getSelectedClassID();
  var vFilename = vClassID.toLowerCase()+".js";
  var vContent = getEditorValue("iOutput");
  alert("Save Javascript Class File to '"+getValueDOM("tDefaultAppPath")+"js/"+vFilename+"' in your WebApp");
  saveFile2HDD(vFilename,pContent)
  //vreadFileTXT("tpl/index.html");
}


function exportMainHTML() {
  var vHTML = getMainHTML();
  //write2value("tMainHTML",vHTML);
  write2editor("MainHTML",vHTML);
};

function getMainHTML() {
  return getHTML4File("app.html");
};

function getHTML4File(pFile,pStandalone) {
    var vHTML   = getTemplate4File(pFile);
    // insert Library Import or Library SCRIPT-Tags with Code
    var vReplace = getDatabasesHTML(pFile,pStandalone);
    vReplace += "\n"+getLibrariesHTML(pFile,pStandalone);
    //alert("vReplace="+vReplace.substring(0,300))
    vHTML = replaceString(vHTML,"___LIBRARIES___",vReplace);
    // Insert Generated Pages
    vHTML = replaceString(vHTML,"___PAGES___",getPagesHTML4Code(pFile)+"\n");
    vHTML = replaceElements4HTML(vHTML,pFile);
    return vHTML;
};

function replaceElements4HTML(pHTML,pFile) {
  if (existsFileJS(pFile)) {
    var vElemHash = vJSON_JS["FileList"][pFile]["elements"];
    for (var iElemID in vElemHash) {
      if (vElemHash.hasOwnProperty(iElemID)) {
        pHTML = replaceString(pHTML,"___"+iElemID+"___",vElemHash[iElemID]);
      };
    };
  };
  return pHTML;
};

function loadProjectJSON(pProjectFile) {
  console.log("loadProjectJSON('"+pProjectFile+"')");
  if (pProjectFile) {
    readFile2Editor(pProjectFile,"iOutput");
  } else {
    console.log("ERROR: loadProjectJSON(pProjectFile)-Call pProjectFile undefined!");
  }
};

function importProjectJSON() {
  var fileToLoad=document.getElementById("myImportFile").files[0]; //for input type=file
  if (fileToLoad) {
    console.log("importProjectJSON() - File '"+fileToLoad.name+"' exists.");
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var vTextFromFileLoaded = fileLoadedEvent.target.result;
        //document.getElementById("inputTextToSave").value = textFromFileLoaded;
        //alert("textFromFileLoaded="+textFromFileLoaded);
        importProjectJSON_do(fileToLoad.name,vTextFromFileLoaded);
      };
    fileReader.readAsText(fileToLoad, "UTF-8");
  } else {
    alert("File is missing");
  };
}


function importProjectJSON_do(pProjectFile,pContent) {
  var vContent = pContent || "{'name':'"+pProjectFile+"'}";
  //alert(vContent);
  vContent = removeDBPrefix(vContent);
  if (vContent) {
    var vJSDB = JSON.parse(vContent);
    if (vJSDB) {
      var vTypeJS = vJSDB["init_type"] || "JSON";
      switch (vTypeJS) {
        case "JSCC":
          alert("Import JSON file of Type: "+vTypeJS+"");
          vJSON_JS = vJSDB;
          setEditorValue("iJSONDB",vContent);
          writeFileTitle()
          initCodeCreator();
        break;
        case "CLASS":
          alert("Import JSON file of Type: "+vTypeJS+"");
          importClass(vJSDB);
        break;
        case "TPL":
          alert("Import JSON file of Type: "+vTypeJS+"");
          importTemplatesJSON_do(vJSDB);
        break;
        case "DB":
          var vDBname = vJSDB["name"] || "DBundefined";
          alert("Import JSON Database '"+vDBname+"' of Type: "+vTypeJS+"");
          importDatabase(vDBname,vJSDB);
          vJSON_JS["DatabaseList"][vDBname] = vJSDB;
        break;
        default:
          var vDBname = pProjectFile;
          alert("Import to Database '"+vDBname+"' of Type: "+vTypeJS+"");
      }
    }
  }
}

function exportClass(pClass) {
  console.log("exportClass('"+pClass+"')");
  var vClassJS = getClassJSON(pClass);
  var vClassTypeHash = getClassTypeJSON();
  vClassJS["sClassType"] = vClassTypeHash[pClass];

}

function importClass(pJSDB) {
  var vClass = pJSONDB["tClassname"] || "UndefClass";
  var vClassType = pJSONDB["sClassType"] || "";
  console.log("importClass(pJSDB) for Class '"+vClass+"' ClassType='"+vClassType+"'");
  if (existsClassJS(vClass)) {
    var vCheck = confirm("Class '"+vClass + "' exists.\nDo you really want to import the class\nand overwrite the existing definition?");
    if (vCheck == false) {
      alert("Import Class '"+vClass+"' cancelled!");
    } else {
      // Set ClassType for Class
      vJSON_JS["ClassType"][vClass] = vClassType;
      // Set Class in vJSON_JS for vClass
      vJSON_JS["ClassList"][vClass] = vJSDB;
    };
  }
};

function importDatabase(pDBname,pJSDB) {
  var vDBname = pJSONDB["name"] || pDBname || "UndefDB";
  var vClassType = pJSONDB["sClassType"] || "";
  console.log("importClass(pJSDB) for Database '"+vDatabase+"' DatabaseType='"+vDatabaseType+"'");
  if (existsDatabaseJS(vDBname)) {
    var vCheck = confirm("Database '"+vDBname + "' exists.\nDo you really want to import the JSON file\nand overwrite the existing database?");
    if (vCheck == false) {
      alert("Import Database '"+vDBname+"' cancelled!");
    } else {
      // Set Database in Global vDatabase Hash
      vDatabase[vDBname] = vJSDB;
      // Import JSON for the Database vDatabase
      vJSON_JS["DatabaseList"][vDBname] = vJSDB;
    };
  }
};

function getTemplate4File(pFile) {
  // pFile ignored
  var vTemplate = getValueDOM("tTplHTML") || "undefined Template";
  return vTemplate;
};

function X_getTemplate4File(pFile) {
  // Loading File does not work with pFile as Parameter
  var vTemplate = getValueDOM("tTplHTML");
  if (existsFileJS(pFile)) {
    var vTPLfilename = getTemplateFilename(pFile);
    var vFileHash = readTextFile2Hash("tpl/"+vTPLfilename);
    if (vFileHash["sucess"]) {
      vTemplate = vFileHash["content"];
      console.log("getTemplate4File('"+pFile+"') Template 'tpl/"+vTPLfilename+"' loaded successfully");
    } else {
      console.log("WARNING: getTemplate4File('"+pFile+"') could not load  Template 'tpl/"+vTPLfilename+"', use default template 'tTplHTML' in textarea instead");
    };
  } else {
    console.log("WARNING: getTemplate4File('"+pFile+"') pFile does not exist in vJSON_JS['FileList'] use default template 'tTplHTML' in textarea instead");
  };
  return vTemplate
}

function getTemplateFilename(pFile) {
  var vTPLfilename = "";
  if (existsFileJS(pFile)) {
    vTPLfilename = vJSON_JS["FileList"][pFile]["tTemplateHTML"];
  } else {
    console.log("ERROR: getTemplateFilename('"+pFile+"') Filename of Template not defined");
  };
  return vTPLfilename;
};

function getLibrariesHTML(pFile,pStandalone) {
  var vOut = "";
  vOut += getGlobalLibrariesHTML(pFile,pStandalone)+"\n";
  vOut += getClassLibrariesHTML(pFile,pStandalone);
  return vOut;
}

function getGlobalLibrariesHTML(pFile,pStandalone) {
  // Parameter pFile can be used to import a dependent set libraries
  var vSCRIPT = getValueDOM("tTplSCRIPT");
  var vArrJS = getGlobalLibArray();
  var vOut = "      <!-- JavaScript Libraries -->\n";
  for (var i = 0; i < vArrJS.length; i++) {
    vOut += replaceString(vSCRIPT,"___LIBRARY___","js/"+vArrJS[i]+".js");
  };
  return vOut;
}

function getClassLibrariesHTML(pFile,pStandalone) {
  // Parameter pFile can be used to import a dependent set libraries
  var vArrJS = getDatabaseArray();
  var vOut = "      <!-- Classes Javascript-Libs -->\n";
  var vCList = vJSON_JS["ClassList"];
  for (var iClass in vCList) {
    if (vCList.hasOwnProperty(iClass)) {
      vOut += getClassHTML4Code(iClass,pStandalone);
    }
  };
  return vOut;
}

function getClassHTML4Code(pClass,pStandalone) {
  var vSCRIPT = "";getValueDOM("tTplSCRIPT");
  var vOut = "";
  if (pStandalone == "YES") {
    vSCRIPT = getValueDOM("tTplSCRIPTSTANDALONE");
    vOut = replaceString(vSCRIPT,"___JSCODE___",getCode4Class(pClass));
  } else {
    var vLibName = pClass.toLowerCase();
    vSCRIPT = getValueDOM("tTplSCRIPT");
    vOut = replaceString(vSCRIPT,"___LIBRARY___","js/"+vLibName+".js");
  };
  return vOut
}

function getPagesHTML4Code(pFile) {
  var vOut = "";
  var vPageList = getPageListArrayWithHashes(pFile);
  for (var i = 0; i < vPageList.length; i++) {
    // vPageList[i]; is a Hash with the following IDs
    //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
   vOut += createPageHTML4Code(vPageList[i]);
  }
  return vOut;
}

function createPageHTML4Code(pPageHash) {
  var vOut = "";
  // pPageHash has the following IDs
  //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
  var vPageID     = pPageHash["PAGE_ID"];
  var vPageTypeID = pPageHash["page-type"];
  var vPageTpl    = getPageTypeTemplate4Code(vPageTypeID);
  var vPageContent = vJSON_JS["PageContent"][vPageID] || " undefined content for page '"+ vPageID+"'";
  // Header Buttons are already inserted in PageType-Template
  // ToDo: Insert
  if (vPageTpl) {
    console.log("createPageHTML4Code('"+pPageHash["PAGE_ID"]+"') PageType='"+vPageTypeID+"' is defined");
    vOut = vPageTpl;
  } else {
    console.log("createPageHTML4Code('"+pPageHash["PAGE_ID"]+"') PageType='"+vPageTypeID+"' UNDEFINED - use DEFAULT");
    vOut= getValueDOM("tTplPAGE");
  };
  vOut = replaceString(vOut,"___PAGE_TITLE___",pPageHash["PAGE_TITLE"]);
  vOut = replaceString(vOut,"___PAGE_ID___",pPageHash["PAGE_ID"]);
  vOut = replaceString(vOut,"___PAGE_CONTENT___",vPageContent);
  vOut = replaceString(vOut,"___MENU_CONTENT___",getPageMenu4ID(vPageID));
  return vOut;
};

function getPageMenu4ID(vPageID) {
  var vChildArrID = getChildPageIDs(vPageID);
  var vID = "";
  var vTPL = getValueDOM("tTplMENU");
  var vMenuList = "";
  for (var i = 0; i < vChildArrID.length; i++) {
    vID = vChildArrID[i]; // vID is a PageID
    vMenuList += getPageMenuItem(vID);
  };
  vTPL = replaceString(vTPL,"___MENUITEM_LIST___",vMenuList);
  return vTPL;
};

function getChildPageIDs(pParentPageID) {
  var vArrID = [];
  var vParentID = "";
  if (existsPageJS(pParentPageID)) {
    var vPageList = vJSON_JS["PageList"];
    for (var iPageID in vPageList) {
      if (vPageList.hasOwnProperty(iPageID)) {
        vParentID = vPageList[iPageID]["parent-id"];
        if (vParentID == pParentPageID) {
          vArrID.push(iPageID);
        };
      };
    };
  };
  return vArrID;
};

function getPageMenuItem(pPageID) {
  // pPageID is the ID of page for which a menu item is created.
  var vTPL = getValueDOM("tTplMENUITEM");
  if (existsPageJS(pPageID)) {
    var vPageTitle = vJSON_JS["PageList"][pPageID]["PAGE_TITLE"];
    vTPL = replaceString(vTPL,"___PAGE_ID___",pPageID);
    vTPL = replaceString(vTPL,"___PAGE_TITLE___",vPageTitle);
  };
  return vTPL;
}

function getPageTypeTemplate4Code(pPageTypeID) {
  var vPageTpl = "";
  var vButton1 = "";
  var vButton2 = "";
  var vOutHash = null;
  var vBID
  if (existsPageTypeJS(pPageTypeID)) {
    var vPT = vJSON_JS["PageType"][pPageTypeID];
    vPageTpl = vPT["template"];
    vOutHash = getButtonDefinition4Code(vPT["HEADER_BUTTON1"]);
    vButton1 = vOutHash["tButtonDefHTML"];
    vOutHash = getButtonDefinition4Code(vPT["HEADER_BUTTON2"]);
    vButton2 = vOutHash["tButtonDefHTML"];
  } else {
    console.log("getPageTypeTemplate4Code('"+pPageTypeID+"') Template was UNDEFINED");
    vPageTpl = getValueDOM("tTplPAGE");
  };
  vPageTpl = replaceString(vPageTpl,"___HEADER_BUTTON1___",vButton1);
  vPageTpl = replaceString(vPageTpl,"___HEADER_BUTTON2___",vButton2);
  return vPageTpl;
};

function getButtonDefinition4Code(pButtonID) {
    console.log("getButtonDefinition4Code('"+pButtonID+"')");
    var vOutHash = {
          "BUTTON_ID":pButtonID,
          "BUTTON_TITLE":firstUpperCase(pButtonID.toLowerCase()),
          "button-type":"",
          "tButtonDefHTML":""
        };
    var vOut = "";
    if (pButtonID && (pButtonID != "")) {
      if (pButtonID == pButtonID.toUpperCase()) {
        var vBT;
        if (existsButtonJS(pButtonID)) {
          //console.log("Button ["+pButtonID+"] exists for Code Generation");
          vBT = vJSON_JS["ButtonList"][pButtonID];
        } else {
          alert("Button ["+pButtonID+"] is undefined, a default button will be created for you!");
          vBT = getDefaultButtonHash(pButtonID);
          vJSON_JS["ButtonList"][pButtonID] = vBT;
          updateButtonJSON2Form();
        };
        // It is a predefined Button in ButtonList
        vOut = vBT["tButtonDefHTML"];
        vBT["counter"]++;
        vOut = replaceString(vOut,"___COUNTER___",vBT["counter"]);
        vOut = replaceString(vOut,"___BUTTON_TITLE___",vBT["BUTTON_TITLE"]);
        vOutHash["button-type"] = "BUTTON";
      } else {
        console.log("Button-LINK: getButtonDefinition4Code('"+pButtonID+"') - ID is used as Page-ID '"+pButtonID+"'");
        vOut = getValueDOM("tTplPageLinkBUTTON");
        //pButtonID is a regarded as Page-ID, because a definition for the Button does not exist in ButtonList
        var vTitle = getPageTitle4ID(pButtonID);
        vOut = replaceString(vOut,"___LINK_PAGE_ID___",pButtonID);
        vOut = replaceString(vOut,"___BUTTON_TITLE___",vTitle);
        vCounter++;
        vOut = replaceString(vOut,"___COUNTER___",vCounter);
        vOutHash["button-type"] = "LINK";
        //vOut = replaceString(vOut,"__BUTTON_ID__",pButtonID);
      };
      vOut = replaceString(vOut,"___BUTTON_ID___",pButtonID.toUpperCase());
      vOutHash["tButtonDefHTML"] = vOut;
    } else {
      console.log("ERROR: getButtonDefinition4Code(pButtonID) - pButtonID UNDEFINED");
    };
    console.log("Button Definition:\nvOut="+vOut);
    return vOutHash;
};

function getPageTitle4ID(pPageID) {
  var vTitle = "Title '"+pPageID+"'?";
  if (pPageID) {
    if (existsPageJS(pPageID)) {
      vTitle = vJSON_JS["PageList"][pPageID]["PAGE_TITLE"];
    } else {
      console.log("getPageTitle4ID('"+pPageID+"') - Page for Page-ID is UNDEFINED!");
    };
  } else {
    console.log("getPageTitle4ID(pPageID)-Call - ERROR: pPageID was UNDEFINED");
  };
  return vTitle; //
};

function getDatabasesHTML() {
  var vSCRIPT = getValueDOM("tTplSCRIPT");
  var vArrDB = getDatabaseArray();
  var vOut = "      <!-- JSON Databases -->\n";
  for (var i = 0; i < vArrDB.length; i++) {
    vOut += replaceString(vSCRIPT,"___LIBRARY___","db/"+vArrDB[i]+".js");
  };
  return vOut;
};

function parameterHasClassDef(pPar) {
  var vRet = null;
  if (pPar) {
    vRet = pPar.match(/\s*:\s*[A-Za-z][A-Za-z0-9_]+\s*^/g);
    //console.log("parameterHasClassDef(pPar) TRUE");
    vRet = true;
  } else {
    //console.log("parameterHasClassDef(pPar) FALSE");
    vRet = false;
  };
  return vRet;
};

function edit2JSparams(pEditParams) {
  console.log("Split Params and Check with edit2JSparams('"+pEditParams+"') ");
  var vParArr = pEditParams.split(",");
  var vParOut = [];
  var vParam = "";
  for (var i = 0; i < vParArr.length; i++) {
    var vClass4Param = parameterHasClassDef(vParArr[i]);
    if (vClass4Param) {
      vParam = vParArr[i].substring(0,vParArr[i].lastIndexOf(":"));
      vParOut.push(vParam);
      console.log("parameterHasClassDef('"+vParArr[i]+"') TRUE '"+vParam+"'");
    } else {
      vParOut.push(vParArr[i]);
      console.log("parameterHasClassDef('"+vParArr[i]+"') FALSE ");
    };
  };
  return vParOut.join(",");
};

function displayCompress() {
    if (vWinCompress != null) {
      if (vWinCompress.close) {
        vWinCompress.close();
      };
    };
    var vParam = "?autoclose=1";
    vWinCompress = window.open("uglify/index.html"+vParam,"wCOMP"+Date.now(),"width=900,height=600");
};


function displayUML() {
    if (vWinUML != null) {
      if (vWinUML.close) {
        vWinUML.close();
      };
    };
    vWinUML = window.open("uml/index.html","wUML","width=900,height=600");
};

function saveCode4Class() {
  var vCode = getEditorValue("iOutput");
  var vClass = getSelectedClassID();
  var vPath = getValueDOM("tDefaultAppPath");
  var vFileHDD = vClass.toLowerCase() + ".js";
  var vFilePathHDD = vPath + "js/" + vFileHDD;
	alert("Javascript Class Created!\nCopy Javascript Code into File and\nuse filename '"+vFilePathHDD+"'!");
  saveFile2HDD(vFileHDD,vCode);
}

function createCode4Class() {
  var vClass = getSelectedClassID();
  console.log("createCode4Class() '"+vClass+"'");
  var vCode = getCode4Class(vClass);
  write2editor("Output",vCode);
};

function getCode4Class(pClass) {
  var vClass = pClass || "";
  console.log("getCode4Class('"+vClass+"')");
  var vOutput = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    var vClassFile  	  = getClassFile4ClassJSON(vClassJS);
    var vSuperClass     = vClassJS["tSuperClass"];
  	var vMethodHeader   = getValueDOM("tMethodHeader");
    var vClassTail    	= getValueDOM("tClassTail");
  	//var vAttributes 	= document.fCreator.tAttributes.value;
  	//var vMethods    	= document.fCreator.tMethods.value;
  	var vMethodArray    = getMethodArray();
  	var vAttribConstructor = ""; //"	//---Attributes-------------------------\n";
  	var vMethodConstructor = "	//---Methods----------------------------\n";
  	vOutput = getValueDOM("tHeader");
    vOutput       = replaceCodeMainVars(vOutput,vClass);
  	vMethodHeader = replaceCodeMainVars(vMethodHeader,vClass);
    vOutput       = replaceAttributes4Code(vOutput,vClass);
    vOutput       = replaceMethods4Code(vOutput,vMethodHeader,vClass);
  	vClassTail    = replaceString(vClassTail,"___CLASSNAME___",vClassJS["tClassname"]);
  	vOutput += vClassTail;
  } else {
    console.log("ERROR: getCode4Class('"+vClass+"') Class does not exist");
    vOutput = "// ERROR: Code for Class '"+vClass+"' does not exist"
  };
  return vOutput;
};

function getClassFile4ClassJSON(pClassJS) {
  var vClassname = pClassJS["tClassname"] || "UndefinedClass";
  return vClassname.toLowerCase()+".js";
}

function replaceCodeMainVars(pOutput,pClass) {
  var vOutput = pOutput || "undefined code";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vClassname 		= vClassJS["tClassname"];
	var vClassFile  	= getClassFile4ClassJSON(vClassJS);
  var vSuperClassDef = getValueDOM("tTplSuperClass");
  var vSuperClassProtoDef = getValueDOM("tTplSuperClassProto");
  var vMethodDefPrefix = "";
  if (vClassJS["tSuperClassname"] == "") {
    vSuperClassDef = "	// no superclass defined\n";
    vSuperClassProtoDef = "	// no superclass defined\n";
	} else {
    if (getValueDOM("sPrototype") == "YES") {
      vSuperClassDef = "";
      vMethodDefPrefix = vClassname + ".prototype";
    } else {
      vSuperClassProtoDef = "";
      vMethodDefPrefix = "this";
    };
  };
  vOutput = replaceString(vOutput,"___AUTHOR___",vClassJS["tAuthor"]);
  vOutput = replaceString(vOutput,"___EMAIL___",vClassJS["tEMail"]);
  vOutput = replaceString(vOutput,"___SUPERCLASSPROTOTYPE___",vSuperClassProtoDef);
  vOutput = replaceString(vOutput,"___SUPERCLASS___",vSuperClassDef);
  vOutput = replaceString(vOutput,"___SUPERCLASSNAME___",vClassJS["tSuperClassname"]);
  vOutput = replaceString(vOutput,"___CLASSNAME___",vClassJS["tClassname"]);
  vOutput = replaceString(vOutput,"___CLASSFILENAME___",vClassFile);
  vOutput = replaceString(vOutput,"___DATE___",vClassJS["tDate"]);
  vOutput = replaceString(vOutput,"___MODDATE___",getDate());
  vOutput = replaceString(vOutput,"___METHODDEFPREFIX___",vMethodDefPrefix);
  return vOutput;
};

function replaceAttributes4Code(pOutput,pClass) {
  var vOutput = pOutput || "undefined pOutput";
  var vClass = pClass || getValueDOM("tClassname");
  var vAttribArray    = getAttribNameArray(vClass);
  var vClassJS = getClassJSON(vClass);
  var vTemplate = getValueDOM("tTplAttribute");
  var vAttribDef = "";
  var vID = "";
  var vAttribConstructor = ""; //"	//---Attributes-------------------------\n";
  for (var i=0; i<vAttribArray.length; i++) {
    //alert(vAttribArray[i]);
    vID = vAttribArray[i];

    vAttribDef = vTemplate; // init with AttribTemplate
    // replace Attribute Name
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_NAME___",vID);
    // replace Attribute Default/Init Value
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_DEFAULT___",vClassJS["AttribDefault"][vID]);
    // replace Attribute Comment
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_COMMENT___",vClassJS["AttribComment"][vID]);
  };
  vOutput = replaceString(vOutput,"___ATTRIBUTES___",vAttribDef);
  return vOutput;
};

function replaceMethods4Code(pOutput,pMethodHeader,pClass) {
  var vOutput = pOutput || "undefined pOutput";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vMethodArray = getMethodArray();
  var vMethodHeader = pMethodHeader || "undefined MethodHeader";
  var vMethod = vMethodHeader;
  var vMethodname = "";
  var vMethodAllParams = "";
  var vMethodParamsClass = "";
  var vSplitArray;
  var vOutMeth = getValueDOM("tMethodsHeaderTpl");
  vOutMeth = replaceString(vOutMeth,"___CLASSNAME___",vClassJS["tClassname"]);
  for (var i=0; i<vMethodArray.length; i++) {
    // start with clean MethodHeader Template for each Method Definition
    vMethod = vMethodHeader;
    var vOpenBracketPos = vMethodArray[i].indexOf("(");
    if (vOpenBracketPos >0) {
      vSplitArray = vMethodArray[i].split("(");
      var vCloseBracketPos = vSplitArray[1].lastIndexOf(")");
      if (vCloseBracketPos<0) {
        alert("ERROR: Method definition error!\n No closing bracket!\n"+vMethodArray[i]);
      } else {
        vMethodParamsClass = vSplitArray[1].substring(0,vCloseBracketPos);
        vMethodAllParams = edit2JSparams(vMethodParamsClass);
      };
      var vMethName = vSplitArray[0];
      var vReturn = vClassJS["MethodReturn"][vMethName];
      var vReturnColon = "";
      var vReturnComment = "";
      if (vReturn != "") {
        vReturnColon = ":"+vReturn;
        vReturnComment = "Return: "+vReturn;
      };
      //----- Parameter Comments lines -----
      var vParArr = vMethodParamsClass.split(",");
      var vCommentPrefix = "//";
      var vCommentBoxPrefix = "#";
      var vComPrefix = "\n" + vCommentPrefix + vCommentBoxPrefix+"    ";
      var vParameterComment = vParArr.join(vComPrefix);
      //---- Replace all Method specific variable in MethodHeader ----
      vMethod = replaceString(vMethod,"___METHODDEF___",vMethodArray[i]);
      vMethod = replaceString(vMethod,"___METHODCALL___",vMethName+"("+vMethodAllParams+")");
      vMethod = replaceString(vMethod,"___METHODNAME___",vMethName);
      vMethod = replaceString(vMethod,"___RETURNCOMMENT___",vReturnComment);
      vMethod = replaceString(vMethod,"___METHODPARAMETERS___",vMethodAllParams);
      vMethod = replaceString(vMethod,"___PARAMETERDEF___",vParameterComment);
      var vMethodComment = getMethodComment(vMethodArray[i]) || "   What does '"+vSplitArray[0]+"' do?";
      vMethodComment     = replaceString(vMethodComment,"\n","\n//#    ");
      vMethod = replaceString(vMethod,"___METHODCOMMENT___",vMethodComment);
      var vMethodCode = getMethodCode(vMethodArray[i]) || "//----------- INSERT YOUR CODE HERE ---------------";
      vMethodCode = "\t"+replaceString(vMethodCode,"\n","\n\t");
      vMethod = replaceString(vMethod,"___METHODCODE___",vMethodCode);
      vOutMeth += vMethod;
      //vSplitArray = vMethodArray[i].split("(");
    } else {
      //alert("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
    }
  };
  if (getValueDOM("sPrototype") == "YES") {
    console.log("Methods are defined with Prototype approach");
    vOutput = replaceString(vOutput,"___METHODSPROTOTYPE___",vOutMeth);
    vOutput = replaceString(vOutput,"___METHODS___","");
  } else {
    console.log("Methods are NOT defined with Prototype approach");
    var vArr = vOutMeth.split("\n");
    vOutMeth = vArr.join("\n\t");
    vOutput = replaceString(vOutput,"___METHODS___",vOutMeth);
    vOutput = replaceString(vOutput,"___METHODSPROTOTYPE___","");
  };
  return vOutput;
};


function createLinkedMethodDefinitions() {
  var vMethodArray = getMethodArray();
  var vSplitArray;
  var vMethodConstructor = "	//---Methods----------------------------\n";
	for (var i=0; i<vMethodArray.length; i++) {
		if (vMethodArray[i].indexOf("(")>0) {
			vSplitArray = vMethodArray[i].split("(");
			vMethodConstructor += "\tthis."+vSplitArray[0]+"\t = "+vSplitArray[0]+"_"+vClassname+";\n";
		};
	};

};

function exportTemplatesJSON() {
  //var vOut = getCode4JSON_JS(vJSON_TPL);
  updateForm2TemplateJSON();
  vJSON_TPL["init_type"] = "TPL"; // Type is set to Templates
  vJSON_TPL["mod_date"] = getDateTime(); // set Export Date of Templates
  createCode4JSON_JS(vJSON_TPL,"code_templates","Database Templates");
  $( "#tabJSON" ).trigger( "click" );
};

function importTemplatesJSON() {
  //var vOut = getCode4JSON_JS(vJSON_TPL);
  updateTemplatesJSON2Form();
};

function updateTemplatesJSON2Form() {
  // vDOM_TPL is an array of DOM-IDs for textareas to read and write from
  // vJSON_TPL is a hash for DOM-IDs containing the template as text
  var vID = "";
  for (var i = 0; i < vDOM_TPL.length; i++) {
    vID = vDOM_TPL[i]
    if (vJSON_TPL.hasOwnProperty(vID)) {
      write2value(vID,vJSON_TPL[vID])
    } else {
      console.log("vJSON_TPL['"+vID+"'] as Template undefined");
    }
  }
};

function populateForm2TemplateJSON() {
  updateForm2TemplateJSON();
};

function updateForm2TemplateJSON() {
  // vDOM_TPL is an array of DOM-IDs for textareas to read and write from
  // vJSON_TPL is a hash for DOM-IDs containing the template as text
  var vID = "";
  for (var i = 0; i < vDOM_TPL.length; i++) {
    vID = vDOM_TPL[i];
    if (vJSON_TPL.hasOwnProperty(vID)) {
      console.log("vJSON_TPL['"+vID+"'] as Template already defined");
    } else {
      vJSON_TPL[vID] = getValueDOM(vID);
      console.log("vJSON_TPL['"+vID+"'] set Template by textarea content in HTML from DOM");
    };
  };
};
