// iJE: init JSON Editor is used to populate the JSON editor
// sJE: sync JSON Editor is used to sync back JSON editor content into JSCC

function openWinEditorJSON(pSchemaID) {
  var vSchemaID = pSchemaID || "ovitrapmpi";
  var vDBID = vApp.aDatabaseList.dbid;
  vDataJSON["ovitrapmpi_schema"]["headerTemplate"] = "("+vDBID+") {{self.date}} {{self.time}} {{self.collectionType}}";
  openWinHTMLsize('jsoneditor.html?db='+vSchemaID+'&dbid='+vDBID,"1000","600");
}

function iJE_ovitrapmpi(pListID) {
  if (vDataJSON.hasOwnProperty(pListID)) {
    return vDataJSON[pListID];
  } else {
    alert("ERROR: JSON Editor vDataJSON['"+pListID+"'] does not exist in window.opener");
    return {}
  };
}

function sJE_ovitrapmpi(pJSON) {
  vDataJSON["ovitrapmpi"][vApp.aDatabaseList.dbid] = pJSON;
}
