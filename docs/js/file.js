function loadProjectJS(pDB) {
  var vDB = pDB  || "project";
  if (vDatabase.hasOwnProperty(vDB)) {
    if (vDatabase[vDB].hasOwnProperty("init_type")) {
      var vTypeDB = vDatabase[vDB]["init_type"];
      if (vTypeDB == "JSCC") {
        console.log("JSON Database for JSCC '"+vDB+".js' defined!");
        vJSON_JS = vDatabase[vDB];
      } else {
        console.log("ERROR: init_type='"+vTypeDB+"' for JSON is not 'JSCC'");
      };
    };
  } else {
    console.log("JSON Database for JSCC '"+vDB+".js' was NOT loaded!");
  };
}

function loadProjectJSON() {
  callLoadProjectJSON(handleProjectJSON);
};

function handleProjectJSON(pContent) {
 // Parse JSON string into object
   var vJSON = JSON.parse(pContent);
   if (vJSON) {
     vJSON_JS = vJSON;
   } else {
     console.log("ERROR: loading Project JSON");
   };
};


function loadTemplateJSON() {
  callLoadTemplateJSON(handleTemplateJSON);
};

function handleTemplateJSON(pContent) {
 // Parse JSON string into object
   var vTemplateJSON = JSON.parse(pContent);
   if (vTemplateJSON) {
     for (var iID in object) {
       if (vTemplateJSO.hasOwnProperty(iID)) {
         write2value(iID,vTemplateJSO[iID]);
       };
     };
   } else {
     console.log("ERROR: loading Templates JSON");
   };
};

function callLoadTemplateJSON(pCallbackTPL) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'prog/code_templates.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            pCallbackTPL(xobj.responseText);
          }
    };
    xobj.send(null);
 };

 function callLoadProjectJSON(pCallbackTPL) {
   var xobj = new XMLHttpRequest();
   xobj.overrideMimeType("application/json");
   xobj.open('GET', 'prog/project.json', true); // Replace 'my_data' with the path to your file
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           pCallbackTPL(xobj.responseText);
         }
   };
   xobj.send(null);
};

function readTextFile2Hash(pFile) {
    // function returns a hash with "content" and "success" as Hash-IDs
    var vFileHash = {"content":"","success":false};
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'tpl/Default.html', false);
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

function readFile2Editor(pUploadFile,pEditorID) {
  console.log("readFile2Editor('pUploadFile','"+pEditorID+"')");
  var fr = new FileReader();
  fr.onload = function(e) {
      // e.target.result should contain the text
      setEditorValue(pEditorID,e.target.result);
  };
  fr.readAsText(pFile);
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
