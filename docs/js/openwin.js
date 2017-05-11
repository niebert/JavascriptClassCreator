function openWinHTML(pURL,pWinName) {
  var vWinName = pWinName || getWinName();
  pURL = encodeURI(pURL);
  window.open(pURL,vWinName, 'toolbar=no,  scrollbars=yes, menubar=no, width=400, height=600');
}

function openEmulator(pEmulatorFile) {
  var vEmulatorFile = pEmulatorFile || "emulate.html";
  var vPath = getValueDOM("tDefaultAppPath");
  var vFileName = getValueDOM("sFileList") || getValueDOM("sFileHTML") || "";
  console.log("openEmulator('"+vEmulatorFile+"') for File '"+vFileName+"'");
  if (vFileName == "") {
    alert("ERROR: View HTML is not possible. Please select a file first!")
  } else {
    console.log("FileName='"+vFileName+"'");
    //write2value("sFileHTML",vFileName);
    // get previous setting of sStandalone YES/NO
    var vStandanlone = getValueDOM("sStandalone");
    // set sStandalone to "YES"
    write2value("sStandalone","YES");
    exportHTML();
    //restore previous setting of Standalone
    write2value("sStandalone",vStandanlone);
    openWinHTML(vPath+vEmulatorFile);
  };
};

function getWinName() {
  var d = new Date();
  var n = d.getTime();
  var vWinName = 'AppWindow'+n;
  return vWinName;
}

function appendURI(pID,pQueryHash) {
  return appendURIvalue(pID,pQueryHash["app_"+pID]);
};

function appendURIvalue(pID,pValue) {
  return "&"+pID+"="+encodeURLparam(pValue);
}

function changeJQueryPage(pPageID) {
  console.log("Change JQuery Page to PageID ["+pPageID+"] - openwin.js (needs to be updated due to depricated changePage");
  $.mobile.changePage(pPageID); //depricate in JQuery Mobile 1.4
  // $.mobile.pageContainer.pagecontainer("change", "#page")
}

function openSubmitWinHTML() {
  //detects the Geolocation and uses openSubmitLocationHTML() as callback
    retrieveLocation(openSubmitLocationHTML);
}

function openSubmitLocationHTML(pPosition) {
  //Open a Submit Browser Window and presets the values for username, email and current geolocation
  var vQueryHash = readQueryParams();
  var vURL = getValueDOM("app_submiturl");
  var vDB  = getValueDOM("app_database");
  //alert("vURL:"+vURL+"\nvDB:"+vDB);
  vURL+="?database="+vDB;
  vURL+=appendURIvalue("action","subscribeappform");
  vURL+=appendURI("usergroup",vQueryHash);
  vURL+=appendURI("email",vQueryHash);
  vURL+=appendURIvalue("sampledate",Date());
  openWinHTML(vURL);
}

function openWinHTMLsize(pURL,pWidth,pHeight,pWinName) {
  var d = new Date();
  var n = d.getTime();
  var vWinName = pWinName || 'AppWindow'+n;
  window.open(pURL,vWinName, 'toolbar=no, menubar=no, scrollbars=yes, width='+pWidth+', height='+pHeight);
}
