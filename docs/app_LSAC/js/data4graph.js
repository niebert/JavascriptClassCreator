//#################################################################
//# Javascript Class: Data4Graph()
//#       SuperClass: DatabaseJSON
//#   Class Filename: data4graph.js
//#
//# Author of Class:      Engelbert Niehaus
//# email:                niehaus@uni-landau.de
//# created               17.6.2017
//# last modifications    2017/05/06 7:39:57
//# GNU Public License V3 - OpenSource
//#
//# created with JavaScript Class Creator JSCC
//#     https://niebert.github.io/JavascriptClassGenerator
//#################################################################

//---------------------------------------------------------------------
//---Store File in Subdirectory /js and import this Class in HTML-File with
// SCRIPT-Tag:  LANGUAGE="JavaScript" SRC="js/data4graph.js"
//---------------------------------------------------------------------
//---Constructor of Class Data4Graph()
// Call the constructor for creating an instance of class Data4Graph
// by the following command in HTML-file that imports this class
// var vMyInstance = new Data4Graph();
//---------------------------------------------------------------------
//----Attributes-------------------------------------------------------
//---------------------------------------------------------------------
// If you want to access the attributes of Data4Graph, use
// the attribute name with a leading "this." in the definition of method of Data4Graph, e.g.
// this.aName = "Hello World";
//---------------------------------------------------------------------
//----Methods----------------------------------------------------------
//---------------------------------------------------------------------
// (1) If you want to assign definitions of methods for single instance of the class 'Data4Graph'
// they are defined with
//    this.my_method = function (pPar1,pPar2)
// this approach allows to overwrite the method definition of single instances dynamically.
//---------------------------------------------------------------------
// (2) A prototype definition of methods for 'Data4Graph' will be set by
// use the method's name and extend it with 'Data4Graph'.
//    Data4Graph.prototype.my_method = function (pPar1,pPar2)
// This approach consumes less memory for instances.
//---------------------------------------------------------------------

//--------------------------------------
//---Super Class------------------------
// Inheritance: 'Data4Graph' > 'Extrapolator' > 'DatabaseJSON'
Data4Graph.prototype = new Extrapolator();
// Constructor for instances of Data4Graph has to updated.
// Otherwise constructor of DatabaseJSON is called
Data4Graph.prototype.constructor=Data4Graph;
// see http://phrogz.net/js/classes/OOPinJS2.html for explanation
//--------------------------------------


function Data4Graph () {

    //---------------------------------------------------------------------
    //---Attributes of Class "Data4Graph()"
    //---------------------------------------------------------------------
		this.aMapMPI = {
			"0": 0,
			"1-2": 1.5, //Diff: 1.5   1.5=(2+1)/2
			"3-5": 4, //Diff: 2.5    4=(3+5)/2
			"5-10": 7.5, //Diff: 3.5  7.5=(10+5)/2
			">10": 11  //Diff: 4.5 to "5-10"
		};
		//--- the Selector determines the type of data extraction ---
		this.aGraphID = "OviTrapMPI";
    //---------------------------------------------------------------------
    //---Methods of Class "Data4Graph()"
    //---------------------------------------------------------------------
	//----PUBLIC Method: Data4Graph.getGraphData()-----
	// getGraphData()
	//	get JSON for MorrisJS
	//----PUBLIC Method: Data4Graph.getOviTrap():Hash-----
	// getOviTrap()  Return: Hash
	//	Comment for getOviTrap
	//----PUBLIC Method: Data4Graph.getMPI():Hash-----
	// getMPI()  Return: Hash
	//	Comment for getMPI
	//----PUBLIC Method: Data4Graph.getMPI4Month(pData):Hash-----
	// getMPI4Month()  Return: Hash
	//	Comment for getMPI4Month
	//----PUBLIC Method: Data4Graph.getData():Hash-----
	// getData()  Return: Hash
	//	Comment for getData
	//----PUBLIC Method: Data4Graph.date2month(pID):String-----
	// date2month()  Return: String
	//	Comment for date2month
	//----PUBLIC Method: Data4Graph.getOviTrapMPI():Integer-----
	// getOviTrapMPI()  Return: Integer
	//	Comment for getOviTrapMPI
	//----PUBLIC Method: Data4Graph.getHeatMap():Hash-----
	// getHeatMap()  Return: Hash
	//	Comment for getHeatMap
	//----PUBLIC Method: Data4Graph.normalizeData(mdMonth,pSeries)-----
	// getHeatMap()  Return: Hash
	//	Comment for getHeatMap
	this.normalizeData = function (mdMonth,pSeries) {
		// pSeries = "a" or "b"
		var vMax = 0.0;
		for (var m in mdMonth) {
			// m is the month e.g. 2017-04
			if (vMax < mdMonth[m][pSeries]) {
					if (mdMonth[m].hasOwnProperty(pSeries)) {
						vMax = mdMonth[m][pSeries];
					};
			};
		};
		console.log("pSeries='"+pSeries+"' vMax="+vMax+"");
		for (var m in mdMonth) {
			// m is the month e.g. 2017-04
			if (mdMonth[m].hasOwnProperty(pSeries)) {
				mdMonth[m][pSeries] = (100 * mdMonth[m][pSeries]/vMax).toFixed(1);
			};
		};
	}
}
//-------------------------------------------------------------------------
//---END Constructor of Class "Data4Graph()"
//-------------------------------------------------------------------------


//#################################################################
//# PUBLIC Method: getGraphData()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    what does get do?
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getGraphData = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: get()");
  // alert("js/data4graph.js - Call: get()");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.get();
  //-------------------------------------------------------
	console.log("getGraphData('"+this.aGraphID+"')");
	switch (this.aGraphID) {
		case "RawData":
			return this.getRawData();
		break;
		case "OviTrap":
			return this.getOviTrap();
		break;
		case "OviTrapRaw":
			return this.getOviTrapRaw();
		break;
		case "MPI":
			return this.getMPI();
		break;
		case "MPIRaw":
			return this.getMPIRaw();
		break;
		case "OviTrapMPI":
			return this.getOviTrapMPI();
		break;
		default:
			return this.getOviTrap();
	}
};

//#################################################################
//# PUBLIC Method: getRawData()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    what does get do?
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getRawData = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: get()");
  // alert("js/data4graph.js - Call: get()");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.get();
  //-------------------------------------------------------
	//ovitrapmpi JSON structure
	// {
  //   "id": 20170409184302616,
  //   "collectionType": "OviTrap",
  //   "username": "albina",
  //   "trapNumber": 2009,
  //   "mpi": "3-5",
  //   "imageSnap": "",
  //   "eggCount": 0,
  //   "comments": "",
  //   "problem": "",
  //   "problemIndoorOutdoor": "",
  //   "problemIndoorOutdoorSituation": "",
  //   "date": "2017-04-09",
  //   "time": "06:46",
  //   "cityName": "Aluva",
  //   "geoLocation": "10.1322535,76.3332827"
  // },
	var md = []; // MorrisJS Data Array
	var vEggsExists = false; // Boolean to check if an eggCount number is defined
	var vMPIExists = false; // Boolean if an MPI data was set
	for (var i = 0; i < this.aData.length; i++) {
		var d = this.aData[i];
		vEggsExists = Number.isInteger(d.eggCount);
		vMPIExists = this.aMapMPI.hasOwnProperty(d.mpi);
		if (vEggsExists || vMPIExists) {
			var rec = { y: d.date };
			if (vEggsExists) {
				rec.a = d.eggCount;
			};
			if (vMPIExists) {
				rec.b = this.aMapMPI[d.mpi];
			};
			md.push(rec);
		}
	};
  //MorrisJS data structure
	// var md_demo =[
	// 	{ y: '2016-12', a: 100, b: 90 },
	// 	{ y: '2017-01', a: 75,  b: 65 },
	// 	{ y: '2017-06',  b: 35 },
	// 	{ y: '2008-01', a: 50,  b: 40 },
	// 	{ y: '2019-03', a: 75,  b: 65 },
	// 	{ y: '2010', a: 50,  b: 40 },
	// 	{ y: '2011', a: 75,  b: 65 },
	// 	{ y: '2012', a: 100, b: 90 }
	// ];
	// Define the MorrisJS GraphHash
	// var gh = {
	// 	element: 'line-example',
	// 	data: md, // inject data
	// 	xkey: 'y',
	// 	ykeys: ['a', 'b'],
	// 	labels: ['Ovitrap', 'MPI']
	// };
	// return MorrisJS GraphHash
	return this.getGraphConfig(['a', 'b'],['Ovitrap', 'MPI'],md);
};
//----End of Method get Definition


//#################################################################
//# PUBLIC Method: getGraphConfig()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    what does get do?
//#
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getGraphConfig = function (pKeyArr,pLabelArr,pData) {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: get()");
  // alert("js/data4graph.js - Call: get()");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getGraphConfig([a,b]);
  //-------------------------------------------------------
	// {
	// 	element: 'line-example',
	// 	data: [ ... ], // inject data
	// 	xkey: 'y',
	// 	ykeys: ['a', 'b'],
	// 	labels: ['Ovitrap', 'MPI']
 // 	};
 return {
	 element: 'line-example',
	 data: pData, // inject data
	 xkey: 'y',
	 ykeys: pKeyArr,
	 labels: pLabelArr

 };
};
//----End of Method get Definition

//#################################################################
//# PUBLIC Method: getOviTrap4Month()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#     get OviTrap Data aggregated per month and mean calculated
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getOviTrap4Month = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getOviTrap():Hash");
  // alert("js/data4graph.js - Call: getOviTrap():Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getOviTrap();
  //-------------------------------------------------------
	var vEggsExists = false; // Boolean to check if an eggCount number is defined
	var mdMonth = {};
	//alert("getOviTrap Month");
	for (var i = 0; i < this.aData.length; i++) {
		var d = this.aData[i];
		vEggsExists = Number.isInteger(d.eggCount);
		if (vEggsExists) {
			var m = this.date2month(d.date); // Month ID e.g. 2017-03-15 the month id is 2017-03
			//console.log("Date: "+d.date+" Month: "+m);
			if (mdMonth.hasOwnProperty(m)) {
				mdMonth[m]["data"] += d.eggCount;
				mdMonth[m]["count"] += 1;
				console.log("["+m+"] Eggs="+(d.eggCount)+" EggSum="+mdMonth[m]["data"]+" Data per month="+mdMonth[m]["count"]);
			} else {
				mdMonth[m] = {};
				mdMonth[m]["data"] = d.eggCount;
				mdMonth[m]["count"] = 1;
			};
		};
	};
	return mdMonth
};

//#################################################################
//# PUBLIC Method: getOviTrap()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    Comment for getOviTrap
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getOviTrap = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getOviTrap():Hash");
  // alert("js/data4graph.js - Call: getOviTrap():Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getOviTrap();
  //-------------------------------------------------------
	var md = []; // MorrisJS Data Array
	var mdMonth = this.getOviTrap4Month();
		// generate MorrisJS data for aggregated average per month
	for (var m in mdMonth) {
		// m is the month e.g. 2017-04
		if (mdMonth.hasOwnProperty(m)) {
			var rec = {};
			rec["y"] = m;
			rec["a"] = (mdMonth[m]["data"] / mdMonth[m]["count"]).toFixed(1);
			md.push(rec);
		}
	};
	// Define the MorrisJS GraphHash
	// var gh = {
	// 	element: 'line-example',
	// 	data: md, // inject data
	// 	xkey: 'y',
	// 	ykeys: ['a'],
	// 	labels: ['Ovitrap']
	// };
	// return MorrisJS GraphHash
	return this.getGraphConfig(['a'],['Ovitrap Month'],md);
};
//----End of Method getOviTrap Definition

//#################################################################
//# PUBLIC Method: getOviTrapRaw()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    Comment for getOviTrap
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getOviTrapRaw = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getOviTrap():Hash");
  // alert("js/data4graph.js - Call: getOviTrap():Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getOviTrap();
  //-------------------------------------------------------
	var md = []; // MorrisJS Data Array
	var vEggsExists = false; // Boolean to check if an eggCount number is defined
	for (var i = 0; i < this.aData.length; i++) {
		var d = this.aData[i];
		vEggsExists = Number.isInteger(d.eggCount);
		if (vEggsExists) {
			var rec = { y: d.date };
			rec.a = d.eggCount;
			md.push(rec);
		}
	};
	// Define the MorrisJS GraphHash
	// var gh = {
	// 	element: 'line-example',
	// 	data: md, // inject data
	// 	xkey: 'y',
	// 	ykeys: ['a'],
	// 	labels: ['Ovitrap']
	// };
	// return MorrisJS GraphHash
	return this.getGraphConfig(['a'],['Ovitrap'],md);
};
//----End of Method getOviTrapRaw Definition


//#################################################################
//# PUBLIC Method: getMPI()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    Comment for getMPI
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getMPI = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getMPI():Hash");
  // alert("js/data4graph.js - Call: getMPI():Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getMPI();
  //-------------------------------------------------------
	var md = []; // MorrisJS Data Array
	var mdMonth = this.getMPI4Month();
		// generate MorrisJS data for aggregated average per month
	for (var m in mdMonth) {
		// m is the month e.g. 2017-04
		if (mdMonth.hasOwnProperty(m)) {
			var rec = {};
			rec["y"] = m;
			rec["a"] = (mdMonth[m]["data"] / mdMonth[m]["count"]).toFixed(1);
			md.push(rec);
		}
	};
	return this.getGraphConfig(['a'],['MPI Month'],md);

};
//----End of Method getMPI Definition


//#################################################################
//# PUBLIC Method: getMPIRaw()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    Comment for getMPIRaw
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getMPIRaw = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getMPI():Hash");
  // alert("js/data4graph.js - Call: getMPI():Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getMPI();
  //-------------------------------------------------------
	var md = []; // MorrisJS Data Array
	var vMPIExists = false; // Boolean if an MPI data was set
	for (var i = 0; i < this.aData.length; i++) {
		var d = this.aData[i];
		vMPIExists = this.aMapMPI.hasOwnProperty(d.mpi);
		if (vMPIExists) {
			var rec = { y: d.date };
			rec.b = this.aMapMPI[d.mpi];
			md.push(rec);
		}
	};
	return this.getGraphConfig(['b'],['Ovitrap'],md);
};
//----End of Method getMPIRaw Definition

//#################################################################
//# PUBLIC Method: getMPI4Month()
//#    used in Class: Data4Graph
//# Parameter:
//#    pID
//# Comment:
//#    Comment for getMPI4Month
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getMPI4Month = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getMPI4Month(pDataHash):Hash");
  // alert("js/data4graph.js - Call: getMPI4Month(pDataHash):Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getMPI4Month();
  //-------------------------------------------------------
	//ovitrapmpi JSON structure
	// {
  //   "id": 20170409184302616,
  //   "collectionType": "OviTrap",
  //   "username": "albina",
  //   "trapNumber": 2009,
  //   "mpi": "3-5",
  //   "imageSnap": "",
  //   "eggCount": 0,
  //   "comments": "",
  //   "problem": "",
  //   "problemIndoorOutdoor": "",
  //   "problemIndoorOutdoorSituation": "",
  //   "date": "2017-04-09",
  //   "time": "06:46",
  //   "cityName": "Aluva",
  //   "geoLocation": "10.1322535,76.3332827"
  // },
	var vMPIExists = false; // Boolean to check if an eggCount number is defined
	var mdMonth = {};
	//alert("getOviTrap Month");
	for (var i = 0; i < this.aData.length; i++) {
		var d = this.aData[i];
		vMPIExists = this.aMapMPI.hasOwnProperty(d.mpi);
		if (vMPIExists) {
			var m = this.date2month(d.date); // Month ID e.g. 2017-03-15 the month id is 2017-03
			//console.log("Date: "+d.date+" Month: "+m);
			var val = this.aMapMPI[d.mpi]
			if (mdMonth.hasOwnProperty(m)) {
				mdMonth[m]["data"] += val;
				mdMonth[m]["count"] += 1;
				console.log("["+m+"] MPI="+val+" MPI Sum="+mdMonth[m]["data"]+" Data per month="+mdMonth[m]["count"]);
			} else {
				mdMonth[m] = {};
				mdMonth[m]["data"] = val;
				mdMonth[m]["count"] = 1;
			};
		};
	};
	return mdMonth
};
//----End of Method getMPI4Month Definition


//#################################################################
//# PUBLIC Method: setGraphOutput()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    setsGraphOutput
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.setGraphOutput = function (pGraphID) {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getGraphConfig():Hash");
  // alert("js/data4graph.js - Call: getGraphConfig():Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getGraphConfig();
  //-------------------------------------------------------
	console.log("setGraphOutput('"+pGraphID+"')");
	this.aGraphID = pGraphID;
};
//----End of Method getData Definition


//#################################################################
//# PUBLIC Method: date2month(pDate)
//#    used in Class: Data4Graph
//# Parameter:
//#    pDate
//# Comment:
//#    converts a data 2017-05-21 to a month  2017-05
//# Return: String
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.date2month = function (pDate) {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: date2month(pID):String");
  // alert("js/data4graph.js - Call: date2month(pID):String");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.date2month();
  //-------------------------------------------------------
	var vPos = pDate.lastIndexOf("-");
	return pDate.substring(0,vPos);
};
//----End of Method date2month Definition


//#################################################################
//# PUBLIC Method: getOviTrapMPI()
//#    used in Class: Data4Graph
//# Parameter:
//#    pValue
//# Comment:
//#    Comment for getOviTrapMPI
//# Return: Integer
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getOviTrapMPI = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getOviTrapMPI(pValue):Integer");
  // alert("js/data4graph.js - Call: getOviTrapMPI(pValue):Integer");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getOviTrapMPI();
  //-------------------------------------------------------
	var md = []; // MorrisJS Data Array
	var mdMonth = this.getOviTrap4Month();
	// generate MorrisJS data for aggregated average per month
	for (var m in mdMonth) {
		// m is the month e.g. 2017-04
		if (mdMonth.hasOwnProperty(m)) {
			mdMonth[m]["a"] = (mdMonth[m]["data"] / mdMonth[m]["count"]).toFixed(1);
		};
	};
	mdMPI = this.getMPI4Month();
	for (var m in mdMPI) {
		// m is the month e.g. 2017-04
		if (mdMPI.hasOwnProperty(m)) {
			mdMonth[m]["b"] = (mdMPI[m]["data"] / mdMPI[m]["count"]).toFixed(1);
		};
	};
	//this.normalizeData(mdMonth,"a");
	//this.normalizeData(mdMonth,"b");
	// Define the MorrisJS GraphHash
	for (var m in mdMonth) {
		if (mdMonth.hasOwnProperty(m)) {
			var rec = {};
			rec["y"] = m;
			if (mdMonth[m].hasOwnProperty("a")) {
				rec["a"] = 	mdMonth[m]["a"];
			};
			if (mdMonth[m].hasOwnProperty("b")) {
				rec["b"] = 	mdMonth[m]["b"];
			};
			md.push(rec);
		};
	};
	// var gh = {
	// 	element: 'line-example',
	// 	data: md, // inject data
	// 	xkey: 'y',
	// 	ykeys: ['a'],
	// 	labels: ['Ovitrap']
	// };
	// return MorrisJS GraphHash
	return this.getGraphConfig(['a','b'],['Ovitrap','MPI'],md);
};
//----End of Method getOviTrapMPI Definition


//#################################################################
//# PUBLIC Method: getHeatMapData()
//#    used in Class: Data4Graph
//# Parameter:
//#
//# Comment:
//#    Comment for getHeatMap
//# Return: Hash
//# created with JSCC  2017/03/05 18:13:28
//# last modifications 2017/05/06 7:39:57
//#################################################################

Data4Graph.prototype.getHeatMapData = function () {
  //----Debugging------------------------------------------
  // console.log("js/data4graph.js - Call: getHeatMapData():Hash");
  // alert("js/data4graph.js - Call: getHeatMapData():Hash");
  //----Create Object/Instance of Data4Graph----
  //    var vMyInstance = new Data4Graph();
  //    vMyInstance.getHeatMapData();
  //-------------------------------------------------------
	//ovitrapmpi JSON structure
	// {
	//   "id": 20170409184302616,
	//   "collectionType": "OviTrap",
	//   "username": "albina",
	//   "trapNumber": 2009,
	//   "mpi": "3-5",
	//   "imageSnap": "",
	//   "eggCount": 0,
	//   "comments": "",
	//   "problem": "",
	//   "problemIndoorOutdoor": "",
	//   "problemIndoorOutdoorSituation": "",
	//   "date": "2017-04-09",
	//   "time": "06:46",
	//   "cityName": "Aluva",
	//   "geoLocation": "10.1322535,76.3332827"
	// },
	function split2float(pValue) {
		var vGeoPair = pValue.split(",");
		var g = [];
		try {
			g.push(parseFloat(vGeoPair[0]));
			g.push(parseFloat(vGeoPair[1]));
		} catch (e) {
			console.log("ERROR: "+e+". Parse geoLocation failed for '"+pValue+"'");
		};
		return g;
	};

	function appendRecord(pArr,pRec) {
		if (pRec[0] && pRec[1]) {
			pArr.push(pRec)
		}
	}

	var user2geo = {};
	//alert("getOviTrap Month");
	var lld = []; // leaf let data
	for (var i = 0; i < this.aData.length; i++) {
		var d = this.aData[i];
		if (!this.isMissing(d.geoLocation)) {
			user2geo[d.username] = split2float(d.geoLocation);
		};
	};
	//username mapped to geoLocation
	for (var i = 0; i < this.aData.length; i++) {
		var d = this.aData[i];
		if (this.isMissing(d.geoLocation)) {
			appendRecord(lld,split2float(d.geoLocation));
		} else {
			if (user2geo.hasOwnProperty(d.username)) {
				appendRecord(lld,user2geo[d.username]);
			};
		};
	};
	return lld;
};
//----End of Method getHeatMap Definition



//-------------------------------------------
//---End Definition of Class-----------------
// JS Class: Data4Graph
//-------------------------------------------
