function deleteClassHTML() {
  var vClassID = getValueDOM("sClassList");
  console.log("deleteClassHTML('"+vClassID+"')");
  var vOK = confirm("Do you want to delete Class ["+vClassID+"]?");
  var vID = "";
  if(vOK == true) {
    var vHashID = ["ClassList","ClassType"];
    for (var i = 0; i < vHashID.length; i++) {
      vID = vHashID[i];
      delete vJSON_JS[vID][vClassID];
    };
    var vArrID = createArray4HashID(vJSON_JS["ClassList"]);
    var vSelClassID = vArrID[0] || ""
    vJSON_JS["SelectedClass"] = vSelClassID;
    write2value("sClassList",vSelClassID);
    updateJSON2Form();
  };
};

function deleteFileHTML() {
  var vFileID = getValueDOM("sFileList");
  console.log("deleteFileHTML('"+vFileID+"')");
  var vOK = confirm("Do you want to delete File ["+vFileID+"]?");
  var vID = "";
  if(vOK == true) {
    var vHashID = ["FileList"];
    for (var i = 0; i < vHashID.length; i++) {
      vID = vHashID[i];
      delete vJSON_JS[vID][vFileID];
    };
    var vArrID = createArray4HashID(vJSON_JS["FileList"]);
    if (vArrID.length > 0) {
      selectFilenameHTML(vArrID[0]);
    } else {
      clearForm4File();
    }
  };
};


function deletePageHTML() {
  var vPageID = getValueDOM("sPageHTML");
  console.log("deletePageHTML('"+vPageID+"')");
  var vOK = confirm("Do you want to delete Page ["+vPageID+"]?");
  var vID = "";
  if(vOK == true) {
    var vHashID = ["PageList","PageContent"];
    for (var i = 0; i < vHashID.length; i++) {
      vID = vHashID[i];
      delete vJSON_JS[vID][vPageID];
    };
    var vArrID = createArray4HashID(vJSON_JS["PageList"]);
    updatePagesJSON2Form(vArrID);
  };
};

function deletePageTypeHTML() {
  var vPageTypeID = getValueDOM("sPageTypeHTML");
  console.log("deletePageTypeHTML('"+vPageTypeID+"')");
  var vOK = confirm("Do you want to delete PageType ["+vPageTypeID+"]?");
  var vID = "";
  if(vOK == true) {
    delete vJSON_JS["PageType"][vPageTypeID];
    var vArrID = createArray4HashID(vJSON_JS["PageType"]);
    updatePageTypeJSON2Form(vArrID);
    clearPageTypeForm();
  };
};

function deleteButtonHTML() {
  var vButtonID = getValueDOM("sButtonHTML");
  console.log("deleteButtonHTML('"+vButtonID+"')");
  if (isButtonUsed(vButtonID)) {
    alert("ERROR: Button ["+vButtonID+"] is still used.\nDelete Button cancelled!");
  } else {
    var vOK = confirm("Do you want to delete Button ["+vButtonID+"]?");
    if(vOK == true) {
      delete vJSON_JS["ButtonList"][vButtonID]
      var vArrID = createArray4HashID(vJSON_JS["ButtonList"]);
      updateButtonJSON2Form(vArrID);
    };
  };
};

function isButtonUsed(pButtonID) {
  var vPageTypeHash = vJSON_JS["PageType"];
  var vPT = null;
  var vRet = false;
  if (pButtonID == "") alert("isButtonUsed() with empty ButtonID");
  for (var iPageType in vPageTypeHash) {
    if (vPageTypeHash.hasOwnProperty(iPageType)) {
      vPT = vPageTypeHash;
      if (vPT["HEADER_BUTTON1"] == pButtonID) {
        vRet = true;
      };
      if (vPT["HEADER_BUTTON2"] == pButtonID) {
        vRet = true;
      };
    };
  };
};

function updateForm2ElementsJSON() {
  console.log("updateForm2ElementsJSON()");
  updateFormFileID2JSON("tElementIDs");
  var vFile 	= getSelectedFilenameHTML();
  var vElements = vJSON_JS["FileList"][vFile]["elements"];
  var vElementsArr = getDefLine2ArrayID(getValueDOM("tElementIDs"));
  var vID = "";
  for (var i = 0; i < vElementsArr.length; i++) {
    vID = vElementsArr[i];
    if (vElements.hasOwnProperty(vID)) {
        console.log("FileList['"+vFile+"']['elements']['"+vID+"'] exists");
    } else {
      vElements[vID] = "";
    };
  };
  //vJSON_JS["FileList"] = getFileListHash();
  //createFileSelect();
};

function getDefLine2ArrayID(pLine) {
  var vLine = pLine || "";
  var vArr = vLine.split("|");
  for (var i = 0; i < vArr.length; i++) {
    vArr[i] = reduceVarName(vArr[i]);
  };
  return vArr;
}

function updateForm2PagesJSON() {
  console.log("updateForm2PagesJSON()");
  updateFormID2JSON('tPages');
  vJSON_JS["PageList"] = getPageListHash();
  write2value("tPages",getPages4tPagesForm());
  createPageSelect();
};

function updatePagesJSON2Form(pArrID) {
  console.log("updatePagesJSON2Form()");
  if (pArrID) {
    write2value("tPages",getPages4tPagesForm(pArrID));
    createPageSelect(pArrID);
  } else {
    console.log("ERROR: updatePagesJSON2Form(pArrID) - pArrID undefined");
  };
};

function updateForm2PageTypeJSON(pPageTypeID) {
  var vPageTypeID = pPageTypeID || getValueDOM("tPageTypeID");
  console.log("updateForm2PageTypeJSON('"+vPageTypeID+"')");
  if (existsPageTypeJS(pPageTypeID)) {
    var vSelHash = vJSON_JS["PageType"][vPageTypeID];
    write2value("tPageTypeHTML",vSelHash["template"]);
    setEditorValue("iPageTypeHTML",vSelHash["template"]);
    write2value("sButtonHeader1",vSelHash["HEADER_BUTTON1"]);
    write2value("sButtonHeader2",vSelHash["HEADER_BUTTON2"]);
  } else {
    console.log("PageType ["+pPageTypeID+"] does NOT exist!");
    clearPageTypeForm();
  };
};

function updatePageTypeJSON2Form(pArrID) {
  console.log("updatePageTypeJSON2Form()");
  if (pArrID) {
    write2value("tPageTypes",getPageType4tPageTypeForm(pArrID));
    createPageTypeSelect(pArrID);
  } else {
    console.log("ERROR: updatePageTypeJSON2Form(pArrID) - pArrID undefined");
  };
};

function updateButtonJSON2Form(pArrID) {
  console.log("updateButtonJSON2Form()");
  if (pArrID) {
    write2value("tButtons",getButton4tButtonsForm(pArrID));
    createButtonSelect(pArrID);
  } else {
    console.log("ERROR: updateButtonJSON2Form(pArrID) - pArrID undefined");
  };
};

function getButton4tButtonsForm(pArrID) {
  var vHash = vJSON_JS["ButtonList"];
  var vArr = [];
  var vLine = "";
  var vID = "";
  var vRECDEF = vButtonRECDEF;
  if (pArrID) {
    for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      console.log("get Record for Form '"+vID+"'");
      vLine = getHash2RecordLine(vRECDEF,vHash[vID]);
      vArr.push(vLine);
    }
  } else {
    console.log("ERROR: getButton4tButtonsForm(pArrID) - pArrID undefined");
  };
  return vArr.join("\n");
};

function getPageType4tPageTypeForm(pArrID) {
  console.log("getPageType4tPageTypeForm(pArrID) pArrID.length="+pArrID.length);
  var vHash = vJSON_JS["PageType"];
  var vArr = [];
  var vLine = "";
  var vID = "";
  var vPageTypeIDs = vPageTypeRECDEF.slice(0,vPageTypeRECDEF.length-1);
  if (pArrID) {
    for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      console.log("get PageType for Form '"+vID+"'");
      vLine = getHash2RecordLine(vPageTypeIDs,vHash[vID]);
      vArr.push(vLine);
    }
  } else {
    console.log("ERROR: getPagesType4tPageTypeForm(pArrID) - pArrID undefined");
  };
  return vArr.join("\n");
};


function getPages4tPagesForm(pArrID) {
  var vHash = vJSON_JS["PageList"];
  var vArr = [];
  var vLine = "";
  var vID = "";
  if (pArrID) {
    for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      console.log("get PageType for Form '"+vID+"'");
      vLine = getHash2RecordLine(vPageRECDEF,vHash[vID]);
      vArr.push(vLine);
    }
  } else {
    console.log("ERROR: getPages4tPageForm(pArrID) - pArrID undefined");
  };
  return vArr.join("\n");
};

function updateForm2PageTypesJSON() {
  console.log("updateForm2PageTypesJSON()");
  updateFormID2JSON('tPageTypes');
  var vClassJS = getClassJSON();
  vClassJS["PageType"] = getPageTypeHash();
};

function updateForm2ButtonJSON() {
  console.log("updateForm2PageTypesJSON()");
  updateFormID2JSON('tButtons');
  var vClassJS = getClassJSON();
  vClassJS["ButtonList"] = getButtonListHash();
};

function getButtonListHash() {
  var vHash = {};
  var vButtArr = getTextareaArray("tButtons");
  for (var i = 0; i < vButtArr.length; i++) {
    vButtArr[i]
  }
};

function getGlobalLibArray() {
  return getTextareaArray("tLibraries");
}


function getDatabaseArray() {
  return getTextareaArray("tDatabases");
}

function getPageTypeArray() {
  var vArr = getTextareaArray("tPageTypes");
  var vPageTypeArray = [];
  var vPT1Hash = null;
  var vID = "";
  for (var i = 0; i < vArr.length; i++) {
    vPT1Hash = getPageTypeLine2Hash(vArr[i]);
    // insert the template definition of PageType if exists in vJSON_JS
    // else insert a defaulttemplate
    vID = vPT1Hash["page-type"];
    if (vJSON_JS["PageType"] && vJSON_JS["PageType"][vID]) {
      vPT1Hash["template"] = vJSON_JS["PageType"][vID]["template"];
    } else {
      vPT1Hash["template"] = getDefaultPageTypeContent(vID);
    };
    vPageTypeArray.push(vPT1Hash);
  };
  return vPageTypeArray
};

function getFormClassType4Class(pClass) {
   var vHash = getForm2ClassTypeHash();
   var vClass = reduceVarName(pClass);
   var vClassType = vHash[vClass] || "";
   console.log("FormClassType["+vClass+"]='"+vClassType+"'");
   return vClassType;
};

function showHashContent4LOG(pPrefixLOG,pHash) {
  var vHash = pHash || {};
  console.log("showHashContent4LOG() - Show Hash Content in Browser Log");
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      console.log(pPrefixLOG+" '"+iID+"'='"+vHash[iID]+"'");
    };
  };

}

function getForm2ClassTypeHash() {
   var vHash = getClassTypeHash();
   showHashContent4LOG("getForm2ClassTypeHash():",vHash);
   return vHash;
};

function getPageTypeHash() {
  var vArr = getPageTypeArray();
  var vPageTypeHash = {};
  var vID = "";
  for (var i = 0; i < vArr.length; i++) {
    vID = vArr[i]["page-type"];
    vID = reduceVarName(vID);
    // vArr[i] is a PageType-Hash with the IDs vPageTypeRECDEF in index.html
    vPageTypeHash[vID] = vArr[i];
  };
  return vPageTypeHash
};

function getPageListArray() {
  var vArr = getPageListArrayWithHashes();
  var vID = "";
  var vRetArr = [];
  for (var i = 0; i < vArr.length; i++) {
    vID = vArr[i]["PAGE_ID"];
    vID = reduceVarName(vID);
    vRetArr.push(vID);
  };
  return vRetArr;
};

function getPageListArrayWithHashes(pFile) {
   //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
   // Function can be called with pFile as parameter and without.
   // (1) With paramter pFile all Pages in the HTML file pFile are exported
   // (2) Without parameter all PagesHash are exported
   var vPageID = "";
   //var vPageTypeID = "";
   var vPageArr = [];
   var vPageList = getPageListForm();
   // get all defined Pages from Form
   if (pFile) {
     // (1) With paramter pFile all Pages in the HTML file pFile are exported
     var vPageIDArr = getPageIDArr4File(pFile);
     var vID = "";
     for (var i = 0; i < vPageIDArr.length; i++) {
       vID = vPageIDArr[i];
       if (vPageList[vID]) {
         vPageArr.push(vPageList[vID])
       } else {
         console.log("WARNING: Page with PageID ["+vID+"] does not exist, JSCC will create one for you");
         getDefaultPageHash(vID);
       }
     }
   }
   var vArr = getTextareaArray("tPages");
   for (var i = 0; i < vArr.length; i++) {
     var vHash = getPageLine2Hash(vArr[i]);
     vPageID = vHash["PAGE_ID"];
     vPageID = reduceVarName(vPageID);
     //vPageTypeID = vHash["page-type"];
     if (vPageID && (vPageID != "")) {
       vPageArr.push(vHash);
     } else {
       console.log("getPageListArrayWithHashes()-Call: vPageID undefined!");
     }
   };
   return vPageArr;
};



function getPageIDArr4File(pFile) {
  var vFile = pFile || "";
  console.log("getPageIDArr4File('"+vFile+"')");
  var vPageIDArr = [];
  if (vFile != "") {
    if (existsFileJS(vFile)) {
      var vIDs = vJSON_JS["FileList"][vFile]["tPageIDs"];
      vIDs = removeSpaces(vIDs);
      if (vIDs != "") {
        vPageIDArr = vIDs.split("|");
      };
    };
  };
  if (vPageIDArr.length = 0) {
    console.log("tPageID was empty for Page '"+vFile+"'");
    vPageIDArr = getAllPageIDsJSON();
  };
  return vPageIDArr;
}

function getAllPageIDsJSON() {
  var vPageIDArr = [];
  if (vJSON_JS["PageList"]) {
    var vPageList = vJSON_JS["PageList"];
    for (var iID in vPageList) {
      if (vPageList.hasOwnProperty(iID)) {
        vPageIDArr.push(iID)
      };
    };
  };
  return vPageIDArr;
}

function getPageListForm() {
  var vPageList = {};
  var vArr = getTextareaArray("tPages");
  for (var i = 0; i < vArr.length; i++) {
    var vHash = getPageLine2Hash(vArr[i]);
    vPageID = vHash["PAGE_ID"];
    vPageID = reduceVarName(vPageID);
    vHash["PAGE_ID"] = vPageID;
    vPageList[vPageID] = vHash;
    //vPageTypeID = vHash["page-type"];
  };
  return vPageList
};

function getPageListJSON() {
  var vPageList = {};
  if (vJSON_JS["PageList"]) {
    vPageList = vJSON_JS["PageList"]
  } else {
    vPageList = {};
    console.log("ERROR: PageList in JSON undefined");
  };
  return vPageList;
}

function getButtonLine2Hash(pLine) {
  //console.log("getButtonLine2Hash('"+pLine+"')");
  return getRecordLine2Hash(vButtonRECDEF,pLine);
}

function getPageTypeLine2Hash(pLine) {
  //console.log("getPageTypeLine2Hash('"+pLine+"')");
  return getRecordLine2Hash(vPageTypeRECDEF,pLine);
}

function getPageLine2Hash(pLine) {
   //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
   //console.log("getPageLine2Hash('"+pLine+"')");
   var vHash = {};
   var vRecord = vPageRECDEF;
   var vArr = pLine.split("|");
   for (var k = 0; k < vRecord.length; k++) {
     vHash[vRecord[k]] = vArr[k] || "";
   };
   return vHash;
   //return getRecordLine2Hash(vPageRECDEF,pPageLine,1);
};

function getString2Array(pString) {
  var vRet = [];
  //console.log("getString2Array(pString) pString='"+pString+"'");
  if (pString) {
    pString = removeEmptyLines(pString);
    if (pString.length > 0) {
      vRet = pString.split("\n");
    } else {
      console.log("getString2Array(pString)  pString.length=0");
    };
  } else {
    console.log("getString2Array(pString) pString is UNDEFINED");
  };
  return vRet;
};

function getRecordLine2Hash(pRecord,pLine) {
   //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
   //console.log("getRecordLine2Hash('"+pLine+"')");
   var vHash = {};
   var vArr = pLine.split("|");
   var vID = "";
   for (var k = 0; k < pRecord.length; k++) {
     vHash[pRecord[k]] = vArr[k] || "";
   };
   return vHash;
};

function getHash2RecordLine(pRecord,pHash) {
   //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
   console.log("getHash2RecordLine()");
   var vArr = [];
   var vValue = "";
   var vHash = pHash || {};
   //pLine.split("|");
   for (var k = 0; k < pRecord.length; k++) {
     if (vHash.hasOwnProperty(pRecord[k])) {
         vArr.push(vHash[pRecord[k]]);
     } else {
       vArr.push("");
     };
   };
   return vArr.join("|");
};


function getTextareaArray(pTextareaID) {
  var vDatabases = getValueDOM(pTextareaID);
  var vArrDB = getString2Array(vDatabases);
  return removeExtensionJS4Array(vArrDB);
}

function updateForm2DatabasesJSON() {
  updateFormID2JSON('tDatabases');
  var vNameDB = getDatabaseArray();
  var vDBHash = {};
  var vDB = "";
  for (var i = 0; i < vNameDB.length; i++) {
    vDB = vNameDB[i];
    vDBHash[vDB] = vJSON_JS["DatabaseList"][vDB] || "{\n  \"name\": \""+vDB+"\"\n}";
  };
  vJSON_JS["DatabaseList"] =  vDBHash;
  createDatabaseSelect(vNameDB);
};

function removeExtensionJS4Array(pArrDB) {
  var vRetArr = [];
  var vLine = "";
  for (var i = 0; i < pArrDB.length; i++) {
    vLine = (pArrDB[i]).replace(/\.js$/,"")
    vRetArr.push(vLine);
  };
  return vRetArr;
}

function getButtonArrayWithHashes() {
  var vLineArr = getString2Array(getValueDOM("tButtons"));
  var vRetArr = [];
  for (var i = 0; i < vLineArr.length; i++) {
    vRetArr.push(getRecordLine2Hash(vButtonRECDEF,vLineArr[i]));
  };
  console.log("getButtonArray()-Call - "+vRetArr.length+" Buttons with splitted [tButtons]");
  return vRetArr;
}

function getFileListHash() {
  console.log("getFileListHash()-Call from Form");
  var vFileArr = getFileListArrayWithHashes();
  var vPageHash = {};

}

function getPageListHash() {
  console.log("getPageListHash()-Call from Form");
  //vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
  var vPageArr = getPageListArrayWithHashes();
  var vPageHash = {};
  var vID = "";
  var vPageID = "";
  for (var i = 0; i < vPageArr.length; i++) {
    vPageID = vPageArr[i]["PAGE_ID"];
    console.log("getPageHash() - Page ["+vPageID+"]");
    // vPageArr[i] is a Hash with the IDs vPageRECDEF create with getPageLine2Hash(pLine)
    vPageHash[vPageID] = vPageArr[i];
    //vPageHash[vPageID]["page-content"] = "Content for Page ["+vPageID+"]";
  };
  return vPageHash;
};

function createButtonJS(pButtonHash) {
  var vButtonID = reduceVarName(pButtonHash["BUTTON_ID"]);
  if ((!pButtonHash["counter"]) || (pButtonHash["counter"] == "")) {
    pButtonHash["counter"] = 0
  };
  console.log("createButtonJS(pButtonHash)-Call for ID='"+vButtonID+"' Button Counter="+pButtonHash["counter"]);
  var vExists = existsButtonJS(vButtonID);
  if (vExists) {
    //alert("Button '"+vButtonID+"' already exists!");
    console.log("Button '"+vButtonID+"' already exists!");
  } else {
    console.log("createButtonJS('"+vButtonID+"')-Call: Create Button '"+vButtonID+"'");
    checkButtonList(vButtonID);
    vJSON_JS["ButtonList"][vButtonID] = pButtonHash;
  };
  return vExists;
};

function createNewButton() {
  console.log("Click New - create a new Button with [+]");
  if (askCreateNew("Button",getValueDOM("tButtonID"))) {
    createNewButton_do()
  };
};

function askCreateNew(pName,pID) {
  var vOK = confirm("Do you want to create "+pName+" ["+pID+"]?");
  return vOK;
}

function createNewButton_do() {
  console.log("Create a new Button with [+]");
  var vNewButtonID = getValueDOM("tButtonID");
  var vNewButtonDefHTML = getValueDOM("tButtonDefHTML");
  var vErrorMSG = "";
  var vSuccess = false;
  var vCount = 0;
  if (vNewButtonID == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") ButtonID is undefined!"
  };
  if (existsButtonJS(vNewButtonID)) {
    vCount++;
    vErrorMSG = "\n("+vCount+") Button ["+vNewButtonID+"] already defined!"
  };
  if (vNewButtonDefHTML == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") Title of Button ["+vNewButtonID+"] is undefined!"
  };
  if (vErrorMSG == "") {
    //write2value("tButtonID", vNewButtonName);
    var vNewButtonHash = {
      "BUTTON_ID":vNewButtonID,
      "button-html": vNewButtonDefHTML
    };
    vFailed = createButtonJS(vNewButtonHash);
    //vFailed == true means Button exists,
    if (vFailed) {
      alert("Create New Button ["+vNewButtonID+"] was NOT successful. Button already exists!");
      selectButtonJS(vNewButtonID);
    } else {
      console.log("successful createButtonJS()-Call");
      vJSON_JS["ButtonList"][vNewButtonID] = vNewButtonHash;
      write2value("tButtons", getButtonListString());
      createButtonSelect();
      //updateButtons();
      //updateJSON2Form(vNewButtonName);
      vSuccess = true;
      //$( "#tabClass" ).trigger( "click" );
    };
  } else {
    vErrorMSG = "ERROR Create New Button:"+vErrorMSG;
    alert(vErrorMSG);
    console.log("Create new Button cancelled!\n"+vErrorMSG);
  };
  return vSuccess;
};

function createNewFile() {
  console.log("Click New - create a new Page with [+]");
  if (askCreateNew("File",getValueDOM("tFilename"))) {
    createNewFile_do()
  };
};

function createNewFile_do() {
  console.log("Create a new File with [+]");
  var vNewFile = getValueDOM("tFilename") || "";
  if (vNewFile != "") {
    vNewFile = removeSpaces(vNewFile);
  };
  if (vNewFile != "") {
    if (existsFileJS(vFile)) {
      alert("Create New File ["+vNewFile+"] was NOT successful. File already exists!");
    } else {
      checkFileHTML(vNewFile);
      selectFilenameHTML_do(vNewFile);
      write2value("tFilename",vNewFile);
      console.log("Create New File ["+vNewFile+"] performed");
    };
  };
};

function createNewPage() {
  console.log("Click New - create a new Page with [+]");
  if (askCreateNew("Page",getValueDOM("tPageID"))) {
    createNewPage_do()
  };
};

function createNewPage_do() {
  console.log("Create a new Page with [+]");
  //var vNewPageName = prompt("Please enter name of new Page", "");
  var vNewPageID = getValueDOM("tPageID");
  var vNewPageTitle = getValueDOM("tPageTitle");
  var vNewPageType  = getValueDOM("sPageType4Page");
  console.log("createNewPage(): sPageType4Page='"+vNewPageType+"'");
  var vParentPageID = getValueDOM("sParentPage");
  var vErrorMSG = "";
  var vSuccess = false;
  var vCount = 0;
  if (vNewPageID == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") PageID is undefined!"
  };
  if (vNewPageID == vParentPageID) {
    vCount++;
    vErrorMSG = "\n("+vCount+") Parent Page ID ["+vParentPageID+"] can not be equal PageID!"
  };
  if (vNewPageType == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") PageType for Page ["+vNewPageID+"] is not defined!"
  };
  if (vNewPageTitle == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") Title of Page ["+vNewPageID+"] is undefined!"
  };
  if (vErrorMSG == "") {
    //write2value("tPageID", vNewPageName);
    var vNewPageHash = {
      "PAGE_ID":vNewPageID,
      "PAGE_TITLE": vNewPageTitle,
      "page-type": vNewPageType,
      "parent-id": vParentPageID
    };
    vFailed = createPageJS(vNewPageHash);
    //vFailed == true means Page exists,
    if (vFailed) {
      alert("Create New Page ["+vNewPageID+"] was NOT successful. Page already exists!");
      selectPageJS(vNewPageID);
    } else {
      vJSON_JS["PageList"][vNewPageID] = vNewPageHash;
      write2value("tPages", getPageListString());
      createPageSelect();
      //updatePages();
      //updateJSON2Form(vNewPageName);
      vSuccess = true;
      //$( "#tabClass" ).trigger( "click" );
    };
  } else {
    vErrorMSG = "ERROR Create New Page:"+vErrorMSG;
    alert(vErrorMSG);
    console.log("Create new Page cancelled!\n"+vErrorMSG);
  };
  return vSuccess;
};

function createPageTypeJS(pPageTypeHash) {
  var vPageTypeID = pPageTypeHash["page-type"] || "";
  var vSuccess = true;
  if (vPageTypeID != "") {
    console.log("createPageTypeJS(pHash) for '"+vPageTypeID+"'");
    vPageTypeID = reduceVarName(vPageTypeID);
    if (existsPageTypeJS(vPageTypeID)) {
      //alert("Page '"+pPageType+"' already exists!");
      console.log("PageType '"+vPageTypeID+"' already exists!");
    } else {
      console.log("createPageTypeJS()-Call: Create PageType '"+vPageTypeID+"'");
      checkPageType(vPageTypeID);
      //vJSON_JS["PageType"][pPageType] = vPageTypeHash[pPageType] || {};
      vJSON_JS["PageType"][vPageTypeID]["template"] = getDefaultPageTypeContent(vPageTypeID);
    };
  } else {
    console.log("createPageTypeJS()-Call not sucessful - vPageTypeID=''");
    vSuccess = false
  };
  return vSuccess;
};

function createNewPageType() {
  console.log("Click New - create a new Button with [+]");
  if (askCreateNew("Page Type ",getValueDOM("tPageTypeID"))) {
    createNewPageType_do()
  };
}

function createNewPageType_do() {
  console.log("Click New - create a new class after prompt");
  //var vNewPageName = prompt("Please enter name of new Page", "");
  var vPageTypeID = getValueDOM("tPageTypeID");
  var vLeftButtonID  = getValueDOM("sButtonHeader1");
  var vRightButtonID = getValueDOM("sButtonHeader2");
  var vTemplate = getEditorValue("iPageTypeHTML");
  var vErrorMSG = "";
  var vSuccess = false;
  var vCount = 0;
  if (vPageTypeID == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") PageTypeID is undefined!"
  };
  if (vLeftButtonID == vRightButtonID) {
    if (vLeftButtonID != "") {
      vCount++;
      vErrorMSG = "\n("+vCount+")  ID for Left and Right Button in Header ["+vRightButtonID+"] can not be equal!"
    }
  };
  if (vErrorMSG == "") {
    //write2value("tPageID", vNewPageName);
    var vNewPageHash = {
      "page-type":  vPageTypeID,
      "HEADER_BUTTON1": vLeftButtonID,
      "HEADER_BUTTON2": vRightButtonID,
      "template":   vTemplate
    };
    console.log("CALL: createPageTypeJS() for ["+vPageTypeID+"]");
    vFailed = createPageTypeJS(vNewPageHash);
    //vFailed == true means Page exists,
    if (vFailed) {
      alert("Create New Type Page ["+vPageTypeID+"] was NOT successful. Page Type already exists!");
      selectPageTypeJS(vPageTypeID);
    } else {
      vJSON_JS["PageType"][vPageTypeID] = vNewPageHash;
      write2value("tPageTypes", getPageTypeString());
      createPageTypeSelect();
      //updatePages();
      //updateJSON2Form(vNewPageName);
      vSuccess = true;
      //$( "#tabClass" ).trigger( "click" );
    };
  } else {
    vErrorMSG = "ERROR Create New Type Page:"+vErrorMSG;
    alert(vErrorMSG);
    console.log("Create new Type Page cancelled!\n"+vErrorMSG);
  };
  return vSuccess;
}

function getHash4Record2String(pRECDEF,pHashJSON,pCutAtEnd) {
  var vCutAtEnd = pCutAtEnd || 0;
  var vHash = pHashJSON || {}; // e.g. vJSON_JS["PageList"];
  var vRECDEF = pRECDEF || []; // ["page-type","...",...]
  var vOut = "";
  var vCR = "";
  var vSep = "";
  var vMaxRec = vRECDEF.length - vCutAtEnd;
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vOut += vCR;
      vSep = "";
      for (var i = 0; i < vMaxRec; i++) {
        vOut += vSep+vHash[iID][vRECDEF[i]];
        vSep = "|";
      }
      vCR = "\n";
    };
  };
  return vOut;
};

function updateFormElementIDs2JSON(pFile) {
  var vFile = pFile || getValueDOM("tFilename") || "";
  var vRet = "";
  if (vFile != "") {
    if (existsFileJS(vFile)) {
      var vElemIDs = getValueDOM("tElementIDs");
      vElemIDs = removeSpaces(vElementIDs);
      var vElemArrID = [];
      if (vElemIDs != "") {
        vElemArrID = vElemIDs.split("|");
      };
      var vID = "";
      // vHash contains the OLD Element Definitions
      var vHash = vJSON_JS["FileList"][vFile]["elements"];
      // in vElemHash the NEW Element Definitions are populated
      var vElemHash = {};
      for (var i = 0; i < vElemArrID.length; i++) {
        vID = vElemArrID[i];
        if (vHash.hasOwnProperty(vID)) {
          // an OLD defintion exists and the NEW definitions are defined
          vElemHash[vID] = vHash[vID];
        } else {
          // vID is a NEW Element Definition init that with a default value
          vElemHash[vID] = getDefaultElementString(vFile,vID);
        };
      };
      // set Elements with the NEW Element Definitions
      vJSON_JS["FileList"][vFile]["elements"] = vElemHash;
      write2value("tElementIDs",getElementListString(vFile));
      createElementSelect();
    };
  };
}

function getElementListString(pFile) {
  var vFile = pFile || getValueDOM("tFilename") || "";
  var vRet = "";
  if (vFile != "") {
    if (existsFileJS(vFile)) {
      var vArrID = getArray4HashID(vJSON_JS["FileList"][vFile]["elements"]);
      vRet = vArrID.join("|");
    };
  };
  return vRet;
};

function getPageListString() {
  var vCutColsAtEnd = 0;
  return getHash4Record2String(vPageRECDEF,vJSON_JS["PageList"],vCutColsAtEnd);
};


function getButtonListString() {
  var vCutColsAtEnd = 1;
  return getHash4Record2String(vButtonRECDEF,vJSON_JS["ButtonList"],vCutColsAtEnd);
};

function getPageTypeString() {
  return getHash4Record2String(vPageTypeRECDEF,vJSON_JS["PageType"],1);
};

function prompt4hash(pHash) {
  var vText = prompt("Please enter "+pHash["title"]+"!",pHash["init"]);
  pHash["success"] = false;
  if (!vText) {
    console.log(pHash["title"]+" cancelled!");
    vText = "";
  } else if (vText == "") {
    console.log("Content for '"+ pHash["title"]+"' is empty!");
    //pHash["success"] = true;
  } else {
    pHash["success"] = true;
  };
  pHash["text"] = vText;
  return vText;
}

function createPageJS(pPageHash) {
  var vPageID = reduceVarName(pPageHash["PAGE_ID"]);
  var vExists = existsPageJS(vPageID);
  if (vExists) {
    //alert("Page '"+vPageID+"' already exists!");
    console.log("Page '"+vPageID+"' already exists!");
  } else {
    console.log("createPageJS('"+vPageID+"')-Call: Create Page '"+vPageID+"'");
    checkPageList(vPageID);
    var vNewPageType = pPageHash["page-type"];
    // Create the PageType if not exists
    if (existsPageTypeJS(vNewPageType)) {
      console.log("PageType ["+vNewPageType+"] for Page ["+vPageID+"] exists");
    } else {
      console.log("PageType ["+vNewPageType+"] for Page ["+vPageID+"] will be CREATED!")
      createDefaultPageTypeJS(vNewPageType);
    };
    vJSON_JS["PageList"][vPageID] = pPageHash;
    vJSON_JS["PageContent"][vPageID] = "Content for Page '"+vPageID+"'";
  };
  return vExists;
};

function createDefaultPageTypeJS(pPageTypeID) {
  var vNewPageTypeHash = {
    "page-type":pPageTypeID,
    "HEADER_BUTTON1":"",
    "HEADER_BUTTON2":"",
    "template":getDefaultPageTypeContent(pPageTypeID)
  };
  if (pPageTypeID != "") {
    createPageTypeJS(vNewPageTypeHash);
  };
};


function checkButtonList(pButtonID) {
  if (vJSON_JS["ButtonList"]) {
    if (vJSON_JS["ButtonList"][pButtonID]) {
      console.log("Button '"+pButtonID+"' exists in ButtonList of JSON Database");
    } else {
      vJSON_JS["ButtonList"][pButtonID] = {};
      console.log("checkButtonList('"+pButtonID+"') created empty ButtonHash in JSON Database");
    };
  } else {
    console.log("checkButtonList('"+pButtonID+"') created (1) ButtonList in JSON Database");
    vJSON_JS["ButtonList"] = {};
    console.log("checkButtonList('"+pButtonID+"') created (2) empty ButtonHash in JSON Database");
    vJSON_JS["ButtonList"][pButtonID] = {};
  };
};

function checkPageList(pPageID) {
  if (vJSON_JS["PageList"]) {
    if (vJSON_JS["PageList"][pPageID]) {
      console.log("Page '"+pPageID+"' exists in PageList of JSON Database");
    } else {
      vJSON_JS["PageList"][pPageID] = {};
      console.log("checkPageList('"+pPageID+"') created empty PageHash in JSON Database");
    };
  } else {
    console.log("checkPageList('"+pPageID+"') created (1) PageList in JSON Database");
    vJSON_JS["PageList"] = {};
    console.log("checkPageList('"+pPageID+"') created (2) empty PageHash in JSON Database");
    vJSON_JS["PageList"][pPageID] = {};
  };
  checkPageContent(pPageID);
};

function checkPageContent(pPageID) {
  if (vJSON_JS["PageContent"]) {
    if (vJSON_JS["PageContent"][pPageID]) {
      console.log("Page '"+pPageID+"' exists in PageContent of JSON Database");
    } else {
      vJSON_JS["PageContent"][pPageID] = {};
      console.log("checkPageContent('"+pPageID+"') created empty PageHash in JSON Database");
    };
  } else {
    console.log("checkPageContent('"+pPageID+"') created (1) PageContent in JSON Database");
    vJSON_JS["PageContent"] = {};
    console.log("checkPageContent('"+pPageID+"') created (2) empty PageHash in JSON Database");
    vJSON_JS["PageContent"][pPageID] = {};
  };
};

function checkPageType(pPageType) {
  var vFillHash = true;
  if (vJSON_JS["PageType"]) {
    if (vJSON_JS["PageType"][pPageType]) {
      console.log("PageType '"+pPageType+"' exists in JSON Database");
      vFillHash = false;
    } else {
      vJSON_JS["PageType"][pPageType] = {};
      console.log("checkPageType('"+pPageType+"') created empty PageHash in JSON Database");
    };
    vJSON_JS["PageType"][pPageType] = {};
    console.log("checkPageType('"+pPageType+"') created Page in JSON Database");
  } else {
    console.log("checkPageType('"+pPageType+"') created (1) PageType in JSON Database");
    vJSON_JS["PageType"] = {};
    console.log("checkPageType('"+pPageType+"') created (2) PageType in JSON Database");
    vJSON_JS["PageType"][pPageType] = {};
  };
  if (vFillHash) {
    fillPageTypeRecord(pPageType,vJSON_JS["PageType"][pPageType]);
  }
};

function fillPageTypeRecord(pPageType,pPageTypeRecord) {
  var vButton1 = "";
  var vButton2 = "";
  if (pPageTypeRecord) {
    var vPageTypeHash = getPageTypeHash();
    pPageTypeRecord["page-type"] = pPageType;
    if (vPageTypeHash) {
      console.log("fillPageTypeRecord()-Call - vPageTypeHash defined ");
      if (vPageTypeHash[pPageType]) {
        vButton1 = vPageTypeHash[pPageType]["HEADER_BUTTON1"]
        vButton2 = vPageTypeHash[pPageType]["HEADER_BUTTON2"]
      } else {
        console.log("fillPageTypeRecord()-Call - vPageTypeHash['"+pPageType+"'] undefined Buttons");
      }
    };
    pPageTypeRecord["HEADER_BUTTON1"] = vButton1;
    pPageTypeRecord["HEADER_BUTTON2"] = vButton2;
    pPageTypeRecord["template"] = getDefaultPageTypeContent(pPageType);
  } else {
    console.log("fillPageTypeRecord(pPageTypeRecord) - pPageTypeRecord UNDEFINED");
  };
};

function getDefaultPageTypeContent(pPageType) {
  var vOut = getValueDOM("tTplPAGE");
  switch (pPageType) {
    case "Welcome":

      break;
    default:

  };
  vOut = replaceString(vOut,"___PAGE_TYPE_ID___",pPageType);
  return vOut;
};

function existsPageTypeJS(pPageType) {
  return existsListJS("PageType","PageType",pPageType);
};

function existsButtonJS(pButtonID) {
  return existsListJS("Button","ButtonList",pButtonID);
};

function savePageHTML() {
  var vID = getValueDOM("sPageHTML");
  console.log("savePageHTML() - Page ["+vID+"]");
  save2LevelID2JSON("PageContent",vID,getEditorValue("iPageHTML"));
  saveJSON2LocalStorage("json");
  alert("Page ['"+vID+"'] saved!");
}

function savePageTypeHTML() {
  var vID = getValueDOM("sPageTypeHTML");
  console.log("savePageTypeHTML() - Page Type ["+vID+"]");
  save2LevelID2JSON("PageType",vID,"template",getEditorValue("iPageTypeHTML"));
  saveJSON2LocalStorage("json");
  alert("Page Type ['"+vID+"'] saved!");
}

function existsPageJS(pPageID) {
  return existsListJS("Page","PageList",pPageID);
};

function existsFileJS(pFileID) {
  return existsListJS("File","FileList",pFileID);
};

function existsElementJS(pFileID,pElementID) {
  var vExists = false;
  var vFile = pFileID || getValueDOM("tFilename");
  var vElementList = getElementListHash(vFile);
  if (existsFileJS(vFile)) {
    var vElemHash = vJSON_JS["FileList"][vFile]["elements"]
    if (vElemHash) {
      if (vElemHash.hasOwnProperty(pElementID)) {
          vExists = true;
      };
    };
  };
  return vExists;
};



function existsListJS(pName,pListID,pID) {
  if (!pID) {
    alert("exists"+pName+"JS(p"+pName+"ID)-Call with p"+pName+"ID undefined");
  };
  console.log("exists"+pName+"JS('"+pID+"')");
  var vReturn = false;
  if (vJSON_JS) {
    if (vJSON_JS[pListID]) {
      if (vJSON_JS[pListID][pID]) {
        vReturn = true;
        console.log(pName+" with '"+pID+"' is a user-defined in vJSON_JS["+pListID+"].");
      };
    };
  };
  if (vReturn == false) {
    console.log("WARNING: In "+pListID+" '"+pID+"' does NOT exist.");
  };
  return vReturn
};
