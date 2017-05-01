// vJSON_JS contains all the data of the current programming project
//      this database will be stored and updated from the
// vClassJSON contains the current class
// vSelectedClass is the ClassName of the Class that is currently edited
// vJSON_JS["ClassList"][vSelectedClass]  is equal to vClassJSON


function checkInterface4Class(pClassName) {
  console.log("checkInterface4Class('"+pClassName+"')");
  var vSuperClassType = getSuperClassTypeJSON(pClassName);
  var vInheritance = getInhertitChain(pClassName);
  var vChain = vInheritance["chain"];
  if (vSuperClassType == "Interface") {
      //inherit all defined attributes of interface
    inheritAttributesDefinitions(vChain);
    //inherit all method interfaces
    inheritMethodsInterface(vChain);
    //Update Form with inherited
    updateAttribJSON2Form(pClassName);
    updateMethodsJSON2Form(pClassName);
    updateJSON2Form();
  };
  if (vSuperClassType == "Abstract") {
    //inherit the method interface
    inheritAttributesDefinitions(vChain);
    //inherit defined methods from parent abstract class and
    //create an interface for methods, i.e. methods with an empty code
    inheritMethodsAbstract(vChain);
    //Update Form with inherited
    updateAttribJSON2Form(pClassName);
    updateMethodsJSON2Form(pClassName);
    updateJSON2Form();
  };
};


function inheritAttributesDefinitions(pChain) {
  console.log("inheritAttributesDefinitions()-Call");
  var vChain = pChain || [getSelectedClassName()];
  var vClassName = pChain[0];
  var vClassJS = getClassJSON(vClassName); // umlcreator.js:49
  var k = 0;
  var vInheritClass;
  for (var i = 1; i < vChain.length; i++) {
    k = vChain.length - i;
    console.log("["+k+"] Inherit Attrib: "+vChain[k]);
    vInheritClass = getClassJSON(vChain[k]);
    inheritAttributes4Class(vClassJS,vInheritClass);
  };
};

function inheritAttributes4Class(pClassJS,pInheritJS) {
  var vAttHash = pClassJS["AttribType"];
  var vInheritHash = pInheritJS["AttribType"];
  for (var iAtt in vInheritHash) {
    console.log("Inherit Att ["+iAtt+"]");
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
    vIn  = pInHash[pArrID[i]];
    vOut = pOutHash[pArrID[i]];
    for (var iAtt in vIn) {
      if (vIn.hasOwnProperty(iAtt)) {
        vOut[iAtt] = vIn[iAtt];
      }
    };
  };
};


function inheritMethodsAbstract(pChain) {
  console.log("inheritMethodsAbstract()-Call");
  var vChain = pChain || [getSelectedClassName()];
  var vClassName = pChain[0];
  var vClassJS = getClassJSON(vClassName); // umlcreator.js:49
  var k = 0;
  var vInheritClass;
  for (var i = 1; i < vChain.length; i++) {
    k = vChain.length - i;
    console.log("["+k+"] Inherit Abstract Methods: "+vChain[k]);
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
    console.log("Inherit Meth ["+iMeth+"]");
    if (vInheritHash.hasOwnProperty(iMeth)) {
      if (vMethHash.hasOwnProperty(iMeth)) {
          if (vInheritHash[iMeth] != vMethHash[iMeth]) {
            console.log("WARING (inherit): type mismatch Method "+iMeth+"() for Interface - overwrite method parameter");
            copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
          } else {
            console.log("Inherit Return: for safety update Method Return for "+iMeth+"()");
            copyArrID4Hash(["MethodReturn"],iMeth,pInheritJS,pClassJS);
          };
      } else {
        vCode = vInheritCode[iMath] || "";
        vCode = reduceVarName(vCode) || "";
        if (vCode == "") {
          console.log("Inherit [Parameter,Return,Comment]: for Method Return for "+iMeth+"()");
          copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
        } else {
          console.log("Inherit: Code of Method "+iMeth+"() is defined, INHERIT applied and NO import of Method Interface");
        };
      };
    };
  };
};

function inheritMethods4Class(pClassJS,pInheritJS) {
  var vMethHash = pClassJS["MethodParameter"];
  var vInheritHash = pInheritJS["MethodParameter"];
  for (var iMeth in vInheritHash) {
    console.log("Inherit Meth ["+iMeth+"]");
    if (vInheritHash.hasOwnProperty(iMeth)) {
      if (vMethHash.hasOwnProperty(iMeth)) {
          if (vInheritHash[iMeth] != vMethHash[iMeth]) {
            console.log("WARING (inherit): type mismatch Method "+iMeth+"() for Interface - overwrite method parameter");
            copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
          } else {
            console.log("Inherit Return: for safety update Method Return for "+iMeth+"()");
            copyArrID4Hash(["MethodReturn"],iMeth,pInheritJS,pClassJS);
          };
      } else {
        console.log("Inherit [Parameter,Return,Comment]: for Method Return for "+iMeth+"()");
        copyArrID4Hash(["MethodParameter","MethodReturn","MethodComment"],iMeth,pInheritJS,pClassJS);
      }
    }
  }
};

function getDefaultPageHash(pPage,pPageType) {
  var vPageType = pPageType || "Default";
  console.log("getDefaultPageHash('"+pPage+"','"+pPageType+"')");
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
  console.log("getDefaultButtonHash('"+pButtonID+"')");
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
  var vPageTypeHash = vJSON_JS["PageType"];
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
    console.log("checkHeaderButton('"+pHeaderButton+"')");
    if (pHeaderButton.toUpperCase() == pHeaderButton) {
      console.log("HeaderButton['"+pHeaderButton+"'] is a Button");
      if (existsButtonJS(pHeaderButton)) {
        console.log("Button ['"+pHeaderButton+"'] exists");
      } else {
        var vButtDef = getValueDOM("tDefaultBUTTON");
        vButDef = replaceString(vButDef,"\n"," ");
        vButDef = replaceString(vButDef,"___BUTTON_TITLE___",pHeaderButton);
        vJSON_JS["ButtonList"][pHeaderButton] = vButDef;
        updateButtonJSON2Form();
      }
    } else {
      console.log("Button ["+pHeaderButton+"] is a link");
      pHeaderButton = pHeaderButton.toLowerCase();
      if (existsPageJS(pHeaderButton)) {
        console.log("Button links to Page ['"+pHeaderButton+"']. Page exists");
      } else {
        var vNewPageHash = {
          "PAGE_ID": pHeaderButton,
          "PAGE_TITLE": "Title "+pHeaderButton,
          "page-type": "DefaultPage",
          "parent-id": "home"
        };
        vFailed = createPageJS(vNewPageHash);
        if (!vFailed) {
          vJSON_JS["PageList"][vNewPageID] = vNewPageHash;
          write2value("tPages", getPageListString());
          createPageSelect();
        };
      };
    };
  };
};

function getDefaultClassHash(pClass,pClassType) {
  console.log("getDefaultClassHash()");
  var vClassType = pClassType || "Default";
  pClass = reduceVarName(pClass);
  vClassType = reduceVarName(vClassType)
  var vRetClass = {};
  for (var i = 0; i < vDOM_ID.length; i++) {
    vRetClass[vDOM_ID[i]] = "";
  };
  //----SET CLASS TYPE---
  vJSON_JS["ClassType"][pClass] = vClassType;
  // Set ClassType of Class in JSON and other variables
  vRetClass["tClassname"] = pClass;
  vRetClass["sClassType"][pClass] = vClassType;
  vRetClass["tEMail"] = getValueDOM("tEMail") || "anonymous@example.com";
  vRetClass["tAuthor"] = getValueDOM("tAuthor") || "My Name";
  vRetClass["tDate"] = getDate();
  // "myMethod(p1,p2)" stores the code in vRetClass["MethodCode"]["myMethod"]
  // and stores the comment in vRetClass["MethodComment"]["myMethod"]
  vRetClass["AttribType"] = {};
  vRetClass["AttribDefault"] = {};
  vRetClass["AttribComment"] = {};
  vRetClass["MethodParameter"] = {};
  vRetClass["MethodReturn"] = {};
  vRetClass["MethodCode"] = {};
  vRetClass["MethodComment"] = {};
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
    console.log("["+k+"] Inherit Methods: "+vChain[k]);
    vInheritClass = getClassJSON(vChain[k]);
    inheritMethodeCode4Class(vClassJS,vInheritClass);
  };
};

function inheritMethodeCode4Class(pClassJS,pInheritJS) {
  console.log("inheritMethodCode()-Call");
  var vMethHash = pClassJS["MethodCode"];
  var vInheritHash = pInheritJS["MethodCode"];
  for (var iMeth in vInheritHash) {
    if (vInheritHash.hasOwnProperty(iMeth)) {
      //check if Method contains code
      if (reduceVarName(vInheritHash[iMeth]) == "") {
        console.log("Inherit Meth "+iMeth+"() as Interface - Code is empty");
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
  console.log("getClassJSON('"+vClassName+"')");
  if (vClassName != "") {
    if (top.vJSON_JS) {
      if (top.vJSON_JS.ClassList) {
        if (top.vJSON_JS.ClassList[vClassName]) {
          vRetClass = top.vJSON_JS.ClassList[vClassName];
        } else {
          vRetClass = getDefaultClassHash(vClassName);
          vJSON_JS["ClassList"][vClassName] = vRetClass;
          console.log("Class Create in getClassJSON('"+vClassName+"')");
        };
      } else {
        console.log("getClassJSON('"+vClassName+"') ClassList undefined");
        initClassJS(vClassName,null,"getClassJSON()");
      };
    } else {
      initClassJS(vClassName,null,"getClassJSON()");
      alert("getClassJSON('"+vClassName+"') vJSON_JS as Main Project DB is undefined");
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
  console.log("getSuperClassTypeJSON('"+pClassName+"') = '"+vSuperClassType+"'");
  return vSuperClassType;
};

function getInhertitChain(pClassName) {
  var vInheritance = {
                    "chain" : [pClassName],
                    "visited" : {pClassName:true}
              };
  var vSuperClassname = getSuperClassname4Class(pClassName);
  if (vSuperClassname != "") {
    getInhertitedClass(vSuperClassname,vInheritance);
  };
  // hash "visited" shows visited Classes in the inherit chain
  // this is necessary, to identify a loop in the chain
  // e.g. Class1 ->super-> Class2 ->super-> Class3 ->super->Class1 (revited)
  // Following the inherit chain will create an infinite loop,
  // visited helps to identify a revisted Class in the chain
  var vChain = (vInheritance["chain"]).join("->");
  console.log("Inherit Chain: "+vChain);
  return vInheritance;
};

function getInhertitedClass(pClassName,pInheritance) {
  // hash "visited" shows visited Classes in the inherit chain
  // this is necessary, to identify a loop in the chain
  // e.g. Class1 ->super-> Class2 ->super-> Class3 ->super->Class1 (revited)
  // the following "if" checks for the possible loop
  if (pInheritance["visited"][pClassName]) {
    var vLoopChain = (pInheritance["chain"]).join("->");
    alert("ERROR: Loop identified in Inheritance chain!\n"+vLoopChain);
  } else {
    // append pClass to the chain
    pInheritance["chain"].push(pClassName);
    // set this class as visited in the chain
    pInheritance["visited"][pClassName] = true;
    // check if this class has a superclass too
    var vSuperClassname = getSuperClassname4Class(pClassName);
    if (vSuperClassname != "") {
      // class has a superclass check the chain for superclass
      getInhertitedClass(vSuperClassname,pInheritance);
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
  console.log("Click New - create a new class after prompt");
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
      console.log("NEW CLASS "+vClassString);
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
    if (existsElementJS(vFile,vNewElementID)) {
      alert("Create New Element ["+vNewElementID+"] was NOT successful. Element exists already for file '"+vFile+"'!");
    } else {
      createElementJS(vFile,vNewElementID);
    }
  } else {
    console.log("ERROR: createNewElement('"+vFile+"') not successful, '"+vFile+"' does not exist in FileList.");
  }
};

function createElementJS(pFile,pElementID) {
  if (existsFileJS(pFile)) {
    if (existsElementJS(vFile,vNewElementID)) {
      console.log("Create New Element ["+pElementID+"] was NOT successful. Element exists already for file '"+pFile+"'!");
    } else {
      vJSON_JS["FileList"][vFile]["elements"][vNewElementID] = getDefaultElementString(vFile,vNewElementID);
      var vElemArrID = getElementNameArray();
      vElemArrID.push(pElementID);
      write2value("tElementIDs",vElemArrID.join("|"));
      createElementSelect();
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
    if (vJSON_JS["FileList"][vFile]["elements"]) {
      vHash = vJSON_JS["FileList"][vFile]["elements"];
    } else {
      vJSON_JS["FileList"][vFile]["elements"] = {};
      vHash = vJSON_JS["FileList"][vFile]["elements"];
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
}

function updateJSON2tClassList() {
  // update the Selectors sClassType in vJSON_JS["ClassList"] with ClassTypes defined in tClassList
  writeClassType2sClassList();
  // by calling createJSON2tClassList() any missing ClassType-Definitions are written in tClassList
  write2value("tClassList", createJSON2tClassList());
};

function createJSON2tClassList() {
  var vClassArr = vJSON_JS["ClassList"];
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
  var vClassTypeHash = vJSON_JS["ClassType"];
  var vClassList = vJSON_JS["ClassList"]
  for (var iClass in vClassTypeHash) {
    if (vClassTypeHash.hasOwnProperty(iClass)) {
      if (existsClassJS(iClass)) {
        vType = vClassList[iClass]["sClassType"] = vClassTypeHash[iClass];
      } else {
          console.log("wARNING: writeClassType2sClassList() Class '"+iClass+"' does not exist!");
      };
    };
  };
};

function createClassTypeString4Hash(pClassTypeHash) {
  var vClassTypeHash = pClassTypeHash || {}; //vJSON_JS["ClassType"];
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
    var vOldClassName = vJSON_JS["SelectedClass"];
    var vNewClassName = getValueDOM("tClassname");
    console.log("Rename: Clas '"+vOldClassName+"' to '"+vNewClassName+"'");
    if (vOldClassName != vNewClassName) {
      //check if new ClassName exists
      if (!existsClassJS(vNewClassName)) {
        // rename Selected ClassName
        vJSON_JS["SelectedClass"] = vNewClassName;
        // rename Class
        var vClasses = vJSON_JS["ClassList"];
        vClasses[vNewClassName] = vJSON_JS["ClassList"][vOldClassName];
        delete vClasses[vOldClassName];
        // update Class Select
        //write2value("tClassList",vClassString);
        updateJSON2tClassList();
        createClassSelect();
        console.log("Rename ClassName from '"+vOldClassName+"' to '"+vNewClassName+"' was successful");
      } else {
        alert("WARNING: ClassName '"+vNewClassName+"' already exists, rename operation cancelled!")
      };
    } else {
      alert("WARNING: ClassName  '"+vNewClassName+"' unchanged!");
    }
}

function initClassJS(pClass,pClassType,pCaller) {
  var vCaller = pCaller || "";
  console.log("initClassJS('"+pClass+"','"+pClassType+"') Caller="+vCaller);
  var vClassType = pClassType || getFormClassType4Class(pClass);
  if (!pClass) {
    console.log("Call: initClassJS(pClass) with pClass undefined");
  } else {
      initClassJS_do(pClass,vClassType);
      var vClassJS = vJSON_JS["ClassList"][pClass];
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
    console.log("initClassJS()-Call: Classname undefined");
  } else {
    if (!top.vJSON_JS) {
      var vError = "WARNING: initClassJS() [classes.js]: JSON Database 'vJSON_JS' does NOT exist, create as hash.";
      console.log(vError);
      top.vJSON_JS = {};
    } else {
      console.log("JSON Database 'vJSON_JS' exists.");
    };
    if (top.vJSON_JS["ClassType"]) {
      console.log("vJSON_JS['ClassType'] exists");
    } else {
      top.vJSON_JS["ClassType"] = {};
      console.log("vJSON_JS['ClassType'] created");
    };
    top.vJSON_JS["SelectedClass"] = pClass;
    initClassJS_undefined(pClass);
    if (top.vJSON_JS["ClassList"][pClass]) {
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
    if (top.vJSON_JS["ClassList"]) {
      //console.log("initClassJS_undefined('"+pClass+"') - vJSON_JS['ClassList'] exists");
    } else {
      top.vJSON_JS["ClassList"] = {};
      console.log("initClassJS_undefined('"+pClass+"') - vJSON_JS['ClassList'] created");
    };
    if (top.vJSON_JS["ClassList"][pClass]) {
      //console.log("Class '"+pClass+"' exists in JSON DB");
    } else {
      top.vJSON_JS["ClassList"][pClass] = {};
      console.log("Class '"+pClass+"' created");
    };
    var vID = "";
    var vHash = top.vJSON_JS["ClassList"][pClass];
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
          case "tDate":
            vHash[vID] = getDate();
          break;
          default:
            vHash[vID] = "";
        };
        //console.log("initClassJS_undefined('"+pClass+"') - ['"+vID+"'] created");
      };
    };
    var vArrID = ["AttribName","AttribDefault","AttribType","MethodName","MethodReturn","MethodCode","MethodComment"];
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
    console.log("existsClassJS(pClass)-Call with pClass undefined");
  } else {
    console.log("existsClassJS('"+pClass+"')");
    if (vJSON_JS) {
      if (vJSON_JS["ClassList"]) {
        if (vJSON_JS["ClassList"][pClass]) {
          vReturn = true;
          var vClassType = vJSON_JS["ClassType"][pClass] || "";
          console.log("Class '"+pClass+"' (Type: '"+vClassType+"') is a user-defined class.");
        };
      };
    };
    if (vReturn == false) {
      if (existsBasicClass(pClass)) {
        console.log("Class '"+pClass+"' is a basic class.");
        vReturn = true;
      };
    };
    if (vReturn == false) {
      console.log("Class '"+pClass+"' does NOT exist.");
    };
  };
  return vReturn
};



function existsBasicClass(pClass) {
  var vBasicClassHash = getBasicClassHash();
  return  vBasicClassHash.hasOwnProperty(pClass);
}

function createClassJS(pClass,pClassType,pCallerJS) {
  var vClassExists = false;
  if (pClass != "") {
    var vCallerJS = pCallerJS || "";
    console.log("createClassJS('"+pClass+"','"+pClassType+"') Caller="+vCallerJS);
    var vClassType = pClassType || getValueDOM("sClassType") || "";
    var vClassExists = existsClassJS(pClass);
    if (vClassExists) {
      //alert("Class '"+pClass+"' already exists!");
      console.log("Class '"+pClass+"' already exists!");
    } else {
      console.log("createClassJS('"+pClass+"')-Call: Create Class '"+pClass+"' with ClassTyp='"+vClassType+"' createClassJS()-Call");
      checkClassList(pClass);
      getDefaultClassHash(pClass,vClassType);
      //vClassJSON = vJSON_JS["ClassList"][pClass];
    };
  } else {
    console.log("createClassJS()-Call with empty pClass");
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
  if (vJSON_JS["ClassList"]) {
    console.log("checkClassList('"+pClass+"') created Class in JSON Database");
    vJSON_JS["ClassList"][pClass] = {};
    setClassTypeJSON(pClass,vClassType);
  } else {
    console.log("checkClassList('"+pClass+"') created (1) ClassList in JSON Database");
    vJSON_JS["ClassList"] = {};
    console.log("checkClassList('"+pClass+"') created (2) Class in JSON Database");
    vJSON_JS["ClassList"][pClass] = {};
    setClassTypeJSON(pClass,vClassType);
  };
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
    console.log("replaceAttributeDefinition()-Call Attribute '"+pAttribName+"' updated.");
  } else {
    console.log("Error: Attribute Name in replaceAttributeDefinition('"+pAttribName+"','"+pNewDefinition+"')");
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
      console.log("Select for '"+vName+"' Atttribute Type is undefined");
      vType = "Object";
    } else {
      console.log("Attribute '"+vName+"' has Type '"+vType+"'");
    };
    if (vValue && (vValue.replace(/[\s\t]/g,"") != "")) {
      console.log("Default Value of Atttribute '"+vName+"' is defined with value '"+vValue+"'");
    } else {
      vValue = "null";
      console.log("Default Value of Atttribute '"+vName+"' was NOT defined, set to '"+vValue+"'");
    };
    var vSuccess = createNewAttributeForm(vName,vType,vValue,vComment,vClass);
    //alert("");
    updateAttributesJS(); //jsondb.js:57 no code in function body
  }
};


function createNewAttributeForm(pName,pType,pValue,pComment,pClass) {
    var vClass = pClass || getSelectedClassID();
    console.log("createNewAttributeForm('"+pName+"','"+pType+"',"+pValue+",'"+pComment+"','"+vClass+"')");
    var vClassJS = getClassJSON();
    var vClassName = getSelectedClassID();
    var vAttrDef = pName + " = " + pValue;
    var vAttributes = document.fCreator.tAttributes;
    //var vAttribs = reduceVarName(vAttributes.value);
    var vAttribs = reduceVarName(vAttributes.value);
    getValueDOM("tAttributes");
    var vAttribs = reduceVarName(vAttributes.value);
    if (vAttribs == "") {
      vAttributes.value = vAttrDef;
    } else {
      vAttributes.value += "\n"+vAttrDef;
    };
    saveAttribJSON(pName,pType,pValue,pComment);
    //set the Selector "sAttribList" for the Attributes on the tab "Attributes"
    updateForm2JSON(vClassName);
    console.log("Set ['sAttribList'] as selected Attribute to '"+pName+"'");
    vClassJS["sAttribList"] = pName;
};

function createNewMethodJS(pClass) {
  var vClass = pClass || getSelectedClassID();
  console.log("createNewMethodJS('"+vClass+"')");
  var vClassJSON = getClassJSON(vClass);
  // get name of Attributes
  var vMethCall = getValueDOM("tMethodName");
  var vName = getName4Method(vMethCall);
  vName = reduceVarName(vName);
  if (vName == "") {
    console.log("createNewMethodJS() vMethodName='' no new Method-Call");
  } else if (existsMethodForm(vName)) {
    alert("Method '"+vName+"' already exists!\nPlease change name of method!");
    //var vMethHash = getMethodHash();
    //vMethHash[vName] = vMethCall;
  } else {
    //var vType = getValueDOM("sAttribTypeList");
    if (vClassJSON) {
      checkClassJSON(vClassJSON);
      vClassJSON["MethodParameter"][vName] = getMethodParameter4Call(vMethCall);
      vClassJSON["MethodReturn"][vName] = getMethodReturn4Call(vMethCall);
      vClassJSON["MethodCode"][vName] = "";
      vClassJSON["MethodComment"][vName] = "";
      var vMethodList = getValueDOM("tMethods");
      vMethodList = removeEmptyLines(vMethodList);
      var vCR = "\n";
      if (reduceVarName(vMethodList) == "") {
        vCR = "";
      };
      vMethodList += vCR + vMethCall;
      write2value("tMethods",vMethodList);
      createMethodSelect(); //dom.js:13
      updateMethodsJS();
    } else {
      console.log("ERROR: createNewMethodJS('"+vClass+"') vClassJSON of '"+vClass+"' undefined");
    }
  }
};

function getMethodParameter4Call(pMethCall) {
  var vParam = "";
  var vErrorCount = 0;
  if (pMethCall) {
    var vOpenBracketPos = pMethCall.indexOf("(");
     if (vOpenBracketPos > 0) {
       var vCloseBracketPos = pMethCall.lastIndexOf(")");
       if (vCloseBracketPos > 0) {
         if (vOpenBracketPos < vCloseBracketPos) {
           console.log("check '"+pMethCall+"' is well defined!");
           vParam = pMethCall.substring(vOpenBracketPos+1,vCloseBracketPos);
         } else {
           console.log("Closing Bracket before opening Bracket in '"+pMethCall+"'");
         };
       } else {
         vErrorCount++;
         console.log("ERROR: Method definition error!\n No closing bracket!\n"+pMethCall);
       };
     } else {
       vErrorCount++;
       console.log("ERROR: Method definition error!\n No opening bracket!\n"+pMethCall);
     }
  } else {
    console.log("ERROR: pMethCall in getMethodParameter4Call(pMethCall) undefined!");
  }
  return vParam;
}

function getMethodReturn4Call(pMethCall) {
  console.log("getMethodReturn4Call('"+pMethCall+"')");
  var vReturn = "";
  var vErrorCount = 0;
  if (pMethCall) {
    var vOpenBracketPos = pMethCall.indexOf("(");
     if (vOpenBracketPos > 0) {
       var vCloseBracketPos = pMethCall.lastIndexOf(")");
       if (vCloseBracketPos > 0) {
         if (vOpenBracketPos < vCloseBracketPos) {
           console.log("Parameter well defined for '"+pMethCall+"'");
           vReturn = pMethCall.substring(vCloseBracketPos+1,pMethCall.length);
           if (vReturn.indexOf(":")>=0) {
             vReturn = vReturn.substring(vReturn.indexOf(":")+1,vReturn.length)
           };
           vReturn = vReturn.replace(/\s/g,"");
           console.log("Return Class: '"+vReturn+"'");
         } else {
           console.log("Closing Bracket before opening Bracket in '"+pMethCall+"'");
         };
       } else {
         vErrorCount++;
         console.log("ERROR: Method definition error!\n No closing bracket!\n"+pMethCall);
       };
     } else {
       vErrorCount++;
       console.log("ERROR: Method definition error!\n No opening bracket!\n"+pMethCall);
     }
  } else {
    console.log("ERROR: pMethCall in getMethodReturn4Call(pMethCall) undefined!");
  }
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
  console.log("existsMethodForm('"+pName+"')");
  var vMethHash = getMethodHash();
  var vRet = false;
  if (vMethHash[pName]) {
    vRet = true
  };
  return vRet;
}

function getAttribNameArray() {
  console.log("Call: getAttribNameArray() parse Attributes from Form");
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
      //console.log("'=' found in Line '"+vLine+"'");
      vAttribArray[i] = reduceVarName(vLine.substr(0,vFound));
      console.log("New Setting vAttribArray[i]="+vAttribArray[i]);
    } else {
      console.log("'=' was not found '"+vAttribArray[i]+"' is undefined");
    };
  };
  return vAttribArray;
};

function getAttribTypeHash(pAttHash) {
  var vTypeHash = {};
  for (var iName in pAttHash) {
    if (pAttHash.hasOwnProperty(iName)) {
      vTypeHash[iName] = determineAttType(pAttHash[iName]);
      console.log("Type of '"+iName+"' is '"+vTypeHash[iName]+"'");
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

function updateAttribType4Form() {
  var vDefault = getValueDOM("tAttribDefault");
  var vType = determineAttType(vDefault);
  write2value("tAttribType",vType);
}

function updateAttribTypeComment4Form() {
  var vName = getValueDOM("tAttribName");
  var vDefault = getValueDOM("tAttribDefault");
  if (existsAttribForm(vName)) {
    console.log("updateAttribTypeComment4Form() - Variable exisits - no update of Attritbute Type and Comment");
  } else {
    var vComment = getComment4Attrib(vName,vDefault);
    var vType = determineAttType(vDefault);
    write2value("tAttribType",vType);
    write2value("tAttribComment",vComment);
  }
}

function getComment4Attrib(pName,pValue) {
  return "Attribute: '" +pName + "' Type: '"+ determineAttType(pValue)+"' stores ... ";
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
    if (vJSON_JS["ClassList"]) {
      if (vJSON_JS["ClassList"][pClassName]) {
        vHash = vJSON_JS["ClassList"][pClassName]["AttribDefault"];
      } else {
        console.log("getJSON2AttribDefaultHash() - vJSON_JS['ClassList']['"+pClassName+"'] does not exist!");
      }
    } else {
      console.log("getJSON2AttribDefaultHash() - vJSON_JS['ClassList'] does not exist!");
    };
    return vHash;
};

function getForm2AttribDefaultHash(pClassName) {
  var vClassName = pClassName || getValueDOM("tClassname");
  var vClassNameForm = getValueDOM("tClassname");
  var vAttributes = getValueDOM("tAttributes");
  //console.log("getForm2AttribDefaultHash('"+vClassName+"')");
  //console.log(" pAttributes='"+pAttributes+"'");
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
  //console.log("getAttribDefaultHash(pAttributes)");
  //console.log(" pAttributes='"+pAttributes+"'");
  var vAttrib = pAttributes || getValueDOM("tAttributes");
  vAttrib = removeEmptyLines(vAttrib);
  var vAttribArray    = vAttrib.split(/\n/);
  var vLine = "";
  var vVar = "";
  var vValue = "";
  var vAttribHash = {};
  //var vRegEx = /([A-Za-z_0-9]+)*[\w\s$]*[=] (.*[\w\s,$]*\))/;
  for (var i = 0; i < vAttribArray.length; i++) {
    vLine = vAttribArray[i];
    vFound = vLine.indexOf("=");
    if (vFound > 0) {
      vVar = reduceVarName(vLine.substr(0,vFound+1))
      vValue = vLine.substr(vFound+1,vLine.length);
      if (vVar != "") {
        vAttribHash[vVar] = vValue;
      } else {
        console.log("getAttribDefaultHash()-Call - vLine='"+vLine+"' undefined");
      }
    }
    //vRegEx.exec(vLine);
    //vAttribArray[i] = vRegEx.$2;
  };
  return vAttribHash;
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

function getMethodArray() {
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

function getName4Method(pMethodWithParams) {
  var vLine = getName4SepChar("(",pMethodWithParams);
  // reduceVarName() removes all non-alphanumeric chars from string
  if (reduceVarName(vLine) != "") {
    console.log("getName4Method('"+pMethodWithParams+"') MethodName='"+vLine+"'");
  } else {
    console.log("getName4Method() - empty variable name");
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
          //console.log("getMethodHash() "+vName+" = " + vMethodArray[i]);
        };
    };
  };
  return vRetHash;
};

function getMethodNameArray() {
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
    if (vJSON_JS["ClassType"] && vJSON_JS["ClassType"][pClass]) {
      vClassType = vJSON_JS["ClassType"][pClass];
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
    console.log("setClassTypeJSON('"+pClass+"','"+vClassType+"')");
    if (vJSON_JS["ClassType"]) {
      vJSON_JS["ClassType"][pClass] = vClassType;
    } else {
      console.log("WARNING: setClassTypeJSON('"+pClass+"','"+vClassType+"') ClassType for Class '"+pClass+"' does not exist in ClassType-Hash");
    };
    //---Set the selected ClassType for Class in the Tab Class--
    if (existsClassJS(pClass)) {
      vJSON_JS["ClassList"][pClass]["sClassType"] = pClassType;
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
  var vClassList = vJSON_JS["ClassList"];
  var vClassString = "";
  var vCR = "";
  for (var iClassName in vClassList) {
    if (vClassList[iClassName]) {
      if (reduceVarName(iClassName) != "") {
        vClassString += vCR + iClassName;
        var vClassType = vJSON_JS["ClassType"][iClassName];
        // set Selector Variable for the ClassType
        vClassList[iClassName]["sClassType"] = vClassType;
        if (vClassType && vClassType != "") {
          vClassString += " = "+ vClassType;
        };
        console.log("getJSON2ClassString() - iClassName='"+iClassName+" = "+vClassType+"'");
        vCR = "\n";
      } else {
        console.log("getJSON2ClassString() - iClassName='"+iClassName+"' empty after reduceVarName()-Call!");
      }
    } else {
      console.log("getJSON2ClassString() - iClassName='"+iClassName+"' undefined!");
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
  console.log("getButtonArray() vButtonLineArr.length="+vButtonLineArr.length);
  var vArr = [];
  var vButtArr;
  for (var i = 0; i < vButtonLineArr.length; i++) {
    vButtArr = (vButtonLineArr[i]).split("|");
    //vHash = getRecordLine2Hash(vButtonRECDEF, vButtonLineArr[i]);
    console.log("getButtonArray(): vButtArr["+i+"]='"+vButtArr[0]+"'");
    var vButtonID = vButtArr[0] || "";
    if (vButtonID != "") {
      vArr.push(vButtonID);
    };
  };
  return vArr;
};

function getButton1EmptyArray() {
  var vArr = getButtonArray();
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

function getAllFilesArray() {
  var vHTMLfilesString = getValueDOM("tHTMLfiles");
  return getString2Array(vHTMLfilesString);
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
        console.log("check "+vMethodArray[i]+" is well defined!");
        vRetArray.push(vMethodArray[i]);
      };
		} else {
      var vCheckMethod = reduceMethodName(vMethodArray[i]);
      if (vCheckMethod.length >2) {
        vErrorCount++;
        console.log("ERROR: Method definition error!\n No opening bracket!\n"+vMethodArray[i]);
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
    //console.log("getBasisClassDefHash() - Var='"+vVar[0]+"' value='"+vVar[1]+"'");
    if (reduceVarName(vVar[0]) != "") {
      vClassHash[reduceVarName(vVar[0])] = vVar[1].replace(/^\s+/,"");
    } else {
      console.log("getBasicClassHash()-Call: Empty Name of Variable before '='");
    }
  };
  return vClassHash;
}

function splitAtEqual(pString) {
  return pString.split("=");
}

function updateBasicClasses() {
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
      console.log("updateBasicClasses() - Empty BasicClass Name");
    };
  }
};

function updateClasses() {
  // (1) creates non existing classes in tClassList,
  // (2) identifies the ClasType in the ClassDefLine e.g. "App = Interface",
  // (3) sets the ClassType in ClassList vJSON_JS["ClassType"]["App"] = "Interface",
  // (4) sets the Selector of the ClassType i.e. DOM-Selector "sClassType" vJSON_JS["ClassList"]["App"]["sClassType"] = "Interface",
  // (5) and removes empty line in tClassList textarea in Tab "Files/Classes"
  var vClassTypeHash = getForm2ClassTypeHash();
  console.log("updateClasses()-Call");
  updateBasicClasses();
  vJSON_JS["BasicClasses"] = getBasicClassHash();
  var vClassList = getValueDOM("tClassList");
  // document.fCreator.tClassList.value;
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
    createClassJS(vClassName,vClassType,"updateClasses(1)");
    // Set the ClassType in vJSON_JS
    console.log("updateClasses() ClassID='"+vClassName+"' ClassTypeID='"+vClassType+"'\nLINE='"+vClassArray[i]+"'");
    setClassTypeJSON(vClassName,vClassType);
    // get the ClassHash from JSON
    vClassHashJSON = vJSON_JS["ClassList"][vClassName];
    if (vClassName != "") {
      checkClassJSON(vClassHashJSON);
      vOptionArray.push(vClassArray[i]);
      // if new classes are found in tClassList textarea, create them
      // createClassJS()-Call is dependent on the existance of JSON in ClassList
      // i.e. vJSON_JS["ClassList"][vClassName];
      if (vClassHashJSON) {
        console.log("Class '"+vClassName+"' exists for updateClasses()-Call.\nDefinition '"+vClassArray[i]+"'");
      } else {
        createClassJS(vClassName,vClassType,"updateClasses(2)");
      };
      // The following setting must be called after createClassJS,
      // otherwise the class might not be available in vJSON_JS.
      // Next command will set the selector for the ClassType properly.
      // This value is used, when users change the selected class and
      // the selector ClassType in DOM should show the selected ClassType
      setClassTypeJSON(vClassName,vClassType);
      //vJSON_JS["ClassList"][vClassName]["sClassType"] = vClassType;
    };
  };
  // create the Class Selector Option of all existing classes
  var vOptions = createOptions4Array(vOptionArray);
  // set SelectSelect Op
  write2value("sClassList",vJSON_JS["SelectedClass"]);
  //write2value("tClassList",vOptionArray.join("\n"));
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
  console.log("clearForm4Class()");
  for (var i = 0; i < vDOM_ID.length; i++) {
    write2value(vDOM_ID[i],"");
    if (vTYPE_ID[i] == "Textarea") {
      console.log("vDOM_ID["+i+"]='"+vDOM_ID[i]+"' is a TEXTAREA");
      write2innerHTML(vDOM_ID[i],"");
    };
  };
};
