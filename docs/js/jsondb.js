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
  console.log("saveClassJSON()-Call");
  var vClass 	= getValueDOM("tClassname");
  for (var i = 0; i < vDOM_ID.length; i++) {
    vJSON_JS[vClass][vDOM_ID[i]] = getValueDOM(vDOM_ID[i]);
  };
  saveLocalDB("vJSON_JS",vJSON_JS);
};

function updateFormPages2JSON() {
  vJSON_JS["PageList"] = getPageListHash();
  createPageSelect();
};

function updateFormPageTypes2JSON() {
  vJSON_JS["PageType"] = getPageTypeHash();
  createPageTypeSelect();
};

function updateFormID2JSON(pID) {
  var vClass 	= getValueDOM("tClassname");
  console.log("updateFormID2JSON('"+pID+"')-Call with Classname: '"+vClass+"'");
  vJSON_JS["ClassList"][vClass][pID] = getValueDOM(pID);
}

function  updateAttributesJS() {
  //vClassJSON["tAttributes"] = getAttribDefaultHash();
  console.log("updateAttributesJS()-Call called after adding a new Attribute");
  var vClassJS = getSelectedClassJSON();
  var vAttName = vClassJS["sAttribList"] || "";
  //write2value("sAttribList",vAttName);
  //selectJSAttribs();
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
  var vMethodNameArr   = getMethodNameArray();
  var vMethodHash      = getMethodHash();
  var vMethodNameArray = getMethodNameArray();
  var vMethodArray     = getMethodArray();
  vMethodArray = checkJSMethods(vMethodArray);
  // load tMethods definitions and create the options of the SELECT Box
  console.log("Update JS Methods");
  var vOptions = createOptions4Array(vMethodNameArr);
  var vMethodCall = getValueDOM("tMethodName");
  var vMethodName = getMethodName(vMethodCall);
  if (vMethodName != "") {
    if (vMethodHash[vMethodName]) {
      loadMethodJSON(vMethodName);
    } else {
      loadMethodJSON(vMethodNameArray[0]);
      console.log("updateJSMethods()-Call  '"+vMethodName+"' undefined in MethodArray");
    }
  };
  // id="sMethodList" of Select Box
  write2innerHTML("sMethodList",vOptions);
};

function loadAttribJSON (pAttribName) {
  var vAttribName = getValueDOM("tAttribName");
  vAttribName = pAttribName || vAttribName;
  write2value("tAttribName",vAttribName);
  vAttribName = getAttribName(vAttribName); //without Parameters
  if (vAttribName != "") {
    console.log("loadAttribJSON() Call - Attribute '"+vAttribName+"' defined");
    write2value("sAttribTypeList", vClassJSON["AttribType"][vAttribName] || "");
    write2value("tAttribDefault",  vClassJSON["AttribDefault"][vAttribName] || "");
    write2value("tAttribComment",  vClassJSON["AttribComment"][vAttribName] || "");
  } else {
    alert("loadAttribJSON() Call - Attrib Name undefined");
    console.log("loadAttribJSON() Call - Attrib Name undefined");
  };
};

function save3LevelID2JSON(pListID,pHashID,pID,pValue) {
    console.log("save3LevelID2JSON('"+pListID+"','"+pHashID+"','"+pID+"',pValue)");
    if (vJSON_JS[pListID]) {
      if (vJSON_JS[pListID][pHashID]) {
        if (vJSON_JS[pListID][pHashID][pID]) {
            vJSON_JS[pListID][pHashID][pID] = pValue;
        } else {
          console.log("vJSON_JS['"+pListID+"']['"+pHashID+"']['"+pID+"'] was undefined!");
        };
      } else {
        console.log("vJSON_JS['"+pListID+"']['"+pHashID+"'] was undefined!");
      };
    } else {
      console.log("vJSON_JS['"+pListID+"'] was undefined!");
    };
};

function save2LevelID2JSON(pListID,pID,pValue) {
    console.log("save2LevelID2JSON('"+pListID+"','"+pID+"',pValue)");
    if (vJSON_JS[pListID]) {
      if (vJSON_JS[pListID][pID]) {
        vJSON_JS[pListID][pID] = pValue;
      } else {
        console.log("vJSON_JS['"+pListID+"']['"+pID+"'] was undefined!");
      };
    } else {
      console.log("vJSON_JS['"+pListID+"'] was undefined!");
    };
};


function saveAttribEdit() {
  vClassJSON = getSelectedClassJSON();
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
  createAttribSelect(vOut);
}

function saveAttribJSON(pAttName,pAttType,pAttDefault,pAttComment) {
  vClassJSON = getSelectedClassJSON();
  var vAttribName     = pAttName    || getValueDOM("tAttribName")    || "";
  var vAttribType     = pAttType    || getValueDOM("tAttribType")    || "";
  var vAttribDefault  = pAttDefault || getValueDOM("tAttribDefault") || "";
  var vAttribComment  = pAttComment || getValueDOM("tAttribComment") || "";
  if (vAttribName != "") {
    checkClassJSON(vClassJSON);
    vClassJSON["AttribType"][vAttribName]    = vAttribType;
    vClassJSON["AttribDefault"][vAttribName] = vAttribDefault;
    vClassJSON["AttribComment"][vAttribName] = vAttribComment;
  } else {
    console.log("saveAttribJSON() Call - Attrib Name undefined");
  };
};

function updateJSON2selectAttrib(pClass) {
  console.log("updateJSON2selectAttrib('"+pClass+"')");
  var vClassHash = vJSON_JS["ClassList"][pClass];
  if (vClassHash) {
    var vAttHash = vClassHash["Att"]
  }
}

function loadMethodJSON (pMethodName) {
  var vMethodName = getValueDOM("tMethodName");
  vMethodName = pMethodName || vMethodName;
  var vMethodHash = getMethodHash();
  var vMethodCall = vMethodHash[vMethodName] || pMethodName + "(???)";
  write2value("tMethodName",vMethodCall);
  write2innerHTML("titleMethodName",vMethodCall);
  vMethodName = getMethodName(vMethodName); //without Parameters
  if (vMethodName != "") {
    console.log("loadMethodJSON() Call - Method Code '"+vMethodName+"' defined");
    write2editor("MethodCode",vClassJSON["MethodCode"][vMethodName] || "");
    write2value("tMethodComment",vClassJSON["MethodComment"][vMethodName] || "");
  } else {
    alert("loadMethodJSON() Call - Method Name undefined");
    console.log("loadMethodJSON() Call - Method Name undefined");
  };
};


function saveMethodCallJS(pClass) {
  var vMethodCall = getValueDOM("tMethodName");
  var vMethodName = getMethodName(vMethodCall);
  var vMethodHash = getMethodHash();
  var vMethodCode    = getEditorValue("iMethodCode");
  var vMethodComment = getValueDOM("tMethodComment");
  if (vMethodName != "") {
    if (vMethodHash[vMethodName]) {
      vMethodHash[vMethodName] = vMethodCall;
      write2JSON("tMethods",convertHash2String(vMethodHash));
      vClassJSON = getClassJSON();
      vClassJSON["MethodCode"][vMethodName] = vMethodCode;
      vClassJSON["MethodComment"][vMethodName] = vMethodComment;
      vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodCall);
      vClassJSON["MethodReturn"][vMethodName] = getMethodReturn4Call(vMethodCall);
      updateJSMethods();
    } else {
      console.log("saveMethodCallJS()-Call  '"+vMethodName+"' undefined in MethodArray, create New Method");
      createNewMethodJS();
    }
  };
}

function write2JSON(pID,pValue) {
  console.log("write2JSON('"+pID+"',pValue)-Call");
  vClassJSON = getClassJSON();
  vClassJSON[pID] = pValue;
  write2value(pID,pValue);
}

function saveMethodJSON(pMethodName) {
  vClassJSON = getSelectedClassJSON();
  var vMethodCall = getValueDOM("tMethodName");
  vMethodName = pMethodName || vMethodCall;
  vMethodName = getMethodName(vMethodName);
  var vMethodCode     = getValueDOM("tMethodCode");
  var vMethodComment  = getValueDOM("tMethodComment");
  if (vMethodName != "") {
    checkClassJSON(vClassJSON);
    vClassJSON["MethodCode"][vMethodName] = vMethodCode;
    vClassJSON["MethodComment"][vMethodName] = vMethodComment;
    vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodCall);
    vClassJSON["MethodReturn"][vMethodName] = getMethodReturn4Call(vMethodCall);
  } else {
    console.log("saveMethodJSON() Call - Method Name undefined");
  };
};

function checkClassJSON(pClassJSON) {
  var vClass = pClassJSON || vClassJSON; // Global Variable
  // The function check if all variables in the Class are defined
  if (vClass) {
    console.log("Check Properties of Class");
    for (var i = 0; i < vDOM_ID.length; i++) {
      var vID = vDOM_ID[i];
      if (vClass.hasOwnProperty(vID)) {
        //console.log("checkClassJSON() - Class['"+vID+"'] defined");
      } else {
        console.log("WARNING: checkClassJSON() - Class['"+vID+"'] undefined");
        //eval()
      }
    }
  } else {
    console.log("ERROR: checkClassJSON(pClassJSON) - pClassJSON is undefined");
  }
}

function updateForm2MethodComment() {
  console.log("updateForm2MethodComment()-Call");
  var vMethodCall = getValueDOM("tMethodName");
  var vMethodName = getMethodName(vMethodCall);
  vClassJSON["MethodComment"][vMethodName] = vMethodComment;
};

function updateForm2MethodNameParam() {
  console.log("updateForm2MethodNameParam()-Call");
  var vMethodCall = getValueDOM("tMethodName");
  var vMethodName = getMethodName(vMethodCall);
  vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodCall);
  vClassJSON["MethodReturn"][vMethodName] = getMethodReturn4Call(vMethodCall);
};

function updateJSON2Form(pClass) {
  var vClass = pClass || getSelectedClass();
  var vContent = "";
  console.log("updateJSON2Form('"+vClass+"')");
  // Set Selected with vClassJSON
  vClassJSON = vJSON_JS["ClassList"][vClass];
  // updates form content in DOM with Class content
  for (var i = 0; i < vDOM_ID.length; i++) {
    //vContent = vClassJSON[vDOM_ID[i]] || "";
    vContent = vClassJSON[vDOM_ID[i]];
    write2value(vDOM_ID[i],vContent);
  };
  // load the defined Attribute from Form
  updateJSON2FormVariable(vClass,"tAttributes");
  updateJSON2FormVariable(vClass,"tMethods");
  // updateForm2MissingJSON(pClass);
};

function updateJSON2FormVariable(pClass,pVarname) {
  console.log("updateJSON2FormVariable('"+pClass+"','"+pVarname+"')");
  var vOut = getString4JSONVariable(pClass,pVarname) || "";
  switch (pVarname) {
    case "tAttributes":
      write2value(pVarname,vOut);
    break;
    case "tMethods":
      write2value(pVarname,vOut);
    break;
    default:
     console.log("WARNING: updateJSON2FormVariable(pVarname) -  for pVarname no case in switch");
  }
};

function getString4JSONVariable(pClass,pVarname) {
  console.log("getString4JSONVariable('"+pClass+"','"+pVarname+"')");
  var vOut = "";
  var vCR = "";
  if (pVarname) {
    switch (pVarname) {
      case "tAttributes":
        var vHash = vJSON_JS["ClassList"][pClass]["AttribDefault"];
        console.log("switch 'tAttributes'");
        for (var iID in vHash) {
          if (vHash.hasOwnProperty(iID)) {
            vOut += vCR+ iID + " = "+(vHash[iID]).replace(/^\s/g,"");
            vCR = "\n";
          };
        };
      break;
      case "tMethods":
        var vHash = vJSON_JS["ClassList"][pClass]["MethodParameter"];
        console.log("switch 'tMethods'");
        var vRetHash = vJSON_JS["ClassList"][pClass]["MethodReturn"];
        for (var iID in vHash) {
          if (vHash.hasOwnProperty(iID)) {
            vOut += vCR+ iID + "("+vHash[iID]+")";
            vCR = "\n";
          };
          //Append Return Class if defined
          if (vRetHash.hasOwnProperty(iID)) {
            if (vRetHash[iID] != "") {
              vOut += ":"+vRetHash[iID];
            };
          };
        };
      break;
      default:
       console.log("WARNING: getString4JSONVariable('"+pClass+"','"+pVarname+"') -  for pVarname no case in switch");
    }
  } else {
      console.log("ERROR: getString4JSONVariable('"+pClass+"',pVarname) - pVarname undefined");
  };
  return vOut;
};

function updateForm2MissingJSON(pClass) {
  var vAttHash = getForm2AttribDefaultHash(pClass); //classes.js:484
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
}



function updateForm2AttribJSON(pClass) {
  var vClass = pClass || getSelectedClass();
  vClassJSON = getSelectedClassJSON();
  var vAttributes = getValueDOM("tAttributes");
  console.log("updateForm2AttribJSON('"+vClass+"') with Attributes="+vAttributes);
  var vAttHash = getForm2AttribDefaultHash(vClass); //classes.js:484
  vClassJSON["AttribDefault"] = vAttHash;
  var vAttTypeHash = getAttribTypeHash(vAttHash); // classes.js:336
  // Define Hash in Attribute Hash if undefined
  defineHashIfUndefined(vAttTypeHash,"AttribType");
  defineHashIfEmpty(vAttTypeHash,"AttribType");
  var vAttCommentHash = getAttribCommentHash(vAttHash); // classes.js:356
  defineHashIfUndefined(vAttCommentHash,"AttribComment");
  createAttribSelect();
};

function updateForm2MethodJSON(pClass) {
  console.log("updateForm2MethodJSON('"+pClass+"')");
  var vClass = pClass || getSelectedClass();
  var vMethArr = getMethodNameArray(); //classes.js:275
  var vMethCallArr = getMethodArray(); //classes.js:598
  var vParam = "";
  var vCall = "";
  var vMethName = "";
  var vMethHash = {};
  var vMethReturn = {};
  //-------- Init Hash with the Default Values--------
  for (var i = 0; i < vMethArr.length; i++) {
    vMethHash[vMethArr[i]] = "";
  };
  //------ Init undefined Method PARAMTER--------------
  for (var vCall in vMethCallArr) {
    if (vMethCallArr.hasOwnProperty(vCall)) {
      vCall = vMethCallArr[vCall];
      vMethName = getMethodName(vCall);
      vMethHash[vMethName] = getMethodParameter4Call(vCall);
      vMethReturn[vMethName] = getMethodReturn4Call(vCall);
    };
  };
  defineHashIfUndefined(vMethHash,"MethodParameter");
  //------ Init undefined Method CODE----------
  var vReturn = "";
  var vCode = "";
  var vClassDef = "";
  for (var i = 0; i < vMethArr.length; i++) {
    //vMethHash[vMethArr[i]] = "";
    vCode = "// Code for " + vMethArr[i];
    vReturn = vMethReturn[vMethArr[i]];
    if (vReturn != "") {
      vReturn = vReturn.replace(/\s/g,"");
      if (isBasicClass(vReturn)) {
        var vBasicClassHash = getBasicClassHash();
        vClassDef = vBasicClassHash[vReturn];
      } else {
        vClassDef = "new "+vReturn+"()"
      };
      vCode =  "var vRet"+vReturn +" = "+vClassDef+";\n" +vCode+"\n";
      vCode += "return vRet"+vReturn+";";
    };
    vMethHash[vMethArr[i]] = vCode;
  };
  defineHashIfUndefined(vMethHash,"MethodCode");
  //------ Init undefined Method COMMENTS----------
  for (var i = 0; i < vMethArr.length; i++) {
    vMethHash[vMethArr[i]] = "Comment for " + vMethArr[i];
  };
  defineHashIfUndefined(vMethHash,"MethodComment");
  //------ Init undefined Method RETURN----------
  defineHashIfUndefined(vMethReturn,"MethodReturn");
  //---------------------------------------------
};

function updateForm2JSON(pClass) {
  var vAttributes = getValueDOM("tAttributes");
  console.log("updateForm2JSON('"+pClass+"') with Attributes="+vAttributes);
  var vClass = pClass || getSelectedClass();
  // updates the Class content with form content in DOM
  createClassJS(vClass);
  vClassJSON = vJSON_JS["ClassList"][pClass];
  for (var i = 0; i < vDOM_ID.length; i++) {
    vClassJSON[vDOM_ID[i]] = getValueDOM(vDOM_ID[i]);
  };
  // load the defined Attribute and Methodsfrom Form
  updateForm2AttribJSON(pClass);
  updateForm2MethodJSON(pClass);
};

function defineHashIfUndefined(pHash,pHashListID) {
  vClassJSON = getClassJSON();
  for (var iAttName in pHash) {
    if (vClassJSON[pHashListID][iAttName]) {
        //vClassJSON[pHashListID][iAttName];
        console.log(pHashListID+"['"+iAttName+"'] defined");
    } else {
      console.log(pHashListID+"['"+iAttName+"'] undefined set to '"+pHash[iAttName]+"'");
      vClassJSON[pHashListID][iAttName] = pHash[iAttName];
    };
  };
};

function defineHashIfEmpty(pHash,pHashListID) {
  vClassJSON = getClassJSON();
  defineHashIfUndefined(pHash,pHashListID);
  for (var iAttName in pHash) {
    if (vClassJSON[pHashListID][iAttName] != "") {
        //vClassJSON[pHashListID][iAttName];
        console.log(pHashListID+"['"+iAttName+"'] defined");
    } else {
      console.log(pHashListID+"['"+iAttName+"']='' - Set to '"+pHash[iAttName]+"'");
      vClassJSON[pHashListID][iAttName] = pHash[iAttName];
    };
  };
};
