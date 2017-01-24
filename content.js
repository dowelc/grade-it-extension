window.onload = function() {
	var frame = document.querySelector("#annotateframe");
	var frameBody = frame.contentDocument || frame.contentWindow.document;
	var inputs = frameBody.querySelectorAll("#highlightcolors label");
	var colors = ["A0C000", "80C0C0", "C0C0C0", "E08000", "CC6699", "B18DC9", "D8B534"];
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].style.backgroundColor = "#" + colors[i];
	}
};