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
  var vClassName = getValueDOM("tClassname");
  writeClassTitle(vClassName);
  updateClassSelectors(vClassName);
  setClassSelectorDefault(vClassName);
};

function checkInterface4Class(pClassName) {
  console.log("checkInterface4Class('"+pClassName+"')");
  var vClassJS = getClassJSON(pClassName); // umlcreator.js:49
  var vSuperClass = vClassJS["tSuperClassname"];
  var vSuperClassType = getClassTypeJSON(vSuperClass);
  if (vSuperClassType == "Interface") {
    //inherit the attributes of interface
    inheritAttributesDefinitions(vSuperClass,pClassName);
    //inherit the method interface
    inheritMethodsInterface(vSuperClass,pClassName);
  };
  if (vSuperClassType == "Abstract") {
    //inherit the method interface
    inheritAttributesDefinitions(vSuperClass,pClassName);
    //inherit the method interface
    inheritMethodInterface(vSuperClass,pClassName);
    //inherit the method interface
    inheritMethodCode(vSuperClass,pClassName);
  };
};

function inheritAttributesDefinitions(pSuperClass,pClassName) {
  console.log("inheritAttributesDefinitions('"+pSuperClass+"','"+pClassName+"')-Call");
  var vClassJS = getClassJSON(pClassName); // umlcreator.js:49
  var vSuperClassJS = getClassJSON(pSuperClass); // umlcreator.js:49

};

function inheritMethodInterface(pSuperClass,pClassName) {
  console.log("inheritMethodInterface('"+pSuperClass+"','"+pClassName+"')-Call");
  var vClassJS = getClassJSON(pClassName); // umlcreator.js:49
  var vSuperClassJS = getClassJSON(pSuperClass); // umlcreator.js:49

};

function inheritMethodCode(pSuperClass,pClassName) {
  console.log("inheritMethodCode('"+pSuperClass+"','"+pClassName+"')-Call");
  var vClassJS = getClassJSON(pClassName); // umlcreator.js:49
  var vSuperClassJS = getClassJSON(pSuperClass); // umlcreator.js:49

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

function getClassJSON(pClassName) {
  var vClassName = pClassName || getValueDOM("tClassname");
  console.log("getClassJSON('"+vClassName+"')");
  return vJSON_JS["ClassList"][vClassName];
}

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
}

function selectDatabase() {
  //show("bSaveJSON");
  var vDB = getValueDOM("sDatabases");
  var vContent = "";
  if (vJSON_JS["DatabaseList"][vDB]) {
    vContent = vJSON_JS["DatabaseList"][vDB];
  } else {
    alert("Database ["+vDB+"] does not exist in call of selectDatabase()");
  };
  setEditorValue("iJSONDB",vContent);
};

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
