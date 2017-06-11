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
