function readTextFile2Hash(pFile)
{
    // function returns a hash with "content" and "success" as Hash-IDs
    var vFileHash = {"content":"","success":false};
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                vFileHash["content"] = rawFile.responseText;
                vFileHash["success"] = true;
                //alert(vFileHash["content"]);
            }
        }
    }
    rawFile.send(null);
    return vFileHash;
};

function readFile2Editor(pFile,pEditorID) {
  console.log("readFile2Editor('"+pFile+"','"+pEditorID+"')");
  var fr = new FileReader();
  fr.onload = function(e) {
      // e.target.result should contain the text
      setEditorValue(pEditorID,e.target.result);
  };
  fr.readAsText(pFile);
}

function readFileTXT(pFile) {
    var vContent = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                vContent = rawFile.responseText;
                //alert(vContent);
            }
        }
    }
    rawFile.send(null);
    return vContent;
}
