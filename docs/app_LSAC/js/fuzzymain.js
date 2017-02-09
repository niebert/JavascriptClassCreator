function defuzzifyIndex(pValue,pMax) {
  var vIndex = 0;
  if (!pValue) {
    console.log("WARNING: pValue is UNDEFINED calcDefuzzifyIndex() - use default 0.5");
    pValue = 0.5;
  };
  if (!pMax) {
    console.log("WARNING: pMax is UNDEFINED calcDefuzzifyIndex() - use default 2");
    pMax = 2;
  } else if (pMax<2) {
    console.log("WARNING: pMax < 2 calcDefuzzifyIndex("+pValue+","+pMax+") - use default 2");
    pMax = 2;
  };
  //==== Calc Defuzzification Index ====
  if (pValue > 1.0) {
    console.log("WARNING: pValue > 1.0 calcDefuzzifyIndex("+pValue+","+pMax+") - use default 1.0");
    pValue = 1.0;
    vIndex = pMax-1;
  } else if (pValue < 0.0) {
    console.log("WARNING: pValue is NEGATIVE in calcDefuzzifyIndex("+pValue+","+pMax+") - use default 1.0");
    pValue = 0.0;
    vIndex = 0;
  } else {
    vIndex = Math.floor(pMax*pValue);
    if (vIndex == pMax) {
      vIndex = pMax-1;
    }
  };
  return vIndex;
}

function defuzzifyLow2High(pValue) {
  var vLingArr = ["very low","low","medium","high","very high"];
  var vMax = vLingArr.length;
  var i = defuzzifyIndex(pValue,vMax);
  return vLingArr[i];
};

function calcFuzzyForm(pDBType) {
  console.log("calcFuzzyForm('"+pDBType+"')");
  switch (pDBType) {
    case "app":
      //vParam = readRecord2URLparam();
      console.log("Read Questionnaire Form to URL parameter in calcFuzzyForm()");
      //var vQuestHash = readRecord2Hash(pDBType);
      var vQuestHash = readRecordDOM2Hash(vJSONDB["DBformat"],"app_");
      //readFuzzyJSON(pDBType);
      vFuzzyControl.create(vQuestHash,"app");
      vFuzzyControl.calcFuzzyRisk();
    break;
    case "response":
      console.log("calcFuzzyForm() for Response");
      var vQuestHash = readRecordDOM2Hash(vResponseDB["DBformat"],"response_");
      vFuzzyControl.create(vQuestHash,"response");
      vFuzzyControl.calcFuzzyRiskMitigation();
      //vParam = readResponse2URLparam();
    break;
    case "feedback":
      console.log("calcFuzzyForm() for Feedback");
      //vParam = readFeedback2URLparam();
    break;
    default:
      console.log("Type '"+vType+"' for Database '"+vDB+"' undefined calcFuzzyForm()");
  };
};
// Fuzzy Calculation JS-Class

function fuzzy2percent(pValue) {
    var n = "undefined_pValue";
    if (pValue) {
      pValue = Math.round(pValue*1000)/10;
      n = pValue.toString();
    };
    return n;
}

function fuzzyNOT(pValueArr) {
  var vRetArr = [];
  for (var i = 0; i < pValueArr.length; i++) {
    vRetArr.push(1-pValueArr[i]);
  };
};

function fuzzyCHECK_value(pValueArr) {
  var vRet = [];
  for (var i = 0; i < pValueArr.length; i++) {
    vRet.push((pValueArr[i]<= 1.0) && (pValueArr[i]>=0.0));
  };
  return vRet;
};

function fuzzyPARSE_string2real(pStringHash) {
  // If user answered Question 1 with "YES DEFINITEY" then
  // the pStringHash contains pStringHash["question1"] = "YES DEFINITEY"
  // This string hash is stored in the Return JSON in vRetJSON["data"]
  // "NA" (Boolean Hash) not available - String "NA" or ""
  // "empty" (Boolean Hash) string empty - Subset of NA with String ""
  // "values" hash with values contains the usable answers that could be fuzzyfied successful
  // "data" just stores the StringHash coming directly from the questionnaire
  var vRetJSON = {"data":pStringHash,"missing":{},"NA":{},"empty":{},"values":{},"weights":{}};
  var vMis = vRetJSON["missing"];
  var vEmp = vRetJSON["empty"];
  var vNA = vRetJSON["NA"];
  var vVal = vRetJSON["values"];
  var vWeight = vRetJSON["weights"];
  var vAnswer = "";
  for (var iID in pStringHash) {
    vMis[iID] = false;
    vEmp[iID] = false;
    vNA[iID] = false;
    if (pStringHash.hasOwnProperty(iID)) {
      vAnswer = pStringHash[iID];
      if (vAnswer == "") {
        console.log("["+iID+"] empty");
        vMis[iID] = true;
        vEmp[iID] = true;
      } else if (vAnswer == "NA"){
        console.log("["+iID+"] missing");
        vMis[iID] = true;
        vNA[iID] = true;
      } else if (!isNaN(vAnswer)) {
        console.log("["+iID+"] float value="+vAnswer);
        var vValue = parseFloat(vAnswer);
        if ((vValue >= 0.0) && (vValue <= 1.0)) {
          vVal[iID] = parseFloat(vAnswer);
          vWeight[iID] = 1.0;
          console.log("Fuzzy Value found for ["+iID+"]="+vValue);
        } else {
          console.log("No Fuzzy Value - out of range ["+iID+"]="+vValue);
        };
      } else {
        console.log("["+iID+"] NaN");
        vMis[iID] = true;
      }
    } else { // data no property
      console.log("["+iID+"] missing - Does not exist in Hash");
      vMis[iID] = true;
    }
  };
  return vRetJSON;
}

function fuzzyAND_mult(pValueArr) {
  var vRet = 1.0;
  for (var i = 0; i < pValueArr.length; i++) {
    vRet = vRet * pValueArr[i];
  };
  return vRet;
};

function fuzzyOR(pValueArr) {
  //return fuzzyOR_generic(pValueArr)
  return fuzzyOR_max(pValueArr);
};

function fuzzyAND(pValueArr) {
  return fuzzyAND_min(pValueArr);
};

function fuzzyAND_mult(pValueArr) {
  var vRet = 1.0;
  for (var i = 0; i < pValueArr.length; i++) {
    vRet *= pValueArr[i];
  };
  return vRet;
};

function fuzzyOR(pValueArr) {
  return fuzzyOR_generic(pValueArr)
};

function fuzzyOR_generic(pValueArr) {
  var vRet = 1.0 - fuzzyAND_mult(fuzzyNOT(pValueArr));
  return vRet;
};

function fuzzyAND_min(pValueArr) {
  var vRet = pValueArr[0];
  for (var i = 1; i < pValueArr.length; i++) {
    if(vRet > pValueArr[i]) {
      vRet = pValueArr[i]
    };
  };
  return vRet;
}

function fuzzyOR_max(pValueArr) {
  var vRet = pValueArr[0];
  for (var i = 1; i < pValueArr.length; i++) {
    if(vRet < pValueArr[i]) {
      vRet = pValueArr[i]
    };
  };
  return vRet;
}
