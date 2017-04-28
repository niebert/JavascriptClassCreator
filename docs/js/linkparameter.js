function onLoadApp() {
  readQueryParams();
  //setOnlineMode(vOnlineMode);
};

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(decodeURLparam(tokens[2]));
    }

    return params;
}

function readQueryParams() {
   //alert(document.location.search);
   // mypage.html?id1=text1&lastname=Niehaus&firstname=Bert
   // var vQueryHash = readQueryParams(); creates a hash which contains the parameter content
   // vQueryHash["id1"] = "text1"
   // vQueryHash["lastname"] = "Niehaus"
   // vQueryHash["firstname"] = "Bert"
   console.log("readQueryParams(): Return a QueryHash for the link parameter");
   return getQueryParams(document.location.search);
 };

function convertHash2LinkParameter(pHash) {
  var vOut = "";
  var vSep = "";
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
      vOut = vSep + encodeURLparam(iID) + "=" + encodeURLparam(pHash[iID]);
      vSep = "&";
    };
  };
  return vOut;
}

function convertHash2Table(pHash) {
  var vOut = "";
  vOut += "<table border=1>";
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
      vOut += "<tr>";
      vOut += "<td>";
      vOut += "<b>"+iID+"</b>";
      vOut += "</td>";
      vOut += "<td>";
      vOut += pHash[iID];
      vOut += "</td>";
      vOut += "</tr>";
    };
  }
  vOut += "</table>";
  return vOut;
};

function encodeURLparam(pParam) {
	return encodeURIComponent(pParam).replace(/'/g,"%27").replace(/"/g,"%22");
};

function decodeURLparam(pParam) {
	return decodeURIComponent(pParam.replace(/\+/g,  " "));
};
