// This library performs the actions on select events
// Options are created in dom.js
function selectClassCode() {
  var vClass = getValueDOM("sClassCode");
  console.log("selectClassCode('"+vClass+"')-Call");
  selectClass(vClass);
  createCode4Class();
}

function selectFilenameHTML(pFileName) {
  selectFilenameHTML_do(pFileName);
  $( "#tabHTML").trigger( "click" );
}

function selectFilenameHTML_do(pFile) {
  var vCurrentFile = getValueDOM("tFilename");
  var vFile = pFile || getValueDOM("sFileList");
  console.log("selectFilenameHTML()-Call: Current File '"+vCurrentFile+"' - Selected File '"+vFile+"'.");
  write2value("sFileListHTML",vCurrentFile);
  write2value("sFileList",vCurrentFile);
  write2value("sFileHTML",vCurrentFile);
  write2value("tFilename",vCurrentFile);
  updateFileForm2JSON(vCurrentFile);
  // following command is inserted for the first startup
  if (vJSCC_DB["FileList"][vFile]) {
    console.log("File '"+vFile+"' exists in selectFile()-Call");
  } else {
    console.log("selectFile()-Call: Undefined File '"+vFile+"' - use old class '"+vCurrentFile+"'.");
    vFile = vCurrentFile;
  };
  vJSCC_DB["SelectedFile"] = vFile;
  vFileJSON = vJSCC_DB["FileList"][vFile];
  clearForm4File(vFile);
  console.log("selectFile()-Call Selected File: "+getValueDOM("tFilename")+" Attributes="+getValueDOM("tAttributes"));
  fillForm4File(vFile);
  write2value("sFileListHTML",vFile);
  write2value("sFileList",vFile);
  write2value("sFileHTML",vFile);
  write2value("tFilename",vFile);
  createElementsFileSelect(vFile);
  var vSelectedElement = getValueDOM("sElementsFileList") || "";
  if (vSelectedElement == "") {
    var vElementNameArr = getElementNameArray();
    if (vElementNameArr.length > 0) {
      write2value("sElementsFileList",vElementNameArr[0]);
      selectJSElements();
    };
  };
  writeFileTitle(vFile);
  checkMainAppClass4File();
  //updateFileSelectors(vFile);
  //setFileSelectorDefault(vFile);
  createCode4JSON_JS(vJSCC_DB);
};

function updateFileForm2JSON(pFile) {
  var vFile = pFile || "";
  if ((pFile != "") && (existsFileJS(pFile))) {
    var vID = "";
    for (var i = 0; i < vDOM_File.length; i++) {
      vID = vDOM_File[i];
      vJSCC_DB["FileList"][vFile][vID] = getValueDOM(vID);
    };
    // update the definition of current selected ELEMENT as well
    updateFormElement2JSON(vFile);
  }
};

function showClassTab(pClass) {
  var vClass = pClass || getSelectedClassID();
  $( "#tabClass" ).trigger( "click" );

}

function showAttributes(pClass) {
  var vClass = pClass || getSelectedClassID();
  $( "#tabAttributes" ).trigger( "click" );
  updateForm2AttribJSON();
  createAttribTypeSelect();
}

function showMethods(pClass) {
  var vClass = pClass || getSelectedClassID();
  $( "#tabMethods" ).trigger( "click" );
  updateForm2MethodJSON();
}

function updateFormElement2JSON(pFile) {
  var vFile = pFile || getSelectedFileID();
  var vElementID = getValueDOM("sElementsFileList") || "";
  if (vElementID != "") {
    if (vJSCC_DB["FileList"][vFile]["elements"]) {
      vJSCC_DB["FileList"][vFile]["elements"] = getEditorValue("iElementHTML");
    } else {
      console.log("ERROR: elements for file '"+vFile+"' undefined");
    };
  };
};


function getSelectedFileHash() {
  var vFile = getSelectedFilenameHTML();
  var vHash;
  if (vJSCC_DB["FileList"] && vJSCC_DB["FileList"][vFile]) {
    vHash = vJSCC_DB["FileList"][vFile];
  } else {
    console.log("ERROR: getSelectedFileHash() for FileList for '"+vFile+"' undefined!");
  };
  return vHash
};

function selectJSElements() {
  console.log("selectJSElements() TODO");
  //getArray4HashID()
};

function clearForm4Attribute() {
  console.log("clearForm4Attribute()");
  var vArrID = ["sAttribTypeList","sAttribList","tAttribName","tAttribDefault","tAttribComment"];
  clearIDs4DOM(vArrID);
  setEditorValue("iElementHTML","");
  write2innerHTML("sElementsFileList","");
};


function clearForm4File() {
  console.log("clearForm4File()");
  var vArrID = ["sFileListHTML","tFilename","tElementFileIDs","sElementsFileList","tElementID","tElementHTML"];
  clearIDs4DOM(vArrID);
  setEditorValue("iElementHTML","");
  write2innerHTML("sElementsFileList","");
};

function getElementNameArray(pFile) {
  console.log("getElementNameArray() from vJSCC_DB");
  var vFile = pFile || getSelectedFilenameHTML();
  var vElemArrID = []
  if (existsFileJS(vFile)) {
    var vFileHash = vJSCC_DB["FileList"][vFile];
    if (vFileHash.hasOwnProperty("elements")) {
      var vElemHash = vFileHash["elements"];
      for (var iID in vElemHash) {
        if (vElemHash.hasOwnProperty()) {
          vElemArrID.push(iID);
        }
      }
    }
  };
  return vElemArrID;
};

function writeFileTitle(pFileName) {
  console.log("writeFileTitle('"+pFileName+"')");
  write2innerHTML("titleFileName",pFileName);
  write2innerHTML("titleFileNameTab",pFileName);
  write2innerHTML("titleFileNamePages",pFileName);
  write2innerHTML("titleFileNameElements",pFileName);
};

function updateFileSelectors(pFileName) {
  console.log("updateFileSelectors('"+pFileName+"') Argument is the selected file");
  var vFileArr = getFileNameListJSON();
  createFileSelect(vFileArr);
};

function getFileNameListJSON() {
  console.log("getFileNameListJSON()");
  var vFileList = vJSCC_DB["FileList"];
  var vFileArr = [];
  for (var iFile in vFileList) {
    if (vFileList.hasOwnProperty(iFile)) {
        vFileArr.push(iFile);
    };
  };
  return vFileArr;
};

function setFileSelectorDefault(pFileName) {
  console.log("setFileSelectorDefault('"+pFileName+"') TODO");
};

function selectClass(pClass) {
  selectClass_do(pClass);
  $( "#tabClass" ).trigger( "click" );
}

function clickedTabJQ(pID) {
};

function X_clickedTabJQ(pID) {
  // Tab: "tabMAIN" - Tab-Page: selectTabJQ('tabs-MAIN')
  // Tab: "tabHTML" - Tab-Page: selectTabJQ('tabs-HTML')
  // Tab: "tabPAGETYPE" - Tab-Page: selectTabJQ('tabs-PAGETYPE')
  // Tab: "tabClass" - Tab-Page: selectTabJQ('tabs-Class')
  // Tab: "tabUML" - Tab-Page: selectTabJQ('tabs-UML')
  // Tab: "tabAttributes" - Tab-Page: selectTabJQ('tabs-Attributes')
  // Tab: "tabMethods" - Tab-Page: selectTabJQ('tabs-Methods')
  // Tab: "tabDB" - Tab-Page: selectTabJQ('tabs-DB')
  // Tab: "tabFileClass" - Tab-Page: selectTabJQ('tabs-FileClass')
  // Tab: "tabExport" - Tab-Page: selectTabJQ('tabs-Export')
  console.log("clickedTabJQ('"+pID+"')");
  switch (pID) {
    case "tabHTML":
      $("#tabPAGETYPE").show();
      $("#tabAttributes").hide();
      $("#tabMethods").hide();
      $("#tabUML").hide();
    break;
    case "tabClass":
      $("#tabPAGETYPE").hide();
      $("#tabAttributes").show();
      $("#tabMethods").show();
      $("#tabUML").show();
    break;
    default:
      $("#tabPAGETYPE").hide();
      $("#tabAttributes").hide();
      $("#tabMethods").hide();
      $("#tabUML").hide();
  };
  //$( "#tabClass" ).trigger( "click" );
}

function selectClass_do(pClass) {
  var vCurrentClass = getValueDOM("tClassname");
  var vClass = pClass || getValueDOM("sClassList");
  console.log("selectClass()-Call: Current Class '"+vCurrentClass+"' - Selected Class '"+vClass+"'.");
  // following command is inserted for the first startup
  if (existsClassJS(vClass)) {
    console.log("Class '"+vClass+"' exists in selectClass()-Call");
    write2value("sClassList",vClass);
    write2value("tClassname",vClass);
    vJSCC_DB["SelectedClass"] = vClass;
    var vClassJSON = getClassJSON(vClass);
    clearForm4Class(vClass);
    console.log("selectClass()-Call Selected Class: "+getValueDOM("tClassname")+" Attributes="+getValueDOM("tAttributes"));
    checkInterface4Class(vClass);
    fillForm4Class(vClass);
    //createClassJS(vClass); // if necessary
    createAttribTypeSelect();
    createAttribSelect();
    var vMethID = vClassJSON["sMethodList"];
    createMethodSelect(vClass,vMethID);
    loadMethodJSON(vClass,vMethID);
    var vClassName = getValueDOM("tClassname");
    writeClassTitle(vClassName);
    updateClassSelectors(vClassName);
    setClassSelectorDefault(vClassName);
    var vSuperClassname = getValueDOM("tSuperClassname");
    selectSuperClass(vSuperClassname);
  } else {
    console.log("selectClass()-Call: Undefined Class '"+vClass+"' - use old class '"+vCurrentClass+"'.");
    //vClass = vCurrentClass;
  };
  //createCode4JSON_JS(vJSCC_DB);
};

function selectSuperClass(pSuperClass) {

  var vClassName = getValueDOM("tClassname");
  var vSuperClassname = pSuperClass;
  var vSuperClassType = "";
  if (vClassName != vSuperClassname) {
    write2value('tSuperClassname',vSuperClassname);
    write2value('sSuperClassname',vSuperClassname);
    if (vSuperClassname != "") {
      vSuperClassType = vJSCC_DB["ClassType"][vSuperClassname] || "";
    };
    write2innerHTML("labSuperClassTypeUML",vSuperClassType);
    updateFormID2JSON('tSuperClassname')
  } else {
    console.log("ERROR: You cannot select the '"+vClassName+"' as SuperClass");
    selectSuperClass(" ");
  }
}


function selectClassType(pClassName,pValue) {
  if (vJSCC_DB["ClassType"]) {
    setClassTypeJSON(pClassName,pValue,"selectClassType()");
    updateJSON2tClassList();
  } else {
    console.log("ERROR: selectClassType('"+pClassName+"','"+pValue+"') - vJSCC_DB['ClassType'] undefined");
  };
  console.log("selectClassType('"+pClassName+"','"+pValue+"') done");
}

function setClassSelectorDefault(pClassName) {
  write2value("sClassList",pClassName);
  write2value("sClassCode",pClassName);
};

function updateClassSelectors(pClassName) {
  if (existsClassJS(pClassName)) {
    var vClassJS = getClassJSON(pClassName);
    vClassJS["sClassList"] = pClassName;
    vClassJS["tClassname"] = pClassName;
    //updateAttribSelector(pClassName);
    //updateMethodSelector(pClassName);
    write2value("sClassList",pClassName);
    write2value("sClassCode",pClassName);
  } else {
    console.log("ERROR: updateClassSelectors('"+pClassName+"') pClassName not defined");
  }
};

function updateAttribSelector(pClassName) {
  var vArr = getAttribNameArrayJSON(pClassName);
  var vOptions = createOptions4Array(vArr);
  write2innerHTML("sAttribList",vOptions);
};

function getAttribNameArrayJSON(pClassName) {
  var vArr = [];
  var vClassJS = getClassJSON(pClassName);
  var vHash = {};
  if (vClassJS["AttribDefault"]) {
    vHash = vClassJS["AttribDefault"]
  } else {
    console.log("ERROR: getAttribNameArrayJSON('"+pClassName+"') - AttribDefault undefined");
  };
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vArr.push(iID)
    }
  };
  return vArr;
}

function updateMethodSelector(pClassName) {
  var vArr = getMethodNameArrayJSON(pClassName);
  write2options("sMethodList",vArr);
}

function getMethodNameArrayJSON(pClassName) {
  var vArr = [];
  var vClassJS = getClassJSON(pClassName);
  var vHash = {};
  if (vClassJS["MethodCode"]) {
    vHash = vClassJS["MethodCode"]
  } else {
    console.log("ERROR: getAttribNameArrayJSON('"+pClassName+"') - MethodCode undefined");
  };
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vArr.push(iID);
    };
  };
  return vArr;
};

function selectFileJS(pFileID) {
  var vFileID = pFileID || getValueDOM("sFileHTML");
  console.log("selectFileJS('"+vFileID+"')");
  var vOldFileID = getValueDOM("tFilename"); // old FileID
  var vFileHash = {};
  if (vOldFileID != "") {
    if (existsFileJS(vOldFileID)) {
      console.log("selectFileJS('"+vFileID+"') update content of vFile='"+vOldFileID+"'");
      updateFileForm2JSON(vOldFileID);
    };
  };
  console.log("selectFileJS()-Call: Current File ["+vOldFileID+"] - Selected File '"+vFileID+"'.");
  if (existsFileJS(vFileID)) {
    console.log("File with ID '"+vFileID+"' exists in selectFileJS()-Call");
    updateFileJSON2Form(vFileID);
    write2value("tFilename",vFileID);
    selectFilenameHTML(vFileID);
  } else {
    vFileID = "";
    clearFileForm();
  };
  vJSCC_DB["SelectedFile"] = vFileID;
  write2value("tFilename",vFileID);
};

function selectJSMethodReturn(pReturnID) {
  var vReturnID = pReturnID || getValueDOM("sReturnList");
  console.log("selectJSMethodReturn('"+vReturnID+"')");
  var vClass = getSelectedClassID();
  if (existsClassJS(vClass)) {
    var vMethodName = getSelectedMethodID(vClass);
    var vClassJS = getClassJSON();
    if (vClassJS["MethodReturn"].hasOwnProperty(vMethodName)) {
      vClassJS["MethodReturn"][vMethodName] = vReturnID;
      var vCall = vMethodName+"("+vClassJS["MethodParameter"][vMethodName]+")";
      if (vReturnID != "") {
        vCall += ":"+vReturnID;
      };
      var vCode = vClassJS["MethodCode"][vMethodName];
      var vComment = vClassJS["MethodComment"][vMethodName];
      write2value("tMethodHeader",vCall);
      write2value("tMethodCode",vCode);
      write2value("tMethodComment",vClassJS["MethodComment"][vMethodName]);
      vClassJS["tMethodHeader"] = vCall;
      vClassJS["tMethodCode"] = vCode;
      vClassJS["tMethodComment"] = vComment;
      write2innerHTML("titleMethodName",vCall);
      updateMethodsJSON2Form(vClass);
    };
  };
}

function selectPageJS(pPageID) {
  var vPageID = pPageID || getValueDOM("sPageHTML");
  console.log("selectPageJS('"+vPageID+"')");
  var vOldPageID = getValueDOM("tPageID"); // old PageID
  var vOldContent = getValueDOM("tPageHTML");
  var vEditContent = getEditorValue("iPageHTML");
  var vPageHash = {};
  if (reduceVarName(vOldPageID) != "") {
    if (vOldPageID != pPageID) {
      if (existsPageJS(vOldPageID)) {
        console.log("Content of Page CHANGED\nOLD: "+vOldContent+"\nNEW: "+vEditContent);
        updatePageForm2JSON(vOldPageID);
      };
    } else {
      console.log("Content of Page unchanged");
    };
  };
  console.log("selectPageJS()-Call: Current Page ["+vOldPageID+"] - Selected Page '"+vPageID+"'.");
  if (existsPageJS(vPageID)) {
    console.log("Page with ID '"+vPageID+"' exists in selectPageJS()-Call");
    selectPageJS_do(vPageID);
  } else {
    vPageID = "";
    clearPageForm();
  };
  vJSCC_DB["SelectedPage"] = vPageID;
  write2value("tPageID",vPageID);
};

function selectPageJS_do(pPageID) {
  if (pPageID) {
    if (existsPageJS(pPageID)) {
      var vMap = getMapPageForm2JSON();
      var vHash = vJSCC_DB["PageList"][pPageID];
      for (var iID in vMap) {
        if (vMap.hasOwnProperty(iID)) {
          write2value(vMap[iID],vHash[iID]);
        };
      };
      console.log("selectPageJS_do('"+pPageID+"') content='"+vHash["content"]+"'");
      write2value("tPageID",vHash["PAGE_ID"]);
      setEditorValue("iPageHTML",vHash["content"]);
    };
  }
}

function getMapPageForm2JSON() {
  //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"]; //variables that are stored for all pages
  //var vArrID = ["tPageID","sPageHTML","sPageType4Page","tPageTitle","sParentPage","tPageHTML"];
  var vMap = createHash4Array(vPageRECDEF);
  vMap["PAGE_ID"] = "sPageHTML";
  vMap["PAGE_TITLE"] = "tPageTitle";
  vMap["page-type"] = "sPageType4Page";
  vMap["parent-id"] = "sParentPage";
  vMap["content"] = "tPageHTML";
  return vMap;
};

function updatePageForm2JSON(pPageID) {
  if (pPageID) {
    if (existsPageJS(pPageID)) {
      var vMap = getMapPageForm2JSON();
      var vHash = vJSCC_DB["PageList"][pPageID];
      for (var iID in vMap) {
        if (vMap.hasOwnProperty(iID)) {
          vHash[iID] = getValueDOM(vMap[iID]);
        };
      }
    }
  }
}

function clearDatabaseForm() {
  var vArrID = ["tDatabaseName","sDatabaseTAB","sDatabaseList","sDatabaseID","tDatabaseIDs","tDatabaseID","tDBHTML","tDBIDHTML"];
  clearIDs4DOM(vArrID);
  setEditorValue("iDBHTML","");
  setEditorValue("iDBIDHTML","");
};


function clearPageForm() {
  var vArrID = ["tPageID","sPageHTML","sPageType4Page","tPageTitle","sParentPage","tPageHTML"];
  clearIDs4DOM(vArrID);
  setEditorValue("iPageHTML","");
};

function clearPageTypeForm() {
  var vArrID = ["tPageTypeID","sPageTypeHTML","sButtonHeader1","sButtonHeader2","tPageTypeHTML"];
  clearIDs4DOM(vArrID);
  setEditorValue("iPageTypeHTML","");
};

function clearButtonForm() {
  var vArrID = ["tButtonID","sButtonHTML","tButtonTitle","tButtonDefHTML"];
  clearIDs4DOM(vArrID);
};

function clearIDs4DOM(pArrID) {
  var vID = "";
  for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      write2value(vID,"");
  };
};

function selectPageTypeJS(pPageTypeID) {
  var vPageTypeID = pPageTypeID || getValueDOM("sPageTypeHTML");
  console.log("selectPageTypeJS('"+vPageTypeID+"')");
  var vOldPageTypeID = getValueDOM("tPageTypeID"); // old PageTypeID
  var vOldContent = getEditorValue("iPageTypeHTML");
  if (vOldPageTypeID != "") {
    if (vOldPageTypeID != vPageTypeID) {
      console.log("Update of OLD setting of PageType '"+vOldPageTypeID+"'");
      //updateForm2PageTypeJSON(vOldPageTypeID);
    }
  };
  console.log("selectPageTypeJS()-Call: Current PageType '"+vOldPageTypeID+"' - Selected PageType '"+vPageTypeID+"'.");
  if (vPageTypeID != "") {
    if (existsPageTypeJS(vPageTypeID)) {
      console.log("PageType with ID '"+vPageTypeID+"' exists in selectPageTypeJS()-Call");
      updatePageTypeJSON4ID2Form(vPageTypeID);
      write2value("sPageTypeHTML",vPageTypeID);
      write2value("sPageType4Page",vPageTypeID);
    } else {
      console.log("selectPageTypeJS()-Call: Undefined PageType for '"+vPageTypeID+"' - use old PageType Content '"+vOldPageTypeID+"'.");
      clearPageTypeForm();
      vPageTypeID = ""; //vOldPageTypeID;
    };
  } else {
    clearPageTypeForm();
    vPageTypeID = ""; //vOldPageTypeID;
  };
  write2value("tPageTypeID",vPageTypeID);
  vJSCC_DB["SelectedPageType"] = vPageTypeID;
};

function selectPageTypeJS_do(pPageID) {
  var vPageID = pPageID || "";
  console.log("selectPageTypeJS_do('"+vPageID+"')");
  if (existsPageJS(vPageID)) {
    vJSCC_DB["SelectedPageType"] = vPageID;
    var vValue = vJSCC_DB["PageList"][vPageID]["content"];
    if (vValue) {
      write2value("tPageHTML",vValue);
      setEditorValue("iPageHTML",vValue);
    } else {
      console.log("ERROR: PageContent of '"+vPageID+"' does not exist");
    };
    var vSelHash = vJSCC_DB["PageList"][vPageID];
    //write2value("sPageHTML",vPageID);
    vSelHash["content"] = vValue;
    write2value("sParentPage",vSelHash["parent-id"]);
    write2value("tPageTitle",vSelHash["PAGE_TITLE"]);
    write2value("sPageType4Page",vSelHash["page-type"]);
  };
}

function  updatePageTypeJSON4ID2Form(pPageTypeID) {
  var vPageTypeID = pPageTypeID || getValueDOM("tPageTypeID");
  if ((vPageTypeID) && (vPageTypeID != "")) {
    var vSelHash = vJSCC_DB["PageTypeList"][vPageTypeID];
    if (vSelHash) { // page-type | HEADER_BUTTON1 | HEADER_BUTTON2 | template
      write2value("tPageTypeID",vSelHash["page-type"]);
      write2value("sButtonHeader1",vSelHash["HEADER_BUTTON1"]);
      write2value("sButtonHeader2",vSelHash["HEADER_BUTTON2"]);
      write2value("tPageTypeHTML",vSelHash["template"]);
      setEditorValue("iPageTypeHTML",vSelHash["template"]);
    } else {
      console.log("WARNING: Selected Button Hash for ["+pButtonID+"] undefined");
    }
  } else {
    console.log("WARNING: ButtonID empty");
  }
};

function getButtonJSON(pButtonID) {
  if (existsButtonJS(pButtonID)) {
    return vJSCC_DB["ButtonList"][pButtonID];
  };
}

function getElementDBJSON(pElemID) {
  if (existsElementDBJS(pElemID)) {
    return vJSCC_DB["ElementsDBList"][pButtonID];
  };
}


function selectButtonJS(pButtonID) {
  var vButtonID = pButtonID || getValueDOM("sButtonHTML");
  var vOldButtonID = getValueDOM("tButtonID"); // old ButtonID
  var vButtonDefHTML = "";
  var vButtonTitle = "";
  //saveButtonHTML_do();
  console.log("selectButtonJS()-Call: Current Button '"+vOldButtonID+"' - Selected Button '"+vButtonID+"'.");
  if (existsButtonJS(vButtonID)) {
    console.log("Button with ID '"+vButtonID+"' exists in selectButtonJS()-Call");
    var vButtJS = getButtonJSON(vButtonID);
    //-- Correct innconsistency of manual edits of JSON in ButtonList
    vButtJS["BUTTON_ID"] = vButtonID;
    // set the output values
    vButtonTitle = vButtJS["BUTTON_TITLE"] || "Title "+vButtonID;
    vButtonDefHTML = vButtJS["tButtonDefHTML"] || "Button Definition "+vButtonID;
    //updateButtonJSON4ID2Form(vButtonID);
  } else {
    console.log("selectButtonJS()-Call: Undefined Button Content '"+vButtonID+"' - use old Button Content '"+vOldButtonID+"'.");
  };
  write2value("sButtonHTML",vButtonID);
  write2value("tButtonID",vButtonID);
  write2value("tButtonTitle",vButtJS["BUTTON_TITLE"] );
  write2editor("ButtonDefHTML",vButtonDefHTML);
  vJSCC_DB["SelectedButton"] = vButtonID;
};

function createElementsDBSelect(pElementID) {
  var vElementStr = "";
  var vArr = getArray4HashID(vJSCC_DB["ElementsDBList"]);
  write2innerHTML("sElementDBTAB",createOptions4Array(vArr));
  if (vArr.length>0) {
    var vElemID = pElementID || vArr[0];
    var vElemDB = vJSCC_DB["ElementsDBList"];
    if (vElemDB.hasOwnProperty(vElemID)) {
      write2editor("ElementDBHTML",vElemDB[vElemID]);
    };
  }
};

function selectElementDB(pElemID) {
  var vElemDB = vJSCC_DB["ElementsDBList"];
  if (vElemDB.hasOwnProperty(pElemID)) {
    write2editor("ElementDBHTML",vElemDB[pElemID]);
    vJSCC_DB["SelectedElementDB"] = pElemID;
  } else {
    write2editor("ElementDBHTML"," ");
    vJSCC_DB["SelectedElementDB"] = "";
  };
}
function createElementsFileSelect(pFileID) {
  var vElementStr = "";
  var vArr = [];
  if (existsFileJS(pFileID)) {
    vArr = getArray4HashID(vJSCC_DB["FileList"][pFileID]["elements"])
  };
  write2innerHTML("sElementsFileList",createOptions4Array(vArr));
};

function getArray4IDString(pIDString) {
  var vIDString = pIDString || "";
  vIDString = vIDString.replace(/\s/g,"");
  var vArr = vIDString.split("|");
  var vOutArr = [];
  for (var i = 0; i < vArr.length; i++) {
    if (vArr[i] != "") {
      vOutArr.push(vArr[i]);
    }
  };
  return vOutArr;
}

function getSelectedPageTypeID() {
  return getValueDOM("sPageTypeHTML") || "";
}

function getSelectedPageID() {
  return getValueDOM("sPageHTML") || "";
}

function getSelectedFileID() {
  return getSelectedFilenameHTML();
}

function getSelectedElementDB() {
  return getValueDOM("sElementsFileList") || "";
}

function getSelectedDatabaseID() {
  return getValueDOM("sDatabaseTAB") || "";
}

function selectElementFileJS(pElementID,pFile) {
  console.log("selectElementFileJS('"+pElementID+"')");
  var vFile = pFile || getSelectedFilenameHTML();
  if (existsFileJS(vFile)) {
    checkFileHTML(vFile);
    selectElementFileJS_do(pElementID,vFile);
  } else {
    console.log("selectElementFileJS('"+pElementID+"') vFile='"+vFile+"' undefined in vJSCC_DB");
  };
};

function selectElementFileJS_do(pElementID,pFile) {
  console.log("selectElementFileJS_do('"+pElementID+"','"+pFile+"')");
  var vFile = pFile || getSelectedFilenameHTML();
  var vElementJSON = vJSCC_DB["FileList"][vFile]["elements"];
  var vPrevElementID = getValueDOM("tElementID");
  var vElementArrID = getElementArrayID4JSON(vFile);
  var vFirstElement = vElementArrID[0] || "";
  var vSelElementHTML = "";
  //console.log("selectElementFileJS('"+pElementID+"') vFirstElement='"+vFirstElement+"'");
  console.log("selectElementFileJS('"+pElementID+"') vFirstElement='"+vFirstElement+"' with content='"+vElementJSON[vFirstElement]+"'");
  var vSelElementID = pElementID || getValueDOM("sElementsFileList") || vFirstElement;
  var vContent;
  if (vPrevElementID != "") {
    if (vPrevElementID != pElementID) {
      vContent = getEditorValue("iElementHTML");
      console.log("selectElementFileJS('"+pElementID+"') Save the Content of Element ["+vPrevElementID+"] Content='"+vContent+"'");
      vElementJSON[vPrevElementID] = vContent;
    };
  } else {
    console.log("No previous Element Definition found");
  };
  //var Arr = [];
  if (vSelElementID != "") {
    if (vElementJSON[vSelElementID]) {
      console.log("JSON definition of Element ['"+vSelElementID+"'] exists");
      console.log("selectElementFileJS('"+pElementID+"') vFirstElement='"+vFirstElement+"' with content='"+vElementJSON[vFirstElement]+"'");
    } else {
      console.log("WARNING: Set JSON definition of Element ['"+vSelElementID+"']");
      console.log("selectElementFileJS('"+pElementID+"') vFirstElement='"+vFirstElement+"' with content='"+vElementJSON[vFirstElement]+"'");
      vElementJSON[vSelElementID] = "undefined content of "+vSelElementID;
    };
    vSelElementHTML = vElementJSON[vSelElementID]
  } else {
    vSelElementHTML = "";
    //clearFileForm();
  };
  var vFileJSON = vJSCC_DB["FileList"][vFile];
  //--- set Element ID in vJSCC_DB and Form
  vFileJSON["sElementFileList"] = vSelElementID;
  vFileJSON["tElementID"] = vSelElementID;
  vJSCC_DB["SelectedElement"] = vSelElementID;
  write2value("sElementFileList",vSelElementID);
  write2value("tElementID",vSelElementID);
  //--- set Element HTML in vJSCC_DB and Form and Editor
  vFileJSON["tElementHTML"] = vSelElementHTML;
  write2value("tElementHTML",vSelElementHTML);
  setEditorValue("iElementHTML",vSelElementHTML);
  //--- set File in vJSCC_DB
  vFileJSON["tFilename"] = vFile;
  //write2innerHTML("sElementsFileList",createOptions4Array(vArr));
};

function getElementArrayID4JSON(pFile) {
  var vFile = pFile || "";
  var vArrID = [];
  if (existsFileJS(vFile)) {
    var vFileJSON = vJSCC_DB["FileList"][vFile];
    if (vFileJSON["elements"]) {
      vArrID = getArray4HashID(vFileJSON["elements"]);
    } else {
      console.log("ERROR: Element Hash for File='"+vFile+"' is undefined");
    }
  } else {
    console.log("ERROR: in FileList File='"+vFile+"' is undefined");
  };
  return vArrID;
}

function clearFileForm() {
  var vID;
  for (var i = 0; i < vDOM_File.length; i++) {
    vID = vDOM_File[i];
    write2value(vID,"");
  };
  setEditorValue("iElementHTML","");
}

function updateButtonJSON4ID2Form(pButtonID) {
  var vButtonID = reduceVarName(pButtonID);
  console.log("updateButtonParamHash2Form('"+vButtonID+"')");
  if ((vButtonID) && (vButtonID != "")) {
    var vSelHash = {
      "BUTTON_ID": "BUTUNDEF",
      "tButtonDefHTML": "undefined button '"+vButtonID+"'",
    };
    if (existsButtonJS(vButtonID)) {
      console.log("Button '"+vButtonID+"' is defined");
      vSelHash = vJSCC_DB["ButtonList"][vButtonID];
    };
    if (vSelHash) { // BUTTON_ID | tButtonDefHTML
      write2value("tButtonID",vSelHash["BUTTON_ID"] );
      write2value("tButtonTitle",vSelHash["BUTTON_TITLE"] );
      write2value("tButtonDefHTML",vSelHash["tButtonDefHTML"]);
    } else {
      console.log("WARNING: Selected Button Hash for ["+pButtonID+"] undefined");
    }
  } else {
    console.log("WARNING: ButtonID empty");
  }
}

function fillForm4File(pFileName) {
  console.log("fillForm4File('"+pFileName+"')");
  updateFileJSON2Form(pFileName);
};

function updateFileForm2JSON(pFileName) {
  console.log("updateFileForm2JSON('"+pFileName+"')");
  var vID = "";
  if (pFileName) {
    if (vJSCC_DB["FileList"][pFileName]) {
      console.log("updateFileForm2JSON() - vJSCC_DB['FileList']['"+pFileName+"'] exists!");
    } else {
      checkFileHTML(pFileName);
    };
    var vFileJSON = vJSCC_DB["FileList"][pFileName];
    var vValue = "";
    for (var i = 0; i < vDOM_File.length; i++) {
      vID = vDOM_File[i];
      vValue = getValueDOM(vID);
      if (vValue) {
        vFileJSON[vID] = vValue;
      } else {
        vFileJSON[vID] = "";
      };
    };
  };
};

function updateFileJSON2Form(pFileName) {
  var vID = "";
  if (pFileName) {
    console.log("updateFileJSON2Form('"+pFileName+"')");
    if (vJSCC_DB["FileList"][pFileName]) {
      console.log("updateFileJSON2Form() - vJSCC_DB['FileList']['"+pFileName+"'] exists!");
    } else {
      checkFileHTML(pFileName);
    };
    var vFileJSON = vJSCC_DB["FileList"][pFileName];
    for (var i = 0; i < vDOM_File.length; i++) {
      vID = vDOM_File[i];
      if (vFileJSON.hasOwnProperty(vID)) {
        write2value(vID,vFileJSON[vID]);
      };
    };
    var vElementID = getValueDOM("tElementID") || "";
    console.log("updateFileJSON2Form() tElementID='"+vElementID+"'");
    write2value("sElementsFileList",vElementID);
    selectElementFileJS(vElementID);
  } else {
    console.log("ERROR: updateFileJSON2Form('pFileName') pFileName undefined");
  };
};

function getSelectedMethodCode(pClass,pMethName) {
  var vClass = pClass || getSelectedClassID();
  var vMethName = pMethName || getSelectedMethodID(vClass);
  if (existsClassJS(vClass)) {
    return vJSCC_DB["ClassList"][vClass]["MethodCode"][vMethName];
  } else {
    return "ERROR: undefined Method '"+vMethodName+"' for Class '"+vClass+"'";
  }
};

function logSelectedMethodCode(pLabel,pClass,pMethName) {
  var vClass = pClass || getSelectedClassID();
  var vMethName = pMethName || getSelectedMethodID(vClass);
  console.log(pLabel+" logSelectedMethodCode('"+vClass+"','"+vMethName+"') " + getSelectedMethodCode(vClass,vMethName));
}

function fillForm4Class(pClass) {
  console.log("fillForm4Class('"+pClass+"')");
  pClass = reduceVarName(pClass);
  //--- Call of updateClassJSON2Form(vClass)
  //--- writes the UML-Mapper-List in tClasses
  if (existsClassJS(pClass)) {
    var vList = vJSCC_DB["ClassList"][pClass];
    var vID = "";
    for (var i = 0; i < vDOM_ID.length; i++) {
      vID = vDOM_ID[i];
      write2value(vID,vList[vID]);
    };
    write2value("sMethodList",vList["tMethodName"]);
    write2value("sClassList",pClass);
    write2value("sClassCode",pClass);
  };
};

function selectedMethodName() {
  return getValueDOM("sMethodList");
};

function selectedAttribName() {
  return getValueDOM("sAttribList");
}

function setAttribType4Select(pAttribType,pInitValue) {
    var vSelClass = pAttribType || getValueDOM("sAttribTypeList");
    var vClassDef = "null";
    var vAttribName = getValueDOM("tAttribName");
    console.log("Select Type '"+vSelClass+"' for Attribute '"+vAttribName+"'");
    write2value("tAttribType",vSelClass);
    var vInitValue = pInitValue || "";
    if (vInitValue == "") {
      if (isBasicClass(vSelClass)) {
        console.log("Basic Class '"+vSelClass+"' selected for Attribute '"+vAttribName+"'");
        var vBasicClassHash = getBasicClassHash();
        //vClassDef = vBasicClassHash[vSelClass];
        vInitValue = vBasicClassHash[vSelClass];
      } else {
        console.log("Class '"+vSelClass+"' is self-defined for Attribute '"+vAttribName+"' ");
        vInitValue = "new "+vSelClass+"()";
      };
    } else {
      console.log("Attribute '"+vAttribName+"' was initialized with 'null'");
    };
    write2value("tAttribDefault",vInitValue);
};

function selectJSAttribType() {
  //saveAttribJSON();
  //get SELECT AttribName value
  var vAttribType = getValueDOM("sAttribTypeList");
  var vAttribName = getValueDOM("sAttribList");
  console.log("Selected ArrayType='"+vAttribType+"' - selectJSAttribType()");
  // set MethodName Input Window
  if (getCheckBox("checkAttribCreate")) {
    // init the Attribute with "new <vAttribType>()"
    setAttribType4Select(vAttribType);
  } else {
    // init with "null"
    setAttribType4Select(vAttribType,"null");
  };
  saveAttribJSON(vAttribName);
  saveJSON2LocalStorage();
};

function selectJSAttribs(pAttribName) {
  var vClass = getSelectedClassID();
  var vClassJSON = getClassJSON();
  //saveAttribJSON();
  //get SELECT AttribName value
  var vAttribName = pAttribName || getValueDOM("sAttribList");
  console.log("selectJSAttribs() - AttribName='"+vAttribName+"'");
  var vID = "";
  var vValue = "";
  var vAttArr = ["AttribAccess","AttribComment","AttribType","AttribDefault"];
  for (var i = 0; i < vAttArr.length; i++) {
    vID = vAttArr[i];
    vValue = vClassJSON[vID][vAttribName] || "";
    console.log("["+vID+"]='"+vValue+"'");
    write2value("t"+vID,vValue);
  };
  var vAccess = vClassJSON["AttribAccess"][vAttribName] || "public";
  write2value("sAttribAccess",vAccess);
  write2value("tAttribName",vAttribName);
  var vAttribType = (vClassJSON["AttribType"][vAttribName] || " ");
  write2value("sAttribTypeList",vAttribType);
  write2value("tAttribType",vAttribType);
  //load method code from  vJSCC_DB if exists
  //loadAttribJSON(vAttribName);
  autoSaveJSON();
};

function updateForm2Database(pDB) {
  var vDB = pDB || getValueDOM("tExportedJSON");
  console.log("updateForm2Database('"+vDB+"') call");
  var vContent = getEditorValue("iJSONDB");
  // remove Prefix if it is stored in the Export File;
  vContent = removePrefix4DB(vContent);
  var vMSG = "";
  if (vDB == "") {
    vMSG = "ERROR: Please select a Database first before you can update the content of the database!";
  } else if (vDB == "project") {
    vMSG = "WARNING: You cannot save a JSON for the programming project into the list of databases.\nSee tab Files/Classes to create new JSON DBs!";
  } else {
    if (vJSCC_DB["DatabaseList"][vDB]) {
      vJSCC_DB["DatabaseList"][vDB] = vContent;
      vMSG = "DONE: Database ["+vDB+"] was stored in main JSON for the project!"
    } else {
      vMSG = "ERROR: Database ["+vDB+"] does not exist in call of updateForm2Database('"+vDB+"')";
    };
  };
  //console.log(vMSG);
  if (vMSG != "") alert(vMSG);
};

function removeDBPrefix(pContent) {
  var vContent = pContent || "";
  var vPosJSON = 0;
  var vMsg = "";
  if (vContent) {
    var vPos = vContent.indexOf("{");
    if (vPos >= 0) {
      vMsg = "removeDBPrefix() '"+pContent.substring(0,vPos)+"' found at posistion "+vPos;
      vPosJSON = vPos;
    };
    if (vPosJSON > 0) {
      vContent = vContent.substring(vPosJSON,vContent.length);
    };
  };
  return vContent;
}

function removePrefix4DB(pContent) {
  var vDB = getValueDOM("tExportedJSON");
  var vPrefix = getExportPrefix4DB(vDB);
  var vContent = pContent || "";
  var vPosJSON = 0;
  var vMsg = "";
  var vPos = vContent.indexOf(vPrefix);
  if (vPos >= 0) {
    vMsg = "removePrefix4DB() Hash found at posistion "+vPos;
    vPosJSON = vPos + vPrefix.length;
  };
  if (vPosJSON > 0) {
    vContent = vContent.substring(vPosJSON,vContent.length);
  };
  return vContent;
};
function selectDatabaseJS(pDBname) {
  selectDatabaseJSON(pDBname)
};

function getDatabaseName4DBID(pDBID) {
  var vDBName = "";
  if (existsDatabaseJS(pDBID)) {
    var vDBFile = vJSCC_DB["DBID2File"][pDBID];
    vDBName = getNameExt(vDBFile);
    vJSCC_DB["sDatabaseList"] = vDBName;
  };
  return vDBName;
}

function selectDatabaseJSON(pDBID) {
  var vDBID = pDBID || getValueDOM("sDatabaseTAB");
  if (existsDatabaseJS(vDBID)){
    write2value("sDatabaseTAB",vDBID);
    write2value("sDatabaseList",vDBID);
    var vDBname = getDatabaseName4DBID(vDBID);
    $( ".labDBname" ).html(vDBname);
    var vCode = "";
    var vType = getJSCC_DBType(vDBID);
    write2innerHTML("titleDatabaseType",vType);
    // write file path of DB to tDatabaseName with Path
    write2value("tDatabaseName",vJSCC_DB["DBID2File"][vDBID]);
    if (vType == "DB") {
      $('.trJSCCDB').show();
      var vDB = vJSCC_DB["DatabaseList"][vDBID];
      // write the data only to the JSON editor
      write2value("tDatabaseTitle",(vDB["dbtitle"] || "Title of '"+vDBID+"'"));
      //vCode = stringifyJSON(vDB["data"]);
      vCode = stringifyJSON(vDB);
      // create the Variable Selector for the selected Database "vDBID"
      vSchema = stringifyJSON(vDB["schema"]);
      write2value("tDBSchema",vSchema);
      setEditorValue("iDBSchema",vSchema);
    } else {
      $('.trJSCCDB').hide();
      vCode = stringifyJSON(vJSCC_DB["DatabaseList"][vDBID]);
    };
    write2value("tDBHTML",vCode);
    setEditorValue("iDBHTML",vCode);
  } else {
    clearDatabaseForm();
  };
  //selectDatabaseExport(vDBID);
};

function selectDatabaseVarID(pDBVarID) {
  var vDBVarID = pDBVarID || getValueDOM("sDatabaseID");
  console.log("selectDatabaseVarID('"+vDBVarID+"')");
  write2value("tDatabaseID",vDBVarID);
  var vOutTemplate = getValueDOM("sOutTemplate") || "edit";
  write2value("sOutTemplate",vOutTemplate);
  var vDBID = getValueDOM("sDatabaseTAB");
  if (existsDatabaseJS(vDBID)) {
    // find column ID of DB
    var vDB = vJSCC_DB["DatabaseList"][vDBID];
    if (vDB["format"].hasOwnProperty(vDBVarID)) {
      var vTplDef = vDB["format"][vDBVarID][vOutTemplate] || "";
      write2editor("DBIDHTML",vTplDef);
      write2innerHTML("titleDBIDTab",vDBVarID)
    }
  }
}

function setProperty4DBID(pKey,pYESNO) {
  console.log("setProperty4DBID('"+pYESNO+"')");
  var vDBID = getValueDOM("sDatabaseTAB");
  if (existsDatabaseJS(vDBID)) {
    // find column ID of DB
    var vDB = vJSCC_DB["DatabaseList"][vDBID];
    var vID = getValueDOM("sDatabaseID");
    if (vDB["format"].hasOwnProperty(vID)) {
      if (pYESNO == "NO") {
        vDB["format"][vID][pKey] = false;
      } else {
        vDB["format"][vID][pKey] = true;
      }
    }
  }
};

function setOutTemplate4DBID(pKey,pOutTpl,pDef) {
  console.log("setProperty4DBID('"+pYESNO+"')");
  var vDBID = getValueDOM("sDatabaseTAB");
  if (existsDatabaseJS(vDBID)) {
    // find column ID of DB
    var vDB = vJSCC_DB["DatabaseList"][vDBID];
    var vID = getValueDOM("sDatabaseID");
    if (vDB["format"].hasOwnProperty(vID)) {
      if (pYESNO == "NO") {
        vDB["format"][vID][pKey] = false;
      } else {
        vDB["format"][vID][pKey] = true;
      }
    }
  }
};

function saveDatabaseVarIDHTML() {
  var vDBname = getValueDOM("sDatabaseTAB");
  var vDBVarID = getValueDOM("sDatabaseID");
  console.log("saveDatabaseHTMLVarID('"+vDBname+"','"+vDBVarID+"')");
  if (existsDatabaseJS(vDBname)) {
    var vPathID = "DatabaseList."+vDBname+".format."+vDBVarID+".";
    saveID4HashPath2JSON(vPathID+"title",getValueDOM(""));
    saveID4HashPath2JSON(vPathID+"visible",getCheckBox(""));
    saveID4HashPath2JSON(vPathID+"mandatory",getValueDOM(""));

  };
  // Save DB Title of JSCC Database
  // "DatabaseList": {
  //   "db_mydata_js": {
 //      "JSCC_type": "DB",
 //      "name": "db_mydata_js",
 //      "file": "db/mydata.js",
 //      "dbtitle": "Title of DB db_mydata_js",
 //      "JSCC_init_date": "2017/04/02 10:35:48",
 //      "JSCC_mod_date": "2017/04/02 10:35:48",
 //      "format": {
 //          "yesno1": {
 //              "title": "Title of ID yesno1",
 //              "display": "___DB_YESNO___",
 //              "edit": "___DB_ID_VALUE___",
 //              "hidden": "___DB_ID_HIDDEN___",
 //              "visible": true,
 //              "mandatory": true
 //          },
 //          ...
 //       }
 //   }
}

function saveDatabaseHTML() {
  var vDBname = getValueDOM("sDatabaseTAB");
  console.log("saveDatabaseHTML('"+vDBname+"')");
  if (existsDatabaseJS(vDBname)) {
    // try to parse JSON
    var vCode = getEditorValue("iDBHTML");
    if (checkParseJSON(vCode)) {
      vData = JSON.parse(vCode);
      if (getJSCC_DBType(vDBname) == "DB") {
        // JSCC-DB: so store JSON in data
        vJSCC_DB["DatabaseList"][vDBname]["data"] = JSON.parse(vCode);
      } else {
        // JSON-File: unknown JSCC type
        vJSCC_DB["DatabaseList"][vDBname] = JSON.parse(vCode);
      };
      alert("Database '"+vJSCC_DB["DBID2File"][vDBname]+"' saved!");
    } else {
      console.log("ERROR: Parsing of JSON in '"+vDBname+"' was not succesful");
    };
  };
};

function deleteDatabaseHTML() {
  var vDBname = getValueDOM("sDatabaseTAB");
  console.log("saveDatabaseHTML('"+vDBname+"')");
  var vOK = confirm("Do you want to delete Database ["+getDatabaseName4DBID(vDBname)+"]?");
  var vID = "";
  if (vOK == true) {
    if (existsDatabaseJS(vDBname)) {
      var vDelFile = vJSCC_DB["DBID2File"][vDBname];
      delete vJSCC_DB["DBID2File"][vDBname];
      delete vJSCC_DB["DatabaseList"][vDBname];
      createDatabaseSelect();
      alert("Database '"+vDelFile+"' deleted!");
    } else {
      console.log("ERROR: saveDatabaseHTML('"+vDBname+"') DB does not exist in vJSCC_DB");
    };
  } else {
    console.log("Cancelled delete operation for Database ["+getDatabaseName4DBID(vDBname)+"]");
  };

};

function deleteDatabaseVarID() {
  var vDBname = getValueDOM("sDatabaseTAB");
  var vDBVarID = getValueDOM("sDatabaseVarID");
  console.log("saveDatabaseHTML('"+vDBname+"','"+vDBVarID+"')");
  var vOK = confirm("Do you want to delete the variable ['"+vDBVarID+"'] in database '"+getDatabaseName4DBID(vDBname)+"'?");
  var vID = "";
  if (vOK == true) {
    if (existsDatabaseJS(vDBname)) {
      //var vFormat = vJSCC_DB["DBID2File"][vDBname]["format"];
      var vFormat = vJSCC_DB["DatabaseList"][vDBname]["format"];
      if (vFormat.hasOwnProperty(vDBVarID)) {
        delete vFormat[vDBVarID];
      };

      // "db_mydata_js": {
      //      "JSCC_type": "DB",
      //      "name": "db_mydata_js",
      //      "file": "db/mydata.js",
      //      "dbtitle": "Title of DB db_mydata_js",
      //      "JSCC_init_date": "2017/04/02 10:35:48",
      //      "JSCC_mod_date": "2017/04/02 10:35:48",
      //      "format": {
      //          "yesno1": {
      //              "title": "Title of ID yesno1",
      //              "display": "___DB_YESNO___",
      //              "edit": "___DB_ID_VALUE___",
      //              "hidden": "___DB_ID_HIDDEN___",
      //              "visible": true,
      //              "mandatory": true
      //          },
      //          ...
      //       }
      //   }

      createDatabaseVarIDSelect();
      alert("Variable '"+vDBVarID+"' in database with ID ["+vDBname+"] deleted!");
    } else {
      console.log("ERROR: saveDatabaseHTML('"+vDBVarID+"') DB does not exist in vJSCC_DB");
    };
  } else {
    console.log("Cancelled delete operation for Database ["+getDatabaseName4DBID(vDBVarID)+"]");
  };

};


function parseJSON(pString) {
  var vJSON;
  if(pString) {
    try {
        vJSON = JSON.parse(pString);
    } catch(e) {
        alert(e); // error in the above string (in this case, yes)!
    }
  };
  return vJSON;
}

function checkParseJSON(pString) {
  var vRet = false;
  if(pString) {
    try {
        vJSON = JSON.parse(pString);
        vRet = true;
    } catch(e) {
        alert(e); // error in the above string (in this case, yes)!
    }
  };
  return vRet;
}

function getJSCC_DBType(pDBname) {
  var vType = "";
  if (existsDatabaseJS(pDBname)) {
    vType = "JSON";
    var vDB = vJSCC_DB["DatabaseList"][pDBname];
    if (vDB.hasOwnProperty("JSCC_type")) {
        vType = vDB["JSCC_type"];
    };
  };
  return vType;
}

function isJSCC_DB(pDBname) {
  var vRet = false;
  if (existsDatabaseJS(pDBname)) {
    var vDB = vJSCC_DB["DatabaseList"][pDBname];
    if (vDB.hasOwnProperty("JSCC_type")) {
        //vType = vDB["JSCC_type"];
        vRet = (vDB["JSCC_type"] == "DB");
    };
  };
  return vRet;
}

function selectDatabaseExport(pDBname) {
  var vDBname = pDBname || getValueDOM("sDatabases");
  console.log("selectDatabaseJS('"+vDBname+"')");
  if (existsDatabaseJS(vDBname)) {
    var vDB = vJSCC_DB["DatabaseList"][vDBname];
    var vExportPrefix = "";
    if (getCheckBox("checkUsePrefix") == true) {
      vExportPrefix = getExportPrefix4DB(vDBname);
    };
    //console.log("DB['"+vDBname+"'] = "+stringifyJSON(vDB));
    write2editor("JSONDB",vExportPrefix + stringifyJSON(vDB));
    // ExportPrefix = "JSON" means: do not use the export prefix, it is pure JSON,
    write2exportedDB(vDBname,getCheckBox("checkUsePrefix"));
    console.log("Database: '"+vDBname+"' selected!");
    //selectDatabaseCode(vDBname);
  } else {
    writeFilenameWithPath4DB("",getCheckBox("checkUsePrefix"));
    console.log("WARNING: selectDatabaseJS() vDBname undefined!");
  };
}

function getExportPrefix() {
  var vPrefix = "JSON";
  if (getCheckBox("checkUsePrefix") == true) {
    vPrefix = "JS";
  };
  return vPrefix;
};

function selectDatabaseCode(pDBname) {
  //show("bSaveJSON");
  var vDBname = pDBname || getValueDOM("sDatabases");
  var vSelExpPref = getExportPrefix();
  console.log("selectDatabaseCode('"+vDBname+"') Type: '"+vSelExpPref+"'");
  var vContent = "";
  // ExportPrefix = "JSON" means: do not use the export prefix, it is pure JSON,
  var vExportPrefix = "";
  var vExtension = ".json";
  if (getCheckBox("checkUsePrefix") == true) {
    vExportPrefix = getExportPrefix4DB(vDBname);
  };
  if (existsDatabaseJS(vDBname)) {
    vContent = stringifyJSON(vJSCC_DB["DatabaseList"][vDBname]);
    selectDatabaseJSON(vDBname);
  } else {
    alert("Database ["+vDBname+"] does not exist in call of selectDatabase()");
  };
  setEditorValue("iJSONDB",vExportPrefix + vContent);
};

function getExportPrefix4DB(pDB) {
  var vPrefix = getValueDOM("tExportPrefix") || "";
  vPrefix = replaceString(vPrefix,"___DB___",pDB);
  return vPrefix;
}

function saveDatabaseJSON() {
  var vDB = getValueDOM("sDatabases");
  var vContent = getEditorValue("iJSONDB");
  vJSCC_DB["DatabaseList"][vDB] = vContent;
}

function selectJSMethods() {
  var vClass = getSelectedClassID();
  //alert("Select Method");
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    //get SELECT MethodName value
    var vMethodName = getValueDOM("sMethodList");
    vClassJS["sMethodList"] = vMethodName;
    //load method code from  vJSCC_DB if exists
    //and write method code to form
    loadMethodJSON(vClass,vMethodName);
    saveJSON2LocalStorage();
  } else {
    console.log("ERROR: selectJSMethods() - vClass '"+vClass+"' does not exist");
  };
};

function getMethCall4Name(pClass,pName) {
  var vMethHash = getMethHash4Name(pClass,pMethName);
  if (isHash(vMethHash)) {
    return getMethCall4MethHash(pMethHash);
  } else {
    console.log("ERROR: getMethCall4Name('"+pClass+"','"+pName+"')");
  }
};

function getMethCall4MethHash(pMethHash) {
  var vCall = pMethHash["name"]+"("+pMethHash["param"]+")";
  if (pMethHash.hasOwnProperty("return")) {
    vCall += ":"+pMethHash["return"];
  };
  return vCall;
};

function getMethDef4MethHash(pMethHash) {
  var vCall = pMethHash["access"]+"("+pMethHash["param"]+")";
  if ((pMethHash["return"]) && (pMethHash["return"] != "")) {
    vCall += ":"+pMethHash["return"];
  };
  return vCall;
};

function getMethHash4Name(pClass,pMethName) {
  var vClass = pClass || getSelectedClassID();
  var vHash = {
    "access": "",
    "name": pMethName,
    "param": "",
    "return": "",
    "comment": "",
    "code": ""
  };
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    if (vClassJS["MethodAccess"].hasOwnProperty(pMethName)) {
      vHash["access"] = vClassJS["MethodAccess"][pMethName];
    };
    if (vClassJS["MethodParameter"].hasOwnProperty(pMethName)) {
      vHash["param"] =  vClassJS["MethodParameter"][pMethName];
    };
    if (vClassJS["MethodReturn"].hasOwnProperty(pMethName)) {
      vHash["return"] =  vClassJS["MethodReturn"][pMethName];
    };
    if (vClassJS["MethodComment"].hasOwnProperty(pMethName)) {
      vHash["comment"] =  vClassJS["MethodComment"][pMethName];
    };
    if (vClassJS["MethodCode"].hasOwnProperty(pMethName)) {
      vHash["code"] =  vClassJS["MethodCode"][pMethName];
    };
  };
  return vHash;
}

function updateClassSelector() {
  var vClassJS = getClassJSON();
  var vClassType = vClassJS["sClassType"] || "Default";
  write2value("sClassType",vClassType);
  createClassSelect();
}

function updateDatabaseSelector() {
  var vArrID = getArray4HashID(vJSCC_DB["DatabaseList"]);
  createDatabaseSelect4Array(vArrID);
};

function updateSelectors(pClass,pFile) {
  var vMethID = "";
  createClassSelect();
  if (existsClassJS(pClass)) {
    vMethID = vJSCC_DB["ClassList"][pClass]["sMethodList"];
    loadMethodJSON(pClass,vMethID);
  };
  console.log("updateSelectors('"+pClass+"','"+pFile+"') vMethID ='"+vMethID+"'");
  var vArrID = getArray4HashID(vJSCC_DB["DatabaseList"]);
  createDatabaseSelect4Array(vArrID);
  // PageType creates Selectors for the Form in Page Form
  createPageTypeSelect();
  createPageSelect();
  createButtonSelect();
  writeClassTitle(getValueDOM("tClassname"));
}
