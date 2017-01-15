// This library performs the actions on select events
// Options are created in dom.js

function selectClass() {
  var vCurrentClass = getValueDOM("tClassname");
  var vClass = getValueDOM("sClassList");
  console.log("selectClass()-Call");
  updateForm2Class(vCurrentClass);
  if (vJSON_JS[vClass]) {
    console.log("Class '"+vClass+"' exists in selectClass()-Call");
  } else {
    console.log("clearForm4Class()-Call");
    clearForm4Class();
    createClassJS(vClass); // if necessary
    fillForm4Class(vClass);
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
  saveAttribJSON();
  //get SELECT AttribName value
  var vAttribName = getValueDOM("sAttribList");
  console.log("selectJSAttribs() - AttribName='"+vAttribName+"'");
  // set MethodName Input Window
  document.fCreator.tAttribName.value = vAttribName;
  //vClassJSON.AttribList[vAttribName]
  var vAttArr = ["AttribComment","AttribTypeList","AttribDefault"];
  var vID = "";
  var vValue = "";
  for (var i = 0; i < vAttArr.length; i++) {
    vID = vAttArr[i];
    document.getElementById("t"+vAttArr[i])
  }
  var vType = vClassJSON["AttribType"][vAttribName];
  var vParam = vClassJSON["AttribDefault"][vAttribName];
  var vComment = vClassJSON["AttribComment"][vAttribName];
  //load method code from  vJSON_JS if exists
  //and write method code to TEXTAREA
  loadAttribJSON(vAttribName);
  saveJSON2LocalStorage();
}


function selectJSMethods() {
  //alert("Select Method");
  //save current Method
  saveMethodJSON();
  //get SELECT MethodName value
  var vMethodName = getValueDOM("sMethodList");
  // set MethodName Input Window
  document.fCreator.tMethodName.value = vMethodName;
  //load method code from  vJSON_JS if exists
  //and write method code to TEXTAREA
  loadMethodJSON(vMethodName);
  saveJSON2LocalStorage();
};

function updateClassSelector() {
  createClassSelect();
}
