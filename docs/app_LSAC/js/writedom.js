function enableButton(pID) {
  disableButton(pID,false);
};

function disableButton(pID,pValue) {
  var vValue = pValue || true;
  $("#"+pID).prop("disabled",vValue);
  if (vValue) {
    console.log("Button ["+pID+"] disabled");
  } else {
    console.log("Button ["+pID+"] enabled");
  }
};

function addOnClick4Button(pID,pFunction) {
  $('#'+pID).on('click',pFunction);
}

function lengthObject(pObject) {
    var count = 0;
    for (var i=0;i<pObject.length;i++) {
      ++count;
    };
    return count;
};

function showErrorMessage(pMSG,pType) {
  var vType = pType || "app";
  console.log("Show Error Message ["+vType+"]");
  write2innerHTML(vType+"_errormsg",pMSG);
  pMSG = pMSG.replace(/<BR>/gi,"\n");
  pMSG = pMSG.replace(/<BR[^>]+]>/gi,"\n");
  pMSG = pMSG.replace(/<[^>]+>/gi,"");
  console.log(pMSG);
  alert(pMSG);
};

function getValueDOM(pID) {
  var vNode = document.getElementById(pID);
  var vReturn = "";
  if (!vNode) {
    console.log("DOM Node ["+pID+"] does not exist! - getValueDOM()-Call");
  } else {
    vReturn = vNode.value;
    if (!vReturn) {
      //vReturn = getInnerHTML(pID);
      vReturn = "";
      console.log("getValueDOM('"+pID+"') Value undefined");
    };
  }
  return vReturn;
};

function getInnerHTML(pID) {
  var vNode = document.getElementById(pID);
  var vReturn = "";
  if (!vNode) {
    console.log("DOM Node ["+pID+"] does not exist! - getInnerHTML()-Call");
  } else {
    vReturn = vNode.innerHTML;
    if (!vReturn) {
      vReturn = "";
      //alert("["+pID+"] Node is undefined");
    } else {
      //alert("["+pID+"] Node defined");
    };
  }
  return vReturn;
};

function write2innerHTML(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    //vNode.innerHTML=pContent;
    //$("#"+pID).empty();
    $("#"+pID).html(pContent);
    //$("#"+pID).toggle().toggle(); //refreshing Element
  } else {
    console.log("Write DOM-Node 'innerHTML' with ID=["+pID+"] was undefined")
  }
}

function write2value(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    //vNode.value=pContent;
    $("#"+pID).val(pContent);
  } else {
    console.log("Write DOM-Node 'value' with ID=["+pID+"] was undefined")
  }
}

function write4name2value(pID,pContent) {
  var vNodeArr =document.getElementsByName(pID);
  if (vNodeArr){
    for (var i=0;i<vNodeArr.length; i++) {
      vNodeArr[i].value=pContent;
    }
  } else {
    console.log("Write DOM-Node 'value' with Name=["+pID+"] was undefined")
  }
}

function append2innerHTML(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    //vNode.innerHTML+=pContent;
    var vPrevContent = $("#"+pID).html();
    $("#"+pID).html(vPrevContent + pContent);
  } else {
    console.log("Append DOM-Node 'innerHTML' with ID=["+pID+"] was undefined")
  }
}

function append2value(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    //vNode.value+=pContent;
    var vPrevContent = $("#"+pID).val();
    $("#"+pID).val(vPrevContent + pContent);
  } else {
    console.log("DOM-Node 'value' with ID=["+pID+"] was undefined")
  }
}

function setAttribute2Value(pWriteID,pAttribute,pValue) {
  var vNodeID = 'send2appdb';
  var vNode = document.getElementById(pWriteID);
  if (vNode) {
    console.log("setAttribute2Value(): DOM-Element "+pWriteID+" exists - set Attribute '"+pAttribute+"' to value '"+pValue+"'");
    vNode.setAttribute(pAttribute,pValue);
  };
};

function setFormVariable2LocalVar(pWriteID,pReadID) {
	//document.send2appdb.elements[pWriteID].value = getValueDOM(pReadID);
	document.send2appdb.elements[pWriteID].value = loadLocalVar(pReadID);
	console.log(pWriteID+"="+loadLocalVar(pReadID)+" - setFormVariable2LocalVar()");
};

function setFormVariable2Value(pWriteID,pValue) {
	//document.send2appdb.elements[pWriteID].value = getValueDOM(pReadID);
	document.send2appdb.elements[pWriteID].value = pValue;
	console.log(pWriteID+"="+loadLocalVar(pReadID)+" - setFormVariable2Value()");
};

function setDOMName2Value(pWriteID,pReadID) {
  var vReadNode =  document.getElementById(pReadID);
  if (vReadNode) {
    var vWriteArray =  document.getElementsByName(pWriteID);
    if (vWriteArray.length>0) {
      for (var i = 0; i < vWriteArray.length; i++) {
        vWriteArray[i].value = vReadNode.value;
      };
    } else {
      console.log("ERROR: setDOMName2Value('"+pWriteID+"','"+pReadID+"') '"+pWriteID+"' undefined");
    }
  } else {
    console.log("ERROR: setDOMName2Value('"+pWriteID+"','"+pReadID+"') '"+pReadID+"' undefined");
  }
}


function setDOMValue2Value(pWriteID,pReadID) {
  var vReadNode =  document.getElementById(pReadID);
  if (vReadNode) {
    var vWriteNode =  document.getElementById(pWriteID);
    if (vWriteNode) {
      vWriteNode.value = vReadNode.value;
    } else {
      console.log("ERROR: setDOMValue2Value('"+pWriteID+"','"+pReadID+"') '"+pWriteID+"' undefined");
    }
  } else {
    console.log("ERROR: setDOMValue2Value('"+pWriteID+"','"+pReadID+"') '"+pReadID+"' undefined");
  }
}
