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

function initEditorContent() {
  console.log("initEditorContent() - Call");
  writePage2Editor();
  writePageType2Editor();
};

function writePage2Editor() {
  var vID = getValueDOM("sPageHTML");
  var vValue = "Page '"+vID+"' undefined";
  if (reduceVarName(vID) == "") {
    vValue = "";
  } else if (vJSON_JS["PageContent"] && vJSON_JS["PageContent"][vID]) {
    vValue = vJSON_JS["PageContent"][vID];
  };
  write2value("tPageHTML",vValue);
  write2value("tPageID",vID);
}

function writePageType2Editor() {
  var vID = getValueDOM("sPageTypeHTML");
  var vValue = "PageType '"+vID+"' undefined";
  if (vJSON_JS["PageType"] && vJSON_JS["PageType"][vID]) {
    vValue = vJSON_JS["PageType"][vID]["template"];
  };
  //setEditorValue("iPageHTML",vValue);
  write2value("tPageTypeHTML",vValue);
  write2value("tPageTypeID",vID);
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
    vReturn = vEditor.getValue();
    console.log("get Text of ACE-Editor in iFrame '"+pIFrameName+"' DONE!");
  } else {
    console.log("ERROR: Getting Text of ACE-Editor in iFrame '"+pIFrameName+"' was not successful!");
  };
  return vReturn;
};
