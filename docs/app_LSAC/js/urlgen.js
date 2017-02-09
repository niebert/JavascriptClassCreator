function submitRecordHash(pHash) {
  console.log("submitRecordHash() has no implementation yet");
}


function setLoaderURL(pURL,pLoader){
	//alert("pURL="+pURL);
  var iFrameCounter = 0;
  iFrameCounter++;
  top.vLoaderURL = pURL;
  //<div id="iFrameContainer">
  //  <iframe id="iLoader" src="loader/setonline.html" width="90%" height="100" name="iLoader"></iframe>
  //</div>
  var s = document.createElement("iframe");
  s.width = "90%";
  s.heigth = "100";
  s.src = pURL;
  s.innerHTML = null;
  s.id = "iLoader";
  s.name = "iLoader"+iFrameCounter;
  document.getElementById("iFrameContainer").innerHTML = "";
  document.getElementById("iFrameContainer").appendChild(s);
  // Create a New iFrame with new Name uses the iFrameCounter
  // stores DIV Element in Container
  //document.getElementById('iLoader').contentWindow.document.location.href = "http://www.google.com";
  //document.getElementById('iLoader').src = "loader/setonline.html";
  //document.getElementById('iLoader').src="loader/callback.html?callbackurl="+encodeURLparam(pURL);
};

function createURL4Hash(pHash) {
  var vURL = getSubmitURLbasic("subscribeapp");
  var vCallBack = document.location.href;
  vURL+="&callbackurl="+encodeURLparam(vCallBack);
  vURL+=record2URLparam(pDBHash);
  return vURL;
}

function record2URLparam(pDBHash) {
  var vParam = "";
  pDBHash["email"] = vQueryHash["app_email"];
  for (var iID in pDBHash) {
    vParam += "&"+iID+"="+encodeURLparam(pDBHash[iID]);
  };
  return vParam;
}

function getSubmitURLbasic(pAction,pDatabase) {
  var vDB = pDatabase || vQueryHash["app_database"];
  var vAction = pAction || "subscribeappform";
  //var vQueryHash = readQueryParams();
  //var vURL = getValueDOM("save_submiturl");
  //var vDB  = getValueDOM("app_database");
  var vURL = vQueryHash["app_submiturl"];
  //alert("getSubmitURLbasic():openwin.js\nvURL:"+vURL+"\nvDB:"+vDB+"\nactio="+vAction);
  vURL+="?database="+vDB;
  vURL+=appendURIvalue("action",vAction);
  return vURL;
};
