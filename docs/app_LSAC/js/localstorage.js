
function getArray4DBNames() {
  var vArrayDB = [];
  vArrayDB.push(vJSONDB["database"]);
  vArrayDB.push(vResponseDB["database"]);
  vArrayDB.push(vFeedbackDB["database"]);
  console.log("DB Names: ["+vArrayDB.join(",")+"]");
  return vArrayDB;
}

function getID4DBName(pDBName) {
  return pDBName.replace(/[^A-Za-z0-9]/g,"_");
};

function getDB4DBName(pDBName) {
  console.log("Call: getDB4DBName('"+pDBName+"')");
  switch (pDBName) {
    case "disappresponse.db":
      return vResponseDB;
    break;
    case "disappfeedback.db":
      return vFeedbackDB;
    break;
    default:
      return vJSONDB
  };
}
//--------------------------------------
//  LOAD Local Storage JSONDB
//--------------------------------------
function loadLocalDB(pDBName) {
  var vDBID = getID4DBName(pDBName);
  var vDB = getDB4DBName(pDBName);
  if (typeof(Storage) != "undefined") {
    // Store
    if (typeof(localStorage.getItem(vDBID)) !== undefined) {
      console.log("JSON-DB '"+pDBName+"' try loading from Local Storage");
      var vJSONstring = localStorage.getItem(vDBID);
	    if (!vJSONstring) {
        console.log("JSON-DB '"+pDBName+"' undefined in Local Storage.\nSave default as JSON");
        localStorage.setItem(vDBID, JSON.stringify(vDB));
	    } else {
        console.log("parse DB '"+pDBName+"') from LocalStorage JSONstring='"+vJSONstring.substr(0,120)+"...'");
        //vDB = parseJSONDB(pDBName,vJSONstring);
        vDB = JSON.parse(vJSONstring);
	   }
    } else {
      console.log("JSON-DB '"+pDBName+"' is undefined in Local Storage.\nSave default as JSON");
      localStorage.setItem(vDBID, JSON.stringify(vDB));
    };
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  };
  return vDB;
};

//--------------------------------------
//  PARSE Local Storage JSONDB
//--------------------------------------
function X_parseJSONDB(pDBName,pStringJSON) {
  var vDBID = getID4DBName(pDBName);
  var vDB = null;
  if (pStringJSON) {
    var vTest = pStringJSON.replace(/\S\t/g,"");
    if (vTest.length > 0) {
      console.log("JSONDB '"+vDBName+"' is defined in localStorage ");
      vDB = JSON.parse(pStringJSON);
    } else {
      console.log("parseJSONDB()-Call: JSONDB ["+pDBName+"] cannot be parsed - empty String in LocalStorage");
      localstorage.removeItem(vDBID);
    }
  } else {
    console.log("parseJSONDB()-Call: JSONDB ["+pDBName+"] is undefined in LocalStorage.");
  }
};

//--------------------------------------
//  SAVE Local Storage JSONDB
//--------------------------------------
function saveLocalDB(pDBName,pJSONDB) {
  pDBName = getID4DBName(pDBName);
  if (typeof(Storage) != "undefined") {
    // Store
    if (typeof(pJSONDB) != undefined) {
      console.log("JSON-DB '"+pDBName+"' is defined, JSONDB in  Local Storage");
      if (pJSONDB) {
        //console.log("pJSONDB '"+pDBName+"' is saved to Local Storage");
        var vJSONstring = JSON.stringify(pJSONDB)
        console.log("saveLocalDB('"+pDBName+"') JSONstring='"+vJSONstring.substr(0,120)+"...'");
        localStorage.setItem(pDBName,vJSONstring);
      } else {
        console.log("pJSONDB DOM-Node is NOT defined");
      }
    } else {
      console.log("pJSONDB is undefined");
    };
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  }
};

//--------------------------------------
//  LOAD ALL Local Storage JSONDB
//--------------------------------------

function loadAllOfflineJSONDB() {
  var vArrayDB = getArray4DBNames();
	console.log("loadAllOfflineJSONDB()-Call");
	var vDBName = "";
	for (var i = 0; i < vArrayDB.length; i++) {
		vDBName = vArrayDB[i];
    vDBID = getID4DBName(vDBName);
		vLocalDB[vDBID] = loadLocalDB(vDBID);
		if (typeof(vLocalDB[vDBID])  != "undefined" )  {
			console.log("Offline DB: ["+vDBName+"] exists in loadAllOfflineJSONDB()-Call ");
			if (typeof(vLocalDB[vDBID]["DBlines"]) != "undefined") {
        console.log("LOAD: LC['"+vDBID+"'] contains "+vLocalDB[vDBID]["DBlines"].length+" records");
				switch (vDBName) {
					case vJSONDB["database"]:
              vJSONDB["DBlines"] =  vLocalDB[vDBID]["DBlines"];
							vJSONDB["DBsubmitted"] =  vLocalDB[vDBID]["DBsubmitted"];
					break;
					case vResponseDB["database"]:
							vResponseDB["DBlines"] =  vLocalDB[vDBID]["DBlines"];
							vResponseDB["DBsubmitted"] =  vLocalDB[vDBID]["DBsubmitted"];
					break;
					case vFeedbackDB["database"]:
							vFeedbackDB["DBlines"] =  vLocalDB[vDBID]["DBlines"];
							vFeedbackDB["DBsubmitted"] =  vLocalDB[vDBID]["DBsubmitted"];
					break;
					default:
							console.log("Offline DB: ["+vDBName+"] is unknown in loadAllOfflineJSONDB()-Call");
				}
			}
		} else {
			console.log("Offline DB: ["+vDBName+"] is undefined in loadAllOfflineJSONDB()-Call");
		}; // if vLocalDB[vDBname] unde
	}; // for
};

//--------------------------------------
//  SAVE ALL Local Storage JSONDB
//--------------------------------------

function saveAllOfflineJSONDB() {
	console.log("saveAllOfflineJSONDB()-Call");
  var vArrayDB = getArray4DBNames();
	var vDBName = "";
	for (var i = 0; i < vArrayDB.length; i++) {
		vDBName = vArrayDB[i];
    vDBID = getID4DBName(vDBName);
    saveLocalDB(vDBID,vArrayDB[i]);
		console.log("Offline DB: ["+vDBName+"] will be save AllOfflineJSONDB()-Call");
 	};
};

//--------------------------------------
//  LOAD VARIABLE Local Storage JSONDB
//--------------------------------------

function loadLocalVar(pKey) {
 var vReturn = "";
 if (typeof(Storage) != "undefined") {
    // Load
  	if (typeof(localStorage.getItem(pKey)) != undefined) {
      console.log("Variable ["+pKey+"] loaded from Local Storage");
      vReturn = localStorage.getItem(pKey);
    } else {
      console.log("Variable ["+pKey+"] is undefined in Local Storage");
    };
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  };
	return vReturn
};

//--------------------------------------
//  SAVE VARIABLE Local Storage JSONDB
//--------------------------------------

function saveLocalVar(pKey,pValue) {
 if (typeof(Storage) != "undefined") {
    // Store
    localStorage.setItem(pKey,pValue);
		console.log("Save Local Variable: ["+pKey+"]='"+pValue+"'");

  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  }
};

//---------------------------------------
// Array Tools
//---------------------------------------
function copy_array(pArray) {
	return pArray.slice();
};


function saveLocalStorageValueOK(pID,pText) {
	saveLocalStorageValue(pID);
	alert(pText+" saved!");
};

function saveLocalStorageValue(pID) {
	//localStorage.setItem(pID,document.getElementById(pID).value);
	var vValue = getValueDOM(pID);
	localStorage.setItem(pID,vValue);
  console.log("LocalStorage Save: ["+pID+"]='"+vValue+"'");
};

function loadLocalStorageValue(pID) {
	var vDecode = true;
	loadLocalStorageValue_Decode(pID,vDecode);
};


function loadLocalStorageValue_Decode(pID,pDecode) {
  if (localStorage.getItem(pID) === null) {
    console.log("Local Storage Variable ["+pID+"] was not set!");
  } else {
		var vValue = localStorage.getItem(pID);
		if (pDecode) {
			vValue = decodeURLparam(vValue);
		};
    write2value(pID, vValue);
    console.log("LocalStorage Load: ["+pID+"]='"+vValue+"'");
  };
};

function saveLocalStorageInnerHTML(pID) {
  //localStorage.setItem(pID,document.getElementById(pID).innerHTML);
	localStorage.setItem(pID,getInnerHTML(pID));
  console.log("LocalStorage Save: ["+pID+"]");
};

function loadLocalStorageInnerHTML(pID) {
  if (localStorage.getItem(pID) === null) {
    console.log("Local Storage Variable ["+pID+"] was not set!");
  } else {
    write2innerHTML(pID, localStorage.getItem(pID));
    console.log("LocalStorage Load: ["+pID+"]");
  };
};

function getDBformatIndex (pDBformat,pID) {
	var vIndex = -1;
	if (pDBformat) {
		for (var i = 0; i < pDBformat.length; i++) {
			if (pID == pDBformat[i]) {
				vIndex = i;
			};
		};
	} else {
		console.log("pDBformat is not defined");
	};
	return vIndex;
}

function compareSyncDB(pJSONDB) {
	// DEPRICATED Function
	console.log("Check if Records are Synced");
	console.log("Primary Key of DB = 'sampledate' and 'email'");
	var vDBlines_Offline = vJSONDB_Offline["DBlines"];
	if (vDBlines_Offline) {
		var vDBsynced = vJSONDB_Offline["DBsynced"]; //Boolean Array showing that data is already in Online DB
		var vDBlines = vJSONDB["DBlines"];
		var vRecord_Offline = null;
		var vRecord = null;
		var i_sampledate = getDBformatIndex(vJSONDB["DBformat"],"sampledate");
		if (i_sampledate >= 0) {
			for (var i = 0; i < vDBlines_Offline.length; i++) {
				var vRecordFound = find_Record_in_OnlineDB(vRecord_Offline[i],vDBlines);
				if (vRecordFound >= 0) {
					vDBsynced[i] = true;
				} else {
					vDBsynced[i] = false;
				}
			};
		} else {
			alert("Sync cannot be checked due to missing 'sampledate' value in DB");
		}
	} else {
		console.log("Local Storage Sync Check - empty Offline DB - nothing to do");
	}

}
function find_Record_in_DB(pID,pSearch,pDB) {
  var vFound = -1;
  var vDBlines  = pDB["DBlines"];
  var vDBformat = pDB["DBformat"];
  if (vDBformat.hasOwnProperty(vID)) {
      console.log("find_Record_in_DB('"+pID+"','"+pSearch+"',pDB) pID='"+pID+"' not in DBformat");
  } else {
    console.log("find_Record_in_DB('"+pID+"','"+pSearch+"',pDB)");
    for (var k = 0; k < vDBlines.length; k++) {
  		vDBhash = convertArray2Hash(vDBlines[k],vDBformat);
  		if (vDBhash && vDBhash[pID] && vDBhash[pID] == pSearch) {
  			vFound = i;
  		};
  	};
  }
	return vFound;
};

function compareRecordsDB(pRecord_Offline,pRecord) {
	// compares if offline records can be found remote DB
	var i = getDBformatIndex(vJSONDB["DBformat"],"sampledate");
	var j = getDBformatIndex(vJSONDB["DBformat"],"email");
	if (j<0) {
		console.log("DB Comparision will not include email");
	};
	if (vRecord[i] == vRecord_Offline[i]) {
			if (j >=0) {
				if (vRecord[j] == vRecord_Offline[j]) {
					return true
				} else {
					return false
				}
			} else {
				return true;
			}
	} else {
		return false
	}
}

function convertFormat4DB(pDB,pFormatDest) {
  // pDB is a database stored in the LocalStorage
  var vDBlines  = pDB["DBlines"];
  var vDBformat = pDB["DBformat"];
  for (var i = 0; i < vDBlines.length; i++) {
    vDBlines[i] = convertRecordDBformat(vDBlines[i],vDBformat,pFormatDest)
  };
  pDB["DBformat"] = pFormatDest;
};

function convertRecordDBformat(pRecArray,pFormatSource,pFormatDest) {
	// Convert DB-Record to SourceHash in pFormatSource
	var vSourceHash = convertArray2Hash(pRecArray,pFormatSource);
  return convertHash2Array(vSourceHash,pFormatDest);
};



function compare_Format_DB(pDB1,pDB2) {
  var vDBformat1 = pDB1["DBformat"];
  var vDBformat2 = pDB2["DBformat"];
	// compare Format of DBs
	var vRet = true;
	if (vDBformat1.length != vDBformat2.length) {
		vRet = false;
	} else {
		for (var i = 0; i < vDBformat1.length; i++) {
			if (vDBformat1[i] != vDBformat2[i]) {
				vRet = false;
			}
		}
	};
	// if differences occur sync data first
	return vRet;
};

function loadOfflineDB(pDBName) {
	var lvJSONDB_Offline = loadLocalDB("OFFLINE_"+pDBName);
	check_Local_Init();
	return lvJSONDB_Offline;
}

function saveOfflineDB(pDBName,pJSONDB_Offline) {
	var vLastSyncLine = pJSONDB_Offline["LastSyncLine"];
	pJSONDB_Offline["LastSyncLine"] = -1; //means recheck syncing of ALL records after app start
	// Rechecking makes sense if submission of records performed, but failed not enter the Online DB due to server problems
	saveLocalDB("OFFLINE_"+pDBName,pJSONDB_Offline);
	pJSONDB_Offline["LastSyncLine"] = vLastSyncLine; //syncing will start at the same last records
};


function init_JSONDB(pJSONDB) {
	if (pJSONDB) {
		pJSONDB["DBlines"] = [];
		pJSONDB["DBsubmitted"] = []; //Boolean Array showing that data was submitted by App
		pJSONDB["LastSyncLine"] = -1;
		if (vJSONDB["DBformat"]) {
		} else {
			pJSONDB["DBformat"] = ["sampledate","email","usergroup","geolocation","moddate","recdate"];
		};
	} else {
		alert("ERROR: No Database is loaded! - init_JSONDB(pJSONDB)-Call");
		//vJSONDB_Init["DBformat"] = ["email","username","geolocation","sampledate"];
	};
}


function getJSONDB_Local_Default() {
	vJSONDB_Offline["DBlines"] = [];
	vJSONDB_Offline["DBsubmitted"] = []; //Boolean Array showing that data was submitted by App
	vJSONDB_Offline["DBsynced"] = []; //Boolean Array showing that data is already in Online DB
	vJSONDB_Offline["LastSyncLine"] = -1;
	if (vJSONDB["DBformat"]) {
		vJSONDB_Offline["DBformat"] = copy_array(vJSONDB["DBformat"]);
		//vJSONDB_Offline["DBtitles"] = vJSONDB["DBtitles"];
	} else {
		console.log("Init of vJSONDB_Offline failed, due to no DBformat definition of vJSONDB.");
		alert("No Database is loaded please go online to download DB format once for working OFFLINE.")
		//vJSONDB_Init["DBformat"] = ["email","username","geolocation","sampledate"];
	};
}
