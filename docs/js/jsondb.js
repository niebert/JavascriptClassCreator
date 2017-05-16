// vJSON_JS contains all the data of the current programming project
//      this database will be stored and updated from the
// vClassJSON contains the current class
// vSelectedClass is the ClassName of the Class that is currently edited
// vJSON_JS["ClassList"][vSelectedClass]  is equal to vClassJSON
function stringifyJSON(pJSON) {
  return JSON.stringify(pJSON, null, 4);
};

function X_stringifyJSON(pJSON) {
  var vContent = "";
  if (pJSON) {
    vContent = JSON.stringify(pJSON, null, 4);
    console.log("stringifyJSON(pJSON)\n"+vContent);
  };
  return vContent;
};

function cloneJSON(pJSON) {
  var vJSON = {};
  if (pJSON) {
    vJSON = JSON.parse(JSON.stringify(pJSON));
  } else {
    console.log("ERROR: cloneJSON(pJSON) - pJSON undefined!");
  };
  return vJSON
};

function checkDatabaseListJSON() {
  var vArrDB = getDatabaseListJSON();
  console.log("checkDatabaseListJSON() vArrDB.length="+vArrDB.length);
  for (var i = 0; i < vArrDB.length; i++) {
    checkDatabaseJSON(vArrDB[i])
  };
};

function checkDatabaseJSON(pDB) {
  var vDB = pDB || "";
  console.log("checkDatabaseJSON('"+vDB+"')");
  vDB = reduceVarName(vDB);
  if (vDB != "") {
    if (vJSON_JS["DatabaseList"].hasOwnProperty(vDB)) {
      console.log("Database["+vDB+"] exists");
    } else {
      vJSON_JS["DatabaseList"][vDB] = getDefaultDatabaseJSON(vDB);
      console.log("Database["+vDB+"] initialized with getDefaultDatabaseJSON('"+vDB+"')");
    };
  };
};

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


// function stringifyJSON(pJSONDB) {
//   var vJSON = "";
//   if (pJSONDB) {
//     vJSON = JSON.stringify(pJSONDB);
//   };
//   return vJSON;
// };


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
    vJSON_JS["ClassList"][vClass][vDOM_ID[i]] = getValueDOM(vDOM_ID[i]);
  };
  saveLocalDB("vJSON_JS",vJSON_JS);
};

function updateFormPageTypes2JSON() {
  vJSON_JS["PageType"] = getPageTypeHash();
  createPageTypeSelect();
};

function updateFormID2JSON(pID) {
  var vClass 	= getValueDOM("tClassname");
  if (existsClassJS(vClass)) {
    console.log("updateFormID2JSON('"+pID+"')-Call with Classname: '"+vClass+"'");
    vJSON_JS["ClassList"][vClass][pID] = getValueDOM(pID);
  } else {
    console.log("ERROR: updateFormID2JSON('"+pID+"')-Call undefined Class: '"+vClass+"'");
  };
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
    debugLog("File","FileList exists");
  } else {
    vJSON_JS["FileList"] = {};
    debugLog("File","create vJSON_JS['FileList']");
  };
  if (vJSON_JS["FileList"][pFile]) {
    debugLog("File","FileList['"+pFile+"'] exists");
  } else {
    vJSON_JS["FileList"][pFile] = {}
  };
  var vID = "";
  for (var i = 0; i < vDOM_File.length; i++) {
    vID = vDOM_File[i];
    if (vJSON_JS["FileList"][pFile][vID]) {
      debugLog("File","FileList['"+pFile+"']['"+vID+"'] exists");
    } else {
      debugLog("File","FileList['"+pFile+"']['"+vID+"'] created");
      vJSON_JS["FileList"][pFile][vID] = getValueDOM(vID);
    };
  };
  if (vJSON_JS["FileList"][pFile]["elements"]) {
    debugLog("File","FileList['"+pFile+"']['elements'] exists");
  } else {
    debugLog("File","FileList['"+pFile+"']['elements'] created");
    vJSON_JS["FileList"][pFile]["elements"] = getElementsHash4Form({},pFile);
  };
  var vElemHash = vJSON_JS["FileList"][pFile]["elements"];
  var vElemArrID = getArray4HashID(vElemHash,pFile);
  if (vJSON_JS["FileList"][pFile]["tElementID"]) {
    debugLog("File","FileList['"+pFile+"']['tElementID'] exists");
    if (vJSON_JS["FileList"][pFile]["tElementID"] == "") {
      if (vElemArrID.length > 0) {
        vJSON_JS["FileList"][pFile]["tElementID"] = vElemArrID[0];
        vJSON_JS["FileList"][pFile]["sElementList"] = vElemArrID[0];
      };
    };
  } else {
    debugLog("File","FileList['"+pFile+"']['tElementID'] undefined");
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
      debugLog("File","ID ["+vArrID[i]+"] exists "+vFile);
      vOutHash[vArrID[i]] = vHash[vArrID[i]];
    } else {
      vOutHash[vArrID[i]] = getDefaultElementString(vFile,vArrID[i]);
    };
  };
  return vOutHash;
};

function  updateAttributesJS() {
  //vClassJSON["tAttributes"] = getAttribDefaultHash();
  debugLog("Attrib","updateAttributesJS()-Call called after adding a new Attribute");
  var vClassJS = getClassJSON();
  var vAttName = vClassJS["sAttribList"] || "";
  write2value("sAttribList",vAttName);
  selectJSAttribs();
};
function  updateMethodsJS() {
  //vClassJSON["Methods"] = getAttribDefaultHash();
  console.log("updateMethodsJS()-Call undefined");
};

function updateGlobalLibsForm2JSON() {
  console.log("updateGlobalLibsForm2JSON()");
  var vGLib = getValueDOM("tGlobalLibs") || "";
  vGLib = removeEmptyLines(vGLib);
  vJSON_JS["GlobalLibList"] = [];
  if (vGLib != "") {
    var vGLibArr = vGLib.split("\n");
    var vLinArr;
    var vImport = "";
    var vBoolean = true;
    var vID = "";
    var vHash;
    for (var i = 0; i < vGLibArr.length; i++) {
      vLinArr = vGLibArr[i].split("|");
      vFileName = vLineArr[0];
      vImport = vLineArr[1] || "true";
      if (reduceVarName(vFileName) != "") {
        vID = filename2id(vFileName);
        if (vImport == "false") {
          vBoolean = false;
        } else {
          vBoolean = true;
        };
        vJSON_JS["GlobalLibList"].push({
          "file":vFileName,
          "import": vBoolean
        });
      }
    }
  }
};

function updateGlobalLibsJSON2Form() {
  console.log("updateGlobalLibsForm2JSON()");
  var vArr = vJSON_JS["GlobalLibList"];
  var vOut = "";
  var vCR = "";
  var vImport = "";
  for (var i = 0; i < vArr.length; i++) {
    if (vArr[i]["import"] == false) {
      vImport = "false";
    } else {
      vImport = "true";
    }
    //vOut += vCR + vArr[i]["path"]+"|"+vImport;
    vOut += vCR + vArr[i]["path"];
    vCR = "\n";
  };
  write2value("tGlobalLibs",vOut);
};

function updateHTMLFiles() {
  console.log("updateHTMLFiles() - update File Selector of HTML Files and JSON Files");
  createFileSelect(); // dom.js:123

}

function updateJSAttribs() {
  debugLog("Attrib","updateJSAttribs()-Call");
  updateForm2AttribJSON();
  createAttribTypeSelect();
  createAttribSelect();
};

function updateJSMethods() {
  debugLog("Method","updateJSMethods()");
  var vMethodNameArr   = getMethodNameArray();
  var vMethodHash      = getMethodHash();
  var vMethodNameArray = getMethodNameArray();
  var vMethodArray     = getMethodArray();
  vMethodArray = checkJSMethods(vMethodArray);
  // load tMethods definitions and create the options of the SELECT Box
  debugLog("Method","Update JS Methods");
  var vOptions = createOptions4Array(vMethodNameArr);
  var vMethodHeader= getValueDOM("tMethodHeader");
  var vMethodName = getMethodName(vMethodHeader);
  if (vMethodName != "") {
    if (vMethodHash[vMethodName]) {
      loadMethodJSON(vMethodName);
    } else {
      loadMethodJSON(vMethodNameArray[0]);
      debugLog("Method","updateJSMethods()-Call  '"+vMethodName+"' undefined in MethodArray");
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
    debugLog("Attrib","loadAttribJSON() Call - Attribute '"+vAttribName+"' defined");
    write2value("sAttribTypeList", vClassJSON["AttribType"][vAttribName] || "");
    write2value("tAttribDefault",  vClassJSON["AttribDefault"][vAttribName] || "");
    write2value("tAttribComment",  vClassJSON["AttribComment"][vAttribName] || "");
  } else {
    alert("loadAttribJSON() Call - Attrib Name undefined");
    debugLog("Attrib","loadAttribJSON() Call - Attrib Name undefined");
  };
};

function save3LevelID2JSON(pListID,pHashID,pID,pValue) {
    console.log("save3LevelID2JSON('"+pListID+"','"+pHashID+"','"+pID+"',pValue)");
    if (vJSON_JS[pListID]) {
      if (vJSON_JS[pListID][pHashID]) {
        if (vJSON_JS[pListID][pHashID][pID]) {
            vJSON_JS[pListID][pHashID][pID] = pValue;
        } else {
          console.log("ERROR: vJSON_JS['"+pListID+"']['"+pHashID+"']['"+pID+"'] was undefined!");
        };
      } else {
        console.log("ERROR: vJSON_JS['"+pListID+"']['"+pHashID+"'] was undefined!");
      };
    } else {
      console.log("ERROR: vJSON_JS['"+pListID+"'] was undefined!");
    };
};

function save2LevelID2JSON(pListID,pID,pValue) {
  var vSuccess = saveID4HashPath2JSON(pListID+"."+pID,pValue);
  if (vSuccess == true) {
    console.log("save2LevelID2JSON('"+pListID+"','"+pID+"',pValue) DONE");
  } else {
    console.log("ERROR: save2LevelID2JSON('"+pListID+"','"+pID+"',pValue)");
  }
};

function X_save2LevelID2JSON(pListID,pID,pValue) {
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

function saveID4HashPath2JSON(pHashPath,pValue) {
  var vPathOK = true;
  var vID = "";
  var vPrevHash;
  var vHash = vJSON_JS;
  var vLog = "vJSON_JS";
  console.log("saveID4HashPath2JSON('"+pHashPath+"','"+pValue+"') ");
  if (pHashPath && pHashPath.length>1) {
    var vArrID = pHashPath.split(".");
    for (var i = 0; i < vArrID.length; i++) {
      vID = reduceVarName(vArrID[i]);
      if (vID != "") { // skip empty ID defined by path ".."
        if (vPathOK) {
          if (vHash.hasOwnProperty(vID)) {
            vLog += "["+vID+"]"; // vID exists in HashPath
            vPrevHash = vHash;
            vHash = vHash[vID]; // set Hash to Lower Part of Hash
          } else {
            vLog += " OK - Undefined Path ["+vID+"]";
          };
        } else {
          // append undefined part of Hash
          vLog += "["+vID+"]";
        }
      }; // empty ID
    }; // end For
  } else {
    console.log("saveID4HashPath2JSON(): HashPath undefined");
  };
  console.log(vLog);
  if (vPathOK) {
    //set Value
    if (vPrevHash) {
      vPrevHash[vID] = pValue;
    } else {
      alert("ERROR: HashPath '"+pHashPath+"' length to short!")
    };
  }
  return vPathOK; // boolead for success of save operation
}

function deleteClassForm() {
  console.log("deleteClassForm()");
  var vClassJS = getClassJSON();
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
  var vClassJS = getClassJSON();
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
  var vName = getValueDOM("tAttribName");
  console.log("saveAttributeForm('"+vName+"')");
  var vClassJSON = getClassJSON();
  var vArrID = ["AttribType","AttribDefault","AttribComment"];
  var vID = "";
  for (var i = 0; i < vArrID.length; i++) {
    vID = vArrID[i];
    vClassJSON[vID][vName] = getValueDOM("t"+vID) || "";
  };
  updateAttribListJSON2Form();
  vClassJSON["sAttribList"] = vName;
  createAttribSelect();
  write2value("sAttribList",vName);
  for (var i = 0; i < vArrID.length; i++) {
    vID = vArrID[i];
    write2value("t"+vID,vClassJSON[vID][vName]);
  };
  autoSaveJSON();
  alert("Attribute '"+vName+"' saved!");
};

function updateAttribListJSON2Form() {
  var vClassJSON = getClassJSON();
  var vAttHash = vClassJSON["AttribDefault"];
  var vOut = "";
  var vCR = "";
  var vLine = "";
  for (var iName in vAttHash) {
    if (vAttHash.hasOwnProperty(iName)) {
      vLine = vCR + iName + " = " + vAttHash[iName];
      vLine = vLine.replace(/\s+=\s+/,"=");
      vOut += vLine;
      vCR = "\n";
    };
  };
  write2value("tAttributes",vOut);
};

function saveAttribJSON(pAttName,pAttType,pAttDefault,pAttComment) {
  debugLog("Attrib","saveAttribJSON('"+pAttName+"','"+pAttType+"','"+pAttDefault+"','"+pAttComment+"')");
  var vClassJSON = getClassJSON();
  var vAttribName     = pAttName    || getValueDOM("tAttribName")    || "";
  var vAttribType     = pAttType    || getValueDOM("tAttribType")    || "";
  var vAttribDefault  = pAttDefault || getValueDOM("tAttribDefault") || "";
  var vAttribComment  = pAttComment || getValueDOM("tAttribComment") || "";
  if (vAttribName != "") {
    checkClassJSON(vClassJSON);
    vClassJSON["AttribType"][vAttribName]    = vAttribType;
    vClassJSON["AttribDefault"][vAttribName] = vAttribDefault;
    vClassJSON["AttribComment"][vAttribName] = vAttribComment;
    console.log("Attribute '"+vAttribName+"' saved!");
  } else {
    console.log("ERROR: saveAttribJSON() Call - Attrib Name undefined");
  };
};

function getMethodHeader4Name(pMethName,pClass) {
  var vMethHeader = "";
  var vClass = pClass || getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  if (vClassJS.hasOwnProperty("MethodParameter")) {
    if (vClassJS.MethodParameter.hasOwnProperty("MethodParameter")) {

    } else {
      console.log("ERROR: getMethodHeader4Name(pMethName,pClass) MethodParameter undefined");
    };
  } else {
    console.log("ERROR: getMethodHeader4Name(pMethName,pClass) MethodParameter undefined");
  };
  return vMethHeader;
}

function updateJSON2selectAttrib(pClass) {
  debugLog("Attrib","updateJSON2selectAttrib('"+pClass+"')");
  var vClassHash = vJSON_JS["ClassList"][pClass];
  if (vClassHash) {
    var vAttHash = vClassHash["Att"]
  }
}

function loadMethodJSON (pMethodName) {
  var vClassJSON = getClassJSON();
  var vMethodName = getValueDOM("tMethodHeader");
  vMethodName = pMethodName || vMethodName;
  var vMethodHash = getMethodHash();
  var vMethodHeader= vMethodHash[vMethodName] || pMethodName + "(???)";
  write2value("tMethodHeader",vMethodHeader);
  write2innerHTML("titleMethodName",vMethodHeader);
  vMethodName = getMethodName(vMethodName); //without Parameters
  if (vMethodName != "") {
    debugLog("Method","loadMethodJSON() Call - Method Code '"+vMethodName+"' defined");
    var vCode = vClassJSON["MethodCode"][vMethodName] || "";
    if (vClassJSON["MethodCode"][vMethodName]) {
      write2value("tMethodCode",vCode);
      setEditorValue("iMethodCode",vCode);
    };
    write2value("tMethodComment",vClassJSON["MethodComment"][vMethodName] || "");
  } else {
    alert("loadMethodJSON() Call - Method Name undefined");
    debugLog("Method","loadMethodJSON() Call - Method Name undefined");
  };
};

function deleteMethodForm() {
  debugLog("Attrib","deleteAttributeForm()");
  var vClassJS = getClassJSON();
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
  var vMethodHeader= getValueDOM("tMethodHeader");
  var vMethodName = getMethodName(vMethodHeader);
  var vMethodHash = getMethodHash();
  var vMethodCode    = getEditorValue("iMethodCode");
  var vMethodComment = getValueDOM("tMethodComment");
  if (vMethodName != "") {
    if (vMethodHash[vMethodName]) {
      vMethodHash[vMethodName] = vMethodHeader;
      write2JSON("tMethods",convertHash2String(vMethodHash));
      //vClassJSON = getClassJSON();
      vClassJSON["MethodCode"][vMethodName] = vMethodCode;
      vClassJSON["MethodComment"][vMethodName] = vMethodComment;
      vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodHeader);
      vClassJSON["MethodReturn"][vMethodName] = getMethodReturn4Call(vMethodHeader);
      updateJSMethods();
    } else {
      debugLog("Method","saveMethodCallJS()-Call  '"+vMethodName+"' undefined in MethodArray, create New Method");
      createNewMethodJS(pClass);
    }
  };
}

function write2JSON(pID,pValue) {
  console.log("write2JSON('"+pID+"',pValue)-Call");
  var vClassJSON = getClassJSON();
  vClassJSON[pID] = pValue;
  write2value(pID,pValue);
};

function saveMethodForm(pMethodHeader) {
  var vMethodHeader = pMethodHeader || getValueDOM("tMethodHeader");
  var vMethodName = getSelectedMethodID();
  var vErrorMSG = saveMethodJSON(vMethodHeader);
  if (vErrorMSG == "") {
    autoSaveJSON();
    alert("Method '"+vMethodName+"' saved!");
  } else {
    alert(vErrorMSG);
  };
};

function getSelectedMethodID(pMethodHeader) {
  var vMethodHeader= pMethodHeader|| getValueDOM("tMethodHeader");
  var vMethodName = getMethodName(vMethodHeader) || "";
  return vMethodName;
};

function saveMethodJSON(pMethodHeader) {
  var vErrorMSG = "";
  var vClassJSON = getClassJSON();
  var vMethodHeader= pMethodHeader || getValueDOM("tMethodHeader");
  var vMethodName = getSelectedMethodID(vMethodHeader);
  var vMethodCode     = getEditorValue("iMethodCode");
  var vMethodComment  = getValueDOM("tMethodComment");
  if (vMethodName != "") {
    checkClassJSON(vClassJSON);
    vClassJSON["MethodCode"][vMethodName] = vMethodCode;
    vClassJSON["MethodComment"][vMethodName] = vMethodComment;
    vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodHeader);
    vClassJSON["MethodReturn"][vMethodName] = getMethodReturn4Call(vMethodHeader);
    console.log("Method '"+vMethodName+"' saved!");
  } else {
    vErrorMSG = "ERROR: saveMethodJSON() Call - Method Name undefined!";
  };
  return vErrorMSG;
};

function checkClassJSON(pClassJSON) {
  var vClassJS = pClassJSON || getSelectedClassJSON(); // Global Variable
  // The function check if all variables in the Class are defined
  if (vClassJS) {
    debugLog("Class","checkClassJSON(pClassJSON) - Check Properties of Class");
    for (var i = 0; i < vDOM_ID.length; i++) {
      var vID = vDOM_ID[i];
      if (vClassJS.hasOwnProperty(vID)) {
        //debugLog("Class","checkClassJSON() - Class['"+vID+"'] defined");
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
  debugLog("Method","updateForm2MethodComment()-Call");
  var vClassJSON = getClassJSON();
  var vMethodHeader= getValueDOM("tMethodHeader");
  var vMethodName = getMethodName(vMethodHeader);
  var vMethodComment = getValueDOM("tMethodComment");
  vClassJSON["MethodComment"][vMethodName] = vMethodComment;
};

function updateForm2MethodNameParam() {
  debugLog("Method","updateForm2MethodNameParam()-Call");
  var vClassJSON = getClassJSON();
  var vMethodHeader= getValueDOM("tMethodHeader");
  var vMethodCode = getEditorValue("iMethodCode");
  var vMethodName = getMethodName(vMethodHeader);
  vClassJSON["MethodParameter"][vMethodName] = getMethodParameter4Call(vMethodHeader);
  var vOldMethodRet = vClassJSON["MethodReturn"][vMethodName];
  var vMethodRet = getMethodReturn4Call(vMethodHeader);
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
  debugLog("File","updateFileHTML2Form('"+vFile+"')");
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
  updateFileListJSON2Form();
  updateBasicClassJSON2Form();
  updateButtonJSON2Form();
  // load the defined Attribute from Form
  updateJSON2FormVariable(vClass,"tAttributes");
  updateJSON2FormVariable(vClass,"tMethods");
  updateJSON2EditorContent(vClass,vFile);
  // updateForm2MissingJSON(pClass);
  updateJSON2tAttributes(vClass);
  updateJSON2tMethods(vClass);
};

function updateFileListJSON2Form() {
  var vArrFile = getArray4HashID(vJSON_JS["FileList"]);
  write2value("tHTMLfiles",vArrFile.join("\n"));;
};

function updateBasicClassJSON2Form() {
  var vHash = vJSON_JS["BasicClasses"];
  var vOut = "";
  var vCR = "";
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
       vOut += vCR + iID + " = " + vHash[iID];
       vCR = "\n";
    };
  };
  write2value("tBasicClassList",vOut);
}


function updateJSON2EditorContent(pClass,pFile) {
  var vClass = pClass || getSelectedClassID();
  var vFile  = pFile  || getSelectedFileID();
  var vMethodName = getSelectedMethodID() || "";
  console.log("updateJSON2Form('"+vClass+"','"+vFile+"')");
  var vContent = "";
  var vID = "";
  if (vMethodName != "") {
    console.log("updateJSON2EditorContent: [MethodCode]!");
    vContent = vJSON_JS["ClassList"][vClass]["MethodCode"][vMethodName];
    write2value("tMethodCode",vContent);
    setEditorValue("iMethodCode",vContent);
  };
  //var vEdIDArr = ["MethodCode","PageHTML","PageTypeHTML","ElementHTML"];
  for (var i = 1; i < vEdIDArr.length; i++) {
    vID = vEdIDArr[i];
    vContent = vJSON_JS["t"+vID];
    if (vContent) {
      console.log("updateJSON2EditorContent: copy Editor Content from JSON to textarea and editor [i"+vID+"] !");
      write2value("i"+vID,vContent);
      setEditorValue("i"+vID,vContent);
    };
  };
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

function copyEditorValue2TextArea() {
  // temporary editors "iMainHTML" "iJSONDB" "iOutput"
  //var vEdIDArr = ["MethodCode","PageHTML","PageTypeHTML","ElementHTML"];
  var vContent = "";
  var vID = "";
  for (var i = 0; i < vEdIDArr.length; i++) {
    vID = vEdIDArr[i];
    vContent = getEditorValue("i"+vID);
    if (vContent) {
      console.log("copyEditorValue2TextArea(): copy Editor Content for [i"+vID+"] to textarea!");
      write2value("t"+vID,vContent);
    };
  };
};

function updateEditorValue2JSON() {
  // temporary editors "iMainHTML" "iJSONDB" "iOutput"
  //var vEdIDArr = ["MethodCode","PageHTML","PageTypeHTML","ElementHTML"];
  var vContent = "";
  var vClass = getSelectedClassID();
  var vID = "MethodCode";
  vContent = getEditorValue("i"+vID);
  vJSON_JS["ClassList"][vClass]["t"+vID] = vContent;
  for (var i = 1; i < vEdIDArr.length; i++) {
    vID = vEdIDArr[i];
    vContent = getEditorValue("i"+vID);
    if (vContent) {
      console.log("copyEditorValue2TextArea(): copy Editor Content for [i"+vID+"] to textarea!");
      write2value("t"+vID,vContent);
      vJSON_JS["t"+vID] = vContent;
    };
  };
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
  var vLine = "";
  for (var iAtt in vAttDefault) {
    if (vAttDefault.hasOwnProperty(iAtt)) {
      vLine = iAtt + " = "+vAttDefault[iAtt];
      vLine = vLine.replace(/\s+=\s+/,"=");
      vAttArr.push(vLine);
    };
  };
  vOut = vAttArr.join("\n");
  return vOut;
};

function updateForm2AttribJSON(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vAttributes = getValueDOM("tAttributes");
  debugLog("Attrib","updateForm2AttribJSON('"+vClass+"') with Attributes="+vAttributes);
  var vAttHash = getForm2AttribDefaultHash(vClass); //classes.js:484
  vClassJS["AttribDefault"] = vAttHash || {};
  var vAttTypeHash = getAttribTypeHash(vAttHash) || {}; // classes.js:336
  // Define Hash in Attribute Hash if undefined
  defineHashIfUndefined(vAttTypeHash,"AttribType",vClassJS);
  debugLog("Attrib","CALL in updateForm2AttribJSON('"+vClass+"') DEBUG-LOG");
  defineHashIfEmpty(vAttTypeHash,"AttribType",vClassJS);
  var vAttCommentHash = getAttribCommentHash(vAttHash) || {}; // classes.js:356
  defineHashIfUndefined(vAttCommentHash,"AttribComment",vClassJS);
  createAttribSelect();
};

function updateForm2MethodJSON(pClass) {
  var vClass = pClass || getSelectedClassID();
  debugLog("Method","updateForm2MethodJSON('"+vClass+"')");
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
      vCode = getReturnCodeInit(vMethName,vMethReturn[vMethName],vCode);
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
  var vMethRet  = vClassJS["MethodReturn"];
  var vMethArr = [];
  var vMethDef = "";
  for (var iMeth in vMethPars) {
    if (vMethPars.hasOwnProperty(iMeth)) {
      vMethDef = iMeth+"("+vMethPars[iMeth]+")"
      if (vMethRet.hasOwnProperty(iMeth)) {
        var vRetClass = reduceVarName(vMethRet[iMeth]);
        if (vRetClass != "") {
          vMethDef += ":"+ vMethRet[iMeth];
        };
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

function updateFormLoopDef2JSON() {
  var vClassJS = getSelectedClassJSON();
  vClassJS["tLoopObject"] = getValueDOM("tLoopObject");
  vClassJS["tLoopMethod"] = getValueDOM("tLoopMethod");
}

function updateForm2JSON(pClass,pClassType) {
  var vFile = getSelectedFileID();
  updateFileForm2JSON(vFile);
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
    debugLog("Class","defineHashIfUndefined(pHash,'"+pHashListID+"',pClassJS) Hash '"+pHashListID+"' exists");
  } else {
    vClassJS[pHashListID] = {};
  };
  for (var iAttName in pHash) {
    if (vClassJS[pHashListID][iAttName]) {
        //vClassJSON[pHashListID][iAttName];
        debugLog("Class",pHashListID+"['"+iAttName+"'] defined");
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
        debugLog("Attrib",pHashListID+"['"+iAttName+"']='"+vValue+"' is not empty");
    } else {
      debugLog("Attrib",pHashListID+"['"+iAttName+"']='' empty - set to default value'"+pHash[iAttName]+"'");
      vClassJS[pHashListID][iAttName] = pHash[iAttName];
    };
  };
};

function defineHash(pHash,pHashListID,pClassJS) {
  var vClassJS = pClassJS || getClassJSON();
  debugLog("Attrib","defineHash(pHash,'"+pHashListID+"',pClassJS)");
  defineHashIfUndefined(pHash,pHashListID,pClassJS);
  var vValue = "";
  for (var iAttName in pHash) {
    debugLog("Attrib",pHashListID+"['"+iAttName+"']='"+pHash[iAttName]+"' is defined");
    vClassJS[pHashListID][iAttName] = pHash[iAttName];
  };
};
