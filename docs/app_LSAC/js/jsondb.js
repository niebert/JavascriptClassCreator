// -------------------------------------------
//  DOM injection of DB Views
// -------------------------------------------
function injectListDB2DOM(pType,pUnsubmittedONLY) {
  var vID = "divListDB";
  var vOut = "";
  switch (pType) {
    case "app":
      vSelDB = vJSONDB;
    break;
    case "response":
      vSelDB = vResponseDB;
    break;
    case "feedback":
      vSelDB = vFeedbackDB;
      //vTitle = vSelDB["DBtitle"];
    break;
    default:
      alert("DB Type was not valid, use default JSON Database")
      console.log("DB Type was not found in injectListDB2DOM()-Call");
      vSelDB = vJSONDB;
  };
  vOut += getListJSONDB(vSelDB,pType,pUnsubmittedONLY);
  write2innerHTML(vID,vOut);
  write2innerHTML("divTitleListDB",getHeaderDB(vSelDB));
};

function countUnsubmitted(pDBsubmitted) {
  var vCount = -1;
  if (pDBsubmitted) {
    vCount = 0;
    for (var i = 0; i < pDBsubmitted.length; i++) {
      if(!pDBsubmitted[i]) {
        vCount++;
      };
    };
  } else {
    console.log("ERROR: pDBsubmitted undefined in countUnsubmitted()-Call ");
  };
  return vCount;
}

function getListJSONDB(pDB,pType,pUnsubmittedONLY) {
  console.log("getListJSONDB(pDB,'"+pType+"','"+pUnsubmittedONLY+"')");
  var vOut = "";
  var vInfo = "";
  if (pUnsubmittedONLY) {
    vInfo += "OFFLINE";
  } else {
    vInfo += "ALL";
  };
  //vOut += '<ul id="ul-dbviewer'+pType+'" data-role="listview">';
   bgcolor="#C0C0C0"
  if (pDB) {
    var vDBformat    = pDB["DBformat"];
    var vDB          = pDB["DBlines"];
    var vDBsubmitted = pDB["DBsubmitted"];
    vInfo += " - [";
    var vLength = vDB.length;
    if (pUnsubmittedONLY) {
      vInfo += countUnsubmitted(vDBsubmitted)+"/"+vLength+"]";
    } else {
      vInfo += vLength+"]";
    };
    //vOut += '<li data-role="list-divider">Database - '+vInfo+'</li>'; // #C0C0C0
    vOut += '<p>';
    //vOut += '<table id="ul-dbheader'+pType+'" bgcolor="white" cellspacing="10px" width="100%">';
    //vOut += '<tr"><td colspan="2"><b>Database - '+vInfo+'</b></td></tr>';
    //vOut += '</table><hr>';
    vOut += '<table id="ul-dbviewer'+pType+'" bgcolor="white" cellspacing="10px"  width="100%">';
    var vListPrefix = getListPrefixDB(pType);
    var vCount = 0;
    var vDBhash = {};
    var vSubmitted = false;
    for (var i=0;i<vDB.length;i++) {
      vCount = i+1;
      vDBhash = convertArray2Hash(vDB[i]);
      vSubmitted = vDBsubmitted[i] || false;
      if (vSubmitted && pUnsubmittedONLY) {
        console.log("Record "+i+" already submitted");
      } else {
        vOut += getItem4DisplayDB(i,vDBhash,pType,vListPrefix,vSubmitted);
      };
      //document.write("<li><a href='#displaydbrecord' onclick=\"fillContentRecordDB("+i+");alert('Display Record "+vCount+"')\">"+vCount+" "+vDB[i][0]+"</a></li>");
    };
  };
  //vOut += '</ul>';
  vOut += '</table>';
  vOut += '</p>';
  return vOut;
};

function getListPrefixDB(pType) {
  switch (pType) {
    case "app":
      return "Risk";
    break;
    case "response":
      return "Protect";
    break;
    case "feedback":
      return "Feedback";
    break;
    default:
      return "Undefined DB"
  };
};
//---------------------------------------------
//---1 checkForm
//---------------------------------------------
function checkForm(pType) {
  var vType = pType || "app";
  switch (vType) {
    case "app":
      return checkFormDB(vJSONDB,pType);
    break;
    case "response":
      return checkFormDB(vResponseDB,pType);
    break;
    case "feedback":
      return checkFormDB(vFeedbackDB,pType);
    break;
    default:
      console.log("Check Form called with unknown pType");
  }
};

function checkFormDB(pJSONDB,pType) {
  write2innerHTML(pType+"_errormsg", "");
  //var vForm = document.send2appdb.elements;
  var vDBformat     = pJSONDB["DBformat"];
  var vDBtitles     = pJSONDB["DBtitles"];
  var vDBvisible    = pJSONDB["DBvisible"];
  var vDBmandatory  = pJSONDB["DBmandatory"];
  var vElement = null;
  var vSubmit = true;
  var vMSG = "";
  var vErr = "";
  var vComma = "";
  var vCount = 0;
  var vID = "";
  for (var i=0;i<vDBformat.length;i++) {
    vID = pType+"_"+vDBformat[i];
    if (vDBvisible[i]) {
      vCount++;
      vErr = "<br>Missing Input: ("+vCount+") "+vDBtitles[i];
      var vNode = document.getElementById(vID);
      if (vNode) {
          console.log("checkForm()-Call; ["+vID+"] exists");
          if (vNode.value == "") {
            console.log("checkForm()-Call; ["+vID+"]='' value empty");
            vSubmit = false;
            vMSG += vErr;
            if (vDBformat[i] == "geolocation") {
              vSubmit = confirm("Missing Geolocation!\nDo you want to submit data anyway?");
              if (vSubmit == true) {
                //history.back();
                vNode.value = "GPS_location_undefined";
                var vGeoLocation = getLastGeoLocation();
                vUseLastGPS = confirm("Stored Geo Location FOUND!\n  GeoLoc: "+vGeoLocation+"\nDo you want to use this Geo Location?");

                console.log("Submit without GPS Location");
              };
            };
          } else {
            console.log("Input ["+vID+"]='"+vNode.value+"' OK");
          };
        } else {
          vSubmit = false;
          vMSG += vErr
          console.log("Node ["+pType+"_"+vDBformat[i]+"] undefined");
        };
    }; // if Input visible
  }; // for loop
  if (vSubmit) {
    //document.send2appdb.submit();
    return "";
  } else {
    return "INPUT ERROR:"+vMSG;
  };
};
//---------------------------------------------
//---2 printAllQuestions
//---------------------------------------------

function printAllQuestions() {
  // the IDprefix is inserted before all DOM element IDs
  var vSingleItem = true;
  document.write(createAllQuestions("app_",vSingleItem,vJSONDB));
  var vCount = countVisibleQuestions(vJSONDB);
  var vEnumRec = "[1/"+vCount+"]";
  setTimeout("write2innerHTML('footerAPPcount','"+vEnumRec+"')",400);
};

function getVisibleIDs(pDB) {
  var vDB = pDB || vJSONDB;
  var vDBformat   = vDB["DBformat"];
  var vDBvisible  = vDB["DBvisible"];
  var vCount = 0;
  var vRetArr = [];
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    if (vDBvisible[i]) {
      vRetArr.push(vID);
    };
  };
  return vRetArr;
};

function countVisibleQuestions(pDB) {
  var vArr = getVisibleIDs(pDB);
  return vArr.length;
};


function createAllQuestions(pIDprefix,pSingleItem,pDB) {
  var vSingleItem = pSingleItem || false;
  var vDB = pDB || vJSONDB;
  var vItemVisible = "";
  var vIDprefix = pIDprefix || "app_";
  var vOut = "";
  var vDBformat   = vDB["DBformat"];
  var vDBtitles   = vDB["DBtitles"];
  var vDBcolinput = vDB["DBcolinput"];
  var vDBvisible  = vDB["DBvisible"];
  var vCount = 0;
  var vType ="hidden";
  if (vDebug > 0) {
    vType="text";
  };
  console.log("createAllQuestions() vDBformat.length="+(vDBformat.length)+" pIDprefix="+pIDprefix);
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    if (vDBvisible[i]) {
      vCount++;
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      vOut += "<li id='FORMVAR_"+pIDprefix+vCount+"' "+vItemVisible+">("+vCount+") "+vDBtitles[i]+"<br> "+vDBcolinput[vID]+" </li>";
      //alert(vDBformat[i]+" visible");
      if (vSingleItem) {
        vItemVisible = " style='display:none' ";
      };
    } else {
      //alert(vDBformat[i]+" not visible");
      if (vDebug > 0) {
        vOut += vID+": ";
      };
      vOut += "<input type='"+vType+"' name='"+vID+"' id='\""+vIDprefix+vID+"' style='\"display:none\"'>";
    };
  };
  return vOut;
};
//---------------------------------------------
//---3 printAllResponses
//---------------------------------------------
function printAllResponses() {
  // the IDprefix is inserted before all DOM element IDs
  var vSingleItem = true;
  document.write(createAllQuestions("response_",vSingleItem,vResponseDB));
  var vCount = countVisibleQuestions(vResponseDB);
  var vEnumRec = "[1/"+vCount+"]";
  setTimeout("write2innerHTML('footerRESPONSEcount','"+vEnumRec+"')",400);
};


function X_printAllResponses() {
  // the IDprefix is inserted before all DOM element IDs
  document.write(createAllResponses("response_"));
};

function createAllResponses(pIDprefix) {
  var vIDprefix = pIDprefix || "response_";
  var vOut = "";
  vOut += createResponses(pIDprefix,"home");
  vOut += createResponses(pIDprefix,"yourself");
  vOut += createHiddenFormJSON(pIDprefix,["email","usergroup","geolocation","moddate","recdate"]);
  //vOut += "<button id='bSubmitResponses' onclick='submitResponseJSON()'>Submit Response</button>";
  return vOut;
};

function createResponses(pIDprefix,pDBID) {
  //  ("response_","home")
  console.log("createResponses('"+pIDprefix+"','"+pDBID+"')");
  var vResonseArr = vResponseDB[pDBID];
  var vTitle      = vResponseDB["id2title"][pDBID];
  var vTPLID      = vResponseDB["id2select"][pDBID];
  var vSelectTPL  = vResponseDB["select"][vTPLID];
  var vCount = 0;
  var vOut = "";
  vOut+="<h2 id='h2TITLE"+pDBID+"'>"+vTitle+"</h2>";
  vOut+="<ul id='listview"+pDBID+"' data-role='listview' data-inset='true'>";
  var vSelect = "";
  for (var i=0;i<vResonseArr.length;i++) {
      vCount++;
      vSelect = replaceString(vSelectTPL,"___COUNT___",pIDprefix+pDBID+vCount);
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      vOut += "<li id='FORMVAR"+pIDprefix+vCount+"'>("+vCount+") "+vResonseArr[i]+"<br> "+vSelect+" </li>";
      //alert(vDBformat[i]+" visible");
  };
  vOut+="</ul>";
  return vOut;
};
//---------------------------------------------
//---4 printAllFeedback
//---------------------------------------------

function printAllFeedback() {
  // the IDprefix is inserted before all DOM element IDs
  var vSingleItem = true;
  document.write(createAllQuestions("feedback_",vSingleItem,vFeedbackDB));
  var vCount = countVisibleQuestions(vFeedbackDB);
  var vEnumRec = "[1/"+vCount+"]";
  setTimeout("write2innerHTML('footerFEEDBACKcount','"+vEnumRec+"')",400);
};

function X_printAllFeedback() {
  // the IDprefix is inserted before all DOM element IDs
  document.write(createAllFeedback("feedback_"));
};

function createAllFeedback(pIDprefix) {
  var vIDprefix = pIDprefix || "feedback_";
  var vOut = "";
  var vDBformat   = vFeedbackDB["DBformat"];
  var vDBtitles   = vFeedbackDB["DBtitles"];
  var vDBcolinput = vFeedbackDB["DBcolinput"];
  var vDBvisible  = vFeedbackDB["DBvisible"];
  var vCount = 0;
  var vType ="hidden";
  if (vDebug > 0) {
    vType="text";
  };
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    if (vDBvisible[i]) {
      vCount++;
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      vOut += "<li id='FORMVAR"+vCount+"'>("+vCount+") "+vDBtitles[i]+"<br> "+vDBcolinput[vID]+" </li>";
      //alert(vDBformat[i]+" visible");
    } else {
      //alert(vDBformat[i]+" not visible");
      if (vDebug > 0) {
        vOut += vID+": ";
      };
      vOut += "<input type='"+vType+"' name='"+vID+"' id='\""+vIDprefix+vID+"' style='\"display:none\"'>";
    };
  };
  return vOut;
};

function createSubmitFormJSON() {
  if (typeof(vJSONDB) !== undefined) {
    var vMax4Page = 4;
    createDatabaseHTML4JSON("Form",vMax4Page);
    printFormPages(vMax4Page);
  } else {
    console.log("JSONDB was undefined! No local storage of JSONDB");
  };
};

function createDisplayFormJSON() {
  if (typeof(vJSONDB) !== undefined) {
    var vMax4Page = 4;
    createDatabaseHTML4JSON("Display",vMax4Page);
    printDisplayPages(vMax4Page);
  } else {
    console.log("JSONDB was undefined! No local storage of JSONDB");
  };
};

function getQuestionCount() {
  var vDBvisible  = vJSONDB["DBvisible"];
  //var vDBformat   = vJSONDB["DBformat"];
  //var vDBtitles   = vJSONDB["DBtitles"];
  //var vDBcolinput = vJSONDB["DBcolinput"];
  //var vDBvisible  = vJSONDB["DBvisible"];
  var vQuestionCount = 0;
  for (var i = 0; i < vDBvisible.length; i++) {
    if (vDBvisible[i] == true) {
      vQuestionCount++;
    }
  };
  return vQuestionCount;
}

function getPagesCount(pMax4Page) {
    var vMax4Page = pMax4Page || 4;
    var vQuestions = getQuestionCount();
    return divmod(getQuestionCount(),vMax4Page)+1;
}

function getSelectPageCount(pMaxSelector) {
  var vMaxSelector = pMaxSelector || 5;
  var vPages = getPagesCount();
  // vPages "-1" because first SelectorPage has one Page Selector Button less
  // vMaxSelector "-1" because each Selector has a [<] Button extra to previous
  return divmod(vPages-1,vMaxSelector-1)+1;
};

function createDatabaseHTML4JSON(pPageType,pMax4Page) {
    //alert("JSONDB was defined!");
    var vID = "";
    var vPages = 1; //getPagesCount(pMax4Page);
    //var vPages = divmod(getQuestionCount(),pMax4Page)+1;
    console.log("createDatabaseHTML4JSON()");
    if (vPages == 1) {
      //alert("Single Page Form")
    } else {
      //alert("Multiple Pages Form "+vPage);
      //printPageSelector(vPages,pPageType);
    };
}


function setSelectTableForm (pSelTableNumber,pSelPages) {
  setSelectTable (pSelTableNumber,pSelPages,"Form");
}

function setSelectTableDisplay (pSelTableNumber,pSelPages) {
  setSelectTable (pSelTableNumber,pSelPages,"Display");
}

function setSelectTable (pSelTableNumber,pSelPages,pPageType) {
  console.log("("+pPageType+") Select Pages No="+pSelTableNumber+" Max Selector Pages="+pSelPages);
  for (var i=1;i<=pSelPages;i++) {
    if (i == pSelTableNumber) {
      show("seltable"+pPageType+i);
    } else {
      hide("seltable"+pPageType+i);
    }
  }
};

function printPageSelector(pPages,pPageType) {
  document.write(getPageSelector(pPages,pPageType));
};

function getPageSelector (pPages,pPageType) {
  var vPageType = pPageType || "Form";
  var vOut = "";
  var vSelCount = 0;
  var vSelTableCount = 0;
  var vLabel = "";
  var vTableLabel = "";
  var vMaxSelector = 5;
  vOut += "<div id='seltable"+pPageType+"1'>";
  vOut += '<table width="100%" height="40px" border=0 ><tr>';
  // In general 5 Page Buttons per Line, One Button is [>], so in general 4 Page Buttons
  //var vMaxSelPages = divmod(pPages-1,vMaxSelector-1)+1;
  //var vMaxSelPages = getSelectPageCount(5); //without parameter default=5 is used
  var vMaxSelPages = getSelectPageCount(vMaxSelector);
  console.log("Buttons for Pages="+pPages+" Selector Pages="+vMaxSelPages);
  for (var i=1;i<=pPages;i++) {
    vSelCount++;
    vOut += "<td>";
    if (vSelCount == vMaxSelector) {
      vSelTableCount++;
      console.log("Create ["+pPageType+"]-Select Table with vSelTableCount="+vSelTableCount);
      vLabel = "&gt;";
      vTableLabel = vSelTableCount+1;
      vOut += "<input class='ui-btn' type='button' value='"+vLabel+"' onclick='show"+vPageType+"Page("+i+","+pPages+");setSelectTable"+vPageType+"("+vTableLabel+","+vMaxSelPages+")' />";
      vOut += "</td>";
      vSelCount = 0;
      vOut += "</tr></table>";
      vOut += "</div>";
      vLabel = "&lt;";
      vOut += "<div id='seltable"+pPageType+vTableLabel+"' style='display:none'>";
      //vOut += "<div id='seltable"+vTableLabel+"'>";
      vTableLabel = vSelTableCount;
      vOut += '<table width="100%" height="40px" border=0><tr>';
      vOut += "<td>";
      vOut += "<input class='ui-btn' type='button' value='"+vLabel+"' onclick='show"+vPageType+"Page("+(i-1)+","+pPages+");setSelectTable"+vPageType+"("+vTableLabel+","+vMaxSelPages+")' />";
      vOut += "</td>";
      vOut += "<td>";
      vSelCount = 1;
    };
    vLabel = i;
    vOut += "<input class='ui-btn' type='button' value='"+vLabel+"' onclick='show"+vPageType+"Page("+i+","+pPages+")' />";
    //vOut += "<button onclick='showFormPage("+i+","+vPage+")' >"+i+"</button>";
    vOut += "</td>";
  };
  vOut += "</tr></table>";
  vOut += "</div>";
  //document.getElementById("PageButtons").innerHTML = vOut;
  return vOut;
};

function getHeaderDB(pJSONDB) {
  var vOut = "<h2>"+pJSONDB["DBtitle"]+"</h2>";
  vOut += "<i>"+pJSONDB["DBsubtitle"]+" ["+pJSONDB["database"]+"]</i>";
  return vOut
};

function printHeader(pType) {
  var vType = pType || "app";
  var vDB = getDB4Type(vType);
  document.write(getHeaderDB(vDB));
};

function printFormPages(pMax4Page) {
  document.write(getFormPages(pMaxPage,vJSONDB));
};

function getFormPages(pMax4Page,pJSONDB) {
  var vOut = "";
  var vMax4Page = pMax4Page || 4;
  var vDBformat   = pJSONDB["DBformat"];
  var vDBtitles   = pJSONDB["DBtitles"];
  var vDBcolinput = pJSONDB["DBcolinput"];
  var vDBvisible  = pJSONDB["DBvisible"];
  var vMax4Page = pMax4Page || 4;
  var vPage = 0;
  var vCount = 0;
  var vType ="hidden";
  if (vDebug > 0) {
    vType="text";
  };
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    if (vDBvisible[i]) {
      vCount++;
      if (vCount == 1) {
        vPage++;
        if (vPage == 1) {
          vOut += "<div id=\"forminput"+vPage+"\" >";
        } else {
          vOut += "<div id=\"forminput"+vPage+"\" style=\"display:none\">";
        };
      };
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      vOut += vPage+"."+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+" ";
      if (vCount == vMax4Page) {
        vOut += "</div>";
        vCount = 0;
      };
      //alert(vDBformat[i]+" visible");
    } else {
      //alert(vDBformat[i]+" not visible");
      if (vDebug > 0) {
        vOut += vID+": ";
      };
      vOut += "<input type='"+vType+"' name='"+vID+"' id='\"formdb_"+vID+"' style='\"display:none\"'>";
    };
  };
  vOut += "</div>";
  return vOut;
};

function printDisplayPages(pMax4Page) {
  document.write(getDisplayPages(pMax4Page,vJSONDB));
};

function getDisplayPages(pMax4Page,pJSONDB) {
  var vOut = "";
  var vMax4Page = pMax4Page || 4;
  var vDBformat   = pJSONDB["DBformat"];
  var vDBtitles   = pJSONDB["DBtitles"];
  //var vDBcolinput = pJSONDB["DBcolinput"];
  var vDBvisible  = pJSONDB["DBvisible"];
  var vMax4Page = pMax4Page || 4;
  var vPage = 0;
  var vCount = 0;
  var vID = "";
  for (var i=0;i<vDBformat.length;i++) {
    if (vDBvisible[i]) {
      vCount++;
      if (vCount == 1) {
        vPage++;
        if (vPage == 1) {
          vOut += "<div id=\"displayinput"+vPage+"\" >";
        } else {
          vOut += "<div id=\"displayinput"+vPage+"\" style=\"display:none\">";
        };
      };
      vID = vDBformat[i];
      //document.write("<li>"+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+"</li>");
      //document.write(vPage+"."+vCount+" "+vDBtitles[i]+": "+vDBcolinput[vID]+" ");
      vOut += vPage+"."+vCount+" "+vDBtitles[i]+": <div style='background:white' id='dbcontent_"+vID+"'>"+vID+"</div><hr/>";
      if (vCount == vMax4Page) {
        vOut += "</div>";
        vCount = 0;
      };
      //alert(vDBformat[i]+" visible");
    } else {
      //alert(vDBformat[i]+" not visible");
    };
  };
  vOut += "</div>";
  return vOut;
};


function getLocalRecords(pDBID) {
  var vReturn = [];
  var vDBID = pDBID || "DBlines";
  if (vJSONDB_Offline) {
    console.log("vJSONDB_Offline exists in getLocalRecords('"+pDBID+"')");
  } else {
    console.log("vJSON_Offline does not exist!");
    top.vJSON_Offline = {};
  };
  if (vJSONDB_Offline[vDBID]) {
    vReturn = vJSONDB_Offline[vDBID];
  } else {
    console.log("vJSON_Offline exists vJSON_Offline['"+vDBID+"'] does not exist.");
    vJSONDB_Offline[vDBID] = [];
  };

  return   vReturn;
};

function initDBrecord() {
  fillDefaultRecordDB();
  retrieveLocation(fillDefaultGeolocationDB);
};

function fillDefaultGeolocationDB(pPosition) {
  var vQueryHash = readQueryParams();
  var vDBformat   = vJSONDB["DBformat"];
  var vID = "";
  var vNode = null;
  if (vDBformat) {
    for (var i=0;i<vDBformat.length;i++) {
      vID = vDBformat[i];
      if (vID == "geolocation") {
        vNode = document.send2appdb.elements[vID];
        if (!vNode) {
          console.log("vNode["+vID+"] is undefined");
        } else if (pPosition) {
          vNode.value = createGeoLocation(pPosition);
        } else {
          console.log("fillDefaultGeolocationDB()-Call pPosition undefined!");
        }
      }
    }
  }
};

function fillDefaultRecordDB() {
  var vQueryHash = readQueryParams();
  var vDBformat   = vJSONDB["DBformat"];
  var vID = "";
  var vNode = null;
  for (var i=0;i<vDBformat.length;i++) {
    vID = vDBformat[i];
    vNode = document.send2appdb.elements[vID];
    if (vNode) {
        switch (vID) {
          case "username":
            vNode.value = vQueryHash["app_username"];
            break;
          case "email":
            vNode.value = vQueryHash["app_email"];
            break;
          case "recdate":
            vNode.value = getDate4DB();
            break;
          case "moddate":
            vNode.value = Date();
            break;
          case "sampledate":
            vNode.value = getDate4DB();
            break;
          default:
            vNode.value = "";
        }
    } else {
        console.log("WARNING: Init failed for form element ["+vID+"], because DOM element does not exist!");
    };
  };
};

function fillSubmitRecordDB(pIndex) {
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vDBlines    = getLocalRecords(); // vJSONDB["DBlines"];
  var vID = "";
  var vMax = vDBformat.length;
  if ((pIndex >=0) && (pIndex < vDBlines.length)) {
    if (vDBlines[pIndex].length < vDBformat.length) {
      vMax = vDBlines[pIndex].length;
      console.log("ERROR: Record length(="+vDBlines[pIndex].length+") shorter with length of DB format(="+vMax+")");
    } else {
      if (vDBlines[pIndex].length < vDBformat.length) {
        console.log("ERROR: Record length(="+vDBlines[pIndex].length+") longer with length of DB format(="+vMax+")");
      }
    };
    for (var i=0;i<vMax;i++) {
      //if (vDBvisible[i]) {
      vID = vDBformat[i];
      if (document.send2appdb.elements[vID]) {
          document.send2appdb.elements[vID] = vDBlines[pIndex][i];
      } else {
          console.log("WARNING: Form element ["+vID+"] does not exist in Submit form");
      };
    }
  } else {
    console.log("pIndex="+pIndex+" is out of range. vDBlines.length="+vDBlines.length);
  }

}

function fillOfflineRecordDB(pIndex,pIDprefix) {
  var vIDprefix = pIDprefix || "app_";
  var vDBformat   = vJSONDB["DBformat"];
  var vDBtitles   = vJSONDB["DBtitles"];
  var vDBvisible  = vJSONDB["DBvisible"];
  var vDBlines    = vJSONDB_Offline["DBlines"];
  var vID = "";
  if ((pIndex >=0) && (pIndex < vDBlines.length)) {
    for (var i=0;i<vDBformat.length;i++) {
      vID = vDBformat[i];
      write2value(vIDprefix + vID , vDBlines[pIndex][i]);
      //$("#dbcontent_"+vID).html(vDBlines[pIndex][i]);
    }
  } else {
    console.log("JSONDB_Offline pIndex="+pIndex+" is out of range. vDBlines.length="+vDBlines.length);
  }

};

function fillContentRecordDB(pIndex,pType,pJSONDB) {
  var vDB = pJSONDB || vJSONDB;
  var vType = pType || "app";
  var vDBformat    = vDB["DBformat"];
  var vDBtitles    = vDB["DBtitles"];
  var vDBvisible   = vDB["DBvisible"];
  var vDBlines     = vDB["DBlines"];
  var vDBsubmitted = vDB["DBsubmitted"];
  var vID = "";
  if (vDBlines.length == 0) {
    console.log("Database ["+vDB["database"]+"] contains no records");
  } else {
    if ((pIndex >=0) && (pIndex < vDBlines.length)) {
      for (var i=0;i<vDBformat.length;i++) {
        if (vDBvisible[i]) {
          vID = vDBformat[i];
          $("#"+vType+"_"+vID).val();
        };
      };
      // if already submitted
      if (vDB["DBsubmitted"][pIndex]) {
        console.log("fillContentRecordDB() SUBMITTED (1) hide the submit button and (2) display an update Button");
      } else {
        console.log("fillContentRecordDB() NOT SUBMITTED YET (1) show submit button and (2) hide an update Button");
        //JQuery $('.myclass') Class
        //JQuery $('#myid') ID of DOM element
        //JQuery $('tag') all DOM elements with TAG
      }
    } else {
      console.log("pIndex="+pIndex+" is out of range. vDBlines.length="+vDBlines.length);
    }
  }
}

function getItem4DisplayDB(pIndex,pDBhash,pType,pPrefix,pSubmitted) {
  // displays a row for a table with a single record in the Database
  var vType = pType || "app";
  var vPrefix = pPrefix || "Questionnaire";
  var vCount = pIndex + 1;
  //var vLabel = pPrefix+" ["+pType+"] "+pDBhash["recdate"];
  var vLabel = vPrefix+" - "+pDBhash["recdate"];
  //return "<li><a href='#pDisplayRecord' onclick=\"fillContentRecordDB("+pIndex+",'"+vType+"',"+vStrDB+")\">"+vCount+" "+vLabel+"</a></li>";
  var vOut = "<tr><td>";
  vOut += vCount+"</td><td>"+vLabel+"</td><td>" ;
  if (!pSubmitted) {
    // Page
    //vOut += "<button class='ui-disapp' onclick=\"submitRecord4LocalStorage("+pIndex+",'"+vType+"');return false\">Submit</button>";
    vOut += "<input type='button' class='ui-disapp' id='bLC"+pType+pIndex+"'onclick=\"submitRecord4LocalStorage("+pIndex+",'"+vType+"');return false\" value='SUBMIT'>";
  } else {
    //vOut += "<button class='ui-disapp' onclick=\"displayRecord4DB("+pIndex+",'"+vType+"');return false\">VIEW</button>";
    vOut += "[OK]";
  };
  vOut += "</td></tr>";
  return vOut;
};

function getGeneralIDs() {
  return ["email","usergroup","geolocation","recdate","moddate"];
}

function createHiddenFormJSON(pDBType,pArrID) {
  var vDBType = pDBType || "app_";
  var vArrID = pArrID || getGeneralIDs();
  var vType ="hidden";
  var vOut = "";
  var vDebugLabel = "";
  if (vDebug > 0) {
    vType="text";
  };
  for (var i = 0; i < pArrID.length; i++) {
    vOut += '<input type="'+vType+'" name="'+vArrID[i]+'" id="'+vDBType+vArrID[i]+'" value="" />';
  };
  return vOut;
}


function write_OLD_DB4DOM() {
  if (typeof(vJSONDB) != undefined) {
    //alert("JSONDB was defined!");
    var vDB = vJSONDB["DBlines"];
    var vCount = 0;
    var vDBhash = {};
    for (var i=0;i<vDB.length;i++) {
      vCount = i+1;
      vDBhash = convertArray2Hash(vDB[i]);
      document.write(getItem4DisplayDB(i,vDBhash));
      //document.write("<li><a href='#displaydbrecord' onclick=\"fillContentRecordDB("+i+");alert('Display Record "+vCount+"')\">"+vCount+" "+vDB[i][0]+"</a></li>");
    };
  } else {
    alert("Offline JSONDB was undefined!")
  }

}
