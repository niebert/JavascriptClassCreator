
function createCode4JSON_JS(pJSONDB) {
  if (pJSONDB) {
    console.log("Create JSON Code from vJSON_JS");
    document.fCreator.tJSONDB.value = getCode4JSON_JS(pJSONDB);
  } else {
    console.log("createCode4JSON_JS()-Call Error pJSONDB undefined");
  }
}

function getCode4JSON_JS(pJSONDB) {
  return JSON.stringify(pJSONDB, null, 4);
};

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
	document.fCreator.tOutput.value = vOutput;
	alert("Javascript Class Created!\nCopy Javascript Code into File and\nuse filename '"+vClassFile+"'!");
};
