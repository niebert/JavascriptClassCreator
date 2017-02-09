function initDisApp() {
  loadAllOfflineJSONDB();
  //handleOfflineJSONDB(vQueryHash);
  setFormLocation();
  var vKey = "sDisclaimer";
  write2value(vKey,loadLocalVar(vKey));
  initVariables4DOM();
  //initResponseDB();
};

function initResponseDB() {
  var vValue = "";
  var vIDs = ["recdate","autonr","geolocation","sampledate","moddate","usergroup","email" ];
  var vTitles = ["Record Date","No.","Geo Location","Sample Date","Modify Date","User Group","e-Mail" ];

  for (var i = 0; i < vIDs.length; i++) {
    vValue = vJSONDB["DBcolinput"][vIDs[i]];
    vResponseDB["DBcolinput"][vIDs[i]] = replaceString(vValue,"app_","response_");
    vResponseDB["DBvisible"].push(false);
    vResponseDB["DBmandatory"].push(false);
    vResponseDB["DBtitles"].push(vTitles[i]);
    vResponseDB["DBformat"].push(vIDs[i]);
  };
  var vSubGroup = ["home","yourself"];
  var vSubID = "";
  var vTitle = "";
  var vSelect = "";
  var vSelID = "";
  var vID = "";
  var vList = null;
  for (var i = 0; i < vSubGroup.length; i++) {
    vSubID = vSubGroup[i]; // "home" or "yourself"
    vList = vResponseDB[vSubID]; // hash of questions
    vTitle = vResponseDB["id2title"][vSubID];
    vSelID = vResponseDB["id2select"][vSubID];
    vSelect = vResponseDB["select"][vSelID];
    var vCount=0;
    for (var iID in vList) {
      if (vList.hasOwnProperty(iID)) {
        vCount++;
        vID = vSubID+vCount; // home1, home2, ..., yourself1, yourself2,..
        vValue = vSelect;
        vValue = replaceString(vSelect,"___COUNT___","response_"+vID);
        vResponseDB["DBcolinput"][vID] = vValue;
        vResponseDB["DBvisible"].push(true);
        vResponseDB["DBmandatory"].push(true);
        vResponseDB["DBtitles"].push("<font color='red'>"+vTitle+"</font><br>"+vList[iID]);
        vResponseDB["DBformat"].push(vID);
      };
    };
  };
  console.log("ResponseDB: DBformat=["+vResponseDB["DBformat"].join(",")+"]");
}

function initVariables4DOM() {
  write4name2value("recdate",getDate());
  write4name2value("moddate",getDate());
  write4name2value("sampledate",Date.now());
  write4name2value("submiturl",vQueryHash["app_submiturl"]);
  write4name2value("autonr","-");
  write4name2value("usergroup",vQueryHash["app_usergroup"]);
  //----- e-Mail --------
  write2value("disclaimer_email",vQueryHash["app_email"]);
  write2value("settings_email",vQueryHash["app_email"]);
  //----- Database --------
  write2value("app_database",vQueryHash["app_database"]);
  write2value("save_database",vQueryHash["app_database"]);
  write2value("settings_database",vQueryHash["app_database"]);
  write2value("disclaimer_database",vQueryHash["app_database"]);
  //write2innerHTML("disclaimer_database",vQueryHash["app_database"]);
  //----- SubmitURL --------
  if (vQueryHash["app_submiturl"]) {
    write2value("save_submiturl",vQueryHash["app_submiturl"]); // visible in Disclaimer
    write2value("settings_submiturl",vQueryHash["app_submiturl"]); // visible in Settings
    write2innerHTML("disclaimer_submiturl",vQueryHash["app_submiturl"]); //hidden in Disclaimer
    //document.getElementById("send2appdb").action = vQueryHash["app_submiturl"];
  } else {
     console.log("Submit URL was undefined!");
  };
}


function updateSetting(pNameID,pValue) {
  switch (pNameID) {
    //--------
    case "recdate":
      write4name2value(pNameID,getDate());
    break;
    //--------
    case "recdate":
      write4name2value(pNameID,getDate());
    break;
    //--------
    case "geolocation":
      write4name2value(pNameID,getDate());
    break;
    //--------
    default:

  }
}

function updateQuery2DOM(pQuery) {
  // pQuery is the Query String of the document location
  //$("#app_database").value = pQuery["app_database"]; //$("#database").value;
  //document.getElementById("app_submiturl").value = pQuery["app_submiturl"];
  //var vNode = document.getElementById("send2appdb");
  //if (vNode) {
  	//vNode.setAttribute("action",pQuery["app_database"]);
  //};
  $('#send2appdb').attr('action', pQuery["app_database"]);
  //$("#send2appdb").action  = $("#app_database").value;
  initVariables4DOM();
};
