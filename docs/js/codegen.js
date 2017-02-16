
function createProjectJSON() {
  //hide("bSaveJSON");
  createCode4JSON_JS(vJSON_JS);
}

function createCode4JSON_JS(pJSONDB) {
  if (pJSONDB) {
    console.log("Create JSON Code from vJSON_JS");
    write2editor("JSONDB",getCode4JSON_JS(pJSONDB));
    //document.fCreator.tJSONDB.value = getCode4JSON_JS(pJSONDB);
  } else {
    console.log("createCode4JSON_JS()-Call Error pJSONDB undefined");
  }
}

function getCode4JSON_JS(pJSONDB) {
  return JSON.stringify(pJSONDB, null, 4);
};

function exportHTML() {
  var vFile = getValueDOM("sFileHTML");
  switch (vFile) {
    case "index.html":
      exportIndexHTML();
      break;
    case "app.html":
      exportMainHTML();
      break;
    default:
      exportMainHTML();
  };
}

function exportIndexHTML() {
  var vHTML = readFile("tpl/index.html");
  write2editor("MainHTML",vHTML);
}


function exportMainHTML() {
  var vHTML = getMainHTML();
  //write2value("tMainHTML",vHTML);
  write2editor("MainHTML",vHTML);
};

function getMainHTML() {
    var vHTML   = getValueDOM("tTplHTML");
    // insert Library Import or Library SCRIPT-Tags with Code
    vHTML = replaceString(vHTML,"___LIBRARIES___",getDatabasesHTML()+"\n"+getLibrariesHTML());
    // Insert Generated Pages
    vHTML = replaceString(vHTML,"___PAGES___",getPagesHTML()+"\n");
    return vHTML;
}

function getLibrariesHTML() {
  var vOut = "";
  vOut += getGlobalLibrariesHTML()+"\n";
  vOut += getClassLibrariesHTML();
  return vOut;
}

function getGlobalLibrariesHTML() {
  var vSCRIPT = getValueDOM("tTplSCRIPT");
  var vArrJS = getGlobalLibArray();
  var vOut = "      <!-- JavaScript Libraries -->\n";
  for (var i = 0; i < vArrJS.length; i++) {
    vOut += replaceString(vSCRIPT,"___LIBERARY___","js/"+vArrJS[i]+".js");
  };
  return vOut;
}

function getClassLibrariesHTML() {
  var vSCRIPT = getValueDOM("tTplSCRIPT");
  var vArrJS = getDatabaseArray();
  var vOut = "      <!-- Classes Javscript-Libs -->\n";
  var vCList = vJSON_JS["ClassList"];
  var vLibName = "";
  for (var iClass in vCList) {
    if (vCList.hasOwnProperty(iClass)) {
      vLibName = iClass.toLowerCase();
      vOut += replaceString(vSCRIPT,"___LIBERARY___","js/"+vLibName+".js");
    }
  };
  return vOut;
}

function getPagesHTML() {
  var vOut = "";
  var vPageList = getPageListArray();
  for (var i = 0; i < vPageList.length; i++) {
    // vPageList[i]; is a Hash with the following IDs
    //var vPageRecord = ["page-id","page-title","page-type","parent-id"];
   vOut += createPageHTML(vPageList[i]);
  }
  return vOut;
}

function createPageHTML(pPageHash) {
  var vOut = "";
  // pPageHash has the following IDs
  //var vPageRecord = ["page-id","page-title","page-type","parent-id"];
  var vPageID     = pPageHash["page-id"];
  var vPageTypeID = pPageHash["page-type"];
  var vPageTpl    = getPageTypeTemplate(vPageTypeID);
  var vPageContent = vJSON_JS["PageContent"][vPageID] || " undefined content for page '"+ vPageID+"'";
  // Header Buttons are already inserted in PageType-Template
  // ToDo: Insert
  if (vPageTpl) {
    console.log("createPageHTML('"+pPageHash["page-id"]+"') PageType='"+vPageTypeID+"' is defined");
    vOut = vPageTpl;
  } else {
    console.log("createPageHTML('"+pPageHash["page-id"]+"') PageType='"+vPageTypeID+"' UNDEFINED - use DEFAULT");
    vOut= getValueDOM("tTplPAGE");
  };
  vOut = replaceString(vOut,"___PAGE_TITLE___",pPageHash["page-title"]);
  vOut = replaceString(vOut,"___PAGE_ID___",pPageHash["page-id"]);
  vOut = replaceString(vOut,"___PAGE_CONTENT___",vPageContent);
  return vOut;
};

function getPageTypeTemplate(pPageTypeID) {
  var vPageTpl = "";
  var vButton1 = "";
  var vButton2 = "";
  var vOutHash = null;
  var vBID
  if (vJSON_JS && vJSON_JS["PageType"] && vJSON_JS["PageType"][pPageTypeID]) {
    var vPT = vJSON_JS["PageType"][pPageTypeID];
    vPageTpl = vPT["template"];
    vOutHash = getButtonDefinition(vPT["button-id1"]);
    vButton1 = vOutHash["button-html"];
    vOutHash = getButtonDefinition(vPT["button-id2"]);
    vButton2 = vOutHash["button-html"];
  } else {
    console.log("getPageTypeTemplate('"+pPageTypeID+"') Template was UNDEFINED");
    vPageTpl = getValueDOM("tTplPAGE");
  };
  vPageTpl = replaceString(vPageTpl,"___BUTTON_LEFT___",vButton1);
  vPageTpl = replaceString(vPageTpl,"___BUTTON_RIGHT___",vButton2);
  return vPageTpl;
};

function getButtonDefinition(pButtonID) {
    console.log("getButtonDefinition('"+pButtonID+"')");
    var vOutHash = {
          "button-id":pButtonID,
          "button-type":"",
          "button-html":""
        };
    var vOut = "";
    if (pButtonID) {
      if (vJSON_JS && vJSON_JS["ButtonList"] && vJSON_JS["ButtonList"][pButtonID]) {
        var vBT = vJSON_JS["ButtonList"][pButtonID];
        vOut = vBT["button-html"];
        vBT["counter"]++;
        vOut = replaceString(vOut,"___COUNTER___",vBT["counter"]);
        vOutHash["button-type"] = "BUTTON";
      } else {
        console.log("Button-LINK: getButtonDefinition('"+pButtonID+"') - Definition of Button pButtonID does not exist\nUse '"+pButtonID+"' as Page-ID");
        vOut = getValueDOM("tTplBUTTON");
        //pButtonID is a regarded as Page-ID, because a definition for the Button does not exist in ButtonList
        var vTitle = getPageTitle4ID(pButtonID);
        vOut = replaceString(vOut,"___LINK_PAGE_ID___",pButtonID);
        vOut = replaceString(vOut,"___BUTTON_TEXT___",vTitle);
        vCounter++;
        vOut = replaceString(vOut,"___COUNTER___",vCounter);
        vOutHash["button-type"] = "LINK";
        //vOut = replaceString(vOut,"__BUTTON_ID__",pButtonID);
      };
      vOut = replaceString(vOut,"___BUTTON_ID___",pButtonID.toUpperCase());
      vOutHash["button-html"] = vOut;
    } else {
      console.log("ERROR: getButtonDefinition(pButtonID) - pButtonID UNDEFINED");
    };
    console.log("Button Definition:\nvOut="+vOut);
    return vOutHash;
};

function getPageTitle4ID(pPageID) {
  var vTitle = "Title '"+pPageID+"'?";
  if (pPageID) {
    if (vJSON_JS && vJSON_JS["PageList"] && vJSON_JS["PageList"][pPageID]) {
      vTitle = vJSON_JS["PageList"][pPageID]["page-title"];
    } else {
      console.log("getPageTitle4ID('"+pPageID+"') - Page for Page-ID is UNDEFINED!");
    };
  } else {
    console.log("getPageTitle4ID(pPageID)-Call - ERROR: pPageID was UNDEFINED");
  };
  return vTitle; //
}
function getDatabasesHTML() {
  var vSCRIPT = getValueDOM("tTplSCRIPT");
  var vArrDB = getDatabaseArray();
  var vOut = "      <!-- JSON Databases -->\n";
  for (var i = 0; i < vArrDB.length; i++) {
    vOut += replaceString(vSCRIPT,"___LIBERARY___","db/"+vArrDB[i]+".js");
  };
  return vOut;
}

function createCode4Class() {
	var vString = "";
	var vDate 			= getDate();
	var vClassname 		= document.fCreator.tClassname.value;
	var vClassFile  	= vClassname.toLowerCase()+".js";
	var vSuperClassname = document.fCreator.tSuperClassname.value;
	var vAuthor     	= document.fCreator.tAuthor.value;
	var vEMail      	= document.fCreator.tEMail.value;
	var vHeader     	= document.fCreator.tHeader.value;
	var vSuperClass     = document.fCreator.tSuperClass.value;
	var vMethodHeader   = document.fCreator.tMethodHeader.value;
	//var vAttributes 	= document.fCreator.tAttributes.value;
	//var vMethods    	= document.fCreator.tMethods.value;
	var vClassTail    	= document.fCreator.tClassTail.value;
	var vAttribArray    = getAttribArray();
  var vMethodArray    = getMethodArray();
	var vAttribConstructor = ""; //"	//---Attributes-------------------------\n";
	var vMethodConstructor = "	//---Methods----------------------------\n";
	var vOutput = vHeader;
	if (vSuperClassname == "") {
		vSuperClass = "	// no superclass defined\n";
	};
	vOutput = replaceString(vOutput,"___AUTHOR___",vAuthor);
	vOutput = replaceString(vOutput,"___EMAIL___",vEMail);
	vOutput = replaceString(vOutput,"___SUPERCLASS___",vSuperClass);
	vOutput = replaceString(vOutput,"___SUPERCLASSNAME___",vSuperClassname);
	vOutput = replaceString(vOutput,"___CLASSFILENAME___",vClassFile);
	vOutput = replaceString(vOutput,"___DATE___",vDate);
	vMethodHeader = replaceString(vMethodHeader,"___SUPERCLASS___",vSuperClass);
	vMethodHeader = replaceString(vMethodHeader,"___CLASSNAME___",vClassname);
	vMethodHeader = replaceString(vMethodHeader,"___CLASSFILENAME___",vClassFile);
	vMethodHeader = replaceString(vMethodHeader,"___DATE___",vDate);
	var vMethod = vMethodHeader;
	//vAttributes = replaceString(vAttributes,"\n","\nthis.");
	//alert(vAttributes);
	for (var i=0; i<vAttribArray.length; i++) {
		//alert(vAttribArray[i]);
		if (vAttribArray[i].indexOf("=")>0) {
			vAttribConstructor += "\tthis."+vAttribArray[i]+";\n";
		};
	};
	var vSplitArray;
	for (var i=0; i<vMethodArray.length; i++) {
		if (vMethodArray[i].indexOf("(")>0) {
			vSplitArray = vMethodArray[i].split("(");
			vMethodConstructor += "\tthis."+vSplitArray[0]+"\t = "+vSplitArray[0]+"_"+vClassname+";\n";
		};
	};
	vOutput = replaceString(vOutput,"___ATTRIBUTES___",vAttribConstructor);
	vOutput = replaceString(vOutput,"___METHODS___",vMethodConstructor);
	var vMethodname = "";
	var vMethodAllParamters = "";
	for (var i=0; i<vMethodArray.length; i++) {
		vMethod = vMethodHeader;
		var vOpenBracketPos = vMethodArray[i].indexOf("(");
		if (vOpenBracketPos >0) {
			vSplitArray = vMethodArray[i].split("(");
			var vCloseBracketPos = vSplitArray[1].lastIndexOf(")");
			if (vCloseBracketPos<0) {
				alert("ERROR: Method definition error!\n No closing bracket!\n"+vMethodArray[i]);
			} else {
				vMethodAllParamters = vSplitArray[1].substring(0,vCloseBracketPos);
			};
			vMethod = replaceString(vMethod,"___METHODCALL___",vMethodArray[i]);
			vMethod = replaceString(vMethod,"___METHODNAME___",vSplitArray[0]);
			vMethod = replaceString(vMethod,"___METHODPARAMETERS___",vMethodAllParamters);
      var vMethodComment = getMethodComment(vMethodArray[i]) || "   What does '"+vSplitArray[0]+"' do?";
      vMethodComment     = replaceString(vMethodComment,"\n","\n//#    ");
      vMethod = replaceString(vMethod,"___METHODCOMMENT___",vMethodComment);
      var vMethodCode = getMethodCode(vMethodArray[i]) || "//----------- INSERT YOUR CODE HERE ---------------";
      vMethodCode = "\t"+replaceString(vMethodCode,"\n","\n\t");
      vMethod = replaceString(vMethod,"___METHODCODE___",vMethodCode);
      vOutput += vMethod;
			//vSplitArray = vMethodArray[i].split("(");
		} else {
			//alert("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
		}
	};
	vOutput += vClassTail;
	vOutput = replaceString(vOutput,"___CLASSNAME___",vClassname);
  write2editor("Output",vOutput);
	alert("Javascript Class Created!\nCopy Javascript Code into File and\nuse filename '"+vClassFile+"'!");
};
