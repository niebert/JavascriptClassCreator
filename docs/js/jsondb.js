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


function stringifyJSON(pJSONDB) {
  var vJSON = "";
  if (pJSONDB) {
    vJSON = JSON.stringify(pJSONDB);
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

function updateFormPageTypes2JSON() {
  vJSON_JS["PageType"] = getPageTypeHash();
  createPageTypeSelect();
};

function updateFormID2JSON(pID) {
  var vClass 	= getValueDOM("tClassname");
  console.log("updateFormID2JSON('"+pID+"')-Call with Classname: '"+vClass+"'");
  vJSON_JS["ClassList"][vClass][pID] = getValueDOM(pID);
};

function getSelectedFilenameHTML() {
  var vFile 	= vJSON_JS["SelectedFile"] || getValueDOM("tFilename") || "";
  if (vFile == "") {
    vFile = "app.html";
  };
  return vFile;
}

function updateFormFileID2JSON(pID) {
  var vFile 	= getSelectedFilenameHTML();
  checkFileHTML(vFile);
  console.log("updateFormFileID2JSON('"+pID+"')-Call with Filename: '"+vFile+"'");
  vJSON_JS["FileList"][vFile][pID] = getValueDOM(pID);
};

function checkFileHTML(pFile) {
  if (vJSON_JS["FileList"]) {
    console.log("FileList exists");
  } else {
    vJSON_JS["FileList"] = {};
    console.log("create vJSON_JS['FileList']");
  };
  if (vJSON_JS["FileList"][pFile]) {
    console.log("FileList['"+pFile+"'] exists");
  } else {
    vJSON_JS["FileList"][pFile] = {}
  };
  var vID = "";
  for (var i = 0; i < vDOM_File.length; i++) {
    vID = vDOM_File[i];
    if (vJSON_JS["FileList"][pFile][vID]) {
      console.log("FileList['"+pFile+"']['"+vID+"'] exists");
    } else {
      console.log("FileList['"+pFile+"']['"+vID+"'] created");
      vJSON_JS["FileList"][pFile][vID] = getValueDOM(vID);
    };
  };
  if (vJSON_JS["FileList"][pFile]["elements"]) {
    console.log("FileList['"+pFile+"']['elements'] exists");
  } else {
    console.log("FileList['"+pFile+"']['elements'] created");
    vJSON_JS["FileList"][pFile]["elements"] = getElementsHash4Form({},pFile);
  };
  var vElemHash = vJSON_JS["FileList"][pFile]["elements"];
  var vElemArrID = getArray4HashID(vElemHash,pFile);
  if (vJSON_JS["FileList"][pFile]["tElementID"]) {
    console.log("FileList['"+pFile+"']['tElementID'] exists");
    if (vJSON_JS["FileList"][pFile]["tElementID"] == "") {
      if (vElemArrID.length > 0) {
        vJSON_JS["FileList"][pFile]["tElementID"] = vElemArrID[0];
        vJSON_JS["FileList"][pFile]["sElementList"] = vElemArrID[0];
      };
    };
  } else {
    console.log("FileList['"+pFile+"']['tElementID'] undefined");
  }
};

function getElementsHash4Form(pHash,pFile) {
  var vIDString = getValueDOM("tElementIDs");
  var vFile = pFile || "";
  vIDString = vIDString.replace(/\s/g,"");
  var vArrID = vIDString.split("|");
  var vHash = pHash || {};
  var vOutHash = {}
  for (var i = 0; i < vArrID.length; i++) {
    if (vHash.hasOwnProperty(vArrID[i])) {
      console.log("ID ["+vArrID[i]+"] exists "+vFile);
      vOutHash[vArrID[i]] = vHash[vArrID[i]];
    } else {
      vOutHash[vArrID[i]] = getDefaultElementString(vFile,vArrID[i]);
    };
  };
  return vOutHash;
};

function  updateAttributesJS() {
  //vClassJSON["tAttributes"] = getAttribDefaultHash();
  console.log("updateAttributesJS()-Call called after adding a new Attribute");
  var vClassJS = getClassJSON;
  var vAttName = vClassJS["sAttribList"] || "";
  write2value("sAttribList",vAttName);
  selectJSAttribs();
};
function  updateMethodsJS() {
  //vClassJSON["Methods"] = getAttribDefaultHash();
  console.log("updateMethodsJS()-Call undefined");
};

function updateJSLibraries() {
  console.log("updateJSLibraries");
};

function updateHTMLFiles() {
  console.log("updateHTMLFiles() - update File Selector of HTML Files and JSON Files");
  createFileSelect(); // dom.js:123

}

function updateJSAttribs() {
  updateForm2AttribJSON();
  createAttribTypeSelect();
  createAttribSelect();
};

function updateJSMethods() {
  console.log("updateJSMethods()");
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
  var vClassJSON = getClassJSON();
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

function deleteClassForm() {
  console.log("deleteAttributeForm()");
  var vClassJS = getClassJSON;
  var vMethodName = getValueDOM("sClassList");
  var vOK = confirm("Do you want to delete Method "+vMethodName+"()?");
  if(vOK == true) {
    var vArrID = ["MethodParameter","MethodReturn","MethodCode","MethodComment"];
    for (var iID in vArrID) {
      if (vArrID.hasOwnProperty(iID)) {
        delete vClassJS[iID][vMethodName];
      }
    };
    updateJSON2Form();
  };
};


function deleteAttributeForm() {
  console.log("deleteAttributeForm()");
  vClassJSON = getClassJSON;
  var vMethodName = getValueDOM("sAttribList");
  var vOK = confirm("Do you want to delete Method "+vMethodName+"()?");
  if(vOK == true) {
    var vArrID = ["MethodParameter","MethodReturn","MethodCode","MethodComment"];
    for (var iID in vArrID) {
      if (vArrID.hasOwnProperty(iID)) {
        delete vClassJS[iID][vMethodName];
      }
    };
    updateJSON2Form();
  };
};


function saveAttributeForm() {
  console.log("saveAttributeForm()");
  var vClassJSON = getClassJSON;
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
  var vClassJSON = getClassJSON;
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
  var vClassJSON = getClassJSON();
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

function deleteMethodForm() {
  console.log("deleteAttributeForm()");
  var vClassJS = getClassJSON;
  var vMethodName = getValueDOM("sMethodList");
  var vOK = confirm("Do you want to delete Method "+vMethodName+"()?");
  if(vOK == true) {
    var vArrID = ["MethodParameter","MethodReturn","MethodCode","MethodComment"];
    for (var iID in vArrID) {
      if (vArrID.hasOwnProperty(iID)) {
        delete vClassJS[iID][vMethodName];
      }
    };
    updateJSON2Form();
  };
}


function saveMethodCallJS(pClass) {
  var vClassJSON = getClassJSON(pClass);
  var vMethodCall = getValueDOM("tMethodName");
  var vMethodName = getMethodName(vMethodCall);
  var vMethodHash = getMethodHash();
  var vMethodCode    = getEditorValue("iMethodCode");
  var vMethodComment = getValueDOM("tMethodComment");
  if (vMethodName != "") {
    if (vMethodHash[vMethodName]) {
      vMethodHash[vMethodName] = vMethodCall;
      write2JSON("tMethods",convertHash2String(vMethodHash));
      //vClassJSON = getClassJSON();
      vClassJSON["MethodCode"][vMethodName] = vMethodCode;
      vClassJSON["MethodComment"][vMethodName] = vMethodComment;
      vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodCall);
      vClassJSON["MethodReturn"][vMethodName] = getMethodReturn4Call(vMethodCall);
      updateJSMethods();
    } else {
      console.log("saveMethodCallJS()-Call  '"+vMethodName+"' undefined in MethodArray, create New Method");
      createNewMethodJS(pClass);
    }
  };
}

function write2JSON(pID,pValue) {
  console.log("write2JSON('"+pID+"',pValue)-Call");
  var vClassJSON = getClassJSON();
  vClassJSON[pID] = pValue;
  write2value(pID,pValue);
}

function saveMethodJSON(pMethodName) {
  var vClassJSON = getClassJSON;
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
  var vClassJS = pClassJSON || getSelectedClassJSON(); // Global Variable
  // The function check if all variables in the Class are defined
  if (vClassJS) {
    console.log("Check Properties of Class");
    for (var i = 0; i < vDOM_ID.length; i++) {
      var vID = vDOM_ID[i];
      if (vClassJS.hasOwnProperty(vID)) {
        //console.log("checkClassJSON() - Class['"+vID+"'] defined");
      } else {
        console.log("WARNING: checkClassJSON() - Class['"+vID+"'] undefined");
        switch (vID) {
          case "tAuthor":
            vClassJS[vID] = getValueDOM("tMainAuthor");
          break;
          case "tEMail":
            vClassJS[vID] = getValueDOM("tMainEMail");
          break;
          default:
            vClassJS[vID] = "";
        }
        //eval()
      };
    };
    // Check for Hashes
    var vHashDefID = ["AttribType","AttribDefault","AttribComment","MethodComment","MethodReturn","MethodCode","MethodParameter"];
    var vID = "";
    for (var i = 0; i < vHashDefID.length; i++) {
      vID = vHashDefID[i];
      if (!(vClassJS.hasOwnProperty(vID))) {
        vClassJS[vID] = {};
      };
    };
  } else {
    console.log("ERROR: checkClassJSON(pClassJSON) - pClassJSON is undefined");
  }
};

function updateForm2MethodComment() {
  console.log("updateForm2MethodComment()-Call");
  var vClassJSON = getClassJSON();
  var vMethodCall = getValueDOM("tMethodName");
  var vMethodName = getMethodName(vMethodCall);
  var vMethodComment = getValueDOM("tMethodComment");
  vClassJSON["MethodComment"][vMethodName] = vMethodComment;
};

function updateForm2MethodNameParam() {
  console.log("updateForm2MethodNameParam()-Call");
  var vClassJSON = getClassJSON();
  var vMethodCall = getValueDOM("tMethodName");
  var vMethodCode = getEditorValue("iMethodCode");
  var vMethodName = getMethodName(vMethodCall);
  vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodCall);
  var vOldMethodRet = vClassJSON["MethodReturn"][vMethodName];
  var vMethodRet = getMethodReturn4Call(vMethodCall);
  if (vOldMethodRet != "") {
    if (vOldMethodRet != vMethodRet) {
      vMethodCode = changeReturnType4Code(vMethodCode,vOldMethodRet,vMethodRet);
      write2value("tMethodCode",vMethodCode);
      setEditorValue("iMethodCode",vMethodCode);
    }
  }
  vClassJSON["MethodReturn"][vMethodName] = vMethodRet;
};
function updateFileHTML2Form(pFile) {
  var vFile = pFile || getSelectedFileID();
  var vContent = "";
  console.log("updateFileHTML2Form('"+vFile+"')");
  // updates form content in DOM with File content
  updateDOM_JSON2Form(vFile);
  updateGlobalJSON2Form(vFile);
  // load the defined Attribute from Form
  updateFileJSON2FormVariable(vFile,"tElements");
};

function updateJSON2Form(pClass,pFile) {
  var vClass = pClass || getSelectedClassID();
  var vFile  = pFile  || getSelectedFileID();
  var vContent = "";
  console.log("updateJSON2Form('"+vClass+"','"+vFile+"')");
  // updates form content in DOM with Class content
  updateDOM_JSON2Form(vClass);
  updateGlobalJSON2Form(vClass);
  updateFileJSON2Form(vFile);
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
  var vClassJSON = getClassJSON();
  vClassJSON["AttribDefault"] = vAttHash;
  // Define Hash in Attribute Hash if undefined
  defineHashIfUndefined(vAttHash,"AttribType",vClassJSON);
  defineHashIfUndefined(vAttHash,"AttribComment",vClassJSON);
  var vMethArr = getMethodNameArray(); //classes.js:275
  var vMethHash = {};
  for (var i = 0; i < vMethArr.length; i++) {
    vMethHash[vMethArr[i]] = vMethArr[i];
  };
  defineHashIfUndefined(vMethHash,"MethodCode",vClassJSON);
  defineHashIfUndefined(vMethHash,"MethodComment",vClassJSON);
}

function updateAttribJSON2Form(pClass) {
  var vOut = getAttribJSON4Form(pClass);
  var vClassJS = getClassJSON(pClass);
  vClassJS["tAttributes"] = vOut;
  write2value("tAttributes",vOut);
  createAttribSelect();
};

function getAttribJSON4Form(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vAttDefault = vClassJS["AttribDefault"];
  var vAttArr = [];
  for (var iAtt in vAttDefault) {
    if (vAttDefault.hasOwnProperty(iAtt)) {
      vAttArr.push(iAtt + " = "+vAttDefault[iAtt]);
    };
  };
  vOut = vAttArr.join("\n");
  return vOut;
};

function updateForm2AttribJSON(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vAttributes = getValueDOM("tAttributes");
  console.log("updateForm2AttribJSON('"+vClass+"') with Attributes="+vAttributes);
  var vAttHash = getForm2AttribDefaultHash(vClass); //classes.js:484
  vClassJS["AttribDefault"] = vAttHash || {};
  var vAttTypeHash = getAttribTypeHash(vAttHash) || {}; // classes.js:336
  // Define Hash in Attribute Hash if undefined
  defineHashIfUndefined(vAttTypeHash,"AttribType",vClassJS);
  console.log("CALL in updateForm2AttribJSON('"+vClass+"') DEBUG-LOG");
  defineHashIfEmpty(vAttTypeHash,"AttribType",vClassJS);
  var vAttCommentHash = getAttribCommentHash(vAttHash) || {}; // classes.js:356
  defineHashIfUndefined(vAttCommentHash,"AttribComment",vClassJS);
  createAttribSelect();
};

function updateForm2MethodJSON(pClass) {
  var vClass = pClass || getSelectedClassID();
  console.log("updateForm2MethodJSON('"+vClass+"')");
  var vClassJS = getClassJSON();
  saveMethodCallJS(vClass); // saves the definition of the method call
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
  defineHash(vMethHash,"MethodParameter",vClassJS);
  //defineHashIfUndefined(vMethHash,"MethodParameter");
  //------ Init undefined Method CODE----------
  var vReturn = "";
  var vCode = "";
  for (var i = 0; i < vMethArr.length; i++) {
    //vMethHash[vMethArr[i]] = "";
    if (getCheckBox("checkInitCode")) {
      vCode =  "// Code for " + vMethArr[i]+"()";
      vMethName = vMethArr[i];
      vCode = getReturnCodeInit(vMethName,vMethReturn[vMethName],Code);
    } else {
      vCode = "";
    };
    vMethHash[vMethArr[i]] = vCode;
  };
  defineHashIfUndefined(vMethHash,"MethodCode",vClassJS);
  //------ Init undefined Method COMMENTS----------
  for (var i = 0; i < vMethArr.length; i++) {
    vMethHash[vMethArr[i]] = "Comment for " + vMethArr[i];
  };
  defineHashIfUndefined(vMethHash,"MethodComment",vClassJS);
  //------ Init undefined Method RETURN----------
  defineHash(vMethReturn,"MethodReturn",vClassJS);
  //---------------------------------------------
  createMethodSelect();
};

function getReturnCodeInit(pMethod,pReturn,pCode) {
  var vReturn = pReturn || "";
  var vCode = pCode || "";
  vCode = "// Code for " + pMethod + "\n"+vCode;
  if (vReturn != "") {
    // vReturn is the ClassType of the MethodReturn e.g. class "Matrix"
    vReturn = vReturn.replace(/\s/g,"");
    var vRetVarDef = getReturnVariableDef(pReturn);
    vCode =  vRetVarDef + vCode+"\n";
    vCode += getReturnCommandDef(vReturn);
  };
  return vCode;
}

function updateMethodsJSON2Form(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vOut = getMethodJSON4Form(vClass);
  var vClassJS = getClassJSON(vClass);
  vClassJS["tMethods"] = vOut;
  write2value("tMethods",vOut);
};

function getMethodJSON4Form(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vMethPars = vClassJS["MethodParameter"];
  var vMethRet  = vClassJS["MethodParameter"];
  var vMethArr = [];
  var vMethDef = "";
  for (var iMeth in vMethPars) {
    if (vMethPars.hasOwnProperty(iMeth)) {
      vMethDef = iMeth+"("+vMethPars[iMeth]+")"
      if (vMethRet.hasOwnProperty(iMeth)) {
        vMethDef += ":"+ vMethRet[iMeth];
      };
      vMethArr.push(vMethDef);
    };
  };
  vOut = vMethArr.join("\n");
  return vOut;
};

function changeReturnType4Code(pCode,pOldRet,pNewRet) {
  console.log("CALL: changeReturnType4Code(pCode,'"+pOldRet+"','"+pNewRet+"')");
  var vCode = pCode || "";
  if (vCode != "") {
    // for pOldRet="Matrix" and pNewRet="MyClass" the following commands will
    // (1) replace "var vRetMatrix = new Matrix()" by "var vRetMyClass = new MyClass()"
    vCode = replaceString(vCode,getReturnVariableDef(pOldRet),getReturnVariableDef(pNewRet));
    // (2) replace "return vRetMatrix;" by "return vRetMyClass;"
    vCode = replaceString(vCode,getReturnCommandDef(pOldRet),getReturnCommandDef(pNewRet));
  };
  return vCode;
}

function getReturnCommandDef(pRetType) {
  pRetType = reduceVarName(pRetType);
  return "return vRet"+pRetType+";";
};

function getReturnVariableDef(pRetType) {
  var vReturn = pRetType || "";
  vReturn = vReturn.replace(/\s/g,"");
  var vRetVarDef = "";
  var vClassDef  = "";
  if (vReturn != "") {
    if (isBasicClass(vReturn)) {
      var vBasicClassHash = getBasicClassHash();
      vClassDef = vBasicClassHash[vReturn];
    } else {
      vClassDef = "new "+vReturn+"()"
    };
    vRetVarDef =  "var vRet"+vReturn +" = "+vClassDef+";\n";
  };
  return vRetVarDef;
};


function updateForm2JSON(pClass,pClassType) {
  updateFileForm2JSON();
  var vClass = pClass || getSelectedClassID();
  //var vClassTypeHash = getForm2ClassTypeHash();
  var vClassType = getFormClassType4Class(vClass) || "";
  //var vAttributes = getValueDOM("tAttributes");
  console.log("updateForm2JSON('"+vClass+"','"+vClassType+"')");
  // updates the Class content with form content in DOM
  createClassJS(vClass,vClassType,"updateForm2JSON()");
  updateForm_DOM2JSON(pClass);
  // load the defined Attribute and Methodsfrom Form
  console.log("(1) updateForm2JSON('"+pClass+"') >> updateForm2AttribJSON()");
  updateForm2AttribJSON(pClass);
  console.log("(2) updateForm2JSON('"+pClass+"') >> uupdateForm2MethodJSON()");
  updateForm2MethodJSON(pClass);
  console.log("(3) updateForm2JSON('"+pClass+"') >> updateFormGlobal2JSON()");
  updateFormGlobal2JSON();
  console.log("(4) updateForm2JSON('"+pClass+"') >> set Selected IDs");
  vJSON_JS["SelectedClass"] = getValueDOM("sClassList") || "";
  vJSON_JS["SelectedPage"] = getValueDOM("sPageHTML") || "";
  vJSON_JS["SelectedPageType"] = getValueDOM("sPageTypeHTML") || "";
  vJSON_JS["SelectedButton"] = getValueDOM("sButtonHTML") || "";
};

function defineHashIfUndefined(pHash,pHashListID,pClassJS) {
  var vClassJS = pClassJS || getClassJSON();
  if (vClassJS[pHashListID]) {
    console.log("defineHashIfUndefined(pHash,'"+pHashListID+"',pClassJS) Hash '"+pHashListID+"' exists");
  } else {
    vClassJS[pHashListID] = {};
  };
  for (var iAttName in pHash) {
    if (vClassJS[pHashListID][iAttName]) {
        //vClassJSON[pHashListID][iAttName];
        console.log(pHashListID+"['"+iAttName+"'] defined");
    } else {
      console.log(pHashListID+"['"+iAttName+"'] undefined set to '"+pHash[iAttName]+"'");
      vClassJS[pHashListID][iAttName] = pHash[iAttName];
    };
  };
};

function defineHashIfEmpty(pHash,pHashListID,pClassJS) {
  var vClassJS = pClassJS || getClassJSON();
  defineHashIfUndefined(pHash,pHashListID,vClassJS);
  var vValue = "";
  for (var iAttName in pHash) {
    vValue = vClassJS[pHashListID][iAttName];
    if (vValue != "") {
        //vClassJSON[pHashListID][iAttName];
        console.log(pHashListID+"['"+iAttName+"']='"+vValue+"' is not empty");
    } else {
      console.log(pHashListID+"['"+iAttName+"']='' empty - set to default value'"+pHash[iAttName]+"'");
      vClassJS[pHashListID][iAttName] = pHash[iAttName];
    };
  };
};

function defineHash(pHash,pHashListID,pClassJS) {
  var vClassJS = pClassJS || getClassJSON();
  console.log("defineHash(pHash,'"+pHashListID+"',pClassJS)");
  defineHashIfUndefined(pHash,pHashListID,pClassJS);
  var vValue = "";
  for (var iAttName in pHash) {
    console.log(pHashListID+"['"+iAttName+"']='"+pHash[iAttName]+"' is defined");
    vClassJS[pHashListID][iAttName] = pHash[iAttName];
  };
};
