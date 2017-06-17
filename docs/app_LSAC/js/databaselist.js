//#################################################################
//# Javascript Class: DatabaseList()
//#       SuperClass:
//#   Class Filename: databaselist.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               undefined
//# last modifications    2017/05/05 13:57:12
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/databaselist.js"
//---------------------------------------------------------------------
//---Constructor of Class DatabaseList()
// Call the constructor for creating an instance of class DatabaseList
// by the following command in HTML-file that imports this class
// var vMyInstance = new DatabaseList();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of DatabaseList, use
// the attribute name with a leading "this." in the definition of method of DatabaseList, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'DatabaseList'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'DatabaseList' will be set by
// use the method's name and extend it with 'DatabaseList'.
//    DatabaseList.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function DatabaseList () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "DatabaseList()"
    //---------------------------------------------------------------------
    //---PUBLIC: aDoc (Document): is the 'document' object
  	this.aApp = null;
    //---PUBLIC: aDoc (Document): is the 'document' object
  	this.aDoc = null;
  	//---PUBLIC: aDatabaseHash (Hash): stores all databases in the init format in a Hash
	  this.aDataJSON = null;
	  //---PUBLIC: current/selected Database of Class 'Database' in a Hash with array as this.db
	  this.db;
    //---PUBLIC: current/selected Database Index of  array as this.db
	  this.dbid = -1;
    //---PUBLIC: current/selected hash key of Database  this.db
	  this.dbkey = "";
    //---PUBLIC: Hash of 'DatabaseJSON' instances that wrap a JSON file
	  this.aDatabaseJSONList = {};

  //---------------------------------------------------------------------
  //---Methods of Class "DatabaseList()"
  //---------------------------------------------------------------------
  //----PUBLIC Method: DatabaseList.init(pApp:App,pDataJSON:Hash)-----
	// init(pApp,pDatabase)
  //	create Database objects for all keys in pDatabase hash in the init the Database in this.aDB
	//----PUBLIC Method: DatabaseList.init(pApp:App,pDataJSON:Hash)-----
	// setRecordTitle()
  // sets the [3/456] the counter with dbid and the record title
	//----PRIVATE Method: DatabaseList.load():Boolean-----
	// load()  Return: Boolean
	//	load Databases and DOMVars from LocalStorage if the exist in local storage
	//----PRIVATE Method: DatabaseList.save():Boolean-----
	// save()  Return: Boolean
	//	save Databases and DOMVars to LocalStorage
	//----PUBLIC Method: DatabaseList.getDBHash4Type(pType:String):Hash-----
	// getDBHash4Type(pType)  Return: Hash
	//	a DatabaseList contains Databases of different types.
	//	Method return a Hash of all DBs of a certain Type
	//----PUBLIC Method: DatabaseList.selectDB(pDataID:String)-----
	// selectDB(pDataID)
	//	Comment for select
	//----PUBLIC Method: DatabaseList.exists(pDataID:String)-----
	// exists(pDataID)
	//	Comment for exists
	//----PUBLIC Method: DatabaseList.nextRecord()-----
	// nextRecord()
	//	Comment for nextRecord
	//----PUBLIC Method: DatabaseList.prevRecord()-----
	// prevRecord()
	//	Comment for prevRecord
	//----PUBLIC Method: DatabaseList.lastRecord()-----
	// lastRecord()
	//	Comment for lastRecord
	//----PUBLIC Method: DatabaseList.firstRecord()-----
	// firstRecord()
	//	Comment for firstRecord
	//----PUBLIC Method: DatabaseList.gotoRecord(i:Integer)-----
	// gotoRecord(i)
	//	Comment for gotoRecord
	//----PUBLIC Method: DatabaseList.getLength()-----
	// getLength()
	//	Comment for getLength
  //---------------------------------------------------------------------

}
//-------------------------------------------------------------------------
//---END Constructor of Class "DatabaseList()"
//-------------------------------------------------------------------------


  //#################################################################
  //# PUBLIC Method: init()
  //#    used in Class: DatabaseList
  //# Parameter:
  //#    pApp:App
  //#    pDatabase:Hash
  //# Comment:
  //#    create Database objects for all keys in pDatabase hash in the init the Database in this.aDB
  //#
  //# created with JSCC  2017/03/05 18:13:28
  //# last modifications 2017/05/05 13:57:12
  //#################################################################

  DatabaseList.prototype.init = function (pApp,pDataJSON) {
    //----Debugging------------------------------------------
    // console.log("js/databaselist.js - Call: init(pApp:App,pDataJSON:Hash)");
    // alert("js/databaselist.js - Call: init(pApp:App,pDataJSON:Hash)");
    //----Create Object/Instance of DatabaseList----
    //    var vMyInstance = new DatabaseList();
    //    vMyInstance.init(pDoc,pDatabase);
    //-------------------------------------------------------
    this.aApp = pApp;
    this.aDoc = pApp.aDoc;
    this.aDataJSON = pDataJSON;
    for (var vKey in this.aDatabaseHash) {
      this.aDatabaseJSONList[vKey] = new DatabaseJSON();
      this.aDatabaseJSONList[vKey].init(this,vKey,this.aDataJSON[vKey]);
    };
  };
  //----End of Method init Definition

	//#################################################################
	//# PUBLIC Method: load()
	//#    used in Class: DatabaseList
	//# Parameter:
	//#
	//# Comment:
	//#    load Databases and DOMVars from LocalStorage if the exist in local storage
	//# Return: Boolean
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2017/05/05 13:57:12
	//#################################################################

	DatabaseList.prototype.load = function () {
	  //----Debugging------------------------------------------
	  // The following alert-Command is useful for debugging
	  console.log("js/databaselist.js - Call: load()")
	  //-------------------------------------------------------
	  for (var vKey in this.aDatabaseJSONList) {
	    this.aDatabaseJSONList[vKey].load();
	  };
	};
	//----End of Private Method load Definition


	//#################################################################
	//# PUBLIC Method: save()
	//#    used in Class: DatabaseList
	//# Parameter:
	//#
	//# Comment:
	//#    save Databases and DOMVars to LocalStorage
	//# Return: Boolean
	//# created with JSCC  2017/03/05 18:13:28
	//# last modifications 2017/05/05 13:57:12
	//#################################################################

	DatabaseList.prototype.save = function () {
	  //----Debugging------------------------------------------
	  // The following alert-Command is useful for debugging
	  console.log("js/databaselist.js - Call: save()")
	  //-------------------------------------------------------
	  for (var vKey in this.aDatabaseJSONList) {
	    this.aDatabaseJSONList[vKey].save();
	  };
	};
	//----End of Private Method save Definition

//#################################################################
//# PUBLIC Method: getDBHash4Type()
//#    used in Class: DatabaseList
//# Parameter:
//#    pType:String
//# Comment:
//#    a DatabaseList contains Databases of different types.
//#    Method return a Hash of all DBs of a certain Type
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.getDBHash4Type = function (pType) {
  //----Debugging------------------------------------------
  console.log("js/databaselist.js - Call: getDBHash4Type(pType:String):Hash");
  // alert("js/databaselist.js - Call: getDBHash4Type(pType:String):Hash");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.getDBHash4Type(pType);
  //-------------------------------------------------------

  var vRetHash = {};
  var vType = "";
  for (var vKey in this.aDatabaseJSONList) {
    vType = this.aDatabaseJSONList[vKey].getType();
    if (vType=="pType") {
      vRetHash[vKey] = this.aDatabaseJSONList[vKey];
    }
  };
  return vRetHash;
};
//----End of Method getDBHash4Type Definition


//#################################################################
//# PUBLIC Method: selectDB()
//#    used in Class: DatabaseList
//# Parameter:
//#    pDataID:String
//# Comment:
//#    Comment for select
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.selectDB = function (pDataID) {
  //----Debugging------------------------------------------
  console.log("js/databaselist.js - Call: select(pDataID:String)");
  // alert("js/databaselist.js - Call: select(pDataID:String)");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.select(pDataID);
  //-------------------------------------------------------
  if (this.exists(pDataID)) {
    if (isArray(this.aDataJSON[pDataID])) {
      console.log("DataJSON['"+pDataID+"'] was selected");
      this.db = this.aDataJSON[pDataID];
      this.dbkey = pDataID;
      this.firstRecord();
    } else {
      console.log("ERROR: DatabaseJSON['"+pDataID+"'] is not an array");
    }
  } else {
    console.log("ERROR: DatabaseJSON['"+pDataID+"'] does not exist");
  };
};
//----End of Method select Definition


//#################################################################
//# PUBLIC Method: exists()
//#    used in Class: DatabaseList
//# Parameter:
//#    pDataID:String
//# Comment:
//#    Comment for exists
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.exists = function (pDataID) {
  //----Debugging------------------------------------------
  console.log("js/databaselist.js - Call: exists(pDataID:String)");
  // alert("js/databaselist.js - Call: exists(pDataID:String)");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.exists(pDataID);
  //-------------------------------------------------------
  return (this.aDataJSON.hasOwnProperty(pDataID))
};
//----End of Method exists Definition


//#################################################################
//# PUBLIC Method: setRecordTitle()
//#    used in Class: DatabaseList
//# Parameter:
//#
//# Comment:
//#    Comment for nextRecord
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.setRecordTitle = function () {
  //----Debugging------------------------------------------
  console.log("js/databaselist.js - Call: setRecordTitle()");
  // alert("js/databaselist.js - Call: setRecordTitle()");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.setRecordTitle();
  //-------------------------------------------------------
  if (isArray(this.db)) {
    var vCounterDB = "";
    var vTitleDB = "";
    if (this.db.length > 0) {
      vCounterDB =  "["+(this.dbid+1)+"/"+this.db.length+"]";
    };
    $("#footerRESPONSEcount").html(vCounterDB);
  } else {
    console.log("js/databaselist.js - Call: setRecordTitle() - this.db undefined");
  };
};
//----End of Method nextRecord Definition

//#################################################################
//# PUBLIC Method: nextRecord()
//#    used in Class: DatabaseList
//# Parameter:
//#
//# Comment:
//#    Comment for nextRecord
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.nextRecord = function () {
  //----Debugging------------------------------------------
  console.log("js/databaselist.js - Call: nextRecord("+this.dbkey+") db.length="+this.dbid+"/"+this.db.length);
  // alert("js/databaselist.js - Call: nextRecord()");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.nextRecord();
  //-------------------------------------------------------
  if (isArray(this.db)) {
    if (this.dbid < this.db.length - 1) {
      this.dbid++;
    };
  } else {
    console.log("this.db is not an array");
  };
  this.setRecordTitle();
};
//----End of Method nextRecord Definition


//#################################################################
//# PUBLIC Method: prevRecord()
//#    used in Class: DatabaseList
//# Parameter:
//#
//# Comment:
//#    Comment for prevRecord
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.prevRecord = function () {
  //----Debugging------------------------------------------
  console.log("js/databaselist.js - Call: prevRecord()");
  // alert("js/databaselist.js - Call: prevRecord()");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.prevRecord();
  //-------------------------------------------------------
  if (isArray(this.db)) {
    if (this.dbid > 0) {
      this.dbid--;
    };
  };
  this.setRecordTitle();
};
//----End of Method prevRecord Definition


//#################################################################
//# PUBLIC Method: lastRecord()
//#    used in Class: DatabaseList
//# Parameter:
//#
//# Comment:
//#    Comment for lastRecord
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.lastRecord = function () {
  //----Debugging------------------------------------------
  // console.log("js/databaselist.js - Call: lastRecord()");
  console.log("js/databaselist.js - Call: lastRecord()");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.lastRecord();
  //-------------------------------------------------------
  if (isArray(this.db)) {
    this.dbid =  this.db.length - 1;
  };
  this.setRecordTitle();
};
//----End of Method lastRecord Definition


//#################################################################
//# PUBLIC Method: firstRecord()
//#    used in Class: DatabaseList
//# Parameter:
//#
//# Comment:
//#    Comment for firstRecord
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.firstRecord = function () {
  //----Debugging------------------------------------------
  // console.log("js/databaselist.js - Call: firstRecord()");
  console.log("js/databaselist.js - Call: firstRecord()");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.firstRecord();
  //-------------------------------------------------------

  if (isArray(this.db)) {
    if (this.db.length > 0) {
      this.dbid = 0;
    } else {
      this.dbid = -1;
    };
  };
  this.setRecordTitle();
};
//----End of Method firstRecord Definition


//#################################################################
//# PUBLIC Method: gotoRecord()
//#    used in Class: DatabaseList
//# Parameter:
//#    i:Integer
//# Comment:
//#    Comment for gotoRecord
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.gotoRecord = function (i) {
  //----Debugging------------------------------------------
  // console.log("js/databaselist.js - Call: gotoRecord(i:Integer)");
  console.log("js/databaselist.js - Call: gotoRecord(i:Integer)");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.gotoRecord(i);
  //-------------------------------------------------------
  if (isArray(this.db)) {
    if ((i>= 0) && (i < this.db.length))
    this.dbid = i;
  };
  this.setRecordTitle();
};
//----End of Method gotoRecord Definition


//#################################################################
//# PUBLIC Method: getLength()
//#    used in Class: DatabaseList
//# Parameter:
//#
//# Comment:
//#    Comment for getLength
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 13:57:12
//#################################################################

DatabaseList.prototype.getLength = function () {
  //----Debugging------------------------------------------
  // console.log("js/databaselist.js - Call: getLength()");
  // alert("js/databaselist.js - Call: getLength()");
  //----Create Object/Instance of DatabaseList----
  //    var vMyInstance = new DatabaseList();
  //    vMyInstance.getLength();
  //-------------------------------------------------------
  if (this.db) {
    return this.db.length
  } else {
    return -1;
  };
};
//----End of Method getLength Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: DatabaseList
//-------------------------------------------
