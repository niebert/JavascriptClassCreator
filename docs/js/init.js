//#################################################################
//# Javascript Code Generator
//# GNU Public License V3 - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus
//# 2012 University Koblenz-Landau
//#################################################################
vDOM_Global.push("tPages");
vDOM_Global.push("tPageTypes");
vDOM_Global.push("tLibraries");
vDOM_Global.push("tDatabases");
vDOM_Global.push("sShowGeneralizations");
vDOM_Global.push("sShowAggregations");
vDOM_Global.push("sShowAssociations");
//-------------------------------
//var vDOM_ID = ["tClassname","tSuperClassname","tAuthor","tEMail","tAttributes","tMethods"];
vDOM_ID.push("tClassname");
vTYPE_ID.push("String");
vDOM_ID.push("tSuperClassname");
vTYPE_ID.push("String");
vDOM_ID.push("sClassType");
vTYPE_ID.push("Select");
vDOM_ID.push("tAuthor");
vTYPE_ID.push("String");
vDOM_ID.push("tEMail");
vTYPE_ID.push("EMail");
vDOM_ID.push("tAttributes");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tMethods");
vTYPE_ID.push("Textarea");
vDOM_ID.push("sAttribList");
vTYPE_ID.push("Select");
vDOM_ID.push("tAttribName");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribType");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribComment");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribDefault");
vTYPE_ID.push("String");
vDOM_ID.push("sAttribTypeList");
vTYPE_ID.push("Select");
vDOM_ID.push("tMethodName");
vTYPE_ID.push("String");
vDOM_ID.push("tMethodComment");
vTYPE_ID.push("Textarea");
vDOM_ID.push("sMethodList");
vTYPE_ID.push("Select");
vDOM_ID.push("tArrayLoop");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tMethodLoop");
vTYPE_ID.push("String");
//vDOM_ID.push("");

function initCodeCreator() {
  // if Local Storage is supported by Browser try to Load JSON DB with Classes
  console.log("initCodeCreator()-Call");
  var vDB = null;
  var vSelectedClass = getValueDOM("tClassname");
  if (typeof(Storage) != "undefined") {
     //alert("Local Storage");
     loadLocalStorage("dom");
     vDB = loadLocalStorage("json");
     if (vDB) {
       console.log("JSON Database exists in Local Storage");
       top.vJSON_JS = vDB;
       vSelectedClass = top.vJSON_JS["SelectedClass"];
       console.log("Selected Class ["+vSelectedClass+"] in JSON Database");
      } else {
        top.vJSON_JS["init_date"] = getDate();
        initFormClass(vSelectedClass);
        //console.log("DEBUG 1: "+getValueDOM("tClassList"));
        initFormClassList();
        initFormDatabaseList();
        initFormButtonList();
        initFormPageType();
        initFormPageList();
        initFormSelectors();
      };
  } else {
      alert("Sorry, your browser does not support Local Storage...");
  };
  updateSelectors(); //select.js:140
  //document.fCreator.sClassList.value;
  initClassJS(vSelectedClass);
  updateClasses();
  vClassJSON = vJSON_JS["ClassList"][vSelectedClass];
  //initLocalDB("vJSON_JS",pJSONDB)
  initLabelsHTML();
  setClassSelectorDefault(vSelectedClass)
  //setTimeout('alert(readFile("tpl/test.txt"))',5000);
  initEditorContent();
  updateJSON2tClassList();
};

function initLabelsHTML() {
  var vSep = " | ";
  write2innerHTML("labelPageRecord",vPageRecord.join(vSep));
  write2innerHTML("labelPageTypeRecord",vPageTypeRecord.join(vSep));
  write2innerHTML("labelButtonRecord",vButtonRecord.join(vSep));
};

function initFormClassList() {
  console.log("initFormClassList()");
  var vClassTypeHash = getClassTypeHash(); //read from tClassList in  classes.js 413
  top.vJSON_JS["ClassType"] = vClassTypeHash;
  var vClassArr = getClassArray(); //read from tClassList in  classes.js 413
   for (var i = 0; i < vClassArr.length; i++) {
     initClassJS(vClassArr[i]);
     setClassType(vClassArr[i],vClassTypeHash[vClassArr[i]]);
   };
};

function setClassType(pClass,pClassType) {
  console.log("setClassType('"+pClass+"','"+pClassType+"')");
  if (existsClassJS(pClass)) {
    pClassType = reduceVarName(pClassType);
    vJSON_JS["ClassList"][pClass]["sClassType"] = pClassType;
    vJSON_JS["ClassType"][pClass] = pClassType;
  } else {
    console.log("Class '"+pClass+"' does not exist");
  }
}

function initFormButtonList() {
  console.log("initFormButtonList()");
   var vArr = getButtonArray(); //read from tButtonList in  classes.js 413
   for (var i = 0; i < vArr.length; i++) {
     console.log("Call: initButtonJS() for ID='"+vArr[i]["button-id"]+"'");
     //alert("ID='"+vArr[i]["button-id"]+"'");
     initButtonJS(vArr[i]);
   };
};

function initButtonJS(pButtonHash) {
  if (!pButtonHash) {
    console.log("Call: initButtonJS(pButtonHash) with pButtonHash undefined");
  } else {
      var vButtonID = reduceVarName(pButtonHash["button-id"]);
      console.log("initButtonJS(pButtonHash)-Call for ID='"+vButtonID+"'");
      initButtonJS_do(pButtonHash)
  }
};

function initButtonJS_do(pButtonHash) {
  console.log("initButtonJS_do() ID:'"+pButtonHash["button-id"]+"'");
  var vButtonID = reduceVarName(pButtonHash["button-id"]);
  if (vButtonID == "") {
    console.log("initButtonJS()-Call: Button-ID undefined");
  } else {
    if (!top.vJSON_JS) {
      var vError = "WARNING: initButtonJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    if (top.vJSON_JS["ButtonList"]) {
      console.log("vJSON_JS['ButtonList'] exists");
    } else {
      top.vJSON_JS["ButtonList"] = {};
      console.log("vJSON_JS['ButtonList'] created");
    };
    if (top.vJSON_JS["ButtonList"][vButtonID]) {
      console.log("Button '"+vButtonID+"' exists in JSON DB");
    } else {
      console.log("initButtonJS_do(pButtonHash)-Call for ID='"+vButtonID+"'");
      top.createButtonJS(pButtonHash);
      console.log("Button '"+vButtonID+"' created and updated from HTML Form with default values");
    };
  };
}



function initFormPageList() {
   var vPageArr = getPageListArray(); //read from tPages in  pages.js 413
   console.log("initFormPageList() with "+vPageArr.length+" Pages");
   for (var i = 0; i < vPageArr.length; i++) {
     initPageJS(vPageArr[i]);
   };
};

function initFormPageType() {
   console.log("initFormPageType()");
   var vPageArr = getPageTypeArray(); //read from tPageTypes in  pages.js 413
   for (var i = 0; i < vPageArr.length; i++) {
     initPageTypeJS(vPageArr[i]);
   };
};

function initPageTypeJS(pPageTypeHash) {
  if (!pPageTypeHash) {
    console.log("Call: initPageTypeJS(pClass) with pPageHash undefined");
  } else {
      initPageTypeJS_do(pPageTypeHash)
  }
};

function initPageTypeJS_do(pPageTypeHash) {
  var pPageType = reduceVarName(pPageTypeHash["page-type"]);
  if (pPageType == "") {
    console.log("initPageTypeJS()-Call: Page-ID undefined");
  } else {
    if (!top.vJSON_JS) {
      var vError = "WARNING: initPageTypeJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    top.vJSON_JS["SelectedPage"] = pPageType;
    if (top.vJSON_JS["PageType"]) {
      console.log("vJSON_JS['PageType'] exists");
    } else {
      top.vJSON_JS["PageType"] = {};
      console.log("vJSON_JS['PageType'] created");
    };
    if (top.vJSON_JS["PageType"][pPageType]) {
      console.log("Page '"+pPageType+"' exists in JSON DB");
    } else {
      top.createPageTypeJS(pPageType);
      console.log("Page '"+pPageType+"' created and updated from HTML Form with default values");
    };
  };
}


function initPageJS(pPageHash) {
  if (!pPageHash) {
    console.log("Call: initPageJS(pPageHash) with pPageHash undefined");
  } else {
    console.log("initPageJS(pPageHash) Type: "+typeof(pPageHash));
    initPageJS_do(pPageHash)
  }
};

function initPageJS_do(pPageHash) {
  var vPageID = reduceVarName(pPageHash["page-id"]);
  if (vPageID == "") {
    console.log("initPageJS()-Call: Page-ID undefined");
  } else {
    if (!top.vJSON_JS) {
      var vError = "WARNING: initPageJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    top.vJSON_JS["SelectedPage"] = vPageID;
    if (top.vJSON_JS["PageList"]) {
      console.log("vJSON_JS['PageList'] exists");
    } else {
      top.vJSON_JS["PageList"] = {};
      console.log("vJSON_JS['PageList'] created");
    };
    if (top.vJSON_JS["PageList"][vPageID]) {
      console.log("Page '"+vPageID+"' exists in JSON DB");
    } else {
      top.createPageJS(pPageHash);
      console.log("Page '"+vPageID+"' created and updated from HTML Form with default values");
    };
  };
}


function initFormDatabaseList() {
  console.log("initFormDatabaseList()");
   var vDatabaseArr = getDatabaseArray(); //read from tDatabases in  classes.js 413
   for (var i = 0; i < vDatabaseArr.length; i++) {
     initDatabaseJS(vDatabaseArr[i]);
   };
};

function initDatabaseJS(pDatabase) {
  if (!pDatabase) {
    console.log("Call: initDatabaseJS(pDatabase) with pDatabase undefined");
  } else {
      initDatabaseJS_do(pDatabase)
  }
};

function initDatabaseJS_do(pDatabase) {
  //pDatabase = reduceVarName(pDatabase);
  if (pDatabase == "") {
    console.log("initDatabaseJS()-Call: Databasename undefined");
  } else {
    if (!top.vJSON_JS) {
      var vError = "WARNING: initDatabaseJS() [init.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    if (top.vJSON_JS["DatabaseList"]) {
      console.log("vJSON_JS['DatabaseList'] exists");
    } else {
      top.vJSON_JS["DatabaseList"] = {};
      console.log("vJSON_JS['DatabaseList'] created");
    };
    if (top.vJSON_JS["DatabaseList"][pDatabase]) {
      console.log("Database '"+pDatabase+"' exists in JSON DB");
    } else {
      top.vJSON_JS["DatabaseList"][pDatabase] = "{\n  \"name\": \""+pDatabase+"\"\n}";
      console.log("Database '"+pDatabase+"' created and updated from HTML Form with default values");
    };
  };
}


function initFormSelectors() {
  // get current ClassName
  initClassSelector();
  initPageSelector();
};

function initClassSelector() {
  var vClassArr = [];
  var vClassTypeArr = [];
  var vClassList = vJSON_JS["ClassList"] || {};
  var vClassTypeHash = vJSON_JS["ClassType"] || {};
  var vTypeDef = "";
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClassArr.push(iClass);
      vTypeDef = vClassTypeHash[iClass] || "";
      if (vTypeDef != "") {
        vJSON_JS["ClassList"][iClass]["sClassType"] = vTypeDef;
        vTypeDef = " = " + vTypeDef;
      };
      vClassTypeArr.push(iClass+vTypeDef);
    };
  };
  //ClassList update
  //document.fCreator.tClassList += "\n"+vClass;
  write2value("tClassList",vClassTypeArr.join("\n"));
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createClassSelect(vClassArr);
};

function initPageSelector() {
  var vPageArr = [];
  var vPageList = vJSON_JS["PageList"];
  for (var iPage in vPageList) {
    if (vPageList.hasOwnProperty(iPage)) {
      vPageArr.push(iPage);
    };
  };
  //PageList update
  //document.fCreator.tPageList += "\n"+vPage;
  write2value("tPageList",vPageArr.join("\n"));
  //var vPage = getValueDOM("tPagename");
  //initPageJS(vPage);
  createPageSelect(vPageArr);
};

function initDatabaseSelector() {
  var vDatabaseArr = [];
  var vDatabaseList = vJSON_JS["DatabaseList"];
  for (var iDatabase in vDatabaseList) {
    if (vDatabaseList.hasOwnProperty(iClass)) {
      vDatabaseArr.push(iClass);
    };
  };
  //ClassList update
  //document.fCreator.tClassList += "\n"+vClass;
  write2value("tDatabases",vDatabaseArr.join("\n"));
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createDatabaseSelect(vDatabaseArr);
}


function initFormClass(pClass) {
  var vSuperClass = getValueDOM("tSuperClassname");
  if (vSuperClass && vSuperClass != "") {
    initClassJS(vSuperClass);
  };
  updateForm2JSON(pClass); // jsondb.js:157
  createAttribTypeSelect();
  createAttribSelect();
  createMethodSelect(); //dom.js:13
}
