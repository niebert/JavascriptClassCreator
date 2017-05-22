function deleteClassHTML() {
  var vClassID = getValueDOM("sClassList");
  console.log("deleteClassHTML('"+vClassID+"')");
  var vOK = confirm("Do you want to delete Class ["+vClassID+"]?");
  var vID = "";
  if(vOK == true) {
    var vHashID = ["ClassList","ClassType"];
    for (var i = 0; i < vHashID.length; i++) {
      vID = vHashID[i];
      delete vJSCC_DB[vID][vClassID];
    };
    var vArrID = createArray4HashID(vJSCC_DB["ClassList"]);
    var vSelClassID = vArrID[0] || ""
    vJSCC_DB["SelectedClass"] = vSelClassID;
    write2value("sClassList",vSelClassID);
    updateJSON2Form(); //Call: deleteClassHTML
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
      delete vJSCC_DB[vID][vFileID];
    };
    updateFileList2Form();
    clearForm4File();
    //selectFilenameHTML();
  };
};

function  updateFileList2Form() {
  var vArrID = createArray4HashID(vJSCC_DB["FileList"]);
  var vString = vArrID.join("\n");
  write2value("tHTMLfiles",removeEmptyLines(vString));
  createFileSelect();
}



function deletePageHTML() {
  var vPageID = getValueDOM("sPageHTML");
  console.log("deletePageHTML('"+vPageID+"')");
  var vOK = confirm("Do you want to delete Page ["+vPageID+"]?");
  var vID = "";
  if (vOK == true) {
    if (existsPageJS(vPageID)) {
      delete vJSCC_DB["PageList"][vPageID];
      var vArrID = createArray4HashID(vJSCC_DB["PageList"]);
      updatePagesJSON2Form(vArrID);
    };
    clearPageForm();
  };
};

function deletePageTypeHTML() {
  var vPageTypeID = getValueDOM("sPageTypeHTML");
  console.log("deletePageTypeHTML('"+vPageTypeID+"')");
  var vOK = confirm("Do you want to delete PageType ["+vPageTypeID+"]?");
  var vID = "";
  if (vOK == true) {
    if (existsPageTypeJS(vPageTypeID)) {
      delete vJSCC_DB["PageTypeList"][vPageTypeID];
      var vArrID = createArray4HashID(vJSCC_DB["PageTypeList"]);
      updatePageTypeJSON2Form(vArrID);
    };
    clearPageTypeForm();
  };
};

function deleteElementDB() {
  var vElementID = getValueDOM("sElementsDBList");
  console.log("deleteElementDB('"+vElementID+"')");
  if (existsElementDB(vElementID)) {
    var vOK = confirm("Do you want to delete Element ["+vElementID+"]?");
    if(vOK == true) {
      delete vJSCC_DB["ElementsDBList"][vElementID];
      var vArrID = createArray4HashID(vJSCC_DB["ElementsDBList"]);
      createElementsDBSelect();
    };
  } else {
    console.log("ERROR: Element ["+vElementID+"] exists\nDelete Element cancelled!");
  };
};

function deleteElementHTML() {
  var vElementID = getValueDOM("sElementsFileList");
  var vFile = getSelectedFilenameHTML();
  console.log("deleteElementHTML('"+vElementID+"')");
  if (existsElementJS(vElementID,vFile)) {
    var vOK = confirm("Do you want to delete Element ["+vElementID+"]?");
    if(vOK == true) {
      delete vJSCC_DB["FileList"][vFile]["elements"][vElementID];
      var vArrID = createArray4HashID(vJSCC_DB["FileList"][vFile]["elements"]);
      console.log(vArrID.join(","));
      updateElementsFileJSON2Form(vFile,vArrID);
    };
  } else {
    console.log("ERROR: Element ["+vElementID+"] exists\nDelete Element cancelled!");
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
      delete vJSCC_DB["ButtonList"][vButtonID]
      var vArrID = createArray4HashID(vJSCC_DB["ButtonList"]);
      updateButtonJSON2Form(vArrID);
    };
  };
};

function isButtonUsed(pButtonID) {
  var vPageTypeHash = vJSCC_DB["PageTypeList"];
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
  updateFormFileID2JSON("tElementFileIDs");
  var vFile 	= getSelectedFilenameHTML();
  var vElements = vJSCC_DB["FileList"][vFile]["elements"];
  var vElementsArr = getDefLine2ArrayID(getValueDOM("tElementFileIDs"));
  var vID = "";
  for (var i = 0; i < vElementsArr.length; i++) {
    vID = vElementsArr[i];
    if (vElements.hasOwnProperty(vID)) {
        console.log("FileList['"+vFile+"']['elements']['"+vID+"'] exists");
    } else {
      vElements[vID] = "";
    };
  };
  //vJSCC_DB["FileList"] = getFileListHash();
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
  vJSCC_DB["PageList"] = getPageListHash();
  write2value("tPages",getPages4tPagesForm());
  createPageSelect();
};

function updatePagesJSON2Form(pArrID) {
  console.log("updatePagesJSON2Form()");
  if (pArrID) {
    write2value("tPages",getPages4tPagesForm(pArrID));
    createPageSelect4Array(pArrID);
  } else {
    console.log("ERROR: updatePagesJSON2Form(pArrID) - pArrID undefined");
  };
};

function updateForm2PageTypeJSON(pPageTypeID) {
  var vPageTypeID = pPageTypeID || getValueDOM("tPageTypeID");
  console.log("updateForm2PageTypeJSON('"+vPageTypeID+"')");
  if (existsPageTypeJS(pPageTypeID)) {
    var vSelHash = vJSCC_DB["PageTypeList"][vPageTypeID];
    write2value("tPageTypeHTML",vSelHash["template"]);
    setEditorValue("iPageTypeHTML",vSelHash["template"]);
    write2value("sButtonHeader1",vSelHash["HEADER_BUTTON1"]);
    write2value("sButtonHeader2",vSelHash["HEADER_BUTTON2"]);
  } else {
    console.log("PageType ["+pPageTypeID+"] does NOT exist!");
    clearPageTypeForm();
  };
};

function updatePageTypeJSON2Form(pPageTypeID) {
  console.log("updatePageTypeJSON2Form()");
  var vListHash = vJSCC_DB["PageTypeList"]
  if (isHash(vListHash)) {
    write2value("tPageTypes",getTextDef4List(vListHash,vPageTypeRECDEF));
    if (pPageTypeID) {
      createPageTypeSelect(pPageTypeID);
    } else {
      createPageTypeSelect();
    };
  } else {
    console.log("ERROR: updatePageTypeJSON2Form(pArrID) - pArrID undefined");
  };
};

function getTextDef4Hash(pHash) {
  var vOutArr = [];
  if (isHash(pHash)) {
    for (var iID in pHash) {
      if (pHash.hasOwnProperty(iID)) {
        vOutArr.push(encodeCR(iID)+"|"+encodeCR(pHash[iID]));
      };
    }
  };
  return vOutArr.join("\n");
};

function parseTextDef2List(pTextDef,pRECDEF,pList) {
  if (typeof(pTextDef) == "string") {
    if (isHash(pList)) {
        // pList vJSCC_DB["PageTypeList"]
        var vLineArr = pTextDef.split("\n");
        var vLine = "";
        var vRecArr;
        for (var i = 0; i < vLineArr.length; i++) {
          vLine = vLineArr[i];
          parseDefLineRECDEF4Hash(vLine,pRECDEF,pList);
        };
    };
  };
};

function updateElementsFileForm2JSON(pFileID) {
  if (existsFileJS(pFileID)) {
    console.log("updateElementsFileJSON2Form('"+pFileID+"')");
    var vList = vJSCC_DB["FileList"][pFileID]["elements"];
    var vArrID_OLD = getArray4HashID(vList);
    var vTextDef = getValueDOM("tElementFileIDs");
    var vArrID_NEW = [];
    if (vTextDef) {
      vTextDef = vTextDef.replace(/\s/g,"");
      vArrID_NEW = vTextDef.split("|");
    };
    updateHash4NewIDs(vList,vArrID_NEW,"Element File '"+pFileID+"' with ID ");
    write2value("tElementFileIDs",vArrID_NEW.join("|"));
    createElementsFileSelect(vFileID); // takes a pipe separted Element String as Input
  } else {
    console.log("ERROR: updateElementsFileJSON2Form(pFileID) - pArrID undefined");
  };
};


function updateElementsFileJSON2Form(pFileID,pArrID) {
  if (existsFileJS(pFileID)) {
    console.log("updateElementsFileJSON2Form('"+pFileID+"')");
    var vArrID = pArrID || getArray4HashID(vJSCC_DB["FileList"][pFileID]["elements"]);
    write2value("tElementFileIDs",vArrID.join("|"));
    createElementsFileSelect(pFileID); // takes a pipe separted Element String as Input
  } else {
    console.log("ERROR: updateElementsFileJSON2Form(pFileID) - pArrID undefined");
  };
};

function getButtonMapID2JSON() {
  // var vButtonRECDEF = ["BUTTON_ID","BUTTON_TITLE","tButtonDefHTML"];
  // variables that are stored for all buttons, counter is necessary to create unique IDs for buttons
  var vMapID = {};
  vMapID["tButtonID"] = "BUTTON_ID";
  vMapID["tButtonTitle"] = "BUTTON_TITLE";
  vMapID["tButtonDefHTML"] = "tButtonDefHTML";
  return vMapID;
}

function updateButtonEditForm2JSON(pID) {
  var vMapID = getButtonMapID2JSON();
  var vButtonID = getValueDOM("tButtonname");
  vButtonID = reduceVarName(vButtonID) || "";
  if (vButtonID != "") {
    var vMapID = getButtonMapID2JSON();
    for (var iID in vMapID) {
      if (vMapID.hasOwnProperty(iID)) {
        vJSCC_DB["ButtonList"][vButtonID][vMapID[iID]] = getValueDOM(iID) || "undefined DOM Content of "+iID;
      };
    };
  };
  var vArrID = getArray4HashID(vJSCC_DB["ButtonList"]);
  updateButtonJSON2Form(vArrID);
}

function updateButtonJSON2Form(pArrID) {
  var vArrID = pArrID || getArray4HashID(vJSCC_DB["ButtonList"]);
  console.log("updateButtonJSON2Form()");
  if (vArrID) {
    write2value("tButtons",getButton4tButtonsForm(vArrID));
    createButtonSelect(vArrID);
  } else {
    console.log("ERROR: updateButtonJSON2Form(pArrID) - pArrID undefined");
  };
};

function getButton4tButtonsForm(pArrID) {
  console.log("getButton4tButtonsForm(["+pArrID.join(",")+"])");
  var vArrID = pArrID || getArray4HashID(vJSCC_DB["ButtonList"]);
  var vHash = vJSCC_DB["ButtonList"];
  var vArr = [];
  var vLine = "";
  var vID = "";
  var vRECDEF = vButtonRECDEF;
  //var vHashCR = encodeNewHashCR(vHash);
  for (var i = 0; i < vArrID.length; i++) {
    vID = vArrID[i];
    if (vHash.hasOwnProperty(vID)) {
      vLine = getHashCR2RecordLine(vRECDEF,vHash[vID]);
      console.log("getButton4tButtonsForm(pArrID) "+vLine);
      vArr.push(vLine);
    }
  };
  return vArr.join("\n");
};

//function getDefLineRECDEF4Hash(pHash,pRECDEF) {

function getDefLine4Hash(pHash) {
  var vOut = "";
  if (isHash(pHash)) {
    vOut = encodeCR(iID) + "|" + encodeCR(pHash[iID]);
  };
  return vOut;
};

function getDefLine4RECDEF(pHash,pRECDEF) {
  var vRecArr = [];
  if (isHash(pHash)) {
    vRecArr.push(encodeCR(pHash[iID]));
  };
  return vRecArr.join("|");
};

function parseDefLine2Hash(pLine,pHash) {
  if (isString(pLine)) {
    var vRecArr = pLine.split("|");
    if (vRecArr.length>0) {
      //first item is the ID - second is the value
      var vID = vRecArr[0];
      // check if ID is empty
      if (reduceVarName(vID) != "") {
        var vValue = vRecArr[1] || "";
        if (isHash(pHash)) {
          pHash[vID] = decodeCR(vValue);
        };
      } else {
        console.log("ERROR: parseDefLine2Hash() - vID undefined");
      };
    }
  };
};

function parseDefLineRECDEF4Hash(pLine,pRECDEF,pHash) {
  if (isString(pLine)) {
    var vRecArr = pLine.split("|");
    if (vRecArr.length>0) {
      //first item is the ID - second is the value
      var vID = vRecArr[0];
      // check if ID is empty
      if (reduceVarName(vID) != "") {
        if (isHash(pHash)) {
          if (pHash.hasOwnProperty(vID)) {
            console.log("ERROR: parseDefLineRECDEF4Hash() pHash['"+vID+"'] exists");
          } else {
            console.log("parseDefLineRECDEF4Hash() create pHash['"+vID+"']");
            pHash[vID] = {};
          };
          vRecHash = pHash[vID];
          var vMax = pRECDEF.length;
          // check if Line Split is shorted the Record Definition pRECDEF
          if (vRecArr.length<vMax) {
            console.log("WARNING: parseDefLineRECDEF4Hash() Line Definition\nto short pHash['"+vID+"']");
            vMax = vRecArr.length;
          };
          // update the values from Line Split in RecHash
          var key = "";
          for (var i = 0; i < vMax; i++) {
            key = pRECDEF[i];
            vRecHash[key] = decodeCR(vRecArr[i]);
          };
        };
      } else {
        console.log("ERROR: parseDefLineRECDEF2Hash() - vID undefined");
      };
    }
  };
};


function updateForm2ButtonsJSON() {
  console.log("updateForm2ButtonsJSON()");
  vJSCC_DB["ButtonList"] = getButtonArrayWithHashes();
  // getValueDOM("tButtons")
};

function getTextDef4List(pList,pArrID) {
  return (getTextDefArray4List(pList,pArrID)).join("\n");
}

function getTextDefArray4List(pList,pArrID) {
  var vID = "";
  var vValue = "";
  var vOutArr = [];
  if (isHash(pList) && isArray(pArrID)) {
    //e.g. pList=vJSCC_DB["PageList"]
    var vRecHash;
    for (var iID in pList) {
      if (pList.hasOwnProperty(iID)) {
        var vRecArr = [];
        //e.g. pList=vJSCC_DB["PageList"]
        vRecHash = pList[iID];
        //e.g. vRecHash=vJSCC_DB["PageList"]["home"]
        for (var i = 0; i < pArrID.length; i++) {
          vID = pArrID[i];
          vValue = vRecHash[vID] || "";
          vRecArr.push(encodeCR(vValue));
        };
        vOutArr.push(vRecArr.join("|"));
      };
    };
  };
  return vOutArr;
};

function getPages4tPagesForm(pArrID) {
  var vHash = vJSCC_DB["PageList"];
  var vArr = [];
  var vLine = "";
  var vID = "";
  if (pArrID) {
    for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      console.log("get Page for Form '"+vID+"'");
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
  vClassJS["PageTypeList"] = getPageTypeHash();
};

function updateForm2ButtonJSON() {
  console.log("updateForm2PageTypesJSON()");
  updateFormID2JSON('tButtons');
  var vClassJS = getClassJSON();
  vClassJS["ButtonList"] = getButtonListHash();
};

function getButtonListHash() {
  var vListHash = {};
  var vHash = {};
  var vButtListArr = getTextareaArray("tButtons");
  var vButtArr;
  var vID = "";
  var vValue = "";
  for (var i = 0; i < vButtListArr.length; i++) {
    vButtArr = vButtArr[i].split("|");
    // Loop over all Buttons
    for (var k = 0; k < vButtonRECDEF.length; k++) {
      vID = vButtonRECDEF[k];
      if (k < vButtArr.length) {
        vValue = decodeCR(vButtArr[k]);
      } else {
        vValue = "undefined "+vID;
      };
      vHash[vID] = vValue;
    }; // vHash populated
    vID = vHash["BUTTON_ID"];
    vListHash[vID] = vHash;
    vValue = vListHash["tButtonDefHTML"];
    vValue = replaceString(vValue,"\\n","\n");
    vListHash["tButtonDefHTML"] = vValue;
  };
  return vListHash;
};

function getGlobalLibArrayWithHashes() {
  return vJSCC_DB["GlobalLibList"];
};


function getGlobalLibArray() {
  return getTextareaArray("tGlobalLibs");
}


function getDatabaseArray() {
  return getArray4HashID(vJSCC_DB["DatabaseList"]);
}

function getDatabaseArrayForm() {
  return getTextareaArray("tDatabases");
}

function getDatabaseArrayJSON() {
  return vJSCC_DB["DatabaseList"];
}

function getPageTypeArray() {
  var vArr = getTextareaArray("tPageTypes");
  var vPageTypeArray = [];
  var vPT1Hash = null;
  var vID = "";
  for (var i = 0; i < vArr.length; i++) {
    vPT1Hash = getPageTypeLine2Hash(vArr[i]);
    // insert the template definition of PageType if exists in vJSCC_DB
    // else insert a defaulttemplate
    vID = vPT1Hash["page-type"];
    if (vJSCC_DB["PageTypeList"] && vJSCC_DB["PageTypeList"][vID]) {
      vPT1Hash["template"] = vJSCC_DB["PageTypeList"][vID]["template"];
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
   // vDebug is a Boolean variable that trigger more console logging
   if (vDebug == "ClassType") {
     showHashContent4LOG("getForm2ClassTypeHash():",vHash);
   };
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
   };
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
      var vIDs = vJSCC_DB["FileList"][vFile]["tPageIDs"];
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
  if (vJSCC_DB["PageList"]) {
    var vPageList = vJSCC_DB["PageList"];
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
  if (vJSCC_DB["PageList"]) {
    vPageList = vJSCC_DB["PageList"]
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

function getHashCR2RecordLine(pRecord,pHash) {
   //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
   console.log("getHashCR2RecordLine()");
   var vOutHash = {};
   for (var iID in pHash) {
     if (pHash.hasOwnProperty(iID)) {
       vOutHash[iID] = encodeCR(pHash[iID]);
     };
   };
   return getHash2RecordLine(pRecord,vOutHash);
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
  var vDataJSONs = getValueDOM(pTextareaID);
  var vArrDB = getString2Array(vDataJSONs);
  return removeExtensionJS4Array(vArrDB);
}

function getDatabaseListJSON() {
  var vDBList = vJSCC_DB["DatabaseList"];
  var vDBID2File = vJSCC_DB["DBID2File"];
  var vArrDB = [];
  for (var iID in vDBID2File) {
    if (vDBID2File.hasOwnProperty(iID)) {
      vArrDB.push(vDBID2File[iID])
    };
  };
  var vDBString = vArrDB.join("\n");
  vJSCC_DB["tDatabases"] = vDBString;
  // write2value("tDatabases",..) and stores in JSON
  write2JSON("tDatabases",vDBString);
  return vDBID2File;
};

function parseDatabasesString2JSON(pDatbasesString) {
  var vDatbasesString = pDatbasesString || vJSCC_DB["tDatabases"];
  console.log("parseDatabasesString2JSON():\n"+vDatbasesString);
  var vDBHash = vJSCC_DB["DBID2File"];
  var vDBID = "";
  // create a hash with the DBnames with DBnames as
  var vDBList = getString2Array(vDatbasesString);
  for (var i = 0; i < vDBList.length; i++) {
    // removes blanks and other characters in vID so that the vID is a variable name
    vDBID = filename2ID(vDBList[i]);
    vDBHash[vDBID] = vDBList[i];
  };
};

function getDatabaseListForm() {
  return getString2Array(getValueDOM("tDatabases"))
};

function updateDataseList2Form(pExtenstion) {
  var vExtension = pExtension || ".js";
  var vArrDB = getDataseListJSON(vExtension);
  write2value("tDatabases",vArrDB.join("\n"));
};

function getDataseListJSON(pExtenstion) {
  var vExtension = pExtension || ".js";
  var vArrDB = getArray4HashID(vJSCC_DB["DatabaseList"]);
  for (var i = 0; i < vArrDB.length; i++) {
    vArrDB[i] += vExtension;
  };
  return vArrDB;
}

function getDefaultDatabaseJSON(pDBname,pTitle,pArrID) {
  var vDBname = pDBname || db_undefined;
  var vTitle = pTitle || "Title of DB "+vDBname;
  var vArrID = pArrID || ["yesno1","textarea1","yesno2"];
  var vDB = {};
  vDB["JSCC_type"] = "DB";
  vDB["name"] = vDBname;
  vDB["file"] = "db/"+vDBname+".js";
  vDB["dbtitle"] = vTitle;
  vDB["JSCC_init_date"] = getDateTime();
  vDB["JSCC_mod_date"] = getDateTime();
  vDB["format"] = {};
  var vID = "";
  for (var i = 0; i < vArrID.length; i++) {
    var vHash = {};
    vID = vArrID[i];
    vHash["title"] = "Title of ID "+vID;
    vHash["display"] = getMarker4ID("DB_"+vID);
    vHash["edit"] = getMarker4ID("DB_ID_VALUE");
    vHash["hidden"] = getMarker4ID("DB_ID_HIDDEN");
    vHash["visible"] = true;
    vHash["mandatory"] = true;
    vDB["format"][vArrID[i]] = vHash;
  };
  vDB["data"] = {};
  vDB["data"]["submitted"] = getDefaultDataDB(vArrID,vDBname+ ": submitted ",1,3);
  vDB["data"]["local"] = getDefaultDataDB(vArrID,vDBname+ ": unsubmitted ",4,5);
  return vDB
};

function getDefaultDataDB(pArrID,pDBname,pStart,pEnd) {
  var vStart = pStart || 0;
  var vEnd = pEnd || 2;
  var vData = {};
  var vDBID_Prefix = "ID"+getTimeIndex()+"N";
  var vID = "";
  var vDBID = "";
  for (var iCount = vStart; iCount <= vEnd; iCount++) {
    vDBID = vDBID_Prefix+iCount;
    var vHash = {};
    console.log(pDBname+": "+iCount);
    for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      vHash[vID] = "("+iCount+") '"+pDBname+"' record ["+vDBID+"] value of ID '"+vID+"'";
    };
    vData[vDBID] = vHash;
  };
  return vData;
}

function getMarker4ID(pID) {
  var vID = reduceVarName(pID);
  if (vID != "") {
    vID = vID.replace(/[0-9]/g,"");
    vID = vID.toUpperCase();
    vID = "___"+vID+"___";
  };
  return vID;
};

function updateForm2DatabasesJSON() {
  updateFormID2JSON('tDatabases');
  var vNameDB = getDatabaseArray();
  var vDBHash = {};
  var vDB = "";
  for (var i = 0; i < vNameDB.length; i++) {
    vDB = vNameDB[i];
    vDBHash[vDB] = vJSCC_DB["DatabaseList"][vDB] || getDefaultDatabaseJSON(vDB);
  };
  vJSCC_DB["DatabaseList"] =  vDBHash;
  var vArrID = getArray4HashID(vJSCC_DB["DatabaseList"]);
  createDatabaseSelect4Array(vArrID);
};

function updateDatabasesJSON2Form() {
  console.log("updateDatabasesJSON2Form()");
  var vDBList = vJSCC_DB["DatabaseList"];
  var vArrID = getArray4HashID(vDBList);
  if (vArrID.length == 0) {
    //DatabaseList does not contain databases
    var vID = "";
    vArrID = getArrayID4tDatabasesJSON();
    // now create default database if they do not exist.
    for (var i = 0; i < vArrID.length; i++) {
      vID = vArrID[i];
      if (existsDatabaseJS(vID)) {
        console.log("updateDatabasesJSON2Form() DB '"+vID+"' exists");
      } else {
        vJSCC_DB["DatabaseList"][vID] = getDefaultDatabaseJSON(vID);
      };
    };
  };
  var vDB = "";
  var vOut = "";
  var vCR = "";

  for (var i = 0; i < vArrID.length; i++) {
    vDB = vDBList[vArrID[i]];
    if (vDB["file"]) {
      console.log("Database: '"+vDB["file"]+"' exists!");
      vOut += vCR + vDB["file"];
      vCR = "\n";
    } else {
      console.log("Database for '"+vArrID[i]+"' has not attribute filename!");
    };
  };
  write2value("tDatabases",vOut);
  // getValueDOM("tButtons")
};

function getArrayID4tDatabasesJSON() {
  var vDatabases = vJSCC_DB["tDatabases"] || "";
  var vArrID = [];
  if (vDatabases != "") {
    var vFilePath = "";
    var vLineArr = vDatabases.split("\n");
    for (var i = 0; i < vLineArr.length; i++) {
      vFile = getName4URL(vLineArr[i]);
      if (vFile != "") {
        vArrID.push(vFile);
      };
    }
  };
  return vArrID;
};

function removeExtensionJS4Array(pArrDB) {
  var vRetArr = [];
  var vLine = "";
  for (var i = 0; i < pArrDB.length; i++) {
    vLine = getName4URL(pArrDB[i]);
    vRetArr.push(vLine);
  };
  return vRetArr;
}

function getButtonArrayWithHashes() {
  var vLineArr = getString2Array(getValueDOM("tButtons"));
  var vRetArr = [];
  var vHash;
  for (var i = 0; i < vLineArr.length; i++) {
    vHash = getRecordLine2Hash(vButtonRECDEF,vLineArr[i]);
    // must convert String for newline "\\n" to "\n"
    vRetArr.push(decodeHashCR(vHash));
  };
  console.log("getButtonArray()-Call - "+vRetArr.length+" Buttons with splitted [tButtons]");
  return vRetArr;
}

function getFileListHash() {
  console.log("getFileListHash()-Call from JSON");
  //var vFileArr = getFileListArrayWithHashes();
  //var vFileHash = {};
  return vJSCC_DB["FileList"];
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
  if ((!pButtonHash["counter"]) || (pButtonHash["counter"] == "")) {
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
    vJSCC_DB["ButtonList"][vButtonID] = pButtonHash;
  };
  return vExists;
};

function createNewButton() {
  console.log("createNewButton() Click New - create a new Button with [+]");
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
  var vErrorMSG = "";
  var vNewButtonID = getValueDOM("tButtonID");
  var vNewButtonHash = getDefaultButtonHash(vNewButtonID);
  //alert(vNewButtonHash["tButtonDefHTML"]);
  var vSuccess = false;
  var vCount = 0;
  if (vNewButtonID == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") ButtonID is undefined!"
  };
  if (existsButtonJS(vNewButtonID)) {
    vCount++;
    vErrorMSG = "\n("+vCount+") Button ["+vNewButtonID+"] already defined!"
    selectButtonJS(vNewButtonID);
  };
  if (vErrorMSG == "") {
    //write2value("tButtonID", vNewButtonName);
    //vFailed = createButtonJS(vNewButtonHash);
    vJSCC_DB["ButtonList"][vNewButtonID] = vNewButtonHash;
    write2value("tButtonID",vNewButtonHash["BUTTON_ID"] );
    write2value("tButtonTitle",vNewButtonHash["BUTTON_TITLE"] );
    write2value("tButtonDefHTML",vNewButtonHash["tButtonDefHTML"]);
    write2value("sButtonHTML",vNewButtonID);
    console.log("successful createButtonJS()-Call");
    write2value("tButtons", getButtonListStringCR());
    createButtonSelect();
    //selectButtonJS(vNewButtonID);
    //write2value("tButtonDefHTML",vNewButton[]);
    vSuccess = true;
  } else {
    vErrorMSG = "ERROR Create New Button:"+vErrorMSG;
    alert(vErrorMSG);
    console.log("Create new Button cancelled!\n"+vErrorMSG);
  };
  return vSuccess;
};

function writeMapButtonJSON2Form(pNewButtonID) {
  if (vJSCC_DB["ButtonList"][pNewButtonID]) {
    var vNewButtonHash = vJSCC_DB["ButtonList"][pNewButtonID];
    var vMapID = getButtonMapID2JSON();
    var vID = "";
    for (var iID in vMapID) {
      if (vMapID.hasOwnProperty(iID)) {
        vID = vMapID[iID];
        //write2value(iID,vJSCC_DB["ButtonList"][vNewButtonID][vID])
        console.log("write2value('"+iID+"','"+vNewButtonHash[vID]+"')");
        write2value(iID,vNewButtonHash[vID]);
      };
    };
  } else {
    console.log("writeMapButtonJSON2Form('"+pNewButtonID+"')");
  }
}

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

function createNewPage_do(pPageID,pPageTitle,pPageType4Page,pParent) {
  console.log("Create a new Page with [+]");
  //var vNewPageName = prompt("Please enter name of new Page", "");
  var vNewPageID = pPageID || getValueDOM("tPageID");
  var vNewPageTitle = pPageTitle || getValueDOM("tPageTitle");
  var vNewPageType  = pPageType4Page || getValueDOM("sPageType4Page");
  console.log("createNewPage(): sPageType4Page='"+vNewPageType+"'");
  var vParentPageID = pParent || getValueDOM("sParentPage");
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
      "parent-id": vParentPageID,
      "content": "Content of ___PAGE_TITLE___ (ID:'___PAGE_ID___')"
    };
    vFailed = createPageJS(vNewPageHash);
    //vFailed == true means Page exists,
    if (vFailed) {
      alert("Create New Page ["+vNewPageID+"] was NOT successful. Page already exists!");
      selectPageJS(vNewPageID);
    } else {
      vJSCC_DB["PageList"][vNewPageID] = vNewPageHash;
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
      //vJSCC_DB["PageTypeList"][pPageType] = vPageTypeHash[pPageType] || {};
      vJSCC_DB["PageTypeList"][vPageTypeID]["template"] = getDefaultPageTypeContent(vPageTypeID);
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
      vJSCC_DB["PageTypeList"][vPageTypeID] = vNewPageHash;
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
  var vHash = pHashJSON || {}; // e.g. vJSCC_DB["PageList"];
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

function updateFormPageIDs2JSON(pFile) {
  var vFile = pFile || getValueDOM("tFilename") || "";
  var vRet = "";
  if (vFile != "") {
    if (existsFileJS(vFile)) {
      var vPageIDs = getValueDOM("tPageIDs");
      vPageIDs = removeSpaces(vPageIDs);
      vPageIDs = vPageIDs.toLowerCase();
      var vPageArrID = [];
      if (vPageIDs != "") {
        vPageArrID = vPageIDs.split("|");
      };
      var vID = "";
      // vHash contains the OLD Element Definitions
      var vPageList = vJSCC_DB["PageList"];
      // in vElemHash the NEW Element Definitions are populated
      var vPageHash = {};
      for (var i = 0; i < vPageArrID.length; i++) {
        vID = vPageArrID[i];
        if (vPageList.hasOwnProperty(vID)) {
          // defintion for Page exists
          console.log("Page '"+vID+"' exists for File ‘"+vFile+"’");
        } else {
          // vID is a NEW Element Definition init that with a default value
          createPageJS(getDefaultPageHash(vID));
          console.log("Page '"+vID+"' must be create for File ‘"+vFile+"’");
        };
      };
      // set Elements with the NEW Element Definitions
      vPageIDs = vPageArrID.join("|");
      vJSCC_DB["FileList"][vFile]["tPageIDs"] = vPageArrID.join("|");
      write2value("tPageIDs",vPageIDs);
      createPageSelect();
    };
  };
}


function updateFormElementIDs2JSON(pFile) {
  var vFile = pFile || getValueDOM("tFilename") || "";
  var vRet = "";
  if (vFile != "") {
    if (existsFileJS(vFile)) {
      var vElemIDs = getValueDOM("tElementFileIDs");
      vElemIDs = removeSpaces(vElemIDs);
      var vElemArrID = [];
      if (vElemIDs != "") {
        vElemArrID = vElemIDs.split("|");
      };
      var vID = "";
      // vHash contains the OLD Element Definitions
      var vHash = vJSCC_DB["FileList"][vFile]["elements"];
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
      vJSCC_DB["FileList"][vFile]["elements"] = vElemHash;
      write2value("tElementFileIDs",getElementListString(vFile));
      createElementsFileSelect(vFile);
    };
  };
}

function getElementListString(pFile) {
  var vFile = pFile || getValueDOM("tFilename") || "";
  var vRet = "";
  if (vFile != "") {
    if (existsFileJS(vFile)) {
      var vArrID = getArray4HashID(vJSCC_DB["FileList"][vFile]["elements"]);
      vRet = vArrID.join("|");
    };
  };
  return vRet;
};

function getPageListString() {
  var vCutColsAtEnd = 0;
  return getHash4Record2String(vPageRECDEF,vJSCC_DB["PageList"],vCutColsAtEnd);
};


function getButtonListStringCR() {
  var vCutColsAtEnd = 1;
  var vButtonList = cloneJSON(vJSCC_DB["ButtonList"]);
  for (var iID in vButtonList) {
    if (vButtonList.hasOwnProperty(iID)) {
      vButtonList[iID] = encodeCR(vButtonList[iID]);
    };
  };
  return getHash4Record2String(vButtonRECDEF,vButtonList,vCutColsAtEnd);
};

function getPageTypeString() {
  return getHash4Record2String(vPageTypeRECDEF,vJSCC_DB["PageTypeList"],1);
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
    vJSCC_DB["PageList"][vPageID] = pPageHash;
    //vJSCC_DB["PageContent"][vPageID] = "Content for Page '"+vPageID+"'";
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
    if (existsPageTypeJS(pPageTypeID)) {
      console.log("createDefaultPageTypeJS('"+pPageTypeID+"') PageTypeID exists");
    } else {
      vJSCC_DB["PageTypeList"][pPageTypeID] = vNewPageTypeHash;
      createPageTypeSelect(pPageTypeID);
    };
  };
};


function checkButtonList(pButtonID) {
  if (vJSCC_DB["ButtonList"]) {
    if (vJSCC_DB["ButtonList"][pButtonID]) {
      console.log("Button '"+pButtonID+"' exists in ButtonList of JSON Database");
    } else {
      vJSCC_DB["ButtonList"][pButtonID] = {};
      console.log("checkButtonList('"+pButtonID+"') created empty ButtonHash in JSON Database");
    };
  } else {
    console.log("checkButtonList('"+pButtonID+"') created (1) ButtonList in JSON Database");
    vJSCC_DB["ButtonList"] = {};
    console.log("checkButtonList('"+pButtonID+"') created (2) empty ButtonHash in JSON Database");
    vJSCC_DB["ButtonList"][pButtonID] = {};
  };
};

function checkPageList(pPageID) {
  if (vJSCC_DB["PageList"]) {
    if (vJSCC_DB["PageList"][pPageID]) {
      console.log("Page '"+pPageID+"' exists in PageList of JSON Database");
    } else {
      vJSCC_DB["PageList"][pPageID] = {};
      console.log("checkPageList('"+pPageID+"') created empty PageHash in JSON Database");
    };
  } else {
    console.log("checkPageList('"+pPageID+"') created (1) PageList in JSON Database");
    vJSCC_DB["PageList"] = {};
    console.log("checkPageList('"+pPageID+"') created (2) empty PageHash in JSON Database");
    vJSCC_DB["PageList"][pPageID] = {};
  };
  checkPageContent(pPageID);
};

function checkPageContent(pPageID) {
  if (existsPageJS(pPageID)) {
    if (vJSCC_DB["PageList"][pPageID]["content"]) {
      console.log("Page '"+pPageID+"' exists in PageContent of JSON Database");
    } else {
      vJSCC_DB["PageList"][pPageID]["content"] = "content of page '"+pPageID+"'";
      console.log("checkPageContent('"+pPageID+"') created with an init content");
    };
  };
};

function checkPageType(pPageType) {
  var vFillHash = true;
  if (vJSCC_DB["PageTypeList"]) {
    if (vJSCC_DB["PageTypeList"][pPageType]) {
      console.log("PageType '"+pPageType+"' exists in JSON Database");
      vFillHash = false;
    } else {
      vJSCC_DB["PageTypeList"][pPageType] = getDefaultHash4Record(vPageTypeRECDEF);
      console.log("checkPageType('"+pPageType+"') created empty PageHash in JSON Database");
    };
  } else {
    console.log("checkPageType('"+pPageType+"') created (1) PageType in JSON Database");
    vJSCC_DB["PageTypeList"] = {};
    console.log("checkPageType('"+pPageType+"') created (2) PageType in JSON Database");
    vJSCC_DB["PageTypeList"][pPageType] = {};
  };
  if (vFillHash) {
    fillPageTypeHash(pPageType,vJSCC_DB["PageTypeList"][pPageType]);
  }
};

function getDefaultHashRecord(pRECDEF) {
  var vHash = createHash4Array(pRECDEF);

}

function fillPageTypeHash(pPageType,pPageTypeHash) {
  var vButton1 = "";
  var vButton2 = "";
  if (pPageTypeHash) {
    pPageTypeHash["page-type"] = pPageType;
    if (pPageTypeHash["page-type"] && (pPageTypeHash["page-type"] != "")) {
      console.log("page-type defined for '"+pPageType+"'");
    } else {
      pPageTypeHash["page-type"] = "DefaultPage";
    };
    if (pPageTypeHash["HEADER_BUTTON1"] && (pPageTypeHash["HEADER_BUTTON1"] != "")) {
      console.log("HEADER_BUTTON1 defined for '"+pPageType+"'");
    } else {
      pPageTypeHash["HEADER_BUTTON1"] = "home";
      pPageTypeHash["HEADER_BUTTON2"] = "CANCEL";
      pPageTypeHash["template"] = getDefaultPageTypeContent(pPageType);
      };
  } else {
    console.log("fillPageTypeHash(pPageTypeHash) - pPageTypeHash UNDEFINED");
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
  return existsListJS("PageTypeList","PageTypeList",pPageType);
};

function existsButtonJS(pButtonID) {
  return existsListJS("Button","ButtonList",pButtonID);
};

function saveButtonHTML() {
  var vID = getValueDOM("tButtonID") || "";
  console.log("saveButtonHTML() - Button ["+vID+"]");
  saveButtonHTML_do();
  alert("Page ['"+vID+"'] saved!");
};

function saveButtonHTML_do(pID) {
  var vID = pID || getValueDOM("tButtonID") || "";
  if (vID != "") {
    console.log("saveButtonHTML() - Button ["+vID+"]");
    save3LevelID2JSON("ButtonList",vID,"tButtonDefHTML",getValueDOM("tButtonDefHTML"));
    save3LevelID2JSON("ButtonList",vID,"BUTTON_TITLE",getValueDOM("tButtonTitle"));
    autoSaveJSON();
  };
};


function savePageHTML() {
  var vID = getValueDOM("sPageHTML");
  console.log("savePageHTML() - Page ["+vID+"]");
  save2LevelID2JSON("PageContent",vID,getEditorValue("iPageHTML"));
  saveJSON2LocalStorage("json");
  autoSaveJSON();
  alert("Page ['"+vID+"'] saved!");
}

function savePageTypeHTML() {
  var vID = getValueDOM("sPageTypeHTML");
  console.log("savePageTypeHTML() - Page Type ["+vID+"]");
  save2LevelID2JSON("PageTypeList",vID,"template",getEditorValue("iPageTypeHTML"));
  saveJSON2LocalStorage("json");
  autoSaveJSON();
  alert("Page Type ['"+vID+"'] saved!");
}

function existsPageJS(pPageID) {
  return existsListJS("Page","PageList",pPageID);
};

function existsFileJS(pFileID) {
  return existsListJS("File","FileList",pFileID);
};

function existsDatabaseJS(pDatabaseID) {
  return existsListJS("Database","DatabaseList",pDatabaseID);
};

function existsElementDBJS(pElementID) {
  return existsListJS("ElementDB","ElementDBList",pDatabaseID);
};

function existsElementJS(pElementID,pFileID) {
  var vExists = false;
  var vFile = pFileID || getValueDOM("sFileList");
  var vElementList = getElementListHash(vFile);
  if (existsFileJS(vFile)) {
    if (vJSCC_DB["FileList"][vFile].hasOwnProperty("elements")) {
      var vElemHash = vJSCC_DB["FileList"][vFile]["elements"];
      if (vElemHash.hasOwnProperty(pElementID)) {
          console.log("Element '"+pElementID+"' exists for file '"+vFile+"'");
          vExists = true;
      } else {
        console.log("Element '"+pElementID+"' does NOT exist for file '"+vFile+"'");
      };
    };
  };
  return vExists;
};



function existsListJS(pName,pListID,pID) {
  var vReturn = false;
  if (isString(pID)) {
    if (pID != "") {
      console.log("exists"+pName+"JS('"+pID+"')");
      if (vJSCC_DB) {
        if (vJSCC_DB[pListID]) {
          if (vJSCC_DB[pListID][pID]) {
            vReturn = true;
            console.log(pName+" with  ID '"+pID+"' exists in vJSCC_DB["+pListID+"].");
          };
        };
      };
      if (vReturn == false) {
        console.log("WARNING: In "+pListID+" '"+pID+"' does NOT exist.");
      };
    } else {
      //console.log("exists"+pName+"JS(p"+pName+"ID)-Call with p"+pName+"ID undefined");
    };
  };
  return vReturn
};
