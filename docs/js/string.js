
function replaceStringReverse(pString,pReplace,pSearch)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	return replaceString(pString,pSearch,pReplace);
}

function replaceString(pString,pSearch,pReplace)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//alert("cstring.js - replaceString() "+pString);
	if (pString != '') {
		var vHelpString = '';
        var vN = pString.indexOf(pSearch);
		var vReturnString = '';
		while (vN >= 0)
		{
			if (vN > 0)
				vReturnString += pString.substring(0, vN);
			vReturnString += pReplace;
            if (vN + pSearch.length < pString.length) {
				pString = pString.substring(vN+pSearch.length, pString.length);
			} else {
				pString = ''
			}
			vN = pString.indexOf(pSearch);
		};
	};
	return vReturnString + pString;
};

function reduceVarName(pName) {
  // remove all characters exept "_", A-Z, a-z and digits 0-9
  return pName.replace(/[^A-Za-z0-9_]/g,"");
};

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
