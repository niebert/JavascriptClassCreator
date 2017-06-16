//#################################################################
//# Javascript Class: App()
//#       SuperClass: AppAbstract
//#   Class Filename: app.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               undefined
//# last modifications    2017/05/05 9:27:29
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/app.js"
//---------------------------------------------------------------------
//---Constructor of Class App()
// Call the constructor for creating an instance of class App
// by the following command in HTML-file that imports this class
// var vMyInstance = new App();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of App, use
// the attribute name with a leading "this." in the definition of method of App, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'App'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'App' will be set by
// use the method's name and extend it with 'App'.
//    App.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

//--------------------------------------
//---Super Class------------------------
// Inheritance: 'App' inherits from 'AppAbstract'
//   App.prototype = new AppAbstract();
// Constructor for instances of App has to updated.
// Otherwise constructor of AppAbstract is called
App.prototype.constructor=App;
// see http://phrogz.net/js/classes/OOPinJS2.html for explanation
//--------------------------------------


function App () {

    //---------------------------------------------------------------------
    //---Attributes of Class "App()"
    //---------------------------------------------------------------------
	//---PUBLIC: aDoc (Document): Attribute: 'aDoc' Type: '' stores ...
	this.aDoc = null;
	//---PUBLIC: aName (String): Attribute: 'aName' Type: 'String' stores ...
	this.aName = "DisApp";
	//---PUBLIC: aServer (Server): Attribute: 'aServer' Type: 'Server' stores ...
	//this.aServer = new Server("___SERVER_URL___");
	//---PUBLIC: aDatabaseList (DatabaseList): stores all databases loaded in the app
	//this.aDatabaseList = new DatabaseList();
	//---PUBLIC: aCurrentPage (String): Attribute: 'aCurrentPage' Type: 'String' stores ...
	this.aCurrentPage = "welcome";
	//---PUBLIC: aFuzzyController (FuzzyController): Attribute: 'aFuzzyController' Type: 'FuzzyController' stores ...
	// this.aFuzzyController = new FuzzyController();
	//---PUBLIC: aLinkParam (LinkParam): stores all parameters from the URL in aLinkParam.aVars
	this.aLinkParam = new LinkParam();

    //---------------------------------------------------------------------
    //---Methods of Class "App()"
    //---------------------------------------------------------------------
	//----PUBLIC Method: App.initDOM(pDoc:Document,pDatabase:Hash)-----
	// init(pDoc,pDatabase)
	//	1) inits the DOM content of the App and writes dynamic content into the Document Object Model of the HTML-file
	//	2) populates the content with the current records of the databases 3) the LinkParameter are available at this time of the call initDOM is called from the init() Method defined in AppAbstract
	//----PUBLIC Method: App.load():Boolean-----
	// load()  Return: Boolean
	//	load Databases and DOMVars from LocalStorage if the exist in local storage
	//----PUBLIC Method: App.save():Boolean-----
	// save()  Return: Boolean
	//	save Databases and DOMVars to LocalStorage
	//----PUBLIC Method: App.event(pPageID:String,pButtonID:String,pEventID:String)-----
	// event(pPageID,pButtonID,pEventID)
	//	this is the event handler of the App. The handler gets the button or link as parameter, which determines the event handler for event
	//----PUBLIC Method: App.gotoPage(pPageID:String)-----
	// gotoPage(pPageID)
	//	goto a certain page of the App File
	//----PUBLIC Method: App.gotoURL(pFileHTML:String)-----
	// gotoURL(pFileHTML)
	//	navigate to page on the same host in the same window (in general another file of the app)



}
//-------------------------------------------------------------------------
//---END Constructor of Class "App()"
//-------------------------------------------------------------------------

//
//#################################################################
//# PUBLIC Method: initDOM()
//#    used in Class: App
//# Parameter:
//#    pDoc:Document
//#    pDatabase:Hash
//# Comment:
//#    1) inits the DOM content of the App and writes dynamic content into the Document Object Model of the HTML-file
//#    2) populates the content with the current records of the databases 3) the LinkParameter are available at this time of the call initDOM is called from the init() Method defined in AppAbstract
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 9:27:29
//#################################################################

App.prototype.init = function (pDoc,pDatabase) {
  //----Debugging------------------------------------------
  // console.log("js/app.js - Call: initDOM(pDoc:Document,pDatabase:Hash)");
  // alert("js/app.js - Call: initDOM(pDoc:Document,pDatabase:Hash)");
  //----Create Object/Instance of App----
  //    var vMyInstance = new App();
  //    vMyInstance.initDOM(pDoc,pDatabase);
  //-------------------------------------------------------
  this.aDoc = pDoc;
	this.aDataJSON = pDatabase;
	this.aLinkParam.init(pDoc);
};
//----End of Method initDOM Definition


//#################################################################
//# PUBLIC Method: load()
//#    used in Class: App
//# Parameter:
//#
//# Comment:
//#    load Databases and DOMVars from LocalStorage if the exist in local storage
//# Return: Boolean
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 9:27:29
//#################################################################

App.prototype.load = function () {
  //----Debugging------------------------------------------
  // console.log("js/app.js - Call: load():Boolean");
  // alert("js/app.js - Call: load():Boolean");
  //----Create Object/Instance of App----
  //    var vMyInstance = new App();
  //    vMyInstance.load();
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method load Definition


//#################################################################
//# PUBLIC Method: save()
//#    used in Class: App
//# Parameter:
//#
//# Comment:
//#    save Databases and DOMVars to LocalStorage
//# Return: Boolean
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 9:27:29
//#################################################################

App.prototype.save = function () {
  //----Debugging------------------------------------------
  // console.log("js/app.js - Call: save():Boolean");
  // alert("js/app.js - Call: save():Boolean");
  //----Create Object/Instance of App----
  //    var vMyInstance = new App();
  //    vMyInstance.save();
  //-------------------------------------------------------

  //----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method save Definition


//#################################################################
//# PUBLIC Method: event()
//#    used in Class: App
//# Parameter:
//#    pPageID:String
//#    pButtonID:String
//#    pEventID:String
//# Comment:
//#    this is the event handler of the App. The handler gets the button or link as parameter, which determines the event handler for event
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 9:27:29
//#################################################################

App.prototype.event = function (pPageID,pButtonID,pEventID) {
  //----Debugging------------------------------------------
  // console.log("js/app.js - Call: event(pPageID:String,pButtonID:String,pEventID:String)");
  // alert("js/app.js - Call: event(pPageID:String,pButtonID:String,pEventID:String)");
  //----Create Object/Instance of App----
  //    var vMyInstance = new App();
  //    vMyInstance.event(pPageID,pButtonID,pEventID);
  //-------------------------------------------------------

  console.log("pPageID="+pPageID+" pButtonID="+pButtonID+" pEventID="+pEventID)

};
//----End of Method event Definition


//#################################################################
//# PUBLIC Method: gotoPage()
//#    used in Class: App
//# Parameter:
//#    pPageID:String
//# Comment:
//#    goto a certain page of the App File
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 9:27:29
//#################################################################

App.prototype.gotoPage = function (pPageID) {
  //----Debugging------------------------------------------
  // console.log("js/app.js - Call: gotoPage(pPageID:String)");
  // alert("js/app.js - Call: gotoPage(pPageID:String)");
  //----Create Object/Instance of App----
  //    var vMyInstance = new App();
  //    vMyInstance.gotoPage(pPageID);
  //-------------------------------------------------------

  $.mobile.changePage( '#'+pPageID, { transition: 'slideup', changeHash: false })

};
//----End of Method gotoPage Definition


//#################################################################
//# PUBLIC Method: gotoURL()
//#    used in Class: App
//# Parameter:
//#    pFileHTML:String
//# Comment:
//#    navigate to page on the same host in the same window (in general another file of the app)
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/05 9:27:29
//#################################################################

App.prototype.gotoURL = function (pFileHTML) {
  //----Debugging------------------------------------------
  // console.log("js/app.js - Call: gotoURL(pFileHTML:String)");
  // alert("js/app.js - Call: gotoURL(pFileHTML:String)");
  //----Create Object/Instance of App----
  //    var vMyInstance = new App();
  //    vMyInstance.gotoURL(pFileHTML);
  //-------------------------------------------------------
	this.save();
	document.location.href = pFileHTML;
};
//----End of Method gotoURL Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: App
//-------------------------------------------
