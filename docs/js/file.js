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
