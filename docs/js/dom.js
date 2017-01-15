function createOptions(pArray) {
  var vOptions = "";
  if (pArray) {
    for (var i = 0; i < pArray.length; i++) {
        vOptions +="<option>"+pArray[i]+"</option>\n";
    };
  } else {
    console.log("ERROR: createOptions()-Call pArray undefined");
  }
  return vOptions;
};

function createMethodSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createMethodSelect()-Call");
  var vArray = getMethodNameArray();
  var vOptions = createOptions(vArray);
  write2innerHTML("sMethodList",vOptions);
  var vMethCodeHash = vClassJSON["MethodCode"];
  var vMethCommentHash = vClassJSON["MethodComment"];
  write2value("tMethodName",vArray[0]);
  write2value("tMethodCode",vMethCodeHash[vArray[0]]);
  write2value("tMethodComment",vMethCommentHash[vArray[0]]);
};


function createAttribSelect() {
  var vArray = getAttribNameArray();
  var vAttDefaultHash = getAttribDefaultHash();
  var vAttCommentHash = getAttribCommentHash(vAttDefaultHash);
  console.log("createAttribSelect()-Call: vArray[0]="+vArray[0]);
  var vOptions = createOptions(vArray);
  write2innerHTML("sAttribList",vOptions);
  write2value("tAttribName",vArray[0]);
  write2value("tAttribDefault",vAttDefaultHash[vArray[0]]);
  write2value("tAttribComment",vAttCommentHash[vArray[0]]);
};

function getSelectedClass() {
  return getValueDOM("sClassList") || document.fCreator.tClassname.value || "UndefClass";
};

function saveForm2ClassJSON() {
  // get all Value from DOM and save Values  in JSON Database of selected Class
  console.log("saveForm2ClassJSON()-Call");
  var vClass = getSelectedClass();
  for (var i = 0; i < vDOM_ID.length; i++) {
    write2value(vDOM_ID[i],"");
  };
  var vArray = getAttribNameArray();
  var vOptions = createOptions(vArray);
  write2innerHTML("sAttribList",vOptions)
};

function createAttribTypeSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createAttribTypeSelect()-Call");
  var vArray = getClassTypeArray(); //classes.js 418
  var vOptions = createOptions(vArray);
  write2innerHTML("sAttribTypeList",vOptions);
  var vName = vArray[0];
  if (vArray.length>0) {
    write2value("tAttribName",vName);
  };
  var vAttribHash = getAttribDefaultHash();
  write2value("tAttribDefault",vAttribHash[vName]);
};

function createClassSelect(pArray) {
  // get all Methods in JSON Database of all Classes
  console.log("createClassSelect()-Call");
  var vArray = pArray || getClassArray();
  var vOptions = createOptions(vArray);
  write2innerHTML("sClassList",vOptions)
};

function createClassTypeSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createClassSelect()-Call");
  var vArray = getClassTypeArray();  //classes.js 418
  var vOptions = createOptions(vArray);
  write2innerHTML("sClassList",vOptions)
};

function createMethodSelect4JSON() {
  // get all Methods in JSON Database of all Classes
  console.log("createMethodSelect()-Call");
};
