

function selectClass() {
  var vClass = document.fCreator.sClassList.value;
  if (vJSON_JS[vClass]) {
    console.log("Class '"+vClass+"' exists in selectClass()-Call");
  } else {
    createClassJS(vClass);
  };
};


function createOptions(pArray) {
  var vOptions = "";
  for (var i = 0; i < pArray.length; i++) {
      vOptions +="<option>"+pArray[i]+"</option>\n";
  };
  return vOptions;
};

function selectedMethodName() {
  return getValueDOM("sSelectMethod");
};

function selectJSMethods() {
  //alert("Select Method");
  //save current Method
  storeMethodJSON();
  //get SELECT MethodName value
  var vMethodName = getValueDOM("sSelectMethod");
  // set MethodName Input Window
  document.fCreator.tMethodName.value = vMethodName;
  //load method code from  vJSON_JS if exists
  //and write method code to TEXTAREA
  loadMethodJSON(vMethodName);
  saveJSON2LocalStorage();
};

function updateClassSelector() {
  var vClassList = document.fCreator.tClassList.value;
  var vClassArray = vClassList.split("\n");
  write2innerHTML("sClassList",createOptions(vClassArray));
}
