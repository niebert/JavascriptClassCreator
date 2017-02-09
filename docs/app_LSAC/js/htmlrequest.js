function onLoadApp() {
  readWriteQueryParams();
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
   return getQueryParams(document.location.search);
 };

function readWriteQueryParams() {
    //reads the Query Parameters of URL and write the Variables to the form elements of HTML page
    var vQuery = getQueryParams(document.location.search);
    var vNode = null;
    for (var vKey in vQuery) {
      vNode = document.getElementById(vKey);
      if (vNode) {
        vNode.value = vQuery[vKey];
        //alert("Key:"+vKey+"=\""+vQuery[vKey]+"\"\nhtmlrequest.js:24 - readWriteQueryParams()");
      } else {
        alert("Key:"+vKey+" not found!\nhtmlrequest.js:24 - readWriteQueryParams()");
      };
    };
    updateQuery2DOM(vQuery); // defined in setting.js
}

function X_encodeURLparam(pParam) {
  return pParam.replace(/&/g," ");
}

function encodeURLparam(pParam) {
	return encodeURIComponent(pParam).replace(/'/g,"%27").replace(/"/g,"%22");
};

function decodeURLparam(pParam) {
	return decodeURIComponent(pParam.replace(/\+/g,  " "));
};
