function openWinHTML(pURL,pWinName) {
  var vWinName = pWinName || getWinName();
  window.open(pURL,vWinName, 'toolbar=no,  scrollbars=yes, menubar=no, width=400, height=600');
};

function getWinName() {
  var d = new Date();
  var n = d.getTime();
  var vWinName = 'AppWindow'+n;
  return vWinName;
};


function openWinMorrisJS(pDBID) {
  // pDBID="ovitrapmpi"
  openWinHTMLsize("timeseries.html",1000,600);
};

function changeJQueryPage(pPageID) {
  console.log("Change JQuery Page to PageID ["+pPageID+"] - openwin.js (needs to be updated due to depricated changePage");
  $.mobile.changePage(pPageID); //depricate in JQuery Mobile 1.4
  // $.mobile.pageContainer.pagecontainer("change", "#page")
}

function openSubmitWinHTML() {
  //detects the Geolocation and uses openSubmitLocationHTML() as callback
    retrieveLocation(openSubmitLocationHTML);
}

function openWinHTMLsize(pURL,pWidth,pHeight,pWinName) {
  var d = new Date();
  var n = d.getTime();
  var vWinName = pWinName || 'AppWindow'+n;
  window.open(pURL,vWinName, 'toolbar=no, menubar=no, scrollbars=yes, width='+pWidth+', height='+pHeight);
}
