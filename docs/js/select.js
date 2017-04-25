// This library performs the actions on select events
// Options are created in dom.js
function selectClassCode() {
  var vClass = getValueDOM("sClassCode");
  console.log("selectClassCode('"+vClass+"')-Call");
  selectClass(vClass);
  createCode4Class();
}

function selectFilenameHTML(pFileName) {
  selectFilenameHTML_do(pFileName);
  $( "#tabHTML").trigger( "click" );
}

function selectFilenameHTML_do(pFile) {
  var vCurrentFile = getValueDOM("tFilename");
  var vFile = pFile || getValueDOM("sFileList");
  console.log("selectFilenameHTML()-Call: Current File '"+vCurrentFile+"' - Selected File '"+vFile+"'.");
  write2value("sFileListHTML",vCurrentFile);
  write2value("sFileList",vCurrentFile);
  write2value("sFileHTML",vCurrentFile);
  write2value("tFilename",vCurrentFile);
  updateFileForm2JSON(vCurrentFile);
  // following command is inserted for the first startup
  if (vJSON_JS["FileList"][vFile]) {
    console.log("File '"+vFile+"' exists in selectFile()-Call");
  } else {
    console.log("selectFile()-Call: Undefined File '"+vFile+"' - use old class '"+vCurrentFile+"'.");
    vFile = vCurrentFile;
  };
  vJSON_JS["SelectedFile"] = vFile;
  vFileJSON = vJSON_JS["FileList"][vFile];
  clearForm4File(vFile);
  console.log("selectFile()-Call Selected File: "+getValueDOM("tFilename")+" Attributes="+getValueDOM("tAttributes"));
  fillForm4File(vFile);
  write2value("sFileListHTML",vFile);
  write2value("sFileList",vFile);
  write2value("tFilename",vFile);
  createElementSelect();
  var vSelectedElement = getValueDOM("sElementList") || "";
  if (vSelectedElement == "") {
    var vElementNameArr = getElementNameArray();
    if (vElementNameArr.length > 0) {
      write2value("sElementList",vElementNameArr[0]);
      selectJSElements();
    };
  };
  writeFileTitle(vFile);
  updateFileSelectors(vFile);
  //setFileSelectorDefault(vFile);
  createCode4JSON_JS(vJSON_JS);
};

function updateFileForm2JSON(pFile) {
  var vFile = pFile || "";
  if ((pFile != "") && (existsFileJS(pFile))) {
    var vID = "";
    for (var i = 0; i < vDOM_File.length; i++) {
      vID = vDOM_File[i];
      vJSON_JS["FileList"][vFile][vID] = getValueDOM(vID);
    };
    // update the definition of current selected ELEMENT as well
    updateFormElement2JSON(vFile);
  }
};

function updateFormElement2JSON(pFile) {
  var vFile = pFile || getSelectedFileID();
  var vElementID = getValueDOM("sElementList") || "";
  if (vElementID != "") {
    if (vJSON_JS["FileList"][vFile]["elements"]) {
      vJSON_JS["FileList"][vFile]["elements"] = getEditorValue("iElementHTML");
    } else {
      console.log("ERROR: elements for file '"+vFile+"' undefined");
    };
  };
};


function getSelectedFileHash() {
  var vFile = getSelectedFilenameHTML();
  var vHash;
  if (vJSON_JS["FileList"] && vJSON_JS["FileList"][vFile]) {
    vHash = vJSON_JS["FileList"][vFile];
  } else {
    console.log("ERROR: getSelectedFileHash() for FileList for '"+vFile+"' undefined!");
  };
  return vHash
};

function selectJSElements() {
  console.log("selectJSElements() TODO");
  //getArray4HashID()
};


function clearForm4File() {
  console.log("clearForm4File()");
  var vArrID = ["sFileListHTML","tFilename","tPageIDs","tElementIDs","sElementList","tElementID","tElementHTML"];
  clearIDs4DOM(vArrID);
  setEditorValue("iElementHTML","");
  write2innerHTML("sElementList","");
};

function getElementNameArray() {
  console.log("getElementNameArray() TODO");
};

function writeFileTitle(pFileName) {
  console.log("writeFileTitle('"+pFileName+"')");
  write2innerHTML("titleFileName",pFileName);
};

function updateFileSelectors(pFileName) {
  console.log("updateFileSelectors('"+pFileName+"') TODO");
};
function setFileSelectorDefault(pFileName) {
  console.log("setFileSelectorDefault('"+pFileName+"') TODO");
};

function selectClass(pClass) {
  selectClass_do(pClass);
  $( "#tabClass" ).trigger( "click" );
}

function selectClass_do(pClass) {
  var vCurrentClass = getValueDOM("tClassname");
  var vClass = pClass || getValueDOM("sClassList");
  console.log("selectClass()-Call: Current Class '"+vCurrentClass+"' - Selected Class '"+vClass+"'.");
  updateForm2JSON(vCurrentClass);
  // following command is inserted for the first startup
  write2value("sClassList",vClass);
  write2value("tClassname",vClass);
  if (vJSON_JS["ClassList"][vClass]) {
    console.log("Class '"+vClass+"' exists in selectClass()-Call");
  } else {
    console.log("selectClass()-Call: Undefined Class '"+vClass+"' - use old class '"+vCurrentClass+"'.");
    vClass = vCurrentClass;
  };
  vJSON_JS["SelectedClass"] = vClass;
  vClassJSON = vJSON_JS["ClassList"][vClass];
  clearForm4Class(vClass);
  console.log("selectClass()-Call Selected Class: "+getValueDOM("tClassname")+" Attributes="+getValueDOM("tAttributes"));
  checkInterface4Class(vClass);
  fillForm4Class(vClass);
  //createClassJS(vClass); // if necessary
  createAttribTypeSelect();
  createAttribSelect();
  createMethodSelect();
  var vSelectedMethod = getValueDOM("sMethodList") || "";
  if (vSelectedMethod == "") {
    var vMethodNameArr = getMethodNameArray();
    if (vMethodNameArr.length > 0) {
      write2value("sMethodList",vMethodNameArr[0]);
      selectJSMethods();
    };
  };
  var vClassName = getValueDOM("tClassname");
  writeClassTitle(vClassName);
  updateClassSelectors(vClassName);
  setClassSelectorDefault(vClassName);
  var vSuperClassname = getValueDOM("tSuperClassname");
  selectSuperClass(vSuperClassname);
  createCode4JSON_JS(vJSON_JS);
};

function selectSuperClass(pSuperClass) {

  var vClassName = getValueDOM("tClassname");
  var vSuperClassname = pSuperClass;
  var vSuperClassType = "";
  if (vClassName != vSuperClassname) {
    write2value('tSuperClassname',vSuperClassname);
    write2value('sSuperClassname',vSuperClassname);
    if (vSuperClassname != "") {
      vSuperClassType = vJSON_JS["ClassType"][vSuperClassname] || "";
    };
    write2innerHTML("labSuperClassTypeUML",vSuperClassType);
    updateFormID2JSON('tSuperClassname')
  } else {
    alert("ERROR: You cannot select the '"+vClassName+"' as SuperClass");
    selectSuperClass(" ");
  }
}


function selectClassType(pClassName,pValue) {
  if (vJSON_JS["ClassType"]) {
    setClassTypeJSON(pClassName,pValue);
    updateJSON2tClassList();
  } else {
    console.log("ERROR: selectClassType('"+pClassName+"','"+pValue+"') - vJSON_JS['ClassType'] undefined");
  };
  console.log("selectClassType('"+pClassName+"','"+pValue+"') done");
}

function setClassSelectorDefault(pClassName) {
  write2value("sClassList",pClassName);
  write2value("sClassCode",pClassName);
};

function updateClassSelectors(pClassName) {
  updateAttribSelector(pClassName);
  updateMethodSelector(pClassName);
};

function updateAttribSelector(pClassName) {
  var vArr = getAttribNameArrayJSON(pClassName);
  var vOptions = createOptions4Array(vArr);
  write2innerHTML("sAttribList",vOptions);
};

function getAttribNameArrayJSON(pClassName) {
  var vArr = [];
  var vClassJS = getClassJSON(pClassName);
  var vHash = {};
  if (vClassJS["AttribDefault"]) {
    vHash = vClassJS["AttribDefault"]
  } else {
    console.log("ERROR: getAttribNameArrayJSON('"+pClassName+"') - AttribDefault undefined");
  };
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vArr.push(iID)
    }
  };
  return vArr;
}

function updateMethodSelector(pClassName) {
  var vArr = getMethodNameArrayJSON(pClassName);
  var vOptions = createOptions4Array(vArr);
  write2innerHTML("sMethodList",vOptions);
}

function getMethodNameArrayJSON(pClassName) {
  var vArr = [];
  var vClassJS = getClassJSON(pClassName);
  var vHash = {};
  if (vClassJS["MethodCode"]) {
    vHash = vClassJS["MethodCode"]
  } else {
    console.log("ERROR: getAttribNameArrayJSON('"+pClassName+"') - MethodCode undefined");
  };
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vArr.push(iID);
    };
  };
  return vArr;
};

function selectFileJS(pFileID) {
  var vFileID = pFileID || getValueDOM("sFileHTML");
  console.log("selectFileJS('"+vFileID+"')");
  var vOldFileID = getValueDOM("tFilename"); // old FileID
  var vFileHash = {};
  if (vOldFileID != "") {
    if (existsFileJS(vOldFileID)) {
      console.log("selectFileJS('"+vFileID+"') update content of vFile='"+vOldFileID+"'");
      updateFileForm2JSON(vOldFileID);
    };
  };
  console.log("selectFileJS()-Call: Current File ["+vOldFileID+"] - Selected File '"+vFileID+"'.");
  if (existsFileJS(vFileID)) {
    console.log("File with ID '"+vFileID+"' exists in selectFileJS()-Call");
    updateFileJSON2Form(vFileID);
    write2value("tFilename",vFileID);
  } else {
    vFileID = "";
    clearFileForm();
  };
  vJSON_JS["SelectedFile"] = vFileID;
  write2value("tFilename",vFileID);
};


function selectPageJS(pPageID) {
  var vPageID = pPageID || getValueDOM("sPageHTML");
  console.log("selectPageJS('"+vPageID+"')");
  var vOldPageID = getValueDOM("tPageID"); // old PageID
  var vOldContent = getValueDOM("tPageHTML");
  var vEditContent = getEditorValue("iPageHTML");
  var vPageHash = {};
  if (vOldPageID != "") {
    if (vOldContent != vEditContent) {
      console.log("Content of Page CHANGED\nOLD: "+vOldContent+"\nNEW: "+vEditContent);
      var vSaveOK = confirm("Content of Page ["+vOldPageID+"] changed.\nDo you want to save the Page Definition?");
      if (vSaveOK == true) {
        save2LevelID2JSON("PageContent",vOldPageID,vEditContent);
      };
    } else {
      console.log("Content of Page unchanged");
      //setEditorValue("iPageHTML",)
    };
  };
  console.log("selectPageJS()-Call: Current Page ["+vOldPageID+"] - Selected Page '"+vPageID+"'.");
  if (vJSON_JS["PageContent"]) {
    console.log("Page with ID '"+vPageID+"' exists in selectPageJS()-Call");
    if (existsPageJS(vPageID)) {
      updatePageJSON4ID2Form(vPageID);
    } else {
      vPageID = "";
      clearPageForm();
    };
  };
  vJSON_JS["SelectedPage"] = vPageID;
  write2value("tPageID",vPageID);
};

function clearPageForm() {
  var vArrID = ["tPageID","sPageHTML","sPageType4Page","tPageTitle","sParentPage","tPageHTML"];
  clearIDs4DOM(vArrID);
  setEditorValue("iPageHTML","");
};

function clearPageTypeForm() {
  var vArrID = ["tPageTypeID","sPageTypeHTML","sButtonHeader1","sButtonHeader2","tPageTypeHTML"];
  clearIDs4DOM(vArrID);
  setEditorValue("iPageTypeHTML","");
};

function clearButtonForm() {
  var vArrID = ["tButtonID","sButtonHTML","tButtonDefHTML"];
  clearIDs4DOM(vArrID);
};

function clearIDs4DOM(pArrID) {
  var vID = "";
  for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      write2value(vID,"");
  };
};

function selectPageTypeJS(pPageTypeID) {
  var vPageTypeID = pPageTypeID || getValueDOM("sPageTypeHTML");
  var vOldPageTypeID = getValueDOM("tPageTypeID"); // old PageTypeID
  var vOldContent = getEditorValue("iPageTypeHTML");
  if (vOldPageTypeID != "") {
      console.log("Update of OLD setting of PageType '"+vOldPageTypeID+"'");
      updateForm2PageTypeJSON(vOldPageTypeID);
  };
  console.log("selectPageTypeJS()-Call: Current PageType '"+vOldPageTypeID+"' - Selected PageType '"+vPageTypeID+"'.");
  if (vPageTypeID != "") {
    if (existsPageTypeJS(vPageTypeID)) {
      console.log("PageType with ID '"+vPageTypeID+"' exists in selectPageTypeJS()-Call");
      updatePageTypeJSON4ID2Form(vPageTypeID);
    } else {
      console.log("selectPageTypeJS()-Call: Undefined PageType for '"+vPageTypeID+"' - use old PageType Content '"+vOldPageTypeID+"'.");
      clearPageTypeForm();
      vPageTypeID = ""; //vOldPageTypeID;
    };
  } else {
    clearPageTypeForm();
    vPageTypeID = ""; //vOldPageTypeID;
  };
  write2value("tPageTypeID",vPageTypeID);
  vJSON_JS["SelectedPageType"] = vPageTypeID;
};

function updatePageJSON4ID2Form(pPageID) {
  var vPageID = pPageID || "";
  if (existsPageJS(vPageID)) {
    var vValue = vJSON_JS["PageContent"][vPageID] || "";
    write2value("tPageHTML",vValue);
    setEditorValue("iPageHTML",vValue);
    var vSelHash = vJSON_JS["PageList"][vPageID];
    //write2value("sPageHTML",vPageID);
    write2value("sParentPage",vSelHash["parent-id"]);
    write2value("tPageTitle",vSelHash["PAGE_TITLE"]);
    write2value("sPageType4Page",vSelHash["page-type"]);
  };
}

function  updatePageTypeJSON4ID2Form(pPageTypeID) {
  var vPageTypeID = pPageTypeID || getValueDOM("tPageTypeID");
  if ((vPageTypeID) && (vPageTypeID != "")) {
    var vSelHash = vJSON_JS["PageType"][vPageTypeID];
    if (vSelHash) { // page-type | HEADER_BUTTON1 | HEADER_BUTTON2 | template
      write2value("tPageTypeID",vSelHash["page-type"]);
      write2value("sButtonHeader1",vSelHash["HEADER_BUTTON1"]);
      write2value("sButtonHeader2",vSelHash["HEADER_BUTTON2"]);
      write2value("tPageTypeHTML",vSelHash["template"]);
      setEditorValue("iPageTypeHTML",vSelHash["template"]);
    } else {
      console.log("WARNING: Selected Button Hash for ["+pButtonID+"] undefined");
    }
  } else {
    console.log("WARNING: ButtonID empty");
  }
}

function selectButtonJS(pButtonID) {
  var vButtonID = pButtonID || getValueDOM("sButtonHTML");
  var vOldButtonID = getValueDOM("tButtonID"); // old ButtonID
  console.log("selectButtonJS()-Call: Current Button '"+vOldButtonID+"' - Selected Button '"+vButtonID+"'.");
  if (existsButtonJS(vButtonID)) {
    console.log("Button with ID '"+vButtonID+"' exists in selectButtonJS()-Call");
    updateButtonJSON4ID2Form(vButtonID);
  } else {
    console.log("selectButtonJS()-Call: Undefined Button Content '"+vButtonID+"' - use old Button Content '"+vOldButtonID+"'.");
    clearButtonForm();
    vButtonID = "";
  };
  write2value("tButtonID",vButtonID);
  vJSON_JS["SelectedButton"] = vButtonID;
};

function createElementSelect(pElementString) {
  var vElementStr = pElementString || getValueDOM("tElementIDs");
  var vArr = getArray4IDString(vElementStr);
  write2innerHTML("sElementList",createOptions4Array(vArr));
};

function getArray4IDString(pIDString) {
  var vIDString = pIDString || "";
  vIDString = vIDString.replace(/\s/g,"");
  var vArr = vIDString.split("|");
  var vOutArr = [];
  for (var i = 0; i < vArr.length; i++) {
    if (vArr[i] != "") {
      vOutArr.push(vArr[i]);
    }
  };
  return vOutArr;
}

function getSelectedFileID() {
  return getSelectedFilenameHTML();
}

function getSelectedElement() {
  return getValueDOM("sElementList") || "";
}


function selectElementJS(pElementID) {
  console.log("selectElementJS('"+pElementID+"')");
  var vFile = getSelectedFilenameHTML();
  checkFileHTML(vFile);
  var vElementJSON = vJSON_JS["FileList"][vFile]["elements"];
  var vPrevElementID = getValueDOM("tElementID");
  var vElementArrID = getElementArrayID4JSON(vFile);
  var vFirstElement = vElementArrID[0] || "";
  //console.log("selectElementJS('"+pElementID+"') vFirstElement='"+vFirstElement+"'");
  console.log("selectElementJS('"+pElementID+"') vFirstElement='"+vFirstElement+"' with content='"+vElementJSON[vFirstElement]+"'");
  var vSelElementID = pElementID || getValueDOM("sElementList") || vFirstElement;
  var vContent;
  if (vPrevElementID != "") {
    if (vPrevElementID != pElementID) {
      vContent = getEditorValue("iElementHTML");
      console.log("selectElementJS('"+pElementID+"') Save the Content of Element ["+vPrevElementID+"] Content='"+vContent+"'");
      vElementJSON[vPrevElementID] = vContent;
    };
  } else {
    console.log("No previous Element Definition found");
  };
  //var Arr = [];
  if (vSelElementID != "") {
    if (vElementJSON[vSelElementID]) {
      console.log("JSON definition of Element ['"+vSelElementID+"'] exists");
      console.log("selectElementJS('"+pElementID+"') vFirstElement='"+vFirstElement+"' with content='"+vElementJSON[vFirstElement]+"'");
    } else {
      console.log("WARNING: Set JSON definition of Element ['"+vSelElementID+"']");
      console.log("selectElementJS('"+pElementID+"') vFirstElement='"+vFirstElement+"' with content='"+vElementJSON[vFirstElement]+"'");
      vElementJSON[vSelElementID] = "undefined content of "+vSelElementID;
    };
    write2value("tElementHTML",vElementJSON[vSelElementID]);
    setEditorValue("iElementHTML",vElementJSON[vSelElementID]);
  } else {
    clearFileForm();
  };
  write2value("tElementID",vSelElementID);
  vJSON_JS["SelectedElement"] = vSelElementID;
  //write2innerHTML("sElementList",createOptions4Array(vArr));
};

function getElementArrayID4JSON(pFile) {
  var vFile = pFile || "";
  var vArrID = [];
  if (existsFileJS(vFile)) {
    var vFileJSON = vJSON_JS["FileList"][vFile];
    if (vFileJSON["elements"]) {
      vArrID = getArray4HashID(vFileJSON["elements"]);
    } else {
      console.log("ERROR: Element Hash for File='"+vFile+"' is undefined");
    }
  } else {
    console.log("ERROR: in FileList File='"+vFile+"' is undefined");
  };
  return vArrID;
}

function clearFileForm() {
  var vID;
  for (var i = 0; i < vDOM_File.length; i++) {
    vID = vDOM_File[i];
    write2value(vID,"");
  };
  setEditorValue("iElementHTML","");
}

function updateButtonJSON4ID2Form(pButtonID) {
  var vButtonID = reduceVarName(pButtonID);
  console.log("updateButtonParamHash2Form('"+vButtonID+"')");
  if ((vButtonID) && (vButtonID != "")) {
    var vSelHash = {
      "BUTTON_ID": "BUTUDEF",
      "button-html": "undefined button '"+vButtonID+"'",
    };
    if (existsButtonJS(vButtonID)) {
      console.log("Button '"+vButtonID+"' is defined");
      vSelHash = vJSON_JS["ButtonList"][vButtonID];
    };
    if (vSelHash) { // BUTTON_ID | button-html
      write2value("tButtonID",vSelHash["BUTTON_ID"] );
      write2value("tButtonDefHTML",vSelHash["button-html"]);
    } else {
      console.log("WARNING: Selected Button Hash for ["+pButtonID+"] undefined");
    }
  } else {
    console.log("WARNING: ButtonID empty");
  }
}

function fillForm4File(pFileName) {
  console.log("fillForm4File('"+pFileName+"')");
  updateFileJSON2Form(pFileName);
};

function updateFileForm2JSON(pFileName) {
  console.log("updateFileForm2JSON('"+pFileName+"')");
  var vID = "";
  if (pFileName) {
    if (vJSON_JS["FileList"][pFileName]) {
      console.log("updateFileForm2JSON() - vJSON_JS['FileList']['"+pFileName+"'] exists!");
    } else {
      checkFileHTML(pFileName);
    };
    var vFileJSON = vJSON_JS["FileList"][pFileName];
    var vValue = "";
    for (var i = 0; i < vDOM_File.length; i++) {
      vID = vDOM_File[i];
      vValue = getValueDOM(vID);
      if (vValue) {
        vFileJSON[vID] = vValue;
      } else {
        vFileJSON[vID] = "";
      };
    };
  };
};

function updateFileJSON2Form(pFileName) {
  console.log("updateFileJSON2Form('"+pFileName+"')");
  var vID = "";
  if (pFileName) {
    if (vJSON_JS["FileList"][pFileName]) {
      console.log("updateFileJSON2Form() - vJSON_JS['FileList']['"+pFileName+"'] exists!");
    } else {
      checkFileHTML(pFileName);
    };
    var vFileJSON = vJSON_JS["FileList"][pFileName];
    for (var i = 0; i < vDOM_File.length; i++) {
      vID = vDOM_File[i];
      if (vFileJSON.hasOwnProperty(vID)) {
        write2value(vID,vFileJSON[vID]);
      };
    };
    var vElementID = getValueDOM("tElementID") || "";
    console.log("updateFileJSON2Form() tElementID='"+vElementID+"'");
    write2value("sElementList",vElementID);
    selectElementJS(vElementID);
  };
};

function fillForm4Class(pClassName) {
  console.log("fillForm4Class('"+pClassName+"')");
  updateJSON2Form(pClassName);
};

function selectedMethodName() {
  return getValueDOM("sMethodList");
};

function selectedAttribName() {
  return getValueDOM("sAttribList");
}

function setAttribType4Select(pAttribType) {
    var vSelClass = pAttribType || getValueDOM("sAttribTypeList");
    var vClassDef = "null";
    var vAttribName = getValueDOM("tAttribName");
    console.log("Select Type '"+vSelClass+"' for Attribute '"+vAttribName+"'");
    write2value("tAttribType",vSelClass);
    if (isBasicClass(vSelClass)) {
      console.log("Basic Class '"+vSelClass+"' selected for Attribute '"+vAttribName+"'");
      var vBasicClassHash = getBasicClassHash();
      //vClassDef = vBasicClassHash[vSelClass];
      write2value("tAttribDefault",vBasicClassHash[vSelClass]);
    } else {
      console.log("Class '"+vSelClass+"' is self-defined for Attribute '"+vAttribName+"' ");
      write2value("tAttribDefault","new "+vSelClass+"()");
    };
};

function selectJSAttribType() {
  //saveAttribJSON();
  //get SELECT AttribName value
  var vAttribType = getValueDOM("sAttribTypeList");
  var vAttribName = getValueDOM("sAttribList");
  console.log("Selected ArrayType='"+vAttribType+"' - selectJSAttribType()");
  // set MethodName Input Window
  //document.fCreator.tAttribType.value = vAttribType;
  //load method code from  vJSON_JS if exists
  //and write method code to TEXTAREA
  setAttribType4Select(vAttribType)
  saveAttribJSON(vAttribName);
  saveJSON2LocalStorage();
};

function selectJSAttribs() {
  var vClassJSON = getClassJSON();
  saveAttribJSON();
  //get SELECT AttribName value
  var vAttribName = getValueDOM("sAttribList");
  console.log("selectJSAttribs() - AttribName='"+vAttribName+"'");
  var vID = "";
  var vValue = "";
  var vAttArr = ["AttribComment","AttribType","AttribDefault"];
  for (var i = 0; i < vAttArr.length; i++) {
    vID = vAttArr[i];
    vValue = vClassJSON[vID][vAttribName] || " " || "Undefined vClassJSON['"+vID+"']['"+vAttribName+"']";
    console.log("["+vID+"]='"+vValue+"'");
    write2value("t"+vID,vValue)
  };
  write2value("tAttribName",vAttribName);
  write2value("sAttribTypeList",vClassJSON["AttribType"][vAttribName]);
  //load method code from  vJSON_JS if exists
  //loadAttribJSON(vAttribName);
  saveJSON2LocalStorage();
};

function updateForm2Database(pDB) {
  var vDB = pDB || getValueDOM("tExportedJSON");
  console.log("updateForm2Database('"+vDB+"') call");
  var vContent = getEditorValue("iJSONDB");
  // remove Prefix if it is stored in the Export File;
  vContent = removePrefix4DB(vContent);
  var vMSG = "";
  if (vDB == "") {
    vMSG = "ERROR: Please select a Database first before you can update the content of the database!";
  } else if (vDB == "project") {
    vMSG = "WARNING: You cannot save a JSON for the programming project into the list of databases.\nSee tab Files/Classes to create new JSON DBs!";
  } else {
    if (vJSON_JS["DatabaseList"][vDB]) {
      vJSON_JS["DatabaseList"][vDB] = vContent;
      vMSG = "DONE: Database ["+vDB+"] was stored in main JSON for the project!"
    } else {
      vMSG = "ERROR: Database ["+vDB+"] does not exist in call of updateForm2Database('"+vDB+"')";
    };
  };
  //console.log(vMSG);
  if (vMSG != "") alert(vMSG);
};

function removePrefix4DB(pContent) {
  var vDB = getValueDOM("tExportedJSON");
  var vPrefix = getExportPrefix4DB(vDB);
  var vContent = pContent || "";
  var vPosJSON = 0;
  var vMsg = "";
  var vPos = vContent.indexOf(vPrefix);
  if (vPos >= 0) {
    vMsg = "removePrefix4DB() Hash found at posistion "+vPos;
    vPosJSON = vPos + vPrefix.length;
  };
  if (vPosJSON > 0) {
    vContent = vContent.substring(vPosJSON,vContent.length);
  };
  return vContent;
}

function selectDatabaseJSON() {
  var vDB = getValueDOM("sDatabases");
  if (vDB) {
    write2value("tExportedJSON",vDB);
    console.log("Database: '"+vDB+"' selected!");
    selectDatabase(vDB);
  } else {
    console.log("WARNING: selectDatabaseJSON() vDB undefined!");
  };
}

function getExportPrefix() {
  var vPrefix = "JSON";
  if (getCheckBox("checkUsePrefix") == true) {
    vPrefix = "JS";
  };
  return vPrefix;
};

function selectDatabase(pDB) {
  //show("bSaveJSON");
  var vDB = pDB || getValueDOM("sDatabases");
  var vSelExpPref = getExportPrefix();
  console.log("selectDatabase('"+vDB+"') Type: '"+vSelExpPref+"'");
  var vContent = "";
  // ExportPrefix = "JSON" means: do not use the export prefix, it is pure JSON,
  var vExportPrefix = "";
  var vExtension = ".json";
  if (getCheckBox("checkUsePrefix") == true) {
    vExportPrefix = getExportPrefix4DB(vDB);
  };
  if (vJSON_JS["DatabaseList"][vDB]) {
    vContent = vJSON_JS["DatabaseList"][vDB];
  } else {
    alert("Database ["+vDB+"] does not exist in call of selectDatabase()");
  };
  setEditorValue("iJSONDB",vExportPrefix + vContent);
};

function getExportPrefix4DB(pDB) {
  var vPrefix = getValueDOM("tExportPrefix") || "";
  vPrefix = replaceString(vPrefix,"___DB___",pDB);
  return vPrefix;
}

function saveDatabaseJSON() {
  var vDB = getValueDOM("sDatabases");
  var vContent = getEditorValue("iJSONDB");
  vJSON_JS["DatabaseList"][vDB] = vContent;
}

function selectJSMethods() {
  //alert("Select Method");
  //save current Method
  saveMethodJSON();
  //get SELECT MethodName value
  var vMethodName = getValueDOM("sMethodList");
  // set MethodName Input Window
  var vMethodHash = getMethodHash();
  //load method code from  vJSON_JS if exists
  //and write method code to TEXTAREA
  loadMethodJSON(vMethodName);
  write2value("tMethodName",vMethodHash[vMethodName]);
  write2value("titleMethodName",vMethodHash[vMethodName]);
  saveJSON2LocalStorage();
};

function updateClassSelector() {
  var vClassJS = getClassJSON();
  var vClassType = vClassJS["sClassType"] || "Default";
  write2value("sClassType",vClassType);
  createClassSelect();
}

function updateDatabaseSelector() {
  createDatabaseSelect();
}

function updateSelectors() {
  createClassSelect();
  createDatabaseSelect();
  // PageType creates Selectors for the Form in Page Form
  createPageTypeSelect();
  createPageSelect();
  createButtonSelect();
  writeClassTitle(getValueDOM("tClassname"));
}
