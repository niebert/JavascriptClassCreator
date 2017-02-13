function write2editor(pID,pValue) {
  write2value("t"+pID,pValue);
  setEditorValue("i"+pID,pValue);
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

function setEditorValue(pIFrameName,pValue) {
  var vEditor = getIFrameEditor(pIFrameName);
  //vEditor.setValue(vEditor.getValue(), 1);
  if (vEditor) {
    vEditor.setValue(pValue, -1);
    //vEditor.setValue(pValue, 1);
    console.log("Setting Text of ACE-Editor in iFrame '"+pIFrameName+"' DONE!");
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

function X_readFile(pFileName) {
    var vContent = null;
    $.ajax({
            url : "tpl/test.txt",
            dataType: "text",
            success : function (data) {
                //$(".text").html(data);
                vContent = data;
            }
        });
    return vContent;
};

function readFile(pFile) {
    var vContent = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                vContent = rawFile.responseText;
                alert(vContent);
            }
        }
    }
    rawFile.send(null);
    return vContent;
}
