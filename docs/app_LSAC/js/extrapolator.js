//#################################################################
//# Javascript Class: Extrapolator()
//#       SuperClass: DatabaseJSON
//#   Class Filename: extrapolator.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               16.6.2017
//# last modifications    2017/05/06 2:24:22
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/extrapolator.js"
//---------------------------------------------------------------------
//---Constructor of Class Extrapolator()
// Call the constructor for creating an instance of class Extrapolator
// by the following command in HTML-file that imports this class
// var vMyInstance = new Extrapolator();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of Extrapolator, use
// the attribute name with a leading "this." in the definition of method of Extrapolator, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'Extrapolator'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'Extrapolator' will be set by
// use the method's name and extend it with 'Extrapolator'.
//    Extrapolator.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

//--------------------------------------
//---Super Class------------------------
// Inheritance: 'Extrapolator' inherits from 'DatabaseJSON'
Extrapolator.prototype = new DatabaseJSON();
// Constructor for instances of Extrapolator has to updated.
// Otherwise constructor of DatabaseJSON is called
Extrapolator.prototype.constructor=Extrapolator;
// see http://phrogz.net/js/classes/OOPinJS2.html for explanation
//--------------------------------------


function Extrapolator () {

  //---------------------------------------------------------------------
  //---Attributes of Class "Extrapolator()"
  //---------------------------------------------------------------------
	//---PUBLIC: aKey (String): is the search key for mapping the missing value e.g. "trapNumber"
	this.aKey = "";
	//---PUBLIC: aMissingID (String): Is the missing ID for extrapolation in the array of Hashes
	this.aMissingID = "";
  //---PUBLIC: aMap (Hash): maps the key to the missing value e.g. trapNumber -> geolocation
	this.aMap = {};
  //---PUBLIC: aErrors (Array): loopDB and call4Hash push Errors on the aScanErrorHash
	this.aErrors = [];
  //---PUBLIC: aLoadedFile (String): Is the file name of a JSON data loaded from the user interface
	this.aLoadedFile = "";
  //---PUBLIC: aEqui2Missing (Hash): Is the hash of values that are regards equivalent to missing of a JSON data loaded from the user interface
  this.aEqui2Missing = {"default":""};


  //---------------------------------------------------------------------
  //---Methods of Class "Extrapolator()"
  //---------------------------------------------------------------------
  this.setEqui2Missing = function (pID,pValue) {
    // pID is a DOM id which sets the equivalent missing value
    // or "default" for "" empty string
    this.aEqui2Missing[pID] = pValue
  };
	//----PUBLIC Method: Extrapolator.scan()-----
	// scan()
	//	scan  needs an array of hashes. e.g. an array of hashes that contain a geolocation and a username, scan creates the aMap with key/value pairs. if aMissingID in a record is empty of undefined then the missing data is set, if the aMap is defined for the missing value aKeyID.
	//----PUBLIC Method: Extrapolator.extrapolate()-----
	// extrapolate()
	//	extrapolate needs an array of hashes. e.g. an array of hashes that contain a geolocation and a username, by using the aMap with key/value pairs. if aMissingID in a record is empty of undefined then the missing data is set, if the aMap is defined for the missing value aKeyID.
  //----PUBLIC Method: Extrapolator.setKey(pKey)-----
	// setKey(pKey)
  //	setKeys defines the pKey for mapping the values of pKey to missing values stored in the pMissingID of the JSON data aData array.
  //----PUBLIC Method: Extrapolator.setMissingID(pMissingID)-----
	// setMissingID(pKey)
	//	setMissingID defines the missing ID for mapping the values of this.aKey to missing values stored in the pMissingID of the JSON data aData array.
	//----PUBLIC Method: Extrapolator.loopDB(pCall4Hash)-----
	// loopDB()
	//	loopDB iterates over the array of hashes and checks if aDataJSON is array and all array elements are hashes. if that is the case the method loopDB is called for all hashes
  //----PUBLIC Method: Extrapolator.saveJSON(pFile)-----
  // saveJSON(pFile) imports the file
  this.saveJSON = function (pFilename) {
    var vContent = JSON.stringify(this.aData,null,4);
    this.saveFile2HDD(pFilename,vContent);
  };
  //----PUBLIC Method: Extrapolator.saveFile2HDD(pFile)-----
  // saveFile2HDD(pFile,pContent) creates a download for the file with the content,
	this.downloadErrors = function () {
			var vContent = "Extrapolator Errors:\n"+this.aErrors.join("\n");
			this.saveFile2HDD("extrapolation_errors.txt",vContent);
	}
  //----PUBLIC Method: Extrapolator.saveFile2HDD(pFile)-----
  // saveFile2HDD(pFile,pContent) creates a download for the file with the content,
  this.saveFile2HDD = function (pFilename,pContent) {
    var file = new File([pContent], {type: "text/plain;charset=utf-8"});
    saveAs(file,pFilename);
  };
  //----PUBLIC Method: Extrapolator.importJSON(pFileID4DOM)-----
	// importJSON(pFileID4DOM) imports the file
  this.importJSON = function (pFileID4DOM) {
    var vThis = this;
    var fileToLoad = document.getElementById(pFileID4DOM).files[0]; //for input type=file
    if (fileToLoad) {
      console.log("importJSON() - File '"+fileToLoad.name+"' exists.");
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent){
          var vTextFromFileLoaded = fileLoadedEvent.target.result;
          //document.getElementById("inputTextToSave").value = textFromFileLoaded;
          //alert("textFromFileLoaded="+textFromFileLoaded);
          vThis.aLoadedFile = fileToLoad.name;
          vThis.importJSON_do(vTextFromFileLoaded);
        };
      fileReader.readAsText(fileToLoad, "UTF-8");
    } else {
      alert("File is missing");
    };
  };
  //----PUBLIC Method: Extrapolator.importJSON_do(pStringJSON)-----
	// importJSON_do(pFileID4DOM) imports the file
  this.importJSON_do = function (pStringJSON) {
    console.log("importJSON_do('"+this.aLoadedFile+"')");
    if(pStringJSON) {
        try {
            this.aData = JSON.parse(pStringJSON);
            alert("File JSON '"+this.aLoadedFile+"' loaded successfully!")
        } catch(e) {
            alert(e); // error in the above string (in this case, yes)!
        }
    };
  };
	//	loopDB iterates over the array of hashes and checks if aDataJSON is array and all array elements are hashes. if that is the case the method loopDB is called for all hashes
	//----PUBLIC Method: call4Hash(pHashDB)-----
  //	call4Hash will be defined by the iterating loopDB() that runs over the array of hashes and checks if aDataJSON is array and all array elements are hashes. if that is the case the method loopDB is called for all hashes
	this.call4Hash = function (pHash) {
    console.log("call4Hash()-Call");
  };
  //----PUBLIC Method: scan4Hash(pHashDB)-----
  //	scan4Hash will populates the this.aMap
	this.scan4Hash = function (pHash) {
      // check if aKey in defined in pHash
      if (pHash.hasOwnProperty(this.aKey) && (!this.isMissing(pHash[this.aKey]))) {
        // check if aMissingID in defined in pHash
        if (pHash.hasOwnProperty(this.aMissingID) && (!this.isMissing(pHash[this.aMissingID]))) {
          // check if aMissingID value is not empty
          var vMapID = pHash[this.aKey];
          if (!this.isMissing(vMapID)) {
            //vMapID is not missing e.g. vMapID=trapNumber=2737
            if (!this.isMissing(pHash[this.aMissingID])) {
              // also the extrapolation data is available
              // does a previous defintion in exist in aMap?
              console.log("Scan "+this.aKey+"['"+vMapID+"']->"+this.aMissingID+"'"+pHash[this.aMissingID]+"'");
              if (this.aMap.hasOwnProperty(vMapID)) {
                // it exists, now check if previous definition match with this new definition
                if (this.aMap[vMapID] != pHash[this.aMissingID]) {
                  // mismath found throw Warning in Errors
                  var vError = "WARNING "+(this.aErrors.length+1)+": for "+this.aKey+"['"+vMapID+"'] different "+this.aMissingID+" values (1) '"+this.aMap[vMapID]+"' (2) '"+pHash[this.aMissingID]+"'";
                  console.log(vError);
                  this.aErrors.push(vError);
                };
              } else {
                // no previous definition
                this.aMap[vMapID] = pHash[this.aMissingID];
                console.log("Found Mapping '"+vMapID+"' to '"+pHash[this.aMissingID]+"'");
              };
            };
          }
        } else {
          console.log("this.aMissingID is undefined");
        }
      } else {
        //console.log("this.aKey is undefined");
      }
    };
    //----PUBLIC Method: extrapolate4Hash(pHashDB)-----
    //	extrapolate4Hash will populates the missing values in DB
    this.extrapolate4Hash = function (pHash) {
        // check if aKey in defined in pHash
        if (pHash.hasOwnProperty(this.aKey) && (pHash[this.aKey] != "")) {
          // check if aMissingID in defined in pHash
          if (!pHash.hasOwnProperty(this.aMissingID) || (pHash[this.aMissingID] == "")) {
            // set if aMissingID value is not empty
            var vMapID = pHash[this.aKey];
            if (this.aMap.hasOwnProperty(vMapID)) {
              // we have defined value for extrapolation
              if (this.isMissing(pHash[this.aMissingID])) {
                // the value is missing so perfrom extrapolation
                pHash[this.aMissingID] = this.aMap[vMapID]
                var vSuc = "DONE: add Missing Data of '"+this.aMissingID+"' for key['"+this.aKey+"']='"+vMapID+"' extrapolate '"+this.aMap[vMapID]+"'";
								this.aErrors.push(vSuc);
								console.log(vSuc);
              };
            } else {
              var vWarn = "WARNING: Extrapolation needed for Missing Data of '"+this.aMissingID+"' for key['"+this.aKey+"']='"+vMapID+"' but extrapolation failed!";
							this.aErrors.push(vWarn);
							console.log(vWarn);
						}
          }
        }
      };
      //----PUBLIC Method: Extrapolator.saveJSON(pFile)-----
      // saveJSON(pFile) imports the file
      this.isMissing = function (pValue) {
        var vMissing = false;
        if (pValue) {
          for (var key in this.aEqui2Missing) {
            if (this.aEqui2Missing.hasOwnProperty(key)) {
              if (this.aEqui2Missing[key] == pValue) {
                vMissing = true;
              };
            }
          }
        } else {
          vMissing = true;
        };
        return vMissing;
      }

}
//-------------------------------------------------------------------------
//---END Constructor of Class "Extrapolator()"
//-------------------------------------------------------------------------

//#################################################################
//# PUBLIC Method: scan()
//#    used in Class: Extrapolator
//# Parameter:
//#
//# Comment:
//#    scan  needs an array of hashes. e.g. an array of hashes that contain a geolocation and a username, scan creates the aMap with key/value pairs. if aMissingID in a record is empty of undefined then the missing data is set, if the aMap is defined for the missing value aKeyID.
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 2:24:22
//#################################################################

Extrapolator.prototype.scan = function () {
  //----Debugging------------------------------------------
  // console.log("js/extrapolator.js - Call: scan()");
  // alert("js/extrapolator.js - Call: scan()");
  //----Create Object/Instance of Extrapolator----
  //    var vMyInstance = new Extrapolator();
  //    vMyInstance.scan();
  //-------------------------------------------------------
  this.call4Hash = this.scan4Hash;
  this.loopDB();
  alert("Scan JSON for Extrapolation finished!\nTry to extrapolate missing data or Download Scan Errors and Warnings");
};
//----End of Method scan Definition


//#################################################################
//# PUBLIC Method: extrapolate()
//#    used in Class: Extrapolator
//# Parameter:
//#
//# Comment:
//#    extrapolate needs an array of hashes. e.g. an array of hashes that contain a geolocation and a username, by using the aMap with key/value pairs. if aMissingID in a record is empty of undefined then the missing data is set, if the aMap is defined for the missing value aKeyID.
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 2:24:22
//#################################################################

Extrapolator.prototype.extrapolate = function () {
  //----Debugging------------------------------------------
  // console.log("js/extrapolator.js - Call: extrapolate()");
  // alert("js/extrapolator.js - Call: extrapolate()");
  //----Create Object/Instance of Extrapolator----
  //    var vMyInstance = new Extrapolator();
  //    vMyInstance.extrapolate();
  //-------------------------------------------------------
	alert("Start extrapolation - please wait ...");
  var vCount = 0;
  for (var iKey in this.aMap) {
    if (this.aMap.hasOwnProperty(iKey)) {
      vCount++
    }
  };
  if (vCount>0) {
    this.call4Hash = this.extrapolate4Hash;
    this.loopDB();
    alert("Extrapolation finshed!\n Goto analysis of data\ncheck data via edit or check data locally with Save JSON")
  } else {
		alert("No Mappings for Extrapolations available. Please scan the JSON Data first.")
	};
};
//----End of Method extrapolate Definition


//#################################################################
//# PUBLIC Method: setKey()
//#    used in Class: Extrapolator
//# Parameter:
//#    pKey: String
//# Comment:
//#    setKeys defines the pKey for mapping the values of pKey to missing values stored in the pMissingID of the JSON data aDataJSON.
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 2:24:22
//#################################################################

Extrapolator.prototype.setKey = function (pKey) {
  //----Debugging------------------------------------------
  // console.log("js/extrapolator.js - Call: setKeys(pKey,pMissingID)");
  // alert("js/extrapolator.js - Call: setKeys(pKey,pMissingID)");
  //----Create Object/Instance of Extrapolator----
  //    var vMyInstance = new Extrapolator();
  //    vMyInstance.setKeys(,);
  //-------------------------------------------------------
  this.aKey = pKey;
  console.log("set Extrapolator key='"+pKey+"'");
};
//----End of Method setKeys Definition

//#################################################################
//# PUBLIC Method: setMissingID()
//#    used in Class: Extrapolator
//# Parameter:
//#    pMissingID: String
//# Comment:
//#    setKeys defines the pKey for mapping the values of pKey to missing values stored in the pMissingID of the JSON data aDataJSON.
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 2:24:22
//#################################################################

Extrapolator.prototype.setMissingID = function (pMissingID) {
  //----Debugging------------------------------------------
  // console.log("js/extrapolator.js - Call: setMissingID(pMissingID)");
  // alert("js/extrapolator.js - Call: setMissingID(pMissingID)");
  //----Create Object/Instance of Extrapolator----
  //    var vMyInstance = new Extrapolator();
  //    vMyInstance.setMissingID(pMissingID);
  //-------------------------------------------------------
  this.aMissingID = pMissingID;
  console.log("set Extrapolator missingID='"+pMissingID+"'");
};
//----End of Method setKeys Definition


//#################################################################
//# PUBLIC Method: loopDB()
//#    used in Class: Extrapolator
//# Parameter:
//#    pCall4Hash
//# Comment:
//#    loopDB iterates over the array of hashes and checks if aDataJSON is array and all array elements are hashes. if that is the case the method loopDB is called for all hashes
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 2:24:22
//#################################################################

Extrapolator.prototype.loopDB = function () {
  //----Debugging------------------------------------------
  // console.log("js/extrapolator.js - Call: loopDB(pCall4Hash)");
  // alert("js/extrapolator.js - Call: loopDB(pCall4Hash)");
  //----Create Object/Instance of Extrapolator----
  //    var vMyInstance = new Extrapolator();
  //    vMyInstance.loopDB();
  //-------------------------------------------------------

  this.aErrors = [];
  if (isArray(this.aData)) {
      for (var i = 0; i < this.aData.length; i++) {
        if (isHash(this.aData[i])) {
           this.call4Hash(this.aData[i]);
        } else {
          var vError = "Extrapolator: this.aData["+i+"] is not a hash";
          console.log(vError);
          this.aErrors.push(vError);
       }
      }
  } else {
      var vError = "Extrapolator: this.aData is not an array";
      console.log(vError);
      this.aErrors.push(vError);
  };


};
//----End of Method loopDB Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: Extrapolator
//-------------------------------------------
