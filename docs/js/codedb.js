

function getDatabaseJSON2String(pDB) {
  var vDB = pDB || "";
  var vContent = "";
  if (existsDatabaseJS(vDB)) {
    var vDB_JSON = cloneJSON(vJSCC_DB["DatabaseList"][vDB]);
    replaceElements4Hash(vDB_JSON);
    vContent = stringifyJSON(vDB_JSON);
  } else {
    vContent = "// Database ["+vDB+"] undefined in vJSCC_DB['DatabaseList']";
  };
  console.log("Return the Content of Database ["+vDB+"]");
  return vContent;
};

function createDatabaseVarIDSelect(pDBID) {
  var vDBID = pDBID || getValueDOM("sDatabaseID");
  if (vJSCC_DB["DatabaseList"].hasOwnProperty(vDBID)) {
    var vDB = vJSCC_DB["DatabaseList"][vDBID];
    var vDBIDArr = getArray4HashID(vDB["format"]);
    write2innerHTML("sDatabaseID",createOptions4Array(vDBIDArr));
    if (vDBIDArr.length > 0) {
      console.log("DBIDArr='"+vDBIDArr.join(",")+"'");
      selectDatabaseVarID(vDBIDArr[0]);
    };
    var vDBIDs = vDBIDArr.join("|");
    write2value("tDatabaseIDs",vDBIDs);
  };
};

function write2exportedDB(pDB,pUsePrefix) {
  var vDB = pDB || "";
  if (vDB != "") {
    var vFileDB = getFilenameWithPath4DB(vDB,pUsePrefix);
    setFilenameExportJSON(vFileDB);
    write2value("tExportedJSON",vDB);
  } else {
    write2innerHTML("labExportFile","");
    write2value("tExportedJSON","");
  };
};

function getSaveFilename4DB(pDB,pUsePrefix) {
  var vUsePrefix = pUsePrefix || getCheckBox("checkUsePrefix");
  var vDB = pDB || "";
  var vExtension = getExtension4DB(vDB,vUsePrefix);
  if (vDB != "") {
    vDB = vDB.replace(/[^A-Za-z0-9_\.]/g,"_");
  };
  return vDB+vExtension;
}

function getExtension4DB(pDB,pUsePrefix) {
  var vUsePrefix = pUsePrefix || getCheckBox("checkUsePrefix");
  var vDB = pDB || "";
  var vExtension = ".json";
  if (vUsePrefix == true) {
    vExtension = ".js";
  };
  if (vDB == "") {
    vExtension = "";
  };
  return vExtension;
};

function getFilenameWithPath4DB(pDB,pUsePrefix) {
  var vDB = pDB || "";
  var vPath = "";
  var vExtension = getExtension4DB(vDB,pUsePrefix);
  if (vDB == "") {
    vExtension = "";
    vPath = "";
  } else if (existsDatabaseJS(vDB)) {
    console.log("getFilenameWithPath4DB()-Call: Database ["+vDB+"] exists");
    vPath = getValueDOM("tDefaultAppPath")+"db/";  // this is the default app_Path
  } else {
    vPath = "prog/";
  };
  vPath += vDB + vExtension;
  return vPath;
};


function createDatabaseJSON(pUsePrefix) {
  var vUsePrefix = pUsePrefix || getCheckBox("checkUsePrefix");
  var vDB = getValueDOM("sDatabases");
  if (vDB == "") {
    //vDB = "project";
    console.log("WARNING: createDatabaseJSON() vDB undefined");
    alert("No Database was selected! Please select a database first");
    //alert("No Database was selected! Will export [Project JSON]");
    //createProjectJSON();
  } else {
    var vType = "JSON"; //i.e. JS or JSON
    if (vUsePrefix == true) {
      vType = "JS";
    };
    var vFileDB = getFilenameWithPath4DB(vDB);
    write2exportedDB(vDB);
    // sExportPrefix = "JSON" means do not use the export prefix, it is pure JSON,
    selectDatabase();
    alert("Exported Database: '"+vFileDB+"' Format: '"+vType+"'");
    var vFileName = getSaveFilename4DB(vDB);
    var vContent = getDatabaseJSON2String(vDB);
    write2editor(iJSONDB,vContent);
    saveFile2HDD(vFileName,vContent);
  };
};


function getDatabasesHTML(pFile,pStandalone) {
  console.log("getDatabasesHTML('"+pFile+"','"+pStandalone+"')");
  var vArrDB = getDatabaseArray();
  var vOut = "\n<!-- JSON Databases -->\n";
  if (pStandalone == "YES") {
    var vSCRIPT = getValueDOM("tTplSCRIPTSTANDALONE");
    vOutJS = "";
    for (var i = 0; i < vArrDB.length; i++) {
      if (existsDatabaseJS(vArrDB[i])) {
        vOutJS += "\n//---- JSON 'db/"+vArrDB[i]+".js' ----\n";
        vOutJS += "\nvDataJSON['"+vArrDB[i]+"'] = ";
        vOutJS += stringifyDatabaseJSON(vJSCC_DB["DatabaseList"][vArrDB[i]]);
        vOutJS += ";\n";
      };
    };
    vOut += replaceString(vSCRIPT,"___JSCODE___",vOutJS);

  } else {
    var vSCRIPT = getValueDOM("tTplSCRIPT");
    vOut = "      <!-- JSON Databases -->\n";
    for (var i = 0; i < vArrDB.length; i++) {
      vOut += replaceString(vSCRIPT,"___LIBRARY___","db/"+vArrDB[i]+".js");
    };
  };
  return vOut;
};

function stringifyDatabaseJSON(pJSON) {
  var vOut = "// stringifyDatabaseJSON(pJSON) undefined"
  if (pJSON && isHash(pJSON)) {
    var vJSON = cloneJSON(pJSON);
    replaceElements4Hash(vJSON);
    vOut = stringifyJSON(vJSON);
  };
  return vOut;
}
