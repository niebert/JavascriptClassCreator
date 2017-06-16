// iJE: init JSON Editor is used to populate the JSON editor
// sJE: sync JSON Editor is used to sync back JSON editor content into JSCC
function openEditorJSON(pListID) {
  openWindow('plugins/dbedit/index.html?jscc='+pListID+'&initfunc=iJE_'+pListID+'&syncfunc=sJE_'+pListID)
};

//--------------------------------
// JSON Editor: FileList
//--------------------------------

function openEditFileList() {
  //openWindow('plugins/dbedit/index.html?jscc=BasicClasses&initfunc=iJE_BasicClasses&syncfunc=sJE_BasicClasses');
  openEditorJSON("FileList");
};

function iJE_FileList(pListID) {
  // {
  //     "sAppClassHTML": "App",
  //     "tTemplateHTML": "tpl/Default.html",
  //     "tElementFileIDs": "HTML_TITLE|SERVER_URL|USERNAME|SESSION|DATABASE",
  //     "tElementID": "HTML_TITLE",
  //     "sElementsFileList": "HTML_TITLE",
  //     "tElementHTML": "File index.html - Content of element HTML_TITLE",
  //     "tFilename": "index.html",
  //     "tAppInitCall": "init(document,vDataJSON)",
  //     "tPageIDs": "welcome|home|quit|newpage",
  //     "elements": {
  //         "HTML_TITLE": "File index.html - Content of element HTML_TITLE",
  //         "SERVER_URL": "https://niehbert.github.io/JavascriptClassCreator/srv/loginemu.html",
  //         "USERNAME": "myuser",
  //         "SESSION": "File index.html - Content of element SESSION",
  //         "DATABASE": "File index.html - Content of element DATABASE"
  //     },
  //     "ImportList": [
  //       {
  //         "file":"js/login.js",
  //         "type":"JS",
  //         "import": true
  //       },
  //       {
  //         "file":"js/geolocation.js",
  //         "type":"JS",
  //         "import": true
  //       }
  //     ]
  // }
  updatePages4EditJSON();
  var vHash = vJSCC_DB["FileList"];
  var vArray = [];
  for (var key in vHash) {
    if (vHash.hasOwnProperty(key)) {
      vHash[key]["tFilename"] = key;
      vArray.push(vHash[key])
    }
  }
  return vArray;
}

function sJE_FileList(pArrayJSON) {
  vJSCC_DB["FileList"] = {};
  var key = "";
  var vArrFileID = [];
  for (var i = 0; i < pArrayJSON.length; i++) {
    key = pArrayJSON[i]["tFilename"] || "";
    if (key != "") {
      vJSCC_DB["FileList"][key] = pArrayJSON[i];
      vArrFileID.push(key);
    };
  };
  if (indexOfArray(vArrFileID,getSelectedFileID())>=0) {
    createFileSelect(getSelectedFileID())
  } else {
    createFileSelect();
  }
}

function updatePages4EditJSON() {
  vDataJSON["FileList_schema"]["definitions"]["pages"]["enum"] = getArray4HashID(vJSCC_DB["PageList"]);
};

//--------------------------------
// JSON Editor: GlobaleLibList
//--------------------------------

function openEditGlobalLibList() {
  openEditorJSON("GlobalLibList");
};

function iJE_GlobalLibList() {
  // init JSON Editor and populate with JSCC data
  return cloneJSON(vJSCC_DB["GlobalLibList"]);
}

function sJE_GlobalLibList(pJSON) {
  // sync JSON Editor to JSCC
  // "GlobalLibList": [
  //   {
  //     "file":"js/string.js",
  //     "import": true
  //   },
  //   ...
  // ]
  vJSCC_DB["GlobalLibList"] = pJSON;
  updateGlobalLibsJSON2Form(pJSON);
};

//--------------------------------
// JSON Editor: BasicClasses
//--------------------------------

function openEditBasicClasses() {
  //openWindow('plugins/dbedit/index.html?jscc=BasicClasses&initfunc=iJE_BasicClasses&syncfunc=sJE_BasicClasses');
  openEditorJSON("BasicClasses");
};

function iJE_BasicClasses() {
  // init JSON Editor and populate with JSCC data
  var vHash = vJSCC_DB["BasicClasses"];
  var vArray = [];
  for (var key in vHash) {
    if (vHash.hasOwnProperty(key)) {
      vArray.push({
        "name":key,
        "init": vHash[key]
      })
    }
  };
  return vArray;
}

function sJE_BasicClasses(pJSON) {
  // sync JSON Editor to JSCC
  console.log("sJE_BasicClasses(pJSON)");
  var vHash = vJSCC_DB["BasicClasses"];
  var key = "";
  var value = "";
  for (var i = 0; i < pJSON.length; i++) {
    key = pJSON[i]["name"] || "";
    if (key != "") {
      vHash[key] = pJSON[i]["init"] || "";
    };
  };
  updateJSON2BasicClasses();
};
//--------------------------------
// JSON Editor: Class
//--------------------------------

function openEditClass() {
  //openWindow('plugins/dbedit/index.html?schema=Class&initfunc=iJE_Class&syncfunc=sJE_Class');
  //openWindow('plugins/dbedit/index.html?jscc=Class&initfunc=iJE_Class&syncfunc=sJE_Class');
  openEditorJSON("Class");
};

function reverseMap(pMap) {
  var vReverseMap = {};
  for (var key in pMap) {
    if (pMap.hasOwnProperty(key)) {
      vReverseMap[pMap[key]] = key;
    }
  };
  return vReverseMap
};

var vMapAtt2Edit = {
  "AttribAccess":"visibility",
  "AttribDefault":"init",
  "AttribType":"class",
  "AttribComment":"comment"
};
var vMapMeth2Edit = {
  "MethodAccess":"visibility",
  "MethodReturn":"return",
  "MethodCode":"jscode",
  "MethodComment":"comment"
};

function iJE_Class() {
  console.log("iJE_Class()-Call");
  var vClass = getSelectedClassID();
  var vClassJS = getClassJSON(vClass);
  var vJSON = {};
  vJSON["name"] = vClass;
  vJSON["comment"] = vClassJS["comment"] || "What is the purpose of class '"+vClass+"'?";
  //   JSON output: {
  //     "name": "MyClass",
  //     "comment": "What does the class do?",
  vJSON["attributes"] = [];
  var x = vJSON["attributes"];
  var vMapHash = vMapAtt2Edit;
  var y;
  for (var iAtt in vClassJS["AttribDefault"]) {
    y = {};
    y["name"] = iAtt;
    for (var key in vMapHash) {
      y[vMapHash[key]] = vClassJS[key][iAtt];
    };
    x.push(y);
  };
  //     "attributes": [
  //         {
  //             "visibility": "public",
  //             "name": "aMyAttribsadsa",
  //             "init": "null",
  //             "class": "",
  //             "comment": "What do you stored in this attribute?"
  //         }
  //     ],
  vMapHash = vMapMeth2Edit;
  vJSON["methods"] = [];
  x = vJSON["methods"];
  for (var iMeth in vClassJS["MethodReturn"]) {
    y = {};
    y["name"] = iMeth;
    for (var key in vMapHash) {
      y[vMapHash[key]] = vClassJS[key][iMeth];
    };
    y["parameter"] = [];
    var z = y["parameter"];
    var vParArr = (vClassJS["MethodParameter"][iMeth]).split(",");
    var vPar = "";
    var vParClass = "";
    for (var i = 0; i < vParArr.length; i++) {
      vParDefArr = vParArr[i].split(":");
      vPar = vParDefArr[0] || "";
      vParClass = vParDefArr[1] || "";
      if (vPar != "") {
        z.push({
          "name": vPar,
          "class": vParClass
        });
      }
    };
    x.push(y);
  };
  //     "methods": [
  //         {
  //             "visibility": "public",
  //             "name": "myMethod1",
  //             "parameter": [
  //                 {
  //                     "name": "pVar",
  //                     "class": ""
  //                 },
  //                 {
  //                     "name": "pVar",
  //                     "class": ""
  //                 }
  //             ],
  //             "return": "",
  //             "comment": "What kind of process does this method perform?",
  //             "code": ""
  //         }
  //     ]
  // }
  updateClass4EditJSON();
  return vJSON;
};

function updateClass4EditJSON() {
  // getClassType4Definition
  // "definitions":{
  //   "selectclass": {
  //     "enum"
  vDataJSON["Class_schema"]["definitions"]["selectclass"]["enum"] = getAttribTypeArray();
  vDataJSON["Class_schema"]["title"] = "Class: "+ getSelectedClassID();
};

function sJE_Class(pJSON) {
  console.log("sJE_Class(pJSON)");
  var vClass = getSelectedClassID();
  if (vClass != pJSON["name"]) {
    // rename Class;
    renameClassForm_do(vClass,pJSON["name"]);
    vClass = pJSON["name"]
  };
  var vClassJS = getClassJSON(vClass);
  vClassJS[tClassname] = pJSON["name"];
  vClassJS["comment"] = pJSON["comment"];
  var vArrID = ["AttribAccess","AttribName","AttribDefault","AttribType","MethodAccess","MethodReturn","MethodCode","MethodComment"];
  for (var i = 0; i < vArrID.length; i++) {
    // init the Attrib and Method Hashes of the Class
    vClassJS[vArrID[i]] = {};
  };
  // update Attributes from JSON Editor
  var x = pJSON["attributes"];
  var vMapHash = vMapAtt2Edit;
  var vAtt = "";
  for (var i = 0; i < x.length; i++) {
    var y = x[i];
    vAtt = y["name"];
    if (vAtt != "") {
      for (var vID in vMapHash) {
        vClassJS[vID][vAtt] = y[vMapHash[vID]];
      };
    }
  };
  // update Methods from JSON Editor
  x = pJSON["methods"];
  var vMapHash = vMapMeth2Edit;
  var vMeth = "";
  for (var i = 0; i < x.length; i++) {
    var y = x[i];
    vMeth = y["name"];
    if (vMeth != "") {
      for (var vID in vMapHash) {
        vClassJS[vID][vMeth] = y[vMapHash[vID]];
      };
    };
    // set the parameter definition
    var z = y["parameter"];
    var vParams = [];
    for (var i = 0; i < z.length; i++) {
      if (z[i]["name"] != "") {
        if (z[i]["class"] != "") {
          // parameter has a class type definition
          vParams.push(z[i]["name"] + ":" + z[i]["class"])
        } else {
          // parameter without class type definition
          vParams.push(z[i]["name"])
        };
      };
    };
    vClassJS["MethodParameter"][vMeth] = vParams.join(",");
  };
  updateClassJSON2Form();
}
