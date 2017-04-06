// This library performs the actions on select events
// Options are created in dom.js
function selectClassCode() {
  var vClass = getValueDOM("sClassCode");
  console.log("selectClassCode('"+vClass+"')-Call");
  selectClass(pClass);
  createCode4Class();
}
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
  write2value("sClassList",pClass);
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
  createCode4JSON_JS(vJSON_JS);
  fillForm4Class(vClass);
  createClassJS(vClass); // if necessary
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
};


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
    }
  };
  return vArr;
};


function selectPageJS(pPageID) {
  var vPageID = pPageID || getValueDOM("sPageHTML");
  var vOldPageID = getValueDOM("tPageID"); // old PageID
  var vOldContent = getValueDOM("tPageHTML");
  var vContent = getEditorValue("iPageHTML");
  var vPageHash = {

  };
  if (vOldPageID != "") {
    if (vOldContent != vContent) {
      console.log("Content of Page CHANGED\nOLD: "+vOldContent+"\nNEW: "+vContent);
      var vSaveOK = confirm("Content of Page ["+vOldPageID+"] changed.\nDo you want to save the Page Definition?");
      if (vSaveOK == true) {
        save2LevelID2JSON("PageContent",vOldPageID,vContent);
      };
    } else {
      console.log("Content of Page unchanged");
      //setEditorValue("iPageHTML",)
    };
  };
  console.log("selectPageJS()-Call: Current Page ["+vOldPageID+"] - Selected Page '"+vPageID+"'.");
  if (vJSON_JS["PageContent"] && vJSON_JS["PageContent"][vPageID]) {
    console.log("Page with ID '"+vPageID+"' exists in selectPageJS()-Call");
    var vValue = vJSON_JS["PageContent"][vPageID];
    write2value("tPageHTML",vValue);
    setEditorValue("iPageHTML",vValue);
    var vSelHash = vJSON_JS["PageList"][vPageID];
    //write2value("sPageHTML",vPageID);
    write2value("sParentPage",vSelHash["parent-id"]);
    write2value("tPageTitle",vSelHash["page-title"]);
  } else {
    console.log("selectPageJS()-Call: Undefined Page Content '"+vPageID+"' - use old Page Content '"+vOldPageID+"'.");
    vPageID = vOldPageID;
  };
  vJSON_JS["SelectedPage"] = vPageID;
  write2value("tPageID",vPageID);
};

function selectPageTypeJS(pPageTypeID) {
  var vPageTypeID = pPageTypeID || getValueDOM("sPageTypeHTML");
  var vOldPageTypeID = getValueDOM("tPageTypeID"); // old PageTypeID
  var vOldContent = getValueDOM("tPageTypeHTML");
  var vContent = getEditorValue("iPageTypeHTML");
  if (vOldPageTypeID != "") {
    if (vOldContent != vContent) {
      console.log("Content of PageType CHANGED");
      var vSaveOK = confirm("Definition of PageType ["+vOldPageTypeID+"] changed.\nDo you want to save the PageType Definition?");
      if (vSaveOK == true) {
        save3LevelID2JSON("PageType",vOldPageTypeID,"template",vContent);
      };
    } else {
      console.log("Content of PageType unchanged");
    };
  };
  console.log("selectPageTypeJS()-Call: Current PageType '"+vOldPageTypeID+"' - Selected PageType '"+vPageTypeID+"'.");
  if (vJSON_JS["PageType"] && vJSON_JS["PageType"][vPageTypeID] && vJSON_JS["PageType"][vPageTypeID]["template"]) {
    console.log("PageType with ID '"+vPageTypeID+"' exists in selectPageTypeJS()-Call");
    var vSelHash = vJSON_JS["PageType"][vPageTypeID];
    var vValue = vSelHash["template"];
    write2value("tPageTypeHTML",vSelHash["template"]);
    write2value("sButtonLeft",vSelHash["button-id1"]);
    write2right("sButtonRight",vSelHash["button-id2"]);
  } else {
    console.log("selectPageTypeJS()-Call: Undefined PageType Content '"+vPageTypeID+"' - use old PageType Content '"+vOldPageTypeID+"'.");
    vPageTypeID = vOldPageTypeID;
  };
  write2value("tPageTypeID",vPageTypeID);
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
  getClassJSON();
  saveAttribJSON();
  vClassJSON = getClassJSON();
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
  var vClassJS = getSelectedClassJSON();
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
  createPageSelect();
  createPageTypeSelect();
  writeClassTitle(getValueDOM("tClassname"));
}
