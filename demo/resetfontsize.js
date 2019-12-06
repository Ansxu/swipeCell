function setFontSize() {
	var html = document.documentElement;
	html.style.fontSize = html.clientWidth / 375 * 100 + 'px';
}
setFontSize();
window.onresize = function() {
	setFontSize();
}