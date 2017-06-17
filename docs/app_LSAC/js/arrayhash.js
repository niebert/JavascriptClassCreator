/**
* Extend object 'a' with the properties of object 'b'.
* If there's a conflict, content of object 'b' overwrites content of 'a'
*/

function reverseMap(pMap) {
  var vReverseMap = {};
  for (var key in pMap) {
    if (pMap.hasOwnProperty(key)) {
      vReverseMap[pMap[key]] = key;
    }
  };
  return vReverseMap
};

function saveID4HashPath2JSON(pHashPath,pValue) {
  var vPathOK = true;
  var vID = "";
  var vHash = vJSCC_DB;
  var vPrevHash = vHash;
  var vLog = "vJSCC_DB";
  console.log("saveID4HashPath2JSON('"+pHashPath+"','"+pValue+"') ");
  if (pHashPath && pHashPath.length>1) {
    var vArrID = pHashPath.split(".");
    for (var i = 0; i < vArrID.length; i++) {
      //vID = reduceVarName(vArrID[i]);
      vID = vArrID[i];
      if (vID != "") { // skip empty ID defined by path ".."
        if (vPathOK) {
          if (vHash.hasOwnProperty(vID)) {
            vLog += "["+vID+"]"; // vID exists in HashPath
            vPrevHash = vHash;
            vHash = vHash[vID]; // set Hash to Lower Part of Hash
          } else {
            vPathOK = false;
            vLog += " OK - remaining undefined Path ["+vID+"]";
          };
        } else {
          // append undefined part of Hash
          vLog += "["+vID+"]";
        }
      }; // empty ID
    }; // end For
  } else {
    console.log("saveID4HashPath2JSON(): HashPath undefined");
  };
  console.log("saveID4HashPath2JSON('"+pHashPath+"','"+pValue+"') "+vLog);
  if (vPathOK) {
    //set Value
    if (vPrevHash) {
      vPrevHash[vID] = pValue;
    } else {
      alert("ERROR: HashPath '"+pHashPath+"' length to short!")
    };
  } else {
    console.log("saveID4HashPath2JSON('"+pHashPath+"','"+pValue+"') Path not OK "+vLog);
  }
  return vPathOK; // boolead for success of save operation
}

function indexOfArray(pArray, pValue, pFromIndex) {
  var fromIndex = pFromIndex || 0;
  var index = fromIndex - 1;
  var length = pArray.length;

  while (++index < length) {
    if (pArray[index] === pValue) {
      return index;
    }
  };
  return -1;
};

function convertArray2Hash4ID(pArray,pID,pRemoveID) {
  var vHash = {};
  var vKey = "";
  var vArray = cloneJSON(pArray);
  if (isArray(vArray)) {
    for (var i = 0; i < vArray.length; i++) {
      if (vArray[i].hasOwnProperty(pID)) {
        vKey = vArray[i][pID];
        if (vKey != "") {
          vHash[vKey] = vArray[i];
        }
      };
    };
    if (pRemoveID && (pRemoveID == true)) {
      for (var key in vHash) {
        delete vHash[key][pID];
      };
    };
    return vHash;
  } else {
    alert("ERROR: convertArray2JSON4ID(pArray,pID) pArray is not an array");
  };
}

function convertHash2Array4ID(pHash,pID) {
  var vArray = [];
  var vKey = "";
  var vHash = cloneJSON(pHash)
  if (isHash(vHash)) {
    for (var key in vHash) {
      vHash[key][pID] = key;
      vArray.push(vHash[key]);
    };
    return vArray;
  } else {
    alert("ERROR: convertJSON2Array4ID(pHash,pID) pHash is not an object/hash");
  };
}


function cloneJSON(pJSON) {
  var vJSON = {};
  if (pJSON) {
    vJSON = JSON.parse(JSON.stringify(pJSON));
  } else {
    console.log("ERROR: cloneJSON(pJSON) - pJSON undefined!");
  };
  return vJSON
};

function getJSON4String(pStringJSON) {
  if (pStringJSON) {
    try {
        // return the parsed JSON object
        return JSON.parse(pStringJSON);
    } catch(e) {
        alert(e); // error in "pStringJSON" (in this case, show alert box with error "e")!
    }
  }
}

function extendHash( a, b ) {
  for( var i in b ) {
    a[ i ] = b[ i ];
  };
};

function getType4JSON(pJSON) {
  if (pJSON == null){
    // if (pJSON = null) then typeof(pJSON) return "object".
    // therefore this check is necessary to catch case "undefined" and "null"
    return "null";
  } else if (isArray(pJSON)) {
    return "array"
  } else if (isHash(pJSON)) {
    return "object"
  } else if (typeof(pJSON) == "number") {
    if (isInteger(pJSON)) {
      return "integer"
    } else {
      return "number"
    }
  } else {
    return typeof(pJSON)
  };
};

function deepEqual(pJSON1,pJSON2) {
  return _.isEqual(pJSON1,pJSON2);
};

/**
* Check if element is a Hash
*/
function isHash(pObject) {
  // use lodash.js instead of arrayhash.js
   return pObject && (typeof(pObject)  === "object");
};

/**
* Check if element is an Array
*/
function isArray(pObj) {
  // use lodash.js instead of arrayhash.js
  return isHash(pObj) && (pObj instanceof Array);
};

function isFloat(n) {
    return n === +n && n !== (n|0);
};

function isInteger(n) {
    return n === +n && n === (n|0);
};

function makeMap(str){
  // use lodash.js instead of arrayhash.js
  var obj = {};
  var items = str.split(",");
  for ( var i = 0; i < items.length; i++ )
    obj[ items[i] ] = true;
  return obj;
}

function lengthHash(pHash) {
  var vLength = 0;
  if (isHash(pHash)) {
    for (var key in pHash) {
      if (pHash.hasOwnProperty(key)) {
        vLength++;
      };
    };
  };
  return vLength;
};

function getArray4HashID(pHash) {
  var vHash = pHash || {};
  var vArray = [];
  for (var iID in vHash) {
    if (vHash.hasOwnProperty(iID)) {
      vArray.push(iID)
    };
  };
  return vArray
};

function getDeleteBoolean4Hash(pHash) {
  var vDelHash = {};
  var vArrID_OLD = getArray4HashID(pHash);
  // init the Delete Hash
  for (var i = 0; i < vArrID_OLD.length; i++) {
    vDelHash[vArrID_OLD[i]] = true;
  };
  return vDelHash;
}

function updateHash4NewIDs(pHash,pArrID_NEW,pDefaultValue) {
  var vDelHash = getDeleteBoolean4Hash(pHash);
  var vDefaultValue = pDefaultValue || "";
  var vArrID_OLD = getArray4HashID(pHash);
  var vID = "";
  // mark IDs that should be kept in hash
  for (var i = 0; i < pArrID_NEW.length; i++) {
    vID = pArrID_NEW[i];
    if (pHash.hasOwnProperty(vID)) {
      // do not delete the ID in Hash
      vDelHash[vID] = false;
    } else {
      // init default value for new keys/IDs
      if (vDefaultValue != "") {
        // append the ID to the default value;
        pHash[vID] = vDefaultValue+ " '"+vID+"'";
      } else {
        // init new value with an empty string
        pHash[vID] = "";
      };
    };
  };
  // delete all keys with vDelHash[vID] = true
  for (var i = 0; i < vArrID_OLD.length; i++) {
    vID = vArrID_OLD[i];
    if (vDelHash[vID] == true) {
      delete pHash[vID];
    };
  };
};

function updateHashWithEditedHash(pSource,pSourceEdited) {
  // (1) pSource,pSourceEdited are hashes of hashes, pSourceEdited[key][subkey] may use only subset of subkeys that pSource owns
  // (2) pSourceEdited may have more subkeys that pSource so that vSource may need to be extended with all keys from pSourceEdited
  // (3) content from pSource for keys in vDest
  // (2) copies resp. overwrites all content  keys from pSourceEdited to vDest
  // (4) return vDest, that contains the keys of pSourceEdited updated partial content
  var vDest = {};
  for (var iKey in pSourceEdited) {
    if (pSource.hasOwnProperty(iKey)) {
      // use source hash
      vDest[iKey] = pSource[iKey]
    } else {
      // create an empty hash
      vDest[iKey] = {};
    };
    // extend and overwrite the pSource with pEdited
    _.assign(vDest[iKey],pSourceEdited[iKey]);
  };
  // update the pSource with vDest
  pSource = vDest;
}

function renameHashKey(pHash,old_key,new_key) {
  var vErrorMSG = "";
  if (isHash(pHash)) {
    if (pHash.hasOwnProperty(new_key)) {
      vErrorMSG = "ERROR: Rename Hash Key - New Key already exists";
    } else {
      pHash[ new_key ] = pHash[ old_key ];
      delete pHash[ old_key ];
      console.log("Rename hash form '"+old_key+"' to '"+new_key+"'");
    }
  };
  return vErrorMSG;
}

function firstKey4Hash(pHash) {
  var vLength = 0;
  var vKey = "";
  if (isHash(pHash)) {
    for (var key in pHash) {
      if (pHash.hasOwnProperty(key)) {
        vLength++;
        if (vLength == 1) {
          vKey = key;
          break;
        };
      };
    };
  };
  return vKey;
};

function createHash4Array(pArr,pHash) {
  // general call createHash4Array(pArr)
  // with the Parameter pHash the Map of pHash will be extended
  // existing key value pairs in pHash will be overwritten
  var vHash = pHash || {};
  if (isArray(pArr)) {
    for (var i = 0; i < pArr.length; i++) {
      vHash[pArr[i]] = pArr[i];
    };
  };
  return vHash;
};

function createArray4HashID(pHash) {
  var vArr = [];
  for (var iID in pHash) {
    if (pHash.hasOwnProperty(iID)) {
        vArr.push(iID);
    };
  };
  return vArr;
};

function isValidJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  };
  return true;
}

function existsPathJSON(pJSON,pPath) {
  var vDefinedPath = definedPathJSON(pJSON,pPath);
  return (vDefinedPath == pPath)
};

function getLastID4PathJSON(pJSON,pPath) {
  var vPathArr = pPath.split(".");
  var vID = vPathArr.pop() || "";
  if (vID != "") {
    if (vID == vID.replace(/[^0-9]/g,"")) {
      vID = parseInt(vID);
    }
  };
  console.log("getLastID4PathJSON(pJSON,'"+pPath+"')='"+vID+"' Type='"+typeof(vID)+"'");
  return vID;
};

function set4PathJSON(pJSON,pPath,pValue) {
  var x = getObject4PathJSON(pJSON,pPath);
  var vID = getLastID4PathJSON(pJSON,pPath);
  x[vID] = pValue;
}

function get4PathJSON(pJSON,pPath) {
  var x = getObject4PathJSON(pJSON,pPath);
  var vID = getLastID4PathJSON(pJSON,pPath);
  return x[vID];
}

function getJSON4Path(pPath) {
  var vPathArr = pPath.split(".");
  var vJSON;
  eval("vJSON="+vPathArr[0]);
  if (!vJSON) {
    alert("getJSON4Path('"+pPath+"') root element of path undefined")
  } else {
    vPathArr.shift();
    pPath = vPathArr.join(".");
    return getObject4PathJSON(pJSON,pPath)
  };

}

function getObject4PathJSON(pJSON,pPath) {
  var vPathArr = pPath.split(".");
  var vID = "";
  var x = pJSON;
  //var x;
  //eval("x="+vPathArr[0]);
  for (var i = 0; i < (vPathArr.length-1); i++) {
    vID = (vPathArr[i]).replace(/[^0-9]/g,"");
    if (vID == vPathArr[i]) {
      vID = parseInt(vPathArr[i]);
    } else {
      vID = vPathArr[i];
    };
    x = x[ID];
  };
  return x;
}

function definedPathJSON(pJSON,pPath) {
  // pPath="myhash.myarr.7.9.myhash2.myhash3"
  var vPathArr = pPath.split(".");
  var vExists = true;
  // vPathArr = ["myhash","myarr","7","9","myhash2","myhash3"];
  var x = pJSON;
  var vSep = ""
  var vID = "";
  var vUndefPath = "";
  var vDefinedPath = "";
  var k = 0;
  for (var i = 0; i < vPathArr.length; i++) {
    if (vExists) {
      vID = (vPathArr[i]).replace(/[^0-9]/g,"");
      if ((vID != "") &&  (vID == vPathArr[i])) {
        //--- Array -------
        // vPathArr[i] is a number e.g. vPathArr[i]="7" - treat as array index parseInt
        k = parseInt(vPathArr[i]);
        if ((isArray(x)) && (k < x.length)) {
          if (k>=0) {
            vDefinedPath+= vSep + vPathArr[i];
            vSep = ".";
            //console.log("PathOK: "+vPathOK);
          } else {
            vExists = false;
            vUndefPath += vPathArr[i];
          }
        } else if ((isHash(x)) && (x.hasOwnProperty(vPathArr[i]))) {
          //--- Hash with Number as ID -------
          vDefinedPath += vSep + vPathArr[i];
          vSep = ".";
        } else {
          vExists = false;
          vUndefPath += vPathArr[i];
        }
      } else if ((isHash(x)) && (x.hasOwnProperty(vPathArr[i]))) {
        //--- Hash -------
        vDefinedPath += vSep + vPathArr[i];
        vSep = ".";
      } else {
        vExists = false;
        vUndefPath += vPathArr[i];
      };
    } else {
      vUndefPath += vSep + vPathArr[i];
      vSep = ".";
    }
  }; //end for
  return vDefinedPath;
}
