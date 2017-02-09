//#################################################
//# String Library/URL_Object                     #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    17.03.2004,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public Licence                            #
//#################################################
//alert("loading JS-Libary: cstring.js");

//###################################################################
//################ Constructor of Class URLobject ###################
//###################################################################
//----includes CGI encoding ans decoding of a string-----------------

function URL_Object() {
	this.url  = "";
	this.url_relative  = "";
	this.path = "";
	this.vDomainPrefix = '';
	//------ Methods ----------------------------
	this.setURL				= m_setURL;
	this.getURL				= m_getURL;
	this.setPath			= m_setPath;
	this.getPath			= m_getPath;
	this.getName			= m_getName;
	this.getExtension		= m_getExtension;
	this.make_relative_path = make_relative_path;
	this.combinedPathURL	= combinedPathURL;
	this.removeParameters	= removeParameters;
	this.extractPath		= extractPath;
	this.extractName		= extractName;
	this.removeDomain		= removeDomain;
	this.extractDomain		= extractDomain;
	this.getDomain			= getDomain;
}

function deleteCharAt(pString,pIndex) {
    var vPreString  = "";
    var vPostString = "";
    if ((pIndex>=0) &&  (pIndex<pString.length)) {
        if (pIndex>0) {
            vPreString = pString.substring(0,pIndex);
        };
        if (pIndex<(pString.length-1)) {
            vPostString = pString.substring(pIndex+1,pString.length);
        };
    };
    return vPreString + vPostString;
}


//###################################################################
function m_setURL(pURL) {
	this.url_relativ = pURL;
	lvURL = pURL;
	if (lvURL!='') {   //  file: http: ftp: /c:/www
		if (((lvURL.indexOf(":")>=0) && (lvURL.indexOf(":")<5)) ||
		    ((lvURL.indexOf("|")>=0) && (lvURL.indexOf("|")<5)) ||
		    (lvURL.indexOf("avascript:")>=0) ){
			this.url = lvURL;
		} else if (lvURL.indexOf("/")==0) {
			var vBasicPath = extractPath(top.document.location.href);
			this.url = vBasicPath + lvURL;
			//alert("returnValue absolute="+this.url);
		} else {
			//--- avoid TWO SLASHES in this.path a lvURL e.g.  this.path=mypath/dir1/    lvURL=/subdir/file
			//--- makes   mypath/dir1//subdir/file with //
			if ((this.path.lastIndexOf("/") == (this.path.length-1)) && (pURL.indexOf("/") == 0)) {
				//alert("two slashes // found!");
				this.path = this.path.substring(0,this.path.length-1);
			} else if ((this.path.lastIndexOf("/") != (this.path.length-1)) && (pURL.indexOf("/") != 0)) {
			//--- avoid NO SLASHES in this.path a lvURL e.g.  this.path=mypath/dir2    lvURL=subdir/file
			//--- makes   mypath/dir2subdir/file with a folder "dir2subdir" that does not exist.
				this.path = this.path + "/";
			};
			this.url = this.path + lvURL
		};
		//alert("cstring.js:55 - m_setURL()="+returnValue);
		this.url = checkPath(this.url);
	} else {
		this.url = '';
	}
}

//###################################################################
function m_getURL() {
	return this.url;
}
//###################################################################
function m_setPath(pPath) {
	this.url=pURL;
}
//###################################################################
function m_getPath(pPath) {
	this.path=pPath;
	this.url_relative = this.make_relative_path(this.url,pPath);
}
//###################################################################
function m_getName(pURL) {
	this.url = pURL;
	return this.extractName(pURL);
}

//###################################################################


function combinedPathURL(pPath,pURL) {
//#########  if the URL "pURL" does not contain a ":" then path is added to "pURL" ####
//#########  this means, that "pURL" is a relative path ###############################
	//alert('cstring.js:47 - combinedPathURL() Path: '+pPath +'\n pURL: '+pURL);
	lvURL = pURL;
	if (lvURL!='') {   //  file: http: ftp: /c:/www
		if (((lvURL.indexOf(":")>=0) && (lvURL.indexOf(":")<5)) ||
		    ((lvURL.indexOf("|")>=0) && (lvURL.indexOf("|")<5)) ||
		    (lvURL.indexOf("avascript:")>=0) ){
			returnValue = lvURL;
		} else if (lvURL.indexOf("/")==0) {
			var vBasicPath = extractPath(top.document.location.href);
			returnValue = vBasicPath + lvURL;
			//alert("returnValue absolute="+returnValue);
		} else {
			//--- avoid TWO SLASHES in pPath a lvURL e.g.  pPath=mypath/dir1/    lvURL=/subdir/file
			//--- makes   mypath/dir1//subdir/file with //
			if ((pPath.lastIndexOf("/") == (pPath.length-1)) && (pURL.indexOf("/") == 0)) {
				//alert("two slashes // found!");
				pPath = pPath.substring(0,pPath.length-1);
			} else if ((pPath.lastIndexOf("/") != (pPath.length-1)) && (pURL.indexOf("/") != 0)) {
			//--- avoid NO SLASHES in pPath a lvURL e.g.  pPath=mypath/dir2    lvURL=subdir/file
			//--- makes   mypath/dir2subdir/file with a folder "dir2subdir" that does not exist.
				pPath = pPath + "/";
			};
			returnValue = pPath + lvURL
		};
		//alert("cstring.js:66 - combinedPathURL()="+returnValue);
		returnValue = checkPath(returnValue);
		//alert("cstring.js:68 - combinedPathURL()="+returnValue);
		return returnValue;
	} else {
		return '';
	}
}

function checkLowerCaseURL(pURL)
//######### convert a string to a lower case string e.g. "HaLLo wORLd" to "hello world"
{
	pURL = pURL.toLowerCase();
	return pURL;
}

function removeParameters(pURL)
//######### if the URL "pURL" contains a parameter, then the parameter after the "?"
//######### will be removed, e.g. "mypath/navigator.html?objectset=documentation/object_set.html"
//######### was converted into "mypath/navigator.html"
//######### IE 4.0 problem local variables are internally handle as global variables
//######### Problems appear, when calling two different functions recursive
{
        var vN = pURL.lastIndexOf("?");
        var lvURL = pURL;
        if (vN >= 0)
                lvURL = pURL.substring(0, vN);
	return lvURL;
}

function extractParameters(pURL)
//######### if the URL "pURL" contains a parameter, then the parameters after the "?"
//######### will be extracte, e.g. "mypath/navigator.html?objectset=documentation/object_set.html"
//######### will return into "?objectset=documentation/object_set.html"
//######### IE 4.0 problem local variables are internally handle as global variables
//######### Problems appear, when calling two different functions recursive
{
        var vN = pURL.lastIndexOf("?");
        var lvParameter = "";
        if (vN >= 0) {
                lvParameter = pURL.substring(vN,pURL.length);
        		//alert("lvParameter="+lvParameter);
        };
		return lvParameter;
}

function extractPath(pURL)
//###### "documentation/technischedoc/startnavigator.html?parameters..."
//###### "documentation/technischedoc/startnavigator.html"  remove parameters
//###### "documentation/technischedoc"                      extract path
{
	//###### pURL conatins a last symbol which is NOT the Slash "/"
        var vN=0;
        top.vDomainPrefix = '';
		var lvURL = removeParameters(pURL);
        vN = lvURL.lastIndexOf("/");
        if (vN >= 0)
                lvURL = lvURL.substring(0, vN);
        if (navigator.appName.indexOf("pera")>0) {
        	vN = lvURL.lastIndexOf("ile://localhost");
        	if (vN >= 0) {
                lvURL = lvURL.substring(16, lvURL.length);
                top.vDomainPrefix = "file://localhost";
        	};
        	vN = lvURL.lastIndexOf("ile://");
        	if (vN >= 0) {
            	    lvURL = lvURL.substring(7, lvURL.length);
                	top.vDomainPrefix = "file://";
        	}
        };
    //alert("cstring.js:116 - extractPath() = "+lvURL);
	return lvURL;
}

function extractName(pURL)
//###### "documentation/technischedoc/startnavigator.html?parameters..."
//###### "documentation/technischedoc/startnavigator.html"  remove parameters
//###### "documentation/technischedoc"                      extract path
{
	//###### pURL conatins a last symbol which is NOT the Slash "/"
        var vN=0;
        top.vDomainPrefix = '';
		var lvURL = removeParameters(pURL);
        vN = lvURL.lastIndexOf("/");
        if (vN >= 0) {
                pURL = lvURL.substring(vN+1,lvURL.length);
        };
        var vNameArray = pURL.split(".");
    //alert("string.js:224 - extractPath() = "+lvURL);
	return vNameArray[0];
}

function m_getExtension(pURL)
//###### "documentation/technischedoc/startnavigator.html?parameters..."
//###### "documentation/technischedoc/startnavigator.html"  remove parameters
//###### "documentation/technischedoc"                      extract path
{
	//###### pURL conatins a last symbol which is NOT the Slash "/"
        var vN=0;
        top.vDomainPrefix = '';
		var lvURL = removeParameters(pURL);
        vN = lvURL.lastIndexOf("/");
        if (vN >= 0) {
                pURL = lvURL.substring(vN+1,lvURL.length);
        };
        var vNameArray = pURL.split(".");
        var vExtension = "";
        if (vNameArray.length > 1) {
        	vExtension = vNameArray[vNameArray.length-1]
        }
    //alert("string.js:246 - extractExtension() = "+vExtension);
	return vExtension;
}


function extractDomainPrefix(pURL)
//###### "documentation/technischedoc/startnavigator.html?parameters..."
//###### "documentation/technischedoc/startnavigator.html"  remove parameters
//###### "documentation/technischedoc"                      extract path
{
	//###### pURL conatins a last symbol which is NOT the Slash "/"
        var vN=0;
        var lvDomainPrefix = '';
		var lvURL = removeParameters(pURL);
        vN = lvURL.lastIndexOf("/");
        if (vN >= 0)
                lvURL = lvURL.substring(0, vN);
        if (navigator.appName.indexOf("pera")>0) {
        	vN = lvURL.lastIndexOf("ile://localhost");
        	if (vN >= 0) {
                lvDomainPrefix = "file://localhost";
        	};
        	vN = lvURL.lastIndexOf("ile://");
        	if (vN >= 0) {
                lvDomainPrefix = "file://";
        	}
        };
    //alert("cstring.js:172 - extractDomainPrefix() = "+lvDomainPrefix);
	return lvDomainPrefix;
}

function removeDomain(pPath)
//###### "http://visum2.uni-muenster.de/documentation/startnavigator.html"  remove domain
//###### "documentation/startnavigator.html"
{
	// ------ pPath enthaelt als letztes zeichen NICHT den Slash "/" --------------
        var vN=0;
		vN = pPath.indexOf("://");
        if (vN >= 0) {
                pPath = pPath.substring(vN+3,pPath.length);
		vN = pPath.indexOf("/");
		if (vN >= 0) {
			pPath = pPath.substring(vN+1,pPath.length);
		} else {
			pPath = '';
		}
	}
	return pPath;
}
function extractDomain(pPath)
//###### "http://visum2.uni-muenster.de/documentation/startnavigator.html"  remove domain
//###### "http://visum2.uni-muenster.de/"
{
	// ------ pPath enthaelt als letztes zeichen NICHT den Slash "/" --------------
        var vN=0;
        var vDomain= '';
		vN = pPath.indexOf("://");
        if (vN >= 0) {
                vDomain = pPath.substring(0,vN+3);
                pPath = pPath.substring(vN+3,pPath.length);
				vN = pPath.indexOf("/");
				if (vN >= 0) {
					vDomain += pPath.substring(0,vN);
				}
		}
		return vDomain;
}

function getDomain(pPath) {
	// --extract Domain Without last Slash of "pPath"
	pPath = extractDomain(pPath);
	pPath = pPath.substring(0,pPath.length);

	return pPath;

}


function extractFilename(pPath)
//###### "http://visum2.uni-muenster.de/documentation/startnavigator.html"  remove filename
//###### "startnavigator.html"
{
	// ------ pPath enthaelt als letztes zeichen NICHT den Slash "/" --------------
        var vN=0;
		var lvPath=removeParameters(pPath);
        vN = lvPath.lastIndexOf("/");
        if (vN >= 0)
                lvPath = lvPath.substring(vN+1, lvPath.length);
	return lvPath;
}

function upPath(pPath)
//###### "documentation/technischedoc/startnavigator.html?parameters..."
//###### "documentation/technischedoc"  first call extract path
//###### "documentation"                second call extract path
//###### "documentation/"               append a slash
{
        pPath = extractPath(top.extractPath(pPath))+'/';
	return pPath;
}

function make_relative_path(pPath,pPathBasis)
//####### encode a string as a CGI parameter because some characters a not allowed in the URL
{
	//alert("pPath = "+pPath+"\npPathBasis = "+pPathBasis);
	//####### split pathnames by "/" and compare ####
	var aPath_split      =pPath.split('/');
	var aPathBasis_split =pPathBasis.split('/');
	var lengthP      = aPath_split.length;
	var lengthPBasis = aPathBasis_split.length;
	var joinedParts = 0;
	var finished    = 0;
	//#### check minimal length of /-separated path parts
    var vMin = lengthP;
	if (lengthPBasis < lengthP) {
		vMin = lengthPBasis;
	};
	//#### find the joined parts
	//#### /dir1/dir2/dir3/dir4/dir5/dir6      joinedParts=3
	//#### /dir1/dir2/dir3/my1/my2/my3
    for (var i=0; i<vMin; i++) {
		if (aPath_split[i] == aPathBasis_split[i]) {
			if (finished!=1) {
				joinedParts++;
			};
		} else {
			finished = 1;
		};
	};
	var relPath = '';
	//##### Number of joinedParts are ignored the others are represented by "../"
	for (var i=joinedParts; i<lengthPBasis; i++) {
		relPath += '../';
	};
	for (var i=joinedParts; i<lengthP; i++) {
		relPath += aPath_split[i]+'/';
	};
	//alert("Relative Path="+relPath);
	return relPath;
}


function checkPath(pPath)
//###### checkPath removes a ../ in the path "pPath" and correct the link
//###### "http://visum2.uni-muenster.de/documentation/didaktischedoc/../technischedoc/startnavigator.html"
//###### "http://visum2.uni-muenster.de/documentation/technischedoc/startnavigator.html"  after checkPath
{
	//alert('before checkPath(): \n'+pPath);
	var lvParameters = extractParameters(pPath);
	pPath=removeParameters(pPath);
	var vHelpString = '';
	// ------ wenn pPath .. enthaelt, wird "../" durch den upPath() ersetzt---------
    var vN = 0;
	vN = pPath.indexOf("..");
    while (vN >= 0)
	{
		firstPathPart = pPath.substring(0, vN);
		vHelpString = upPath(firstPathPart) + pPath.substring(vN+3,pPath.length);
		pPath = vHelpString;
	        vN = pPath.indexOf("..");
	};
	//alert('after checkPath(): \n'+pPath);
     if (navigator.appName.indexOf("pera")>0) {
        	vN = pPath.lastIndexOf("ile://localhost");
        	if (vN >= 0) {
                pPath = pPath.substring(16, pPath.length);
                top.vDomainPrefix = "file://localhost";
        	};
        	vN = pPath.lastIndexOf("ile://");
        	if (vN >= 0) {
            	    pPath = pPath.substring(7, pPath.length);
                	top.vDomainPrefix = "file://";
        	}
    };

	return pPath + lvParameters;
}

function checkAbsoluteURL(pURL)
//###### checkAbsoluteURL appends domain if pURL has leading  "/" in the path "pPath".
//###### "/documentation/technischedoc/startnavigator.html" will be changed to
//###### "http://visum2.uni-muenster.de/documentation/technischedoc/startnavigator.html"
{
	top.vHTDOCSpath = checkPath(extractPath(top.location.href)+"/..");
	top.vHTDOCSpath = top.vHTDOCSpath.substring(0,top.vHTDOCSpath.length-1);
	//alert('cstring.js:252  - checkAbsoluteURL()\n '+pURL+'\n vHTDOCSpath='+top.vHTDOCSpath);
	if (pURL.indexOf("/") == 0) {
		//pObjectURL = top.vBasicPath+"../"+pObjectURL;
		pURL = top.vHTDOCSpath+pURL;
	};
	return pURL;
}

function getAbsoluteNavigatorURL(pURL)
//###### checkAbsoluteURL appends domain if pURL has leading  "/" in the path "pPath".
//###### "/documentation/technischedoc/startnavigator.html" will be changed to
//###### "http://visum2.uni-muenster.de/documentation/technischedoc/startnavigator.html"
{
	top.vHTDOCSpath = checkPath(extractPath(top.location.href)+"/..");
	top.vHTDOCSpath = top.vHTDOCSpath.substring(0,top.vHTDOCSpath.length-1);
	//alert('cstring.js:314  - getAbsoluteNavigatorURL()\n '+pURL+'\n vHTDOCSpath='+top.vHTDOCSpath);
	if ((pURL.indexOf(top.vHTDOCSpath.toLowerCase()) == 0) || (pURL.indexOf(top.vHTDOCSpath) == 0)) {
		//pObjectURL = top.vBasicPath+"../"+pObjectURL;
		pURL = pURL.substring(top.vHTDOCSpath.length,pURL.length);
	};
	//alert("cstring.js:319 - getAbsoluteNavigatorURL() \npURL="+pURL);
	return pURL;
}


function replaceString(pString,pSearch,pReplace)
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//alert("cstring.js - replaceString() "+pString);
	if (!pString) {
		alert("replaceString()-Call - pString not defined!");
	} else if (pString != '') {
    {
  	//alert("cstring.js - replaceString() "+pString);
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
  }

};

function XreplaceString(pString,pSearch,pReplace)
//###### replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	var returnString = '';
	//alert("S="+pSearch+" R="+pReplace);
    eval("returnString = pString.replace(/"+pSearch+"/,\'"+pReplace+"\');");
	return returnString;
}

function convertToMetaString(pString)
{
	pString = replaceString(pString,'"','\\\"');
	pString = replaceString(pString,'\'','\\\'');
	// convert " to \" which is in characters \\ + \'
	return pString;
}

function unescapeURLparameter(pString)
{
	pString = unescape(pString);
	pString = replaceString(pString,'"','');
	pString = replaceString(pString,"'","");
	// remove all " and '
	return pString;
}

function convertToHTML(pString)
{
	pString = replaceString(pString,'?','&auml;');
	pString = replaceString(pString,'?','&ouml;');
	pString = replaceString(pString,'?','&uuml;');
	pString = replaceString(pString,'?','&Auml;');
	pString = replaceString(pString,'?','&Ouml;');
	pString = replaceString(pString,'?','&Uuml;');
	pString = replaceString(pString,'?','&szlig;');
	pString = replaceString(pString,'\n','<br>');
	// pString = convertDOSToHTML(pString);
        // !!! this DOS-HTML-conversion returns an s to ? converted
	// !!! string, so DOS-HTML-conversion is disabled
	return pString
}

function encodeCGIparam(pParamString)
//####### encode a string as a CGI parameter because some characters a not allowed in the URL
{
	//var lvName = "&";
	// "." = "%3A"
    //alert("charCodeAt(0)="+lvName.charCodeAt(0));
    //alert("cstring.js - encodeCGIparam()\n pParamString="+pParamString+" \nCharcode(1)="+pParamString.charCodeAt(1));
    if (pParamString != '') {
    	var lvESCstring = escape(pParamString);
    	//alert(lvESCstring);
    	lvESCstring = replaceString(lvESCstring,'?','%3F');
    	lvESCstring = replaceString(lvESCstring,'&','%26');
    	lvESCstring = replaceString(lvESCstring,'=','%3D');
    	//alert(lvESCstring);
		return replaceString(lvESCstring,'/','%2F');
	} else {
		return "";
	};
}

//var vTest="???????";
//alert (vTest + "=" + encodeCGIparam(vTest));

function convert2HEXCode(pCharCode) {
			mod16 = pCharCode % 16;
			div16 = (pCharCode-mod16) / 16;
			// 55='0'   64='9'   65='A'
			if (mod16<10) {
				mod16=mod16+48;
			} else {
				mod16=mod16+55;
			};
			if (div16<10) {
				div16=div16+48;
			} else {
				div16=div16+55;
			};
			pReplace = String.fromCharCode(37,div16,mod16);
}

function XencodeCGIparam(pString)
//####### encode a string as a CGI parameter because some characters a not allowed in the URL
{
	//alert('before encodeCGIparam(): \n'+pString);
	var vN = pString.length-1;
        while (vN >= 0)
	{
   		cc = pString.charCodeAt(vN);
		if ((cc >= 128) || (cc == 37) ||  (cc == 38)) {
			mod16 = cc % 16;
			div16 = (cc-mod16) / 16;
			// 55='0'   64='9'   65='A'
			if (mod16<10) {
				mod16=mod16+48;
			} else {
				mod16=mod16+55;
			};
			if (div16<10) {
				div16=div16+48;
			} else {
				div16=div16+55;
			};
			pReplace = String.fromCharCode(37,div16,mod16);
			firstPart='';
			secondPart='';
                	firstPart=pString.substring(0, vN);
	                if (vN + 1 < pString.length)  {
				secondPart=pString.substring(vN+1, pString.length);
			}
			pString = firstPart + pReplace + secondPart;
		} else {
			if (pString.charAt(vN)==' ') {
				firstPart=pString.substring(0,vN);
				secondPart='';
                		pReplace='+';
				if (vN + 1 < pString.length)  {
				  	secondPart=pString.substring(vN+1, pString.length);
				};
				pString = firstPart + pReplace + secondPart;
			};

		};
		vN--;
	}; // While
	//alert('after encodeCGIparam(): \n'+pString);
	return pString;
}

//myVar = encodeCGIparam('Hall?chen & und % proz z');

//---------------------------------------------------------------
// CGI-URL-Parameter Conversion
//---------------------------------------------------------------
function decodeCGIparam(pParamString)
//####### encode a string as a CGI parameter because some characters a not allowed in the URL
{
	//var lvName = "&";
	// "." = "%3A"
    //alert("charCodeAt(0)="+lvName.charCodeAt(0));
    //alert("cstring.js - encodeCGIparam()\n pParamString="+pParamString+" \nCharcode(1)="+pParamString.charCodeAt(1));
    if (pParamString != '') {
    	var lvESCstring = unescape(pParamString);
    	//alert(lvESCstring);
    	//lvESCstring = replaceString(lvESCstring,'&','%26');
    	//alert(lvESCstring);
		return lvESCstring;
	} else {
		return "";
	};
}

function XdecodeCGIparam(pString)
//####### decode a string in a CGI parameter because some characters a not allowed in the URL
{
	//pString = unescapeURLparameter(pString);
	//alert('before decodeCGIparam(): \n\"'+pString+'\"');
	var vN = 0;
        while (vN < pString.length)
	{
       		//cc = pString.charCodeAt(vN);
		vC = pString.charAt(vN);
		//if ((cc >= 128) || (cc == 37) ||  (cc == 38)) {
		if ((vC == '%') && (vN < pString.length-2)) {
		// Character is hexal encoded, i.e. ?=%F6
			//mod16 = cc % 16;
			mod16 = pString.charCodeAt(vN+2);
			div16 = pString.charCodeAt(vN+1);
			// 48='0'   57='9'   65='A' 66='B'
			if (mod16<58) {
				mod16=mod16-48;
			} else {
				mod16=mod16-55;
			};
			if (div16<58) {
				div16=div16-48;
			} else {
				div16=div16-55;
			};
			pReplace = String.fromCharCode(16*div16+mod16);
			firstPart='';
			secondPart='';
                	firstPart=pString.substring(0, vN);
	                if (vN + 3 < pString.length)  {
				secondPart=pString.substring(vN+3, pString.length);
			}
			pString = firstPart + pReplace + secondPart;
		} else {
			if (pString.charAt(vN)=='+') {
				firstPart=pString.substring(0,vN);
				secondPart='';
                		pReplace=' ';
				if (vN + 1 < pString.length)  {
				  	secondPart=pString.substring(vN+1, pString.length);
				};
				pString = firstPart + pReplace + secondPart;
			};

		};
		vN++;
	}; // While
	//alert('after decodeCGIparam(): \n\"'+pString+'\"');
	return pString;
}
//---------------------------------------------------------------
//var lvTest ='http%3A';
//alert("before decode="+lvTest);
//lvTest = decodeCGIparam(lvTest);
//alert("after decode="+lvTest);


function convertDOSToHTML(pString)
{
   // DOS-texts have a different encoding of german Umlaute,
   // so if you see blocks instead of german letters, the
   // problem is caused by the different code tables.
        pString = replaceString(pString,'?','&auml;');
        pString = replaceString(pString,'?','&ouml;');
        pString = replaceString(pString,'?','&uuml;');
        pString = replaceString(pString,'?','&Auml;');
        pString = replaceString(pString,'?','&Ouml;');
        pString = replaceString(pString,'?','&Uuml;');
        pString = replaceString(pString,'?','&szlig;');
	return pString
}


function convertToDos(pvString)
{
	return convertHTMLtoDOS(pvString);
}

function convertHTMLtoDOS(pString)
{
   // DOS-texts have a different encoding of german Umlaute,
   // so if you see blocks instead of german letters, the
   // problem is caused by the different code tables.
        pString = replaceString(pString,'&auml;','?');
        pString = replaceString(pString,'&ouml;','?');
        pString = replaceString(pString,'&uuml;','?');
        pString = replaceString(pString,'&Auml;','?');
        pString = replaceString(pString,'&Ouml;','?');
        pString = replaceString(pString,'&Uuml;','?');
        pString = replaceString(pString,'&szlig;','?');
	return pString
}

function convertHTMLtoUTF8(pString)
{
   // DOS-texts have a different encoding of german Umlaute,
   // so if you see blocks instead of german letters, the
   // problem is caused by the different code tables.
        pString = replaceString(pString,'&auml;','?');
        pString = replaceString(pString,'&ouml;','?');
        pString = replaceString(pString,'&uuml;','?');
        pString = replaceString(pString,'&Auml;','?');
        pString = replaceString(pString,'&Ouml;','?');
        pString = replaceString(pString,'&Uuml;','?');
        pString = replaceString(pString,'&szlig;','?');
	return pString
}


function normalizeSearchWords4DOS(pString)
{
   // DOS-texts have a different encoding of german Umlaute,
   // so if you see blocks instead of german letters, the
   // problem is caused by the different code tables.
        pString = convertHTMLtoDOS(pString);
        pString = pString.toLowerCase();
        pString = replaceString(pString,'?','ae');
        pString = replaceString(pString,'?','oe');
        pString = replaceString(pString,'?','ue');
        pString = replaceString(pString,'?','ae');
        pString = replaceString(pString,'?','oe');
        pString = replaceString(pString,'?','ue');
        pString = replaceString(pString,'?','ss');
        pString = pString.replace(/[ ]+/," ");
		pString = pString.replace(/[^a-z0-9 ]/,"");
		//alert("normalized Search Words="+pString);
		return pString
}

function normalizeSearchWords(pString)
{
   // DOS-texts have a different encoding of german Umlaute,
   // so if you see blocks instead of german letters, the
   // problem is caused by the different code tables.
        pString = convertHTMLtoDOS(pString);
        pString = pString.toLowerCase();
        pString = replaceString(pString,'?','ae');
        pString = replaceString(pString,'?','oe');
        pString = replaceString(pString,'?','ue');
        pString = replaceString(pString,'?','ae');
        pString = replaceString(pString,'?','oe');
        pString = replaceString(pString,'?','ue');
        pString = replaceString(pString,'?','ss');
        pString = pString.replace(/[ ]+/," ");
		pString = pString.replace(/[^a-z0-9 ]/,"");
		//alert("normalized Search Words="+pString);
		return pString
}
