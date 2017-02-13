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
  updateForm2Class(vCurrentClass);
  if (vJSON_JS["ClassList"][vClass]) {
    console.log("Class '"+vClass+"' exists in selectClass()-Call");
  } else {
    console.log("selectClass()-Call: Undefined Class '"+vClass+"' - use old class '"+vCurrentClass+"'.");
    vClass = vCurrentClass;
  };
  vJSON_JS["SelectedClass"] = vClass;
  vClassJSON = vJSON_JS["ClassList"][vClass];
  clearForm4Class();
  createCode4JSON_JS(vJSON_JS);
  fillForm4Class(vClass);
  createClassJS(vClass); // if necessary
  createAttribTypeSelect();
  createAttribSelect();
  createMethodSelect();
  var vClassName = getValueDOM("tClassname");
  writeClassTitle(vClassName);
  setClassSelectorDefault(vClassName);
};

function setClassSelectorDefault(pClassName) {
  write2value("sClassList",pClassName);
  write2value("sClassCode",pClassName);
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
  show("bSaveJSON");
  var vDB = getValueDOM("sDatabase");
  var vValue = vJSON_JS["DatabaseList"][vDB];
  setEditorValue("iJSON",vValue)
}

function saveDatabaseJSON() {
  var vDB = getValueDOM("sDatabase");

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
