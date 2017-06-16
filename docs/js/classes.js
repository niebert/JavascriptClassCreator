// vJSCC_DB contains all the data of the current programming project
//      this database will be stored and updated from the
// vClassJSON contains the current class
// vSelectedClass is the ClassName of the Class that is currently edited
// vJSCC_DB["ClassList"][vSelectedClass]  is equal to vClassJSON


function checkInterface4Class(pClassName) {
  debugLog("Class","checkInterface4Class('"+pClassName+"')");
  var vSuperClassType = getSuperClassTypeJSON(pClassName);
  var vInheritance = getInhertitChain(pClassName);
  var vChain = vInheritance["chain"];
  if (vSuperClassType == "Interface") {
      //inherit all defined attributes of interface
    inheritAttributesDefinitions(vChain);
    //inherit all method interfaces
    inheritMethodsInterface(vChain);
    //----Update Form with inherited-----
    // write the attrib list to textarea
    updateAttribJSON2Form(pClassName);
    // write the method list to textarea
    updateMethodsJSON2Form(pClassName);
    //updateJSON2Form(pClassName);
  };
  if (vSuperClassType == "Abstract") {
    //inherit the attribute and method interface
    inheritAttributesDefinitions(vChain);
    //inherit defined methods from parent abstract class and
    //create an interface for methods with an empty code ONLY,
    // other methods with a defined code are inherited as usual
    inheritMethodsAbstract(vChain);
    //----Update Form with inherited-----
    // write the attrib list to textarea
    updateAttribJSON2Form(pClassName);
    // write the method list to textarea
    updateMethodsJSON2Form(pClassName);
    //updateJSON2Form(pClassName);
  };
};


function inheritAttributesDefinitions(pChain) {
  debugLog("Attrib","inheritAttributesDefinitions()-Call");
  var vChain = pChain || [getSelectedClassName()];
  var vClassName = pChain[0];
  var vClassJS = getClassJSON(vClassName); // umlcreator.js:49
  var k = 0;
  var vInheritClass;
  for (var i = 1; i < vChain.length; i++) {
    k = vChain.length - i;
    debugLog("Attrib","["+k+"] Inherit Attrib: "+vChain[k]);
    vInheritClass = getClassJSON(vChain[k]);
    inheritAttributes4Class(vClassJS,vInheritClass);
  };
};

function inheritAttributes4Class(pClassJS,pInheritJS) {
  var vAttHash = pClassJS["AttribType"];
  var vInheritHash = pInheritJS["AttribType"];
  for (var iAtt in vInheritHash) {
    debugLog("Attrib","Inherit Att ["+iAtt+"]");
    if (vInheritHash.hasOwnProperty(iAtt)) {
      if (vAttHash.hasOwnProperty(iAtt)) {
          if (vInheritHash[iAtt] != vAttHash[iAtt]) {
            // type mismatch for Interface
            copyAttritbute4Hash(iAtt,pInheritJS,pClassJS);
          }
      } else {
        copyAttritbute4Hash(iAtt,pInheritJS,pClassJS);
      }
    }
  }
}

function copyAttritbute4Hash(iAtt,pInClass,pOutClass) {
  copyArrID4Hash(["AttribType","AttribDefault","AttribComment"],iAtt,pInClass,pOutClass);
};

function copyArrID4Hash(pArrID,iAtt,pInHash,pOutHash) {
  // copies all content
  // iAtt is
  var vIn,vOut;
  for (var i = 0; i < pArrID.length; i++) {
    //e.g. vIn = pInHash["AttribType"]
    vIn  = pInHash[pArrID[i]];
    // vOut = pOutHash["AttribType"]
    vOut = pOutHash[pArrID[i]];
    //e.g. vAtt = "aAge"
    if (vIn.hasOwnProperty(iAtt)) {
      //e.g. pOutHash["AttribType"]["aAge"] = pInHash["AttribType"]["aAge"]
      vOut[iAtt] = vIn[iAtt];
    };
  };
};


function inheritMethodsAbstract(pChain) {
  debugLog("Method","inheritMethodsAbstract()-Call");
  var vChain = pChain || [getSelectedClassName()];
  var vClassName = pChain[0];
  var vClassJS = getClassJSON(vClassName); // umlcreator.js:49
  var k = 0;
  var vInheritClass;
  for (var i = 1; i < vChain.length; i++) {
    k = vChain.length - i;
    debugLog("Method","["+k+"] Inherit Abstract Methods: "+vChain[k]);
    vInheritClass = getClassJSON(vChain[k]);
    // inherit Abstract Methods inherits the Method Headers which empty code MethodCode
    inheritAbstractMethods4Class(vClassJS,vInheritClass);
  };
};
function inheritAbstractMethods4Class(pClassJS,pInheritJS) {
  var vMethHash = pClassJS["MethodParameter"];
  var vInheritHash = pInheritJS["MethodParameter"];
  var vInheritCode = pInheritJS["MethodCode"];
  var vCode = "";
  for (var iMeth in vInheritHash) {
    debugLog("Method","Inherit Meth ["+iMeth+"]");
    if (vInheritHash.hasOwnProperty(iMeth)) {
      if (vMethHash.hasOwnProperty(iMeth)) {
          if (vInheritHash[iMeth] != vMethHash[iMeth]) {
            console.log("WARNING (inherit): type mismatch Method "+iMeth+"() for Interface - overwrite method parameter");
            copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
          } else {
            debugLog("Class","Inherit Return: for safety update Method Return for "+iMeth+"()");
            copyArrID4Hash(["MethodReturn"],iMeth,pInheritJS,pClassJS);
          };
      } else {
        vCode = vInheritCode[iMeth] || "";
        vCode = reduceVarName(vCode) || "";
        if (vCode == "") {
          debugLog("Method","Inherit [Parameter,Return,Comment]: for Method Return for "+iMeth+"()");
          copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
        } else {
          debugLog("Method","Inherit: Code of Method "+iMeth+"() is defined, INHERIT applied and NO import of Method Interface");
        };
      };
    };
  };
};

function inheritMethods4Class(pClassJS,pInheritJS) {
  var vMethHash = pClassJS["MethodParameter"];
  var vInheritHash = pInheritJS["MethodParameter"];
  for (var iMeth in vInheritHash) {
    debugLog("Method","Inherit Meth ["+iMeth+"]");
    if (vInheritHash.hasOwnProperty(iMeth)) {
      if (vMethHash.hasOwnProperty(iMeth)) {
          if (vInheritHash[iMeth] != vMethHash[iMeth]) {
            console.log("WARNING (inherit): type mismatch Method "+iMeth+"() for Interface - overwrite method parameter");
            copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
          } else {
            debugLog("Method","Inherit Return: for safety update Method Return for "+iMeth+"()");
            copyArrID4Hash(["MethodReturn"],iMeth,pInheritJS,pClassJS);
          };
      } else {
        debugLog("Method","Inherit [Parameter,Return,Comment]: for Method Return for "+iMeth+"()");
        copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
      }
    }
  }
};

function getDefaultPageHash(pPage,pPageType) {
  var vPageType = pPageType || "Default";
  debugLog("Page","getDefaultPageHash('"+pPage+"','"+pPageType+"')");
  var vRetPage = {};
  for (var i = 0; i < vPageRECDEF.length; i++) {
    vRetPage[vPageRECDEF[i]] = "";
  };
  //----SET CLASS TYPE---
  vRetPage["PAGE_ID"] = pPage;
  vRetPage["page-type"] = vPageType;
  // Set PageType of Page in JSON and other variables
  vRetPage["PAGE_TITLE"] = "Title "+pPage;
  return vRetPage;
};


function getDefaultButtonHash(pButtonID) {
  pButtonID = reduceVarName(pButtonID.toUpperCase());
  debugLog("Button","getDefaultButtonHash('"+pButtonID+"')");
  var vRetButton = {};
  for (var i = 0; i < vButtonRECDEF.length; i++) {
    vRetButton[vButtonRECDEF[i]] = "";
  };
  var vButtonHTML = getValueDOM("tDefaultBUTTON");
  vButtonHTML = replaceString(vButtonHTML,"___BUTTON_ID___",pButtonID);
  //----SET CLASS TYPE---
  vRetButton["BUTTON_ID"] = pButtonID;
  vRetButton["BUTTON_TITLE"] = firstUpperCase(pButtonID.toLowerCase(pButtonID));
  vRetButton["tButtonDefHTML"] = vButtonHTML;
  vRetButton["counter"] = 0;
  // Set ButtonTitle of Page in JSON and other variables
  return vRetButton;
};

function checkHeaderButtons4PageType() {
  var vPageTypeHash = vJSCC_DB["PageTypeList"];
  var vHash = null;
  for (var iPageType in vPageTypeHash) {
    if (vPageTypeHash.hasOwnProperty(iPageType)) {
      vHash = vPageTypeHash[iPageType];
      checkHeaderButton(vHash["HEADER_BUTTON1"]);
      checkHeaderButton(vHash["HEADER_BUTTON2"]);
    };
  };
};

function checkHeaderButton(pHeaderButton) {
  if (pHeaderButton != "") {
    pHeaderButton = reduceVarName(pHeaderButton);
    debugLog("Button","checkHeaderButton('"+pHeaderButton+"')");
    if (pHeaderButton.toUpperCase() == pHeaderButton) {
      debugLog("Button","HeaderButton['"+pHeaderButton+"'] is a Button");
      if (existsButtonJS(pHeaderButton)) {
        debugLog("Button","Button ['"+pHeaderButton+"'] exists");
      } else {
        var vButtDef = getValueDOM("tDefaultBUTTON");
        vButDef = replaceString(vButDef,"\n"," ");
        vButDef = replaceString(vButDef,"___BUTTON_TITLE___",pHeaderButton);
        vJSCC_DB["ButtonList"][pHeaderButton] = vButDef;
        updateButtonJSON2Form();
      }
    } else {
      debugLog("Button","Button ["+pHeaderButton+"] is a link");
      pHeaderButton = pHeaderButton.toLowerCase();
      if (existsPageJS(pHeaderButton)) {
        debugLog("Button","Button links to Page ['"+pHeaderButton+"']. Page exists");
      } else {
        var vNewPageHash = {
          "PAGE_ID": pHeaderButton,
          "PAGE_TITLE": "Title "+pHeaderButton,
          "page-type": "DefaultPage",
          "parent-id": "home"
        };
        vFailed = createPageJS(vNewPageHash);
        if (!vFailed) {
          vJSCC_DB["PageList"][vNewPageID] = vNewPageHash;
          createPageSelect();
        };
      };
    };
  };
};

function getDefaultClassHash(pClass,pClassType) {
  debugLog("Class","getDefaultClassHash()");
  var vClassType = pClassType || "Default";
  pClass = reduceVarName(pClass);
  vClassType = reduceVarName(vClassType);
  var vRetClass = {};
  vRetClass["JSCC_type"] = "CLASS";
  vRetClass["JSCC_init_date"] = getDate();
  vRetClass["JSCC_mod_date"] = getDate();
  for (var i = 0; i < vDOM_ID.length; i++) {
    vRetClass[vDOM_ID[i]] = "";
  };
  //----SET CLASS TYPE---
  vJSCC_DB["ClassType"][pClass] = vClassType;
  // Set ClassType of Class in JSON and other variables
  vRetClass["tClassname"] = pClass;
  vRetClass["sClassType"][pClass] = vClassType;
  vRetClass["tEMail"] = getValueDOM("tMainEMail") || "anonymous@example.com";
  vRetClass["tAuthor"] = getValueDOM("tMainAuthor") || "My Name";
  // "myMethod(p1,p2)" stores the code in vRetClass["MethodCode"]["myMethod"]
  // and stores the comment in vRetClass["MethodComment"]["myMethod"]
  vRetClass["AttribType"] = {};
  vRetClass["AttribAccess"] = {};
  vRetClass["AttribDefault"] = {};
  vRetClass["AttribComment"] = {};
  vRetClass["MethodParameter"] = {};
  vRetClass["MethodReturn"] = {};
  vRetClass["MethodCode"] = {};
  vRetClass["MethodComment"] = {};
  vRetClass["MethodAccess"] = {};
  //----------------
  vRetClass["tMethodCode"] = "";
  vRetClass["tAttribName"] = "";
  vRetClass["tSuperClassname"] = "";
  return vRetClass;
};

function inheritMethodsCode(pChain) {
  var vChain = pChain || [getSelectedClassName()];
  var vClassName = pChain[0];
  var vClassJS = getClassJSON(vClassName); // umlcreator.js:49
  var k = 0;
  var vInheritClass;
  for (var i = 1; i < vChain.length; i++) {
    k = vChain.length - i;
    debugLog("Method","["+k+"] Inherit Methods: "+vChain[k]);
    vInheritClass = getClassJSON(vChain[k]);
    inheritMethodeCode4Class(vClassJS,vInheritClass);
  };
};

function inheritMethodeCode4Class(pClassJS,pInheritJS) {
  debugLog("Method","inheritMethodCode()-Call");
  var vMethHash = pClassJS["MethodCode"];
  var vInheritHash = pInheritJS["MethodCode"];
  for (var iMeth in vInheritHash) {
    if (vInheritHash.hasOwnProperty(iMeth)) {
      //check if Method contains code
      if (reduceVarName(vInheritHash[iMeth]) == "") {
        debugLog("Method","Inherit Meth "+iMeth+"() as Interface - Code is empty");
        if (vMethHash.hasOwnProperty(iMeth)) {
          copyArrID4Hash(["MethodParameter","MethodReturn"],iMeth,pInheritJS,pClassJS);
        } else {
          copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
        };
      };
    };
  };
};


function getSuperClassname4Class(pClassName) {
  var vClassJS = getClassJSON(pClassName);
  var vSuperClassname = vClassJS["tSuperClassname"] || "";
  return vSuperClassname;
};


function getClassJSON(pClassName) {
  var vClassName = pClassName || "";
  vClassName = reduceVarName(vClassName);
  if (vClassName == "") {
    vClassName = getValueDOM("tClassname");
  };
  var vRetClass;
  debugLog("Class","getClassJSON('"+vClassName+"')");
  if (vClassName != "") {
    if (top.vJSCC_DB) {
      if (top.vJSCC_DB.ClassList) {
        if (top.vJSCC_DB.ClassList[vClassName]) {
          checkClassJSON(top.vJSCC_DB.ClassList[vClassName]);
          vRetClass = top.vJSCC_DB.ClassList[vClassName];
        } else {
          vRetClass = getDefaultClassHash(vClassName);
          vJSCC_DB["ClassList"][vClassName] = vRetClass;
          debugLog("Class","Class Create in getClassJSON('"+vClassName+"')");
        };
      } else {
        console.log("WARNING: getClassJSON('"+vClassName+"') ClassList undefined");
        initClassJS(vClassName,null,"getClassJSON()");
      };
    } else {
      initClassJS(vClassName,null,"getClassJSON()");
      alert("getClassJSON('"+vClassName+"') vJSCC_DB as Main Project DB is undefined");
    };
  };
  if (!vRetClass) {
    alert("Class '"+vClassName+"' does not exist")
  };
  return vRetClass;
}

function getSuperClassJSON(pClassName) {
  var vClassName = pClassName || "";
  var vClassJS = getClassJSON(vClassName); // umlcreator.js:49
  var vSuperClassname = vClassJS["tSuperClassname"];
  var vRetClass;
  if (vSuperClassname != "") {
    if (existsClassJS(vSuperClassname)) {
      vRetClass =  getClassJSON(vSuperClassname);
    } else {
      console.log("ERROR: SuperClass ["+vSuperClassname+"] does nont exist in getSuperClassJSON('"+vClassName+"')-Call");
    };
  };
  return vRetClass;
};

function getSuperClassTypeJSON(pClassName) {
  var vClassJS = getClassJSON(pClassName);
  var vSuperClassname = vClassJS["tSuperClassname"];
  var vSuperClassType = "";
  if (vSuperClassname != "") {
    vSuperClassType = getClassTypeJSON(vSuperClassname);
  };
  debugLog("Class","getSuperClassTypeJSON('"+pClassName+"') = '"+vSuperClassType+"'");
  return vSuperClassType;
};

function getInhertitChain(pClassName) {
  var vInheritance = {
                    "chain" : [pClassName],
                    "visited" : {pClassName:true}
              };
  var vSuperClassname = getSuperClassname4Class(pClassName);
  if (vSuperClassname != "") {
    getInheritedClass(vSuperClassname,vInheritance);
  };
  // hash "visited" shows visited Classes in the inherit chain
  // this is necessary, to identify a loop in the chain
  // e.g. Class1 ->super-> Class2 ->super-> Class3 ->super->Class1 (revited)
  // Following the inherit chain will create an infinite loop,
  // visited helps to identify a revisted Class in the chain
  var vChain = (vInheritance["chain"]).join("->");
  debugLog("Class","Inherit Chain: "+vChain);
  return vInheritance;
};

function getInheritedClass(pClassName,pInheritance) {
  // hash "visited" shows visited Classes in the inherit chain
  // this is necessary, to identify a loop in the chain
  // e.g. Class1 ->super-> Class2 ->super-> Class3 ->super->Class1 (revited)
  // the following "if" checks for the possible loop
  if (pInheritance["visited"][pClassName]) {
    var vLoopChain = (pInheritance["chain"]).join("->");
    console.log("stop inherit chain "+vLoopChain);
  } else {
    // append pClass to the chain
    pInheritance["chain"].push(pClassName);
    // set this class as visited in the chain
    pInheritance["visited"][pClassName] = true;
    // check if this class has a superclass too
    var vSuperClassname = getSuperClassname4Class(pClassName);
    if (vSuperClassname != "") {
      // class has a superclass check the chain for superclass
      getInheritedClass(vSuperClassname,pInheritance);
    };
  };
};

function createNewClass() {
  console.log("Click New - create a new Class with [+]");
  if (askCreateNew("Class",getValueDOM("tClassname"))) {
    var vSuccess = createNewClass_do();
    alert("Class ["+getValueDOM("tClassname")+"] created!");
  };
};

function createNewClass_do() {
  debugLog("Class","Click New - create a new class after prompt");
  var vNewClassName = getValueDOM("tClassname") || "";
  var vSuccess = false;
  setAuthorEmail();
  if (vNewClassName != "") {
    write2value("tClassname", vNewClassName);
    if (existsClassJS(vNewClassName)) {
      alert("Create New Class ["+vNewClassName+"] was NOT successful. Class already exists!");
    } else {
      console.log("append the new class ["+vNewClassName+"]");
      var vClassTypeArr = getClassArray(); //Defines Class,Abstract,Interface
      var vClassTypeUML = getValueDOM("sClassType") || "Default";
      vClassTypeArr.push(vNewClassName +" = " + vClassTypeUML );
      var vClassString =  vClassTypeArr.join("\n");
      debugLog("Class","NEW CLASS "+vClassString);
      write2value("tClassList",vClassString);
      createClassSelect();
      createClassJS(vNewClassName,vClassTypeUML,"createNewClass_do()");
      updateJSON2Form(vNewClassName);
      vSuccess = true;
      //document.location.href = "#tabs-1";
      $( "#tabClass" ).trigger( "click" );
    };
    selectClass(vNewClassName);
  } else {
    console.log("Create new Classes cancelled!");
  };
  return vSuccess;
};

function createNewElement(pFile) {
  var vFile = pFile || getValueDOM("tFilename");
  if (existsFileJS(vFile)) {
    var vNewElementID = getValueDOM("tElementID");
    if (existsElementJS(vNewElementID,vFile)) {
      alert("Create New Element ["+vNewElementID+"] was NOT successful. Element exists already for file '"+vFile+"'!");
    } else {
      createElementJS(vNewElementID,vFile);
    }
  } else {
    console.log("ERROR: createNewElement('"+vFile+"') not successful, '"+vFile+"' does not exist in FileList.");
  }
};

function createElementJS(pFile,pNewElementID) {
  var vNewElementID = pNewElementID || "";
  if (existsFileJS(pFile)) {
    if (existsElementJS(vNewElementID,pFile)) {
      debugLog("File","Create New Element ["+pElementID+"] was NOT successful. Element exists already for file '"+pFile+"'!");
    } else {
      var vElementHash = vJSCC_DB["FileList"][vFile]["elements"]
      vElementHash[vNewElementID] = getDefaultElementString(vFile,vNewElementID);
      var vElemArrID = getArray4HashID(vElementHash);
      //vElemArrID.push(vNewElementID);
      var vElemStr = vElemArrID.join("|");
      write2value("tElementFileIDs",vElemStr);
      createElementsFileSelect(pFile);
    };
  };
};

function getDefaultElementString(pFile,pElementID) {
  var vReturn = "File "+pFile+" - Content of element "+pElementID;
  return vReturn;
}

function getElementListHash(pFile) {
  var vFile = pFile || getValueDOM("tFilename");
  var vHash;
  if (existsFileJS(vFile)) {
    if (vJSCC_DB["FileList"][vFile]["elements"]) {
      vHash = vJSCC_DB["FileList"][vFile]["elements"];
    } else {
      vJSCC_DB["FileList"][vFile]["elements"] = {};
      vHash = vJSCC_DB["FileList"][vFile]["elements"];
    };
  };
  return vHash
};

function setAuthorEmail() {
  if (getValueDOM("tAuthor") == "") {
    write2value("tAuthor",getValueDOM("tMainAuthor"));
  };
  if (getValueDOM("tEMail") == "") {
    write2value("tEMail",getValueDOM("tMainEMail"));
  };
  if (getValueDOM("tAuthor") == "") {
    var vNewAuthor = prompt("Please enter your Name (Author of Class)!","") || "";
    if (vNewAuthor != "") {
      write2value("tAuthor",vNewAuthor);
      write2value("tMainAuthor",vNewAuthor);
    } else {
      write2value("tAuthor","Anonymous");
    };
  };
  if (getValueDOM("tEMail") == "") {
    var vNewEMail = prompt("Please enter your e-Mail (Contact Mail of Author)!","") || "";
    if (vNewEMail != "") {
      write2value("tEMail",vNewEMail);
      write2value("tMainEMail",vNewEMail);
    } else {
      write2value("tEMail","anonymous@example.com");
    };
  };
};

function getAggregationHash4Class(pClass) {
  var vAggHash = {};
  var vClassList = vJSCC_DB["ClassList"];
  if (existsClassJS(pClass)) {
    if (vClassList.hasOwnProperty(pClass)) {
      vHash = vClassList[pClass]["AttribType"];
      //logJSON(vHash);
      for (var iAttribType in vHash) {
        if (vHash.hasOwnProperty(iAttribType)) {
          // Check if AttribType is a defined Class
          var vAttribType = vHash[iAttribType];
          if (vClassList.hasOwnProperty(vAttribType)) {
            vAggHash[vAttribType] = vAttribType;
            console.log("AGGREGATION: found \n["+pClass+"] with Attribute ["+vAttribType+"]");
          };
        };
      };
    };
  };
  return vAggHash;
};


function updateJSON2tMethods(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vOut = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    var vArr = getMethodArrayJSON(vClass);
    if (vArr.length > 0) {
      vOut = vArr.join("\n");
    };
    "tAttributes", vOut
  };
  vClassJS["tMethods"] = vOut;
  write2value("tMethods",vOut);
};

function updateJSON2tAttributes(pClass) {
  var vClass = pClass || getSelectedClassID();
  var vOut = "";
  if (existsClassJS(vClass)) {
    var vArr = [];
    var vLine = "";
    var vHash = vJSCC_DB["ClassList"][vClass]["AttribDefault"];
    for (var iAtt in vHash) {
      if (vHash.hasOwnProperty(iAtt)) {
        vLine = iAtt + " = " + vHash[iAtt];
        vArr.push(vLine)
      };
    };
    if (vArr.length > 0) {
      vOut = vArr.join("\n");
    };
    vJSCC_DB["ClassList"][vClass]["tAttributes"] = vOut;
  };
  // by calling createJSON2tClassList() any missing ClassType-Definitions are written in tClassList
  write2value("tAttributes", vOut);
};

function updateClassJSON2Form(pSelectedClass) {
  setClassSelectorDefault(pSelectedClass); // set selectedClass in Select-Tag with id="sClassList"
  updateJSON2tClassList();
  createClassSelect();
  setClassSelectorDefault(pSelectedClass);
  var vMethID = "";
  if (existsClassJS(pSelectedClass)) {
    var vClassJS = getClassJSON(pSelectedClass);
    vMethID = vClassJS["sMethodList"];
  };
  createMethodSelect(pSelectedClass,vMethID);
  createAttribTypeSelect(pSelectedClass);

}

function updateJSON2tClassList() {
  // update the Selectors sClassType in vJSCC_DB["ClassList"] with ClassTypes defined in tClassList
  writeClassType2sClassList();
  // by calling createJSON2tClassList() any missing ClassType-Definitions are written in tClassList
  write2value("tClassList", createJSON2tClassList());
};

function createJSON2tClassList() {
  var vClassArr = vJSCC_DB["ClassList"];
  var vArr= [];
  var vType = "";
  for (var iClass in vClassArr) {
    if (vClassArr.hasOwnProperty(iClass)) {
      vType = vClassArr[iClass]["sClassType"];
      if (vType == "") {
        vArr.push(iClass);
      } else {
        vArr.push(iClass + " = " + vType)
      };
    };
  };
  return vArr.join("\n");

};

function writeClassType2sClassList() {
  var vClassTypeHash = vJSCC_DB["ClassType"];
  var vClassList = vJSCC_DB["ClassList"]
  for (var iClass in vClassTypeHash) {
    if (vClassTypeHash.hasOwnProperty(iClass)) {
      if (existsClassJS(iClass)) {
        vType = vClassList[iClass]["sClassType"] = vClassTypeHash[iClass];
      } else {
          console.log("WARNING: writeClassType2sClassList() Class '"+iClass+"' does not exist!");
      };
    };
  };
};

function createClassTypeString4Hash(pClassTypeHash) {
  var vClassTypeHash = pClassTypeHash || {}; //vJSCC_DB["ClassType"];
  var vArr= [];
  var vType = "";
  for (var iClass in vClassTypeHash) {
    if (vClassTypeHash.hasOwnProperty(iClass)) {
      vType = vClassTypeHash[iClass];
      vType = reduceVarName(vType);
      if (vType == "") {
        vArr.push(iClass);
      } else {
        vArr.push(iClass + " = " + vType)
      };
    };
  };
  return vArr.join("\n");
}

function renameClassForm() {
    var vOldClassName = vJSCC_DB["SelectedClass"];
    var vNewClassName = getValueDOM("tClassname");
    debugLog("Class","Rename: Clas '"+vOldClassName+"' to '"+vNewClassName+"'");
    if (vOldClassName != vNewClassName) {
      //check if new ClassName exists
      if (!existsClassJS(vNewClassName)) {
        // rename Selected ClassName
        vJSCC_DB["SelectedClass"] = vNewClassName;
        // rename Class
        //var vClasses = vJSCC_DB["ClassList"];
        vJSCC_DB["ClassList"][vNewClassName] = cloneJSON(vJSCC_DB["ClassList"][vOldClassName]);;
        vJSCC_DB["ClassList"][vNewClassName]["tClassname"] = vNewClassName;
        delete vJSCC_DB["ClassList"][vOldClassName];
        delete vJSCC_DB["ClassType"][vOldClassName];
        // update Class Select
        //write2value("tClassList",vClassString);
        updateJSON2tClassList();
        createClassSelect();
        write2value("sClassList",vNewClassName);
        selectClass(vNewClassName);
        debugLog("Class","Rename ClassName from '"+vOldClassName+"' to '"+vNewClassName+"' was successful");
      } else {
        alert("WARNING: ClassName '"+vNewClassName+"' already exists, rename operation cancelled!")
      };
    } else {
      console.log("WARNING: ClassName  '"+vNewClassName+"' unchanged!");
    }
}

function initClassJS(pClass,pClassType,pCaller) {
  var vCaller = pCaller || "";
  debugLog("Class","initClassJS('"+pClass+"','"+pClassType+"') Caller="+vCaller);
  var vClassType = pClassType || getFormClassType4Class(pClass);
  if (!pClass) {
    debugLog("Class","Call: initClassJS(pClass) with pClass undefined");
  } else {
      initClassJS_do(pClass,vClassType);
      var vClassJS = vJSCC_DB["ClassList"][pClass];
      if (vClassJS) {
        checkClassJSON(vClassJS);
      }
  }
};

function initClassJS_do(pClass,pClassType) {
  //console.log("initClassJS_do('"+pClass+"','"+pClassType+"')");
  var vClassType = getFormClassType4Class(pClass) || "";
  pClass = reduceVarName(pClass);
  if (pClass == "") {
    console.log("ERROR: initClassJS()-Call: Classname undefined");
  } else {
    if (!top.vJSCC_DB) {
      var vError = "WARNING: initClassJS() [classes.js]: JSON Database 'vJSCC_DB' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSCC_DB = {};
    } else {
      console.log("JSON Database 'vJSCC_DB' exists.");
    };
    if (top.vJSCC_DB["ClassType"]) {
      console.log("vJSCC_DB['ClassType'] exists");
    } else {
      top.vJSCC_DB["ClassType"] = {};
      console.log("vJSCC_DB['ClassType'] created");
    };
    top.vJSCC_DB["SelectedClass"] = pClass;
    initClassJS_undefined(pClass);
    if (top.vJSCC_DB["ClassList"][pClass]) {
      console.log("Class '"+pClass+"' exists in JSON DB");
      initClassJS_undefined(pClass);
    } else {
      top.createClassJS(pClass,vClassType,"initClassJS_do()");
      console.log("Class '"+pClass+"' created and updated from HTML Form with default values ClassType='"+vClassType+"'");
    };
  };
}

function initClassJS_undefined(pClass) {
  if (pClass) {
    if (top.vJSCC_DB["ClassList"]) {
      //console.log("initClassJS_undefined('"+pClass+"') - vJSCC_DB['ClassList'] exists");
    } else {
      top.vJSCC_DB["ClassList"] = {};
      console.log("initClassJS_undefined('"+pClass+"') - vJSCC_DB['ClassList'] created");
    };
    if (top.vJSCC_DB["ClassList"][pClass]) {
      //console.log("Class '"+pClass+"' exists in JSON DB");
    } else {
      top.vJSCC_DB["ClassList"][pClass] = {};
      console.log("Class '"+pClass+"' created");
    };
    var vID = "";
    var vHash = top.vJSCC_DB["ClassList"][pClass];
    for (var i = 0; i < vDOM_ID.length; i++) {
      vID = vDOM_ID[i];
      if (vHash.hasOwnProperty(vID)) {
        //vID exisits
      } else {
        switch (vID) {
          case "tClassname":
            vHash[vID] = pClass;
          break;
          case "tAuthor":
            vHash[vID] = getValueDOM("tMainAuthor");
          break;
          case "tEMail":
            vHash[vID] = getValueDOM("tMainEMail");
          break;
          case "JSCC_mod_date":
            vHash[vID] = getDate();
          break;
          default:
            vHash[vID] = "";
        };
        //console.log("initClassJS_undefined('"+pClass+"') - ['"+vID+"'] created");
      };
    };
    var vArrID = ["AttribName","AttribDefault","AttribType","MethodReturn","MethodCode","MethodComment"];
    for (var i = 0; i < vArrID.length; i++) {
      vID = vArrID[i];
      if (vHash.hasOwnProperty(vID)) {
        //vID exisits
      } else {
        vHash[vID] = {};
        //console.log("initClassJS_undefined('"+pClass+"') - Hash for ['"+vID+"'] created");
      };
    };
  } else {
    console.log("WARNING: initClassJS_undefined(pClass) pClass undefined!");
  };
};

function existsClassJS(pClass) {
  var vReturn = false;
  if (!pClass) {
    console.log("ERROR: existsClassJS(pClass)-Call with pClass undefined");
  } else {
    debugLog("Class","existsClassJS('"+pClass+"')");
    if (vJSCC_DB) {
      if (vJSCC_DB["ClassList"]) {
        if (vJSCC_DB["ClassList"][pClass]) {
          vReturn = true;
          var vClassType = vJSCC_DB["ClassType"][pClass] || "";
          debugLog("Class","Class '"+pClass+"' (Type: '"+vClassType+"') is a user-defined class.");
        };
      };
    };
    if (vReturn == false) {
      if (existsBasicClassJS(pClass)) {
        debugLog("Class","Class '"+pClass+"' is a basic class.");
        vReturn = true;
      };
    };
    if (vReturn == false) {
      debugLog("Class","Class '"+pClass+"' does NOT exist.");
    };
  };
  return vReturn
};



function existsBasicClassJS(pClass) {
  var vBasicClassHash = getBasicClassHash();
  return  vBasicClassHash.hasOwnProperty(pClass);
}

function createClassJS(pClass,pClassType,pCallerJS) {
  var vClassExists = false;
  if (pClass != "") {
    var vCallerJS = pCallerJS || "";
    debugLog("Class","createClassJS('"+pClass+"','"+pClassType+"') Caller="+vCallerJS);
    var vClassType = pClassType || getValueDOM("sClassType") || "";
    var vClassJSON = getClassJSON(pClass);
    var vClassExists = existsClassJS(pClass);
    if (vClassExists) {
      //alert("Class '"+pClass+"' already exists!");
      debugLog("Class","Class '"+pClass+"' already exists!");
    } else {
      debugLog("Class","createClassJS('"+pClass+"')-Call: Create Class '"+pClass+"' with ClassTyp='"+vClassType+"' createClassJS()-Call");
      checkClassList(vClassJSON);
      vJSCC_DB["ClassList"][pClass] = getDefaultClassHash(pClass,vClassType);
      vJSCC_DB["ClassType"][pClass] = vClassType;
      //vClassJSON = vJSCC_DB["ClassList"][pClass];
    };
  } else {
    console.log("ERROR: createClassJS()-Call with empty pClass");
  };
  return vClassExists;
};

function reduceMethodName(pName) {
  // converts "myMethod(p1,p2)" into "myMethod" to create unique method names
  // for all methods from a class
  // Some programming languages allow the definition of
  // "myMethod(p1,p2)" and "myMethod(p1,p2,p3)" in the same class.
  // This not allowed in JavascriptClassGenerator
  return reduceVarName(pName);
};

function checkClassList(pClass,pClassType) {
  pClass = reduceVarName(pClass);
  var vClassType = pClassType || "";
  vClassType = reduceVarName(vClassType);
  if (vJSCC_DB["ClassList"]) {
    debugLog("Class","checkClassList('"+pClass+"') created Class in JSON Database");
    vJSCC_DB["ClassList"][pClass] = {};
    setClassTypeJSON(pClass,vClassType);
  } else {
    debugLog("Class","checkClassList('"+pClass+"') created (1) ClassList in JSON Database");
    vJSCC_DB["ClassList"] = {};
    debugLog("Class","checkClassList('"+pClass+"') created (2) Class in JSON Database");
    vJSCC_DB["ClassList"][pClass] = {};
    setClassTypeJSON(pClass,vClassType);
    checkAccess4Class(pClass);
  };
};
function checkAccess4Class(pClass) {
  var vClassJS = getClassJSON(pClass);
  checkAccess4Class(vClassJS);
};

function checkAccess4ClassJSON(pClassJS) {
  var vClassJS = pClassJS || getClassJSON(pClass);
  var vHash = vClassJS["MethodComment"]
  for (var iMeth in vHash) {
    if (vHash.hasOwnProperty(iMeth)) {
      if (!vClassJS["MethodAccess"].hasOwnProperty(iMeth)) {
        vClassJS["MethodAccess"] = "public";
      };
    };
  };
  var vHash = vClassJS["AttribDefault"]
  for (var iMeth in vHash) {
    if (vHash.hasOwnProperty(iMeth)) {
      if (!vClassJS["AttribAccess"].hasOwnProperty(iMeth)) {
        vClassJS["AttribAccess"] = "public";
      };
    };
  }
};

function getAttribName(pAttribWithParams) {
  var vSplitArray = pAttribWithParams.split("=");
  var vAttribName = reduceVarName(vSplitArray[0]);
  return vAttribName.replace(/\s/g,"");
};

function getAttribComment(pAttribWithParams) {
  var vClassJSON = getClassJSON();
  var vAttribName = getAttribName(pAttribWithParams);
  return vClassJSON["AttribComment"][vAttribName] || "";
};

function getMethodName(pMethodWithParams) {
  var vSplitArray = pMethodWithParams.split("(");
  var vMethodName = reduceVarName(vSplitArray[0]);
  return vMethodName.replace(/\s/g,"");
};

function getMethodComment(pMethodWithParams) {
  var vClassJSON = getClassJSON();
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodComment"][vMethodName] || "";
};

function getMethodParameter(pMethodWithParams) {
  var vClassJSON = getClassJSON();
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodParameter"][vMethodName] || "";
};

function getMethodReturn(pMethodWithParams) {
  var vClassJSON = getClassJSON();
  var vMethodName = getMethodName(pMethodWithParams);
  return vClassJSON["MethodReturn"][vMethodName] || "";
};


function getMethodCode(pMethodWithParams) {
  var vClassJSON = getClassJSON();
  var vMethodName = getMethodName(pMethodWithParams);
  //return vClassJSON["MethodCode"][vMethodName] || "undefined Code '"+pMethodWithParams+"'";
  return vClassJSON["MethodCode"][vMethodName] || "";
};

function getAttributes4Class() {
  //var vAttributes 	= document.fCreator.tAttributes.value;
  //var vAttribArray    = vAttributes.split(/\n/);
	//return  vAttribArray;
  return getAttribArray();
};
function updateAttributeDefinition(pAttribName,pNewDefinition,pClass) {
  var vAttHash = getForm2AttribDefaultHash(pClass); //classes.js:484
  replaceAttributeDefinition(vAttHash,pAttribName,pNewDefinition);
  var vAttArr = convertHash2Array(vAttHash)
};

function convertAttributeHash2Array(pHash) {
  var vRetArr = [];
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
      vRetArr.push(iID+" ="+pHash[iID]);
    };
  };
  return vRetArr;
};

function convertHash2String(pHash) {
  var vArr = convertHash2Array(pHash);
  return vArr.join("\n");
}


function convertHash2Array(pHash) {
  var vRetArr = [];
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
      vRetArr.push(pHash[iID]);
    };
  };
  return vRetArr;
}

function replaceAttributeDefinition(pAttHash,pAttribName,pNewDefinition) {
  if (reduceVarName(pAttribName) != "") {
    pAttHash[pAttribName] = pNewDefinition;
    debugLog("Attrib","replaceAttributeDefinition()-Call Attribute '"+pAttribName+"' updated.");
  } else {
    console.log("ERROR: Attribute Name in replaceAttributeDefinition('"+pAttribName+"','"+pNewDefinition+"')");
  };
};

function isAttribNameDefined(pAttribName) {
  var vClass = getValueDOM("tClassname");
  var vAttHash = getJSON2AttribDefaultHash(vClass);
  if (vAttHash.hasOwnProperty(pAttribName)) {
    return true;
  } else {
    return false;
  };
};

function getAttribArray(pClass) {
  var vAttributes = "";
  if (pClass) {
    vAttributes = getString4JSONVariable(pClass,"tAttributes");
  } else {
    var vAttributes 	= document.fCreator.tAttributes.value;
  };
  vAttributes = removeEmptyLines(vAttributes);
  return vAttributes.split(/\n/);
}

function createNewAttribJS(pName,pClass) {
  // get name of Attributes
  var vClass = pClass || getSelectedClassID();
  var vName = pName || getValueDOM("tAttribName");
  console.log("createNewAttribJS('"+vName+"','"+vClass+"')");
  var vClassJS = getClassJSON();
  if (reduceVarName(vName) == "") {
    alert("ERROR: Name of Attribute is undefined.\nPlease enter the Name of the Variable!");
    console.log("ERROR: Name Variable undefined - createNewAttribJS()");
  } else if (existsAttribForm(vName)) {
    alert("Attribute '"+vName+"' already exists!\nPlease change name of attribute!");
    // set Selector of Attributes in tab "Attributes" to vName
    vClassJS["sAttribList"] = vName;
  } else {
    //var vType = getValueDOM("sAttribTypeList");
    var vType = getValueDOM("tAttribType");
    var vValue = getValueDOM("tAttribDefault");
    var vComment = getValueDOM("tAttribComment");
    if (!vType) {
      console.log("WARNING: Select for '"+vName+"' Atttribute Type is undefined");
      vType = "Object";
    } else {
      debugLog("Attrib","Attribute '"+vName+"' has Type '"+vType+"'");
    };
    if (vValue && (vValue.replace(/[\s\t]/g,"") != "")) {
      debugLog("Attrib","Default Value of Atttribute '"+vName+"' is defined with value '"+vValue+"'");
    } else {
      vValue = "null";
      debugLog("Attrib","Default Value of Atttribute '"+vName+"' was NOT defined, set to '"+vValue+"'");
    };
    var vSuccess = createNewAttributeForm(vName,vType,vValue,vComment,vClass);
    //alert("");
    updateAttributesJS(); //jsondb.js:57 no code in function body
    if (vSuccess) {
      //write2value("sAttribList",vName);
      debugLog("Attrib","createNewAttribJS('"+vName+"','"+vClass+"') Call: selectJSAttribs('"+vName+"')");
      vClassJS["sAttribList"] = vName;
      write2value("sAttribList",vName);
      selectJSAttribs(vName);
      alert("Attribute '"+vName+"' created!");
      autoSaveJSON();
    };
  }
};


function createNewAttributeForm(pName,pType,pValue,pComment,pClass) {
    var vClass = pClass || getSelectedClassID();
    console.log("createNewAttributeForm('"+pName+"','"+pType+"',"+pValue+",'"+pComment+"','"+vClass+"')");
    var vSuccess = true;
    if (existsClassJS(vClass)) {
      var vClassJS = getClassJSON(vClass);
      var vAttrDef = pName + " = " + pValue;
      var vAttributes = getValueDOM("tAttributes");
      if (reduceVarName(vAttributes) == "") {
        vAttributes = vAttrDef;
      } else {
        vAttributes = vAttributes+"\n"+vAttrDef;
      };
      write2value("tAttributes",vAttributes);
      vClassJS["tAttributes"] = vAttributes;
      vClassJS["sAttribList"] = pName;
      vClassJS["sAttribName"] = pName;
      vSuccess = true;
      saveAttribJSON(pName,pType,pValue,pComment);
      //set the Selector "sAttribList" for the Attributes on the tab "Attributes"
      //updateForm2JSON(vClassName);
      debugLog("Attrib","Set ['sAttribList'] as selected Attribute to '"+pName+"'");
    } else {
      vSuccess = false;
    };
    return vSuccess;
};

function createNewMethodJS(pClass,pMethName) {
  var vClass = pClass || getSelectedClassID();
  console.log("createNewMethodJS('"+vClass+"')");
  var vClassJSON = getClassJSON(vClass);
  // get name of Method
  //var vMethCall = getValueDOM("tMethodHeader");
  //var vName = getName4Method(vMethCall);
  var vName = getValueDOM("tMethodName");
  vName = reduceVarName(vName);
  if (vName == "") {
    debugLog("Method","createNewMethodJS() vMethodName='' no new Method-Call");
  } else if (existsMethodForm(vName)) {
    alert("Method '"+vName+"' already exists!\nPlease change name of method!");
    //var vMethHash = getMethodHash();
    //vMethHash[vName] = vMethCall;
  } else {
    //var vType = getValueDOM("sAttribTypeList");
    if (vClassJSON) {
      checkClassJSON(vClassJSON);
      var vContent = "";
      var vMethCall = vName+"()";
      vClassJSON["MethodAccess"][vName] = "public"; //getMethodParameter4Call(vMethCall);
      vClassJSON["MethodParameter"][vName] = ""; //getMethodParameter4Call(vMethCall);
      vClassJSON["MethodReturn"][vName] = ""; //getMethodReturn4Call(vMethCall);
      vClassJSON["MethodCode"][vName] = ""; //vContent;
      vClassJSON["MethodComment"][vName] = "";
      var vMethodList = getValueDOM("tMethods");
      vMethodList = removeEmptyLines(vMethodList);
      var vCR = "\n";
      if (reduceVarName(vMethodList) == "") {
        vCR = "";
      };
      vMethodList += vCR + vMethCall;
      write2value("tMethods",vMethodList);
      createMethodSelect(vClass,vName); //dom.js:13
      //updateMethodsJS();
      write2value("sMethodList",vName);
      write2value("tMethodHeader",vMethCall);
      write2innerHTML("titleMethodName",vMethCall);
      setEditorValue("iMethodCode",vContent);
      write2value("tMethodCode",vContent);
      autoSaveJSON();
      alert("Method '"+vName+"(...)' saved!");
    } else {
      console.log("ERROR: createNewMethodJS('"+vClass+"') vClassJSON of '"+vClass+"' undefined");
    }
  }
};

function getMethodParameter4Call(pMethHead) {
  var vParam = "";
  var vErrorCount = 0;
  if (pMethHead) {
    var vOpenBracketPos = pMethHead.indexOf("(");
     if (vOpenBracketPos > 0) {
       var vCloseBracketPos = pMethHead.lastIndexOf(")");
       if (vCloseBracketPos > 0) {
         if (vOpenBracketPos < vCloseBracketPos) {
           debugLog("Method","check '"+pMethHead+"' is well defined!");
           vParam = pMethHead.substring(vOpenBracketPos+1,vCloseBracketPos);
         } else {
           debugLog("Method","Closing Bracket before opening Bracket in '"+pMethHead+"'");
         };
       } else {
         vErrorCount++;
         console.log("ERROR: Method definition error!\n No closing bracket!\n"+pMethHead);
       };
     } else {
       vErrorCount++;
       console.log("ERROR: Method definition error!\n No opening bracket!\n"+pMethHead);
     }
  } else {
    console.log("ERROR: pMethHead in getMethodParameter4Call(pMethHead) undefined!");
  }
  return vParam;
}

function getMethodReturn4Call(pMethHead) {
  debugLog("Method","getMethodReturn4Call('"+pMethHead+"')");
  var vReturn = "";
  var vErrorCount = 0;
  if (pMethHead) {
    var vOpenBracketPos = pMethHead.indexOf("(");
     if (vOpenBracketPos > 0) {
       var vCloseBracketPos = pMethHead.lastIndexOf(")");
       if (vCloseBracketPos > 0) {
         if (vOpenBracketPos < vCloseBracketPos) {
           debugLog("Method","getMethodReturn4Call('"+pMethHead+"') Parameter well defined for '"+pMethHead+"'");
           vReturn = pMethHead.substring(vCloseBracketPos+1,pMethHead.length);
           if (vReturn.indexOf(":")>=0) {
             vReturn = vReturn.substring(vReturn.indexOf(":")+1,vReturn.length)
           };
           vReturn = vReturn.replace(/\s/g,"");
           debugLog("Method","getMethodReturn4Call('"+pMethHead+"') Return Class: '"+vReturn+"'");
         } else {
           console.log("ERROR: Closing Bracket before opening Bracket in '"+pMethHead+"'");
         };
       } else {
         vErrorCount++;
         console.log("ERROR: Method definition error!\n No closing bracket!\n"+pMethHead);
       };
     } else {
       vErrorCount++;
       console.log("ERROR: Method definition error!\n No opening bracket!\n"+pMethHead);
     }
  } else {
    console.log("ERROR: pMethHead in getMethodReturn4Call(pMethHead) undefined!");
  };
  console.log("Method Return '"+vReturn+"'");
  return vReturn;
}


function createClassDefaultHash() {
    var vClassArray = getClassArray();
    var vClassDefHash = getBasicClassHash();
    var vID = "";
    for (var i = 0; i < vClassArray.length; i++) {
      vID = vClassArray[i];
      vClassDefHash[vID] = "new "+vID+"()";
    };
    return vClassDefHash;
};

function existsAttribForm(pName) {
  var vClass = getValueDOM("tClassname");
  var vAttribHash = getForm2AttribDefaultHash(vClass); //classes.js:484
  var vRet = false;
  if (vAttribHash[pName]) {
    vRet = true
  };
  return vRet;
}

function existsMethodForm(pName) {
  debugLog("Method","existsMethodForm('"+pName+"')");
  var vMethHash = getMethodHash();
  var vRet = false;
  if (vMethHash[pName]) {
    vRet = true
  };
  return vRet;
}

function getAttribNameArray() {
  debugLog("Attrib","Call: getAttribNameArray() parse Attributes from Form");
  var vAttrib 	= document.fCreator.tAttributes.value;
  //alert(vAttrib);
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  var vFound = 0;
  //var vRegEx = /([A-Za-z_0-9]+)[\w\s$]*[=][\w\s]*([^$]*)/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vLine = vAttribArray[i];
    //vRegEx.exec(vLine);
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      //debugLog("Attrib","'=' found in Line '"+vLine+"'");
      vAttribArray[i] = reduceVarName(vLine.substr(0,vFound));
      debugLog("Attrib","New Setting vAttribArray[i]="+vAttribArray[i]);
    } else {
      debugLog("Attrib","'=' was not found '"+vAttribArray[i]+"' is undefined");
    };
  };
  return vAttribArray;
};

function getAttribTypeHash(pAttHash) {
  var vTypeHash = {};
  for (var iName in pAttHash) {
    if (pAttHash.hasOwnProperty(iName)) {
      vTypeHash[iName] = determineAttType(pAttHash[iName]);
      debugLog("Attrib","Type of '"+iName+"' is '"+vTypeHash[iName]+"'");
    };
  };
  return vTypeHash;
};

function getAttribCommentHash(pAttHash) {
  var vHash = {};
  for (var iName in pAttHash) {
    if (pAttHash.hasOwnProperty(iName)) {
      vHash[iName] = "";
      vHash[iName] = getComment4Attrib(iName,pAttHash[iName]);
    };
  };
  return vHash;
};

// see selectJSAttribType() too

function updateAttribType4Form() {
  var vDefault = getValueDOM("tAttribDefault");
  var vType = determineAttType(vDefault);
  write2value("tAttribType",vType);
  saveAttributeForm();
}

function updateAttribComment2JSON() {
  var vName = getValueDOM("tAttribName");
  var vComment = getValueDOM("tAttribComment");
  if (existsAttribForm(vName)) {
    debugLog("Attrib","updateAttribTypeComment4Form() - Variable exisits - no update of Attritbute Type and Comment");
  } else {
    saveID4HashPath2JSON("ClassList."+getSelectedClassID()+".AttribComment."+vName,vComment);
  };
};

function updateAttribTypeComment4Form(pAttribName) {
  var vName = pAttribName || getValueDOM("tAttribName");
  var vDefault = getValueDOM("tAttribDefault");
  var vComment = getValueDOM("tAttribComment");
  if (existsAttribForm(vName)) {
    debugLog("Attrib","updateAttribTypeComment4Form() - Variable exisits - no update of Attritbute Type and Comment");
  } else {
    var vComment = getComment4Attrib(vName,vDefault);
    var vType = determineAttType(vDefault);
    write2value("tAttribType",vType);
    write2value("tAttribComment",vComment);
  }
}

function getComment4Attrib(pName,pValue) {
  return "the attribute '" +pName + "' stores in '"+ determineAttType(pValue)+"' ... ";
}

function determineAttType(pValue) {
  var vType = "";
  var vValue = pValue.replace(/^[\s\t\n]+/g,"");
  if (vValue.indexOf("\"")==0) {
    vType = "String";
  } else if (vValue.indexOf("'")==0) {
    vType = "String";
  } else if (vValue.indexOf("{")==0) {
    vType = "Hash";
  } else if (vValue.indexOf("[")==0) {
    vType = "Array";
  } else if (vValue.indexOf("/")==0) {
    vType = "RegularExp";
  } else if (vValue.indexOf("true")==0) {
    vType = "Boolean";
  } else if (vValue.indexOf("false")==0) {
    vType = "Boolean";
  } else if (vValue.match(/^new[\s\t]+/)) {
    vValue  = vValue.replace(/^new[\s\t]+/,"");
    var vPos = vValue.indexOf("(");
    if (vPos > 0) {
      vType = reduceVarName(vValue.substr(0,vPos));
    };
  } else if (vValue.match(/^[0-9]+$/)) {
     vType = "Integer";
   } else if (vValue.match(/^[0-9]+\.?[0-9]*$/)) {
      vType = "Float";
   };
  return vType;
}

function getJSON2AttribDefaultHash(pClassName) {
    var vHash = null;
    if (vJSCC_DB["ClassList"]) {
      if (vJSCC_DB["ClassList"][pClassName]) {
        vHash = vJSCC_DB["ClassList"][pClassName]["AttribDefault"];
      } else {
        debugLog("Attrib","getJSON2AttribDefaultHash() - vJSCC_DB['ClassList']['"+pClassName+"'] does not exist!");
      }
    } else {
      debugLog("Attrib","getJSON2AttribDefaultHash() - vJSCC_DB['ClassList'] does not exist!");
    };
    return vHash;
};

function getForm2AttribDefaultHash(pClassName) {
  var vClassName = pClassName || getValueDOM("tClassname");
  var vClassNameForm = getValueDOM("tClassname");
  var vAttributes = getValueDOM("tAttributes");
  //debugLog("Attrib","getForm2AttribDefaultHash('"+vClassName+"')");
  //debugLog("Attrib"," pAttributes='"+pAttributes+"'");
  var vHash = {};
  if (vClassName && (vClassName == vClassNameForm)) {
    vHash = getAttribDefaultHash(vAttributes);
  } else {
    console.log("ERROR: vClassName='"+vClassName+"' differs form current classname '"+vClassNameForm+"'");
  };
  return vHash;
}

function getAttribDefaultHash(pAttributes) {
  // pAttributes is an optional String for creating the Hash from
  //debugLog("Attrib","getAttribDefaultHash(pAttributes)");
  //debugLog("Attrib"," pAttributes='"+pAttributes+"'");
  var vAttrib = pAttributes || getValueDOM("tAttributes");
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  var vVar = "";
  var vValue = "";
  var vAttribHash = {};
  //var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*[=] (.*[\w\s,$]*\))/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vLine = removeAccess4Def(vAttribArray[i]);
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      vVar = reduceVarName(vLine.substr(0,vFound+1))
      vValue = vLine.substr(vFound+1,vLine.length);
      vValue = vValue.replace(/^\s+/,"");
      if (vVar != "") {
        vAttribHash[vVar] = vValue;
      } else {
        debugLog("Attrib","getAttribDefaultHash()-Call - vLine='"+vLine+"' undefined");
      }
    }
    //vRegEx.exec(vLine);
    //vAttribArray[i] = vRegEx.$2;
  };
  return vAttribHash;
};
function getAttribAccessJSON(pClass,pList,pName) {
  var vClass = pClass || getSelectedClassID();
  return getAccessJSON(pClass,"AttribAccess",pName);
};

function getMethodAccessJSON(pClass,pList,pName) {
  var vClass = pClass || getSelectedClassID();
  return getAccessJSON(pClass,"MethodAccess",pName);
};

function getAccessJSON(pClass,pList,pName) {
  var vClass = pClass || getSelectedClassID();
  var vType = "";
  if (existsClassJS(vClass)) {
    var vClassJS = getClassJSON(vClass);
    vType = "public";
    if (vClassJS.hasOwnProperty(pList)) {
      if (vClassJS[pList].hasOwnProperty(pName)) {
        vType = vClassJS[pList][pName];
      };
    };
  };
  return vType;
}

function getAttribAccessHash(pAttributes) {
  // pAttributes is an optional String for creating the Hash from
  //debugLog("Attrib","getAttribDefaultHash(pAttributes)");
  //debugLog("Attrib"," pAttributes='"+pAttributes+"'");
  var vAttrib = pAttributes || getValueDOM("tAttributes");
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  var vAccess = "";
  var vVar = "";
  var vValue = "";
  var vAttribHash = {};
  //var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*[=] (.*[\w\s,$]*\))/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vAccess = getAccess4Def(vAttribArray[i]);
    vLine = removeAccess4Def(vAttribArray[i]);
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      vVar = reduceVarName(vLine.substr(0,vFound+1))
      if (vVar != "") {
        vAttribHash[vVar] = vAccess;
      } else {
        debugLog("Attrib","getAttribAccessHash()-Call - vLine='"+vLine+"' undefined");
      }
    }
    //vRegEx.exec(vLine);
    //vAttribArray[i] = vRegEx.$2;
  };
  return vAttribHash;
}

function getAccess4Def(pLine) {
  //extracts "public|" "private|" "protected|" from Definition Line
  var vType = "";
  if (pLine && (typeof(pLine) == "string")) {
    vType = "public";
    if (pLine.match(/^[\s\t]+public\|/)) {
      vType = "public";
    } else if (pLine.match(/^[\s\t]+private\|/)) {
      vType = "private";
    } else if (pLine.match(/^[\s\t]+protected\|/)) {
      vType = "protected";
    };
  };
  return pLine;
}


function removeAccess4Def(pLine) {
  //remove "public|" "private|" "protected|" from Definition Line
  if (pLine && (typeof(pLine) == "string")) {
    pLine = pLine.replace(/^[\s\t]+public\|/,"");
    pLine = pLine.replace(/^[\s\t]+private\|/,"");
    pLine = pLine.replace(/^[\s\t]+protected\|/,"");
  };
  return pLine;
}

function getAttribDefaultArray() {
  var vAttrib 	= document.fCreator.tAttributes.value;
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  //var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*[=] (.*[\w\s,$]*\))/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vLine = vAttribArray[i];
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      vAttribArray[i] = vLine.substr(vFound+1,vLine.length);
    }
    //vRegEx.exec(vLine);
    //vAttribArray[i] = vRegEx.$2;
  };
  return vAttribArray;
}

function getMethodArray4Form() {
  var vMethods = getValueDOM("tMethods");
  vMethods = removeEmptyLines(vMethods);
  var vMethodArray    = vMethods.split(/\n/);
  var vRetArr = [];
  for (var i = 0; i < vMethodArray.length; i++) {
    // Dont push empty MethodNames to the Array
    // reduceVarName() removes all non-alphanumeric chars from string
    if (reduceVarName(vMethodArray[i]) != "") {
      vRetArr.push(vMethodArray[i]);
    };
  }
	return vRetArr;
};


function getMethodArray(pClass) {
  var vRetArr = [];
  if (pClass) {
    if (existsClassJS(pClass)) {
      vRetArr = getMethodArrayJSON(pClass);
    } else {
      console.log("getMethodArray('"+pClass+"') pClass does not exist");
    };
  } else {
    vRetArr = getMethodArray4Form();
  };
  return vRetArr;
};

function getMethodArrayJSON(pClass) {
  var vRetArr = [];
  var vMethodArray = getMethodNameArrayJSON(pClass);
  console.log("getMethodArrayJSON('"+pClass+"') vMethodArray.length="+vMethodArray.length);
  var vClassJS = getClassJSON(pClass);
  var vMethRet = vClassJS["MethodReturn"];
  var vMethRet = vClassJS["MethodReturn"];
  var vMethPar = vClassJS["MethodParameter"];
  var vRetClass = "";
  var vID = "";
  var vMethodDef = "";
  for (var i = 0; i < vMethodArray.length; i++) {
    vID = vMethodArray[i] || "";
    if (vID != "") {
      vRetClass = vMethRet[vID] || "";
      if (vRetClass != "") {
        vRetClass = ":"+vRetClass;
      };
      // Now create the Method Definition String and push to Return Array vRetArr
      vMethodDef = vID + "("+(vMethPar[vID] || "")+")"+vRetClass;
      vRetArr.push(vMethodDef);
    };
  }
  return vRetArr;
}

function getName4Method(pMethodWithParams) {
  var vLine = getName4SepChar("(",pMethodWithParams);
  // reduceVarName() removes all non-alphanumeric chars from string
  if (reduceVarName(vLine) != "") {
    debugLog("Method","getName4Method('"+pMethodWithParams+"') MethodName='"+vLine+"'");
  } else {
    debugLog("Method","getName4Method() - empty variable name");
    vLine = "";
  };
  return vLine;
};

function getName4SepChar(pChar,pLine) {
  var vPos = pLine.indexOf(pChar);
  if (vPos >0) {
    pLine = pLine.substring(0, vPos);
  };
  return pLine
};

function getFormMethodsString() {
  return getFormString4ID("tMethods");
}

function getFormString4ID(pDOMID) {
  var vString = getValueDOM(pDOMID) || "";
  vString  = removeEmptyLines(vString);
  return vString;
}

function getMethodHash() {
  var vMethods = getFormMethodsString();
  var vRetHash = {};
  if (vMethods.length > 0) {
    var vMethodArray    = vMethods.split(/\n/);
    var vLine = "";
    var vName = "";
    for (var i = 0; i < vMethodArray.length; i++) {
        vName = getName4Method(vMethodArray[i]);
        if (vName != "") {
          vRetHash[vName] = vMethodArray[i];
          //debugLog("Class","getMethodHash() "+vName+" = " + vMethodArray[i]);
        };
    };
  };
  return vRetHash;
};

function getMethodNameArrayForm() {
  var vMethods = getFormMethodsString();
  var vRetArr = [];
  if (vMethods.length > 0) {
    vMethods = removeEmptyLines(vMethods);
    var vMethodArray    = vMethods.split(/\n/);
    var vLine = "";
    for (var i = 0; i < vMethodArray.length; i++) {
        vLine = getName4Method(vMethodArray[i]);
        if (vLine != "") {
          vRetArr.push(vLine);
        };
    };
  };
  return vRetArr;
};

function getMethodParamArray() {
  var vMethods = getFormMethodsString();
  var vMethodArray = [];
  if (vMethods.length > 0) {
    vMethods = removeEmptyLines(vMethods);
    vMethodArray    = vMethods.split(/\n/);
    var vLine = "";
    for (var i = 0; i < vMethodArray.length; i++) {
      var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*(\((.*[\w\s,$]*)\))/;
      vLine = vMethodArray[i];
      vRegEx.exec(vLine);
      vMethodArray[i] = vRegEx.$2;
    };
  };
  return vMethodArray;
};

function getClassTypeJSON(pClass) {
  pClass = reduceVarName(pClass);
  var vClassType = "";
  if (pClass == "") {
    console.log("WARNING: getClassTypeJSON('') Call with empty ClassName");
  } else {
    if (vJSCC_DB["ClassType"] && vJSCC_DB["ClassType"][pClass]) {
      vClassType = vJSCC_DB["ClassType"][pClass];
    } else {
      console.log("WARNING: getClassTypeJSON('"+pClass+"') ClassType for Class '"+pClass+"' does not exist in ClassType-Hash");
    };
  };
  return vClassType;
}

function setClassTypeJSON(pClass,pClassType) {
  var vClassType = pClassType || "";
  pClass = reduceVarName(pClass);
  vClassType = reduceVarName(vClassType);
  if (pClass == "") {
    console.log("WARNING: setClassTypeJSON('')-Call with empty ClassName");
  } else {
    //---Set the ClassType in the ClassType-Hash
    debugLog("Class","setClassTypeJSON('"+pClass+"','"+vClassType+"')");
    if (vJSCC_DB["ClassType"]) {
      vJSCC_DB["ClassType"][pClass] = vClassType;
    } else {
      console.log("WARNING: setClassTypeJSON('"+pClass+"','"+vClassType+"') ClassType for Class '"+pClass+"' does not exist in ClassType-Hash");
    };
    //---Set the selected ClassType for Class in the Tab Class--
    if (existsClassJS(pClass)) {
      vJSCC_DB["ClassList"][pClass]["sClassType"] = pClassType;
    } else {
      console.log("WARNING: Class '"+pClass+"' does not exist in ClassList");
    };
  };
  return vClassType;
}

function getMethodParamHash() {
  var vMethods = getValueDOM("tMethods");
  vMethods = removeEmptyLines(vMethods);
  var vMethodArray    = vMethods.split(/\n/);
  var vRetHash = {};
  var vLine = "";
  var vPos = 0;
  var vID = "";
  var vValue = "";
  for (var i = 0; i < vMethodArray.length; i++) {
    // var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*(\((.*[\w\s,$]*)\))/;
    vLine = vMethodArray[i];
    vPos = vLine.indexOf("(");
    if (vPos>0) {
      vID = vLine.substr(0,vPos-1);
      vID = reduceVarName(vID);
      vValue =  vLine.substr(vPos,vLine.length);
      vRetHash[vID] = vValue;
    };
  };
  return vRetHash;
};

function updateJSON2ClassString() {
  var vClassString = getJSON2ClassString();
  vClassString = sortStringLines(vClassString);
  write2value("tClassList",vClassString);
};

function getJSON2ClassString() {
  var vClassList = vJSCC_DB["ClassList"];
  var vClassString = "";
  var vCR = "";
  for (var iClassName in vClassList) {
    if (vClassList[iClassName]) {
      if (reduceVarName(iClassName) != "") {
        vClassString += vCR + iClassName;
        var vClassType = vJSCC_DB["ClassType"][iClassName];
        // set Selector Variable for the ClassType
        vClassList[iClassName]["sClassType"] = vClassType;
        if (vClassType && vClassType != "") {
          vClassString += " = "+ vClassType;
        };
        debugLog("Class","getJSON2ClassString() - iClassName='"+iClassName+" = "+vClassType+"'");
        vCR = "\n";
      } else {
        debugLog("Class","getJSON2ClassString() - iClassName='"+iClassName+"' empty after reduceVarName()-Call!");
      }
    } else {
      console.log("WARNING: getJSON2ClassString() - iClassName='"+iClassName+"' undefined!");
    }
  };
  return vClassString;
}

function getClassArray() {
  var vClassString = getValueDOM("tClassList");
  return getString2ClassArray(vClassString);
};

function getClassTypeArray() {
  var vClassString = getValueDOM("tClassList");
  vClassString = removeEmptyLines(vClassString);
  return vClassString.split(/\n/);
}

function getClassTypeHash() {
  return getClassTypeHashForm();
}

function getClassTypeHashForm() {
  var vClassString = getValueDOM("tClassList");
  return getString2ClassHash(vClassString);
}

function getButtonArray() {
  var vButtListStr = getValueDOM("tButtons");
  var vButtonLineArr = getString2Array(vButtListStr);
  debugLog("Button","getButtonArray() vButtonLineArr.length="+vButtonLineArr.length);
  var vArr = [];
  var vButtArr;
  for (var i = 0; i < vButtonLineArr.length; i++) {
    vButtArr = (vButtonLineArr[i]).split("|");
    //vHash = getRecordLine2Hash(vButtonRECDEF, vButtonLineArr[i]);
    debugLog("Button","getButtonArray(): vButtArr["+i+"]='"+vButtArr[0]+"'");
    var vButtonID = vButtArr[0] || "";
    if (vButtonID != "") {
      vArr.push(vButtonID);
    };
  };
  return vArr;
};

function getButton1EmptyArray() {
  //var vButtList = getArray4HashID(vJSCC_DB["ButtonList"])
  var vArr = getArray4HashID(vJSCC_DB["ButtonList"]);
  // getButtonArray();
  return insertArray1Empty(vArr);
};


function getAllClassesArray() {
  var vClassString = getValueDOM("tClassList");
  var vBasicClassHash = getBasicClassHash();
  for (var iID in vBasicClassHash) {
    if (vBasicClassHash.hasOwnProperty(iID)) {
      vClassString +="\n" + iID;
    };
  };
  //vClassString    += "\n"+document.fCreator.tBasicClassList.value;
  return getString2ClassArray(vClassString);
}

function getAllFilesArrayForm() {
  var vHTMLfilesString = getValueDOM("tHTMLfiles");
  return getString2Array(vHTMLfilesString);
};

function getAllFilesArray() {
  var vHash = vJSCC_DB["FileList"];
  var vArr = [];
  for (var iFile in vHash) {
    if (vHash.hasOwnProperty(iFile)) {
      vArr.push(iFile);
    };
  };
  return vArr;
};

function getString2ClassArray(pString) {
  var vClasses    	  = pString;
  vClasses = removeEmptyLines(vClasses);
  var vClassArray    = vClasses.split(/\n/);
  var vClassDef = "";
  var vFound = 0;
  for (var i = 0; i < vClassArray.length; i++) {
    vClassDef = vClassArray[i];
    vFound = vClassDef.indexOf("=");
    if (vFound >= 0) {
      vClassArray[i] = vClassDef.substr(0,vFound);
    };
  };
	return vClassArray;
};

function getString2ClassHash(pString) {
  var vClasses    	  = pString;
  vClasses = removeEmptyLines(vClasses);
  var vClassArray    = vClasses.split(/\n/);
  var vClassHash = {};
  var vClassDef = "";
  var vClassName = "";
  var vFound = 0;
  for (var i = 0; i < vClassArray.length; i++) {
    vClassDef = vClassArray[i];
    vFound = vClassDef.indexOf("=");
    if (vFound >= 0) {
      vClassName = reduceVarName(vClassDef.substr(0,vFound));
      vClassHash[vClassName] = reduceVarName(vClassDef.substr(vFound+1,vClassDef.length));
    } else {
      vClassName = vClassArray[i];
      vClassHash[vClassName] = "";
    };
  };
	return vClassHash;
}

function removeEmptyLines(pString) {
  //remove Empty Lines with CR at end
  pString = pString.replace(/^[\s\t]*[\r\n]/gm,"");
  //remove Empty Lines with CR at beginning
  pString = pString.replace(/\n[\s\t]*$/gm,"");
  // if remaining string is an empty line replace with ""
  pString = pString.replace(/^[\s\t]*$/gm,"");
  return pString
};


function checkJSMethods(pMethodArray) {
  var vMethodArray    = pMethodArray || getMethodArray();
  var vRetArray = [];
  var vErrorCount = 0;
	for (var i=0; i<vMethodArray.length; i++) {
		var vOpenBracketPos = vMethodArray[i].indexOf("(");
		if (vOpenBracketPos >0) {
			vSplitArray = vMethodArray[i].split("(");
			var vCloseBracketPos = vSplitArray[1].lastIndexOf(")");
			if (vCloseBracketPos<0) {
        vErrorCount++;
				console.log("ERROR: Method definition error!\n No closing bracket!\n"+vMethodArray[i]);
			} else {
        debugLog("Method","check "+vMethodArray[i]+" is well defined!");
        vRetArray.push(vMethodArray[i]);
      };
		} else {
      var vCheckMethod = reduceMethodName(vMethodArray[i]);
      if (vCheckMethod.length >2) {
        vErrorCount++;
        debugLog("Method","ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
      }
    }
  };
  return vRetArray;
};

function isBasicClass(pClassname) {
  var vBasisClasses = getBasicClassArray();
  var vRet = false;
  for (var i = 0; i < vBasisClasses.length; i++) {
    if (vBasisClasses[i] == pClassname) {
      vRet = true;
    }
  };
  return vRet;
};

function getBasicClassArray() {
  var vBasisClasses = getBasicClassHash();
  var vRetArray = [];
  for (var pClassname in vBasisClasses) {
    vRetArray.push(pClassname);
  };
  return vRetArray;
};

function getBasicClassHash() {
  var vClassList = getValueDOM("tBasicClassList");
  var vClassArray = vClassList.split(/\n/);
  var vClassHash = {};
  var vVar;
  for (var i = 0; i < vClassArray.length; i++) {
    vVar = splitAtEqual(vClassArray[i]);
    //debugLog("Class","getBasisClassDefHash() - Var='"+vVar[0]+"' value='"+vVar[1]+"'");
    if (reduceVarName(vVar[0]) != "") {
      vClassHash[reduceVarName(vVar[0])] = vVar[1].replace(/^\s+/,"");
    } else {
      console.log("WARNING: getBasicClassHash()-Call: Empty Name of Variable before '='");
    }
  };
  return vClassHash;
}

function splitAtEqual(pString) {
  return pString.split("=");
}

function updateJSON2BasicClasses() {
  var object = vJSCC_DB["BasicClasses"];
  var vOut = "";
  var vCR = "";
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      vOut += vCR + key +" = "+object[key];
      vCR = "\n";
    };
  };
  write2value("tBasicClassList",vOut);
}

function updateForm2BasicClasses() {
  var vClassList = getValueDOM("tBasicClassList");
  var vClassArray = vClassList.split(/\n/);
  var vClassHash = {};
  var vVar;
  var vOut = "";
  var vCR = "";
  for (var i = 0; i < vClassArray.length; i++) {
    vVar = splitAtEqual(vClassArray[i]);
    if (reduceVarName(vVar[0]) != "") {
      vOut += vCR + reduceVarName(vVar[0]);
      vCR = "\n";
    } else {
      console.log("WARNING: updateForm2BasicClasses() - Empty BasicClass Name");
    };
  }
};

function updateForm2Classes() {
  // (1) creates non existing classes in tClassList,
  // (2) identifies the ClasType in the ClassDefLine e.g. "App = Interface",
  // (3) sets the ClassType in ClassList vJSCC_DB["ClassType"]["App"] = "Interface",
  // (4) sets the Selector of the ClassType i.e. DOM-Selector "sClassType" vJSCC_DB["ClassList"]["App"]["sClassType"] = "Interface",
  // (5) and removes empty line in tClassList textarea in Tab "Files/Classes"
  var vClassTypeHash = getForm2ClassTypeHash();
  debugLog("Class","updateForm2Classes()-Call");
  updateForm2BasicClasses();
  vJSCC_DB["BasicClasses"] = getBasicClassHash();
  var vClassList = getValueDOM("tClassList");
  var vClassArray = vClassList.split(/\n/);
  var vOptionArray = [];
  var vClassHashJSON = null;
  var vClassType = "";
  var vClassName = "";
  var vSelectedClass = getSelectedClassID();
  for (var i = 0; i < vClassArray.length; i++) {
    // extract ClassName "MyClass" from Definition "MyClass = Interface" in vClassArray[i]
    vClassName = reduceVarName(vClassArray[i]);
    // extract ClassType "Interface" from Definition "MyClass = Interface" in vClassArray[i]
    vClassType = getClassType4Definition(vClassArray[i]);
    createClassJS(vClassName,vClassType,"updateForm2Classes(1)");
    // Set the ClassType in vJSCC_DB
    debugLog("Class","updateForm2Classes() ClassID='"+vClassName+"' ClassTypeID='"+vClassType+"'\nLINE='"+vClassArray[i]+"'");
    setClassTypeJSON(vClassName,vClassType);
    // get the ClassHash from JSON
    vClassHashJSON = vJSCC_DB["ClassList"][vClassName];
    if (vClassName != "") {
      checkClassJSON(vClassHashJSON);
      vOptionArray.push(vClassArray[i]);
      // if new classes are found in tClassList textarea, create them
      // createClassJS()-Call is dependent on the existance of JSON in ClassList
      // i.e. vJSCC_DB["ClassList"][vClassName];
      if (vClassHashJSON) {
        debugLog("Class","Class '"+vClassName+"' exists for updateForm2Classes()-Call.\nDefinition '"+vClassArray[i]+"'");
      } else {
        createClassJS(vClassName,vClassType,"updateForm2Classes(2)");
      };
      // The following setting must be called after createClassJS,
      // otherwise the class might not be available in vJSCC_DB.
      // Next command will set the selector for the ClassType properly.
      // This value is used, when users change the selected class and
      // the selector ClassType in DOM should show the selected ClassType
      setClassTypeJSON(vClassName,vClassType);
      //vJSCC_DB["ClassList"][vClassName]["sClassType"] = vClassType;
    };
  };
  // set SelectSelect Op
  write2value("sClassList",vJSCC_DB["SelectedClass"]);
  //write2value("tClassList",vOptionArray.join("\n"));
  // create the Class Selector Option of all existing classes
  updateClassSelector();
};

function getClassType4Definition(pDefString) {
  var vType = "";
  if (pDefString.indexOf("=") > 0) {
    vType = reduceVarName((pDefString.split("="))[1]);
  };
  return vType;
}

function clearForm4Class(pClass) {
  var vClass = pClass || "";
  clearForm();
  write2value("tClassname",vClass);
  write2editor("MethodCode"," ");
};

function clearForm() {
  debugLog("Class","clearForm4Class()");
  for (var i = 0; i < vDOM_ID.length; i++) {
    write2value(vDOM_ID[i],"");
    // if (vTYPE_ID[i] == "Textarea") {
    //   debugLog("Class","vDOM_ID["+i+"]='"+vDOM_ID[i]+"' is a TEXTAREA");
    //   write2innerHTML(vDOM_ID[i],"");
    // };
  };
};
