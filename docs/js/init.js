//#################################################################
//# Javascript Code Generator
//# GNU Public License V3 - OpenSource
//# created with JavaScript Class Generator by Engelbert Niehaus
//# 2012 University Koblenz-Landau
//#################################################################
//var vDOM_ID = ["tClassname","tSuperClassname","tAuthor","tEMail","tAttributes","tMethods"];
vDOM_ID.push("tClassname");
vTYPE_ID.push("String");
vDOM_ID.push("tSuperClassname");
vTYPE_ID.push("String");
vDOM_ID.push("tAuthor");
vTYPE_ID.push("String");
vDOM_ID.push("tEMail");
vTYPE_ID.push("EMail");
vDOM_ID.push("tAttributes");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tMethods");
vTYPE_ID.push("Textarea");
vDOM_ID.push("sAttribList");
vTYPE_ID.push("Select");
vDOM_ID.push("tAttribName");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribType");
vTYPE_ID.push("String");
vDOM_ID.push("tAttribComment");
vTYPE_ID.push("String");
vDOM_ID.push("sAttribDefault");
vTYPE_ID.push("String");
vDOM_ID.push("sAttribTypeList");
vTYPE_ID.push("Select");
vDOM_ID.push("tMethodName");
vTYPE_ID.push("String");
vDOM_ID.push("tMethodComment");
vTYPE_ID.push("Textarea");
vDOM_ID.push("sMethodList");
vTYPE_ID.push("Select");
vDOM_ID.push("tArrayLoop");
vTYPE_ID.push("Textarea");
vDOM_ID.push("tMethodLoop");
vTYPE_ID.push("String");
//vDOM_ID.push("");

function initCodeCreator() {
  // if Local Storage is supported by Browser try to Load JSON DB with Classes
  console.log("initCodeCreator()-Call");
  var vDB = null;
  var vSelectedClass = getValueDOM("tClassname");
  if (typeof(Storage) != "undefined") {
     //alert("Local Storage");
     loadLocalStorage("dom");
     vDB = loadLocalStorage("json");
     if (vDB) {
       console.log("JSON Database exists in Local Storage");
       top.vJSON_JS = vDB;
       vSelectedClass = top.vJSON_JS["SelectedClass"];
       console.log("Selected Class ["+vSelectedClass+"] in JSON Database");
      } else {
        top.vJSON_JS["init_date"] = getDate();
        initFormClass(vSelectedClass);
        initFormClassList();
        initFormSelectors();
        console.log("Read Class from Form and add to vJSON_JS");
      };
  } else {
      alert("Sorry, your browser does not support Local Storage...");
  };
  updateClassSelector();
  //document.fCreator.sClassList.value;
  initClassJS(vSelectedClass);
  updateClasses();
  vClassJSON = vJSON_JS["ClassList"][vSelectedClass];
  //initLocalDB("vJSON_JS",pJSONDB)
};

function initFormClassList() {
  console.log("initFormClassList()");
   var vClassArr = getClassArray(); //read from tClassList in  classes.js 413
   for (var i = 0; i < vClassArr.length; i++) {
     initClassJS(vClassArr[i]);
   };
};

function initFormSelectors() {
  // get current ClassName
  var vClassArr = [];
  var vClassList = vJSON_JS["ClassList"];
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClassArr.push(iClass);
    };
  };
  //ClassList update
  //document.fCreator.tClassList += "\n"+vClass;
  write2value("tClassList",vClassArr.join("\n"));
  //var vClass = getValueDOM("tClassname");
  //initClassJS(vClass);
  createClassSelect(vClassArr);
};

function initFormClass(pClass) {
  var vSuperClass = getValueDOM("tSuperClassname");
  if (vSuperClass && vSuperClass != "") {
    initClassJS(vSuperClass);
  };
  updateForm2JSON(pClass); // jsondb.js:157
  createAttribTypeSelect();
  createAttribSelect();
  createMethodSelect(); //dom.js:13
}
