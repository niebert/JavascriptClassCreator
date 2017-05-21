
function exportHTML4File(pFile,pStandalone) {
  var vHTML = getHTML4File(pFile,pStandalone);
  //write2value("tMainHTML",vHTML);
  write2editor("MainHTML",vHTML);
};


function getHTML4File(pFile,pStandalone) {
    var vHTML   = getTemplate4File(pFile);
    resetCodeGenCounter();
    // insert Library Import or Library SCRIPT-Tags with Code
    var vReplace = getDatabasesHTML(pFile,pStandalone);
    vReplace += "\n"+getLibrariesHTML(pFile,pStandalone);
    if (getCheckBox("checkCompressCode4HTML")) {
      //vReplace = compressCodeJS(vReplace);
    };
    //alert("vReplace="+vReplace.substring(0,300))
    vHTML = replaceString(vHTML,"___LIBRARIES___",vReplace);
    // Insert Generated Pages
    vHTML = replaceString(vHTML,"___PAGES___",getPagesHTML4Code(pFile)+"\n");
    vHTML = replaceElements4HTML(vHTML,pFile);
    vHTML = replaceAppLaucher4HTML(vHTML,pFile);
    return vHTML;
};
function replaceAppLaucher4HTML(pHTML,pFile) {
  if (existsFileJS(pFile)) {
    var vAppClass = vJSCC_DB["FileList"][pFile]["sAppClassHTML"];
    var vAppInitCall = vJSCC_DB["FileList"][pFile]["tAppInitCall"];
    pHTML = replaceString(pHTML,"___APP_CLASS___",vAppClass);
    pHTML = replaceString(pHTML,"___APP_INIT_CALL___",vAppInitCall);
  };
  return pHTML;
};

function replaceElements4HTML(pHTML,pFile) {
  var vFile = pFile || getSelectedFileID();
  var vElemHash = vJSCC_DB["ElementsDBList"];
  pHTML = replaceHash4Content(vElemHash,pHTML)
  var vBefore = pHTML;
  if (existsFileJS(vFile)) {
    vElemHash = vJSCC_DB["FileList"][vFile]["elements"];
    pHTML = replaceHash4Content(vElemHash,pHTML)
  };
  console.log("replaceElements4HTML() Before: '"+vBefore+"' After: '"+pHTML+"'");
  return pHTML;
};

function replaceHash4Content(pHash,pHTML) {
  if (isHash(pHash)) {
    var vElemHash = pHash;
    for (var iElemID in vElemHash) {
      if (vElemHash.hasOwnProperty(iElemID)) {
        pHTML = replaceString(pHTML,"___"+iElemID+"___",vElemHash[iElemID]);
      };
    };
  };

  return pHTML;
};


function replaceElements4Hash(pObject,pRecursive_Depth,pFile) {
  var vFile = pFile || getSelectedFileID();
  var vRecursive_Depth = pRecursive_Depth || 0;
  var vMax = 50;
  console.log("replaceElements4Hash(pObject,"+vRecursive_Depth+",'"+vFile+"')");
  if (isHash(pObject)) {
    vRecursive_Depth++;
    if (vRecursive_Depth < vMax)
    for (var iID in pObject) {
      if (pObject.hasOwnProperty(iID)) {
        if (isHash(pObject[iID])) {
          console.log("RECURSIVE: replaceElements4Hash(pObject['"+iID+"'],"+vRecursive_Depth+");");
          replaceElements4Hash(pObject[iID],vRecursive_Depth);
        } else if (typeof(pObject[iID]) == "string") {
          pObject[iID] = replaceElements4HTML(pObject[iID],vFile);
          console.log("STRING: replaceElements4Hash(pObject['"+iID+"'],"+vRecursive_Depth+"); value='"+pObject[iID]+"'");
        };
      };
    };
  };
};


function getPagesHTML4Code(pFile) {
  var vOut = "";
  var vID = "";
  var vPageHTML = "";
  var vConArrID = getConnectedPages4File(pFile);
  var vPageList = vJSCC_DB["PageList"] //getPageListArrayWithHashes(pFile);
  //var vPageList = getPageList4FileWithHashes(pFile);
  for (var i = 0; i < vConArrID.length; i++) {
    vPageID = vConArrID[i];
    //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
    if (existsPageJS(vPageID)) {
      vPageHTML = createPageHTML4Code(vPageList[vPageID]);
      vPageHTML = replaceString(vPageHTML,"___PAGE_ID___",vPageID);
      vPageHTML = replaceString(vPageHTML,"___PAGE_TITLE___",vPageList[vPageID]["PAGE_TITLE"]);
      vOut += vPageHTML;
    } else {
      var vOK = confirm("WARNING: Page for ID='"+vPageID+"' is undefined.\nDo you want a create page with ID='"+vPageID+"'?");
      if (vOK == true) {
        createNewPage_do(vPageID,firstUpperCase(vPageID),"DefaultPage","");
      };
    };
  };
  return vOut;
}

function createPageHTML4Code(pPageHash) {
  var vOut = "";
  // pPageHash has the following IDs
  //var vPageRECDEF = ["PAGE_ID","PAGE_TITLE","page-type","parent-id"];
  var vPageID     = pPageHash["PAGE_ID"];
  var vPageTypeID = pPageHash["page-type"];
  var vPageTpl    = getPageTypeTemplate4Code(vPageTypeID);
  var vPageContent = vJSCC_DB["PageList"][vPageID]["content"] || " undefined content for page '"+ vPageID+"'";
  // Header Buttons are already inserted in PageType-Template
  // ToDo: Insert
  if (vPageTpl) {
    console.log("createPageHTML4Code('"+pPageHash["PAGE_ID"]+"') PageType='"+vPageTypeID+"' is defined");
    vOut = vPageTpl;
  } else {
    console.log("createPageHTML4Code('"+pPageHash["PAGE_ID"]+"') PageType='"+vPageTypeID+"' UNDEFINED - use DEFAULT");
    vOut= getValueDOM("tTplPAGE");
  };
  vOut = replaceString(vOut,"___PAGE_TITLE___",pPageHash["PAGE_TITLE"]);
  vOut = replaceString(vOut,"___PAGE_ID___",pPageHash["PAGE_ID"]);
  vOut = replaceString(vOut,"___PAGE_CONTENT___",vPageContent);
  vOut = replaceString(vOut,"___MENU_CONTENT___",getPageMenu4ID(vPageID));
  return vOut;
};

function getPageMenu4ID(vPageID) {
  var vChildArrID = getChildPageIDs(vPageID);
  var vID = "";
  var vTPL = getValueDOM("tTplMENU");
  var vMenuList = "";
  for (var i = 0; i < vChildArrID.length; i++) {
    vID = vChildArrID[i]; // vID is a PageID
    vMenuList += getPageMenuItem(vID);
  };
  vTPL = replaceString(vTPL,"___MENUITEM_LIST___",vMenuList);
  return vTPL;
};

function getConnectedPages4File(pFileID) {
  if (existsFileJS(pFileID)) {
    var vPageIDs = vJSCC_DB["FileList"][pFileID]["tPageIDs"];
    var vArrID = vPageIDs.split("|");
    var vConArrID = getConnectedPageArr(vArrID);
    console.log("Connected Pages for file '"+pFileID+"'\nPagesIN: ["+vArrID.join(",")+"]\nPagesOUT: ["+vConArrID.join(",")+"]");
    return vConArrID;
  };
};

function getConnectedPageArr(pArrID) {
  // vArrID is the results Array for return
  var vArrID = [];
  // vHash is introduced to avoid duplicate entries,
  var vHashID = {};
  var vID = "";
  if (pArrID && (pArrID.length) && (pArrID.length > 0)) {
    // loop over the root pages defined by User in "tPageIDs"
    for (var i = 0; i < pArrID.length; i++) {
      vID = pArrID[i];
      vHashID[vID] = vID;
      // the child pages of page with id vID and store the new childs in vHashID
      getChildPageHash(vID,vHashID);
    };
  };
  // convert the keys of vHashID into an array of ids.
  vArrID = getArray4HashID(vHashID);
  return vArrID;
};

function getChildPageHash(pPageID,pHash,pRecursive_Depth) {
  var vHash = pHash || {};
  var vRecursive_Depth = pRecursive_Depth || 0;
  var vMax = 100;
  var vChildID = {};
  var vParentID = "";
  vRecursive_Depth++;
  // checkif  page ID exists
  if (existsPageJS(pPageID)) {
    // mark PageID as already checked
    vHash[pPageID] = pPageID;
    // append all pages that have pPageID as parent-id
    var vList = vJSCC_DB["PageList"];
    for (var iChildID in vList) {
      if (vList.hasOwnProperty(iChildID)) {
        if (vList[iChildID]["parent-id"] == pPageID) {
          // iChildID has vPageID as parent page
          if (vHash.hasOwnProperty(iChildID)) {
            console.log("getChildPageHash('"+pPageID+"',pHash,"+vRecursive_Depth+") Child='"+iChildID+"' already marked as exported page");
          } else {
            getChildPageHash(iChildID,vHash,pRecursive_Depth)
          };
        }
      }
    }
    // create a reference to the page hash
    var vPageHash = vJSCC_DB["PageList"][pPageID];
    //--- recursive call for parent-id (if necessary)
    var vParentID = vPageHash["parent-id"];
    if (existsPageJS(vParentID)) {
      if (vHash.hasOwnProperty(vParentID)) {
        console.log("getChildPageHash('"+pPageID+"',pHash,"+vRecursive_Depth+") parent-id='"+vParentID+"' already marked as exported page");
      } else {
        getChildPageHash(vParentID,vHash,pRecursive_Depth)
      };
    };
    //--- recurive to Header Buttons
    var vPageTypeID = vPageHash["page-type"];
    if (existsPageTypeJS(vPageTypeID)) {
      var vPageTypeHash = vJSCC_DB["PageTypeList"][vPageTypeID];
      var vHeadBut = "";
      //--- recursive call for header button links (if necessary)
      var vHB = ["HEADER_BUTTON1","HEADER_BUTTON2"];
      for (var i = 0; i < vHB.length; i++) {
        vHeadBut = vPageTypeHash[vHB[i]] || "";
        if (isPageLink(vHeadBut)) {
          if (vHash.hasOwnProperty(vHeadBut)) {
            console.log("getChildPageHash('"+pPageID+"',pHash,"+vRecursive_Depth+") header link '"+vHeadBut+"' already marked as exported page");
          } else {
            getChildPageHash(vParentID,vHash,pRecursive_Depth);
          };
        };
      }; // for HeaderButtons
    }; // existsPageType(page-type)
  };// existsPageJS(pPageID)
};

function isPageLink(pHeadBut) {
  var vIsPageLink = false;
  if (reduceVarName(pHeadBut) != "") {
    if (pHeadBut == pHeadBut.toLowerCase()) {
      vIsPageLink = true;
    }
  };
  return vIsPageLink;
}

function getChildPageIDs(pParentPageID) {
  var vArrID = [];
  var vParentID = "";
  if (existsPageJS(pParentPageID)) {
    var vPageList = vJSCC_DB["PageList"];
    for (var iPageID in vPageList) {
      if (vPageList.hasOwnProperty(iPageID)) {
        vParentID = vPageList[iPageID]["parent-id"];
        if (vParentID == pParentPageID) {
          vArrID.push(iPageID);
        };
      };
    };
  };
  return vArrID;
};

function getPageMenuItem(pPageID) {
  // pPageID is the ID of page for which a menu item is created.
  var vTPL = getValueDOM("tTplMENUITEM");
  if (existsPageJS(pPageID)) {
    var vPageTitle = vJSCC_DB["PageList"][pPageID]["PAGE_TITLE"];
    vTPL = replaceString(vTPL,"___PAGE_ID___",pPageID);
    vTPL = replaceString(vTPL,"___PAGE_TITLE___",vPageTitle);
  };
  return vTPL;
}

function getPageTypeTemplate4Code(pPageTypeID) {
  var vPageTpl = "";
  var vButton1 = "";
  var vButton2 = "";
  var vOutHash = null;
  var vBID
  if (existsPageTypeJS(pPageTypeID)) {
    var vPT = vJSCC_DB["PageTypeList"][pPageTypeID];
    vPageTpl = vPT["template"];
    vOutHash = getButtonDefinition4Code(vPT["HEADER_BUTTON1"]);
    vButton1 = vOutHash["tButtonDefHTML"];
    vOutHash = getButtonDefinition4Code(vPT["HEADER_BUTTON2"]);
    vButton2 = vOutHash["tButtonDefHTML"];
  } else {
    console.log("getPageTypeTemplate4Code('"+pPageTypeID+"') Template was UNDEFINED");
    vPageTpl = getValueDOM("tTplPAGE");
  };
  vPageTpl = replaceString(vPageTpl,"___HEADER_BUTTON1___",vButton1);
  vPageTpl = replaceString(vPageTpl,"___HEADER_BUTTON2___",vButton2);
  return vPageTpl;
};

function getButtonDefinition4Code(pButtonID) {
    var vButtonID = pButtonID || "";
    console.log("getButtonDefinition4Code('"+vButtonID+"')");
    var vOutHash = {
          "BUTTON_ID":vButtonID,
          "BUTTON_TITLE":firstUpperCase(vButtonID.toLowerCase()),
          "button-type":"",
          "tButtonDefHTML":""
        };
    var vOut = "";
    if (vButtonID != "") {
      if (vButtonID == vButtonID.toUpperCase()) {
        var vBT;
        if (existsButtonJS(vButtonID)) {
          //console.log("Button ["+pButtonID+"] exists for Code Generation");
          vBT = vJSCC_DB["ButtonList"][vButtonID];
        } else {
          alert("Button ["+vButtonID+"] is undefined, a default button will be created for you!");
          vBT = getDefaultButtonHash(vButtonID);
          vJSCC_DB["ButtonList"][vButtonID] = vBT;
          var vArrID = getArray4HashID(vJSCC_DB["ButtonList"]);
          updateButtonJSON2Form(vArrID);
        };
        // It is a predefined Button in ButtonList
        vOut = vBT["tButtonDefHTML"];
        vBT["counter"]++;
        vOut = replaceString(vOut,"___COUNTER___",vBT["counter"]);
        vOut = replaceString(vOut,"___BUTTON_TITLE___",vBT["BUTTON_TITLE"]);
        vOutHash["button-type"] = "BUTTON";
      } else {
        console.log("Button-LINK: getButtonDefinition4Code('"+vButtonID+"') - ID is used as Page-ID '"+vButtonID+"'");
        vOut = getValueDOM("tTplPageLinkBUTTON");
        //pButtonID is a regarded as Page-ID, because a definition for the Button does not exist in ButtonList
        var vTitle = getPageTitle4ID(vButtonID);
        vOut = replaceString(vOut,"___LINK_PAGE_ID___",vButtonID);
        vOut = replaceString(vOut,"___BUTTON_TITLE___",vTitle);
        vCounter++;
        vOut = replaceString(vOut,"___COUNTER___",vCounter);
        vOutHash["button-type"] = "LINK";
        //vOut = replaceString(vOut,"__BUTTON_ID__",pButtonID);
      };
      vOut = replaceString(vOut,"___BUTTON_ID___",vButtonID.toUpperCase());
      vOutHash["tButtonDefHTML"] = vOut;
      console.log("Button Definition:\nvOut="+vOut);
    } else {
      console.log("ERROR: getButtonDefinition4Code(pButtonID) - pButtonID UNDEFINED");
    };
    return vOutHash;
};

function getPageTitle4ID(pPageID) {
  var vTitle = "Title '"+pPageID+"'?";
  if (pPageID) {
    if (existsPageJS(pPageID)) {
      vTitle = vJSCC_DB["PageList"][pPageID]["PAGE_TITLE"];
    } else {
      console.log("getPageTitle4ID('"+pPageID+"') - Page for Page-ID is UNDEFINED!");
    };
  } else {
    console.log("getPageTitle4ID(pPageID)-Call - ERROR: pPageID was UNDEFINED");
  };
  return vTitle; //
};
