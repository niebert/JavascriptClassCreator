function getDate() {
  return getDate4DB();
};

function getLastGeoLocation() {
  return loadLocalVar("geolocation");
}

function getDate4DB() {
  var date = new Date();
  var year  = date.getFullYear();
  var month = date.getUTCMonth() + 1;
  var day   = date.getUTCDate();
  var hours = date.getUTCHours();
  var min = date.getUTCMinutes();
  var sec = date.getUTCSeconds();
  var millsec = date.getUTCMilliseconds();
  //return year+"/"+month+"/"+day+" "+hours+":"+min+":"+sec+"."+millsec;
  return year+"/"+month+"/"+day+" "+hours+":"+min+"."+sec;
}

function getLoginGeolocation() {
  retrieveLocation(insertPosition);
};

//This is called from Submit Form
function getCurrentGeolocation() {
  retrieveLocation(insertFormPosition);
};

function setFormLocation() {
  retrieveLocation(insertFormPosition);
};

function retrieveLocation(pCallback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pCallback);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
};

function createGeoLocation(pPosition) {
  return pPosition.coords.latitude+" "+ pPosition.coords.longitude;
};

function insertFormPosition(pPosition) {
  //var vGeoLocation = document.getElementById("currentGeolocation").value;
  var vGeoLocation = createGeoLocation(pPosition);
  write2value("app_geolocation",vGeoLocation);
  write2value("response_geolocation",vGeoLocation);
  write2value("feedback_geolocation",vGeoLocation);
  write4name2value("geolocation",vGeoLocation);
  saveGeoLocation2LocalStorage(vGeoLocation);
};

function saveGeoLocation2LocalStorage(pGeoLocation) {
  saveLocalVar("geolocation",pGeoLocation);
}


function insertPosition(pPosition) {
    //var x = document.getElementById("outputgeo");
    //x.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
    //alert("Latitude: "+pPosition.coords.latitude+" Longitude: " + pPosition.coords.longitude);
    //var vGeoLocation = pPosition.coords.latitude+" "+ pPosition.coords.longitude;
    var vGeoLocation= createGeoLocation(pPosition)
    document.getElementById("currentGeolocation").value = vGeoLocation;
    saveLocalVar("geolocation",vGeoLocation);
};
