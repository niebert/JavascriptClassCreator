function saveLocalStorageForm() {
  updateEditorValue2JSON();
  saveLocalStorage('all');
  alert("SAVE:\nProject saved in LocalStorage of your Browser");
};

function clearLocalStorageForm() {
  clearLocalStorage('all');
  alert("CLEAR:\nProject deleted in LocalStorage of your Browser\nNext reload will load the default settings of JSCC!\nExport your Project and Templates to save your edits in 'Export'-Tab");
};

function autoSaveJSON() {
  console.log("autoSaveJSON()-Call");
  saveLocalStorage("all");
  //saveJSON2LocalStorage("json");
};

function loadLocalStorage(pType,pVar) {
  var vLS="load";
  var vRet = undefined;
  var vParLog = "\""+pType+"\"" || "";
  var vType = pType || "all";
  debugLog("LocalStorage","loadLocalStorage('"+vType+"','"+(pVar || "")+"')-Call");
  switch (vType) {
    case "all":
      loadLocalStorage("dom");
      loadLocalStorage("json");
    break;
    case "dom":
      loadLocalStorage2DOM();
    break;
    case "json":
      if (pVar) {
        var vDBName = pPar;
        if (localStorage.getItem(vDBName) === null) {
          console.log("JSON Database '"+vDBName+"' was undefined in LocalStorage!");
          vRet = undefined;
        } else {
          vRet = loadLocalDB(vDBName); // pVar is the DBname
          console.log("DB '"+vDBName+"' loaded!");
        }
      } else {
        vDBName = "vJSCC_DB";
        vRet = loadLocalDB(vDBName);
        console.log("DB '"+vDBName+"' load call finished!");
    };
    break;
    case "var":
      if (pVar) {
        vParLog += ",pVar"
        if (localStorage.getItem(pVar) === null) {
          debugLog("LocalStorage","Variable '"+pVar+"' was undefined in LocalStorage!");
          vRet = undefined;
        } else {
          vRet = localStorage.getItem(pVar);
        }
      } else {
        debugLog("LocalStorage","WARNING: call "+vLS+"LocalStorage - Type='var' - Parameter pVar undefined");
      };
    break;
    default:
      debugLog("LocalStorage","WARNING: call "+vLS+"LocalStorage - Type='"+pType+"' undefined");
  };
  console.log("Call: "+vLS+"LocalStorage("+vParLog+") done");
  return vRet;
};

function saveLocalStorage(pType,pVar,pContent) {
  var vLS="save";
  var vParLog = "\""+pType+"\"" || "";
  var vType = pType || "all";
  debugLog("LocalStorage","saveLocalStorage('"+vType+"','"+(pVar || "")+"',pContent)-Call");
  switch (vType) {
    case "all":
      saveLocalStorage("dom");
      saveLocalStorage("json");
    break;
    case "dom":
      saveDOM2LocalStorage();
    break;
    case "json":
      //saveLocalStorage("json","vJSCC_DB");
      var vContent = "";
      if (pVar) {  // pVar is the DBname
        vParLog += ","+pVar;
        var vEval = "vContent = getCode4JSON_JS("+pVar+")";
        eval(vEval);
        vRet = localStorage.setItem(pVar,vContent);
      } else {
        // vJSCC_DB is the default JSONDB
        vContent = getCode4JSON_JS(vJSCC_DB);
        vParLog += ",'vJSCC_DB'";
        vRet = localStorage.setItem("vJSCC_DB",vContent);
      };
      debugLog("LocalStorage","CALL: "+vLS+"LocalStorage('"+vType+"'"+vParLog+")");
  break;
    case "var":
      if (pVar) {
        debugLog("LocalStorage","Save Variable '"+pPar+"' to LocalStorage");
        localStorage.setItem(pVar,pContent);
      } else {
        debugLog("LocalStorage","WARNING: call "+vLS+"LocalStorage - Type='var' - Parameter pVar undefined");
      };
    break;
    default:
      debugLog("LocalStorage","WARNING: call "+vLS+"LocalStorage - Type='"+pType+"' undefined");
  };
  debugLog("LocalStorage","Call: "+vLS+"LocalStorage("+vParLog+") done");
};

function clearLocalStorage(pType,pVar) {
  var vLS="clear";
  var vParLog = "\""+pType+"\"" || "";
  var vType = pType || "all";
  console.log("clearLocalStorage('"+vType+"','"+(pVar || "")+"')-Call");
  switch (vType) {
    case "all":
      clearLocalStorage("dom");
      clearLocalStorage("json");
    break;
    case "dom":
      clearLocalStorage4DOM();
    break;
    case "json":
      if (pVar) {  // pVar is the DBname
        vParLog += ",pVar"
        localStorage.removeItem(pVar);
      } else {
        vParLog += ",vJSCC_DB"
        localStorage.removeItem("vJSCC_DB");
      };
    break;
    case "var":
      if (pVar) {
        localStorage.removeItem(pVar);
      } else {
        debugLog("LocalStorage","WARNING: call "+vLS+"LocalStorage - Type='var' - Parameter pVar undefined");
      };
    break;
    default:
      debugLog("LocalStorage","WARNING: call "+vLS+"LocalStorage - Type='"+pType+"' undefined");
  };
  debugLog("LocalStorage","Call: "+vLS+"LocalStorage("+vParLog+")");
};

function saveDOM2LocalStorage() {
  saveLocalStorage4ArrayID(vDOM_ID);
  saveLocalStorage4ArrayID(vDOM_Global);
  saveLocalStorage4ArrayID(vDOM_TPL);
};

function saveLocalStorage4ArrayID(pArrayID) {
     //localStorage.setItem("lastname", "Smith");
    // Retrieve
    //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    //alert("vDOM_ID.length="+vDOM_ID.length);
  if (pArrayID) {
    for (var i=0;i < pArrayID.length; i++ ) {
  		var vID = pArrayID[i];
  		var vNode = document.getElementById(vID);
  		if (vNode) {
  			//alert(vID+"="+vNode.value);
  			localStorage.setItem(vID,vNode.value);
  		};
  	};
  } else {
    debugLog("LocalStorage","saveLocalStorage4ArrayID(pArrayID)-Call: pArrayID is undefined");
  };
};

function loadLocalStorage2DOM() {
  loadLocalStorage4ArrayID(vDOM_ID);
  loadLocalStorage4ArrayID(vDOM_Global);
  loadLocalStorage4ArrayID(vDOM_TPL);
};

function loadLocalStorage4ArrayID(pArrayID) {
	//alert("vDOM_ID.length="+vDOM_ID.length);
  if (pArrayID) {
    for (var i=0;i < pArrayID.length; i++ ) {
		    var vID = pArrayID[i];
		    var vValue = localStorage.getItem(vID);
		    if (vValue) {
			       var vNode = document.getElementById(vID);
			       vNode.value = vValue;
		    } else {
			     //console.log("LocalStorage: loadLocalStorage4ArrayID(pArrayID)-Call: vID="+vID+" is undefined");
		    };
	  };
  } else {
    //console.log("LocalStorage: loadLocalStorage4ArrayID(pArrayID)-Call: pArrayID is undefined");
  };
};

function clearLocalStorage4DOM() {
  clearLocalStorage4ArrayID(vDOM_ID);
  clearLocalStorage4ArrayID(vDOM_Global);
  clearLocalStorage4ArrayID(vDOM_TPL);
};

function clearLocalStorage4ArrayID(pArrayID) {
	//alert("pArrayID.length="+pArrayID.length);
  if (pArrayID) {
    for (var i=0;i < pArrayID.length; i++ ) {
  		var vID = pArrayID[i];
      if (localStorage.getItem(vID) === null) {
        debugLog("LocalStorage","WARNING: Variable '"+vID+"' was undefined in LocalStorage!\nclearLocalStorage4ArrayID()-Call:186");
        vRet = undefined;
      } else {
        localStorage.removeItem(vID);
      }
  	};
  } else {
    debugLog("LocalStorage","clearLocalStorage4ArrayID(pArrayID)-Call: pArrayID is undefined");
  }
}

function initLocalDB(pDBName,pJSONDB) {
  var vDB = pJSONDB;
  if (!vDB) {
    eval("vDB = "+pDBName);
  };
  if (vDB) {
    debugLog("LocalStorage","initLocalDB('"+pDBName+"') called - init tag "+Date.now());
    vDB["_init_date_"] = getDate();
    vDB["_init_tag_"] = Date.now();
    saveLocalDB(pDBName,vDB)
  } else {
    debugLog("LocalStorage","DB '"+pDBName+"' is undefined");
  };
  return vDB;
};

function loadLocalDB(pDBName) {
  var vJSONDB = null;
  if (typeof(Storage) != "undefined") {
    // Store
    if (typeof(localStorage.getItem(pDBName)) != undefined) {
      console.log("JSON-DB '"+pDBName+"' try loading from Local Storage");
      var vJSONstring = localStorage.getItem(pDBName);
      if (!vJSONstring) {
        //vJSONDB = initLocalDB(pDBName);
        console.log("JSON-DB '"+pDBName+"' does not exist in Local Storage");
      } else {
        console.log("Parse JSON String of '"+pDBName+"'");
        vJSONDB = JSON.parse(vJSONstring);
      };
    } else {
      console.log("JSON-DB '"+pDBName+"' is undefined in Local Storage");
    };
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  };
  return vJSONDB;
};

function saveLocalDB(pDBName,pJSONDB) {
  var vError = "";
  var vJSONDB = pJSONDB || vJSCC_DB;
  if (typeof(Storage) != "undefined") {
    // Store
    if (typeof(vJSONDB) != undefined) {
      console.log("Found JSON-DB '"+pDBName+"' for Saving in Local Storage ");
      var vStringDB = JSON.stringify(vJSONDB);
      console.log("JSON-DB '"+pDBName+"' is saved to Local Storage\n"+vStringDB.substring(0,200)+"...");
      localStorage.setItem(pDBName,vStringDB);
    } else {
      vError = "pJSONDB is undefined";
      console.log(vError);
    }
  }	 else {
    vError = "WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...";
    console.log(vError);
  };
  return vError;

};

//---------------------------------------------------
//-------------UNUSED FUNCTION-----------------------
//---------------------------------------------------
function handleOfflineJSONDB(pQueryHash) {
	var vDBName = pQueryHash["app_database"];
	vJSONDB_Offline = loadOfflineDB(vDBName);
	if (typeof(vJSONDB_Offline)  != "undefined" )  {
		if (vJSONDB_Offline) {
			if (vJSONDB_Offline["DBlines"]) {
				 if(vOnlineMode == true) {
					 compareSyncDB();
				 } else {
					 console.log("Offline Mode: no Server Sync comparision possible");
				 }
			} else {
				console.log("DBlines in Offline DB does not exist");
			};
		} else {
			console.log("After loading no vJSONDB_Offline DBlines available - Array 'DBlines,DBsubmitted,DBsynced' are created");
			vJSONDB_Offline = {};
			vJSONDB_Offline["DBlines"] = [];
			vJSONDB_Offline["DBsubmitted"] = [];
			vJSONDB_Offline["DBsynced"] = [];
		};
	} else {
		console.log("vJSONDB_Offline was undefined - no Data submitted!");
		vJSONDB_Offline = {};
	};
}

function handleLocalJSONDB(pQueryHash) {
	//var vDBName = "DissAppJSONDB";
	//var vDBsourceJS = document.getElementById("DissAppJSONDB").innerHTML;
	var vDBName = pQueryHash["app_database"];
	if (typeof(vJSONDB)  != "undefined" )  {
		//alert("JSONDB exists");
		if (vJSONDB) {
			console.log("vJSONDB as JS Object is defined and saved");
			vOnlineMode = true;
			saveLocalDB(vDBName,vJSONDB);
		} else {
			vOnlineMode = false;
			vJSONDB = loadLocalDB(vDBName);
			console.log("vJSONDB as JS Object is NOT defined");
		};
		vJSONDB_Offline["DBformat"] = vJSONDB["DBformat"];
	} else {
		//alert("JSONDB does not exist");
		vOnlineMode = false;
		vJSONDB = loadLocalDB(vDBName);
		console.log("vJSONDB was undefined - go online once!");
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

function compareSyncDB() {
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
function find_Record_in_OnlineDB(pRecord_Offline,pDBlines) {
	var vFound = -1;
	for (var k = 0; k < pDBlines.length; k++) {
		vRecord = pDBlines[i];
		if (compareRecordsDB(vRecord_Offline,vRecord)) {
			vFound = i;
		};
	};
	return vFound;
}

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

function check_Local_Init() {
	// check if localstorage database is initialized with DBformat
	if (vJSONDB_Offline) {
		if (vJSONDB_Offline["DBlines"]) {
			console.log("OFFLINE_"+vJSONDB["database"]+" is defined");
			compare_Offline_Online_DB();
		} else {
			console.log("OFFLINE_"+vJSONDB["database"]+" initialisation performed");
			getJSONDB_Local_Default();
			//vJSONDB_Offline["DBlines"] = [];
			//vJSONDB_Offline["DBsubmitted"] = [];
			//vJSONDB_Offline["DBsynced"] = [];
			//vJSONDB_Offline["DBformat"] = vJSONDB["DBformat"].slice(); // Duplicate Array
			//vJSONDB_Offline = getJSONDB_Local_Default();
			//vJSONDB_Offline["LastSyncLine"] = -1;
		}
	} else {
		console.log("vJSONDB_Offline does not exist - check_Local_Init()-Call");
	}
}



function compare_Offline_Online_DB() {
	// compare Offline and Online DB format
	if (vJSONDB_Offline["DBformat"].length != vJSONDB["DBformat"].length) {
		alert("WARNING: Database Format of '"+vJSONDB["database"]+"'has changed");
		vJSONDB_Offline["DBformat"] = vJSONDB["DBformat"];
	};
	// if differences occur sync data first
};

function loadOfflineDB(pDBName) {
	var vJSONDB_Offline = loadLocalDB("OFFLINE_"+pDBName);
	//check_Local_Init();
	return vJSONDB_Offline;
}

function saveOfflineDB(pDBName,pJSONDB_Offline) {
	var vLastSyncLine = pJSONDB_Offline["LastSyncLine"];
	pJSONDB_Offline["LastSyncLine"] = -1; //means recheck syncing of ALL records after app start
	// Rechecking makes sense if submission of records performed, but failed not enter the Online DB due to server problems
	saveLocalDB("OFFLINE_"+pDBName,pJSONDB_Offline);
	pJSONDB_Offline["LastSyncLine"] = vLastSyncLine; //syncing will start at the same last records
};


function getJSONDB_Local_Default() {
	vJSONDB_Offline["DBlines"] = [];
	vJSONDB_Offline["DBsubmitted"] = []; //Boolean Array showing that data was submitted by App
	vJSONDB_Offline["DBsynced"] = []; //Boolean Array showing that data is already in Online DB
	vJSONDB_Offline["LastSyncLine"] = -1;
	if (vJSONDB["DBformat"]) {
		vJSONDB_Offline["DBformat"] = vJSONDB["DBformat"].slice();
		//vJSONDB_Offline["DBtitles"] = vJSONDB["DBtitles"];
	} else {
		console.log("Init of vJSONDB_Offline failed, due to no DBformat definition of vJSONDB.");
		alert("No Database is loaded please go online to download DB format once for working OFFLINE.")
		//vJSONDB_Init["DBformat"] = ["email","username","geolocation","sampledate"];
	};
};

function saveLocalVar(pKey,pValue) {
 if (typeof(Storage) != "undefined") {
    // Store
    localStorage.setItem(pKey,pValue);
  }	 else {
    console.log("WARNING: Sorry, your browser does not support Local Storage of JSON Database. Use Firefox ...");
  }
}

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
	return vReturn;
};
