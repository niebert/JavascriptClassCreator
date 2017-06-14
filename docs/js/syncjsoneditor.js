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
}
