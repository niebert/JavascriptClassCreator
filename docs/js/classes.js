function initClass4Form() {
  var vClass = document.fCreator.tClassname.value;
  //ClassList contains
  document.fCreator.tClassList = vClass;
  initClassJS(vClass);
};

function initClassJS(pSelectedClass) {
  if (pSelectedClass == "") {
    console.log("initClassJS()-Call: Classname undefined");
  } else {
    if (vJSON_JS) {
      vJSON_JS["SelectedClass"] = pSelectedClass;
      console.log("JSON Database 'vJSON_JS' exists.");
      if (vJSON_JS["ClassList"]) {
        console.log("vJSON_JS['ClassList'] exists");
      } else {
        vJSON_JS["ClassList"] = {};
        console.log("vJSON_JS['ClassList'] created");
      };
      if (vJSON_JS["ClassList"][pSelectedClass]) {
        console.log("Class '"+pSelectedClass+"' exists in JSON DB");
      } else {
        createClassJS(pSelectedClass);
        updateForm2JSON();
        console.log("Class '"+pSelectedClass+"' created and updated from HTML Form with default values");
      }
    } else {
      var vError = "ERROR: initClassJS() [classes.js]: JSON Database 'vJSON_JS' does NOT exist.";
      console.log(vError);
    };
  }
};

function existsClassJS(pClass) {
  var vReturn = false;
  if (vJSON_JS) {
    if (vJSON_JS["ClassList"]) {
      if (vJSON_JS["ClassList"][pClass]) {
        vReturn = true;
      };
    };
  };
  return vReturn
};

function createClassJS(pClass) {
  if (existsClassJS(pClass)) {
    alert("Class '"+pClass+"' alread exists!")
  } else {
    console.log("Create Class '"+pClass+"' - createClassJS()-Call");
    vJSON_JS["ClassList"][pClass] = {};
    vClassJSON = vJSON_JS["ClassList"][pClass];
    for (var i = 0; i < vDOM_ID.length; i++) {
      vClassJSON[vDOM_ID[i]] = "";
    };
    vClassJSON["MethodCode"] = {};
    vClassJSON["MethodComment"] = {};
  };
};

function reduceMethodName(pName) {
  return reduceVarName(pName);
};


function getMethodName(pMethodWithParams) {
  var vSplitArray = pMethodWithParams.split("(");
  var vMethodName = reduceMethodName(vSplitArray[0]);
  return vMethodName.replace(/\s/g,"");
};

function getMethodComment(pMethodWithParams) {
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodComment"][vMethodName] || "";
};

function getMethodCode(pMethodWithParams) {
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodCode"][vMethodName] || "";
};

function getAttributes4Class() {
  //var vClassname 		= document.fCreator.tClassname.value;
  var vAttributes 	= document.fCreator.tAttributes.value;
  var vAttribArray    = vAttributes.split(/\n/);
	return  vAttribArray;
}


function getAttribArray() {
  var vAttributes 	= document.fCreator.tAttributes.value;
  var vAttribArray    = vAttributes.split(/\n/);
  return vAttribArray;
}

function getMethodArray() {
  var vMethods    	  = document.fCreator.tMethods.value;
	var vMethodArray    = vMethods.split(/\n/);
	return vMethodArray;
}


function checkJSMethods(pMethodArray) {
  var vMethodArray    = pMethodArray || getMethodArray();
  var vRetArray = [];
  var vErrorCount = 0;
	for (var i=0; i<vMethodArray.length; i++) {
		var vOpenBracketPos = vMethodArray[i].indexOf("(");
		if (vOpenBracketPos >0) {
			vSplitArray = vMethodArray[i].split("(");
			var vCloseBracketPos = vSplitArray[1].lastIndexOf(")");
			if (vCloseBracketPos<0) {
        vErrorCount++;
				console.log("ERROR: Method definition error!\n No closing bracket!\n"+vMethodArray[i]);
			} else {
        console.log("check "+vMethodArray[i]+" is well defined!");
        vRetArray.push(vMethodArray[i]);
      };
		} else {
      var vCheckMethod = reduceMethodName(vMethodArray[i]);
      if (vCheckMethod.length >2) {
        vErrorCount++;
        console.log("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
      }
    }
  };
  return vRetArray;
};


function updateClasses() {
  var vClassList = document.fCreator.tClassList.value;
  var vClassArray = vClassList.split(/\n/);
  var vOptionArray = [];
  var vClassHash = {};
  for (var i = 0; i < vClassArray.length; i++) {
    vClassArray[i] = reduceVarName(vClassArray[i]);
    if (vClassArray[i] != "") {
      vOptionArray.push(vClassArray[i]);
      if (vJSON_JS[vClassArray[i]]) {
        console.log("Class '"+vClassArray[i]+"' exists for updateClasses()-Call");
      } else {
        createClassJS(vClassArray[i]);
      };
    };
  };
  var vOptions = createOptions(vOptionArray);
  write2value("sClassList",vOptions);
};
