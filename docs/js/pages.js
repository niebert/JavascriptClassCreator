function updateForm2PagesJSON() {
  console.log("updateForm2PagesJSON()");
  updateFormID2JSON('tPages');
  vPageJSON = getPageJSON();
  vPageJSON["PageList"] = getPageListHash();
};

function updateForm2PageTypesJSON() {
  console.log("updateForm2PageTypesJSON()");
  updateFormID2JSON('tPageTypes');
  vPageJSON = getPageJSON();
  vPageJSON["PageType"] = getPageTypeHash();
};

function updateForm2ButtonJSON() {
  console.log("updateForm2PageTypesJSON()");
  updateFormID2JSON('tButtons');
  vPageJSON = getPageJSON();
  vPageJSON["Page"] = getPageHash();
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

function getPageTypeHash() {
  var vArr = getPageTypeArray();
  var vPageTypeHash = {};
  var vID = "";
  for (var i = 0; i < vArr.length; i++) {
    vID = vArr[i]["page-type"];
    // vArr[i] is a PageType-Hash with the IDs vPageTypeRecord in index.html
    vPageTypeHash[vID] = vArr[i];
  };
  return vPageTypeHash
};

function getPageListArray() {
   //var vPageRecord = ["page-id","page-title","page-type","parent-id"];
   var vPageID = "";
   var vPageTypeID = "";
   var vPageArr = [];
   var vArr = getTextareaArray("tPages");
   for (var i = 0; i < vArr.length; i++) {
     var vHash = getPageLine2Hash(vArr[i]);
     vPageID = vHash["page-id"];
     vPageTypeID = vHash["page-type"];
     if (vPageID && (vPageID != "")) {
       vPageArr.push(vHash);
     } else {
       console.log("getPageListArray()-Call: vPageID undefined!");
     }
   };
   return vPageArr;
};

function getButtonLine2Hash(pLine) {
  console.log("getButtonLine2Hash('"+pLine+"')");
  return getRecordLine2Hash(vButtonRecord,pLine);
}

function getPageTypeLine2Hash(pLine) {
  console.log("getPageTypeLine2Hash('"+pLine+"')");
  return getRecordLine2Hash(vPageTypeRecord,pLine);
}

function getPageLine2Hash(pLine) {
   //var vPageRecord = ["page-id","page-title","page-type","parent-id"];
   console.log("getPageLine2Hash('"+pLine+"')");
   var vHash = {};
   var vRecord = vPageRecord;
   var vArr = pLine.split("|");
   for (var k = 0; k < vRecord.length; k++) {
     vHash[vRecord[k]] = vArr[k] || "";
   };
   return vHash;
   //return getRecordLine2Hash(vPageRecord,pPageLine,1);
};

function getRecordLine2Hash(pRecord,pLine) {
   //var vPageRecord = ["page-id","page-title","page-type","parent-id"];
   console.log("getRecordLine2Hash('"+pLine+"')");
   var vHash = {};
   var vArr = pLine.split("|");
   for (var k = 0; k < pRecord.length; k++) {
     vHash[pRecord[k]] = vArr[k] || "";
   };
   return vHash;
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
    vDBHash[vDB] = vJSON_JS["DatabaseList"][vDB] || "// Database: db/"+vDB+".js";
  };
  vJSON_JS["DatabaseList"] =  vDBHash
}

function removeExtensionJS4Array(pArrDB) {
  var vRetArr = [];
  var vLine = "";
  for (var i = 0; i < pArrDB.length; i++) {
    vLine = (pArrDB[i]).replace(/\.js$/,"")
    vRetArr.push(vLine);
  };
  return vRetArr;
}

function getButtonArray() {
  var vLineArr = getString2Array(getValueDOM("tButtons"));
  var vRetArr = [];
  for (var i = 0; i < vLineArr.length; i++) {
    vRetArr.push(getRecordLine2Hash(vButtonRecord,vLineArr[i]));
  };
  console.log("getButtonArray()-Call - "+vRetArr.length+" Buttons with splitted [tButtons]");
  return vRetArr;
}

function getPageListHash() {
  console.log("getPageListHash()-Call from Form");
  //vPageRecord = ["page-id","page-title","page-type","parent-id"];
  var vPageArr = getPageListArray();
  var vPageHash = {};
  var vID = "";
  var vPageID = "";
  for (var i = 0; i < vPageArr.length; i++) {
    vPageID = vPageArr[i]["page-id"];
    console.log("getPageHash() - Page ["+vPageID+"]");
    // vPageArr[i] is a Hash with the IDs vPageRecord create with getPageLine2Hash(pLine)
    vPageHash[vPageID] = vPageArr[i];
    //vPageHash[vPageID]["page-content"] = "Content for Page ["+vPageID+"]";
  };
  return vPageHash;
};

function createButtonJS(pButtonHash) {
  var vButtonID = reduceVarName(pButtonHash["button-id"]);
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

function createNewPage() {
  console.log("Click New - create a new class after prompt");
  //var vNewPageName = prompt("Please enter name of new Page", "");
  var vNewPageID = getValueDOM("tPageID");
  var vNewPageTitle = getValueDOM("tPageTitle");
  var vNewPageType  = getValueDOM("sPageType4Page");
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
  if (vNewPageTitle == "") {
    vCount++;
    vErrorMSG = "\n("+vCount+") Title of Page ["+vNewPageID+"] is undefined!"
  };
  if (vErrorMSG == "") {
    //write2value("tPageID", vNewPageName);
    var vNewPageHash = {
      "page-id":vNewPageID,
      "page-title": vNewPageTitle,
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
      write2value("tPageList", getPageListString());
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

function createNewPageType() {
  console.log("Click New - create a new class after prompt");
  //var vNewPageName = prompt("Please enter name of new Page", "");
  var vPageTypeID = getValueDOM("tPageTypeID");
  var vLeftButtonID  = getValueDOM("sButtonLeft");
  var vRightButtonID = getValueDOM("sButtonRight");
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
      "button-id1": vLeftButtonID,
      "button-id2": vRightButtonID,
      "template":   vTemplate
    };
    vFailed = createPageTypeJS(vNewPageHash);
    //vFailed == true means Page exists,
    if (vFailed) {
      alert("Create New Type Page ["+vPageTypeID+"] was NOT successful. Page Type already exists!");
      selectPageTypeJS(vPageTypeID);
    } else {
      vJSON_JS["PageType"][vPageTypeID] = vNewPageHash;
      write2value("tPageType", getPageTypeString());
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


function getPageListString() {
  var vHash = vJSON_JS["PageList"];
  var vOut = "";
  var vCR = "";
  var vSep = "";
  for (var iPageID in vHash) {
    if (vHash.hasOwnProperty(iPageID)) {
      vOut += vCR;
      vSep = "";
      for (var i = 0; i < vPageRecord.length; i++) {
        vOut += vSep+vHash[iPageID][vPageRecord[i]];
        vSep = "|";
      }
      vCR = "\n";
    };
  };
  return vOut;
}

function getPageTypeString() {
  var vHash = vJSON_JS["PageType"];
  var vOut = "";
  var vCR = "";
  var vSep = "";
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vOut += vCR;
      vSep = "";
      for (var i = 0; i < vPageTypeRecord.length; i++) {
        vOut += vSep+vHash[iID][vPageTypeRecord[i]];
        vSep = "|";
      }
      vCR = "\n";
    };
  };
  return vOut;
}

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
  var vPageID = reduceVarName(pPageHash["page-id"]);
  var vExists = existsPageJS(vPageID);
  if (vExists) {
    //alert("Page '"+vPageID+"' already exists!");
    console.log("Page '"+vPageID+"' already exists!");
  } else {
    console.log("createPageJS('"+vPageID+"')-Call: Create Page '"+vPageID+"'");
    checkPageList(vPageID);
    createPageTypeJS(pPageHash["page-type"]);
    vJSON_JS["PageList"][vPageID] = pPageHash;
    vJSON_JS["PageContent"][vPageID] = "Content for Page '"+vPageID+"'";
  };
  return vExists;
};

function createPageTypeJS(pPageType) {
  console.log("createPageTypeJS('"+pPageType+"')");
  pPageType = reduceVarName(pPageType);
  var vExists = existsPageTypeJS(pPageType);
  if (vExists) {
    //alert("Page '"+pPageType+"' already exists!");
    console.log("PageType '"+pPageType+"' already exists!");
  } else {
    console.log("createPageTypeJS('"+pPageType+"')-Call: Create PageType '"+pPageType+"'");
    checkPageType(pPageType);
    //vJSON_JS["PageType"][pPageType] = vPageTypeHash[pPageType] || {};
    vJSON_JS["PageType"][pPageType]["template"] = getDefaultPageTypeContent(pPageType);

  };
  return vExists;
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
        vButton1 = vPageTypeHash[pPageType]["button-id1"]
        vButton2 = vPageTypeHash[pPageType]["button-id2"]
      } else {
        console.log("fillPageTypeRecord()-Call - vPageTypeHash['"+pPageType+"'] undefined Buttons");
      }
    };
    pPageTypeRecord["button-id1"] = vButton1;
    pPageTypeRecord["button-id2"] = vButton2;
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
  if (!pPageType) {
    alert("existsPageTypeJS(pPageType)-Call with pPageType undefined");
  };
  console.log("existsPageTypeJS('"+pPageType+"')");
  var vReturn = false;
  if (vJSON_JS) {
    if (vJSON_JS["PageType"]) {
      if (vJSON_JS["PageType"][pPageType]) {
        vReturn = true;
        console.log("PageType '"+pPageType+"' is a user-defined Page.");
      };
    };
  };
  if (vReturn == false) {
    console.log("PageType '"+pPageType+"' does NOT exist.");
  };
  return vReturn
};

function existsButtonJS(pButtonID) {
  if (!pButtonID) {
    alert("existsButtonJS(pButtonID)-Call with pButtonID undefined");
  };
  console.log("existsButtonJS('"+pButtonID+"')");
  var vReturn = false;
  if (vJSON_JS) {
    if (vJSON_JS["ButtonList"]) {
      if (vJSON_JS["ButtonList"][pButtonID]) {
        vReturn = true;
        console.log("Button '"+pButtonID+"' is a user-defined Button.");
      };
    };
  };
  if (vReturn == false) {
    console.log("Button '"+pButtonID+"' does NOT exist.");
  };
  return vReturn
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
  if (!pPageID) {
    alert("existsPageJS(pPageID)-Call with pPageID undefined");
  };
  console.log("existsPageJS('"+pPageID+"')");
  var vReturn = false;
  if (vJSON_JS) {
    if (vJSON_JS["PageList"]) {
      if (vJSON_JS["PageList"][pPageID]) {
        vReturn = true;
        console.log("Page '"+pPageID+"' is a user-defined Page.");
      };
    };
  };
  if (vReturn == false) {
    console.log("Page '"+pPageID+"' does NOT exist.");
  };
  return vReturn
};

function getString2Array(pString) {
  var vRet = [];
  console.log("getString2Array(pString) pString='"+pString+"'");
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
