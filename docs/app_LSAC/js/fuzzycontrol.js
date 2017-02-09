//#################################################################
//# Javascript Class: FuzzyControl()
//#       SuperClass:
//#   Class Filename: fuzzycontrol.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               17.12.2016
//# last modifications    17.12.2016
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Generator by Engelbert Niehaus
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Import this Class in HTML-File with
// <SCRIPT LANGUAGE="JavaScript" SRC="fuzzycontrol.js"> </SCRIPT>
//---------------------------------------------------------------------
//---Constructor of Class FuzzyControl()
// Call the constructor for creating an instance of class FuzzyControl
// by the following command in HTML-file that imports this class
// var vMyInstance = new FuzzyControl();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of FuzzyControl, use
// the attribute name with a leading "this." in the definition of method of FuzzyControl, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----External Methods-------------------------------------------------
//---------------------------------------------------------------------
// In general methods of class 'FuzzyControl' are defined with
//    this.my_method = function (pPar1,pPar2)
// An external definition of methods for 'FuzzyControl'
// use the method's name and extend it with '_FuzzyControl'.
//    function my_method__FuzzyControl(pPar1,pPar2)
// This is done to avoid name space conflicts, if you overwrite a
// method 'my_method()' that was inherited from a superclass 'MySuperClass' e.g.
//   SuperClass: MySuperClass.my_method()
//   Class:      FuzzyControl.my_method()
// The method definitions are as follows
//   function my_method_FuzzyControl(...) { .....
// and
//   function my_method_MySuperClass(...) { .....

function FuzzyControl () {
	// no superclass defined

    //---------------------------------------------------------------------
    //---Attributes of Class "FuzzyControl()"
    //---------------------------------------------------------------------
	this.doc = null;
	this.aParent = null;
  this.aFuzzyLayers = [];
  this.aName = "FuzzyControl";
  // contains the DOM nodes to write innerHTML of Results
  this.aDOM = {};
  // <h2 id="divRisk">
  //  <font class="valDefuzzyRisk" id="valDefuzzyRisk1" color="red">
  this.aRiskOutID = "valDefuzRiskA";
  // <h2 id="divResponse">
  //  <font class="valDefuzzyResponse" id="valDefuzzyResponse1" color="red">
  this.aResponse1OutID = "valDefuzRiskB";
  this.aResponse2OutID = "valDefuzResponse";
  this.aResponse2DOM = null;
  //---Calculated Risk after evaluating Questionnaire
  this.aFuzzyRisk = 0.5;
  //---Calculated Mitigation Quality of applied Risk Mitigation Strategy
  this.aMitigationQuality = 0.4;
  // The users might have applied all options for Risk Mitigation
  // But the impact of all mitigation strategies might not lead to a full
  // risk mitiation to 0. So the following variable defines the Impact Variable
  // 0.0 = no impact of risk mitigation/protection (even if all mitigating options selected)
	// 1.0 = full risk reduction possible is possible (if all mitigating options selected)
	// This value will be dependent on Geolocation because some activities might not be available
  this.aMitigationImpact = 0.8;
  // The Follow Attribute Calculates the total Risk
  this.aFuzzyRiskMitigation = 0.5;




    //---------------------------------------------------------------------
    //---Methods of Class "FuzzyControl()" defined as JS functions
    //---------------------------------------------------------------------


//#################################################################
//# Method: init()
//#    used in Class: FuzzyControl
//# Comment:
//#       What does 'init' do?
//#
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.init = function (pDocument) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:init(pParent)-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.init(pParent);
  //-------------------------------------------------------
	this.doc = pDocument; // initialized
  this.aFuzzyLayers = [];
	var vFL = new FuzzyLayer();
	vFL.init(this,"app");
	this.aFuzzyLayers.push(vFL);
	vFL = new FuzzyLayer();
	vFL.init(this,"response");
	this.aFuzzyLayers.push(vFL);
	// vFL = new FuzzyLayer();
	// vFL.init(this,"output");
	// this.aFuzzyLayers.push(vFL);

  //this.link2dom(this.aRiskOutID);
  //this.link2dom(this.aResponse1OutID);
  //this.link2dom(this.aResponse2OutID);
};
//----End of Method init Definition

//#################################################################
//# Method: value2FuzzyScore()
//#    used in Class: FuzzyControl
//# Comment:
//#       'calcFuzzyRisk' calculated the Risk and defuzzifies
//#       the risk into "valDefuzzyRiskResponse"
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.value2FuzzyScore = function (pValue) {
  return defuzzifyLow2High(pValue) + " (Score "+fuzzy2percent(pValue)+"%)"
};
//----End of Method value2FuzzyScore Definition

//#################################################################
//# Method: calcFuzzyRisk()
//#    used in Class: FuzzyControl
//# Comment:
//#       'calcFuzzyRisk' calculated the Risk and defuzzifies
//#       the risk into "valDefuzzyRiskResponse"
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.calcFuzzyRisk = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:calcFuzzyRisk()-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.calcFuzzyRisk();
  //-------------------------------------------------------
	if (this.aFuzzyLayers[0]) {
		// FuzzyLayer for Questionnaire exists
		this.aFuzzyLayers[0].exec();
		this.aFuzzyRisk = this.aFuzzyLayers[0].aFuzVal;
	};
  var vOut = this.value2FuzzyScore(this.aFuzzyRisk);
  console.log("FuzzyControl Risk:"+vOut);
  return vOut;
  //top.write2innerHTML(this.aRiskOutID,vOut);
  //top.write2innerHTML(this.aResponse1OutID,vOut);
};
//----End of Method calcFuzzyRisk Definition


//#################################################################
//# Method: calcFuzzyRiskMitigation()
//#    used in Class: FuzzyControl
//# Comment:
//#       'calcFuzzyRiskMitigation' calculates this Risk with
//#       two FuzzyLayers, (1) Questionnaire (2) Response
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.calcFuzzyRiskMitigation = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:calcFuzzyRiskMitigation()-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.calcFuzzyRiskMitigation();
  //-------------------------------------------------------
	// this.aMitigationQuality is defined by the Questionnaire
	// Impact is the Maximum
	if (this.aFuzzyLayers[1]) {
		// FuzzyLayer for Questionnaire exists
		this.aFuzzyLayers[1].exec();
		this.aMitigationQuality = this.aFuzzyLayers[1].aFuzVal;
	};
	console.log("Risk Mitigation Quality: "+this.aMitigationQuality);
	var vFuzRiskMit = this.aMitigationQuality * this.aMitigationImpact;
	console.log("Risk Mitigation Quality * Impact: "+vFuzRiskMit);
	//this.aFuzzyRiskMitigation = fuzzyAND_mult(this.aFuzzyRisk,(1-vFuzRiskMit));
	this.aFuzzyRiskMitigation = this.aFuzzyRisk * (1-vFuzRiskMit);
  var vOut = this.value2FuzzyScore(this.aFuzzyRiskMitigation);
  console.log("FuzzyControl Response: "+vOut);
  return vOut;
};
//----End of Method calcFuzzyRiskMitigation Definition


//#################################################################
//# Method: create(pStringHash)
//#    used in Class: FuzzyControl
//# Comment:
//#       create a new FuzzyLayer with the submitted pStringHash?
//#
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.create = function (pStringHash,pType) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:create()-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.create();
  //-------------------------------------------------------
  var vFuzzyJSON = fuzzyPARSE_string2real(pStringHash);
  console.log("FuzzyControl.create() pType='"+pType+"' performed.");
  switch (pType) {
    case "app":
			if (this.aFuzzyLayers[0]) {
				this.aFuzzyLayers[0].aName = "app";
				this.aFuzzyLayers[0].aParent = this;
				this.aFuzzyLayers[0].aDataHash = vFuzzyJSON;
				console.log("Layer[0] Risk - polulated with Input");
			} else {
				console.log("ERROR: Fuzzy Controller - this.aFuzzyLayers[0] does not exist");
			}
    break;
    case "response":
    	if (this.aFuzzyLayers.length > 1) {
				this.aFuzzyLayers[1].aName = "response";
				this.aFuzzyLayers[1].aParent = this;
				this.aFuzzyLayers[1].aDataHash = vFuzzyJSON;
				console.log("Layer[1] Response - polulated with Input");
			} else {
				console.log("ERROR: Fuzzy Controller - this.aFuzzyLayers[0] does not exist");
			};
    break;
    default:
      console.log("FuzzyControl.create() pType='"+pType+"' not in FuzzyControl types");
  }

};
//----End of Method create Definition


//#################################################################
//# Method: link2dom(pID)
//#    used in Class: FuzzyControl
//# Comment:
//#       What does 'link2dom' do?
//#
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.link2dom = function (pID) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:link2dom()-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.link2dom();
  //-------------------------------------------------------
  this.aDOM[pID] = document.getElementById(pID);
  if (this.aRiskDOM) {
    console.log("FuzzyControl: DOM Node ["+pID+"] ready for setting innerHTML");
  } else {
    console.log("FuzzyControl.link2dom():  DOM Node ["+pID+"] does NOT exist");
  };
};
//----End of Method link2dom Definition


//#################################################################
//# Method: load()
//#    used in Class: FuzzyControl
//# Comment:
//#       Loads a JSONDB with FuzzyLayers in to this.aFuzzyLayers
//#
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.load = function (pInputJSON) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:load(pInputJSON)-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.load(pInputJSON);
  //-------------------------------------------------------
  this.aFuzzyLayers = JSON.parse(pInputJSON);
};
//----End of Method load Definition


//#################################################################
//# Method: save()
//#    used in Class: FuzzyControl
//# Comment:
//#       saves the current FuzzyLayer in a JSON string
//#
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.save = function () {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:save(pContent)-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.save(pContent);
  //-------------------------------------------------------
  return JSON.stringify(this.aFuzzyLayers);
};
//----End of Method save Definition


//#################################################################
//# Method: exec()
//#    used in Class: FuzzyControl
//# Comment:
//#       What does 'exec' do?
//#
//# created               17.12.2016
//# last modifications    17.12.2016
//#################################################################

this.exec = function (pType) {
  //----Debugging------------------------------------------
  // The following alert-Command is useful for debugging
  //alert("fuzzycontrol.js:exec()-Call")
  //----Create Object/Instance of FuzzyControl----
  //    var vMyInstance = new FuzzyControl();
  //    vMyInstance.exec();
  //-------------------------------------------------------
  var vOut = "";
  switch (pType) {
    case "app":
      vOut = this.calcFuzzyRisk();
    break;
    case "response":
      vOut = this.calcFuzzyRiskMitigation();
    break;
    default:
      console.log("ERROR: FuzzyControl.exec()  Type: "+pType+" undefined");
    };
  console.log("FuzzyControl.exec('"+pType+"') performed!");
  return vOut;
};
//----End of Method exec Definition

}
//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: FuzzyControl
//-------------------------------------------
