function sortStringLines(pString) {
	var vStringArr = pString.split("\n");
	vStringArr.sort();
	return vStringArr.join("\n");
}

function firstUpperCase(pString) {
    return pString.charAt(0).toUpperCase() + pString.slice(1);
}

function replaceStringReverse(pString,pReplace,pSearch)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	return replaceString(pString,pSearch,pReplace);
}

function replaceString(pString,pSearch,pReplace)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//console.log("string.js - replaceString() "+typeof(pString));
	var vString = pString || "";
	var vSearch = pSearch || "";
	var vReturnString = '';
	if (typeof(pString) != "string") {
		pString = "";
	} else if (vSearch == "") {
		console.log("replaceString(pString,pSearch,pReplace) pSearch undefined");
	} else if (vString != '') {
		pString = vString;
		var vHelpString = '';
    var vN = vString.indexOf(pSearch);
		while (vN >= 0) {
			if (vN > 0)
				vReturnString += pString.substring(0, vN);
				vReturnString += pReplace;
        if (vN + pSearch.length < pString.length) {
					pString = pString.substring(vN+pSearch.length, pString.length);
				} else {
					pString = ''
				};
				vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
};

function reduceVarName(pName) {
  // remove all characters exept "_", A-Z, a-z and digits 0-9
	var vName = "";
	if (pName) {
		var vPos = pName.indexOf("=");
		if (vPos >= 0) {
			pName = pName.substring(0,vPos);
		};
		if (pName) {
			vName = pName.replace(/[^A-Za-z0-9_]/g,"");
		} else {
			//console.log("reduceVarName(pName)='' or undefined");
		};
	} else {
		//console.log("reduceVarName(pName) pName was undefined or empty");
	};
  return vName;
};

function encodeHashCR(pHash) {
  if (pHash) {
    for (var iID in pHash) {
      if (pHash.hasOwnProperty(iID)) {
        pHash[iID] = encodeCR(pHash[iID]);
      };
    }
  };
};

function encodeNewHashCR(pHash) {
  var vRetHash = {};
  if (pHash) {
    for (var iID in pHash) {
      if (pHash.hasOwnProperty(iID)) {
        vRetHash[iID] = encodeCR(pHash[iID]);
      };
    }
  };
  return vRetHash;
};

function removeExtension4File(pFilename) {
	var vFilename = pFilename || "";
	if (vFilename != "") {
		vFilename = vFilename.replace(/\.[^/.]+$/, "");
	};
	return vFilename
}

function decodeHashCR(pHash) {
  var vRetHash = {};
  if (pHash) {
    for (var iID in pHash) {
      if (pHash.hasOwnProperty(iID)) {
        vRetHash[iID] = decodeCR(pHash[iID]);
      };
    }
  };
  return vRetHash;
};

function encodeCR(pString) {
	if (pString) {
		if (pString != "") {
			pString = replaceString(pString,"\n","\\n");
		};
	} else {
		console.log("encodeCR(pString) pString undefined");
		pString = "UnDefEncodeCR";
	}
	return pString
};

function decodeCR(pString) {
	if (pString) {
		if (pString != "") {
			pString = replaceString(pString,"\\n","\n");
		};
		return pString
	} else {
		console.log("decodeCR(pString) pString undefined");
		return "";
	}
};


function removeSpaces(pString) {
	if (pString) {
		if (pString != "") {
			pString = pString.replace(/\s/g,"");
		};
		return pString
	} else {
		console.log("removeSpaces(pString) pString undefined");
		return "";
	}
}

function encodeURL(pURL) {
  return encodeURI(pURL);
};

function decodeURL(pURL) {
  return decodeURI(pURL);
};

function encodeURLparam(pURLparam) {
  // var myURLparam = "(Dr. Jekyll & Mr. Hide)"; // Encode because "&" is URL param separator
  // var myOtherUrl =  "http://example.com/index.html?movietitle=" + encodeURLparam(myURLparam);
  return encodeURIComponent(pURLparam);
};

function decodeURLparam(pURLparam) {
  return decodeURIComponent(pURLparam);
};
