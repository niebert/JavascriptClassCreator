// vJSCC_DB contains all the data of the current programming project
//      this database will be stored and updated from the
// vClassJSON contains the current class
// vSelectedClass is the ClassName of the Class that is currently edited
// vJSCC_DB["ClassList"][vSelectedClass]  is equal to vClassJSON
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


function checkDatabaseListJSON() {
  var vHashDB = getDatabaseListJSON();
  console.log("checkDatabaseListJSON()");
  for (var iDB in vHashDB) {
    if (vHashDB.hasOwnProperty(iDB)) {
      checkDatabaseJSON(iDB);
    }
  };
};

function createNewDatabase(pFilePath) {
  var vDBFile = pFilePath || getValueDOM("tDatabaseName");
  // determine the DBID from FilePath
  var vDBID = reduceIDName(vDBFile);
  if (existsDatabaseJS(vDBID)) {
    alert("Database ID for '"+vDBFile+"' already exists!")
  } else {
    vJSCC_DB["DBID2File"][vDBID] = vDBFile;
    var vOK = confirm("Do you want to create a JSCC Database?\nPress ESC to create a JSON!");
    if (vOK && vOK == "true") {
      console.log("Create a JSCC Database");
      vJSCC_DB["DatabaseList"][vDBID] = getDefaultDatabaseJSON(pFilePath,vDBID);
    } else {
      vJSCC_DB["DatabaseList"][vDBID] = {"file":pFilePath};
    };
    selectDatabaseJSON(vDBID);
  }
}

function checkDatabaseJSON(pDB) {
  var vDB = pDB || "";
  console.log("checkDatabaseJSON('"+vDB+"')");
  if (vDB != "") {
    if (vJSCC_DB["DatabaseList"].hasOwnProperty(vDB)) {
      console.log("Database["+vDB+"] exists");
    } else {
      vJSCC_DB["DatabaseList"][vDB] = getDefaultDatabaseJSON("db/"+vDB+".js",vDB);
      console.log("Database["+vDB+"] initialized with getDefaultDatabaseJSON('"+vDB+"')");
    };
  };
};

function loadLocalStorage2JSON() {
  // main Load JSON function
  var vJSONstring = localStorage.getItem("JSON_DB") || "";
  write2value("tJSONDB",vJSONstring);
  if (vJSONstring != "") {
    vJSCC_DB = JSON.parse(vJSONstring);
  } else {
    console.log("ERROR: JSON_DB undefined in localStorage");
  }
};

function saveJSON2LocalStorage() {
  // main Save JSON function
  var vJSONstring = JSON.stringify(vJSCC_DB);
  localStorage.setItem("JSON_DB",vJSONstring);
  //write2value("tJSONDB",JSON.stringify(vJSCC_DB,null,4);
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
  var vJSONDB = vJSCC_DB[vClassname];
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
    vJSCC_DB["ClassList"][vClass][vDOM_ID[i]] = getValueDOM(vDOM_ID[i]);
  };
  saveLocalDB("vJSCC_DB",vJSCC_DB);
};

function updateFormPageTypes2JSON() {
  vJSCC_DB["PageTypeList"] = getPageTypeHash();
  createPageTypeSelect();
};

function updateFormID2JSON(pID) {
  var vClass 	= getValueDOM("tClassname");
  if (existsClassJS(vClass)) {
    console.log("updateFormID2JSON('"+pID+"')-Call with Classname: '"+vClass+"'");
    vJSCC_DB["ClassList"][vClass][pID] = getValueDOM(pID);
  } else {
    console.log("ERROR: updateFormID2JSON('"+pID+"')-Call undefined Class: '"+vClass+"'");
  };
};

function getSelectedFilenameHTML() {
  var vFile 	= vJSCC_DB["SelectedFile"] || getValueDOM("tFilename") || "";
  if (vFile == "") {
    vFile = "app.html";
  };
  return vFile;
}

function updateFormFileID2JSON(pID) {
  var vFile 	= getSelectedFilenameHTML();
  checkFileHTML(vFile);
  console.log("updateFormFileID2JSON('"+pID+"')-Call with Filename: '"+vFile+"'");
  vJSCC_DB["FileList"][vFile][pID] = getValueDOM(pID);
};

function checkFileHTML(pFile) {
  if (vJSCC_DB["FileList"]) {
    debugLog("File","FileList exists");
  } else {
    vJSCC_DB["FileList"] = {};
    debugLog("File","create vJSCC_DB['FileList']");
  };
  if (vJSCC_DB["FileList"][pFile]) {
    debugLog("File","FileList['"+pFile+"'] exists");
  } else {
    vJSCC_DB["FileList"][pFile] = {}
  };
  var vID = "";
  for (var i = 0; i < vDOM_File.length; i++) {
    vID = vDOM_File[i];
    if (vJSCC_DB["FileList"][pFile][vID]) {
      debugLog("File","FileList['"+pFile+"']['"+vID+"'] exists");
    } else {
      debugLog("File","FileList['"+pFile+"']['"+vID+"'] created");
      vJSCC_DB["FileList"][pFile][vID] = getValueDOM(vID);
    };
  };
  if (vJSCC_DB["FileList"][pFile]["elements"]) {
    debugLog("File","FileList['"+pFile+"']['elements'] exists");
  } else {
    debugLog("File","FileList['"+pFile+"']['elements'] created");
    vJSCC_DB["FileList"][pFile]["elements"] = getElementsHash4Form({},pFile);
  };
  var vElemHash = vJSCC_DB["FileList"][pFile]["elements"];
  var vElemArrID = getArray4HashID(vElemHash,pFile);
  if (vJSCC_DB["FileList"][pFile]["tElementID"]) {
    debugLog("File","FileList['"+pFile+"']['tElementID'] exists");
    if (vJSCC_DB["FileList"][pFile]["tElementID"] == "") {
      if (vElemArrID.length > 0) {
        vJSCC_DB["FileList"][pFile]["tElementID"] = vElemArrID[0];
        vJSCC_DB["FileList"][pFile]["sElementsFileList"] = vElemArrID[0];
      };
    };
  } else {
    debugLog("File","FileList['"+pFile+"']['tElementID'] undefined");
  }
};

function getElementsHash4Form(pHash,pFile) {
  var vIDString = getValueDOM("tElementFileIDs");
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

function updateMethodNameEdit(pMethName) {
  var vMethName = pMethName || "";
  console.log("updateMethodNameEdit('"+vMethName+"')");
  //createNewMethodJS
}

function updateGlobalLibsForm2JSON() {
  console.log("updateGlobalLibsForm2JSON()");
  var vGLib = getValueDOM("tGlobalLibs") || "";
  vGLib = removeEmptyLines(vGLib);
  console.log("updateGlobalLibsForm2JSON() GLib="+vGLib);
  var vArrFile = vGLib.split("\n");
  vJSCC_DB["GlobalLibList"] = [];
  var vGLibArr = vJSCC_DB["GlobalLibList"]
  for (var i = 0; i < vArrFile.length; i++) {
    vGLibArr.push({"file":vArrFile[i],"import":true});
  };
  alert("Updated GlobalLibList:\n"+vGLib);
  //parseGlobalLibs2JSON(vGLib);
};

function parseGlobalLibs2JSON(pGLib) {
  var vGLib = pGLib || "";
  vJSCC_DB["GlobalLibList"] = [];
  if (vGLib != "") {
    vGLib = removeEmptyLines(vGLib);
    var vGLibArr = vGLib.split("\n");
    var vLinArr;
    var vImport = "";
    var vBoolean = true;
    var vID = "";
    var vHash;
    for (var i = 0; i < vGLibArr.length; i++) {
      vLinArr = (vGLibArr[i]).split("|");
      var vFileName = vLineArr[0];
      vImport = vLineArr[1] || "true";
      if (reduceVarName(vFileName) != "") {
        vID = filename2ID(vFileName);
        if (vImport == "false") {
          vBoolean = false;
        } else {
          vBoolean = true;
        };
        vJSCC_DB["GlobalLibList"].push(getDefaultLibraryHash(vFileName,vBoolean));
      }
    }
  }
};

function existsGlobalLibJS(pLibPath) {
  var vArr = vJSCC_DB["GlobalLibList"];
  var vExists = false;
  for (var i = 0; i < vArr.length; i++) {
    if (isHash(vArr[i])) {
      // Remove Blanks in GLib
      vLibPath = (vArr[i]["file"]).replace(/\s/g,"");
      if (vArr[i]["file"] == vLibPath) {
          vExists = true;
      };
    }
  };
  console.log("existsGlobalLibJS('"+pLibPath+"') = "+vExists);
  return vExists;
}

function checkGlobalLibsJSON(pGlobLibList) {
  //pGlobLibList = vJSCC_DB["tGlobalLibs"];
  var vGLib = vJSCC_DB["tGlobalLibs"]; // string with libs in JSON
  var vGLibArr = getString2Array(vGLib); // split String in Array
  var vLib = "";
  for (var i = 0; i < vGLibArr.length; i++) {
    vLib = vGLibArr[i];
    if (existsGlobalLibJS(vLib)) {
      console.log("Global Library '"+vLib+"' exists");
    } else {
      console.log("Create Library '"+vLib+"' in vJSCC_DB['GlobalLibList']");
      // true means that Lib will be import - Import Flag
      pGlobLibList.push(getDefaultLibraryHash(vLib,true))
    }
  }
};

function getDefaultLibraryHash(pLib,pImport) {
  return {
    "file": pLib,
    "import":pImport
  };
}

function updateGlobalLibsJSON2Form() {
  console.log("updateGlobalLibsForm2JSON()");
  var vArr = vJSCC_DB["GlobalLibList"];
  checkGlobalLibsJSON(vArr);
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
    vOut += vCR + vArr[i]["file"];
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
    if (vJSCC_DB[pListID]) {
      if (vJSCC_DB[pListID][pHashID]) {
        if (vJSCC_DB[pListID][pHashID][pID]) {
            vJSCC_DB[pListID][pHashID][pID] = pValue;
        } else {
          console.log("ERROR: vJSCC_DB['"+pListID+"']['"+pHashID+"']['"+pID+"'] was undefined!");
        };
      } else {
        console.log("ERROR: vJSCC_DB['"+pListID+"']['"+pHashID+"'] was undefined!");
      };
    } else {
      console.log("ERROR: vJSCC_DB['"+pListID+"'] was undefined!");
    };
};

function saveID4HashPath2JSON(pHashPath,pValue) {
  var vPathOK = true;
  var vID = "";
  var vPrevHash;
  var vHash = vJSCC_DB;
  var vLog = "vJSCC_DB";
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
  var vClass = getValueDOM("sClassList");
  var vOK = confirm("Do you want to delete class "+vClass+"()?");
  if (vOK == true) {
    deleteClass_do(pClass);
    alert("Class '"+vClass+"' deleted!");
  };
};

function deleteClass_do(pClass) {
  var vClass = pClass || getValueDOM("sClassList");
  console.log("deleteClass_do('"+vClass+"')");
  var vClassJS = getClassJSON(vClass);
  //var vOK = confirm("Do you want to delete class "+vClass+"()?");
  if (existsClassJS(vClass)) {
    delete vJSCC_DB["ClassList"][vClass];
    delete vJSCC_DB["ClassType"][vClass];
    var vArr = getArray4HashID(vJSCC_DB["ClassList"]);
    clearForm4Class();
    createClassSelect();
    if (vArr.length>0) {
        selectClass(vArr[0]);
    };
    //updateJSON2Form();
  };
};
function deleteAttributeForm() {
  var vClass = getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vAttribName = getValueDOM("sAttribList");
  console.log("deleteAttributeForm('"+vAttribName+"')");
  var vOK = confirm("Do you want to delete Method "+vMethodName+"()?");
  if (vOK == true) {
    var vArrID = ["AttribDefault","AttribComment","AttribType","AttribAccess"];
    for (var iID in vArrID) {
      if (vArrID.hasOwnProperty(iID)) {
        delete vClassJS[iID][vAttribName];
      }
    };
    updateJSON2Form(vClass); //Call: deleteAttributeForm()
  };
}

function deleteMethodForm() {
  var vClass = getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vMethodName = getValueDOM("sMethodList");
  console.log("deleteMethodForm('"+vMethodName+"')");
  var vOK = confirm("Do you want to delete Method "+vMethodName+"()?");
  if (vOK == true) {
    var vArrID = ["MethodParameter","MethodReturn","MethodCode","MethodComment","MethodAccess"];
    for (var iID in vArrID) {
      if (vArrID.hasOwnProperty(iID)) {
        delete vClassJS[iID][vMethodName];
      }
    };
    updateJSON2Form(vClass); // Call: deleteMethodForm
  };
};

function existsAttributeJS(pAttName,pClass) {
  var vClass = pClass || getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vExists = 0;
  var vArrID = ["AttribType","AttribDefault","AttribComment"];
  for (var i = 0; i < vArrID.length; i++) {
    vID = vArrID[i];
    if (vClassJS[vID].hasOwnProperty(pAttName)) {
      vExists++;
    };
  };
  return (vExists > 0)
};

function saveAttributeForm() {
  updateAttributeForm2JSON();
  alert("Attribute '"+getValueDOM("vAttribName")+"' saved!");
};

function updateAttributeTypeEdit(pAttribType) {
  console.log("updateAttributeTypeEdit('"+pAttribType+"')");
  if (isString(pAttribType)) {
    if (pAttribType == "") {
      alert("ERROR: No class for the attribute defined");
    } else {
      if (existsBasicClassJS(pAttribType)) {
        write2value("sAttribTypeList",pAttribType);
      } else if (existsClassJS(pAttribType)) {
        write2value("sAttribTypeList",pAttribType);
      } else {
        if (askCreateNew("Class",pAttribType)) {
          var vSuccess = createNewClass_do();
          alert("Class ["+pAttribType+"] created!");
        };
      }
    }
  }
}

function updateAttributeForm2JSON() {
  var vName = getValueDOM("tAttribName");
  console.log("saveAttributeForm('"+vName+"')");
  var vClassJS = getClassJSON();
  var vArrID = ["AttribType","AttribDefault","AttribComment"];
  var vID = "";
  for (var i = 0; i < vArrID.length; i++) {
    vID = vArrID[i];
    vClassJS[vID][vName] = getValueDOM("t"+vID) || "";
  };
  updateAttribListJSON2Form();
  // evaluate Attribute Access
  var vAccess = getValueDOM("sAttribAccess") || "public";
  vClassJS["AttribAccess"][vName] = vAccess;
  write2value("sAttribAccess",vAccess);
  // set Attibute Selector
  vClassJS["sAttribList"] = vName;
  createAttribSelect();
  write2value("sAttribList",vName);
  for (var i = 0; i < vArrID.length; i++) {
    vID = vArrID[i];
    write2value("t"+vID,vClassJS[vID][vName]);
  };
  autoSaveJSON();
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
      vLine = vLine.replace(/\s+=\s+/," = ");
      vOut += vLine;
      vCR = "\n";
    };
  };
  write2value("tAttributes",vOut);
  vClassJSON["tAttributes"] = vOut;
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

function getMethodHeader4Name(pClass,pMethName) {
  var vClass = pClass || getSelectedClassID();
  var vOut = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    if (vClassJS.hasOwnProperty("MethodParameter")) {
      if (vClassJS.MethodParameter.hasOwnProperty(pMethName)) {
        var vMethHash = getMethHash4Name(vClass,pMethName);
        if (isHash(vMethHash)) {
          vOut = vMethHash["name"]+"("+vMethHash["param"]+")";
          if (vMethHash["return"] != "") {
            vOut += ":"+vMethHash["return"];
          };
        };
      } else {
        console.log("ERROR: getMethodHeader4Name(pClass,pMethName) MethodParameter undefined");
      };
    };
  } else {
    console.log("ERROR: getMethodHeader4Name(pClass,pMethName) MethodParameter undefined");
  };
  return vOut;
};

function updateJSON2selectAttrib(pClass) {
  debugLog("Attrib","updateJSON2selectAttrib('"+pClass+"')");
  var vClassHash = vJSCC_DB["ClassList"][pClass];
  if (vClassHash) {
    var vAttHash = vClassHash["Att"]
  }
}

function isPrivate(pAccess) {
  return (pAccess.indexOf("vate")>0)
};

function getPrivateID(pAccess) {
  var vRet = "public";
  if (isPrivate(pAccess)) {
    vRet = "private";
  };
  return vRet;
}

function loadMethodJSON(pClass,pMethodName) {
  var vMethodName = pMethodName || "";
  vMethodName = reduceVarName(vMethodName);
  var vClass = pClass || "";
  console.log("loadMethodJSON('"+vClass+"','"+vMethodName+"')");
  if (existsClassJS(vClass)) {
    console.log("loadMethodJSON('"+vClass+"','"+vMethodName+"') - Class exists");
    var vClassJSON = getClassJSON(vClass);
    if (vMethodName != "") {
      //if (vClassJSON["MethodParameter"].hasOwnProperty(vMethodName)) {
        var vMethHash = getMethHash4Name(vClass,vMethodName);
        debugLog("Method","loadMethodJSON('"+vClass+"','"+vMethodName+"') Call - "+vMethHash["access"]+" Method '"+vMethodName+"' defined");
        console.log("loadMethodJSON('"+vClass+"','"+vMethodName+"') Call - "+vMethHash["access"]+" Method '"+vMethodName+"' defined");
        var vMethodHeader = getMethodHeader4Name(vClass,vMethodName);
        //set Method Name
        vClassJSON["sMethodList"] = vMethodName; //set Method Header
        write2value("sMethodList",vMethodName); // set Selector
        write2value("tMethodName",vMethodName); // set Selector
        //set Method Header
        vClassJSON["tMethodHeader"] = vMethodHeader;
        write2value("tMethodHeader",vMethodHeader);
        write2innerHTML("titleMethodName",vMethodHeader);
        //set Method Comment
        vClassJSON["tMethodComment"] = vMethHash["comment"];
        write2value("tMethodComment", vMethHash["comment"]);
        //set Method Return
        //vClassJSON["sReturnList"] = vMethHash["return"];
        write2value("sReturnList", vMethHash["return"]);
        //set Method Code
        vClassJSON["tMethodCode"] = vMethHash["code"];
        write2editor("MethodCode", vMethHash["code"]);
        // set Access "public" "private",...
        //if ((vMethHash["assess"]).replace(/[^a-g]/g,"") == "public") {
        //  alert((vMethHash["access"]).indexOf("vate")+" - "+ vMethHash["access"]+" Method '"+vMethodName+"' ");
        //}
        var vAccess = getPrivateID(vMethHash["access"]);
        vClassJSON["tMethodAccess"] = vAccess;
        write2value("sMethodAccess", vAccess);
        //vClassJSON["tMethodAccess"] = vMethHash["assess"];
        //write2value("sMethodAccess", vMethHash["assess"]);
        //write2value("sMethodAccess", "private");
      //} else {
      //  debugLog("Method","loadMethodJSON('"+vClass+"','"+vMethodName+"') Call - Method '"+vMethodName+"()' NOT defined");
      //};
    } else {
      //alert("loadMethodJSON('"+vClass+"','"+vMethodName+"') Call - Method Name undefined");
      debugLog("Method","loadMethodJSON('"+vClass+"','"+vMethodName+"') Call - Method Name undefined");

    };
  } else {
    console.log("loadMethodJSON('"+vClass+"','"+vMethodName+"') vClass undefined");
  }

};


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
    } else {
      debugLog("Method","saveMethodCallJS()-Call  '"+vMethodName+"' undefined in MethodArray, create New Method");
      createNewMethodJS(pClass);
    }
  };
}

function write2JSON(pID,pValue) {
  console.log("write2JSON('"+pID+"',pValue)-Call");
  var vClassJSON = getClassJSON();
  if (vClassJSON.hasOwnProperty(pID)) {
    vClassJSON[pID] = pValue;
    write2value(pID,pValue);
  } else {
    console.log("ERROR: write2JSON(pID,pValue)");
  }
};

function saveMethodForm() {
  var vMethodHeader =  getValueDOM("tMethodHeader");
  var vSuccessMSG = saveMethodForm_do(vMethodHeader);
  if (vSuccessMSG != "") {
    alert(vSuccessMSG);
  };
};

function saveMethodForm_do(pMethodHeader) {
  var vMethodHeader = pMethodHeader || getValueDOM("tMethodHeader");
  var vMethodName = getMethodName(vMethodHeader);
  var vMethodNameSel = getSelectedMethodID();
  var vClass = getSelectedFileID();
  var vAccess = getValueDOM("sMethodAccess") || "public";
  write2value("sMethodAccess",vAccess);
  var vErrorMSG = saveMethodJSON(vMethodHeader,vAccess);
  var vSuccessMSG = "";
  if (vErrorMSG == "") {
    autoSaveJSON();
    vSuccessMSG = firstUpperCase(vAccess) + " Method '"+vMethodName+"' saved!"
    console.log(vSuccessMSG);
  } else {
    alert(vErrorMSG);
  };
  return vSuccessMSG;
};

function getSelectedMethodID(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vMethodName = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    vMethodName = vClassJS["sMethodList"];
  };
  //var vMethodHeader= pMethodHeader|| getValueDOM("tMethodHeader");
  //var vMethodName = getMethodName(vMethodHeader) || "";
  //var vMethodName = getMethodName(vMethodHeader) || "";
  return vMethodName;
};

function saveMethodJSON(pMethodHeader,pAccess) {
  var vAccess = pAccess || getValueDOM("sMethodAccess") || "public";
  var vErrorMSG = "";
  var vClass = getSelectedClassID();
  var vClassJSON = getClassJSON(vClass);
  var vMethodHeader= pMethodHeader || getValueDOM("tMethodHeader");
  var vMethodName = getSelectedMethodID(vClass);
  var vMethodCode     = getValueDOM("tMethodCode");
  var vMethodComment  = getValueDOM("tMethodComment");
  if (vMethodName != "") {
    checkClassJSON(vClassJSON);
    vClassJSON["MethodAccess"][vMethodName] = vAccess;
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
    var vHashDefID = ["AttribAccess","AttribType","AttribDefault","AttribComment","MethodAccess","MethodComment","MethodReturn","MethodCode","MethodParameter"];
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

function updateJSON2Form(pClass,pFile,pPageType,pPage) {
  var vClass = pClass || getSelectedClassID();
  var vFile  = pFile  || getSelectedFileID();
  var vPageType = pPageType || getSelectedPageTypeID();
  var vPage = pPage || getSelectedPageID();
  var vDatabase = getSelectedDatabaseID();
  console.log("updateJSON2Form('"+pClass+"','"+pFile+"','"+pPageType+"')");
  updateBasicClassJSON2Form();
  //--- Create Selectors
  createFileSelect(vFile);
  createClassSelect(vClass);
  createPageSelect(vPage);
  createPageTypeSelect(vPageType);
  createElementsDBSelect();
  checkDatabaseListJSON();
  createDatabaseSelect(vDatabase);
  //--- Call of updateClassJSON2Form(vClass)
  //--- writes the UML-Mapper-List in tClasses
  updateClassJSON2Form(vClass);
  updateFileListJSON2Form(vFile);
  //updateElementsFileJSON2Form(vFile);
  updateButtonJSON2Form();
  updateGlobalLibsJSON2Form();
  updateDatabasesJSON2Form();
  populateForm2TemplateJSON();
}

function X_updateJSON2Form(pClass,pFile) {
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
  //updateJSON2tAttributes(vClass);
  updateAttribJSON2Form(vClass);
  //updateJSON2tMethods(vClass);
  updateMethodsJSON2Form(vClass);

};

function updateFileListJSON2Form() {
  var vArrFile = getArray4HashID(vJSCC_DB["FileList"]);
  write2value("tHTMLfiles",vArrFile.join("\n"));;
};

function updateBasicClassJSON2Form() {
  var vHash = vJSCC_DB["BasicClasses"];
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
  var vMethodName = getSelectedMethodID(vClass) || "";
  console.log("updateJSON2Form('"+vClass+"','"+vFile+"') MethodName='"+vMethodName+"'");
  var vContent = "";
  var vID = "";
  if (vMethodName != "") {
    console.log("updateJSON2EditorContent: [MethodCode]!");
    if (existsClassJS(vClass)) {
      vContent = vJSCC_DB["ClassList"][vClass]["MethodCode"][vMethodName];
    } else {
      vContent = "";
    }
    write2value("tMethodCode",vContent);
    setEditorValue("iMethodCode",vContent);
  };
  //var vEdIDArr = ["MethodCode","PageHTML","PageTypeHTML","ElementHTML"];
  for (var i = 1; i < vEdIDArr.length; i++) {
    vID = vEdIDArr[i];
    vContent = vJSCC_DB["t"+vID];
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
        var vHash = vJSCC_DB["ClassList"][pClass]["AttribDefault"];
        console.log("switch 'tAttributes'");
        for (var iID in vHash) {
          if (vHash.hasOwnProperty(iID)) {
            vOut += vCR+ iID + " = "+(vHash[iID]).replace(/^\s/g,"");
            vCR = "\n";
          };
        };
      break;
      case "tMethods":
        var vHash = vJSCC_DB["ClassList"][pClass]["MethodParameter"];
        console.log("switch 'tMethods'");
        var vRetHash = vJSCC_DB["ClassList"][pClass]["MethodReturn"];
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
  vJSCC_DB["ClassList"][vClass]["t"+vID] = vContent;
  for (var i = 1; i < vEdIDArr.length; i++) {
    vID = vEdIDArr[i];
    vContent = getEditorValue("i"+vID);
    if (vContent) {
      console.log("copyEditorValue2TextArea(): copy Editor Content for [i"+vID+"] to textarea!");
      write2value("t"+vID,vContent);
      vJSCC_DB["t"+vID] = vContent;
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
  if (existsClassJS(pClass)) {
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
    createMethodSelect(pClass,vMethName);
  }
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
  // write the method list to textarea
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
  updateForm_DOM2JSON(vClass);
  // load the defined Attribute and Methodsfrom Form
  console.log("(1) updateForm2JSON('"+vClass+"') >> updateForm2AttribJSON()");
  updateForm2AttribJSON(vClass);
  console.log("(2) updateForm2JSON('"+vClass+"') >> uupdateForm2MethodJSON()");
  updateForm2MethodJSON(vClass);
  console.log("(3) updateForm2JSON('"+vClass+"') >> updateFormGlobal2JSON()");
  updateFormGlobal2JSON();
  console.log("(4) updateForm2JSON('"+vClass+"') >> set Selected IDs");
  vJSCC_DB["SelectedClass"] = getValueDOM("sClassList") || "";
  vJSCC_DB["SelectedPage"] = getValueDOM("sPageHTML") || "";
  vJSCC_DB["SelectedPageType"] = getValueDOM("sPageTypeHTML") || "";
  vJSCC_DB["SelectedButton"] = getValueDOM("sButtonHTML") || "";
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
