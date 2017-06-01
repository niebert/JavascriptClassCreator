function getIndent(level) {
    var result = '',
        i = level * 4;
    if (level < 0) {
        throw "Level is below 0";
    };
    while (i--) {
        result += ' ';
    };
    return result;
}

function style_html(html) {
    html = html.trim();
    var result = '',
        indentLevel = 0,
        tokens = html.split(/</);
    for (var i = 0, l = tokens.length; i < l; i++) {
        var parts = tokens[i].split(/>/);
        if (parts.length === 2) {
            if (tokens[i][0] === '/') {
                indentLevel--;
            }
            result += getIndent(indentLevel);
            if (tokens[i][0] !== '/') {
                indentLevel++;
            }

            if (i > 0) {
                result += '<';
            }

            result += parts[0].trim() + ">\n";
            if (parts[1].trim() !== '') {
                result += getIndent(indentLevel) + parts[1].trim().replace(/\s+/g, ' ') + "\n";
            }

            if (parts[0].match(/^(img|hr|br)/)) {
                indentLevel--;
            }
        } else {
            result += getIndent(indentLevel) + parts[0] + "\n";
        }
    }
    return result;
}



function randomString4Chars(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

function randomString(length) {
	var vChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	return randomString4Chars(32,vChars);
};

function randomUsername(length) {
	var vMinLength = 6;
	var vLength = length || vMinLength;
	if (vLength < vMinLength) {
		vLength = vMinLength;
		console.log("randomUsername(length) length to short - set generated length to "+vMinLength);
	};
	var vChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var vCharNums = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var vUsername =  randomString4Chars(1,vChars);
	vUsername += randomString4Chars(vLength - 1,vChars);
	return vUsername;
};


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

function reduceIDName(pName) {
  if (isString(pName)) {
    if (pName != "") {
      pName = pName.replace(/[^A-Za-z0-9_]/g,"");
      pName = pName.toLowerCase();
	  }
  };
  return pName
};

function reduceFileName(pName) {
  if (isString(pName)) {
    if (pName != "") {
      pName = pName.replace(/[^A-Za-z0-9_\/\-:]/g,"");
	  }
  };
  return pName;
};
function filename2ID(pFile) {
  return reduceFileName(pFile)
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
	//console.log("encodeCR('"+pString+"')");
	if (typeof(pString) == "string") {
		if (pString != "") {
			pString = replaceString(pString,"\n","___CR___");
      pString = replaceString(pString,"|","___PIPE___");
		} else {
			//console.log("pString is empty - nothiung to do");
		};
	} else {
		console.log("encodeCR("+pString+") nothing to pString  is of type '"+typeof(pString)+"'");
	};
	//console.log("encodeCR('"+pString+"') OUTPUT");
	return pString
};

function createIndentDefault(pText,pIndent) {
	var vArr = pText.split("\n");
	var vLine = "";
	for (var i = 0; i < vArr.length; i++) {
		vLine = vArr[i];
		vLine = vLine.replace(/^\s+/,"");
		vArr[i] = vLine;
	};
	pText = vArr.join("\n");
	pText = createIndent(pText,pIndent);
	//console.log("createIndentDefault(pText,pIndent)\n"+pText);
	return pText;
};

function isString(pObj) {
  return (typeof(pObj) == "string");
};

function createIndent(pText,pIndent) {
	var vIndent = pIndent || "\t";
	if (pText) {
		return vIndent+replaceString(pText,"\n","\n"+vIndent);
	} else {
		console.log("ERROR: createIndent(pText,pIndent) - pText undefined");
		return "";
	}
}

function decodeCR(pString) {
	if (isString(pString)) {
		if (pString != "") {
      pString = replaceString(pString,"___CR___","\n");
      pString = replaceString(pString,"___PIPE___","|");
		};
		return pString
	} else {
		console.log("decodeCR("+pString+") nothing to pString  is of type '"+typeof(pString)+"'");
		return pString;
	}
};


function removeSpaces(pString) {
	if (isString(pString)) {
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

function getDirname4URL(pFilePath) {
  console.log("getDirname4URL('"+pFilePath+"')");
   vDirname = pFilePath.substr(0, pFilePath.lastIndexOf("/") - 1);
   if (vDirname.indexOf("//")>0) {
     vDirname = (vDirname.split("//"))[1];
   };
   return vDirname;
};

function getProtocol4URL(pFilePath) {
  console.log("getProtocol4URL('"+pFilePath+"')");
  var vProto = "";
   if (vFilePath.indexOf("://")>0) {
     vProto = (vDirname.split("://"))[0];
   };
   return vProto;
};

function getNameExt(pFilePath) {
  //console.log("getNameExt('"+pFilePath+"')");
  return getNameExt4URL(pFilePath);
};

function getNameExt4URL(pURL) {
  //this gets the full url
  var url = pURL || ""; //e.g. document.location.href;
  if (typeof(url) == "string") {
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
  };
  //return
  console.log("getNameExt4URL('"+pURL+"') return '"+url+"'");
  return url;
};

function checkFilenameDef(pID) {
  var vFilename = getValueDOM(pID);
  vFilename = vFilename.replace(/[^a-zA-Z\-\/0-9_]/g,"");
  return vFilename;
}

function getName4URL(pFilePath) {
  var vNameExt = getNameExt4URL(pFilePath);
  var vName = vNameExt;
  if (vNameExt.indexOf(".")>0) {
    vName = vName.substring(0,vNameExt.lastIndexOf("."))
  };
  console.log("getName4URL('"+pFilePath+"') return='"+vName+"'");
  return vName;
};
