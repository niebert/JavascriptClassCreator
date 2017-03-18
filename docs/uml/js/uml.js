function calcSizeUML(pName,pAttArr,pMethArr) {
  var vName = pName || "Undefined_calcSizeUML"
  var vSize = {
    width:  calcClassWidth(vName,pAttArr,pMethArr),
    height: calcClassHeight(vName,pAttArr,pMethArr)
  };
  return vSize;
};

function calcClassWidth(pName,pAttArr,pMethArr) {
  var vCharMax = calcClassTextWidth(pName,pAttArr,pMethArr);
  var vChar2Pixel = 6;
  //return Math.round(vTextMax * vChar2Pixel);
  return vCharMax * vChar2Pixel;
};

function calcClassTextWidth(pName,pAttArr,pMethArr) {
  var vMin = 30;
  var vMax = vMin;
  vMax = checkMaxLength(vMax,pName.length);
  for (var i = 0; i < pAttArr.length; i++) {
    vMax = checkMaxLength(vMax,pAttArr[i].length);
  };
  for (var i = 0; i < pMethArr.length; i++) {
    vMax = checkMaxLength(vMax,pMethArr[i].length);
  };
  return vMax;
};

function calcClassHeight(pName,pAttArr,pMethArr) {
  var vHeaderLine = 2;
  var vLineMax = vHeaderLine;
  vLineMax += calcClassLineHeight(pAttArr,pMethArr);
  var vLine2Pixel = 15;
  var vHeightAdd = 5;
  //return Math.round(vTextMax * vChar2Pixel);
  return vLineMax * vLine2Pixel + vHeightAdd;
};

function calcClassLineHeight(pAttArr,pMethArr) {
  var vMax = 2 + pAttArr.length + pMethArr.length;
  return vMax;
}

function checkMaxLength(vMax,pTextLength) {
  if (vMax < pTextLength) {
    vMax = pTextLength;
  };
  return vMax;
};

function calcCenteredClassPos() {
  var vWidth = vClassPos.width;
  var vOffset = vClassPos.offset;
  var vSize = vClassPos.lastclass.size;
  var vLastPos = vClassPos.lastclass.position;
  var vNewPos = vClassPos.position;
  var vLeft = vClassPos.left;
  var vRight = vClassPos.right;
  if (vClassPos.count == 0) {
    vLeft.x = vOffset.x;
    vRight.x = vClassPos.width - vSize.width - vOffset.x;
  };
  if (vLeft.y > vRight.y) {
    vRight.y = vLeft.y;
  } else {
    vLeft.y = vRight.y;
  };
  console.log("Y in vClassPos EQUAL for LEFT and RIGHT");
  //append class to diagram centered
  console.log("Place ClassUML CENTER");
  //right border - size of Class - offset
  var vInnerWidth = vWidth - 2*vOffset.x;
  if (vInnerWidth < vSize.width) {
    console.log("CENTER: Class-width: "+vSize.width+ " Window-width="+vWidth);
    vLastPos.x = vOffset.x;
  } else {
    var vShift = Math.round((vInnerWidth - vSize.width)/2);
    console.log("CENTER: Class-width: "+vSize.width+ " Shift: "+ vShift +" Window-width="+vWidth);
    vLastPos.x = vOffset.x + vShift;
  };
  vLastPos.y = vLeft.y;
  vLeft.y = vLeft.y + vSize.height + vOffset.y;
  vRight.y = vLeft.y;
  vNewPos.x = vLeft.x;
  vNewPos.y = vLeft.y;
  //vClassPos.count++;
  console.log(JSON.stringify(vClassPos, null, 4));
  console.log("calcCenteredClassPos() x="+vNewPos.x+" y="+vNewPos.y);
};

function calcNextClassPos() {
  // var vClassPos = {
  //     "offset":{"x":10,"y":10},
  //     "left":{"x":0,"y":40},
  //     "right":{"x":vSize.width,"y":10},
  //     "lastclass":{
  //         "size": {"width":50,"heigth":30}
  //         "position": {"x": 10, "y":10 }
  //     }
  //   };
  var vWidth = vClassPos.width;
  var vOffset = vClassPos.offset;
  var vSize = vClassPos.lastclass.size;
  var vLastPos = vClassPos.lastclass.position;
  var vNewPos = vClassPos.position;
  var vLeft = vClassPos.left;
  var vRight = vClassPos.right;
  if (vClassPos.count == 0) {
    vLeft.x = vOffset.x;
    vRight.x = vWidth - vSize.width - vOffset.x;
  };
  if (vLeft.y > vRight.y) {
    //append class to diagram on the right
    console.log("Place ClassUML RIGHT");
    //right border - size of Class - offset
    vLastPos.x = vWidth - vSize.width - vOffset.x;
    vLastPos.y = vRight.y;
    // Calculate the new right posistion of Class
    vRight.x = vLastPos.x;
    vRight.y = vLastPos.y + vSize.height + vOffset.y;
  } else {
    //append class to diagram on the left
    console.log("Place ClassUML LEFT");
    vLastPos.x = vOffset.x;
    vLastPos.y = vLeft.y;
    // Calculate the new right posistion of Class
    vLeft.x = vLastPos.x;
    vLeft.y = vLeft.y + vSize.height + vOffset.y;
  };
  if (vLeft.y > vRight.y) {
    vNewPos.x = vRight.x;
    vNewPos.y = vRight.y;
  } else {
    vNewPos.x = vLeft.x;
    vNewPos.y = vLeft.y;
  };
  vClassPos.count++;
  console.log(JSON.stringify(vClassPos, null, 4));
  console.log("calcNextClassPos() x="+vNewPos.x+" y="+vNewPos.y);
};

function getInt(pNumber) {
  var vInt = parseInt(pNumber+"");
  vInt++;
  console.log("vInt="+vInt);
  return vInt;
}

var vClassColor = {
  "Default": {
      "fillheader": '#d9d9d9',
      "fillbody"  : '#f2f2f2'
  },
  "Blue": {
      "fillheader": '#9999ff',
      "fillbody"  : '#e6e6ff'
  },
  "Green": {
      "fillheader": '#99e699',
      "fillbody"  : '#d6f5d6'
  },
  "Yellow": {
      "fillheader": '#ffe066',
      "fillbody"  : '#fff0b3'
  },
  "Orange": {
      "fillheader": '#ffa366',
      "fillbody"  : '#ffd1b3'
  },
  "Red": {
      "fillheader": '#ff9999',
      "fillbody"  : '#ffe6e6'
  },
  "Violet": {
      "fillheader": '#ffb3ff',
      "fillbody"  : '#ffe6ff'
  },
  "Brown": {
      "fillheader": '#ffcc80',
      "fillbody"  : '#ffebcc'
  },
  "Abstract": {
      "fillheader": '#68ddd5',
      "fillbody"  : '#9687fe'
  },
  "Interface": {
      "fillheader": '#feb662',
      "fillbody"  : '#fdc886'
  }

};

function createClass4UML(pTypeUML,pClassUML,pCentered) {
  console.log("createClass4UML('"+pTypeUML+"','"+pClassUML.name+"')");
  var vCentered = pCentered || false;
  var vStroke = '#000000';
  var vTextColor = '#000000';
  var vColor = vClassColor[pTypeUML] || vClassColor["Default"];
  // Define Global Colors for Class Diagrams
  vColor["stroke"] = vStroke;
  vColor["textcolor"] = vTextColor;
  // Define the appropriate Constructor for the UML Diagram of JointJS
  var vContructor = uml.Class;
  switch (pTypeUML) {
    case "Abstract":
      vContructor = uml.Abstract;
    break;
    case "Interface":
      vContructor = uml.Interface;
    break;
    default: // Constructor for Default Class
      vContructor = uml.Class;
  };
  // Generate the UML Class and update the ClassPos
  return generateClassUML(vContructor,pClassUML,vColor,pCentered);
};

function generateClassUML(pConstructor,pClassUML,pColor,pCentered) {
   var vSize = calcSizeUML(pClassUML.name,pClassUML.attributes,pClassUML.methods);
   vClassPos.lastclass.size = vSize;
   if (pCentered) {
     calcCenteredClassPos();
   } else {
     calcNextClassPos();
   };
   var vPosition = vClassPos.lastclass.position;
   var vClassUML = new pConstructor({
       position: vPosition, //{ x:100  , y: 30},
       size: vSize,
           // { width: 230, height: 60 },
       name: pClassUML.name,
       attributes: pClassUML.attributes,
       methods:    pClassUML.methods,
       attrs: {
           '.uml-class-name-rect': {
               fill: pColor.fillheader,
               stroke: pColor.stroke,
               'stroke-width': 0.5
           },
           '.uml-class-attrs-rect, .uml-class-methods-rect': {
               fill: pColor.fillbody,
               stroke: pColor.stroke,
               'stroke-width': 0.5
           },
           '.uml-class-methods-text, .uml-class-attrs-text': {
               fill: pColor.textcolor,
               stroke: pColor.stroke,
               'stroke-width': 0.25
           }
       }
   });
   return vClassUML;
};

function removeEmptyLines(pString) {
  //remove Empty Lines with CR at end
  pString = pString.replace(/^[\s\t]*[\r\n]/gm,"");
  //remove Empty Lines with CR at beginning
  pString = pString.replace(/\n[\s\t]*$/gm,"");
  // if remaining string is an empty line replace with ""
  pString = pString.replace(/^[\s\t]*$/gm,"");
  return pString
};
