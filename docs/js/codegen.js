
function createCode4Class(pClass) {
  // called when user presses [Create JS]
  var vClass = pClass || getSelectedClassID();
  console.log("createCode4Class() '"+vClass+"'");
  var vCode = getCode4Class(vClass,getCheckBox("checkCompressCode"));
  write2editor("Output",vCode);
  //if (getCheckBox("checkCompressCode")) {
  //  console.log("Open Compressor Window and compress class '"+pClass+"'");
  //  compressCode4Class();
  //};
};

function createDoc4Class(pClass) {
  // called when user presses [Create JS]
  var vClass = pClass || getSelectedClassID();
  console.log("createDoc4Class() '"+vClass+"'");
  var vCode = getDoc4Class(vClass);
  write2editor("Output",vCode);
  //if (getCheckBox("checkCompressCode")) {
  //  console.log("Open Compressor Window and compress class '"+pClass+"'");
  //  compressCode4Class();
  //};
};




function compressCode4ClassWindow() {
  console.log("compressCode4Class() not used in JSCC");
  displayCompress();
  // var vCompCode = compressCodeJS();
  // console.log("compressed length="+vCompCode.length);
  // setEditorValue("iOutput",vCompCode);
};


function compressCode4Class() {
  console.log("compressCode4Class() not used in JSCC");
  displayCompress();
  // var vCompCode = compressCodeJS();
  // console.log("compressed length="+vCompCode.length);
  // setEditorValue("iOutput",vCompCode);
};

function compressCodeJS(pCode) {
  var vCode = pCode || getEditorValue("iOutput");
  console.log("compressCodeJS() length="+vCode.length+" ");
  var vWin = getCompressorWin();
  if (vWin) {
    console.log("Window of iFrame 'iCompressor' found");
    vWin.setInputCode(vCode);
    vWin.startCompressor();
    vCode = vWin.getOutputCode();
  } else {
    console.log("ERROR: compressCodeJS(pCode) - Compressor [iCompressor] not found in iFrame! return uncompressed code");
  };
  return vCode;
};

function createProjectJSON() {
  //hide("bSaveJSON");
  var vUsePrefix = getCheckBox("checkExportJS");
  var vExportFile = "project";
  //updateForm2JSON(getValueDOM("tClassname"));
  saveCode4JSON_JS(vJSCC_DB,vExportFile,"Project JSON",vUsePrefix);
};


function getDoc4Class(pClass) {
  // called from createDoc4Class():571
  var vClass = pClass || "";
  console.log("getCode4Class('"+vClass+"',vCompressed)");
  var vOutput = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    checkClassJSON(vClassJS);
    var vClassFile  	  = getClassFile4ClassJSON(vClassJS);
    var vSuperClass     = vClassJS["tSuperClass"];
  	var vTplMethodHeader   = getValueDOM("tTplMethodHeader");
    var vClassTail    	= getValueDOM("tTplClassTail");
    vOutput += "## Javascript Class: `"+ pClass+"`";
    vOutput += "\ncreated Javascript Class Creator JSCC "+getDateTime();
    vOutput += "\nhttps://niebert.github.io/JavascriptClassCreator";
    vOutput += "\nFile: `js/"+vClass.toLowerCase()+".js`";
    vOutput += "\n";
    // DOC Attributes
    vOutput += "\n### Attributes: `"+ pClass+"`";
    var vAttribArray    = getAttribNameArrayJSON(vClass);
  	var vClassJS = getClassJSON(vClass);
	var vAttribDef = "";
	var vAtts = "";
  	var vID = "";
  	for (var i=0; i<vAttribArray.length; i++) {
   		 vOutput += "\n";
    	//alert(vAttribArray[i]);
    	vID = vAttribArray[i];
    	var vAccess = vClassJS["AttribAccess"][vID] || "public";
    	vOutput += "\n#### "+ vID +":"+vClassJS["AttribType"][vID]+"";
    	vOutput += "\n* Default value: `"+ vClassJS["AttribDefault"][vID]+"`";
    	vOutput += "\n* Visibility: `"+ vAccess+"`";
    	vOutput += "\n* Comment: "+ vClassJS["AttribComment"][vID];
  	};
    // DOC Methods
 	var vMethodArray = getMethodArray();
 	vOutput += "\n";
    vOutput += "\n### Methods: `"+ pClass+"`";
    for (var i=0; i<vMethodArray.length; i++) {
 		if (isMethod(vMethodArray[i]) == true) {
		 vOutput += "\n";
    	  vID = getMethodName(vMethodArray[i]);
		  var vAccess = vClassJS["MethodAccess"][vID] || "public";
		  var vReturnType = vClassJS["MethodReturn"][vID];
		  var vParameter = vClassJS["MethodParameter"][vID];
		  var vParameterComment = "";
		  if (vParameter != "") {
		  	ParameterComment = "\n* Parameter: `" + vParameter.split(",").join("\n* Parameter: `")
		  };
		  var vReturnTypeComment = "";
      var vReturnInsert = "";
		  if (vReturnType != "") {
		  	vReturnTypeComment = "\n* Return Type: `"+vReturnType+"`"
        vReturnInsert = ":"+vReturnType;
		  };
    	  vOutput += "\n#### "+ vID +"("+vClassJS["MethodParameter"][vID]+")"+vReturnInsert+"";
    	  vOutput += vParameterComment+vReturnTypeComment;
    	  vOutput += "\n* Visibility: `"+ vAccess+"`";
   		  vOutput += "\n"+vClassJS["MethodComment"][vID]+")"+vReturnType+" ";
   		} else {
		  //alert("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
		}
    }
  } else {
    console.log("ERROR: getDoc4Class('"+vClass+"') Class does not exist");
    vOutput = "// ERROR: Documentation for Class '"+vClass+"' does not exist"
  };
  return vOutput;
};


function getCode4Class(pClass,pCompressed) {
  // called from createCode4Class():2
  var vClass = pClass || "";
  var vCompressed = pCompressed || false;
  console.log("getCode4Class('"+vClass+"',vCompressed)");
  var vOutput = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    checkClassJSON(vClassJS);
    var vClassFile  	  = getClassFile4ClassJSON(vClassJS);
    var vSuperClass     = vClassJS["tSuperClass"];
  	var vTplMethodHeader   = getValueDOM("tTplMethodHeader");
    var vClassTail    	= getValueDOM("tTplClassTail");
  	vOutput = getValueDOM("tClassHeader");
    vOutput       = replaceCodeMainVars(vOutput,vClass);
  	vMethodHeader = replaceCodeMainVars(vTplMethodHeader,vClass);
    vOutput       = replaceAttributes4Code(vOutput,vClass);
    vOutput       = replaceMethods4Code(vOutput,vTplMethodHeader,vClass);
  	vClassTail    = replaceString(vClassTail,"___CLASSNAME___",vClassJS["tClassname"]);
  	vOutput += vClassTail;
    if (vCompressed) {
      var vWin = getIFrameWindow("iCompressor");
      if (vWin) {
        vWin.setClassName(vClass);
        vWin.setInputCode(vOutput);
        vWin.startCompressor();
        vOutput = vWin.getOutputCode();
      }
    } else {
      console.log("Code is uncompressed");
    };
  } else {
    console.log("ERROR: getCode4Class('"+vClass+"') Class does not exist");
    vOutput = "// ERROR: Code for Class '"+vClass+"' does not exist"
  };
  return vOutput;
};


function resetCodeGenCounter() {
  console.log("resetCodeGenCounter()");
  vCounter = 0;
  var vButtonList = vJSCC_DB["ButtonList"];
  for (var iID in vButtonList) {
    if (vButtonList.hasOwnProperty(iID)) {
      vButtonList[iID]["counter"] = 0;
    };
  };
};

function setFilenameExportJSON(pFilename) {
  var vFilename = pFilename || "";
  write2innerHTML("labExportFile",vFilename);
};

function saveCode4JSON_JS(pJSONDB,pDB,pTitle,pUsePrefix) {
  // creates the JSON String (stringify) and saves to HDD
  var vUsePrefix = pUsePrefix || getCheckBox("checkExportJS")
  var vFileName = getSaveFilename4DB(pDB,vUsePrefix);
  createCode4JSON_JS(pJSONDB,pDB,pTitle,vUsePrefix);
  var vContent = getEditorValue("iJSONDB");
  saveFile2HDD(vFileName,vContent)
}

function createCode4JSON_JS(pJSONDB,pDB,pTitle,pUsePrefix) {
  // creates the JSON String (stringify)
  var vUsePrefix = pUsePrefix || getCheckBox("checkExportJS");
  var vTitle = pTitle || "";
  var vDB = pDB || "project"; //means vJSCC_DB will be export as project JSON
  // set modification data of JSON
  pJSONDB["mod_date"] = getDateTime();
  var vContent = getCode4JSON_JS(pJSONDB,vUsePrefix);
  var vType = "JSON";
  var vMode =  "ace/mode/json";
  if (vUsePrefix == true) {
    vType = "JS";
    vContent = getExportPrefix4DB(vDB)+vContent;
    vMode =  "ace/mode/javascript";
  };
  var vExportFile = getFilenameWithPath4DB(vDB,vUsePrefix);
  if (pJSONDB) {
    console.log("Create JSON Code from vJSCC_DB Title: '"+vTitle+"' - File: '"+vExportFile+"' - Type: '"+vType+"'");
    write2editor("JSONDB",vContent,vMode);
    // Write the selected DB into innerHTML of DOM and into value of "tExportedJSON"
    write2exportedDB(vDB,vUsePrefix);
    if (vTitle != "") {
      alert(vType+"-File '"+vTitle+"' exported. File: '"+vExportFile+"'");
    };
    //document.fCreator.tJSONDB.value = getCode4JSON_JS(pJSONDB);
  } else {
    console.log("createCode4JSON_JS()-Call Error pJSONDB undefined");
  }
}

function saveFile2HDD(pFilename,pContent) {
  var file = new File([pContent], {type: "text/plain;charset=utf-8"});
  saveAs(file,pFilename);
}

function getCode4JSON_JS(pJSONDB) {
  return JSON.stringify(pJSONDB, null, 4);
};

function exportTemplatesJSON() {
  //var vOut = getCode4JSON_JS(vJSON_TPL);
  updateForm2TemplateJSON();
  vJSON_TPL["JSCC_type"] = "TPL"; // Type is set to Templates
  vJSON_TPL["mod_date"] = getDateTime(); // set Export Date of Templates
  var vFileName = "code_templates";
  createCode4JSON_JS(vJSON_TPL,vFileName,"Database Templates");
  var vFileHDD = getSaveFilename4DB(vFileName,getCheckBox("checkExportJS"));
  saveFile2HDD(vFileHDD,getEditorValue("iJSONDB"));
  $( "#tabJSON" ).trigger( "click" );
};

function exportHTML() {
  var vFile = getValueDOM("sFileHTML");
  var vStandanlone = getValueDOM("sStandalone") || "NO";
  if (existsFileJS(vFile)) {
    exportHTML4File(vFile,vStandanlone);
  } else {
    alert("WARNING: Definition for File '"+vFile+"' does not exist");
  };
}


// function exportMainHTML() {
//   var vHTML = getMainHTML();
//   //write2value("tMainHTML",vHTML);
//   write2editor("MainHTML",vHTML);
// };
//
// function getMainHTML() {
//   return getHTML4File("app.html");
// };

function loadProjectJSON4File(pProjectFile) {
  console.log("loadProjectJSON4File('"+pProjectFile+"')");
  if (pProjectFile) {
    readFile2Editor(pProjectFile,"iOutput");
  } else {
    console.log("ERROR: loadProjectJSON4File(pProjectFile)-Call pProjectFile undefined!");
  }
};

function importProjectJSON() {
  var fileToLoad=document.getElementById("myImportFile").files[0]; //for input type=file
  if (fileToLoad) {
    console.log("importProjectJSON() - File '"+fileToLoad.name+"' exists.");
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var vTextFromFileLoaded = fileLoadedEvent.target.result;
        //document.getElementById("inputTextToSave").value = textFromFileLoaded;
        //alert("textFromFileLoaded="+textFromFileLoaded);
        setFilenameExportJSON(fileToLoad.name);
        importProjectJSON_do(fileToLoad.name,vTextFromFileLoaded);
      };
    fileReader.readAsText(fileToLoad, "UTF-8");
  } else {
    alert("File is missing");
  };
}

function importProjectJSON_do(pProjectFile,pContent) {
  var vContent = pContent || "{'name':'"+pProjectFile+"'}";
  //alert(vContent);
  vContent = removeDBPrefix(vContent);
  if (vContent) {
    var vJSDB = JSON.parse(vContent);
    if (vJSDB) {
      var vTypeJS = vJSDB["JSCC_type"] || "JSON";
      switch (vTypeJS) {
        case "JSCC":
          alert("Import JSON file of Type: "+vTypeJS+"");
          vJSCC_DB = vJSDB;
          setEditorValue("iJSONDB",vContent);
          writeFileTitle();
          initCodeCreator();
        break;
        case "CLASS":
          alert("Import JSON file '"+vJSDB["tClassname"]+"' of Type: "+vTypeJS+"");
          // if (vJSONDB.hasOwnProperty("JSCC_type")) {
          //   // JSCC_type is not necessary to have in vJSCC_DB["ClassList"] so delete value key pair
          //   delete vJSONDB["JSCC_type"];
          // };
          console.log("Now start importClass(vJSDB)");
          setEditorValue("iJSONDB",stringifyJSON(vJSDB));
          importClass(vJSDB);
        break;
        case "TPL":
          alert("Import JSON file of Type: "+vTypeJS+"");
          importTemplatesJSON_do(vJSDB);
        break;
        case "DB":
          var vDBname = vJSDB["name"] || "DBundefined";
          alert("Import JSON Database '"+vDBname+"' of Type: "+vTypeJS+"");
          importDatabase(vDBname,vJSDB);
          vJSCC_DB["DatabaseList"][vDBname] = vJSDB;
        break;
        default:
          var vDBname = pProjectFile;
          alert("Import to Database '"+vDBname+"' of Type: "+vTypeJS+"");
      }
    }
  }
};

function exportClass2Editor(pClass) {
  var vClass = pClass || getSelectedClassID();
  console.log("exportClass2Editor('"+vClass+"')");
  var vClassJSON = vJSCC_DB["ClassList"][vClass];
  vClassJSON["JSCC_type"] = "CLASS";
  vClassJSON["JSCC_version"] = vJSCC_Version;
  //vClassJSON["JSCC_init_date"] is defined getDefaultClassHash() in classes.js:241
  vClassJSON["JSCC_mod_date"] = getDateTime(); //update export time
  var vCode = stringifyJSON(vClassJSON);
  if (getCheckBox("checkExportJS")) {
    vCode = "vJSCC_DB['ClassList']['"+vClass+"'] = " + vCode;
  };
  setEditorValue("iJSONDB", vCode);
};

function exportClassJSON(pClass) {
  var vClass = pClass || getSelectedClassID();
  console.log("exportClassJSON('"+vClass+"')");
  exportClass2Editor(vClass);
  var vCode = getEditorValue("iJSONDB");
  var vClass = getSelectedClassID();
  var vExtension = "_jscc.json";
  var vPrefix = "";
  if (getCheckBox("checkExportJS")) {
    vExtension = "_jscc.js";
    //vPrefix += "if (!(vDataJSON.hasOwnProperty('ClassList'))) {vDataJSON['ClassList'] = {}};";
    vPrefix += "vDataJSON['ClassList']['"+vClass+"'] = ";
  };
  var vPath = "prog/";
  var vFileHDD = vClass.toLowerCase() + vExtension;
  var vFilePathHDD = vPath + vFileHDD;
  if (existsClassJS(vClass)) {
    exportClass2Editor(vClass);
  	alert("Javascript Class ["+vClass+"] created!\nJSCC-File: '"+vFilePathHDD+"'\nuse filename '"+vFilePathHDD+"'!");
    setFilenameExportJSON(vFilePathHDD);
    saveFile2HDD(vFileHDD,vCode);
  } else {
    alert("ERROR: Class ["+vCLass+"] does not exist!\nexportClassJSON('"+vClass+"')");
  };
};

function importClass(pJSDB) {
  var vClass = pJSDB["tClassname"] || "UndefClass";
  var vClassType = pJSDB["sClassType"] || "";
  console.log("importClass(pJSDB) for Class '"+vClass+"' ClassType='"+vClassType+"'");
  var vCheck = true;
  if (existsClassJS(vClass)) {
    var vCheck = confirm("Class '"+vClass + "' exists.\nDo you really want to import the class\nand overwrite the existing definition?");
    if (vCheck == false) {
      alert("Import Class '"+vClass+"' cancelled!");
    } else {
      deleteClass_do(vClass);
    };
  };
  if (vCheck == true) {
      // Set Class in vJSCC_DB for vClass
      console.log("importClass(pJSDB) Class '"+vClass+"' does not exist! Perform IMPORT");
      vJSCC_DB["ClassList"][vClass] = pJSDB;
      checkClassJSON(vJSCC_DB["ClassList"][vClass]);
      createClassSelect4Array(getArray4HashID(vJSCC_DB["ClassList"]));
      // Set ClassType for Class
      setClassType(vClass,vClassType);
      write2value("sClassList",vClass);
      selectClass(vClass);
      alert("Class '"+vClass+"' imported!")
      //updateJSON2Form(vClass);
  };
};

function importDatabase(pDBname,pJSONDB) {
  var vDBname = pJSONDB["name"] || removeExtension4File(pDBname) || "UndefDB";
  var vClassType = pJSONDB["sClassType"] || "";
  console.log("importClass(pJSDB) for Database '"+vDataJSON+"' DatabaseType='"+vDataJSONType+"'");
  if (existsDatabaseJS(vDBname)) {
    var vCheck = confirm("Database '"+vDBname + "' exists.\nDo you really want to import the JSON file\nand overwrite the existing databasen?");
    if (vCheck == false) {
      alert("Import Database '"+vDBname+"' cancelled!");
    } else {
      // Set Database in Global vDataJSON Hash
      vDataJSON[vDBname] = vJSDB;
      // Import JSON for the Database vDataJSON
      vJSCC_DB["DatabaseList"][vDBname] = vJSDB;
    };
  }
};

function getTemplate4File(pFile) {
  // pFile ignored
  var vTemplate = getValueDOM("tTplHTML") || "undefined Template";
  return vTemplate;
};

function X_getTemplate4File(pFile) {
  // Loading File does not work with pFile as Parameter
  var vTemplate = getValueDOM("tTplHTML");
  if (existsFileJS(pFile)) {
    var vTPLfilename = getTemplateFilename(pFile);
    var vFileHash = readTextFile2Hash("tpl/"+vTPLfilename);
    if (vFileHash["sucess"]) {
      vTemplate = vFileHash["content"];
      console.log("getTemplate4File('"+pFile+"') Template 'tpl/"+vTPLfilename+"' loaded successfully");
    } else {
      console.log("WARNING: getTemplate4File('"+pFile+"') could not load  Template 'tpl/"+vTPLfilename+"', use default template 'tTplHTML' in textarea instead");
    };
  } else {
    console.log("WARNING: getTemplate4File('"+pFile+"') pFile does not exist in vJSCC_DB['FileList'] use default template 'tTplHTML' in textarea instead");
  };
  return vTemplate
}

function getTemplateFilename(pFile) {
  var vTPLfilename = "";
  if (existsFileJS(pFile)) {
    vTPLfilename = vJSCC_DB["FileList"][pFile]["tTemplateHTML"];
  } else {
    console.log("ERROR: getTemplateFilename('"+pFile+"') Filename of Template not defined");
  };
  return vTPLfilename;
};

function getLibrariesHTML(pFile,pStandalone) {
  var vOut = "";
  var vExportAllClasses = getCheckBox("checkExportAllClasses");
  vOut += getGlobalLibrariesHTML(pFile,pStandalone)+"\n";
  vOut += getClassLibrariesHTML(pFile,pStandalone,vExportAllClasses)+"\n";;
  vOut += getFileLibrariesHTML(pFile,pStandalone)+"\n";;
  return vOut;
}

function getFileLibrariesHTML(pFile,pStandalone) {
  // Parameter pFile can be used to import a dependent set libraries
  var vArrJS = [];
  var vOut = "      <!-- JavaScript Libraries for '"+pFile+"' -->\n";;
  if (existsFileJS(pFile)) {
    vArrJS = vJSCC_DB["FileList"][pFile]["ImportList"];
    vOut += getJavascriptImportList(vArrJS);
  }
  return vOut;
};

function getGlobalLibrariesHTML(pFile,pStandalone) {
  // Parameter pFile can be used to import a dependent set libraries
  var vArrJS = getGlobalLibArrayWithHashes();
  var vOut = "      <!-- Global JavaScript Libraries for ALL files -->\n";
  vOut += getJavascriptImportList(vArrJS);
  return vOut;
};

function getJavascriptImportList(pArrJS) {
  var vSCRIPT = getValueDOM("tTplSCRIPT");
  var vOut = "";
  if (isArray(pArrJS)) {
    for (var i = 0; i < pArrJS.length; i++) {
       if (pArrJS[i]["import"] == true) {
         vOut += replaceString(vSCRIPT,"___LIBRARY___",pArrJS[i]["file"]);
       } else {
         console.log("getJavascriptImportList(pArrJS) - Lib '"+pArrJS[i]["file"]+"'");
       }
     };
  } else {
    console.log("ERROR: getJavascriptImportList(pArrJS) pArrJS is not a Hash");
  };
  return vOut;
}


function getMainAppClassID(pFile) {
  var vFile = pFile || getSelectedFileID();
  var vAppClass = "";
  if (existsFileJS(vFile)) {
    vAppClass = vJSCC_DB["FileList"][vFile]["sAppClassHTML"];
    if (existsClassJS(vAppClass)) {
      console.log("Main App Class '"+vAppClass+"' for file '"+vFile+"' is defined");
    } else {
      console.log("ERROR: Main App Class '"+vAppClass+"' exists!");
    };
  };
  return vAppClass;
}

function getClassLibrariesHTML(pFile,pStandalone,pAllClasses) {
  // Parameter pFile can be used to import a dependent set libraries
  var vCompressed = getCheckBox("checkCompressCode4HTML");
  var vOut = "      <!-- Classes Javascript-Libs -->\n";
  var vClassList = vJSCC_DB["ClassList"];
  var vCList = vClassList;
  if (pAllClasses == false) {
    vCList = {};
    var vAppClass = getMainAppClassID(pFile);
    if (existsClassJS(vAppClass)) {
      console.log("Main App Class '"+vAppClass+"' for file '"+pFile+"' is defined.\nCreate a Hash with just one class");
      vCList[vAppClass] = vJSCC_DB["ClassList"][vAppClass];
    } else {
      console.log("ERROR: Main App Class '"+vAppClass+"' exists, export all classes!");
    };
  };
  var vExportBoolean = {};
  for (var iClass in vCList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vOut += getClassInherit4Code(iClass,pStandalone,vCompressed,vExportBoolean);
    };
  };
  return vOut;
}

function getClassInherit4Code(pClass,pStandalone,pCompressed,pExportBoolean) {
  var vOut = "";
  if (pExportBoolean.hasOwnProperty(pClass)) {
    console.log("getClassInherit4Code('"+pClass+"') already exported");
  } else {
    pExportBoolean[pClass] = pClass;
    if (existsClassJS(pClass)) {
      var vSuperClassname = getSuperClassname4Class(pClass);
      if (vSuperClassname != "") {
        vOut += getClassInherit4Code(vSuperClassname,pStandalone,pCompressed,pExportBoolean);
      };
      // Check Aggregations of Class and export these classes first,
      // so that they are defined, when the code of pClass is defined
      var vAggHash = getAggregationHash4Class(pClass);
      for (var iAggClass in vAggHash) {
        console.log("getClassInherit4Code('"+pClass+"') Aggregation '"+iAggClass+"'");
        if (vAggHash.hasOwnProperty(iAggClass)) {
          if (pExportBoolean.hasOwnProperty(iAggClass)) {
            // export the Aggregation Class "iClass" first
            console.log("getClassInherit4Code('"+pClass+"') Aggregation '"+iAggClass+"' already exported");
          } else {
            console.log("getClassInherit4Code('"+pClass+"') export Aggregation Class '"+iAggClass+"'");
            vOut += getClassInherit4Code(iAggClass,pStandalone,pCompressed,pExportBoolean);
          };
        };
      };
      console.log("getClassInherit4Code('"+pClass+"','"+pStandalone+"',"+pCompressed+")");
      vOut += getClassHTML4Code(pClass,pStandalone,pCompressed);
    };
  };
  return vOut;
}

function getClassHTML4Code(pClass,pStandalone,pCompressed) {
  var vCompressed = pCompressed || false;
  var vSCRIPT = ""; //getValueDOM("tTplSCRIPT");
  var vOut = "";
  if (pStandalone == "YES") {
    vSCRIPT = getValueDOM("tTplSCRIPTSTANDALONE");
    vOut += replaceString(vSCRIPT,"___JSCODE___",getCode4Class(pClass,vCompressed));
  } else {
    var vLibName = pClass.toLowerCase();
    vSCRIPT = getValueDOM("tTplSCRIPT");
    vOut += replaceString(vSCRIPT,"___LIBRARY___","js/"+vLibName+".js");
  };
  return vOut
}

function parameterHasClassDef(pPar) {
  var vRet = null;
  if (pPar) {
    vRet = pPar.match(/\s*:\s*[A-Za-z][A-Za-z0-9_]+\s*^/g);
    //console.log("parameterHasClassDef(pPar) TRUE");
    vRet = true;
  } else {
    //console.log("parameterHasClassDef(pPar) FALSE");
    vRet = false;
  };
  return vRet;
};

function edit2JSparams(pEditParams) {
  console.log("Split Params and Check with edit2JSparams('"+pEditParams+"') ");
  var vParArr = pEditParams.split(",");
  var vParOut = [];
  var vParam = "";
  for (var i = 0; i < vParArr.length; i++) {
    var vClass4Param = parameterHasClassDef(vParArr[i]);
    if (vClass4Param) {
      vParam = vParArr[i].substring(0,vParArr[i].lastIndexOf(":"));
      vParOut.push(vParam);
      console.log("parameterHasClassDef('"+vParArr[i]+"') TRUE '"+vParam+"'");
    } else {
      vParOut.push(vParArr[i]);
      console.log("parameterHasClassDef('"+vParArr[i]+"') FALSE ");
    };
  };
  return vParOut.join(",");
};

function displayCompress() {
    if (vWinCompress != null) {
      if (vWinCompress.close) {
        vWinCompress.close();
      };
    };
    var vParam = "?autoclose=1";
    if (getCheckBox("cCompOptions") == true) {
      vParam = "?autoclose=0";
    };
    vWinCompress = openCompressorWin(vParam);
};

function openCompressorWin(pParam) {
  var vParam = pParam || "";
  return window.open("plugins/uglify/index.html"+vParam,"wCOMP"+Date.now(),"width=900,height=600");
}


function displayUML() {
    if (vWinUML != null) {
      if (vWinUML.close) {
        vWinUML.close();
      };
    };
    vWinUML = window.open("plugins/uml/index.html","wUML","width=900,height=600");
};


function saveCode4Class() {
  console.log("saveCode4Class() export the Javascript Code - NOT the JSCC JSON");
  var vClass = getSelectedClassID();
  exportClass2Editor(vClass);
  var vCode = getEditorValue("iOutput");
  var vMinInsert = "";
  if (getCheckBox("checkCompressCode")) {
    vMinInsert = ".min"
  };
  var vPath = getValueDOM("tDefaultAppPath");
  var vFileHDD = vClass.toLowerCase() + vMinInsert + ".js";
  var vFilePathHDD = vPath + "js/" + vFileHDD;
  alert("Javascript Class Created!\nCopy Javascript Code into File and\nuse filename '"+vFilePathHDD+"'!");
  saveFile2HDD(vFileHDD,vCode);
}

function getClassFile4ClassJSON(pClassJS) {
  var vClassname = pClassJS["tClassname"] || "UndefinedClass";
  return vClassname.toLowerCase()+".js";
}

function replaceCodeMainVars(pOutput,pClass) {
  var vOutput = pOutput || "undefined code";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vClassname 		= vClassJS["tClassname"];
	var vClassFile  	= getClassFile4ClassJSON(vClassJS);
  var vSuperClassDef = getValueDOM("tTplSuperClass");
  var vSuperClassProtoDef = getValueDOM("tTplSuperClassProto");
  var vMethodDefPrefix = "";
  if (vClassJS["tSuperClassname"] == "") {
    vSuperClassDef = "	// no superclass defined\n";
    vSuperClassProtoDef = "	// no superclass defined\n";
	} else {
    if (getValueDOM("sPrototype") == "YES") {
      vSuperClassDef = "";
    } else {
      vSuperClassProtoDef = "";
    };
  };
  if (getValueDOM("sPrototype") == "YES") {
    vMethodDefPrefix = vClassname + ".prototype";
  } else {
    vMethodDefPrefix = "this";
  };
  vOutput = replaceString(vOutput,"___AUTHOR___",vClassJS["tAuthor"]);
  vOutput = replaceString(vOutput,"___EMAIL___",vClassJS["tEMail"]);
  vOutput = replaceString(vOutput,"___SUPERCLASSPROTOTYPE___",vSuperClassProtoDef);
  vOutput = replaceString(vOutput,"___SUPERCLASS___",vSuperClassDef);
  vOutput = replaceString(vOutput,"___SUPERCLASSNAME___",vClassJS["tSuperClassname"]);
  vOutput = replaceString(vOutput,"___CLASSNAME___",vClassJS["tClassname"]);
  vOutput = replaceString(vOutput,"___CLASSFILENAME___",vClassFile);
  vOutput = replaceString(vOutput,"___DATE___",vClassJS["JSCC_init_date"]);
  vOutput = replaceString(vOutput,"___MODDATE___",getDateTime());
  vOutput = replaceString(vOutput,"___METHODDEFPREFIX___",vMethodDefPrefix);
  return vOutput;
};

function replaceMethods4Code(pOutput,pTplMethodHeader,pClass) {
  var vOutput = pOutput || "undefined pOutput";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vMethodArray = getMethodArray();
  var vTplMethodHeader = pTplMethodHeader || "undefined Template MethodHeader";
  var vMethod = vTplMethodHeader;
  vOutput = replaceString(vOutput,"___METHODSPRIVATE___",getMethodPrivate4Constructor(pClass));
  vOutput = replaceString(vOutput,"___METHODLIST___",getMethodComments4Constructor(vClass));
  vOutput = replaceString(vOutput,"___METHODSPUBLIC___",getMethodPublic4Constructor(pClass));
  vOutput = replaceString(vOutput,"___METHODSPROTOTYPE___",getMethodPrototype4Constructor(vClass));
  //vOutput = replaceMethodsPublic4Code(vOutput,pTplMethodHeader,pClass);
  return vOutput;
};

function isMethod(pMethodHeader) {
  var vIsMethod = false;
  var vOpenBracketPos = pMethodHeader.indexOf("(");
  if (vOpenBracketPos > 0) {
    vSplitArray =pMethodHeader.split("(");
    var vCloseBracketPos = vSplitArray[1].lastIndexOf(")");
    if (vCloseBracketPos<0) {
      console.log("ERROR: isMethod('"+pMethodHeader+"') Method definition error!\n No closing bracket!");
    } else {
      vIsMethod = true;
    };
  } else {
    console.log("ERROR: isMethod('"+pMethodHeader+"') Method definition error!\n No opening bracket!");
  };
  return vIsMethod;
};

function getMethodParamsClass(pMethodHeader) {
  var vParams = "";
  var vOpenBracketPos = pMethodHeader.indexOf("(");
  if (vOpenBracketPos >0) {
    vSplitArray = pMethodHeader.split("(");
    var vCloseBracketPos = vSplitArray[1].lastIndexOf(")");
    if (vCloseBracketPos<0) {
      console.log("ERROR: Method definition error!\n No closing bracket!\n"+pMethodHeader);
    } else {
      vParams = vSplitArray[1].substring(0,vCloseBracketPos);
    };
  };
  return vParams;
};

function getMethodAllParams(pMethodHeader) {
  return edit2JSparams(getMethodParamsClass(pMethodHeader));
};

function getMethodReplaceHash(pMethodHeader,pClass,pMethName,pFirstCommentPrefix,pCommentPrefix,pFirstCodePrefix,pCodePrefix) {
  var vMethName = pMethName || getMethodName(pMethodHeader);
  var vMethHash = getMethHash4Name(pClass,pMethName);
  var vCodePrefix = pCodePrefix || "";
  // var vMethHash = {
  //   "access": "public",
  //   "name": pMethName,
  //   "param": "",
  //   "return": "",
  //   "comment": "",
  //   "code": ""
  // };
  var vMethodAllParams = edit2JSparams(vMethHash["param"]);
  if (vMethHash["return"] != "") {
    vMethHash["returncolon"] = ":"+vMethHash["return"];
    vMethHash["returncomment"] = "Return: "+vMethHash["return"];
  } else {
    vMethHash["returncolon"] = "";
    vMethHash["returncomment"] = "";
  };
  var vReplaceHash = {};
  vReplaceHash["DATE"] = vJSCC_DB["init_date"];
  vReplaceHash["MODDATE"] = getDateTime();
  vReplaceHash["METHODNAME"] = pMethName;
  vReplaceHash["METHODDEF"] = pMethodHeader;
  vReplaceHash["PARAM"] = vMethHash["param"];
  //------------------------------------
  //----- Parameter Comments lines -----
  var vParArr = (vMethHash["param"]).split(",");
  vReplaceHash["PARAMETERDEF"] = vParArr.join("\n//#    ");
  //------------------------------------
  //----- Method Comments lines -----
  vReplaceHash["COMMENT"] = getMethodComment(pMethodHeader) || "What does '"+vMethName+"()' do?";
  vReplaceHash["METHODCOMMENT"] = (vReplaceHash["COMMENT"].split("\n")).join("\n//#    ");
  vReplaceHash["METHODCOMMENTLIST"] = "\t"+replaceString(vReplaceHash["COMMENT"],"\n","\n"+getValueDOM("tCommentPrefix")+"\t");
  //------------------------------------
  var vAccess = (vMethHash["access"]).toUpperCase();
  if (vAccess == "") {
    vAccess = "PUBLIC";
  };
  vReplaceHash["METHODACCESS"] = vAccess;
  vReplaceHash["CLASSFILENAME"] = "js/"+(pClass.toLowerCase())+".js";
  vReplaceHash["METHODCALL"] = vMethName+"("+vMethodAllParams+")";
  vReplaceHash["METHODCODEINDENT"] = "\t"+replaceString(vMethHash["code"],"\n","\n\t");
  vReplaceHash["RETURNCOMMENT"] = vMethHash["returncomment"];
  vReplaceHash["METHODPARAMETERS"] = getMethodAllParams(pMethodHeader);
  var vMethodComment = vMethHash["comment"] || "   What does '"+vMethName+"()' do?";
  vLinArr = vMethodComment.split("\n");
  vMethodComment = createIndentDefault(vMethodComment,getValueDOM("tCommentPrefix")+"   "+getValueDOM('tCommentBoxPrefix'));
  //var vCode = vMethHash["code"] || "//----------- INSERT YOUR CODE HERE ---------------";
  //vReplaceHash["METHODCODE"] = replaceString(vCode,"\n","\n"+vCodePrefix);
  console.log("getMethodReplaceHash('"+pMethodHeader+"','"+pClass+"','"+pMethName+"') Access='"+vMethHash["access"]+"/"+vReplaceHash["METHODACCESS"]+"'");
  return vReplaceHash;
};

function getMethodComments4Constructor(pClass) {
  // pTemplateHeadID = "tTplMethodsHeadComment"
  //Retrieve the template data from the HTML .
  // var template = $('#handlebars-demo').html();
  //
  // var context = { "name" : "Ritesh Kumar", "occupation" : "developer" };
  //
  // //Compile the template data into a function
  // var templateScript = Handlebars.compile(template);
  //
  // var html = templateScript(context);
  // //html = 'My name is Ritesh Kumar . I am a developer.'
  //
  // $(document.body).append(html);

  var vTemplateHeadID = "";
  var vCodePrefix = "\n"+getValueDOM("tCommentPrefix")+ "\t";
  var vCommentListPrefix = "\t";
  var vCommentPrefix = "\t"+getValueDOM("tCommentPrefix")+" ";
  var vOutputPrefix = "\t";

  var vOutput = getMethodCode4Template(pClass,vTemplateHeadID,"tTplMethodConstructorComment","ALL",vCodePrefix,vCommentPrefix,vCommentPrefix,vOutputPrefix);
  //vOutput = createIndentDefault(vOutput,"\t");
  vOutput = vOutput.replace(/\n[^\/][^\/]/g,"\n//");
  vOutput = (vOutput.split("\n")).join("\n\t");
  //vOutput = vCommentPrefix + vOutput;
  return vOutput;
};

function getMethodPrivate4Constructor(pClass) {
  // used to create the private methods in constructor of class
  // private methods are always exported if
  var vTemplateHeadID = ""; // is a template used before the list of methods are generated
  var vCodePrefix = "\n  "; // is inserted before all code lines
  var vOutputPrefix = ""; // injected before the contructor output
  var vCommentPrefix = "\n";
  var vCommentListPrefix = "";
  var vAccess = "PRIVATE";
  // Output all Methods in Constructor if checkbox for Prototype = "NO"
  //if (getValueDOM("sPrototype") == "NO") {
  //  vAccess = ""; // means no selector PRIVATE/PUBLIC
  //};
  var vOutput = getMethodCode4Template(pClass,vTemplateHeadID,"tTplMethodPrivate",vAccess,vCodePrefix,vCommentListPrefix,vCommentPrefix,vOutputPrefix);
  //vOutput = createIndentDefault(vOutput,"\t");
  vOutput = replaceString(vOutput,"\n","\n\t");
  return vOutput;
};

function getMethodPublic4Constructor(pClass) {
  // not used in JSCC currently
  if (getValueDOM("sPrototype") == "YES") {
    //return "//--Prototype htis is emtpy";
    return "";
  } else {
    var vTemplateHeadID = ""; // is a template used before the list of methods are generated
    var vCodePrefix = "\t  "; // is inserted before all code lines
    var vCommentListPrefix = vCodePrefix;
    var vCommentPrefix = "";
    var vOutputPrefix = "";
    var vOutput = getMethodCode4Template(pClass,vTemplateHeadID,"tTplMethodPublic","PUBLIC",vCodePrefix,vCommentListPrefix,vCommentPrefix,vOutputPrefix);
    //vOutput = createIndentDefault(vOutput,"\t");
    vOutput = replaceString(vOutput,"\n","\n\t");
    return vOutput;
  }
};


function getMethodPrototype4Constructor(pClass) {
  if (getValueDOM("sPrototype") == "YES") {
    var vTemplateHeadID = ""; // is a template used before the list of methods are generated
    var vCodePrefix = "  "; // is inserted before all code lines
    var vCommentListPrefix = vCodePrefix;
    var vCommentPrefix = "";
    var vOutputPrefix = "//";
    var vOutput = getMethodCode4Template(pClass,vTemplateHeadID,"tTplMethodHeader","PUBLIC",vCodePrefix,vCommentListPrefix,vCommentPrefix,vOutputPrefix);
    //vOutput = createIndentDefault(vOutput,"\t");
    //vOutput = replaceString(vOutput,"\n","\n\t");
    return vOutput;
  } else {
    return "";
  }
}


function getMethodCode4Template(pClass,pTemplateHeadID,pTemplateID,pAccess,pCodePrefix,pCommentListPrefix,pCommentPrefix,pOutputPrefix) {
  console.log("getMethodCode4Template('"+pClass+"','"+pTemplateHeadID+"','"+pTemplateID+"')");
  var vOutput = "";
  var vCodePrefix = pCodePrefix || "";
  var vAccess = pAccess || "";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vMethodArray = getMethodArray(vClass);
  var vTplMethodHeader = getValueDOM(pTemplateID);
  //alert(vTplMethodHeader);
  //var vTplMethodPrivate = getValueDOM("tTplMethodPrivate");
  var vMethod = vTplMethodHeader;
  var vMethodname = "";
  var vMethodAllParams = "";
  var vMethodParamsClass = "";
  var vSplitArray;
  // Now OutMeth is colleacting all Method Definitions
  for (var i=0; i<vMethodArray.length; i++) {
    // start with clean MethodHeader Template for each Method Definition
    vMethod = vTplMethodHeader;
    if (isMethod(vMethodArray[i]) == true) {
      var vMethName = getMethodName(vMethodArray[i]);
      var vMethHash = getMethHash4Name(vClass,vMethName);
      var vReplaceHash = getMethodReplaceHash(vMethodArray[i],vClass,vMethName,vCodePrefix);
      console.log("getMethodCode4Template('"+vClass+"') - "+vReplaceHash["METHODACCESS"]+" Method: '"+vMethName+"'");
      if ((vReplaceHash["METHODACCESS"] == vAccess) || (vAccess == "ALL")) {
        console.log("EXPORT: getMethodCode4Template('"+vClass+"') - "+vReplaceHash["METHODACCESS"]+" Method: '"+vMethName+"'");
        //vReplaceHash["METHODCOMMENT"] =  ((vReplaceHash["COMMENT"]).split("\n")).join(("\n"+pCommentPrefix));
        vMethod = replaceHash4Content(vReplaceHash,vMethod);
        var vCode = vMethHash["code"] || "//----------- INSERT YOUR CODE HERE ---------------";
        //vCode = vCodePrefix + replaceString(vCode,"\n","\n"+vCodePrefix);
        vCode = vCodePrefix + replaceString(vCode,"\n","\n"+vCodePrefix);
        vMethod = replaceString(vMethod,"___METHODCODE___",vCode);
        //vReplaceHash["METHODCODE"] = replaceString(vCode,"\n","\n"+vCodePrefix);
        vOutput += vMethod;
      } else {
        console.log("SKIP: getMethodCode4Template('"+vClass+"') - "+vReplaceHash["METHODACCESS"]+" Method: '"+vMethName+"'");
      };
      //vOutput += vTplMethodHeader;
    } else {
      //alert("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
    };
  };
  // prepend the output prefix e.g. Indent, tab or "//"
  vOutput = pOutputPrefix + vOutput;
  if (pTemplateHeadID != "") {
    vOutput = "\n"+getValueDOM(pTemplateHeadID)+vOutput;
  };
  vOutput = replaceString(vOutput,"___CLASSNAME___",vClassJS["tClassname"]);
  console.log(vOutput);
  return vOutput;
}

function replaceAttributes4Code(pOutput,pClass) {
  var vOutput = pOutput || "undefined pOutput";
  var vClass = pClass || getValueDOM("tClassname");
  var vAttribArray    = getAttribNameArrayJSON(vClass);
  var vClassJS = getClassJSON(vClass);
  var vTemplate = getValueDOM("tTplAttribute");
  var vTemplatePriv = getValueDOM("tTplAttributePrivate");
  var vAttribDef = "";
  var vAtts = "";
  var vID = "";
  for (var i=0; i<vAttribArray.length; i++) {
    //alert(vAttribArray[i]);
    vID = vAttribArray[i];
    var vAccess = vClassJS["AttribAccess"][vID] || "public";
    if (vAccess == "public") {
      vAttribDef = vTemplate; // init with AttribTemplate
    } else {
      vAttribDef = vTemplatePriv; // init with AttribTemplate
    };
    // replace Attribute Name
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_NAME___",vID);
    // replace Attribute Default/Init Value
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_ACCESS___",vAccess);
    // replace Attribute Default/Init Value
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_DEFAULT___",vClassJS["AttribDefault"][vID]);
    // replace Attribute Comment
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_COMMENT___",vClassJS["AttribComment"][vID]);
    // replace Attribute Type
    vAttribDef = replaceString(vAttribDef,"___ATTRIB_TYPE___",vClassJS["AttribType"][vID]);
    vAtts += vAttribDef;
  };
  vAtts = createIndentDefault(vAtts,"\t");
  vOutput = replaceString(vOutput,"___ATTRIBUTES___",vAtts);
  return vOutput;
};

function replaceMethodsPublic4Code(pOutput,pTplMethodHeader,pClass) {
  // depricated
  var vOutput = pOutput || "undefined pOutput";
  var vClass = pClass || getValueDOM("tClassname");
  var vClassJS = getClassJSON(vClass);
  var vMethodArray = getMethodArray();
  var vTplMethodHeader = pTplMethodHeader || "undefined Template MethodHeader";
  var vMethod = vTplMethodHeader;
  var vMethodname = "";
  var vMethodAllParams = "";
  var vMethodParamsClass = "";
  var vSplitArray;
  // Now OutMeth is collecting all Method Definitions - Prototype-def and this-def
  var vOutMeth = getValueDOM("tTplMethodsHeadComment");
  vOutMeth = replaceString(vOutMeth,"___CLASSNAME___",vClassJS["tClassname"]);
  vOutMeth = replaceString(vOutMeth,"___HEAD_TITLE___","PROTOTYPE");
  for (var i=0; i<vMethodArray.length; i++) {
    // start with clean MethodHeader Template for each Method Definition
    vMethod = vMethodHeader;
    if (isMethod(vMethodArray[i]) == true) {
      var vMethName = getMethodName(vMethodArray[i]);
      var vMethHash = getMethHash4Name(vClass,vMethName);
      var vReplaceHash = getMethodReplaceHash(vMethodArray[i],vClass,vMethName);
      //----- Parameter Comments lines -----
      var vParArr = (vMethHash["param"]).split(",");
      var vCommentPrefix = getValueDOM("tCommentPrefix"); // tCommentPrefix="//"
      var vCommentBoxPrefix = getValueDOM("tCommentBoxPrefix"); // tCommentBoxPrefix="#"
      var vComPrefix = "\n" + vCommentPrefix + vCommentBoxPrefix + "   ";
      vReplaceHash["PARAMETERDEF"] = vParArr.join(vComPrefix);
      //------------------------------------
      //----- Method Comments lines -----
      var vComPrefix = "\n" + getValueDOM("tCommentPrefix") + getValueDOM("tCommentBoxPrefix")+"\t";
      var vLinArr = (vReplaceHash["COMMENT"]).split("\n");
      vReplaceHash["METHODCOMMENT"] = vLinArr.join(vComPrefix);
      //createIndentDefault(vReplaceHash["COMMENT"],vComPrefix);
      //-------------------------------------------------------
      if (vReplaceHash["METHODACCESS"] == "PUBLIC") {
        console.log("replaceMethods4Code('"+vClass+"') - '"+vReplaceHash["METHODACCESS"]+"' Method: '"+vMethName+"'");
        vMethod = replaceHash4Content(vReplaceHash,vMethod);
        var vCode = vMethHash["code"] || "//----------- INSERT YOUR CODE HERE ---------------";
        vCode = "\t"+replaceString(vCode,"\n","\n\t");
        vMethod = replaceString(vMethod,"___METHODCODE___",vCode);
        vOutMeth += vMethod;
      };
      //vSplitArray = vMethodArray[i].split("(");
    } else {
      //alert("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
    }
  };
  if (getValueDOM("sPrototype") == "YES") {
    console.log("Methods are defined with Prototype approach");
    vOutput = replaceString(vOutput,"___METHODSPROTOTYPE___",vOutMeth);
    vOutput = replaceString(vOutput,"___METHODS___",getMethodComments4Constructor(vClass));
  } else {
    console.log("Methods are NOT defined with Prototype approach");
    var vArr = vOutMeth.split("\n");
    vOutMeth = vArr.join("\n\t");
    vOutput = replaceString(vOutput,"___METHODS___",vOutMeth);
    vOutput = replaceString(vOutput,"___METHODSPROTOTYPE___","");
  };
  return vOutput;
};


function createLinkedMethodDefinitions() {
  var vMethodArray = getMethodArray();
  var vSplitArray;
  var vMethodConstructor = "	//---Methods----------------------------\n";
	for (var i=0; i<vMethodArray.length; i++) {
		if (vMethodArray[i].indexOf("(")>0) {
			vSplitArray = vMethodArray[i].split("(");
			vMethodConstructor += "\tthis."+vSplitArray[0]+"\t = "+vSplitArray[0]+"_"+vClassname+";\n";
		};
	};
};


function importTemplatesJSON() {
  //var vOut = getCode4JSON_JS(vJSON_TPL);
  var vContent = updateTemplatesJSON2Form();
};

function updateTemplatesJSON2Form() {
  // vDOM_TPL is an array of DOM-IDs for textareas to read and write from
  // vJSON_TPL is a hash for DOM-IDs containing the template as text
  var vID = "";
  for (var i = 0; i < vDOM_TPL.length; i++) {
    vID = vDOM_TPL[i]
    if (vJSON_TPL.hasOwnProperty(vID)) {
      write2value(vID,vJSON_TPL[vID])
    } else {
      console.log("vJSON_TPL['"+vID+"'] as Template undefined");
    }
  }
};

function populateForm2TemplateJSON() {
  updateForm2TemplateJSON();
};

function updateForm2TemplateJSON() {
  // vDOM_TPL is an array of DOM-IDs for textareas to read and write from
  // vJSON_TPL is a hash for DOM-IDs containing the template as text
  var vID = "";
  for (var i = 0; i < vDOM_TPL.length; i++) {
    vID = vDOM_TPL[i];
    if (vJSON_TPL.hasOwnProperty(vID)) {
      console.log("vJSON_TPL['"+vID+"'] as Template already defined");
    } else {
      vJSON_TPL[vID] = getValueDOM(vID);
      console.log("vJSON_TPL['"+vID+"'] set Template by textarea content in HTML from DOM");
    };
  };
};
