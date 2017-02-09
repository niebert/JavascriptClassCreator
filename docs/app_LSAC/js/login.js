function loginDisApp() {
  var vAppStartBoolean = true;
  var vCheckGPS=getValueDOM('currentGeolocation');
  var vUserGroup=encodeURLparam(getValueDOM('app_usergroup'));
  var vEMail=encodeURLparam(getValueDOM('app_email'));
  var vDBselect = getValueDOM('app_database');
  var vDatabase = encodeURLparam(vDBselect);
  var vSubmitURL=encodeURLparam(getValueDOM('app_submiturl'));
  saveLocalVar('app_usergroup',vUserGroup);
  saveLocalVar('app_email',vEMail);
  saveLocalVar('app_submiturl',vSubmitURL);
  // v$("#username").value
  var vMSG="<b>ERROR:</b><br />";
  //alert("Login Check: User="+vUser+" Passord="+vPWD+" JQ-User="+$("#username").value);
  if (vCheckGPS =="") {
    vMSG+="Please check GPS first and switch on GPS on your device if possible <br>\n";
    vAppStartBoolean = false;
  };
  if (vUserGroup =="") {
    vMSG+="Please enter User Name <br>\n";
    vAppStartBoolean = false;
  };
  if (vUserGroup =="") {
    vMSG+="Please select User Group <br>\n";
    vAppStartBoolean = false;
  };
  if (vEMail =="") {
    vMSG+="Please enter your E-Mail Address <br>\n";
    vAppStartBoolean = false;
  };
  if (vDatabase =="") {
    vMSG+="Error: Database was not defined";
    vAppStartBoolean = false;
  };
  if (vAppStartBoolean) {
    document.getElementById("errormsg").innerHTML = "";
    var d = new Date();
    var n = d.getTime();
    if (checkMobil()) {
          //document.location.href="app.html?username="+vUser+"&database="+vDatabase;
        openWinHTMLsize("disapp.html?app_submiturl="+vSubmitURL+"&app_usergroup="+vUserGroup+"&app_database="+vDatabase+"&app_email="+vEMail,"500","700");
    } else {
        openWinHTML("disapp.html?app_submiturl="+vSubmitURL+"&app_usergroup="+vUserGroup+"&app_database="+vDatabase+"&app_email="+vEMail);
    };
  } else {
    showErrorMessage(vMSG);
  };
};


function loginCheck() {
  var vAppStartBoolean = true;
  var vUser=document.getElementById('username').value;
  var vPWD=document.getElementById('pwd').value;
  // v$("#username").value
  var vMSG="<b>ERROR:</b><br />";
  //alert("Login Check: User="+vUser+" Passord="+vPWD+" JQ-User="+$("#username").value);
  if (vUser =="") {
    vMSG+="Please enter User Name <br />\n";
    vAppStartBoolean = false;
  };
  if (vPWD =="") {
    vMSG+="Please enter the Password";
    vAppStartBoolean = false;
  };
  if (vAppStartBoolean) {
    document.getElementById("errormsg").innerHTML = "";
    var d = new Date();
    var n = d.getTime();
    if (checkMobil()) {
          document.location.href="app.html";
    } else {
        openWinHTML('app.html');
    };
  } else {
    showErrorMessage(vMSG);
  };
};

function X_getQueryParams(pURL) {
    // replace '+' by ' '
    pURL = pURL.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(pURL)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
//alert(document.location.search);
//var query = getQueryParams(document.location.search);
//alert(query.foo);
