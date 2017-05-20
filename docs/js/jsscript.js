function scriptPath(pLib) {
  // obtain plugin path from the script element pLib='menu.js'
  // scriptname pLib='menu.js' is sliced at the end of string vLength=7
  var path;
    var vLength = pLib.length;
		if (document.currentScript) {
      //path = document.currentScript.src.slice(0, -7);
      path = document.currentScript.src.slice(0, -vLength);
		} else {
      //var sel = document.querySelector('script[src$="/menu.js"]')
      var sel = document.querySelector('script[src$="/'+pLib+'"]');
			if (sel) {
				//path = sel.src.slice(0, -7);
        path = sel.src.slice(0, -vLength);
      }
		}
		return path;
}

function scriptFile() {
    return document.currentScript.src;
}
