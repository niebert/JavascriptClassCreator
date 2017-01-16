// vJSON_JS contains all the data of the current programming project
//      this database will be stored and updated from the
// vClassJSON contains the current class
// vSelectedClass is the ClassName of the Class that is currently edited
// vJSON_JS["ClassList"][vSelectedClass]  is equal to vClassJSON

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
  var vJSONstring = JSON.stringify(vJSON_JS);
  localStorage.setItem("JSON_DB",vJSONstring);
  //write2value("tJSONDB",JSON.stringify(vJSON_JS,null,4);
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

function  updateAttributesJS() {
  //vClassJSON["tAttributes"] = getAttribDefaultHash();
  console.log("updateAttributesJS()-Call called after adding a new Attribute");
};
function  updateMethodsJS() {
  //vClassJSON["Methods"] = getAttribDefaultHash();
  console.log("updateMethodsJS()-Call undefined");
};

function updateJSAttribs() {
  updateForm2AttribJSON();
  createAttribTypeSelect();
  createAttribSelect();
};

function updateJSMethods() {
  var vMethodNameArr = getMethodNameArray();
  var vMethodArray    = getMethodArray();
  vMethodArray = checkJSMethods(vMethodArray);
  // load tMethods definitions and create the options of the SELECT Box
  console.log("Update JS Methods");
  var vOptions = createOptions4Array(vMethodNameArr);
  var vMethodCall = document.fCreator.tMethodName.value;
  var vMethodName = getMethodName(vMethodCall);
  if (vMethodName != "") {
    if (vMethodArray[vMethodName]) {
      loadMethodJSON(vMethodNameArray[0]);
    } else {
      console.log("updateJSMethods()-Call  '"+vMethodName+"' undefined in MethodArray");
    }
  };
  // id="sMethodList" of Select Box
  write2innerHTML("sMethodList",vOptions);
};

function loadAttribJSON (pAttribName) {
  var vAttribName = document.fCreator.tAttribName.value;
  vAttribName = pAttribName || vAttribName;
  document.fCreator.tAttribName.value = vAttribName;
  vAttribName = getAttribName(vAttribName); //without Parameters
  if (vAttribName != "") {
    console.log("loadAttribJSON() Call - Attribute '"+vAttribName+"' defined");
    document.fCreator.sAttribTypeList.value = vClassJSON["AttribType"][vAttribName] || "";
    document.fCreator.tAttribDefault.value  = vClassJSON["AttribDefault"][vAttribName] || "";
    document.fCreator.tAttribComment.value  = vClassJSON["AttribComment"][vAttribName] || "";
  } else {
    alert("loadAttribJSON() Call - Attrib Name undefined");
    console.log("loadAttribJSON() Call - Attrib Name undefined");
  };
};

function saveAttribEdit() {
  saveAttribJSON();
  var vOut = "";
  var vCR = "";
  var vAttHash = vClassJSON["AttribDefault"];
  for (var iName in vAttHash) {
    if (vAttHash.hasOwnProperty(iName)) {
      vOut += vCR + iName + " = " + vAttHash[iName];
      vCR = "\n";
    };
  };
  write2value("tAttributes",vOut);
}

function saveAttribJSON(pAttName,pAttType,pAttDefault,pAttComment) {
  var vAttribName     = pAttName    || document.fCreator.tAttribName.value    || "";
  var vAttribType     = pAttType    || document.fCreator.tAttribType.value    || "";
  var vAttribDefault  = pAttDefault || document.fCreator.tAttribDefault.value || "";
  var vAttribComment  = pAttComment || document.fCreator.tAttribComment.value || "";
  if (vAttribName != "") {
    checkClassJSON(vClassJSON);
    vClassJSON["AttribType"][vAttribName]    = vAttribType;
    vClassJSON["AttribDefault"][vAttribName] = vAttribDefault;
    vClassJSON["AttribComment"][vAttribName] = vAttribComment;
  } else {
    console.log("saveAttribJSON() Call - Attrib Name undefined");
  };
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

function saveMethodJSON(pMethodName) {
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
    console.log("saveMethodJSON() Call - Method Name undefined");
  };
};

function checkClassJSON(pClassJSON) {
  var vClass = pClassJSON || vClassJSON; // Global Variable
  // The function check if all variables in the Class are defined
  console.log("Check Properties of Class");
  for (var i = 0; i < vDOM_ID.length; i++) {
    var vID = vDOM_ID[i];
    if (vClass.hasOwnProperty(vID)) {
      console.log("checkClassJSON() - Class['"+vID+"'] defined");
    } else {
      //eval()
    }
  }
}

function updateForm2MethodComment() {
  console.log("updateForm2MethodComment()-Call");
};

function updateForm2MethodNameParam() {
  console.log("updateForm2MethodNameParam()-Call");
};
function updateJSON2Form(pClass) {
  console.log("updateJSON2Form('"+pClass+"')");
  var vClass = pClass || getSelectedClass();
  // Set Selected with vClassJSON
  vClassJSON = vJSON_JS["ClassList"][pClass];
  // updates form content in DOM with Class content
  for (var i = 0; i < vDOM_ID.length; i++) {
     write2value(vDOM_ID[i],vClassJSON[vDOM_ID[i]]);
  };
  // load the defined Attribute from Form
  var vAttHash = getAttribDefaultHash();
  vClassJSON["AttribDefault"] = vAttHash;
  // Define Hash in Attribute Hash if undefined
  defineHashIfUndefined(vAttHash,"AttribType");
  defineHashIfUndefined(vAttHash,"AttribComment");
  var vMethArr = getMethodNameArray(); //classes.js:275
  var vMethHash = {};
  for (var i = 0; i < vMethArr.length; i++) {
    vMethHash[vMethArr[i]] = vMethArr[i];
  };
  defineHashIfUndefined(vMethHash,"MethodCode");
  defineHashIfUndefined(vMethHash,"MethodComment");
};

function updateForm2AttribJSON(pClass) {
  console.log("updateForm2AttribJSON('"+pClass+"')");
  var vClass = pClass || getSelectedClass();
  var vAttHash = getAttribDefaultHash();
  vClassJSON["AttribDefault"] = vAttHash;
  var vAttTypeHash = getAttribTypeHash(vAttHash); // classes.js:336
  // Define Hash in Attribute Hash if undefined
  defineHashIfUndefined(vAttTypeHash,"AttribType");
  var vAttCommentHash = getAttribCommentHash(vAttHash); // classes.js:356
  defineHashIfUndefined(vAttCommentHash,"AttribComment");
};

function updateForm2MethodJSON(pClass) {
  console.log("updateForm2MethodJSON('"+pClass+"')");
  var vClass = pClass || getSelectedClass();
  var vMethArr = getMethodNameArray(); //classes.js:275
  var vMethHash = {};
  for (var i = 0; i < vMethArr.length; i++) {
    vMethHash[vMethArr[i]] = "";
    vMethHash[vMethArr[i]] = "Code for " + vMethArr[i];
  };
  defineHashIfUndefined(vMethHash,"MethodCode");
  for (var i = 0; i < vMethArr.length; i++) {
    vMethHash[vMethArr[i]] = "";
    vMethHash[vMethArr[i]] = "Comment for " + vMethArr[i];
  };
  defineHashIfUndefined(vMethHash,"MethodComment");
}

function updateForm2JSON(pClass) {
  console.log("updateForm2JSON('"+pClass+"')");
  var vClass = pClass || getSelectedClass();
  // updates the Class content with form content in DOM
  createClassJS(pClass);
  vClassJSON = vJSON_JS["ClassList"][pClass];
  for (var i = 0; i < vDOM_ID.length; i++) {
    vClassJSON[vDOM_ID[i]] = getValueDOM(vDOM_ID[i]);
  };
  // load the defined Attribute and Methodsfrom Form
  updateForm2AttribJSON(pClass);
  updateForm2MethodJSON(pClass);
};

function defineHashIfUndefined(pHash,pHashListID) {
  for (var iAttName in pHash) {
    if (vClassJSON[pHashListID][iAttName]) {
        //vClassJSON[pHashListID][iAttName];
        console.log(pHashListID+"."+iAttName+" defined");
    } else {
      console.log(pHashListID+"."+iAttName+" undefined set to '"+pHash[iAttName]+"'");
      vClassJSON[pHashListID][iAttName] = pHash[iAttName];
    };
  };
};
