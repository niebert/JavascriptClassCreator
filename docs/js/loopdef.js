
function appendLoopDefinition() {
  // get Array or Hash
  var vArrayType = getValueDOM("sArrayType");
  // get Template
  var vTemplate = "";
  if (vArrayType == "Array") {
    vTemplate = getValueDOM("tTplLoopArray");
  } else {
    vTemplate = getValueDOM("tTplLoopHash");
  }
  // Replace ArrayName
  var vArrayName = getValueDOM("tArrayLoop");
  vTemplate = replaceString(vTemplate,"___LOOPARRAY___",vArrayName);
  // Replace MethodCall
  var vMethodName = getValueDOM("tMethodLoop");
  vTemplate = replaceString(vTemplate,"___LOOPMETHOD___",vMethodName);
  document.fCreator.tMethodCode.value +="\n"+vTemplate;
};
