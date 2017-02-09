function updateForm2PagesJSON() {
  console.log("updateForm2PagesJSON()");
  updateFormID2JSON('tPageTypes');
  vPageJSON = getPageJSON();
  vPageJSON["Page"] = getPageHash();
};

function updateForm2PagesJSON() {
  console.log("updateForm2PagesJSON()");
  updateFormID2JSON('tPageTypes');
  vPageJSON = getPageJSON();
  vPageJSON["Page"] = getPageHash();
};

function getGlobalLibArray() {
  return getTextareaArray("tLibraries");
}


function getDatabaseArray() {
  return getTextareaArray("tDatabases");
}

function getPageListArray() {
   //var vPageRecord = ["page-id","page-title","page-type","parent-id"];
   var vPageArr = [];
   var vArr = getTextareaArray("tPages");
   for (var i = 0; i < vArr.length; i++) {
     var vHash = {};
     var vPage = vArr[i].split("|");
     for (var i = 0; i < vPageRecord.length; i++) {
       vHash[vPageRecord[i]] = vPage[i] || "";
     };
     vPageArr.push(vHash);
   };
   return vPageArr;
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

function getPageArray() {
  console.log("getPageArray()-Call");
  var vPages = getValueDOM("tPages");
  var vLineArr = getString2Array(vPages);
  var vRetArr = [];
  for (var i = 0; i < vLineArr.length; i++) {
    vRetArr.push(vLineArr[i].split("|"));
  };
  return vRetArr;
}

function getPageHash() {
  console.log("getPageHash()-Call from Form");
  //vPageRecord = ["page-id","page-title","page-type","parent-id"];
  var vPageArr = getPageArray();
  var vPageHash = {};
  var vID = "";
  var vPageID = "";
  for (var i = 0; i < vPageArr.length; i++) {
    vPageID = vPageArr[i][0];
    vPageHash[vPageID] = {}
    for (var k = 1; k < vPageRecord.length; k++) {
      vID = vPageRecord[k];
      vPageHash[vPageID][vID] = vPageArr[i][k] || "undefined content for '"+vID+"'";
    };
    vPageHash[vPageID]["page-content"] = "Content for Page ["+vPageID+"]";
  };
  return vPageHash;
};

function createPageJS(pPageTypeHash) {
  var vPageID = reduceVarName(pPageTypeHash["page-id"]);
  var vPageExists = existsPageJS(vPageID);
  if (vPageExists) {
    //alert("Page '"+vPageID+"' already exists!");
    console.log("Page '"+vPageID+"' already exists!");
  } else {
    console.log("createPageJS('"+vPageID+"')-Call: Create Page '"+vPageID+"' - createPageJS()-Call");
    checkPageList(vPageID);
    vJSON_JS["PageList"][vPageID] = pPageTypeHash;
  };
  return vPageExists;
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
};

function checkPageType(pPageTypeType) {
  var vDefaultContent = getDefaultPageTypeContent(pPageTypeType);
  if (vJSON_JS["PageType"]) {
    vJSON_JS["PageType"][pPageTypeType] = vDefaultContent;
    console.log("checkPageType('"+pPageTypeType+"') created Page in JSON Database");
  } else {
    console.log("checkPageType('"+pPageTypeType+"') created (1) PageType in JSON Database");
    vJSON_JS["PageType"] = {};
    console.log("checkPageType('"+pPageTypeType+"') created (2) PageType in JSON Database");
    vJSON_JS["PageType"][pPageTypeType] = vDefaultContent;
  };
};

function getDefaultPageTypeContent(pPageTypeType) {
  var vOut = getValueDOM("tTplPAGE");
  switch (pPageTypeType) {
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
  console.log("existsPageJS('"+pPageType+"')");
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

function existsPageJS(pPageType) {
  if (!pPageType) {
    alert("existsPageJS(pPageType)-Call with pPageType undefined");
  };
  console.log("existsPageJS('"+pPageType+"')");
  var vReturn = false;
  if (vJSON_JS) {
    if (vJSON_JS["PageList"]) {
      if (vJSON_JS["PageList"][pPageType]) {
        vReturn = true;
        console.log("Page '"+pPageType+"' is a user-defined Page.");
      };
    };
  };
  if (vReturn == false) {
    console.log("Page '"+pPageType+"' does NOT exist.");
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
