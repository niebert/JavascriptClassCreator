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
  return vJSON_JS["ClassList"][vSelectedClass];
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
  var vArray = getClassTypeArray(); //classes.js 418
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
};

function createClassTypeSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createClassSelect()-Call");
  var vArray = getClassTypeArray();  //classes.js 418
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sClassList",vOptions)
};

function createMethodSelect4JSON() {
  // get all Methods in JSON Database of all Classes
  console.log("createMethodSelect()-Call");
};
