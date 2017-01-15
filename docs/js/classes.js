// vJSON_JS contains all the data of the current programming project
//      this database will be stored and updated from the
// vClassJSON contains the current class
// vSelectedClass is the ClassName of the Class that is currently edited
// vJSON_JS["ClassList"][vSelectedClass]  is equal to vClassJSON


function createNewClass() {
  console.log("Click New - create a new class after prompt");
  var vNewClassName = prompt("Please enter name of new Class", "");
  var vSuccess = false;
  if (vNewClassName != null) {
    write2value("tClassname", vNewClassName);
    vFailed = createClassJS(vNewClassName);
    if (vFailed) {
      alert("Create New Class ["+vNewClassName+"] was NOT successful. Class already exists!");
    } else {
      append2value("tClassList", "\n"+vNewClassName);
      updateClasses();
      updateJSON2Form(vNewClassName);
    }
  } else {
    console.log("Create new Classes cancelled!");
  };
  return vSuccess;
};

function initClassJS(pClass) {
  if (!pClass) {
    console.log("Call: initClassJS(pClass) with pClass undefined");
  } else {
      initClassJS_do(pClass)
  }
};

function initClassJS_do(pClass) {
  pClass = reduceVarName(pClass);
  if (pClass == "") {
    console.log("initClassJS()-Call: Classname undefined");
  } else {
    if (!top.vJSON_JS) {
      var vError = "WARNING: initClassJS() [classes.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    top.vJSON_JS["SelectedClass"] = pClass;
    if (top.vJSON_JS["ClassList"]) {
      console.log("vJSON_JS['ClassList'] exists");
    } else {
      top.vJSON_JS["ClassList"] = {};
      console.log("vJSON_JS['ClassList'] created");
    };
    if (top.vJSON_JS["ClassList"][pClass]) {
      console.log("Class '"+pClass+"' exists in JSON DB");
    } else {
      top.createClassJS(pClass);
      console.log("Class '"+pClass+"' created and updated from HTML Form with default values");
    };
  };
}

function existsClassJS(pClass) {
  if (!pClass) {
    alert("existsClassJS(pClass)-Call with pClass undefined");
  };
  console.log("existsClassJS('"+pClass+"')");
  var vReturn = false;
  if (vJSON_JS) {
    if (vJSON_JS["ClassList"]) {
      if (vJSON_JS["ClassList"][pClass]) {
        vReturn = true;
        console.log("Class '"+pClass+"' is a user-defined class.");
      };
    };
  };
  if (vReturn == false) {
    if (existsBasicClass(pClass)) {
      console.log("Class '"+pClass+"' is a basic class.");
      vReturn = true;
    };
  };
  if (vReturn == false) {
    console.log("Class '"+pClass+"' does NOT exist.");
  };
  return vReturn
};

function existsBasicClass(pClass) {
  var vBasicClassHash = getBasicClassHash();
  return  vBasicClassHash.hasOwnProperty(pClass);
}

function createClassJS(pClass) {
  var vClassExists = existsClassJS(pClass);
  if (vClassExists) {
    //alert("Class '"+pClass+"' already exists!");
    console.log("Class '"+pClass+"' already exists!");
  } else {
    console.log("createClassJS('"+pClass+"')-Call: Create Class '"+pClass+"' - createClassJS()-Call");
    checkClassList(pClass);
    vClassJSON = vJSON_JS["ClassList"][pClass];
    for (var i = 0; i < vDOM_ID.length; i++) {
      vClassJSON[vDOM_ID[i]] = "";
    };
    vClassJSON["tClassname"] = pClass;
    vClassJSON["tEMail"] = getValueDOM("tEMail");
    vClassJSON["tAuthor"] = getValueDOM("tAuthor");
    // "myMethod(p1,p2)" stores the code in vClassJSON["MethodCode"]["myMethod"]
    // and stores the comment in vClassJSON["MethodComment"]["myMethod"]
    vClassJSON["AttribType"] = {};
    vClassJSON["AttribDefault"] = {};
    vClassJSON["AttribComment"] = {};
    vClassJSON["MethodCode"] = {};
    vClassJSON["MethodComment"] = {};
  };
  return vClassExists;
};

function reduceMethodName(pName) {
  // converts "myMethod(p1,p2)" into "myMethod" to create unique method names
  // for all methods from a class
  // Some programming languages allow the definition of
  // "myMethod(p1,p2)" and "myMethod(p1,p2,p3)" in the same class.
  // This not allowed in JavascriptClassGenerator
  return reduceVarName(pName);
};

function checkClassList(pClass) {
  if (vJSON_JS["ClassList"]) {
    console.log("checkClassList('"+pClass+"') created Class in JSON Database");
    vJSON_JS["ClassList"][pClass] = {};
  } else {
    console.log("checkClassList('"+pClass+"') created (1) ClassList in JSON Database");
    vJSON_JS["ClassList"] = {};
    console.log("checkClassList('"+pClass+"') created (2) Class in JSON Database");
    vJSON_JS["ClassList"][pClass] = {};
  };
};

function getAttribName(pAttribWithParams) {
  var vSplitArray = pAttribWithParams.split("=");
  var vAttribName = reduceVarName(vSplitArray[0]);
  return vAttribName.replace(/\s/g,"");
};

function getAttribComment(pAttribWithParams) {
  var vAttribName = getAttribName(pAttribWithParams);
  return vClassJSON["AttribComment"][vAttribName] || "";
};

function getMethodName(pMethodWithParams) {
  var vSplitArray = pMethodWithParams.split("(");
  var vMethodName = reduceVarName(vSplitArray[0]);
  return vMethodName.replace(/\s/g,"");
};

function getMethodComment(pMethodWithParams) {
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodComment"][vMethodName] || "";
};

function getMethodCode(pMethodWithParams) {
  var vMethodName = getMethodName(pMethodWithParams);
  //return vClassJSON["MethodCode"][vMethodName] || "undefined Code '"+pMethodWithParams+"'";
  return vClassJSON["MethodCode"][vMethodName] || "";
};

function getAttributes4Class() {
  //var vAttributes 	= document.fCreator.tAttributes.value;
  //var vAttribArray    = vAttributes.split(/\n/);
	//return  vAttribArray;
  return getAttribArray();
};
function updateAttributeDefinition(pAttribName,pNewDefinition) {
  var vAttHash = getAttribDefaultHash();
  replaceAttributeDefinition(vAttHash,pAttribName,pNewDefinition);
  var vAttArr = convertHash2Array(vAttHash)
};

function convertAttributeHash2Array(pHash) {
  var vRetArr = [];
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
      vRetArr.push(iID+" ="+pHash[iID]);
    };
  };
  return vRetArr;
};


function convertHash2Array(pHash) {
  var vRetArr = [];
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
      vRetArr.push(pHash[iID]);
    };
  };
  return vRetArr;
}

function replaceAttributeDefinition(pAttHash,pAttribName,pNewDefinition) {
  if (reduceVarName(pAttribName) != "") {
    pAttHash[pAttribName] = pNewDefinition;
    console.log("replaceAttributeDefinition()-Call Attribute '"+pAttribName+"' updated.");
  } else {
    console.log("Error: Attribute Name in replaceAttributeDefinition('"+pAttribName+"','"+pNewDefinition+"')");
  };
};

function isAttribNameDefined(pAttribName) {
  var vAttHash = getAttribDefaultHash();
  if (vAttHash.hasOwnProperty(pAttribName)) {
    return true;
  } else {
    return false;
  };
};

function getAttribArray() {
  var vAttributes 	= document.fCreator.tAttributes.value;
  vAttributes = removeEmptyLines(vAttributes);
  var vAttribArray    = vAttributes.split(/\n/);
  return vAttribArray;
}

function createNewAttribJS() {
  // get name of Attributes
  var vName = document.fCreator.tAttribName.value;
  if (existsAttribForm(vName)) {
    alert("Attribute '"+vName+"' already exists!\nPlease change name of attribute!");
  } else {
    //var vType = getValueDOM("sAttribTypeList");
    var vType = getValueDOM("tAttribType");
    var vValue = getValueDOM("tAttribDefault");
    var vComment = getValueDOM("tAttribComment");
    if (!vType) {
      console.log("Select of Atttribute Type is undefined");
      vType = "Object";
    } else {
      console.log("Select of Atttribute Type '"+vType+"'");
    };

    createNewAttributeForm(vName,vType,vValue,vComment);
    updateAttributesJS();
  }
};

function createNewMethodJS() {
  // get name of Attributes
  var vName = document.fCreator.tMethodName.value;
  if (existsMethodForm(vName)) {
    alert("Method '"+vName+"' already exists!\nPlease change name of method!");
  } else {
    //var vType = getValueDOM("sAttribTypeList");
    var vMethodCode = getValueDOM("tMethodCode");
    var vMethodComment = getValueDOM("tMethodComment");
    createNewMethodForm(vName,vType,vValue,vComment);
    updateMethodsJS();
  }
};
function createClassDefaultHash() {
    var vClassArray = getClassArray();
    var vClassDefHash = getBasicClassHash();
    var vID = "";
    for (var i = 0; i < vClassArray.length; i++) {
      vID = vClassArray[i];
      vClassDefHash[vID] = "new "+vID+"()";
    };
    return vClassDefHash;
};

function createNewAttributeForm(pName,pType,pValue,pComment) {
    var vAttrDef = pName + " = " + pValue;
    var vAttributes = document.fCreator.tAttributes;
    var vAttribs = reduceVarName(vAttributes.value);
    if (vAttribs == "") {
      vAttributes.value = vAttrDef;
    } else {
      vAttributes.value += "\n"+vAttrDef;
    };
    saveAttribJSON(pName,pType,pValue,pComment);
    updateForm2JSON(getValueDOM("tClassname"));
};

function X_createNewAttributeForm(pName,pType,pValue) {
    var vAttrDef = pName+ " = ";
    if (isBasicClass(pType)) {
      var vClassDefHash = getBasicClassHash();
      vAttrDef += vClassDefHash[pType];
    } else {
      vAttrDef += "new "+pType+"()"
    };
    var vAttributes = document.fCreator.tAttributes;
    var vAttribs = reduceVarName(vAttributes.value);
    if (vAttribs == "") {
      vAttributes.value = vAttrDef;
    } else {
      vAttributes.value += "\n"+vAttrDef;
    }
};

function existsAttribForm(pName) {
  var vAttribHash = getAttribDefaultHash();
  var vRet = false;
  if (vAttribHash[pName]) {
    vRet = true
  };
  return vRet;
}

function getAttribNameArray() {
  console.log("Call: getAttribNameArray()");
  var vAttrib 	= document.fCreator.tAttributes.value;
  //alert(vAttrib);
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  var vFound = 0;
  //var vRegEx = /([A-Za-z_0-9]+)[\w\s$]*[=][\w\s]*([^$]*)/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vLine = vAttribArray[i];
    //vRegEx.exec(vLine);
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      //console.log("'=' found in Line '"+vLine+"'");
      vAttribArray[i] = vLine.substr(0,vFound-1);
      console.log("New Setting vAttribArray[i]="+vAttribArray[i]);
    } else {
      console.log("'=' was not found '"+vAttribArray[i]+"' is undefined");
    };
  };
  return vAttribArray;
};

function getAttribTypeHash(pAttHash) {
  var vTypeHash = {};
  for (var iName in pAttHash) {
    if (pAttHash.hasOwnProperty(iName)) {
      vTypeHash[iName] = determineAttType(pAttHash[iName]);
      console.log("Type of '"+iName+"' is '"+vTypeHash[iName]+"'");
    }
  };
  return vTypeHash;
};

function getAttribCommentHash(pAttHash) {
  var vHash = {};
  for (var iName in pAttHash) {
    if (pAttHash.hasOwnProperty(iName)) {
      vHash[iName] = "";
      vHash[iName] = "Comment '" +iName + "' Type: "+ determineAttType(pAttHash[iName]+"");
    }
  }
  return vHash;
};

function determineAttType(pValue) {
  var vType = "";
  var vValue = pValue.replace(/^[\s\t\n]+/g,"");
  if (vValue.indexOf("\"")==0) {
    vType = "String";
  } else if (vValue.indexOf("'")==0) {
    vType = "String";
  } else if (vValue.indexOf("{")==0) {
    vType = "Hash";
  } else if (vValue.indexOf("[")==0) {
    vType = "Array";
  } else if (vValue.indexOf("true")==0) {
    vType = "Boolean";
  } else if (vValue.indexOf("false")==0) {
    vType = "Boolean";
  } else if (vValue.match(/^new[\s\t]+/)) {
    vValue  = vValue.replace(/^new[\s\t]+/,"");
    var vPos = vValue.indexOf("(");
    if (vPos > 0) {
      vType = reduceVarName(vValue.substr(0,vPos-1));
    };
  } else if (vValue.match(/^[0-9]+$/)) {
     vType = "Integer";
   } else if (vValue.match(/^[0-9]+\.?[0-9]*$/)) {
      vType = "Float";
   };
  return vType;
}

function getAttribDefaultHash() {
  var vAttrib 	= document.fCreator.tAttributes.value;
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  var vVar = "";
  var vValue = "";
  var vAttribHash = {};
  //var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*[=] (.*[\w\s,$]*\))/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vLine = vAttribArray[i];
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      vVar = reduceVarName(vLine.substr(0,vFound))
      vValue = vLine.substr(vFound+1,vLine.length);
      if (vVar != "") {
        vAttribHash[vVar] = vValue;
      } else {
        console.log("getAttribDefaultHash()-Call - vLine='"+vLine+"' undefined");
      }
    }
    //vRegEx.exec(vLine);
    //vAttribArray[i] = vRegEx.$2;
  };
  return vAttribHash;
}


function getAttribDefaultArray() {
  var vAttrib 	= document.fCreator.tAttributes.value;
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  //var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*[=] (.*[\w\s,$]*\))/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vLine = vAttribArray[i];
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      vAttribArray[i] = vLine.substr(vFound+1,vLine.length);
    }
    //vRegEx.exec(vLine);
    //vAttribArray[i] = vRegEx.$2;
  };
  return vAttribArray;
}

function getMethodArray() {
  var vMethods    	  = document.fCreator.tMethods.value;
  vMethods = removeEmptyLines(vMethods);
  var vMethodArray    = vMethods.split(/\n/);
	return vMethodArray;
};

function getName4Method(pMethodWithParams) {
  var vLine = getName4SepChar("(",pMethodWithParams);
  if (reduceVarName(vLine) != "") {
    console.log("getName4Method('"+pMethodWithParams+"') MethodName='"+vLine+"'");
  } else {
    console.log("getName4Method() - empty variable name");
    vLine = "";
  };
  return vLine;
};

function getName4SepChar(pChar,pLine) {
  var vPos = pLine.indexOf(pChar);
  if (vPos >0) {
    pLine = pLine.substring(0, vPos);
  };
  return pLine
};

function getMethodNameArray() {
  var vMethods    	  = document.fCreator.tMethods.value;
  vMethods = removeEmptyLines(vMethods);
  var vMethodArray    = vMethods.split(/\n/);
  var vLine = "";
  var vRetArr = [];
  for (var i = 0; i < vMethodArray.length; i++) {
      vLine = getName4Method(vMethodArray[i]);
      if (vLine != "") {
        vRetArr.push(vLine);
      };
  };
  return vRetArr;
};

function getMethodParamArray() {
  var vMethods    	  = document.fCreator.tMethods.value;
  vMethods = removeEmptyLines(vMethods);
  var vMethodArray    = vMethods.split(/\n/);
  var vLine = "";
  for (var i = 0; i < vMethodArray.length; i++) {
    var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*(\((.*[\w\s,$]*)\))/;
    vLine = vMethodArray[i];
    vRegEx.exec(vLine);
    vMethodArray[i] = vRegEx.$2;
  };
  return vMethodArray;
};

function getMethodParamHash() {
  var vMethods    	  = document.fCreator.tMethods.value;
  vMethods = removeEmptyLines(vMethods);
  var vMethodArray    = vMethods.split(/\n/);
  var vRetHash = {};
  var vLine = "";
  var vPos = 0;
  var vID = "";
  var vValue = "";
  for (var i = 0; i < vMethodArray.length; i++) {
    // var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*(\((.*[\w\s,$]*)\))/;
    vLine = vMethodArray[i];
    vPos = vLine.indexOf("(");
    if (vPos>0) {
      vID = vLine.substr(0,vPos-1);
      vValue =  vLine.substr(vPos+1,vLine.length);
      vRetHash[vID] = vValue;
    };
  };
  return vRetHash;
};


function getClassArray() {
  var vClassString = document.fCreator.tClassList.value;
  return getString2ClassArray(vClassString);
}

function getClassTypeArray() {
  var vClassString = document.fCreator.tClassList.value;
  var vBasicClassHash = getBasicClassHash();
  for (var iID in vBasicClassHash) {
    if (vBasicClassHash.hasOwnProperty(iID)) {
      vClassString +="\n" + iID;
    };
  };
  //vClassString    += "\n"+document.fCreator.tBasicClassList.value;
  return getString2ClassArray(vClassString);
}


function getString2ClassArray(pString) {
  var vClasses    	  = pString;
  vClasses = removeEmptyLines(vClasses);
  var vClassArray    = vClasses.split(/\n/);
	return vClassArray;
}

function removeEmptyLines(pString) {
  pString = pString.replace(/^[\s\t]*[\r\n]/gm,"");
  return pString.replace(/\n[\s\t]*$/gm,"");
};


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

function isBasicClass(pClassname) {
  var vBasisClasses = getBasicClassArray();
  var vRet = false;
  for (var i = 0; i < vBasisClasses.length; i++) {
    if (vBasisClasses[i] == pClassname) {
      vRet = true;
    }
  };
  return vRet;
};

function getBasicClassArray() {
  var vBasisClasses = getBasicClassHash();
  var vRetArray = [];
  for (var pClassname in vBasisClasses) {
    vRetArray.push(pClassname);
  };
  return vRetArray;
};

function getBasicClassHash() {
  var vClassList = document.fCreator.tBasicClassList.value;
  var vClassArray = vClassList.split(/\n/);
  var vClassHash = {};
  var vVar;
  for (var i = 0; i < vClassArray.length; i++) {
    vVar = splitAtEqual(vClassArray[i]);
    console.log("getBasisClassDefHash() - Var='"+vVar[0]+"' value='"+vVar[1]+"'");
    if (reduceVarName(vVar[0]) != "") {
      vClassHash[reduceVarName(vVar[0])] = vVar[1].replace(/^\s+/,"");
    } else {
      console.log("getBasicClassHash()-Call: Empty Name of Variable before '='");
    }
  };
  return vClassHash;
}

function splitAtEqual(pString) {
  return pString.split("=");
}

function X_splitAtEqual(pString) {
  var vPos = 0;
  var vRet = undefined;
  vPos = pString.indexOf("=");
  if (vPos == 0) {
    console.log("splitAtEqual()-Call: Variablename was undefined!");
    vRet = ["",pString.substr(1,pString.length)];
  } else if (vPos > 0) {
    vRet = [pString.substr(0,vPos),pString.substr(vPos+1,pString.length)];
  } else {
    vRet = [pString,""]
  }
  return vRet;
}

function updateBasicClasses() {
  var vClassList = document.fCreator.tBasicClassList.value;
  var vClassArray = vClassList.split(/\n/);
  var vClassHash = {};
  var vVar;
  var vOut = "";
  var vCR = "";
  for (var i = 0; i < vClassArray.length; i++) {
    vVar = splitAtEqual(vClassArray[i]);
    if (reduceVarName(vVar[0]) != "") {
      vOut += vCR + reduceVarName(vVar[0]);
      vCR = "\n";
    } else {
      console.log("updateBasicClasses() - Empty BasicClass Name");
    };
  }
};

function updateClasses() {
  // creates non existing classes in tClassList and removes
  // empty line in tClassList
  updateBasicClasses();
  vJSON_JS["BasicClasses"] = getBasicClassHash();
  var vClassList = document.fCreator.tClassList.value;
  var vClassArray = vClassList.split(/\n/);
  var vOptionArray = [];
  //var vClassHash = {};
  for (var i = 0; i < vClassArray.length; i++) {
    vClassArray[i] = reduceVarName(vClassArray[i]);
    if (vClassArray[i] != "") {
      checkClassJSON(vClassArray[i]);
      vOptionArray.push(vClassArray[i]);
      if (vJSON_JS["ClassList"][vClassArray[i]]) {
        console.log("Class '"+vClassArray[i]+"' exists for updateClasses()-Call");
      } else {
        createClassJS(vClassArray[i]);
      };
    };
  };
  var vOptions = createOptions(vOptionArray);
  write2value("sClassList",vOptions);
  write2value("tClassList",vOptionArray.join("\n"));
};

function clearForm4Class(pClassName) {
  //var vClassname = pClassName || getValueDOM("tClassname");
  for (var i = 0; i < vDOM_ID.length; i++) {
    write2value(vDOM_ID[i],"");
  };
  write2value("tClassname",pClassName);
};
function X_updateForm2Class(pClassName) {
  console.log("updateForm2Class('"+pClassName+"')-Call");
  updateForm2JSON(pClassName);
};

function updateForm2Class(pClassName) {
  var vClass = pClassName || getValueDOM("tClassname");
  console.log("updateForm2Class()-Call");
  for (var i = 0; i < vDOM_ID.length; i++) {
    write2value(vDOM_ID[i],"");
  };
  write2value("tClassname",pClassName);
};
