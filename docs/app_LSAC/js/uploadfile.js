function uploadCallbackJSON(pCallback) {
  var fileToLoad=document.getElementById("myImportFile").files[0]; //for input type=file
  if (fileToLoad) {
    console.log("importProjectJSON() - File '"+fileToLoad.name+"' exists.");
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var vTextFromFileLoaded = fileLoadedEvent.target.result;
        //document.getElementById("inputTextToSave").value = textFromFileLoaded;
        //alert("textFromFileLoaded="+textFromFileLoaded);
        pCallback(fileToLoad.name,vTextFromFileLoaded);
      };
    fileReader.readAsText(fileToLoad, "UTF-8");
  } else {
    alert("File is missing");
  };
}
