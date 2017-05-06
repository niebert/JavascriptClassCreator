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

function createOptions4Array(pArray) {
  var vOptions = "";
  if (pArray) {
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

function createMethodSelect() {
  // get all Methods in JSON Database of all Classes
  var vClassJSON = getClassJSON();
  console.log("createMethodSelect()-Call");
  var vArray = getMethodNameArray();
  write2options("sMethodList",vArray);
  var vMethHash = getMethodHash();
  var vMethCodeHash = vClassJSON["MethodCode"];
  var vMethCommentHash = vClassJSON["MethodComment"];
  var vMethID = vArray[0];
  vClassJSON["sMethodList"] = vMethID;
  var vMethodHeader = vMethHash[vMethID] || "";
  write2value("tMethodHeader",vMethodHeader);
  write2innerHTML("titleMethodName",vMethodHeader);
  write2value("tMethodCode",vMethCodeHash[vMethID] || "");
  write2value("tMethodComment",vMethCommentHash[vMethID] || "");
};


function createAttribSelect() { // TA=TextArea
  var vClassJS = getClassJSON();
  var vClass = getValueDOM("tClassname");
  var vArray = getAttribNameArray();
  var vAttDefaultHash = getForm2AttribDefaultHash(vClass); //classes.js:484
  var vAttCommentHash = getAttribCommentHash(vAttDefaultHash);
  var vSelectedAtt = vClassJS["sAttribList"] || vArray[0] || "";
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
};

function getSelectedClassID() {
  return getValueDOM("tClassname") || getValueDOM("sClassList") || "UndefClass";
};

function getSelectedClassJSON(pClassName) {
  var vSelectedClass = pClassName || getSelectedClassID();
  console.log("getClassJSON='"+vSelectedClass+"'");
  return getClassJSON(vSelectedClass);
}

function updateForm_DOM2JSON() {
  // get all Value from DOM and save Values  in JSON Database of selected Class
  var vClassName = getSelectedClassID();
  var vClassJS = getClassJSON();
  console.log("updateForm_DOM2JSON()-Call: vDOM_ID stored in vJSON_JS");
  for (var i = 0; i < vDOM_ID.length; i++) {
    vClassJS[vDOM_ID[i]] = getValueDOM(vDOM_ID[i]) || "";
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
  console.log("updateFormGlobal2JSON()-Call: vDOM_Global stored in vJSON_JS");
  for (var i = 0; i < vDOM_Global.length; i++) {
    vJSON_JS[vDOM_Global[i]] = getValueDOM(vDOM_Global[i]) || "";
  };
}

function updateGlobalJSON2Form() {
  console.log("updateGlobalJSON2Form()-Call: write vDOM_Global in JSON to Form");
  var vContent = "";
  for (var i = 0; i < vDOM_Global.length; i++) {
    if (vJSON_JS[vDOM_Global[i]]) {
      vContent = vJSON_JS[vDOM_Global[i]];
      write2value(vDOM_Global[i],vContent);
    };
  };
};

function createFileSelect(pFileArr) {
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
  var vName =  vJSON_JS["SelectedFile"] || "";
  if (vArray.length>1) {
    if (vName == "") {
      vName = vArray[1];
    };
  };
  write2value("tFilename",vName);
  writeFileTitle(vName);
  createElementSelect();
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
  write2value("tAttribDefault",vAttribHash[vName]);
  var vMethodname = getValueDOM("sMethodList") || "";
  var vClassJS = getClassJSON();
  if (vClassJS.hasOwnProperty("MethodReturn") &&  vClassJS["MethodReturn"].hasOwnProperty(vMethodname)) {
    write2value("sReturnList",vClassJS["MethodReturn"][vMethodname]);
  }
};

function createClassSelect(pArray) {
  // get all Methods in JSON Database of all Classes
  console.log("createClassSelect()-Call");
  var vArray = pArray || getClassArray();
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

function getArray4HashID(pHash) {
  var vHash = pHash || {};
  var vArray = [];
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vArray.push(iID)
    };
  };
  return vArray
};

function createPageSelect(pArrID) {
  // get all Methods in JSON Database of all Classes
  console.log("createPageSelect()-Call");
  var vArray = pArrID || getArray4HashID(vJSON_JS["PageList"]);
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
      // i.e page is existing in vJSON_JS
      vSelectedID = pPageID;
    };
  };
  write2value("sPageHTML",vSelectedID);
  if (vSelectedID != "") {
    selectPageJS(vSelectedID);
  };
};

function createPageTypeSelect(pArrID) {
  // get all Methods in JSON Database of all Classes
  var vSelPageType = getValueDOM("sPageTypeHTML");
  console.log("createPageTypeSelect()-Call");
  var vArrID = pArrID || getArray4HashID(vJSON_JS["PageType"]);
  vArrID.sort();
  //updatePageTypeJSON2Form(vArray);
  var vArray = insertArray1Empty(vArrID);
  var vOptions = createOptions4Array(vArray);
  write2innerHTML("sPageTypeHTML",vOptions);
  write2innerHTML("sPageType4Page",vOptions);
  var vPageTypeID = getValueDOM("tPageTypeID");
  setSelectedPageType(vArray,vPageTypeID);
};

function setSelectedPageType(pArray,pPageTypeID) {
  console.log("setSelectedPageType(pArray,'"+pPageTypeID+"')");
  var vSelectedID = pArray[1] || "";
  for (var i = 0; i < pArray.length; i++) {
    if (pPageTypeID == pArray[i]) {
      // pPageTypeID is listed in array
      // i.e page type is existing in vJSON_JS
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

function createDatabaseSelect(pArray) {
  // Create a Select for all Databases
  console.log("createDatabaseSelect()-Call");
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
  //selectButtonJS(vJSON_JS["SelectedButton"]);
  var vButtonID = getValueDOM("tButtonID");
  setSelectedButton(vArray,vButtonID);
};


function setSelectedButton(pArray,pButtonID) {
  var vSelectedID = pArray[0] || "";
  for (var i = 0; i < pArray.length; i++) {
    if (pButtonID == pArray[i]) {
      // pPageTypeID is listed in array
      // i.e page type is existing in vJSON_JS
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
  var vButtArrID = pButtArrID || getArray4HashID(vJSON_JS["ButtonList"]);
  console.log("createHeaderButtonSelect-Call");
  var vOptions = "";
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
  var vPageArr = getPageListArray();
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
}

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
  write2innerHTML("titleClassAttributes",pClassName);
  write2innerHTML("titleClassMethods",pClassName);
  write2innerHTML("codeClassName",pClassName);
};
