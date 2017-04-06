
function getWinOpener() {
  var vWinOpener = window.opener;
  return vWinOpener;
};

function getClassPos() {
  var vClassPosition = {
      "count": 0,
      "width": vSize.width,
      "offset":{"x":10,"y":50},
      "left":{"x":10,"y":10},
      "right":{"x":10,"y":10},
      "lastclass":{
          "size": {"width":50,"heigth":30},
          "position": {"x": 10, "y":10 }
      },
      "position": {"x": 0, "y":0 }
    };
    return vClassPosition;
};

function getPaperSize(pClassPos) {
  var vSizeHash = {
    width: 800,
    height: 600
  };
  var xyAdd = 300;
  if (pClassPos) {
    vSizeHash.width += xyAdd;
    vSizeHash.height = pClassPos.position.y + xyAdd;
  };
  return vSizeHash;
};

function getSelectedClassName() {
  var vClassName = "";
  if (vJSON_JS["SelectedClass"]) {
    vClassName = vJSON_JS["SelectedClass"];
  };
  return vClassName;
};

function getSelectedClassJSON() {
  var vSelectedClass = getSelectedClassName();
  return getClassJSON(vSelectedClass);
};

function getClassJSON(pClassName) {
  var vClass = pClassName || getSelectedClassName();
  var vRetClassJSON = {}; //Undefined Variable
  if ((vSelectedClass != "") && vJSON_JS["ClassList"] && vJSON_JS["ClassList"][vClass]) {
    vRetClassJSON = vJSON_JS["ClassList"][vClass];
  } else {
    if (vClass != "") {
      createClassJS(vClass);
      vRetClassJSON = vJSON_JS["ClassList"][vClass];
    } else {
      console.log("ERROR: getClassJSON(pClassName)  pClassName undefined");
    };
  };
  return vRetClassJSON;
};

function createAllClasses(pClassList) {
  var vClasses = {};
  var vBoolHash = createClassHashBoolean(pClassList);
  var vSelectedClass = getSelectedClassName();
  var vSuperClass = "";
  var vCentered = true;
  if (vSelectedClass != "") {
    var vClassJS = getSelectedClassJSON(vSelectedClass);
    vSuperClass = vClassJS["tSuperClassname"] || "";
    if (vSuperClass != "") {
      vClasses[vSuperClass] = createDiagramClass(vSuperClass,vCentered);
      vBoolHash[vSuperClass] = true;
    };
    vClasses[vSelectedClass] = createDiagramClass(vSelectedClass,vCentered);
    vBoolHash[vSelectedClass] = true;
  };
  console.log("Create Selected Class: '"+vSelectedClass+"' with SuperClass='"+vSuperClass+"'");

  vClasses = createMissingClasses(vClasses,pClassList,vBoolHash);
  return vClasses;
};

function createMissingClasses(pClasses,pClassList,pBoolHash) {
  var vBoolHash = pBoolHash || {};
  var vClassList = pClassList || {};
  var vClasses = pClasses || {};
  var vClassExists = false;
  var vCentered = false;
  for (var iClass in vClassList) {
    if (vBoolHash.hasOwnProperty(iClass)) {
      vClassExists = vBoolHash[iClass];
    } else {
      vClassExists = false;
    };
    if (vClassExists) {
      console.log( "Class: '"+iClass+"' exists");
    } else {
      console.log( "Class: '"+iClass+"' misssing");
    }
    if ((!vClassExists) && (vClassList.hasOwnProperty(iClass))) {
      vClasses[iClass] = createDiagramClass(iClass,vCentered)
    };
  };
  return vClasses;
};

function createDiagramClass(pClass,pCentered) {
  //get the ClassUML form vJSON_JS of parent window
  var vClassUML = getClassUML(pClass);
  // determine the UML Type of the Class "Abstract" "Interface" "Red Class", ...
  var vTypeUML = vClassTypeHash[pClass] || "";
  console.log("Class '"+pClass+"' has Type '"+vTypeUML+"'");
  return createClass4UML(vTypeUML,vClassUML,pCentered);
}

function createClassHashBoolean(pClassList) {
  return createClassHashInit(pClassList,false);
};

function createClassHashInit(pClassList,pInit) {
  var vClassList = pClassList || {};
  var vClasses = {};
  var vInit = pInit || null;
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClasses[iClass] = vInit;
    };
  };
  return vClasses;
};

function getClassUML(pClass) {
    return {
      "name":pClass,
      "attributes": getAttributesUML(pClass),
      "methods": getMethodsUML(pClass),
    }
}

function getAttributesUML(pClass) {
  console.log("getAttributesUML('"+pClass+"')");
  var vClassList = vJSON_JS["ClassList"];
  var vAttribs = [];
  var vAttLine = "";
  if (vClassList[pClass]) {
    var vAttType = {};
    if (vClassList[pClass]["AttribType"]) {
      var vAttType = vClassList[pClass]["AttribType"];
    } else {
      console.log("getAttributesUML('"+pClass+"'): 'AttribType' undefined");
    };
    var vAttDefault = {};
    if (vClassList[pClass]["AttribDefault"]) {
      var vAttType = vClassList[pClass]["AttribDefault"];
    } else {
      console.log("getAttributesUML('"+pClass+"'): 'AttribDefault' undefined");
    };
    for (var iAtt in vAttType) {
      vAttLine = iAtt;
      if (vAttType.hasOwnProperty(iAtt)) {
        if (vAttType[iAtt] != "") {
          vAttLine += " : "+vAttType[iAtt];
        };
        if (vAttDefault[iAtt]) {
          vAttLine += " = "+vAttDefault[iAtt];
        };
      };
      vAttribs.push(vAttLine);
    };
  };
  return vAttribs;
};

function getMethodsUML(pClass) {
  console.log("getMethodsUML('"+pClass+"')");
  var vMeths = [];
  if (vClassList[pClass]["tMethods"]) {
    var vMethString = vClassList[pClass]["tMethods"];
    vMethString = removeEmptyLines(vMethString);
    vMeths = vMethString.split("\n");
  };
  for (var i = 0; i < vMeths.length; i++) {
    vMeths[i] = "+ "+vMeths[i];
  };
  return vMeths;
};

function logJSON(pJSON) {
  console.log(JSON.stringify(pJSON,null,4));
}

//======================================
//=== GENERALIZATIONS
//======================================

function createAllGeneralizations() {
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      var vSourceID = classes[iClass].id;
      //get the ClassUML form vJSON_JS of parent window
      vSuperClass = vClassList[iClass]["tSuperClassname"];
      //----GENERALIZATION-----
      if (vSuperClass && (vSuperClass != "")) {
        if (classes.hasOwnProperty(vSuperClass)) {
          vTargetID = classes[vSuperClass].id;
          vRel = new uml.Generalization({ source: { id: vSourceID }, target: { id: vTargetID }});
          relations.push(vRel);
          console.log("GENERALIZATION:\n["+iClass+"] vSourceID='"+vSourceID+"'\n["+vSuperClass+"] vTargetID='"+vTargetID+"'");
        };
      };
    };
  };
};

//======================================
//=== AGGREGATIONS
//======================================

function createClassHash4Aggregation(pClassList) {
  var vClassList = pClassList || {};
  var vClasses = {};
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClasses[iClass] = {};
      for (var iTargetClass in vClassList) {
        vClasses[iClass][iTargetClass] = false;
      }
    };
  };
  return vClasses;
};

function getAggregationHash() {
  var vSourceID = "";
  var vTargetID = "";
  var vAggHash = createClassHash4Aggregation(vClassList);
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vSourceID = classes[iClass].id;
      vHash = vClassList[iClass]["AttribType"];
      //logJSON(vHash);
      for (var iAttribType in vHash) {
        if (vHash.hasOwnProperty(iAttribType)) {
          // Check if AttribType is a defined Class
          var vAttribType = vHash[iAttribType];
          if (vClassList.hasOwnProperty(vAttribType)) {
            vTargetID = classes[vAttribType].id;
            vAggHash[iClass][vAttribType] = vTargetID;
            console.log("AGGREGATION: found \n["+iClass+"] vSourceID='"+vSourceID+"'\n["+vAttribType+"] vTargetID='"+vTargetID+"'");
          };
        };
      };
    };
  };
  return vAggHash
};

function createAllAggregations() {
  var vSourceID = "";
  var vTargetID = "";
  var vAggHash = getAggregationHash();
  for (var iClass in vAggHash) {
    if (vAggHash.hasOwnProperty(iClass)) {
      vSourceID = classes[iClass].id;
      for (var vTargetClass in vAggHash[iClass]) {
        if (vAggHash[iClass][vTargetClass]) {
          vTargetID = classes[vTargetClass].id;
          vRel = new uml.Composition({ source: { id: vTargetID }, target: { id: vSourceID }});
          relations.push(vRel);
          console.log("AGGREGATION: defined \n["+iClass+"] vSourceID='"+vSourceID+"'\n["+vTargetClass+"] vTargetID='"+vTargetID+"'");
        };
      };
    };
  };
};

//======================================
//=== ASSOCIATIONS
//======================================

function setAssociationUML(pSourceBool,pTargetBool) {
  if (pSourceBool && pTargetBool) {
    setAssCircle()
  } else if (pSourceBool) {
    setAssCircle2Source()
  } else {
    setAssCircle2Target()
  };
};


function createClassHash4Association(pClassList) {
  var vClassList = pClassList || {};
  var vClasses = {};
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      vClasses[iClass] = {};
      for (var iTargetClass in vClassList) {
        vClasses[iClass][iTargetClass] = false;
      };
    };
  };
  return vClasses;
};

function getAssociationHash() {
  var vSourceID = "";
  var vTargetID = "";
  var vAssHash = createClassHash4Association(vClassList);
  for (var iClass in vClassList) {
    if (vClassList.hasOwnProperty(iClass)) {
      // check all classes
      vSourceID = classes[iClass].id;
      console.log("Search for Target Associations in MethodParameter");
      // fetch MethodParameter
      // ..., "MethodParameter": {
      //           "init": "pParent:Window",
      //           "create": "pLI:ListInterface",
      //           "link2dom": "pVariable:String,pDOMID:Integer",
      //           "load": "pFileName:String",
      //           "save": "pContent:DOMVar,pMatrix:Matrix"
      //       },
      //
      vMethParHash = vClassList[iClass]["MethodParameter"];
      for (var iMethPar in vMethParHash) {
        // "save": "pContent:DOMVar,pMatrix:Matrix"
        // iMethPar="save"
        if (vMethParHash.hasOwnProperty(iMethPar)) {
          // Check if AttribType is a defined Class
          var vMethPar = vMethParHash[iMethPar];
          // vMethPar = "pContent:DOMVar,pMatrix:Matrix"
          var vArr = vMethPar.split(",");
          // vArr = ["pContent:DOMVar","pMatrix:Matrix"]
          for (var i = 0; i < vArr.length; i++) {
            // vArr[i] = "pContent:DOMVar"
            vDefArr = vArr[i].split(":");
            // vDefArr = "pContent","DOMVar"
            if (vDefArr.length == 2) {
              vTargetClass = vDefArr[1];
              //vTargetClass = "DOMVar"
              if (vClassList.hasOwnProperty(vTargetClass)) {
                vAssHash[vTargetClass][iClass] = true;
                vTargetID = classes[vTargetClass].id;
                console.log("ASSOCIATION: (Parmeter) \n["+iClass+"] vSourceID='"+vSourceID+"'\n["+vTargetClass+"] vTargetID='"+vTargetID+"'");
              }
            }
          };
          console.log("Search for Source Associations in MethodReturn");
          vMethReturnHash = vClassList[iClass]["MethodReturn"];
          var vRetClass = "";
          for (var iMethRet in vMethReturnHash) {
            if (vMethReturnHash.hasOwnProperty(iMethRet)) {
              vRetClass = vMethReturnHash[iMethRet];
              if ((vRetClass != "") && (vClassList.hasOwnProperty(vRetClass))) {
                vAssHash[vTargetClass][iClass] = true;
                vTargetID = classes[vTargetClass].id;
                console.log("ASSOCIATION: (Result) \n["+iClass+"] vSourceID='"+vSourceID+"'\n["+vTargetClass+"] vTargetID='"+vTargetID+"'");
              };
            };
          };
        };
      };
    };
  };
  return vAssHash;
};

function createAllAssociations() {
  var vSourceID = "";
  var vTargetID = "";
  var vSourceBool = false;
  var vTargetBool = false;
  var vAssHash = getAssociationHash();
  for (var iClass in vAssHash) {
    if (vAssHash.hasOwnProperty(iClass)) {
      vSourceID = classes[iClass].id;
      for (var vTargetClass in vAssHash[iClass]) {
        if (vAssHash[iClass][vTargetClass]) {
          // define on which ends of Association CIRCLES are visible
          vSourceBool = vAssHash[vTargetClass][iClass];
          vTargetBool = vAssHash[iClass][vTargetClass];
          setAssociationUML(vSourceBool,vTargetBool);
          vTargetID = classes[vTargetClass].id;
          vRel = new uml.Association({ source: { id: vTargetID }, target: { id: vSourceID }});
          relations.push(vRel);
          console.log("ASSOCIATION: defined \n["+iClass+"] vSourceID='"+vSourceID+"'\n["+vTargetClass+"] vTargetID='"+vTargetID+"'");
          // relataion is generated - avoid double generation
          vAssHash[iClass][vTargetClass] = false;
          vAssHash[vTargetClass][iClass] = false;
        };
      };
    };
  };
}

function createAllRelations(pShowGen,pShowAgg,pShowAss) {
  console.log("createAllRelations('"+pShowGen+"','"+pShowAgg+"','"+pShowAss+"')");
  if (pShowGen > 0) {
    console.log("Show GENERALIZATIONS");
    createAllGeneralizations();
  } else {
    console.log("Hide GENERALIZATIONS");
  };
  if (pShowAgg > 0) {
    console.log("Show AGGREGATIONS");
    createAllAggregations();
  } else {
    console.log("Hide AGGREGATIONS");
  };
  if (pShowAss > 0) {
    console.log("Show ASSOCIATIONS");
    createAllAssociations();
  } else {
    console.log("Hide ASSOCIATIONS");
  };
};

function setAssCircle() {
  joint.shapes.uml.Association = joint.dia.Link.extend({
      defaults: {
          type: 'uml.Association',
          attrs: {
             '.marker-source': { d: 'M 0 0 a 5 5 0 1 0 0 1', 'stroke-width': 0, fill: '#111111' },
             '.marker-target': { d: 'M 0 0 a 5 5 0 1 0 0 1', 'stroke-width': 0, fill: '#111111' }
          }
      }
  });
};


function setAssCircle2Source() {
  joint.shapes.uml.Association = joint.dia.Link.extend({
      defaults: {
          type: 'uml.Association',
          attrs: {
             '.marker-source': { d: 'M 0 0 a 5 5 0 1 0 0 1', 'stroke-width': 0, fill: '#111111' }
        }
      }
  });
};

function setAssCircle2Target() {
  joint.shapes.uml.Association = joint.dia.Link.extend({
      defaults: {
          type: 'uml.Association',
          attrs: {
             '.marker-target': { d: 'M 0 0 a 5 5 0 1 0 0 1', 'stroke-width': 0, fill: '#111111' }
        }
      }
  });
};
//------------------------------------------------------
  var vShowGeneralizations = "show";
  var vShowAggregations = "show";
  var vShowAssociations = "show";

  var graph = new joint.dia.Graph();

  // Diagram Type of JointJS is set UML
  var uml = joint.shapes.uml;
  // getWinOpener() is defined in "classes/getdata.js"

  var vWinOpener = getWinOpener() || {};
  var vWinOpenerDefined = false;
  // vWinOpener is the Window of JavascriptClassGenerator
  var vJSON_JS = {};
  var vClassList = {"Undefined":{"tClassname":"Undefined_Class"}};
  console.log("Default: GEN="+vShowGeneralizations+" AGG="+vShowAggregations+" ASS="+vShowAssociations);
  try {
    vJSON_JS = vWinOpener.vJSON_JS;
    vClassList = vJSON_JS["ClassList"];
    vWinOpenerDefined = true;
    //---Check UML Display Settings in Parent Window----
    vShowGeneralizations = vWinOpener.getValueDOM("sShowGeneralizations");
    vShowAggregations    = vWinOpener.getValueDOM("sShowAggregations");
    vShowAssociations    = vWinOpener.getValueDOM("sShowAssociations");
  } catch(err) {
      console.log(err.message);
      vWinOpenerDefined = false;
  };
  console.log("Form Settings: GEN="+vShowGeneralizations+" AGG="+vShowAggregations+" ASS="+vShowAssociations);
  var vShowGen = 1;
  var vShowAgg = 1;
  var vShowAss = 1;
  if (vShowGeneralizations == "hide") {
    vShowGen = 0
  };
  if (vShowAggregations == "hide") {
    vShowAgg = 0
  };
  if (vShowAssociations == "hide") {
    vShowAss = 0
  };
  // The main class database is defined by vJSON_JS
  // map that to local window variable vJSON_JS
  var vClassTypeHash = vJSON_JS["ClassType"] || {"Undefined":"Interface"};
  var vClassUML = null;
  var vClasses = {};
  var vSize = getPaperSize();
  // ---- vClassPos -----
  // vClassPos is a virtual Cursor of the UML canvas
  // that supports placing the next UML element
  var vClassPos = getClassPos()
  // {
  //     "count": 0,
  //     "width": 800,
  //     "offset":{"x":10,"y":50},
  //     "left":{"x":10,"y":10},
  //     "right":{"x":10,"y":10},
  //     "lastclass":{
  //         "size": {"width":50,"heigth":30},
  //         "position": {"x": 10, "y":10 }
  //     },
  //     "position": {"x": 0, "y":0 }
  //   };

  // Generate All Classes
  var classes = createAllClasses(vClassList);

  var vSelectedClass = vWinOpener.vJSON_JS["SelectedClass"] || "";

  var papersize = getPaperSize(vClassPos);


  var paper = new joint.dia.Paper({
      el: $('#paper'),
      width: papersize.width,
      height: papersize.height,
      gridSize: 1,
      model: graph
  });


  // Add a circle at the end of the UML Association with the following command
  setAssCircle2Target();
  joint.shapes.uml.Association = joint.dia.Link.extend({
      defaults: {
          type: 'uml.Association',
          attrs: {
             '.marker-target': { d: 'M 0 0 a 5 5 0 1 0 0 1', 'stroke-width': 0, fill: '#111111' }
        }
      }
  });

  _.each(classes, function(c) { graph.addCell(c); });

  var relations = [];

  //------- create RELATIONS --------
  var vSuperClass = "";
  var vHash = null;
  var vRel = null;
  var vSourceID = "";
  var vTargetID = "";
  // create Relations: GENERALIZATION, AGGREGATION, ASSOCIATIONS
  if (vWinOpenerDefined) {
    createAllRelations(vShowGen,vShowAgg,vShowAss);
  } else {
    console.log("vWinOpener is undefined - createAllRelations() NOT performed");
  };


      // new uml.Generalization({ source: { id: classes.man.id }, target: { id: classes.person.id }}),
      // new uml.Generalization({ source: { id: classes.woman.id }, target: { id: classes.person.id }}),
      // new uml.Implementation({ source: { id: classes.person.id }, target: { id: classes.mammal.id }}),
      // new uml.Aggregation({ source: { id: classes.person.id }, target: { id: classes.address.id }}),
      // new uml.Composition({ source: { id: classes.person.id }, target: { id: classes.bloodgroup.id }}),
      // new uml.Association({ source: { id: classes.mammal.id }, target: { id: classes.bloodgroup.id }}),
      // new uml.Transition({ source: { id: classes.mammal.id }, target: { id: classes.address.id }})
  //];


  _.each(relations, function(r) { graph.addCell(r); });
