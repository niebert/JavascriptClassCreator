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
  for (var i = 0; i < vArr.length; i++) {
    vPageTypeArray.push(getPageTypeLine2Hash(vArr[i]))
  };
  return vPageTypeArray
};

function getPageTypeHash() {
  var vArr = getPageTypeArray();
  var vPageTypeHash = {};
  var vID = "";
  for (var i = 0; i < vArr.length; i++) {
    vID = vArr[i]["page-type"];
    vPageTypeHash[vID] = vArr[i];
  };
  return vPageTypeHash
};

function getPageListArray() {
   //var vPageRecord = ["page-id","page-title","page-type","parent-id"];
   var vPageArr = [];
   var vArr = getTextareaArray("tPages");
   for (var i = 0; i < vArr.length; i++) {
     var vHash = getPageLine2Hash(vArr[i]);
     vPageArr.push(vHash);
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
    vDB = vNameDB[i]
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
    vPageHash[vPageID] = vPageArr[i];
    //vPageHash[vPageID]["page-content"] = "Content for Page ["+vPageID+"]";
  };
  return vPageHash;
};

function createButtonJS(pButtonHash) {
  var vButtonID = reduceVarName(pButtonHash["button-id"]);
  console.log("createButtonJS(pButtonHash)-Call for ID='"+vButtonID+"'");
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
