
function createOptions4Array(pArray) {
  var vOptions = "";
  if (pArray) {
    for (var i = 0; i < pArray.length; i++) {
        vOptions +="<option>"+pArray[i]+"</option>\n";
    };
  } else {
    console.log("ERROR: createOptions4Array()-Call pArray undefined");
  }
  return vOptions;
};

function createMethodSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createMethodSelect()-Call");
  var vArray = getMethodNameArray();
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sMethodList",vOptions);
  var vMethHash = getMethodHash();
  var vMethCodeHash = vClassJSON["MethodCode"];
  var vMethCommentHash = vClassJSON["MethodComment"];
  write2value("tMethodName",vMethHash[vArray[0]] || "");
  write2value("tMethodCode",vMethCodeHash[vArray[0]] || "");
  write2value("tMethodComment",vMethCommentHash[vArray[0]] || "");
};


function createAttribSelect() { // TA=TextArea
  var vClass = getValueDOM("tClassname");
  var vArray = getAttribNameArray();
  var vAttDefaultHash = getForm2AttribDefaultHash(vClass); //classes.js:484
  var vAttCommentHash = getAttribCommentHash(vAttDefaultHash);
  console.log("createAttribSelect()-Call: vArray[0]="+(vArray[0] || ""));
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sAttribList",vOptions);
  write2value("tAttribName",vArray[0] || "");
  write2value("tAttribDefault",vAttDefaultHash[vArray[0]] || "");
  write2value("tAttribComment",vAttCommentHash[vArray[0]] || "");
};

function getSelectedClass() {
  return getValueDOM("tClassname") || getValueDOM("sClassList") || "UndefClass";
};

function getSelectedClassJSON(pClassName) {
  var vSelectedClass = pClassName || getSelectedClass();
  var vRetClassJSON = {};
  if (vJSON_JS["ClassList"] && vJSON_JS["ClassList"][vSelectedClass]) {
    vRetClassJSON = vJSON_JS["ClassList"][vSelectedClass]
  };
  return vRetClassJSON;
}

function saveForm2ClassJSON() {
  // get all Value from DOM and save Values  in JSON Database of selected Class
  console.log("saveForm2ClassJSON()-Call");
  var vClass = getSelectedClass();
  for (var i = 0; i < vDOM_ID.length; i++) {
    write2value(vDOM_ID[i],"");
  };
  var vArray = getAttribNameArray();
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sAttribList",vOptions)
};

function createAttribTypeSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createAttribTypeSelect()-Call");
  var vArray = getAllClassesArray(); //classes.js 418
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sAttribTypeList",vOptions);
  var vName =  "";
  if (vArray.length>0) {
    vName = vArray[0];
  };
  write2value("tAttribName",vName);
  var vAttribHash = getForm2AttribDefaultHash(); //classes.js:484
  write2value("tAttribDefault",vAttribHash[vName]);
};

function createClassSelect(pArray) {
  // get all Methods in JSON Database of all Classes
  console.log("createClassSelect()-Call");
  var vArray = pArray || getClassArray();
  vArray.sort();
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sClassList",vOptions)
  write2innerHTML("sClassCode",vOptions)
};

function getArray4HashID(pHash) {
  var vHash = pHash || {};
  var vArray = [];
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vArray.push(iID)
    };
  };
  return vArray
};

function createPageSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createPageSelect()-Call");
  var vArray = getArray4HashID(vJSON_JS["PageList"]);
  vArray.sort();
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sPageHTML",vOptions);
  var vFirstEmpty = [""];
  vArray = vFirstEmpty.concat(vArray);
  vOptions = createOptions4Array(vArray);
  write2innerHTML("sParentPage",vOptions);
};

function createPageTypeSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createPageTypeSelect()-Call");
  var vArray = getArray4HashID(vJSON_JS["PageType"]);
  vArray.sort();
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sPageTypeHTML",vOptions);
  var vContent = vJSON_JS["PageType"][vArray[0]]["content"]
  setEditorValue("iPageTypeHTML",vContent);
};

function createDatabaseSelect(pArray) {
  // Create a Select for all Databases
  console.log("createDatabaseSelect()-Call");
  var vArray = pArray || getDatabaseArray();
  vArray.sort();
  var vEmptySel = [""];
  var vArrayEmptySel = vEmptySel.concat(vArray);
  var vOptions = createOptions4Array(vArrayEmptySel);
  write2innerHTML("sDatabases",vOptions);
};


function createClassTypeSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createClassSelect()-Call");
  var vArray = getAllClassesArray();  //classes.js 418
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sClassList",vOptions)
};

function createMethodSelect4JSON() {
  // get all Methods in JSON Database of all Classes
  console.log("createMethodSelect()-Call");
};

function writeClassTitle(pClassName) {
  write2innerHTML("titleClassName",pClassName);
  write2innerHTML("codeClassName",pClassName);
}
