
//loadInputJSON();
//document.write(vLinkParam.getTableHTML());

function getWinOpener() {
  var vWinOpener = window.opener;
  return vWinOpener;
};

function loadScript(pScript) {
  var vScriptTag = document.createElement('script');
  vScriptTag.setAttribute('src',pScript);
  document.head.appendChild(vScriptTag);
};

function getEditorInnerHTML(pID) {
    return document.getElementById(pID).innerHTML;
};
//var vWinOpener = getWinOpener();

function loadInputJSON() {
  var vJSON;
  if (typeof vWinOpener === "undefined") {
		console.log("wWinOpener undefined - connection lost");
	} else {
      if (vLinkParam.exists("db")) {
        console.log("JSON Database db='"+vLinkParam.getValue("db")+"' defined ");
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



function loadSchemaJSON(pHashPath) {
}

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
