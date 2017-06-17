//#################################################################
//# Javascript Class: DatabaseJSON()
//#       SuperClass:
//#   Class Filename: databasejson.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               undefined
//# last modifications    2017/05/05 15:10:21
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/databasejson.js"
//---------------------------------------------------------------------
//---Constructor of Class DatabaseJSON()
// Call the constructor for creating an instance of class DatabaseJSON
// by the following command in HTML-file that imports this class
// var vMyInstance = new DatabaseJSON();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of DatabaseJSON, use
// the attribute name with a leading "this." in the definition of method of DatabaseJSON, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'DatabaseJSON'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'DatabaseJSON' will be set by
// use the method's name and extend it with 'DatabaseJSON'.
//    DatabaseJSON.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

	// no superclass defined


function DatabaseJSON () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "DatabaseJSON()"
    //---------------------------------------------------------------------
	//---PUBLIC: aDatabaseList (DatabaseList): parent DatabaseList instance
	this.aDatabaseList = null;
	//---PUBLIC: aData (Hash): contains the JSON data
	this.aData = [];
	//---PUBLIC: aSchema (Hash): contains the JSON schema (optional)
	this.aSchema = {
		"type":"array",
		"title":"MyData"
	};
	//---PUBLIC: aDBID (Hash): is key to connect to the  JSON data in vDataJSON (aDatabaseList)
	this.aDBID = "";
  //---------------------------------------------------------------------
  //---Methods of Class "DatabaseJSON()"
  //---------------------------------------------------------------------
	//----PUBLIC Method: DatabaseJSON.init(pDatabaseList,pKeyDB,pDataJSON)-----
	// init(pDatabaseList,pKeyDB,pDataJSON)
	//	DatabaseList.init calls this init-method with a single Database in JSON format.
	//	The database is the init format of DB and is may contain a newer DB format that previous selected data
	//----PUBLIC Method: DatabaseJSON.checkFormat():String-----
	// checkFormat()  Return: String
	//	compares the format of this.aSourceDB and this.aDB and look for changes in the Database format.
	//	this.aSourceDB contains the newer format of the App provider. this.aDB will be altered according to changes in
	//	this.aSourceDB. If this.aDB does not exist after loading from LocalStorage, checkFormat() will use aSourceDB for aDB to collect data.
	//----PUBLIC Method: DatabaseJSON.load():Boolean-----
	// load()  Return: Boolean
	//	loads the Database from LocalStorage of the browser and store the DB in this.aDB.
	//	After load it calls checkFormat() to check, if the format of the database is still
	//	the same as in this.aSourceDB. The checkFormat() is introduced to make the App robust against alterations of
	//	the database format from the App-provider.
	//	The return value is Boolean. It determines if the load()-operation from the LocalStorage was successful.
	//----PUBLIC Method: DatabaseJSON.save():Boolean-----
	// save()  Return: Boolean
	//	saves the Database this.aDB to LocalStorage of the browser. JSON.stringify is used to create a string from
	//	the hash in this.aDB and this string is stored in the LocalStorage. The return value is Boolean.
	//	The boolean determines if the save()-method was performed successfully.
	//
	//----PUBLIC Method: DatabaseJSON.getType():String-----
	// getType()  Return: String
	//	getType returns the JSCC type of JSON data if that exists or returns typo of the JSON for non-JSCC
	//----PUBLIC Method: DatabaseJSON.setSchema(pSchema)-----
	// setSchema()
	//	Comment for setSchema
	//----PUBLIC Method: DatabaseJSON.getSchema()-----
	// getSchema()
	//	Comment for getSchema



}
//-------------------------------------------------------------------------
//---END Constructor of Class "DatabaseJSON()"
//-------------------------------------------------------------------------

//
//#################################################################
//# PUBLIC Method: init()
//#    used in Class: DatabaseJSON
//# Parameter:
//#    pDatabaseList
//#    pKeyDB
//#    pDataJSON
//# Comment:
//#    DatabaseList.init calls this init-method with a single Database in JSON format.
//#    The database is the init format of DB and is may contain a newer DB format that previous selected data
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 15:10:21
//#################################################################

DatabaseJSON.prototype.init = function (pDatabaseList,pKeyDB,pDataJSON,pSchemaJSON) {
  //----Debugging------------------------------------------
  // console.log("js/databasejson.js - Call: init(pDatabaseList,pKeyDB,pDataJSON)");
  // alert("js/databasejson.js - Call: init(pDatabaseList,pKeyDB,pDataJSON)");
  //----Create Object/Instance of DatabaseJSON----
  //    var vMyInstance = new DatabaseJSON();
  //    vMyInstance.init(pDatabaseList,pKeyDB,pDataJSON);
  //-------------------------------------------------------

  this.aDatabaseList = pDatabaseList;
  this.aData = pDataJSON;
  this.aDBID = pKeyDB;
  if (pSchemaJSON) {
		this.aSchema = pSchemaJSON
	};
};
//----End of Method init Definition


//#################################################################
//# PUBLIC Method: checkFormat()
//#    used in Class: DatabaseJSON
//# Parameter:
//#
//# Comment:
//#    compares the format of this.aSourceDB and this.aDB and look for changes in the Database format.
//#    this.aSourceDB contains the newer format of the App provider. this.aDB will be altered according to changes in
//#    this.aSourceDB. If this.aDB does not exist after loading from LocalStorage, checkFormat() will use aSourceDB for aDB to collect data.
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 15:10:21
//#################################################################

DatabaseJSON.prototype.checkFormat = function () {
  //----Debugging------------------------------------------
  // console.log("js/databasejson.js - Call: checkFormat():String");
  // alert("js/databasejson.js - Call: checkFormat():String");
  //----Create Object/Instance of DatabaseJSON----
  //    var vMyInstance = new DatabaseJSON();
  //    vMyInstance.checkFormat();
  //-------------------------------------------------------

  if (this.aDataJSON.hasOwnProperty("JSCC_type")) {
      return this.aDataJSON["JSCC_type"]
  } else {
			// getType4JSON() is defined in arrayhash.js
      return getType4JSON(this.aDataJSON);
  };

};
//----End of Method checkFormat Definition


//#################################################################
//# PUBLIC Method: load()
//#    used in Class: DatabaseJSON
//# Parameter:
//#
//# Comment:
//#    loads the Database from LocalStorage of the browser and store the DB in this.aDB.
//#    After load it calls checkFormat() to check, if the format of the database is still
//#    the same as in this.aSourceDB. The checkFormat() is introduced to make the App robust against alterations of
//#    the database format from the App-provider.
//#    The return value is Boolean. It determines if the load()-operation from the LocalStorage was successful.
//# Return: Boolean
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 15:10:21
//#################################################################

DatabaseJSON.prototype.load = function () {
  //----Debugging------------------------------------------
  // console.log("js/databasejson.js - Call: load():Object");
  // alert("js/databasejson.js - Call: load():Object");
  //----Create Object/Instance of DatabaseJSON----
  //    var vMyInstance = new DatabaseJSON();
  //    vMyInstance.load();
  //-------------------------------------------------------

  // Code for loadLocalDB() is defined in localstorage.js
  var vJSON = loadLocalDB(this.aDBID);
	if (vJSON) {
		this.aData = vJSON;
	}
};
//----End of Method load Definition


//#################################################################
//# PUBLIC Method: save()
//#    used in Class: DatabaseJSON
//# Parameter:
//#
//# Comment:
//#    saves the Database this.aDB to LocalStorage of the browser. JSON.stringify is used to create a string from
//#    the hash in this.aDB and this string is stored in the LocalStorage. The return value is Boolean.
//#    The boolean determines if the save()-method was performed successfully.
//#
//# Return: Boolean
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 15:10:21
//#################################################################

DatabaseJSON.prototype.save = function () {
  //----Debugging------------------------------------------
  // console.log("js/databasejson.js - Call: save():Boolean");
  // alert("js/databasejson.js - Call: save():Boolean");
  //----Create Object/Instance of DatabaseJSON----
  //    var vMyInstance = new DatabaseJSON();
  //    vMyInstance.save();
  //-------------------------------------------------------

	// Code for loadLocalDB() is defined in localstorage.js
  saveLocalDB(this.aDBID,this.aData);
};
//----End of Method save Definition


//#################################################################
//# PUBLIC Method: getType()
//#    used in Class: DatabaseJSON
//# Parameter:
//#
//# Comment:
//#    getType returns the JSCC type of JSON data if that exists or returns typo of the JSON for non-JSCC
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 15:10:21
//#################################################################

DatabaseJSON.prototype.getType = function () {
  //----Debugging------------------------------------------
  // console.log("js/databasejson.js - Call: getType():String");
  // alert("js/databasejson.js - Call: getType():String");
  //----Create Object/Instance of DatabaseJSON----
  //    var vMyInstance = new DatabaseJSON();
  //    vMyInstance.getType();
  //-------------------------------------------------------

  if (this.aDataJSON.hasOwnProperty("JSCC_type")) {
      return this.aDataJSON["JSCC_type"]
  } else {
			// getType4JSON() is defined in arrayhash.js
      return getType4JSON(this.aDataJSON);
  };

};
//----End of Method getType Definition


//#################################################################
//# PUBLIC Method: setSchema()
//#    used in Class: DatabaseJSON
//# Parameter:
//#    pSchema
//# Comment:
//#    Comment for setSchema
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 15:10:21
//#################################################################

DatabaseJSON.prototype.setSchema = function (pSchema) {
  //----Debugging------------------------------------------
  // console.log("js/databasejson.js - Call: setSchema(pSchema)");
  // alert("js/databasejson.js - Call: setSchema(pSchema)");
  //----Create Object/Instance of DatabaseJSON----
  //    var vMyInstance = new DatabaseJSON();
  //    vMyInstance.setSchema();
  //-------------------------------------------------------

	this.aSchema = pSchema;

};
//----End of Method setSchema Definition


//#################################################################
//# PUBLIC Method: getSchema()
//#    used in Class: DatabaseJSON
//# Parameter:
//#
//# Comment:
//#    Comment for getSchema
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 15:10:21
//#################################################################

DatabaseJSON.prototype.getSchema = function () {
  //----Debugging------------------------------------------
  // console.log("js/databasejson.js - Call: getSchema()");
  // alert("js/databasejson.js - Call: getSchema()");
  //----Create Object/Instance of DatabaseJSON----
  //    var vMyInstance = new DatabaseJSON();
  //    vMyInstance.getSchema();
  //-------------------------------------------------------

  return this.aSchema;

};
//----End of Method getSchema Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: DatabaseJSON
//-------------------------------------------
