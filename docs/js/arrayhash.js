/**
* Extend object 'a' with the properties of object 'b'.
* If there's a conflict, content of object 'b' overwrites content of 'a'
*/
function extendHash( a, b ) {
  for( var i in b ) {
    a[ i ] = b[ i ];
  };
}

/**
* Check if element is a Hash
*/
function isHash(pObject) {
   return pObject && (typeof(pObject)  === "object");
};

/**
* Check if element is an Array
*/
function isArray(pObj) {
  return isHash(pObj) && (pObj instanceof Array);
};

function makeMap(str){
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

function updateHashSourceDestination(pSource,pDest) {

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
