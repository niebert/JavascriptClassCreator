//#################################################################
//# Javascript Class: FuzzyLayer()
//#       SuperClass:
//#   Class Filename: fuzzylayer.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               29.12.2016
//# last modifications    29.12.2016
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Generator by Engelbert Niehaus
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="fuzzylayer.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class FuzzyLayer()
// Call the constructor for creating an instance of class FuzzyLayer
// by the following command in HTML-file that imports this class
// var vMyInstance = new FuzzyLayer();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of FuzzyLayer, use
// the attribute name with a leading "this." in the definition of method of FuzzyLayer, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----External Methods-------------------------------------------------
//---------------------------------------------------------------------
// In general methods of class 'FuzzyLayer' are defined with
//    this.my_method = function (pPar1,pPar2)
// An external definition of methods for 'FuzzyLayer'
// use the method's name and extend it with '_FuzzyLayer'.
//    function my_method__FuzzyLayer(pPar1,pPar2)
// This is done to avoid name space conflicts, if you overwrite a
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:      FuzzyLayer.my_method()
// The method definitions are as follows
//   function my_method_FuzzyLayer(...) { .....
// and
//   function my_method_MySuperClass(...) { .....

function FuzzyLayer () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "FuzzyLayer()"
    //---------------------------------------------------------------------
	this.aParent = null;
	this.aName = "FuzzyLayer";
	this.aPreviousLayer = null;;
	this.aNextLayer = null;
  this.aDataHash = null;
	this.aFuzVal = 0.0;


    //---------------------------------------------------------------------
    //---Methods of Class "FuzzyLayer()" defined as JS functions
    //---------------------------------------------------------------------


//#################################################################
//# Method: init()
//#    used in Class: FuzzyLayer
//# Comment:
//#       What does 'init' do?
//#
//# created               29.12.2016
//# last modifications    29.12.2016
//#################################################################

this.init = function (pParent,pName) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzylayer.js:init(pParent)-Call")
  //----Create Object/Instance of FuzzyLayer----
  //    var vMyInstance = new FuzzyLayer();
  //    vMyInstance.init(pParent);
  //-------------------------------------------------------
	var vName = pName || "FL"+Date.now();
	this.aParent = pParent;
	this.aName   = vName;
};
//----End of Method init Definition


//#################################################################
//# Method: addFuzzyNode()
//#    used in Class: FuzzyLayer
//# Comment:
//#       What does 'addFuzzyNode' do?
//#
//# created               29.12.2016
//# last modifications    29.12.2016
//#################################################################

this.addFuzzyNode = function (pFuzzyNode) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzylayer.js:addFuzzyNode(pFuzzyNode)-Call")
  //----Create Object/Instance of FuzzyLayer----
  //    var vMyInstance = new FuzzyLayer();
  //    vMyInstance.addFuzzyNode(pFuzzyNode);
  //-------------------------------------------------------

	//----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method addFuzzyNode Definition


//#################################################################
//# Method: deleteById()
//#    used in Class: FuzzyLayer
//# Comment:
//#       What does 'deleteById' do?
//#
//# created               29.12.2016
//# last modifications    29.12.2016
//#################################################################

this.deleteById = function (pFuzzyNodeID) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzylayer.js:deleteById("pFuzzyNodeID")-Call")
  //----Create Object/Instance of FuzzyLayer----
  //    var vMyInstance = new FuzzyLayer();
  //    vMyInstance.deleteById("pFuzzyNodeID");
  //-------------------------------------------------------

	//----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method deleteById Definition


//#################################################################
//# Method: exec()
//#    used in Class: FuzzyLayer
//# Comment:
//#       What does 'exec' do?
//#
//# created               29.12.2016
//# last modifications    29.12.2016
//#################################################################

this.exec = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzylayer.js:exec()-Call")
  //----Create Object/Instance of FuzzyLayer----
  //    var vMyInstance = new FuzzyLayer();
  //    vMyInstance.exec();
  //-------------------------------------------------------
	// If user answered Question 1 with "YES DEFINITEY" then
  // the pStringHash contains pStringHash["question1"] = "YES DEFINITEY"
  // This string hash is stored in the Return JSON in vRetJSON["data"]
  // "NA" (Boolean Hash) not available - String "NA" or ""
  // "empty" (Boolean Hash) string empty - Subset of NA with String ""
  // "values" hash with values contains the usable answers that could be fuzzyfied successful
  // "data" just stores the StringHash coming directly from the questionnaire
  //var aDataHash = {"data":pStringHash,"missing":{},"NA":{},"empty":{},"values":{},"weights":{}};
  if (this.aDataHash) {
		console.log("FuzzyLayer ["+this.aName+"] exec()-Call");
		var vVal = this.aDataHash["values"];
		var vWeight = this.aDataHash["weights"];
		var v = 0.0;
		var w = 0.0;
		var sum_vxw = 0.0;
		var sum_w = 0.0;
		for (var iID in vVal) {
			if (vVal.hasOwnProperty(iID)) {
				w = vWeight[iID] || 1.0;
				v = vVal[iID] || 0.0;
				sum_w += w;
				sum_vxw += v * w
			};
		};
		if (sum_w > 0) {
			this.aFuzVal = sum_vxw / sum_w;
		} else {
			this.aFuzVal = 0.0;
			console.log("ERROR: Weighted Sum undefined Layer ["+this.aName+"] - Sum of Weights 0.0");
		};
		console.log("Calulate Weighted Sum in Layer ["+this.aName+"]="+this.aFuzVal);
	} else {
		console.log("aDateHash undefined in Layer ["+this.aName+"]");
	};
};
//----End of Method exec Definition


//#################################################################
//# Method: save()
//#    used in Class: FuzzyLayer
//# Comment:
//#       What does 'save' do?
//#
//# created               29.12.2016
//# last modifications    29.12.2016
//#################################################################

this.save = function (pContent) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzylayer.js:save(pContent)-Call")
  //----Create Object/Instance of FuzzyLayer----
  //    var vMyInstance = new FuzzyLayer();
  //    vMyInstance.save(pContent);
  //-------------------------------------------------------

	//----------- INSERT YOUR CODE HERE ---------------

};
//----End of Method save Definition

}
//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: FuzzyLayer
//-------------------------------------------
