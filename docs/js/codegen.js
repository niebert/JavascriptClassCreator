function compressCode4Class() {
  console.log("compressCode4Class() not used in JSCC");
  displayCompress();
  // var vCompCode = compressCodeJS();
  // console.log("compressed length="+vCompCode.length);
  // setEditorValue("iOutput",vCompCode);
};

function compressCodeJS(pCode) {
  var vCode = pCode || getEditorValue("iOutput");
  console.log("compressCodeJS() length="+vCode.length+" ");
  var vWin = getCompressorWin();
  if (vWin) {
    console.log("Window of iFrame 'iCompressor' found");
    vWin.setInputCode(vCode);
    vWin.startCompressor();
    vCode = vWin.getOutputCode();
  } else {
    console.log("ERROR: compressCodeJS(pCode) - Compressor [iCompressor] not found in iFrame! return uncompressed code");
  };
  return vCode;
};

function createProjectJSON() {
  //hide("bSaveJSON");
  var vUsePrefix = getCheckBox("checkExportJS");
  var vExportFile = "project";
  updateForm2JSON(getValueDOM("tClassname"));
  saveCode4JSON_JS(vJSON_JS,vExportFile,"Project JSON",vUsePrefix);
};

function resetCodeGenCounter() {
  console.log("resetCodeGenCounter()");
  vCounter = 0;
  var vButtonList = vJSON_JS["ButtonList"];
  for (var iID in vButtonList) {
    if (vButtonList.hasOwnProperty(iID)) {
      vButtonList[iID]["counter"] = 0;
    };
  };
};

function createDatabaseJSON(pUsePrefix) {
  var vUsePrefix = pUsePrefix || getCheckBox("checkUsePrefix");
  var vDB = getValueDOM("sDatabases");
  if (vDB == "") {
    //vDB = "project";
    console.log("WARNING: createDatabaseJSON() vDB undefined");
    alert("No Database was selected! Please select a database first");
    //alert("No Database was selected! Will export [Project JSON]");
    //createProjectJSON();
  } else {
    var vType = "JSON"; //i.e. JS or JSON
    if (vUsePrefix == true) {
      vType = "JS";
    };
    var vFileDB = getFilenameWithPath4DB(vDB);
    write2exportedDB(vDB);
    // sExportPrefix = "JSON" means do not use the export prefix, it is pure JSON,
    selectDatabase();
    alert("Exported Database: '"+vFileDB+"' Format: '"+vType+"'");
    var vFileName = getSaveFilename4DB(vDB);
    var vContent = getDatabaseJSON2String(vDB);
    write2editor(iJSONDB,vContent);
    saveFile2HDD(vFileName,vContent);
  };
};

function getDatabaseJSON2String(pDB) {
  var vDB = pDB || "";
  var vContent = "";
  if (existsDatabaseJS(vDB)) {
    var vDB_JSON = cloneJSON(vJSON_JS["DatabaseList"][vDB]);
    replaceElements4Hash(vDB_JSON);
    vContent = stringifyJSON(vDB_JSON);
  } else {
    vContent = "// Database ["+vDB+"] undefined in vJSON_JS['DatabaseList']";
  };
  console.log("Return the Content of Database ["+vDB+"]");
  return vContent;
};

function replaceElements4Hash(pObject,pRecursive_Depth,pFile) {
  var vFile = pFile || getSelectedFileID();
  var vRecursive_Depth = pRecursive_Depth || 0;
  var vMax = 50;
  console.log("replaceElements4Hash(pObject,"+vRecursive_Depth+",'"+vFile+"')");
  if (isHash(pObject)) {
    vRecursive_Depth++;
    if (vRecursive_Depth < vMax)
    for (var iID in pObject) {
      if (pObject.hasOwnProperty(iID)) {
        if (isHash(pObject[iID])) {
          console.log("RECURSIVE: replaceElements4Hash(pObject['"+iID+"'],"+vRecursive_Depth+");");
          replaceElements4Hash(pObject[iID],vRecursive_Depth);
        } else if (typeof(pObject[iID]) == "string") {
          pObject[iID] = replaceElements4HTML(pObject[iID],vFile);
          console.log("STRING: replaceElements4Hash(pObject['"+iID+"'],"+vRecursive_Depth+"); value='"+pObject[iID]+"'");
        };
      };
    };
  };
};

function isHash(pObject) {
   return pObject && (typeof(pObject)  === "object");
};

function isArray(pObj) {
  return isHash(pObj) && (pObj instanceof Array);
};

function setFilenameExportJSON(pFilename) {
  var vFilename = pFilename || "";
  write2innerHTML("labExportFile",vFilename);
};

function write2exportedDB(pDB,pUsePrefix) {
  var vDB = pDB || "";
  if (vDB != "") {
    var vFileDB = getFilenameWithPath4DB(vDB,pUsePrefix);
    setFilenameExportJSON(vFileDB);
    write2value("tExportedJSON",vDB);
  } else {
    write2innerHTML("labExportFile","");
    write2value("tExportedJSON","");
  };
};

function getSaveFilename4DB(pDB,pUsePrefix) {
  var vUsePrefix = pUsePrefix || getCheckBox("checkUsePrefix");
  var vDB = pDB || "";
  var vExtension = getExtension4DB(vDB,vUsePrefix);
  if (vDB != "") {
    vDB = vDB.replace(/[^A-Za-z0-9_\.]/g,"_");
  };
  return vDB+vExtension;
}

function getExtension4DB(pDB,pUsePrefix) {
  var vUsePrefix = pUsePrefix || getCheckBox("checkUsePrefix");
  var vDB = pDB || "";
  var vExtension = ".json";
  if (vUsePrefix == true) {
    vExtension = ".js";
  };
  if (vDB == "") {
    vExtension = "";
  };
  return vExtension;
};

function getFilenameWithPath4DB(pDB,pUsePrefix) {
  var vDB = pDB || "";
  var vPath = "";
  var vExtension = getExtension4DB(vDB,pUsePrefix);
  if (vDB == "") {
    vExtension = "";
    vPath = "";
  } else if (existsDatabaseJS(vDB)) {
    console.log("getFilenameWithPath4DB()-Call: Database ["+vDB+"] exists");
    vPath = getValueDOM("tDefaultAppPath")+"db/";  // this is the default app_Path
  } else {
    vPath = "prog/";
  };
  vPath += vDB + vExtension;
  return vPath;
};

function saveCode4JSON_JS(pJSONDB,pDB,pTitle,pUsePrefix) {
  // creates the JSON String (stringify) and saves to HDD
  var vUsePrefix = pUsePrefix || getCheckBox("checkExportJS")
  var vFileName = getSaveFilename4DB(pDB,vUsePrefix);
  createCode4JSON_JS(pJSONDB,pDB,pTitle,vUsePrefix);
  var vContent = getEditorValue("iJSONDB");
  saveFile2HDD(vFileName,vContent)
}

function createCode4JSON_JS(pJSONDB,pDB,pTitle,pUsePrefix) {
  // creates the JSON String (stringify)
  var vUsePrefix = pUsePrefix || getCheckBox("checkExportJS");
  var vTitle = pTitle || "";
  var vDB = pDB || "project"; //means vJSON_JS will be export as project JSON
  // set modification data of JSON
  pJSONDB["mod_date"] = getDateTime();
  var vContent = getCode4JSON_JS(pJSONDB,vUsePrefix);
  var vType = "JSON";
  var vMode =  "ace/mode/json";
  if (vUsePrefix == true) {
    vType = "JS";
    vContent = getExportPrefix4DB(vDB)+vContent;
    vMode =  "ace/mode/javascript";
  };
  var vExportFile = getFilenameWithPath4DB(vDB,vUsePrefix);
  if (pJSONDB) {
    console.log("Create JSON Code from vJSON_JS Title: '"+vTitle+"' - File: '"+vExportFile+"' - Type: '"+vType+"'");
    write2editor("JSONDB",vContent,vMode);
    // Write the selected DB into innerHTML of DOM and into value of "tExportedJSON"
    write2exportedDB(vDB,vUsePrefix);
    if (vTitle != "") {
      alert(vType+"-File '"+vTitle+"' exported. File: '"+vExportFile+"'");
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

function exportTemplatesJSON() {
  //var vOut = getCode4JSON_JS(vJSON_TPL);
  updateForm2TemplateJSON();
  vJSON_TPL["JSCC_type"] = "TPL"; // Type is set to Templates
  vJSON_TPL["mod_date"] = getDateTime(); // set Export Date of Templates
  var vFileName = "code_templates";
  createCode4JSON_JS(vJSON_TPL,vFileName,"Database Templates");
  var vFileHDD = getSaveFilename4DB(vFileName,getCheckBox("checkExportJS"));
  saveFile2HDD(vFileHDD,getEditorValue("iJSONDB"));
  $( "#tabJSON" ).trigger( "click" );
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
    if (getCheckBox("checkCompressCode4HTML")) {
      //vReplace = compressCodeJS(vReplace);
    };
    //alert("vReplace="+vReplace.substring(0,300))
    vHTML = replaceString(vHTML,"___LIBRARIES___",vReplace);
    // Insert Generated Pages
    vHTML = replaceString(vHTML,"___PAGES___",getPagesHTML4Code(pFile)+"\n");
    vHTML = replaceElements4HTML(vHTML,pFile);
    vHTML = replaceAppLaucher4HTML(vHTML,pFile);
    return vHTML;
};
function replaceAppLaucher4HTML(pHTML,pFile) {
  if (existsFileJS(pFile)) {
    var vAppClass = vJSON_JS["FileList"][pFile]["sAppClassHTML"];
    var vAppInitCall = vJSON_JS["FileList"][pFile]["tAppInitCall"];
    pHTML = replaceString(pHTML,"___APP_CLASS___",vAppClass);
    pHTML = replaceString(pHTML,"___APP_INIT_CALL___",vAppInitCall);
  };
  return pHTML;
};

function replaceElements4HTML(pHTML,pFile) {
  var vFile = pFile || getSelectedFileID();
  var vElemHash = vJSON_JS["ElementsDB"];
  pHTML = replaceHash4Content(vElemHash,pHTML)
  var vBefore = pHTML;
  if (existsFileJS(vFile)) {
    vElemHash = vJSON_JS["FileList"][vFile]["elements"];
    pHTML = replaceHash4Content(vElemHash,pHTML)
  };
  console.log("replaceElements4HTML() Before: '"+vBefore+"' After: '"+pHTML+"'");
  return pHTML;
};

function replaceHash4Content(pHash,pHTML) {
  if (isHash(pHash)) {
    var vElemHash = pHash;
    for (var iElemID in vElemHash) {
      if (vElemHash.hasOwnProperty(iElemID)) {
        pHTML = replaceString(pHTML,"___"+iElemID+"___",vElemHash[iElemID]);
      };
    };
  };

  return pHTML;
};


function loadProjectJSON4File(pProjectFile) {
  console.log("loadProjectJSON4File('"+pProjectFile+"')");
  if (pProjectFile) {
    readFile2Editor(pProjectFile,"iOutput");
  } else {
    console.log("ERROR: loadProjectJSON4File(pProjectFile)-Call pProjectFile undefined!");
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
        setFilenameExportJSON(fileToLoad.name);
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
      var vTypeJS = vJSDB["JSCC_type"] || "JSON";
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
          // if (vJSONDB.hasOwnProperty("JSCC_type")) {
          //   // JSCC_type is not necessary to have in vJSON_JS["ClassList"] so delete value key pair
          //   delete vJSONDB["JSCC_type"];
          // };
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
function exportClass2Editor(pClass) {
  var vClass = pClass || getSelectedClassID();
  console.log("exportClass2Editor('"+vClass+"')");
  var vClassJSON = vJSON_JS["ClassList"][vClass];
  vClassJSON["JSCC_type"] = "CLASS";
  vClassJSON["JSCC_version"] = vJSCC_Version;
  //vClassJSON["JSCC_init_date"] is defined getDefaultClassHash() in classes.js:241
  vClassJSON["JSCC_mod_date"] = getDateTime(); //update export time
  var vCode = stringifyJSON(vClassJSON);
  if (getCheckBox("checkExportJS")) {
    vCode = "vJSON_JS['ClassList']['"+vClass+"'] = " + vCode;
  };
  setEditorValue("iJSONDB", vCode);
};

function exportClassJSON(pClass) {
  var vClass = pClass || getSelectedClassID();
  console.log("exportClassJSON('"+vClass+"')");
  exportClass2Editor(vClass);
  var vCode = getEditorValue("iJSONDB");
  var vClass = getSelectedClassID();
  var vExtension = "_jscc.json";
  var vPrefix = "";
  if (getCheckBox("checkExportJS")) {
    vExtension = "_jscc.js";
    //vPrefix += "if (!(vDataJSON.hasOwnProperty('ClassList'))) {vDataJSON['ClassList'] = {}};";
    vPrefix += "vDataJSON['ClassList']['"+vClass+"'] = ";
  };
  var vPath = "prog/";
  var vFileHDD = vClass.toLowerCase() + vExtension;
  var vFilePathHDD = vPath + vFileHDD;
  if (existsClassJS(vClass)) {
    exportClass2Editor(vClass);
  	alert("Javascript Class ["+vClass+"] created!\nJSCC-File: '"+vFilePathHDD+"'\nuse filename '"+vFilePathHDD+"'!");
    setFilenameExportJSON(vFilePathHDD);
    saveFile2HDD(vFileHDD,vCode);
  } else {
    alert("ERROR: Class ["+vCLass+"] does not exist!\nexportClassJSON('"+vClass+"')");
  };
}


function X_exportClass2Editor(pClass) {
  console.log("exportClass2Editor('"+vClass+"')");
  var vClassJS = getClassJSON(vClass);
  var vClassTypeHash = getClassTypeJSON();
  vClassJS["sClassType"] = vClassTypeHash[vClass];
  vClassJS["JSCC_mod_date"] = getDateTime();
  var vExportClassJS = cloneJSON(vClassJS);
  vExportClassJS["JSCC_type"] = "CLASS";
  var vCode = getCode4JSON_JS(vExportClassJS);
  if (getCheckBox("checkExportJS")) {
    vCode = "vJSON_JS['ClassList']['"+vClass+"'] = " + vCode;
  };
  setEditorValue("iJSONDB", vCode);
};

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

function importDatabase(pDBname,pJSONDB) {
  var vDBname = pJSONDB["name"] || removeExtension4File(pDBname) || "UndefDB";
  var vClassType = pJSONDB["sClassType"] || "";
  console.log("importClass(pJSDB) for Database '"+vDataJSON+"' DatabaseType='"+vDataJSONType+"'");
  if (existsDatabaseJS(vDBname)) {
    var vCheck = confirm("Database '"+vDBname + "' exists.\nDo you really want to import the JSON file\nand overwrite the existing databasen?");
    if (vCheck == false) {
      alert("Import Database '"+vDBname+"' cancelled!");
    } else {
      // Set Database in Global vDataJSON Hash
      vDataJSON[vDBname] = vJSDB;
      // Import JSON for the Database vDataJSON
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
  var vCompressed = getCheckBox("checkCompressCode4HTML");
  var vArrJS = getDatabaseArray();
  var vOut = "      <!-- Classes Javascript-Libs -->\n";
  var vCList = vJSON_JS["ClassList"];
  var vExportBoolean = {};
  for (var iClass in vCList) {
    if (vCList.hasOwnProperty(iClass)) {
      vOut += getClassInherit4Code(iClass,pStandalone,vCompressed,vExportBoolean);
    };
  };
  return vOut;
}

function getClassInherit4Code(pClass,pStandalone,pCompressed,pExportBoolean) {
  var vOut = "";
  if (pExportBoolean.hasOwnProperty(pClass)) {
    console.log("getClassInherit4Code('"+pClass+"') already exported");
  } else {
    pExportBoolean[pClass] = pClass;
    if (existsClassJS(pClass)) {
      var vSuperClassname = getSuperClassname4Class(pClass);
      if (vSuperClassname != "") {
        vOut += getClassInherit4Code(vSuperClassname,pStandalone,pCompressed,pExportBoolean);
      };
      // Check Aggregations of Class and export these classes first,
      // so that they are defined, when the code of pClass is defined
      var vAggHash = getAggregationHash4Class(pClass);
      for (var iAggClass in vAggHash) {
        console.log("getClassInherit4Code('"+pClass+"') Aggregation '"+iAggClass+"'");
        if (vAggHash.hasOwnProperty(iAggClass)) {
          if (pExportBoolean.hasOwnProperty(iAggClass)) {
            // export the Aggregation Class "iClass" first
            console.log("getClassInherit4Code('"+pClass+"') Aggregation '"+iAggClass+"' already exported");
          } else {
            console.log("getClassInherit4Code('"+pClass+"') export Aggregation Class '"+iAggClass+"'");
            vOut += getClassInherit4Code(iAggClass,pStandalone,pCompressed,pExportBoolean);
          };
        };
      };
      console.log("getClassInherit4Code('"+pClass+"','"+pStandalone+"','"+pCompressed+")");
      vOut += getClassHTML4Code(pClass,pStandalone,pCompressed);
    };
  };
  return vOut;
}

function getClassHTML4Code(pClass,pStandalone,pCompressed) {
  var vCompressed = pCompressed || false;
  var vSCRIPT = ""; //getValueDOM("tTplSCRIPT");
  var vOut = "";
  if (pStandalone == "YES") {
    vSCRIPT = getValueDOM("tTplSCRIPTSTANDALONE");
    vOut += replaceString(vSCRIPT,"___JSCODE___",getCode4Class(pClass,vCompressed));
  } else {
    var vLibName = pClass.toLowerCase();
    vSCRIPT = getValueDOM("tTplSCRIPT");
    vOut += replaceString(vSCRIPT,"___LIBRARY___","js/"+vLibName+".js");
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

function getConnectedPageArr(pArrID) {
  // vArrID is the results Array for return
  var vArrID = [];
  // vHash is introduced to avoid duplicate entries,
  var vHashID = {};
  var vID = "";
  if (pArrID && (pArrID.length) && (pArrID.length > 0)) {
    // loop over the root pages defined by User in "tPageIDs"
    for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      vHashID[vID] = vID;
      // the child pages of page with id vID and store the new childs in vHashID
      getChildPageHash(vID,vHashID);
    };
  };
  // convert the keys of vHashID into an array of ids.
  vArrID = getArray4HashID(vHashID);
  return vArrID;
};

function getChildPageHash(pPageID,pHash,pRecursive_Depth) {
  var vHash = pHash || {};
  var vRecursive_Depth = pRecursive_Depth || 0;
  var vMax = 50;
  var vChildID = {};
  var vParentID = "";
  vRecursive_Depth++;
  // checkif root page ID exists
  if (existsPageJS(pPageID)) {
    var vPageList = vJSON_JS["PageList"];
    for (var iPageID in vPageList) {
      if (vPageList.hasOwnProperty(iPageID)) {
        vParentID = vPageList[iPageID]["parent-id"];
        if (vParentID == pPageID) {
          vChildID[iPageID] = iPageID;
          vHash[iPageID] = iPageID;
        };
      };
    };
    //
  };
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
    var vButtonID = pButtonID || "";
    console.log("getButtonDefinition4Code('"+vButtonID+"')");
    var vOutHash = {
          "BUTTON_ID":vButtonID,
          "BUTTON_TITLE":firstUpperCase(vButtonID.toLowerCase()),
          "button-type":"",
          "tButtonDefHTML":""
        };
    var vOut = "";
    if (vButtonID != "") {
      if (vButtonID == vButtonID.toUpperCase()) {
        var vBT;
        if (existsButtonJS(vButtonID)) {
          //console.log("Button ["+pButtonID+"] exists for Code Generation");
          vBT = vJSON_JS["ButtonList"][vButtonID];
        } else {
          alert("Button ["+vButtonID+"] is undefined, a default button will be created for you!");
          vBT = getDefaultButtonHash(vButtonID);
          vJSON_JS["ButtonList"][vButtonID] = vBT;
          var vArrID = getArray4HashID(vJSON_JS["ButtonList"]);
          updateButtonJSON2Form(vArrID);
        };
        // It is a predefined Button in ButtonList
        vOut = vBT["tButtonDefHTML"];
        vBT["counter"]++;
        vOut = replaceString(vOut,"___COUNTER___",vBT["counter"]);
        vOut = replaceString(vOut,"___BUTTON_TITLE___",vBT["BUTTON_TITLE"]);
        vOutHash["button-type"] = "BUTTON";
      } else {
        console.log("Button-LINK: getButtonDefinition4Code('"+vButtonID+"') - ID is used as Page-ID '"+vButtonID+"'");
        vOut = getValueDOM("tTplPageLinkBUTTON");
        //pButtonID is a regarded as Page-ID, because a definition for the Button does not exist in ButtonList
        var vTitle = getPageTitle4ID(vButtonID);
        vOut = replaceString(vOut,"___LINK_PAGE_ID___",vButtonID);
        vOut = replaceString(vOut,"___BUTTON_TITLE___",vTitle);
        vCounter++;
        vOut = replaceString(vOut,"___COUNTER___",vCounter);
        vOutHash["button-type"] = "LINK";
        //vOut = replaceString(vOut,"__BUTTON_ID__",pButtonID);
      };
      vOut = replaceString(vOut,"___BUTTON_ID___",vButtonID.toUpperCase());
      vOutHash["tButtonDefHTML"] = vOut;
      console.log("Button Definition:\nvOut="+vOut);
    } else {
      console.log("ERROR: getButtonDefinition4Code(pButtonID) - pButtonID UNDEFINED");
    };
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

function getDatabasesHTML(pFile,pStandalone) {
  console.log("getDatabasesHTML('"+pFile+"','"+pStandalone+"')");
  var vArrDB = getDatabaseArray();
  var vOut = "\n<!-- JSON Databases -->\n";
  if (pStandalone == "YES") {
    var vSCRIPT = getValueDOM("tTplSCRIPTSTANDALONE");
    vOutJS = "";
    for (var i = 0; i < vArrDB.length; i++) {
      if (existsDatabaseJS(vArrDB[i])) {
        vOutJS += "\n//---- JSON 'db/"+vArrDB[i]+".js' ----\n";
        vOutJS += "\nvDataJSON['"+vArrDB[i]+"'] = ";
        vOutJS += stringifyDatabaseJSON(vJSON_JS["DatabaseList"][vArrDB[i]]);
        vOutJS += ";\n";
      };
    };
    vOut += replaceString(vSCRIPT,"___JSCODE___",vOutJS);

  } else {
    var vSCRIPT = getValueDOM("tTplSCRIPT");
    vOut = "      <!-- JSON Databases -->\n";
    for (var i = 0; i < vArrDB.length; i++) {
      vOut += replaceString(vSCRIPT,"___LIBRARY___","db/"+vArrDB[i]+".js");
    };
  };
  return vOut;
};

function stringifyDatabaseJSON(pJSON) {
  var vOut = "// stringifyDatabaseJSON(pJSON) undefined"
  if (pJSON && isHash(pJSON)) {
    var vJSON = cloneJSON(pJSON);
    replaceElements4Hash(vJSON);
    vOut = stringifyJSON(vJSON);
  };
  return vOut;
}

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
    if (getCheckBox("cCompOptions") == true) {
      vParam = "?autoclose=0";
    };
    vWinCompress = openCompressorWin(vParam);
};

function openCompressorWin(pParam) {
  var vParam = pParam || "";
  return window.open("plugins/uglify/index.html"+vParam,"wCOMP"+Date.now(),"width=900,height=600");
}


function displayUML() {
    if (vWinUML != null) {
      if (vWinUML.close) {
        vWinUML.close();
      };
    };
    vWinUML = window.open("plugins/uml/index.html","wUML","width=900,height=600");
};


function X_saveCode4Class() {
  var vClassID = getSelectedClassID();
  var vFilename = vClassID.toLowerCase()+".js";
  if (existsClassJS())
  createCode4JSON_JS(pJSONDB,pDB,pTitle,pUsePrefix)
  var vContent = getEditorValue("iOutput");
  alert("Save Javascript Class File to '"+getValueDOM("tDefaultAppPath")+"js/"+vFilename+"' in your WebApp");
  saveFile2HDD(vFilename,pContent)
  //vreadFileTXT("tpl/index.html");
}


function saveCode4Class() {
  console.log("saveCode4Class() export the Javascript Code - NOT the JSCC JSON");
  var vClass = getSelectedClassID();
  exportClass2Editor(vClass);
  var vCode = getEditorValue("iOutput");
  var vMinInsert = "";
  if (getCheckBox("checkCompressCode")) {
    vMinInsert = ".min"
  };
  var vPath = getValueDOM("tDefaultAppPath");
  var vFileHDD = vClass.toLowerCase() + vMinInsert + ".js";
  var vFilePathHDD = vPath + "js/" + vFileHDD;
  alert("Javascript Class Created!\nCopy Javascript Code into File and\nuse filename '"+vFilePathHDD+"'!");
  saveFile2HDD(vFileHDD,vCode);
}

function createCode4Class(pClass) {
  var vClass = pClass || getSelectedClassID();
  console.log("createCode4Class() '"+vClass+"'");
  var vCode = getCode4Class(vClass);
  write2editor("Output",vCode);
  if (getCheckBox("checkCompressCode")) {
    console.log("Open Compressor Window and compress class '"+pClass+"'");
    compressCode4Class();
  };
};

function getCode4Class(pClass,pCompressed) {
  var vClass = pClass || "";
  var vCompressed = pCompressed || false;
  console.log("getCode4Class('"+vClass+"',vCompressed)");
  var vOutput = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    var vClassFile  	  = getClassFile4ClassJSON(vClassJS);
    var vSuperClass     = vClassJS["tSuperClass"];
  	var vTplMethodHeader   = getValueDOM("tTplMethodHeader");
    var vClassTail    	= getValueDOM("tTplClassTail");
  	var vAttribConstructor = ""; //"	//---Attributes-------------------------\n";
  	var vMethodConstructor = "	//---Methods----------------------------\n";
  	vOutput = getValueDOM("tClassHeader");
    vOutput       = replaceCodeMainVars(vOutput,vClass);
  	vMethodHeader = replaceCodeMainVars(vTplMethodHeader,vClass);
    vOutput       = replaceAttributes4Code(vOutput,vClass);
    vOutput       = replaceMethods4Code(vOutput,vTplMethodHeader,vClass);
  	vClassTail    = replaceString(vClassTail,"___CLASSNAME___",vClassJS["tClassname"]);
  	vOutput += vClassTail;
    if (vCompressed) {
      var vWin = getIFrameWindow("iCompressor");
      if (vWin) {
        vWin.setClassName(vClass);
        vWin.setInputCode(vOutput);
        vWin.startCompressor();
        vOutput = vWin.getOutputCode();
      }
    } else {
      console.log("Code is uncompressed");
    };
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
    } else {
      vSuperClassProtoDef = "";
    };
  };
  if (getValueDOM("sPrototype") == "YES") {
    vMethodDefPrefix = vClassname + ".prototype";
  } else {
    vMethodDefPrefix = "this";
  };
  vOutput = replaceString(vOutput,"___AUTHOR___",vClassJS["tAuthor"]);
  vOutput = replaceString(vOutput,"___EMAIL___",vClassJS["tEMail"]);
  vOutput = replaceString(vOutput,"___SUPERCLASSPROTOTYPE___",vSuperClassProtoDef);
  vOutput = replaceString(vOutput,"___SUPERCLASS___",vSuperClassDef);
  vOutput = replaceString(vOutput,"___SUPERCLASSNAME___",vClassJS["tSuperClassname"]);
  vOutput = replaceString(vOutput,"___CLASSNAME___",vClassJS["tClassname"]);
  vOutput = replaceString(vOutput,"___CLASSFILENAME___",vClassFile);
  vOutput = replaceString(vOutput,"___DATE___",vClassJS["JSCC_mod_date"]);
  vOutput = replaceString(vOutput,"___MODDATE___",getDate());
  vOutput = replaceString(vOutput,"___METHODDEFPREFIX___",vMethodDefPrefix);
  return vOutput;
};

function getMethodComments4Constructor(pClass) {
  console.log("getMethodComments4Constructor('"+pClass+"')");
  var vOutput = "";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vMethodArray = getMethodArray(vClass);
  var vTplMethodHeader = getValueDOM("tTplMethodConstructorComment");
  var vMethod = vTplMethodHeader;
  var vMethodname = "";
  var vMethodAllParams = "";
  var vMethodParamsClass = "";
  var vSplitArray;
  // Now OutMeth is colleacting all Method Definitions
  for (var i=0; i<vMethodArray.length; i++) {
    // start with clean MethodHeader Template for each Method Definition
    vMethod = vTplMethodHeader;
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
      console.log("getMethodComments4Constructor('"+pClass+"') - Method: '"+vMethName+"'");
      var vReturn = vClassJS["MethodReturn"][vMethName];
      var vReturnColon = "";
      var vReturnComment = "";
      if (vReturn != "") {
        vReturnColon = ":"+vReturn;
        vReturnComment = "Return: "+vReturn;
      };
      //----- Parameter Comments lines -----
      var vParArr = vMethodParamsClass.split(",");
      var vCommentPrefix = "\t"+getValueDOM("tCommentPrefix"); //"\t//";
      var vCommentBoxPrefix = "      ";
      var vComPrefix = "\n" + vCommentPrefix + vCommentBoxPrefix;
      var vParameterComment = vParArr.join(vComPrefix);
      //---- Replace all Method specific variable in MethodHeader ----
      vMethod = replaceString(vMethod,"___METHODDEF___",vMethodArray[i]);
      vMethod = replaceString(vMethod,"___METHODCALL___",vMethName+"("+vMethodAllParams+")");
      vMethod = replaceString(vMethod,"___METHODNAME___",vMethName);
      vMethod = replaceString(vMethod,"___RETURNCOMMENT___",vReturnComment);
      vMethod = replaceString(vMethod,"___METHODPARAMETERS___",vMethodAllParams);
      vMethod = replaceString(vMethod,"___PARAMETERDEF___",vParameterComment);
      var vMethodComment = getMethodComment(vMethodArray[i]) || "   What does '"+vSplitArray[0]+"' do?";
      vMethodComment = createIndentDefault(vMethodComment,vCommentPrefix+vCommentBoxPrefix);
      vMethod = replaceString(vMethod,"___METHODCOMMENT___",vMethodComment);
      var vMethodCode = getMethodCode(vMethodArray[i]) || "//----------- INSERT YOUR CODE HERE ---------------";
      vOutput += vMethod;
      //vOutput += vTplMethodHeader;
    } else {
      //alert("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
    };
  };
  vOutput = "\n"+getValueDOM("tTplMethodsHeadComment")+vOutput;
  vOutput = replaceString(vOutput,"___CLASSNAME___",vClassJS["tClassname"]);
  vOutput = createIndentDefault(vOutput,"\t");
  return vOutput;
}

function replaceAttributes4Code(pOutput,pClass) {
  var vOutput = pOutput || "undefined pOutput";
  var vClass = pClass || getValueDOM("tClassname");
  var vAttribArray    = getAttribNameArrayJSON(vClass);
  var vClassJS = getClassJSON(vClass);
  var vTemplate = getValueDOM("tTplAttribute");
  var vAttribDef = "";
  var vAtts = "";
  var vID = "";
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
    // replace Attribute Type
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_TYPE___",vClassJS["AttribType"][vID]);
    vAtts += vAttribDef;
  };
  vAtts = createIndentDefault(vAtts,"\t");
  vOutput = replaceString(vOutput,"___ATTRIBUTES___",vAtts);
  return vOutput;
};

function replaceMethods4Code(pOutput,pTplMethodHeader,pClass) {
  var vOutput = pOutput || "undefined pOutput";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vMethodArray = getMethodArray();
  var vTplMethodHeader = pTplMethodHeader || "undefined Template MethodHeader";
  var vMethod = vTplMethodHeader;
  var vMethodname = "";
  var vMethodAllParams = "";
  var vMethodParamsClass = "";
  var vSplitArray;
  // Now OutMeth is collecting all Method Definitions - Prototype-def and this-def
  var vOutMeth = getValueDOM("tTplMethodsHeadComment");
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
      var vCommentPrefix = getValueDOM("tCommentPrefix");
      var vCommentBoxPrefix = getValueDOM("tCommentBoxPrefix");
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
      vMethodComment     = replaceString(vMethodComment,"\n","\n"+vComPrefix);
      vMethod = replaceString(vMethod,"___METHODCOMMENT___",vMethodComment);
      var vMethodCode = getMethodCode(vMethodArray[i]) || "//----------- INSERT YOUR CODE HERE ---------------";
      vMethodCode = createIndent(vMethodCode,"\t"); //"\t"+replaceString(vMethodCode,"\n","\n\t");
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
    vOutput = replaceString(vOutput,"___METHODS___",getMethodComments4Constructor(vClass));
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


function importTemplatesJSON() {
  //var vOut = getCode4JSON_JS(vJSON_TPL);
  var vContent =
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
