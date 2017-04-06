
function insertCommentReturn() {
  var vMethName = getValueDOM("sMethodList") || "";
  console.log("insertCommentReturn() vMethName='"+vMethName+"'");
  var vCode = getEditorValue("iMethodCode") || "";
  var vClassJS = getClassJSON();
  if (vMethName != "") {
    var vReturn = vClassJS["MethodReturn"][vMethName] || "";
    vCode = getReturnCodeInit(vMethName,vReturn,vCode)
  };
  write2editor("MethodCode",vCode);
};

function appendLoopDefinition() {
  // get Array or Hash
  var vArrayType = getValueDOM("sArrayType");
  // get Template
  var vTemplate = "";
  if (vArrayType == "Array") {
    vTemplate = getValueDOM("tTplLoopArray");
  } else {
    vTemplate = getValueDOM("tTplLoopHash");
  };
  // Replace ArrayName
  var vArrayName = getValueDOM("tArrayLoop");
  if (vArrayName == "") {
    vArrayName = "vMy"+vArrayType;
    write2value("tArrayLoop",vArrayName);
  };
  vTemplate = replaceString(vTemplate,"___LOOPARRAY___",vArrayName);
  // Replace MethodCall
  var vMethodName = getValueDOM("tMethodLoop");
  if (vMethodName == "") {
    vMethodName = "myMethod(pPar1,pPar2)";
    write2value("tMethodLoop",vMethodName);
  };
  vTemplate = replaceString(vTemplate,"___LOOPMETHOD___",vMethodName);
  insert2editor("MethodCode","\n"+vTemplate);
  //document.fCreator.tMethodCode.value +="\n"+vTemplate;
};
