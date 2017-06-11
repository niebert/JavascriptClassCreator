function debugLog(pDebugID,pMessage) {
  if (vDebug == pDebugID) {
    console.log(pMessage);
  } else if (vDebug == "ALL"){
    console.log(pMessage);
  };
};

function setCheckBox(pID,pValue) {
  var vNode = document.getElementById(pID);
  if (vNode) {
    vNode.checked = pValue;
  } else {
    console.log("CheckBox ["+pID+"] not found in DOM - setCheckBox('"+pID+"',"+pValue+")");
  };
};

function getCheckBox(pID) {
  var vReturn = false;
  var vNode = document.getElementById(pID);
  if (vNode) {
    if (vNode.checked) {
      console.log("CheckBox ["+pID+"] is CHECKED");
    } else {
      console.log("CheckBox ["+pID+"] is NOT checked!");
    };
    vReturn = vNode.checked;
  } else {
    console.log("CheckBox ["+pID+"] not found in DOM");
  };
  return vReturn;
};


function createOptions4Hash(pHash) {
  var vOptions = "";
  if (isHash(pHash)) {
    for (var key in pHash) {
      if (pHash.hasOwnProperty(key)) {
        vOptions +="<option value='"+key+"'>"+pHash[key]+"</option>\n";

      }
    };
  } else {
    console.log("ERROR: createOptions4Hash()-Call pHash undefined");
  };
  return vOptions;
};


function createOptions4Array(pArray) {
  var vOptions = "";
  if (isArray(pArray)) {
    for (var i = 0; i < pArray.length; i++) {
        vOptions +="<option>"+pArray[i]+"</option>\n";
    };
  } else {
    console.log("ERROR: createOptions4Array()-Call pArray undefined");
  }
  return vOptions;
};

function write2options(pID,pArrID) {
  console.log("write2options('"+pID+"',pArrID)");
  var vArray = pArrID || [];
  vArray.sort();
  write2innerHTML(pID,createOptions4Array(vArray));
};

function existsMethodJS(pClass,pMethID) {
  var vMethID = pMethID || "";
  var vExists = false;
  if (existsClassJS(pClass)) {
    var vClassJS = getClassJSON(pClass);
    if (vMethID != "") {
      if (vClassJS["MethodParameter"].hasOwnProperty(vMethID)) {
        vExists = true;
      } else if (vClassJS["MethodReturn"].hasOwnProperty(vMethID)) {
        vExists = true;
      };
    };
  };
  return vExists;
};

function createMethodSelect(pClass,pMethID) {
  // get all Methods in JSON Database of all Classes
  console.log("");
  var vClass = pClass || getSelectedClassID();
  var vMethID = "";
  var vAccess = "";
  var vMethodHeader = "";
  var vReturn = "";
  var vComment = "";
  var vParameter = "";
  var vCode = "";
  var vArray = [];
  if (existsClassJS(vClass)) {
    var vClassJSON = getClassJSON(vClass);
    var vArray = getArray4HashID(vClassJSON["MethodCode"]); //getMethodNameArray();
    var vMethCodeHash = vClassJSON["MethodCode"];
    var vMethCommentHash = vClassJSON["MethodComment"];
    vMethID = pMethID || vClassJSON["sMethodList"] || vArray[0] || "";
    vClassJSON["sMethodList"] = vMethID;
    if (existsMethodJS(vClass,vMethID)) {
      console.log("createMethodSelect('"+vClass+"','"+vMethID+"') Method defined");
      vAccess = vClassJSON["MethodAccess"][vMethID] || "";
      if (vAccess == "") {
        vAccess = "public";
        vClassJSON["MethodAccess"][vMethID] = "public";
      };
      vParam = vClassJSON["MethodParameter"][vMethID];
      vComment = vClassJSON["MethodComment"][vMethID];
      vReturn = vClassJSON["MethodReturn"][vMethID];
      vCode = vClassJSON["MethodCode"][vMethID];
      vMethodHeader = getMethodHeader4Name(vClass,vMethID);
      vClassJSON["tMethodHeader"] = vMethodHeader;
    } else {
      console.log("ERROR: createMethodSelect('"+vClass+"','"+vMethID+"') Method UNDEFINED");
    };
  };
  write2options("sMethodList",vArray);
  write2value("sMethodList",vMethID);
  write2value("tMethodName",vMethID);
  write2value("sMethodAccess",vAccess);
  write2value("tMethodHeader",vMethodHeader);
  write2innerHTML("titleMethodName",vMethodHeader);
  write2value("tMethodCode",vCode);
  write2value("tMethodReturn",vReturn);
  write2value("tMethodComment",vComment || "");
};

function createAttribSelect(pClass,pAtt) { // TA=TextArea
  var vClass = pClass || getValueDOM("tClassname") || "";
  if (vClass != "") {
    var vClassJS = getClassJSON(vClass);
    var vArray = getAttribNameArray();
    var vAttDefaultHash = getForm2AttribDefaultHash(vClass); //classes.js:484
    var vAttCommentHash = getAttribCommentHash(vAttDefaultHash);
    var vSelectedAtt = pAtt || vClassJS["sAttribList"] || vArray[0] || "";
    console.log("createAttribSelect()-Call: vSelectedAtt='"+vSelectedAtt+"'");
    var vAttDefault = vClassJS["AttribDefault"][vSelectedAtt] || vAttDefaultHash[vSelectedAtt] || "";
    var vAttComment = vClassJS["AttribComment"][vSelectedAtt] || vAttCommentHash[vSelectedAtt] || "";
    var vAttType = vClassJS["AttribType"][vSelectedAtt] || getValueDOM("tAttribType") || "";
    // Set the Selected Type for the Attribute
    write2value("sAttribTypeList",vAttType);
    // create Options for the Attribute Selector
    write2options("sAttribList",vArray);
    // set the Selector to the selected attribute
    write2value("sAttribList",vSelectedAtt);
    // set the Name of the Attribute
    write2value("tAttribName",vSelectedAtt);
    // set the default value of the Attribute
    write2value("tAttribDefault",vAttDefault);
    // set the Comment of the Attribute
    write2value("tAttribComment",vAttComment);
  } else {
    clearForm4Attribute();
  };
};

function getSelectedClassID() {
  return getValueDOM("tClassname") || getValueDOM("sClassList") || "UndefClass";
};

function getSelectedElement4File(pFile) {
  var vID = "";
  if (existsFileJS(pFile)) {
    vID = vJSCC_DB["FileList"][pFile]["tElementsID"];
  };
  return vID;
}
function getSelectedClassJSON(pClassName) {
  var vSelectedClass = pClassName || getSelectedClassID();
  console.log("getClassJSON='"+vSelectedClass+"'");
  return getClassJSON(vSelectedClass);
}

function updateForm_DOM2JSON(pClass) {
  // get all Value from DOM and save Values  in JSON Database of selected Class
  var vClass = pClass || getSelectedClassID();
  if (existsFileJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    console.log("updateForm_DOM2JSON()-Call: vDOM_ID stored in vJSCC_DB");
    for (var i = 0; i < vDOM_ID.length; i++) {
      vClassJS[vDOM_ID[i]] = getValueDOM(vDOM_ID[i]) || "";
    };
  } else {
    console.log("ERROR: updateForm_DOM2JSON('"+vClass+"')");
  };
};

function updateDOM_JSON2Form() {
  // get all Value from DOM and save Values  in JSON Database of selected Class
  var vClassName = getSelectedClassID();
  var vClassJS = getClassJSON();
  var vContent = "";
  console.log("updateDOM_JSON2Form()-Call: vDOM_ID in JSON stored in Form");
  for (var i = 0; i < vDOM_ID.length; i++) {
    if (vClassJS[vDOM_ID[i]]) {
      vContent = vClassJS[vDOM_ID[i]];
      write2value(vDOM_ID[i],vContent);
    }
  };
};

function updateFormGlobal2JSON() {
  console.log("updateFormGlobal2JSON()-Call: vDOM_Global stored in vJSCC_DB");
  for (var i = 0; i < vDOM_Global.length; i++) {
    vJSCC_DB[vDOM_Global[i]] = getValueDOM(vDOM_Global[i]) || "";
  };
}

function updateGlobalJSON2Form() {
  console.log("updateGlobalJSON2Form()-Call: write vDOM_Global in JSON to Form");
  var vContent = "";
  for (var i = 0; i < vDOM_Global.length; i++) {
    if (vJSCC_DB[vDOM_Global[i]]) {
      vContent = vJSCC_DB[vDOM_Global[i]];
      write2value(vDOM_Global[i],vContent);
    };
  };
};

function createFileSelect(pFileID) {
  console.log("createFileSelect('"+pFileID+"')");
  var vArrID = getArray4HashID(vJSCC_DB["FileList"]);
  createFileSelect4Array(vArrID);
  if (pFileID) {
    if (existsFileJS(pFileID)) {
      selectFileJS(pFileID);
    };
  };
};

function createFileSelect4Array(pFileArr) {
  console.log("createFileSelect()");
  var vArray = pFileArr || getAllFilesArray(); //classes.js 1289
  //var vArray = insertArray1Empty(vArr)
  if (vArray.length == 0) {
    vArray.push("app.html");
  };
  vArray.sort();
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sFileList",vOptions);
  write2innerHTML("sFileListHTML",vOptions);
  write2innerHTML("sFileHTML",vOptions);
  var vName =  vJSCC_DB["SelectedFile"] || "";
  if (vArray.length>1) {
    if (vName == "") {
      vName = vArray[1];
    };
  };
  write2value("tFilename",vName);
  writeFileTitle(vName);
  createElementsFileSelect(vName);
};

function createAttribTypeSelect() {
  // get all Methods in JSON Database of all Classes
  console.log("createAttribTypeSelect()-Call");
  var vArr = getAllClassesArray(); //classes.js 1274
  vArr.sort();
  var vArray = insertArray1Empty(vArr)
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sAttribTypeList",vOptions);
  write2innerHTML("sReturnList",vOptions);
  var vName = getValueDOM("tAttribName");
  var vAttribHash = getForm2AttribDefaultHash(); //classes.js:484
  var vAttDefault = vAttribHash[vName] || "";
  if (reduceVarName(vName) == "") {
    vAttDefault = "";
  };
  write2value("tAttribDefault",vAttDefault);
  var vMethodname = getValueDOM("sMethodList") || "";
  var vClassJS = getClassJSON();
  if (vClassJS.hasOwnProperty("MethodReturn") &&  vClassJS["MethodReturn"].hasOwnProperty(vMethodname)) {
    write2value("sReturnList",vClassJS["MethodReturn"][vMethodname]);
  }
};

function createClassSelect(pClass) {
  var vArrID = getArray4HashID(vJSCC_DB["ClassList"]);
  createClassSelect4Array(vArrID);
  if (pClass) {
    selectClass_do(pClass);
  };
}

function createClassSelect4Array(pArray) {
  // get all Methods in JSON Database of all Classes
  console.log("createClassSelect()-Call");
  var vArray = pArray || getArray4HashID(vJSCC_DB["ClassList"]);
  vArray.sort();
  var vOptions = createOptions4Array(vArray);
  var vArraySupCla = insertArray1Empty(vArray);
  write2innerHTML("sClassList",vOptions);
  write2innerHTML("sClassCode",vOptions);
  write2innerHTML("sAppClassHTML",vOptions);
  vOptions = createOptions4Array(vArraySupCla);
  write2innerHTML("sSuperClassname",vOptions);
  write2value("sSuperClassname",getValueDOM("tSuperClassname"));
};

function createPageSelect(pPageID) {
  var vArrID = getArray4HashID(vJSCC_DB["PageList"]);
  createPageSelect4Array(vArrID);
  write2value("tPages", getPageListString());
  if (pPageID) {
    if (existsPageJS(pPageID)) {
      selectPageJS(pPageID);
    };
  };
};

function createPageSelect4Array(pArrID) {
  // get all Methods in JSON Database of all Classes
  console.log("createPageSelect4Array()-Call");
  var vArray = pArrID || getArray4HashID(vJSCC_DB["PageList"]);
  vArray.sort();
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sPageHTML",vOptions);
  vArray = insertArray1Empty(vArray);
  vOptions = createOptions4Array(vArray);
  write2innerHTML("sParentPage",vOptions);
  var vPageID = getValueDOM("tPageID");
  setSelectedPage(vArray,vPageID);
};

function setSelectedPage(pArray,pPageID) {
  var vSelectedID = pArray[0] || "";
  for (var i = 0; i < pArray.length; i++) {
    if (pPageID == pArray[i]) {
      // pPageID is listed in array
      // i.e page is existing in vJSCC_DB
      vSelectedID = pPageID;
    };
  };
  write2value("sPageHTML",vSelectedID);
  if (vSelectedID != "") {
    selectPageJS(vSelectedID);
  };
};

function createPageTypeSelect(pPageTypeID) {
  // get all Methods in JSON Database of all Classes
  console.log("createPageTypeSelect()-Call");
  var vArrID = getArray4HashID(vJSCC_DB["PageTypeList"]);
  var vPageTypeID = pPageTypeID || vArrID[0] || "";
  createPageTypeSelect4Array(vArrID);
  // set tPageTypes
  var vCutAtEnd = 0;
  write2value("tPageTypes",getHash4Record2String(vPageTypeRECDEF,vJSCC_DB["PageTypeList"],vCutAtEnd));
  if (vPageTypeID == "") {
    clearPageTypeForm();
  } else if (existsPageTypeJS(vPageTypeID)) {
    selectPageTypeJS(vPageTypeID);
  } else {
    clearPageTypeForm();
  };
};

function createPageTypeSelect4Array(pArrID) {
  // get all Methods in JSON Database of all Classes
  var vSelPageType = getValueDOM("sPageTypeHTML");
  console.log("createPageTypeSelect4Array()-Call");
  var vArrID = pArrID || getArray4HashID(vJSCC_DB["PageTypeList"]);
  vArrID.sort();
  //updatePageTypeJSON2Form(vArray);
  var vArray = insertArray1Empty(vArrID);
  var vOptions = createOptions4Array(vArrID);
  var vOptions1Empty = createOptions4Array(vArray);
  write2innerHTML("sPageTypeHTML",vOptions);
  write2innerHTML("sPageType4Page",vOptions);
};

function setSelectedPageType(pArray,pPageTypeID) {
  console.log("setSelectedPageType(pArray,'"+pPageTypeID+"')");
  var vSelectedID = pArray[1] || "";
  for (var i = 0; i < pArray.length; i++) {
    if (pPageTypeID == pArray[i]) {
      // pPageTypeID is listed in array
      // i.e page type is existing in vJSCC_DB
      vSelectedID = pPageTypeID;
    };
  };
  write2value("sPageTypeHTML",vSelectedID);
  if (vSelectedID != "") {
    selectPageTypeJS(vSelectedID);
  };
};

function insertArray1Empty(pArr) {
  var vFirstEmpty = [""];
  pArr = vFirstEmpty.concat(pArr);
  return pArr;
};

function getDatabaseIDHash() {
  var vDBList = cloneJSON(vJSCC_DB["DBID2File"]);
  for (var iDB in vDBList) {
    if (vDBList.hasOwnProperty(iDB)) {
      vDBList[iDB] = getNameExt(vDBList[iDB]);
    };
  };
  return vDBList;
}

function getDatabaseFilePathArray() {
  var vArr = [];
  var vDBList = vJSCC_DB["DBID2File"];
  for (var iDB in vDBList) {
    if (vDBList.hasOwnProperty(iDB)) {
      console.log("getDatabaseFilePathArray() "+vDBList[iDB]);
      vArr.push(vDBList[iDB]);
    };
  };
  return vArr;
}


function createDatabaseSelect(pDatabaseID) {
  var vDBList = getDatabaseIDHash();
  console.log("createDatabaseSelect()-Call\n"+stringifyJSON(vDBList));
  var vOptions = createOptions4Hash(vDBList);
  write2innerHTML("sDatabaseTAB",vOptions);
  write2innerHTML("sDatabaseList",vOptions);
  var vDBID = firstKey4Hash(vDBList);
  if (pDatabaseID) {
    if (existsDatabaseJS(vDBID)) {
      vDBID = pDatabaseID;
    };
  };
  if (vDBID != "") {
    selectDatabaseJSON(vDBID);
  };
  //--- Update DatabaseList in Files/Classes ---
  var vArr = getDatabaseFilePathArray();
  vJSCC_DB["tDatabases"] = vArr.join("\n");
  write2value("tDatabases",vArr.join("\n"));
};

function createDatabaseSelect4Array(pArray) {
  // Create a Select for all Databases
  console.log("createDatabaseSelect4Array()-Call");
  var vArray = pArray || getDatabaseArray();
  vArray.sort();
  var vEmptySel = [""];
  var vArrayEmptySel = vEmptySel.concat(vArray);
  var vOptions = createOptions4Array(vArrayEmptySel);
  write2innerHTML("sDatabases",vOptions);
};


function createSelector4Array2ID(pID,pArray) {
  // get all Methods in JSON Database of all Classes
  console.log("createSelector4Array2ID('"+pID+"',pArray)");
  if (pID && pArray) {
    var vOptions = createOptions4Array(pArray);
    write2innerHTML(pID,vOptions);
  }
};

function createButtonSelect(pArray) {
  // get all Methods in JSON Database of all Classes
  console.log("createButtonSelect-Call");
  var vArray = pArray || getButton1EmptyArray();  //classes.js 418
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sButtonHTML",vOptions);
  createHeaderButtonSelect(vArray);
  //update PageTypes to select the Button Selectors Left and Right angain
  // according to vJSON Definition
  //selectButtonJS(vJSCC_DB["SelectedButton"]);
  var vButtonID = getValueDOM("tButtonID");
  setSelectedButton(vArray,vButtonID);
};


function setSelectedButton(pArray,pButtonID) {
  var vSelectedID = pArray[0] || "";
  for (var i = 0; i < pArray.length; i++) {
    if (pButtonID == pArray[i]) {
      // pPageTypeID is listed in array
      // i.e page type is existing in vJSCC_DB
      vSelectedID = pButtonID;
    };
  };
  write2value("sButtonHTML",vSelectedID);
  if (vSelectedID != "") {
    selectButtonJS(vSelectedID);
  };
};

function createHeaderButtonSelect(pButtArrID) {
  // get all Methods in JSON Database of all Classes
  var vPageTypeID = getSelectedPageTypeID();
  var vButtArrID = pButtArrID || getArray4HashID(vJSCC_DB["ButtonList"]);
  console.log("createHeaderButtonSelect()-Call with PageType='"+vPageTypeID+"'");
  var vOptions = "<option> </option>";
  var vButtonID = "";
  var vPageID = "";
  var vCR = "";
  // Insert the defined Header Buttons
  var vPrefix = "Button: ";
  for (var i = 0; i < vButtArrID.length; i++) {
    vButtonID = vButtArrID[i];
    if (vButtonID == "") {
      vOptions += vCR + getHeadOption("",vButtonID);
    } else {
      vOptions += vCR + getHeadOption(vPrefix,vButtonID);
    };
    vCR = "\n";
  };
  // Insert the defined Header Page Links
  var vPageArr = getArray4HashID(vJSCC_DB["PageList"]);
  vPrefix = "Show Page: ";
  for (var i = 0; i < vPageArr.length; i++) {
    vPageID = vPageArr[i];
    if (vPageID != "") {
      vOptions += vCR + getHeadOption(vPrefix,vPageID);
      vCR = "\n";
    };
  };
  write2innerHTML("sButtonHeader1",vOptions);
  write2innerHTML("sButtonHeader2",vOptions);
  if (existsPageTypeJS(vPageTypeID)) {
    var vPagTypHash = vJSCC_DB["PageTypeList"][vPageTypeID];
    write2value("sButtonHeader1",vPagTypHash["HEADER_BUTTON1"]);
    write2value("sButtonHeader2",vPagTypHash["HEADER_BUTTON2"]);
  };
};

function getHeadOption(pPrefix,pValue) {
  return "<option value=\""+pValue+"\">"+pPrefix+pValue+"</option>";
};

function createMethodSelect4JSON() {
  // get all Methods in JSON Database of all Classes
  console.log("createMethodSelect4JSON()-Call");
  var vClassJS = getClassJSON();
  var vArr = getArray4HashID(vClassJS["MethodParameter"]);
  createButtonSelect(vArr);
};

function writeClassTitle(pClassName) {
  write2innerHTML("titleClassName",pClassName);
  write2innerHTML("titleClassNameTab",pClassName);
  write2innerHTML("titleClassNameAttrib",pClassName);
  write2innerHTML("titleClassNameMethod",pClassName);
  //write2innerHTML("titleClassAttributes",pClassName);
  //write2innerHTML("titleClassMethods",pClassName);
  write2innerHTML("codeClassName",pClassName);
};
