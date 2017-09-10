//#################################################################
//# Javascript Class: LinkParam()
//#       SuperClass:
//#   Class Filename: linkparam.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created
//# last modifications    4.5.2017
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Generator by Engelbert Niehaus
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/linkparam.js"
//---------------------------------------------------------------------
//---Constructor of Class LinkParam()
// Call the constructor for creating an instance of class LinkParam
// by the following command in HTML-file that imports this class
// var vMyInstance = new LinkParam();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of LinkParam, use
// the attribute name with a leading "this." in the definition of method of LinkParam, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'LinkParam'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'LinkParam' will be set by
// use the method's name and extend it with '_LinkParam'.
//    _LinkParam.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function LinkParam () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "LinkParam()"
    //---------------------------------------------------------------------
      //---size: Counts the Number of Parameter
      this.size = 0;
      //---aVars: Attribute: 'aVars' Type: 'Hash' stores all URL parameters
      this.aVars = {};
      //---aLink: Attribute: 'aLink' Type: 'String' stores the Link before '?'
      this.aLink = "";

    //---------------------------------------------------------------------
    //---END Constructor of Class "LinkParam()"
    //---------------------------------------------------------------------
}


//---------------------------------------------------------------------
//---Methods of Class "LinkParam()" defined as JS functions
//---------------------------------------------------------------------

//#################################################################
//# Method: init()
//#    used in Class: LinkParam
//# Parameter:
//#    pDoc:Document
//# Comment:
//#    init extract the link with parameters from document.location.search and store aLink
//#
//# created
//# last modifications
//#################################################################

LinkParam.prototype.init = function (pDoc) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: init(pDoc:Document)")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.init(pDoc);
  //-------------------------------------------------------

	//save "document" object in aDoc as Attribute for further use
	this.aDoc = pDoc;
	this.aLink = pDoc.location;
	this.aVars = this.parseURL(pDoc.location.search);
};
//----End of Method init Definition


//#################################################################
//# Method: parseURL()
//#    used in Class: LinkParam
//# Parameter:
//#    pLink:String
//# Comment:
//#    parses the URL stores the variables in 'aVar' e.g. ..&lastname=Niehaus&... stores aVars['name']='Niehaus'
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.parseURL = function (pLink) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: parseURL(pLink:String):String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.parseURL(pLink);
  //-------------------------------------------------------
  console.log("LinkParam.parseURL('..."+pLink+"')");
	var vLink = pLink || "";
	var params = {},
	    tokens,
	    re = /[?&]?([^=]+)=([^&]*)/g;
	if (vLink != "") {
	  vLink = vLink.split('+').join(' ');
	  while (tokens = re.exec(vLink)) {
	     params[decodeURIComponent(tokens[1])] = decodeURIComponent(this.decodeParam(tokens[2]));
	     this.calcSize();
	  };
	} else {
	    console.log("parseURL(pLink) - pLink contains no parameters")
	};
	return params;

};
//----End of Method parseURL Definition


//#################################################################
//# Method: getURL()
//#    used in Class: LinkParam
//# Parameter:
//#    pVarHash:Hash
//# Comment:
//#    Comment for getLink
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.getURL = function (pVarHash) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: getURL(pVarHash:Hash):String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.getURL(pVarHash);
  //-------------------------------------------------------

	var vParam = "";
	if (pVars) {
	    vParam = getParam4URL(pVars);
	} else {
	    vParam = getParam4URL();
	};
	return this.getLink4URL() + vParam;

};
//----End of Method getURL Definition


//#################################################################
//# Method: setValue()
//#    used in Class: LinkParam
//# Parameter:
//#    pVar:String
//#    pValue:String
//# Comment:
//#    sets the value of a link parameter, this is useful
//#    when a parameter for URL are generated from the link parameters
//#    defined in LinkParam
//# created
//# last modifications
//#################################################################

LinkParam.prototype.setValue = function (pVar,pValue) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: setValue(pVar:String,pValue:String)")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.setValue(pVar,pValue);
  //-------------------------------------------------------
    this.aVars[pVar] = pValue;
	  this.calcSize();
};
//----End of Method setValue Definition


//#################################################################
//# Method: getValue()
//#    used in Class: LinkParam
//# Parameter:
//#    pVar:String
//# Comment:
//#    Comment for getValue(pVar) return the definition of the parameter exists otherwise en empty string
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.getValue = function (pVar) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: getValue(pVar:String):String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.getValue(pVar);
  //-------------------------------------------------------

	var vRet = "";
	if (this.aVars.hasOwnProperty(pVar)) {
	    vRet = this.aVars[pVar]
	} else {
	    console.log("ERROR: variable '"+pVar+"' does not exist in LinkParam");
	};
	return vRet;

};
//----End of Method getValue Definition


//#################################################################
//# Method: deleteValue()
//#    used in Class: LinkParam
//# Parameter:
//#    pVar:String
//# Comment:
//#    Comment for deleteValue in the parameter hash aVars
//#    return a Boolean if delete was sucessful, resp. variable pVar exists in Hash aVars
//#
//# created
//# last modifications
//#################################################################

LinkParam.prototype.deleteValue = function (pVar) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: deleteValue(pVar:String)")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.deleteValue(pVar);
  //-------------------------------------------------------

	var vRet = false;
	if (this.aVars.hasOwnProperty(pVar)) {
	    delete this.aVars[pVar];
	    vRet = true;
	    this.calcSize();
	};
	return vRet;

};
//----End of Method deleteValue Definition


//#################################################################
//# Method: getLink4URL()
//#    used in Class: LinkParam
//# Parameter:
//#
//# Comment:
//#    get the Link part of the URL without the URL parameters
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.getLink4URL = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: getLink4URL():String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.getLink4URL();
  //-------------------------------------------------------

	return this.aLink;

};
//----End of Method getLink4URL Definition


//#################################################################
//# Method: getParam4URL()
//#    used in Class: LinkParam
//# Parameter:
//#
//# Comment:
//#    get the parameter string for the URL starting with ? if aVars contains variables
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.getParam4URL = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: getParam4URL():String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.getParam4URL();
  //-------------------------------------------------------

	  var vHash = this.aVars || {};
	  var vOut = "";
	  var vSep = "?";
	  for (var iID in vHash) {
	    if (vHash.hasOwnProperty(iID)) {
        vOut += vSep + this.encodeParam(iID) + "=" + this.encodeParam(vHash[iID]);
	      vSep = "&";
	    };
	  };
	  return vOut;

};
//----End of Method getParam4URL Definition


//#################################################################
//# Method: decodeParam()
//#    used in Class: LinkParam
//# Parameter:
//#    pParam:String
//# Comment:
//#    decode a parameter from the URL
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.decodeParam = function (pParam) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: decodeParam(pParam:String):String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.decodeParam(pParam);
  //-------------------------------------------------------

	pParam = pParam.replace(/\+/g,  " ");
	pParam = decodeURIComponent(pParam);
	return pParam;

};
//----End of Method decodeParam Definition


//#################################################################
//# Method: encodeParam()
//#    used in Class: LinkParam
//# Parameter:
//#    pParam:String
//# Comment:
//#    encode a parameter for a call from the app.
//#
//# created
//# last modifications
//#################################################################

LinkParam.prototype.encodeParam = function (pParam) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: encodeParam(pParam:String)")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.encodeParam(pParam);
  //-------------------------------------------------------

	var vParam = encodeURIComponent(pParam);
	vParam = vParam.replace(/'/g,"%27").replace(/"/g,"%22");
	return vParam;

};
//----End of Method encodeParam Definition


//#################################################################
//# Method: getTableHTML()
//#    used in Class: LinkParam
//# Parameter:
//#
//# Comment:
//#    creates a HTML table with two column for key and value of the parameter hash aVars
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.getTableHTML = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: getTableHTML():String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.getTableHTML();
  //-------------------------------------------------------

	var vOut = "";
	var vHash = this.aVars;
	vOut += "<table border=1>";
	var vWrapCode = true;
	for (var iID in vHash) {
	    if (vHash.hasOwnProperty(iID)) {
	      vOut += "<tr>";
	      vOut += "<td>";
	      vOut += "<b>"+iID+"</b>";
	      vOut += "</td>";
	      vOut += "<td>";
	      // second parameter vWrapCode = true for non textarea use;
	      vOut += this.encodeHTML(vHash[iID],vWrapCode);
	      vOut += "</td>";
	      vOut += "</tr>";
	    };
	};
	vOut += "</table>";
	return vOut;

};
//----End of Method getTableHTML Definition


//#################################################################
//# Method: getEditTableHTML()
//#    used in Class: LinkParam
//# Parameter:
//#    pPrefixID:String
//# Comment:
//#    creates a Edit HTML table with two column for key and value of the parameter hash aVars.
//#    The keys of aVars are used as IDs for the HTML form.
//#    An optional ID prefix as parameter can be used to create a unique ID for the DOM elements
//#    All parameters are visible in an input field.
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.getEditTableHTML = function (pPrefixID) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: getEditTableHTML(pPrefixID:String):String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.getEditTableHTML(pPrefixID);
  //-------------------------------------------------------

	var vPrefixID = pPredixID || "";
	var vOut = "";
	var vHash = this.aVars;
	vOut += "<table border=1>";
	var vRows = 1;
	var vContent = "";
	var vMaxRows = 10;
	var vWrapCode = false;
	for (var iID in vHash) {
	    if (vHash.hasOwnProperty(iID)) {
	      vContent = this.encodeHTML(vHash[iID],vWrapCode);
	      vRows = (vHash[iID].split("\n")).length;
	      if (vRows > vMaxRows) {
	          vRows = vMaxRows;
	      };
	      vOut += "<tr>";
	      vOut += "<td>";
	      vOut += "<b>"+iID+"</b>";
	      vOut += "</td>";
	      vOut += "<td>";
	      // second parameter vWrapCode = true for non textarea use;
	      vOut += "<textarea id='"+vPrefix+iID+"'' cols='90' rows='"+vRows+"''>";
	      vOut += vContent;
	      vOut += "</textarea>";
	      vOut += "</td>";
	      vOut += "</tr>";
	    };
	};
	vOut += "</table>";
	return vOut;

};
//----End of Method getEditTableHTML Definition


//#################################################################
//# Method: calcSize()
//#    used in Class: LinkParam
//# Parameter:
//#
//# Comment:
//#    calculates the number of variables defined in the URL parameters, stores result in length
//#
//# created
//# last modifications
//#################################################################

LinkParam.prototype.calcSize = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: calcSize()")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.calcSize();
  //-------------------------------------------------------

	var vRet = 0;
	if (this.aVars) {
    for (var iID in this.aVars) {
      if (this.aVars.hasOwnProperty(iID)) {
        vRet++;
      }
    };
	} else {
	    console.log("ERROR: variable '"+pVar+"' does not exist in LinkParam");
	};
	return vRet;

};
//----End of Method calcSize Definition


//#################################################################
//# Method: encodeHTML()
//#    used in Class: LinkParam
//# Parameter:
//#    pValue:String
//#    pWrapCode:Boolean
//# Comment:
//#    Encodes source code for HTML-Output in as code or textarea in the following way:
//#     1) Replace "&" character with "&amp;"
//#     2) Replace "<" character with "&lt;"
//#     3) Replace ">" character with "&gt;"
//#    The converted pValue will wrapped with <pre> and <code> tags for direct display as HTML
//#    and without code tag wrapper if the code is written as inner HTML and value to a textarea.
//# Return: String
//# created
//# last modifications
//#################################################################

LinkParam.prototype.encodeHTML = function (pValue,pWrapCode) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: encodeHTML(pValue:String,pWrapCode:Boolean):String")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.encodeHTML(pValue,pWrapCode);
  //-------------------------------------------------------

	var vValue = pValue || "";
	if (vValue != "") {
	    vValue = vValue.replace(/</g,"&lt;");
	    vValue = vValue.replace(/>/g,"&gt;");
	    vValue = vValue.replace(/&/g,"&amp;");
	};
	if (pWrapCode && (pWrapCode == true)) {
	    vValue = "<pre><code>"+vValue+"</code></pre>";
	};
	return vValue

};
//----End of Method encodeHTML Definition


//#################################################################
//# Method: exists()
//#    used in Class: LinkParam
//# Parameter:
//#    pVar:String
//# Comment:
//#    checks if the parameter with variable 'pVar' exists in parameter hash this.aVars
//# Return: Boolean
//# created
//# last modifications
//#################################################################

LinkParam.prototype.exists = function (pVar) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("linkparam.js - Call: exists(pVar:String):Boolean")
  //----Create Object/Instance of LinkParam----
  //    var vMyInstance = new LinkParam();
  //    vMyInstance.exists(pVar);
  //-------------------------------------------------------

	var vRet = false;
	if (pVar) {
	   vRet = this.aVars.hasOwnProperty(pVar)
	};
	return vRet;

};
//----End of Method exists Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: LinkParam
//-------------------------------------------
