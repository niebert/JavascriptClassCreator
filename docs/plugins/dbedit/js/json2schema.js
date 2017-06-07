
function onClickSchema4JSON(pInputID,pOutputID) {
  var vStringJSON = getEditorValue(pInputID);
  var vJSON = getJSON4String(vStringJSON);
  if (vJSON) {
    var vSchema = getSchema4JSON(vJSON);
    var vStringSchema = JSON.stringify(vSchema,null,4);
    //write2value(pOutputID,vStringSchema);
    setEditorValue(pOutputID,vStringSchema);
    $('#pSchemaOutput').show();
  } else {
    console.log("ERROR: onClickSchema4JSON('"+pInputID+"','"+pOutputID+"') - Parsing on JSON string had errors");
  }
}

function getSchema4JSON(pJSON) {
  // getSchema4JSON is called for the root element of the JSON file
  var vPath = "";
  var vSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "additionalProperties": true,
    "title":"MyJSON",
    "definitions": {}
  };
  var vTypeTree = getTypeTree4JSON(pJSON);
  // vEditorPath is the path to a specific JSON element in the JSON file
  // "root" is the root node of the JSON. "root.name" is addressing the name
  // { "name":"Peter Miller"}. Deeper subelements of the EditorPath will be defined
  // in  a recursive way.
  var vEditorPath = "root";
  // path is keeping track of the JSON schema
  convertJSON2Schema(pJSON,vPath,vSchema,vTypeTree,vEditorPath);
  //return vTypeTree;
  return vSchema;
};

function getTypeTree4JSON(pJSON) {
  // clones the original JSON to get the JSON structure of the TypeTree
  var vTypeTree = cloneJSON(pJSON);
  // currently the TypeTree still contains the original default value of pJSON
  // createTypeTree4JSON() replaces the leafs in the TypeTree with the type of leafs
  // arrays and hashes/objects remain untouched
  createTypeTree4JSON(pJSON,vTypeTree);
  return vTypeTree;
};

function createTypeTree4JSON(pJSON,pTypeTree) {
  var vType = getType4JSON(pJSON);
  var vSubType = "";
  switch (vType) {
    //---- OBJECT/HASH -------
    case "object":
      for (var key in pJSON) {
        if (pJSON.hasOwnProperty(key)) {
          // loop over key value pairs of hash
          vSubType = getType4JSON(pJSON[key]);
          if ((vSubType == "array") || (vSubType == "object")) {
            createTypeTree4JSON(pJSON[key],pTypeTree[key])
          } else {
            pTypeTree[key] = vSubType;
          }
        }
      };
    break;
    //---- ARRAY -------------
    case "array":
      for (var i = 0; i < pJSON.length; i++) {
        vSubType = getType4JSON(pJSON[i]);
        if ((vSubType == "array") || (vSubType == "object")) {
          createTypeTree4JSON(pJSON[i],pTypeTree[i]);
        } else {
          pTypeTree[i] = vSubType;
        }
      };
    break;
    default:
      console.log("createTypeTree4JSON() default - do nothing");
  };
};

function getID4Path(pPath) {
  var vID = pPath;
  var vSlashPos = vID.lastIndexOf("/")
  if (vSlashPos>0) {
    vID = pPath.substring(vSlashPos+1);
  };
  return vID;
}

function convertJSON2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath) {
  // pTypeTree is need for checking deep equal for "oneOf" definition in arrays
  var vType = getType4JSON(pJSON);
  //---set Type and ID---
  pSchema["type"] = vType;
  // check if root node of JSON
  if (pPath == "") {
    // replace root ID with a link to JSON
    pSchema["id"] = "https://niebert.github.io/json-editor";
  } else {
    pSchema["id"] = pPath;
  };
  //--- create schema dependent on typo of JSON node ----
  switch (vType) {
    //---- OBJECT/HASH -------
    case "object":
      convertObject2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath);
    break;
    //---- ARRAY -------------
    case "array":
      pSchema["format"] = "tabs";
      convertArray2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath);
    break;
    //---- STRING ------------
    case "string":
      pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["default"] = pJSON; //"Default text of "+vType+" variable";
      pSchema["format"] = determineFormat4String(pJSON);
      pSchema["description"] = "An explanation for '"+pEditorPath+"' about the purpose of "+vType+" instance with editor path '"+pEditorPath+"'.";
    break;
    //---- NUMBER ------------
    case "number":
      pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["default"] = pJSON;
      pSchema["description"] = "An explanation for '"+getID4Path(pPath)+"' about the purpose of "+vType+" instance with editor path '"+pEditorPath+"'.";
    break;
    //---- INTEGER ------------
    case "integer":
      pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["default"] = pJSON;
      pSchema["description"] = "An explanation for '"+getID4Path(pPath)+"' about the purpose of "+vType+" instance with editor path '"+pEditorPath+"'.";
    break;
    //---- BOOLEAN ------------
    case "boolean":
      pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["format"] = "checkbox";
      pSchema["default"] = pJSON;
      pSchema["description"] = "An explanation for '"+getID4Path(pPath)+"' about the purpose of "+vType+" instance with editor path '"+pEditorPath+"'.";
    break;
    default:
      pSchema["title"] = "Title of '"+pEditorPath+"' Type: '"+vType+"'";
      pSchema["default"] = null;
      pSchema["description"] = "An explanation for '"+getID4Path(pPath)+"' about the purpose of "+vType+" instance with editor path '"+pEditorPath+"'.";
  };
};

function convertObject2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath) {
  // the array of all required keys in the hash/object
  pSchema["defaultProperties"] = [];
  // properties contains one schema for every key
  pSchema["properties"] = {};
  for (var key in pJSON) {
    if (pJSON.hasOwnProperty(key)) {
      // set the key as required property in object/hash
      pSchema["defaultProperties"].push(key);
      // create the hash for all properties
      pSchema["properties"][key] = {};
      // now call convertJSON2Schema() on sub-structure of JSON
      convertJSON2Schema(pJSON[key],pPath+"/properties/"+key,pSchema["properties"][key],pTypeTree[key],pEditorPath+"."+key);
    };
  };
};

function convertArray2Schema(pJSON,pPath,pSchema,pTypeTree,pEditorPath) {
  var vID = "";
  pSchema["items"] = {};
  var vItems = [];
  var vDefaults = [];
  for (var i = 0; i < pJSON.length; i++) {
    // vSubTypeTree contains the TypeTree for the JSON sub structure of pJSON[i]
    // vHash4ID contains the schema for the JSON sub structure of pJSON[i]
    var vHash4ID = {};
    convertJSON2Schema(pJSON[i],pPath+"/items",vHash4ID,pTypeTree[i],pEditorPath+".*");
    // check if previous elements of array are deep equal
    var vDeepEqual = false;
    console.log("Compare JSON1:\n"+JSON.stringify(pTypeTree[i],null,4));
    for (var k = 0; k < i; k++) {
        console.log("Compare JSON2["+k+"]:\n"+JSON.stringify(pTypeTree[k],null,4));
        if(_.isEqual(pTypeTree[k], pTypeTree[i])){
          vDeepEqual = true;
        };
    };
    // if subTypeTree of vHash4ID is not deep equal to previous array elements
    // push the new schema for the element and store the SubTypeTree
    if (vDeepEqual == false) {
        vItems.push(vHash4ID);
    };
  };
  // if more than one vItems are present in array, use "oneOf" for schema.
  if (vItems.length > 1) {
    for (var i = 0; i < vItems.length; i++) {
      vItems[i]["id"] = pPath+"/arr"+i;
      vItems[i]["title"] = "Title array"+i+" "+pPath;
    };
    pSchema["items"]["oneOf"] = vItems;
  } else {
    pSchema["items"] = vItems[0];
  };
};


function determineFormat4String(pString) {
  var vColorRegEx = new RegExp("^#[0-9a-fA-F]{6}$");
  var vGeolocRegEx = new RegExp("^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$");
  if (vColorRegEx.test(pString) == true) {
    return "color"
  } else if (pString.indexOf("\n") >= 0) {
    return "textarea"
  } else {
    return "text"
  }
}
