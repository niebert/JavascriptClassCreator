function onChangeACE(pID,pContent) {
  top.write2value(pID,pContent);
  switch (pID) {
    case "tPageHTML":
      var vPageID = getValueDOM("sPageHTML");
      if (existsPageJS(vPageID)) {
        vJSCC_DB["PageList"][vPageID]["content"] = pContent;
      };
    break;
    case "tPageTypeHTML":
      var vPageID = getValueDOM("sPageTypeHTML");
      if (existsPageTypeJS(vPageTypeID)) {
        vJSCC_DB["PageTypeList"][pPageTypeID]["content"] = pContent;
      };
    break;
    default:

  }
};

function write2editor(pID,pValue,pMode) {
  write2value("t"+pID,pValue);
  if (pMode) {
    // e.g. editor.session.setMode("ace/mode/javascript");
    setEditorMode("i"+pID,pMode);
  };
  setEditorValue("i"+pID,pValue);
};

function insert2editor(pID,pValue) {
  var vEditor = getIFrameEditor("i"+pID);
  vEditor.insert(pValue);
  var vOutput = getEditorValue("i"+pID);
  write2value("t"+pID,pValue);
};

function getIFrameDocument(pIFrameName) {
  var vIFrame = document.getElementById(pIFrameName);
  var vDoc = null;
  if (vIFrame) {
    vDoc = vIFrame.contentWindow.document;
  } else {
    console.log("getIFrameDocument('"+pIFrameName+"') iFrame UNDEFINED");
  };
  return vDoc;
};

function getIFrameWindow(pIFrameName) {
  var vIFrame = document.getElementById(pIFrameName);
  var vWin = null;
  if (vIFrame) {
    vWin = vIFrame.contentWindow;
  } else {
    console.log("getIFrameWindow('"+pIFrameName+"') iFrame UNDEFINED");
  };
  return vWin;
};

function getCompressorWin() {
  return getIFrameWindow("iCompressor");
};

function getIFrameEditor(pIFrameName) {
  //var vDoc = getIFrameDocument(pIFrameName);
  var vWin = getIFrameWindow(pIFrameName);
  var vEditor = null;
  if (vWin) {
    console.log("Window of iFrame '"+pIFrameName+"' found");
    if (vWin.editor) {
      vEditor = vWin.editor;
      console.log("iFrameEditor in Frame '"+pIFrameName+"' exists!");
    } else {
      console.log("ERROR: iFrameEditor in Frame '"+pIFrameName+"' missing!");
    }
  } else {
    console.log("ERROR: getIFrameEditor('"+pIFrameName+"') no contentWindow object exists");
  };
  return vEditor;
};

function initEditorContent(pClassID) {
  console.log("initEditorContent('"+pClassID+"') - Call");
  writePage2Editor();
  writePageType2Editor();
  writeMethodCode2Editor(pClassID);
};

function writePage2Editor() {
  var vID = getValueDOM("sPageHTML");
  var vValue = "Page '"+vID+"' undefined";
  if (existsPageJS(vID)) {
    if (vJSCC_DB["PageList"][vID]["content"]) {
      vValue = vJSCC_DB["PageList"][vID]["content"];
      write2value("tPageHTML",vValue);
      write2value("tPageID",vID);
    };
  };
}

function getPageTypeCode4Editor(pPageTypeID) {
  var vID = pPageTypeID || vJSCC_DB["sPageTypeHTML"] || getValueDOM("sPageTypeHTML") || "";
  var vValue;
  if (vJSCC_DB["PageTypeList"][vID]) {
    if (vJSCC_DB["PageTypeList"][vID]["template"]) {
      console.log("PageType template for ["+vID+"] FOUND");
      vValue = vJSCC_DB["PageTypeList"][vID]["template"];
    }
  } else {
    console.log("PagType content for ["+vID+"] undefined");
  };
  return vValue
}



function getMethodCode4Editor(pClass) {
  var vValue = "MethodCode for '"+pClass+"' undefined";
  if (existsClassJS(pClass)) {
    var vClassJS = getClassJSON(pClass);
    var vID = vClassJS["sMethodList"];
    vValue = "MethodCode for '"+pClass+"."+vID+"()' undefined";
    if (reduceVarName(vID) == "") {
      vValue = "";
    } else if (vClassJS["MethodCode"][vID]) {
      vValue = vClassJS["MethodCode"][vID];
      console.log("getMethodCode2Editor('"+pClass+"') FOUND MethodCode for "+vID+"()");
    } else {
      console.log("writeMethodCode2Editor('"+pClass+"') undefined MethodCode for '"+vID+"()'");
    };
  };
  return vValue
}


function writeMethodCode2Editor(pClass) {
  if (vJSCC_DB["ClassList"][pClass]) {
    var vID = vJSCC_DB["ClassList"][pClass]["sMethodList"];
    var vValue = "MethodCode for '"+vID+"()' undefined";
    if (reduceVarName(vID) == "") {
      vValue = "";
    } else if (vJSCC_DB["ClassList"][pClass]["MethodCode"][vID]) {
      vValue = vJSCC_DB["ClassList"][pClass]["MethodCode"][vID];
      console.log("writeMethodCode2Editor('"+pClass+"') FOUND MethodCode for "+vID+"()");
      write2value("tMethodCode",vValue);
    } else {
      console.log("writeMethodCode2Editor('"+pClass+"') undefined MethodCode for '"+vID+"()'");
    };
  } else {

  };
  //write2value("tMethodID",vID);
}

function writePageType2Editor() {
  var vID = getValueDOM("sPageTypeHTML");
  //setEditorValue("iPageHTML",vValue);
  var vValue = getPageTypeCode4Editor(vID);
  if (vValue) {
    write2value("tPageTypeHTML",vValue);
    write2value("tPageTypeID",vID);
  } else {
    console.log("writePageType2Editor() Content undefined");
  }
}


function setEditorMode(pIFrameName,pMode) {
  if (pMode) {
    var vEditor = getIFrameEditor(pIFrameName);
    // e.g. vEditor.session.setMode("ace/mode/javascript");
    if (vEditor) {
      if (vEditor.session) {
        console.log("setEditorMode('"+pIFrameName+"','"+pMode+"')");
        vEditor.session.setMode(pMode);
      } else {
        console.log("WARNING: vEditor['"+pIFrameName+"'].session undefined");
      }
    } else {
      console.log("WARNING: vEditor['"+pIFrameName+"']");
    };
  };
};


function setEditorValue(pIFrameName,pValue) {
  var vEditor = getIFrameEditor(pIFrameName);
  //vEditor.setValue(vEditor.getValue(), 1);
  if (vEditor) {
    if (typeof vEditor.setValue === "function") {
      vEditor.setValue(pValue, -1);
      console.log("Setting Text of ACE-Editor in iFrame '"+pIFrameName+"' DONE!");
    } else {
      console.log("WARNING: vEditor.setValue() undefined");
    }
    //vEditor.setValue(pValue, 1);
  } else {
    console.log("ERROR: Setting Text of ACE-Editor in iFrame '"+pIFrameName+"' was not successful!");
  }
}

function getEditorValue(pIFrameName) {
  var vEditor = getIFrameEditor(pIFrameName);
  var vReturn = "";
  if (vEditor) {
    if (typeof(vEditor.getValue) !== "undefined") {
      // safe to use the function
      vReturn = vEditor.getValue();
      console.log("get Text of ACE-Editor in iFrame '"+pIFrameName+"' DONE!");
    } else {
      console.log("WARNING: Call vEditor.getValue() undefined");
    }
  } else {
    console.log("ERROR: Getting Text of ACE-Editor in iFrame '"+pIFrameName+"' was not successful!");
  };
  return vReturn;
};
