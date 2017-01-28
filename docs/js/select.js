// This library performs the actions on select events
// Options are created in dom.js

function selectClass() {
  var vCurrentClass = getValueDOM("tClassname");
  var vClass = getValueDOM("sClassList");
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
  write2innerHTML("titleClassName",vClassName);
  write2value("sClassList",vClassName);
  $( "#tabClass" ).trigger( "click" );
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
  document.fCreator.tMethodName.value = vMethodHash[vMethodName];
  saveJSON2LocalStorage();
};

function updateClassSelector() {
  createClassSelect();
}
