
function showFormPage(pID,pMaxID) {
  showContentPage("form",pID,pMaxID);
}

function showDisplayPage(pID,pMaxID) {
  showContentPage("display",pID,pMaxID);
};

function showContentPage(pPageType,pID,pMaxID) {
  //alert("Show Slide"+pID+" of Max="+pMaxID);
  for (var i = 1; i <= pMaxID; i++) {
    hide(pPageType+"input"+i);
  };
  show(pPageType+"input"+pID);
  var vType = pPageType.toUpperCase();
  var vTitle = document.getElementById(vType+"DataHeader").innerHTML;
  var vTitleArray = vTitle.split(" - ");
  $("#SubmitDataHeader").innerHTML = vTitleArray[0]+" - Page "+pID;
}


function setPage(pButtonID) {
	var vPages = ["bConvert","bNew","bWebInput","bBibliography","bSettings","bEditor","bTemplates"];
	//alert("setPage for ID="+pButtonID+" vPages.length="+vPages.length);
	var i=0;
	for (i=0;i<vPages.length;i++) {
		setColorDefault(vPages[i]);
		hide(vPages[i]+"Page");
	};
	show(pButtonID+"Page");
	setColorSelected(pButtonID);
};

function setColorSelected(pButtonID) {
	setButtonColor(pButtonID,"#3D8CD1");
};

function setColorDefault(pButtonID) {
	setButtonColor(pButtonID,"black");
};

function setButtonColor(pID,pColor) {
	var vNode = document.getElementById(pID);
	if (vNode) {
		vNode.style.color = pColor;
	} else {
		alert("setButtonColor()-Call pID="+pID+" does not exist!");
	}
};

function toggleCheck(pID,pChecked) {
	if (pChecked) {
		show(pID,"block");
	} else {
		hide(pID);
	}
};

function hide(pID) {
  var vNode = document.getElementById(pID);
  if (vNode) {
    $( "#"+pID ).hide();
  } else {
    console.log("hide('"+pID+"')-Call DOM-Node for ID undefined");
  }
};

function hideElementNode(pNode) {
	if (pNode) vNode.style.visibility = "hidden";
};

function hideElement(pID) {
	var vNode = document.getElementById(pID);
	if (vNode) {
		vNode.style.visibility = "hidden";
	} else {
		console.log("hideElement()-Call pID='"+pID+"' was undefined");
	}
};

function showElement(pID) {
    show(pID,"inline");
};

function showNode(pNode,pDisplay) {
	var vDisplay = pDisplay || "inline";
	if (pNode) {
		pNode.style.display = vDisplay;
		//pNode.style.display = "inline"; // "block"
		pNode.style.visibility = "visible";
  } else {
		alert("showNode()-Call pID='"+pID+"' was undefined");
	};
};

function show(pID) {
	var vNode = document.getElementById(pID);
  if (vNode) {
    $( "#"+pID ).show();
  } else {
    console.log("show('"+pID+"')-Call DOM-Node for ID undefined");
  }
};
