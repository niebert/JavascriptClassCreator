
function getDate() {
	var vNow = new Date();
	var vMonth = vNow.getMonth()+1;
	return vNow.getDate()+"."+vMonth+"."+vNow.getFullYear();
}
