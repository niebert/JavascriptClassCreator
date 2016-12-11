
function loadLocalStorage2JSON() {
  // main Load JSON function
  var vJSONstring = localStorage.getItem("JSON_DB") || "";
  write2value("tJSONDB",vJSONstring);
  if (vJSONstring != "") {
    vJSON_JS = JSON.parse(vJSONstring);
  } else {
    console.log("ERROR: JSON_DB undefined in localStorage");
  }
};

function saveJSON2LocalStorage() {
  // main Save JSON function
  var vJSONstring = JSON.stringify(vJSON_JS)
  localStorage.setItem("JSON_DB",vJSONstring);
  write2value("tJSONDB",vJSONstring);
};


function createMethodJSON() {
  var vJSON = "";
  if (vMethodJSON) {
    vJSON = JSON.stringify(vClassFileJSON);
  };
  return vJSON;
};


function loadClassJSON() {
  var vClassname 	= document.fCreator.tClassname.value;
  //var vJSONDB = loadLocalDB(vClassname);
  var vJSONDB = vJSON_JS[vClassname];
  for (var i = 0; i < vDOM_ID.length; i++) {
    if (vJSONDB[vDOM_ID[i]]) {
      write2value(vDOM_ID[i],vJSONDB[vDOM_ID[i]]);
    } else {
      //write2value(vDOM_ID[i],"");
      write2value(vDOM_ID[i],"Error: "+vDOM_ID[i]+" undefined");
    };
  };
};

function saveClassJSON() {
  var vClass 	= document.fCreator.tClassname.value;
  for (var i = 0; i < vDOM_ID.length; i++) {
    vJSON_JS[vClass][vDOM_ID[i]] = getValueDOM(vDOM_ID[i]);
  };
  saveLocalDB("vJSON_JS",vJSON_JS);
};


function updateJSMethods() {
  var vMethodArray    = getMethodArray();
  vMethodArray = checkJSMethods(vMethodArray);
  // load tMethods definitions and create the options of the SELECT Box
  console.log("Update JS Methods");
  var vOptions =createOptions(vMethodArray);
  var vMethodName = document.fCreator.tMethodName.value;
  var vMethodsTextarea = document.fCreator.tMethods.value;
  if (vMethodsTextarea.indexOf(vMethodName)>=0) {
    console.log("Keep old Method in display");
  } else {
    loadMethodJSON(vMethodArray[0]);
  };
  // id="sSelectMethod" of Select Box
  write2innerHTML("sSelectMethod",vOptions);
};


function loadMethodJSON (pMethodName) {
  var vMethodName = document.fCreator.tMethodName.value;
  vMethodName = pMethodName || vMethodName;
  document.fCreator.tMethodName.value = vMethodName;
  vMethodName = getMethodName(vMethodName); //without Parameters
  if (vMethodName != "") {
    console.log("loadMethodJSON() Call - Method Code '"+vMethodName+"' defined");
    document.fCreator.tMethodCode.value    = vClassJSON["MethodCode"][vMethodName] || "";
    document.fCreator.tMethodComment.value = vClassJSON["MethodComment"][vMethodName] || "";
  } else {
    alert("loadMethodJSON() Call - Method Name undefined");
    console.log("loadMethodJSON() Call - Method Name undefined");
  };
};

function storeMethodJSON(pMethodName) {
  var vMethodName = document.fCreator.tMethodName.value;
  vMethodName = pMethodName || vMethodName;
  vMethodName = getMethodName(vMethodName);
  var vMethodCode     = document.fCreator.tMethodCode.value;
  var vMethodComment  = document.fCreator.tMethodComment.value;
  if (vMethodName != "") {
    checkClassJSON(vClassJSON);
    vClassJSON["MethodCode"][vMethodName] = vMethodCode;
    vClassJSON["MethodComment"][vMethodName] = vMethodComment;
  } else {
    console.log("storeMethodJSON() Call - Method Name undefined");
  };
};

function checkClassJSON


function updateForm2JSON() {
  for (var i = 0; i < vDOM_ID.length; i++) {
    vClassJSON[vDOM_ID[i]] = getValueDOM(vDOM_ID[i]);
  };

}
