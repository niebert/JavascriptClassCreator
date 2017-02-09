//#################################################################
//# Javascript Code Generator
//# GNU Public License V3 - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus
//# 2012 University Koblenz-Landau
//#################################################################
//var vDOM_ID = ["tClassname","tSuperClassname","tAuthor","tEMail","tAttributes","tMethods"];
vDOM_ID.push("tPages");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tPageTypes");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tLibraries");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tDatabases");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tClassname");
vTYPE_ID.push("String");
vDOM_ID.push("tSuperClassname");
vTYPE_ID.push("String");
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
        initFormClassList();
        initFormDatabaseList();
        initFormSelectors();
        initFormPageList();
        console.log("Read Class from Form and add to vJSON_JS");
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
};

function initLabelsHTML() {
  write2innerHTML("labPageRecord",vPageRecord.join(" | "));
};

function initFormClassList() {
  console.log("initFormClassList()");
   var vClassArr = getClassArray(); //read from tClassList in  classes.js 413
   for (var i = 0; i < vClassArr.length; i++) {
     initClassJS(vClassArr[i]);
   };
};

function initFormPageList() {
  console.log("initFormPageList()");
   var vPageArr = getPageListArray(); //read from tPages in  classes.js 413
   for (var i = 0; i < vPageArr.length; i++) {
     initPageJS(vPageArr[i]);
   };
};

function initPageJS(pPageHash) {
  if (!pPageHash) {
    console.log("Call: initPageJS(pClass) with pPageHash undefined");
  } else {
      initPageJS_do(pPageHash)
  }
};

function initPageJS_do(pPageHash) {
  var vPageID = reduceVarName(pPageHash["page-id"]);
  if (vPageID == "") {
    console.log("initPageJS()-Call: Page-ID undefined");
  } else {
    if (!top.vJSON_JS) {
      var vError = "WARNING: initPageJS() [Pagees.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
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
};

function initClassSelector() {
  var vClassArr = [];
  var vClassList = vJSON_JS["ClassList"];
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClassArr.push(iClass);
    };
  };
  //ClassList update
  //document.fCreator.tClassList += "\n"+vClass;
  write2value("tClassList",vClassArr.join("\n"));
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createClassSelect(vClassArr);
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
