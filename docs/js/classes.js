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
      selectClass(vNewClassName);
    } else {
      var vClassTypeArr = getClassTypeArray(); //Defines Class,Abstract,Interface
      vClassArr.push(vNewClassName);
      write2value("tClassList", vClassTypeArr.join("\n"));
      updateClassSelector();
      updateClasses();
      updateJSON2Form(vNewClassName);
      vSuccess = true;
      //document.location.href = "#tabs-1";
      $( "#tabClass" ).trigger( "click" );
    }
  } else {
    console.log("Create new Classes cancelled!");
  };
  return vSuccess;
};

function renameClassForm() {
    var vOldClassName = vJSON_JS["SelectedClass"];
    var vNewClassName = getValueDOM("tClassname");
    console.log("Rename: Clas '"+vOldClassName+"' to '"+vNewClassName+"'");
    if (vOldClassName != vNewClassName) {
      //check if new ClassName exists
      if (!existsClassJS(vNewClassName)) {
        // rename Selected ClassName
        vJSON_JS["SelectedClass"] = vNewClassName;
        // rename Class
        var vClasses = vJSON_JS["ClassList"];
        vClasses[vNewClassName] = vJSON_JS["ClassList"][vOldClassName];
        delete vClasses[vOldClassName];
        // update Class Select
        //write2value("tClassList",vClassString);
        updateJSON2ClassString();
        createClassSelect();
        console.log("Rename ClassName from '"+vOldClassName+"' to '"+vNewClassName+"' was successful");
      } else {
        alert("WARNING: ClassName '"+vNewClassName+"' already exists, rename operation cancelled!")
      };
    } else {
      alert("WARNING: ClassName  '"+vNewClassName+"' unchanged!");
    }
}

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
    if (top.vJSON_JS["ClassType"]) {
      console.log("vJSON_JS['ClassType'] exists");
    } else {
      top.vJSON_JS["ClassType"] = {};
      console.log("vJSON_JS['ClassType'] created");
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
        var vClassType = "";
        if (vJSON_JS["ClassType"][pClass]) {
          vClassType = vJSON_JS["ClassType"][pClass];
        };
        console.log("Class '"+pClass+"' (Type: '"+vClassType+"') is a user-defined class.");
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
    vClassJSON["Page"] = {};
    vClassJSON["PageType"] = {};
    vClassJSON["tClassname"] = pClass;
    vClassJSON["tClassname"] = pClass;
    var vClassTypeHash = getClassTypeHash();
    vJSON_JS["ClassType"] = vClassTypeHash;
    var vClassType = vClassTypeHash[pClass] || "UndefClassType";
    vClassJSON["tEMail"] = getValueDOM("tEMail");
    vClassJSON["tAuthor"] = getValueDOM("tAuthor");
    // "myMethod(p1,p2)" stores the code in vClassJSON["MethodCode"]["myMethod"]
    // and stores the comment in vClassJSON["MethodComment"]["myMethod"]
    vClassJSON["AttribType"] = {};
    vClassJSON["AttribDefault"] = {};
    vClassJSON["AttribComment"] = {};
    vClassJSON["MethodParameter"] = {};
    vClassJSON["MethodReturn"] = {};
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
    vJSON_JS["ClassType"][pClass] = "";
  } else {
    console.log("checkClassList('"+pClass+"') created (1) ClassList in JSON Database");
    vJSON_JS["ClassList"] = {};
    console.log("checkClassList('"+pClass+"') created (2) Class in JSON Database");
    vJSON_JS["ClassList"][pClass] = {};
    vJSON_JS["ClassType"][pClass] = "";
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

function getMethodParameter(pMethodWithParams) {
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodParameter"][vMethodName] || "";
};

function getMethodReturn(pMethodWithParams) {
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodReturn"][vMethodName] || "";
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
function updateAttributeDefinition(pAttribName,pNewDefinition,pClass) {
  var vAttHash = getForm2AttribDefaultHash(pClass); //classes.js:484
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

function convertHash2String(pHash) {
  var vArr = convertHash2Array(pHash);
  return vArr.join("\n");
}


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
  var vClass = getValueDOM("tClassname");
  var vAttHash = getJSON2AttribDefaultHash(vClass);
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

function createNewAttribJS(pName) {
  // get name of Attributes
  var vName = pName || getValueDOM("tAttribName");
  if (reduceVarName(vName) == "") {
    alert("ERROR: Name of Attribute is undefined.\nPlease enter the Name of the Variable!");
    console.log("ERROR: Name Variable undefined - createNewAttribJS()");
  } else if (existsAttribForm(vName)) {
    alert("Attribute '"+vName+"' already exists!\nPlease change name of attribute!");
  } else {
    //var vType = getValueDOM("sAttribTypeList");
    var vType = getValueDOM("tAttribType");
    var vValue = getValueDOM("tAttribDefault");
    var vComment = getValueDOM("tAttribComment");
    if (!vType) {
      console.log("Select for '"+vName+"' Atttribute Type is undefined");
      vType = "Object";
    } else {
      console.log("Attribute '"+vName+"' has Type '"+vType+"'");
    };
    if (vValue && (vValue.replace(/[\s\t]/g,"") != "")) {
      console.log("Default Value of Atttribute '"+vName+"' is defined with value '"+vValue+"'");
    } else {
      vValue = "null";
      console.log("Default Value of Atttribute '"+vName+"' was NOT defined, set to '"+vValue+"'");
    };
    var vSuccess = createNewAttributeForm(vName,vType,vValue,vComment);
    //alert("");
    updateAttributesJS(); //jsondb.js:57 no code in function body
  }
};

function createNewMethodJS() {
  // get name of Attributes
  var vMethCall = getValueDOM("tMethodName");
  var vName = getName4Method(vMethCall);
  if (existsMethodForm(vName)) {
    alert("Method '"+vName+"' already exists!\nPlease change name of method!");
    //var vMethHash = getMethodHash();
    //vMethHash[vName] = vMethCall;
  } else {
    //var vType = getValueDOM("sAttribTypeList");
    vClassJSON["MethodParameter"][vName] = getMethodParameter4Call(vMethCall);
    vClassJSON["MethodReturn"][vName] = getMethodReturn4Call(vMethCall);
    vClassJSON["MethodCode"][vName] = "";
    vClassJSON["MethodComment"][vName] = "";
    var vMethodList = getValueDOM("tMethods");
    vMethodList = removeEmptyLines(vMethodList);
    var vCR = "\n";
    if (reduceVarName(vMethodList) == "") {
      vCR = "";
    };
    vMethodList += vCR + vMethCall;
    write2value("tMethods",vMethodList);
    createMethodSelect(); //dom.js:13
    updateMethodsJS();
  }
};

function getMethodParameter4Call(pMethCall) {
  var vParam = "";
  var vErrorCount = 0;
  if (pMethCall) {
    var vOpenBracketPos = pMethCall.indexOf("(");
     if (vOpenBracketPos > 0) {
       var vCloseBracketPos = pMethCall.lastIndexOf(")");
       if (vCloseBracketPos > 0) {
         if (vOpenBracketPos < vCloseBracketPos) {
           console.log("check '"+pMethCall+"' is well defined!");
           vParam = pMethCall.substring(vOpenBracketPos+1,vCloseBracketPos);
         } else {
           console.log("Closing Bracket before opening Bracket in '"+pMethCall+"'");
         };
       } else {
         vErrorCount++;
         console.log("ERROR: Method definition error!\n No closing bracket!\n"+pMethCall);
       };
     } else {
       vErrorCount++;
       console.log("ERROR: Method definition error!\n No opening bracket!\n"+pMethCall);
     }
  } else {
    console.log("ERROR: pMethCall in getMethodParameter4Call(pMethCall) undefined!");
  }
  return vParam;
}

function getMethodReturn4Call(pMethCall) {
  console.log("getMethodReturn4Call('"+pMethCall+"')");
  var vReturn = "";
  var vErrorCount = 0;
  if (pMethCall) {
    var vOpenBracketPos = pMethCall.indexOf("(");
     if (vOpenBracketPos > 0) {
       var vCloseBracketPos = pMethCall.lastIndexOf(")");
       if (vCloseBracketPos > 0) {
         if (vOpenBracketPos < vCloseBracketPos) {
           console.log("Parameter well defined for '"+pMethCall+"'");
           vReturn = pMethCall.substring(vCloseBracketPos+1,pMethCall.length);
           if (vReturn.indexOf(":")>=0) {
             vReturn = vReturn.substring(vReturn.indexOf(":")+1,vReturn.length)
           };
           vReturn = vReturn.replace(/\s/g,"");
           console.log("Return Class: '"+vReturn+"'");
         } else {
           console.log("Closing Bracket before opening Bracket in '"+pMethCall+"'");
         };
       } else {
         vErrorCount++;
         console.log("ERROR: Method definition error!\n No closing bracket!\n"+pMethCall);
       };
     } else {
       vErrorCount++;
       console.log("ERROR: Method definition error!\n No opening bracket!\n"+pMethCall);
     }
  } else {
    console.log("ERROR: pMethCall in getMethodReturn4Call(pMethCall) undefined!");
  }
  return vReturn;
}


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
    console.log("createNewAttributeForm('"+pName+"','"+pType+"',"+pValue+",'"+pComment+"')");
    var vAttrDef = pName + " = " + pValue;
    var vAttributes = document.fCreator.tAttributes;
    //var vAttribs = reduceVarName(vAttributes.value);
    var vAttribs = reduceVarName(vAttributes.value);
    getValueDOM("tAttributes");
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
  var vClass = getValueDOM("tClassname");
  var vAttribHash = getForm2AttribDefaultHash(vClass); //classes.js:484
  var vRet = false;
  if (vAttribHash[pName]) {
    vRet = true
  };
  return vRet;
}

function existsMethodForm(pName) {
  console.log("existsMethodForm('"+pName+"')");
  var vMethHash = getMethodHash();
  var vRet = false;
  if (vMethHash[pName]) {
    vRet = true
  };
  return vRet;
}

function getAttribNameArray() {
  console.log("Call: getAttribNameArray() parse Attributes from Form");
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
      vAttribArray[i] = reduceVarName(vLine.substr(0,vFound));
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
    };
  };
  return vTypeHash;
};

function getAttribCommentHash(pAttHash) {
  var vHash = {};
  for (var iName in pAttHash) {
    if (pAttHash.hasOwnProperty(iName)) {
      vHash[iName] = "";
      vHash[iName] = getComment4Attrib(iName,pAttHash[iName]);
    };
  };
  return vHash;
};

function updateAttribType4Form() {
  var vDefault = getValueDOM("tAttribDefault");
  var vType = determineAttType(vDefault);
  write2value("tAttribType",vType);
}

function updateAttribTypeComment4Form() {
  var vName = getValueDOM("tAttribName");
  var vDefault = getValueDOM("tAttribDefault");
  if (existsAttribForm(vName)) {
    console.log("updateAttribTypeComment4Form() - Variable exisits - no update of Attritbute Type and Comment");
  } else {
    var vComment = getComment4Attrib(vName,vDefault);
    var vType = determineAttType(vDefault);
    write2value("tAttribType",vType);
    write2value("tAttribComment",vComment);
  }
}

function getComment4Attrib(pName,pValue) {
  return "Comment '" +pName + "' Type: "+ determineAttType(pValue)+" ";
}

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
      vType = reduceVarName(vValue.substr(0,vPos));
    };
  } else if (vValue.match(/^[0-9]+$/)) {
     vType = "Integer";
   } else if (vValue.match(/^[0-9]+\.?[0-9]*$/)) {
      vType = "Float";
   };
  return vType;
}

function getJSON2AttribDefaultHash(pClassName) {
    var vHash = null;
    if (vJSON_JS["ClassList"]) {
      if (vJSON_JS["ClassList"][pClassName]) {
        vHash = vJSON_JS["ClassList"][pClassName]["AttribDefault"];
      } else {
        console.log("getJSON2AttribDefaultHash() - vJSON_JS['ClassList']['"+pClassName+"'] does not exist!");
      }
    } else {
      console.log("getJSON2AttribDefaultHash() - vJSON_JS['ClassList'] does not exist!");
    };
    return vHash;
};

function getForm2AttribDefaultHash(pClassName) {
  var vClassName = pClassName || getValueDOM("tClassname");
  var vClassNameForm = getValueDOM("tClassname");
  var vAttributes = getValueDOM("tAttributes");
  var vHash = {};
  if (vClassName && (vClassName == vClassNameForm)) {
    vHash = getAttribDefaultHash(vAttributes);
  } else {
    console.log("ERROR: vClassName='"+vClassName+"' differs form current classname '"+vClassNameForm+"'");
  };
  return vHash;
}

function getAttribDefaultHash(pAttributes) {
  // pAttributes is an optional String for creating the Hash from
  console.log("getAttribDefaultHash(pAttributes) pAttributes='"+pAttributes+"'");
  var vAttrib = pAttributes || getValueDOM("tAttributes");
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
      vVar = reduceVarName(vLine.substr(0,vFound+1))
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
  var vMethods = getValueDOM("tMethods");
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

function getMethodHash() {
  var vMethods = getValueDOM("tMethods");
  vMethods = removeEmptyLines(vMethods);
  var vMethodArray    = vMethods.split(/\n/);
  var vLine = "";
  var vName = "";
  var vRetHash = {};
  for (var i = 0; i < vMethodArray.length; i++) {
      vName = getName4Method(vMethodArray[i]);
      if (vName != "") {
        vRetHash[vName] = vMethodArray[i];
        //console.log("getMethodHash() "+vName+" = " + vMethodArray[i]);
      };
  };
  return vRetHash;
};

function getMethodNameArray() {
  var vMethods = getValueDOM("tMethods");
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
  var vMethods = getValueDOM("tMethods");
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

function getClassTypeJSON(pClass) {
  var vClassType = "";
  if (vJSON_JS["ClassType"] && vJSON_JS["ClassType"][pClass]) {
    vClassType = vJSON_JS["ClassType"][pClass];
  };
  return vClassType;
}

function getMethodParamHash() {
  var vMethods = getValueDOM("tMethods");
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
      vID = reduceVarName(vID);
      vValue =  vLine.substr(vPos,vLine.length);
      vRetHash[vID] = vValue;
    };
  };
  return vRetHash;
};

function updateJSON2ClassString() {
  var vClassString = getJSON2ClassString();
  vClassString = sortStringLines(vClassString);
  write2value("tClassList",vClassString);
};

function getJSON2ClassString() {
  var vClassList = vJSON_JS["ClassList"];
  var vClassString = "";
  var vCR = "";
  for (var iClassName in vClassList) {
    if (vClassList[iClassName]) {
      if (reduceVarName(iClassName) != "") {
        vClassString += vCR + iClassName;
        var vClassType = vJSON_JS["ClassType"][iClassName];
        // set Selector Variable for the ClassType
        vClassList[iClassName]["sClassType"] = vClassType;
        if (vClassType && vClassType != "") {
          vClassString += " = "+ vClassType;
        };
        console.log("getJSON2ClassString() - iClassName='"+iClassName+" = "+vClassType+"'");
        vCR = "\n";
      } else {
        console.log("getJSON2ClassString() - iClassName='"+iClassName+"' empty after reduceVarName()-Call!");
      }
    } else {
      console.log("getJSON2ClassString() - iClassName='"+iClassName+"' undefined!");
    }
  };
  return vClassString;
}

function getClassArray() {
  var vClassString = getValueDOM("tClassList");
  return getString2ClassArray(vClassString);
};

function getClassTypeArray() {
  var vClassString = getValueDOM("tClassList");
  vClasses = removeEmptyLines(vClasses);
  return vClasses.split(/\n/);
}


function getClassTypeHash() {
  var vClassString = getValueDOM("tClassList");
  return getString2ClassHash(vClassString);
}


function getAllClassesArray() {
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
  var vClassDef = "";
  var vFound = 0;
  for (var i = 0; i < vClassArray.length; i++) {
    vClassDef = vClassArray[i];
    vFound = vClassDef.indexOf("=");
    if (vFound >= 0) {
      vClassArray[i] = vClassDef.substr(0,vFound);
    };
  };
	return vClassArray;
};

function getString2ClassHash(pString) {
  var vClasses    	  = pString;
  vClasses = removeEmptyLines(vClasses);
  var vClassArray    = vClasses.split(/\n/);
  var vClassHash = {};
  var vClassDef = "";
  var vClassName = "";
  var vFound = 0;
  for (var i = 0; i < vClassArray.length; i++) {
    vClassDef = vClassArray[i];
    vFound = vClassDef.indexOf("=");
    if (vFound >= 0) {
      vClassName = reduceVarName(vClassDef.substr(0,vFound));
      vClassHash[vClassName] = reduceVarName(vClassDef.substr(vFound+1,vClassDef.length));
    } else {
      vClassName = vClassArray[i];
      vClassHash[vClassName] = "";
    };
  };
	return vClassHash;
}

function removeEmptyLines(pString) {
  //remove Empty Lines with CR at end
  pString = pString.replace(/^[\s\t]*[\r\n]/gm,"");
  //remove Empty Lines with CR at beginning
  pString = pString.replace(/\n[\s\t]*$/gm,"");
  // if remaining string is an empty line replace with ""
  pString = pString.replace(/^[\s\t]*$/gm,"");
  return pString
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
  var vClassList = getValueDOM("tBasicClassList");
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
  var vClassList = getValueDOM("tBasicClassList");
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
  var vClassList = getValueDOM("tClassList");
  // document.fCreator.tClassList.value;
  var vClassArray = vClassList.split(/\n/);
  var vOptionArray = [];
  var vClassHashJSON = null;
  for (var i = 0; i < vClassArray.length; i++) {
    vClassArray[i] = reduceVarName(vClassArray[i]);
    vClassHashJSON = vJSON_JS["ClassList"][vClassArray[i]];
    if (vClassArray[i] != "") {
      checkClassJSON(vClassHashJSON);
      vOptionArray.push(vClassArray[i]);
      if (vClassHashJSON) {
        console.log("Class '"+vClassArray[i]+"' exists for updateClasses()-Call");
      } else {
        createClassJS(vClassArray[i]);
      };
    };
  };
  var vOptions = createOptions4Array(vOptionArray);
  write2value("sClassList",vOptions);
  //write2value("tClassList",vOptionArray.join("\n"));
  updateClassSelector();
};

function clearForm4Class(pClassName) {
  var vClassName = pClassName || ""; //getValueDOM("tClassname");
  for (var i = 0; i < vDOM_ID.length; i++) {
    write2value(vDOM_ID[i],"");
  };
  write2value("tClassname",vClassName);
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
