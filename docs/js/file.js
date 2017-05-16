function loadProjectJS(pDB) {
  var vDB = pDB  || "project";
  if (vDataJSON.hasOwnProperty(vDB)) {
    if (vDataJSON[vDB].hasOwnProperty("JSCC_type")) {
      var vTypeDB = vDataJSON[vDB]["JSCC_type"];
      if (vTypeDB == "JSCC") {
        console.log("JSON Database for JSCC '"+vDB+".js' defined!");
        vJSON_JS = vDataJSON[vDB];
      } else {
        console.log("ERROR: JSCC_type='"+vTypeDB+"' for JSON is not 'JSCC'");
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
};

function filename2id(pFile) {
  return pFile.replace(/[^a-zA-Z_0-9]/g,"")

}

function loadHTML2iFrame(pFile) {
  var ifrm = document.createElement("iframe");
  var vID = filename2id(pFile);
  ifrm.setAttribute("src", pFile);
  ifrm.setAttribute("id", vID);
  ifrm.style.width = "90%";
  ifrm.style.height = "100px";
  var vIFrameContainer = document.getElementById("iFrameContainer");
  var vTitle = document.createElement("b");
  vTitle.innerHTML = "File: "+pFile;
  vIFrameContainer.appendChild(vTitle);
  vIFrameContainer.appendChild(ifrm);
  //document.body.appendChild(ifrm);
};

function loadResource( url, type, loadhash ) {
  // modified from reveal.js
  if (loadhash.hasOwnProperty(url)) {
    console.log("Resource '"+url+"' of type '"+type+"' already loaded");
  } else {
    console.log("Load Resource '"+url+"' of type '"+type+"'");
    loadhash(url) = url; // mark as loaded
    var head = document.querySelector( 'head' );
  	var resource;

  	if ( type === 'script' ) {
      resource = document.createElement( 'script' );
      resource.type = 'text/javascript';
      resource.src = url;
  	}	else if ( type === 'stylesheet' ) {
      resource = document.createElement( 'link' );
      resource.rel = 'stylesheet';
      resource.href = url;
  	};

  	resource.onload = finish;

  	// IE
  	resource.onreadystatechange = function() {
  			if ( this.readyState === 'loaded' ) {
  				finish();
  			}
  		}; // onreadystatechange

  	// Normal browsers
  	head.appendChild( resource );
  };
};
