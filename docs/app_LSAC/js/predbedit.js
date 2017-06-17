
//loadInputJSON();
//document.write(vLinkParam.getTableHTML());

function getWinOpener() {
  var vWinOpener = window.opener;
  return vWinOpener;
};

function getRemoteDataJSON() {
  var vWinOpener = window.opener;

}

function loadScript(pScript) {
  var vScriptTag = document.createElement('script');
  vScriptTag.setAttribute('src',pScript);
  document.head.appendChild(vScriptTag);
};

function getEditorInnerHTML(pID) {
    return document.getElementById(pID).innerHTML;
};
//var vWinOpener = getWinOpener();

function syncRemoteSchema() {
  var vRemoteDB = getWinOpenerDB();
  if (vRemoteDB) {
    var vSchema = getEditorValue("iACEoutput");
    var vSchemaJSON = getJSON4String(vSchema);
    if (vSchemaJSON) {
      vRemoteDB["schema"] = vSchemaJSON;
      var vWinOpener = getWinOpener();
      vWinOpener.setEditorValue("iDBSchema",vSchema);
      var vDB = JSON.stringify(vRemoteDB,null,4);
      if (vDB) {
        vWinOpener.setEditorValue("iDBHTML",vDB);
      } else {
        console.log("Window Opener DB undefined");
      }
    } else {
      console.log("Parsing Error of JSON Schema");
    }
  }
};

function getRemoteSchema() {
  var vRemoteDB = getWinOpenerDB();
  if (vRemoteDB) {
    if (vRemoteDB.hasOwnProperty("schema")) {
      return JSON.stringify(vRemoteDB["schema"],null,4);
    } else {
      console.log("No JSON Schema defined in Remote DB '"+vLinkParam.getValue("db")+"'");
    }
  } else {
    console.log("Remote DB '"+vLinkParam.getValue("db")+"' undefined");
  }
};
function exportEditorHTML() {
  if (vDataJSON.hasOwnProperty("jsoneditor")) {
    console.log("Create JSON Editor");

    var vTemplate = vDataJSON["jsoneditor"]["template"];
    var vJSONstring = getEditorValue("iACEinput");
    var vSCHEMAstring = getEditorValue("iACEoutput");
    vTemplate = replaceString(vTemplate,"___JSON_SCHEMA___",vSCHEMAstring);
    vTemplate = replaceString(vTemplate,"___JSON_DATA___",vJSONstring);
    saveFile2HDD("jsoneditor.html",vTemplate);
  } else {
    console.log("Template vDataJSON['jsoneditor'] is not defined/loaded!");
  };
}

function createEditorHTML4SchemaJSON(pSchema,pJSON) {
  var iFrameDoc = getIFrameDocument("iTemplate");
  if (iFrameDoc) {
    console.log("Template '"+vFilename+"' loaded");
    var vTemplate = iFrameDoc.getElementsByTagName("html")[0].innerHTML;
    vTemplate = "<!DOCTYPE html>\n</html>\n"+vTemplate+"\n</html>"
    vTemplate = replaceString(vTemplate,"___JSON_SCHEMA___",pSchema);
    vTemplate = replaceString(vTemplate,"___JSON_DATA___",pJSON);
    return vTemplate;
  } else {
    console.log("ERROR: Loading Template '"+vFilename+"' failed");
  }
}

function getWinOpenerDB() {
  var vWinOpener = getWinOpener();
  if (typeof vWinOpener === "undefined") {
    console.log("window.opener undefined or connection lost");
  } else {
      if (vLinkParam.exists("db")) {
        var vDB_ID = vLinkParam.getValue("db");
        console.log("LinkParam db='"+vDB_ID+"' defined ");
        if (vWinOpener.vJSCC_DB["DatabaseList"].hasOwnProperty(vDB_ID)) {
          console.log("JSON Database db='"+vDB_ID+"' defined ");
          return vWinOpener.vJSCC_DB["DatabaseList"][vDB_ID];
        };
      }
  }
};

function updateSchemaDefinitions(pWinOpener) {
  var vWinOpener = pWinOpener || window.opener;
  if (typeof vWinOpener === "undefined") {
    console.log("window.opener undefined or connection lost");
  } else {
    var vJSCC_DB = vWinOpener.vJSCC_DB;
    //----????----------
  };
}

function loadInputJSON() {
  var vJSON;
  if (typeof vWinOpener === "undefined") {
		console.log("wWinOpener undefined - connection lost");
	} else {
      if (vLinkParam.exists("db")) {
        var vDB_ID = vLinkParam.getValue("db");
        console.log("LinkParam db='"+vDB_ID+"' defined ");
        if (vWinOpener.vJSCC_DB["DatabaseList"].hasOwnProperty(vDB_ID)) {
          console.log("JSON Database db='"+vDB_ID+"' defined ");
          vRemoteDB = vWinOpener.vJSCC_DB["DatabaseList"][vDB_ID];
        };
      } else if (vLinkParam.exists("jscc")) {
        var vID = vLinkParam.getValue("jscc");
        console.log("JSON ID jscc='"+vID+"' defined ");
        if (vWinOpener.vJSCC_DB.hasOwnProperty(vID)) {
          console.log("JSON data jscc='"+vID+"' defined ");
          vJSON = vWinOpener.vJSCC_DB[vID];
        }
      } else if (vLinkParam.exists("jsonpath")) {
        var vPathJSON = vLinkParam.getValue("jsonpath");
        console.log("JSON path jsonpath='"+vPathJSON+"' defined ");
      } else {
        console.log("Neither JSCC path 'jsccpath' nor JSON Database 'db' was not defined in LinkParam!");
      };
		  console.log("Parent  of 'iOutput' loaded");
	};
  return vJSON
};

function loadSchemaFile() {
  if (vLinkParam.exists("schema")) {
    var vSchema = vLinkParam.getValue("schema");
    console.log("JSON path '"+vSchema+"' defined ");
    if (vDataJSON.hasOwnProperty[vSchema]) {
      console.log("Schema is pre-defined in vDataJSON['"+vSchema+"'] of dbedit");
      //startEditor4Schema(vDataJSON[vSchema]);
    } else {
      console.log("Load Schema '"+vSchema+"' from file in dbedit");
      loadScript(vSchema);
    };
  }
}

function setInputCode(pInputCode) {
	var vInputCode = pInputCode || "// Code undefined";
	document.getElementById("in").value = vInputCode;
};

function setClassName(pClassName) {
	var vClass = pClassName || "-";
	document.getElementById("hClassName").innerHTML = vClass;
};

function getOutputCode() {
	console.log("getOutputCode()");
	return document.getElementById("out").value || "undefined code";
};


    // var vID4JSCC = "GlobalLibList";
    // var vJSCC_Ref = top.vJSCC_DB[vID4JSCC];
    //
    // var vFileOut = "globallibs.json";
    function loadJSCC2JSON() {
      if (top.vJSCC_DB) {
        return loadJSCC();
      } else {
        return init_DB;
      };
    }

    function saveFile2HDD(pFilename,pContent) {
      var file = new File([pContent], {type: "text/plain;charset=utf-8"});
      saveAs(file,pFilename);
    }

    function saveJSON2JSCC(pID) {
      if (top.vJSCC_DB) {
        //alert("Type of Content: "+typeof(pContent));
        validateJSON();
        saveJSCC();
        var vMSG = "JSON of ['"+pID+"'] saved in JSCC!"
        console.log(vMSG);
        alert(vMSG);
      } else {
        alert("ERROR: JSON Editor is not running in an iframe in JSCC.\nSaving JSCC cancelled!")
      }
    }

    function restoreDefaultJSCC(pID) {
      editor.setValue(loadJSCC2JSON());
      if (top.vJSCC_DB) {
        alert("Reset JSON Editor Content ['"+pID+"'] in JSCC");
      } else {
        alert("Reset JSON Editor Content ['"+pID+"'] to JSON 'init_DB'");
      };
    };
