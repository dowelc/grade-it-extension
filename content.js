var colors = ["#A0C000", "#80C0C0", "#C0C0C0", "#E08000", "#CC6699", "#B18DC9", "#D8B534"];
var prevColor;
var NUM_COLORS = 7;

window.onload = function() {
	console.log("loading user colors");
	loadColors();
	updateColors();
	updateSelectedColor();
	setInterval(waitForNewColors, 5000);

	// load "tabs.js"
	loadTabsScript();

	var frame = document.querySelector("#annotateframe");
	frame.onload = annotateFrameLoad;
};

// stuff that should happen when annotateframe resets (from any file,
// can only set one onload)
function annotateFrameLoad() {
	makeTabs();
	updateColors();
}

function updateSelectedColor() {
	var frame = document.querySelector("#annotateframe");
	var frameBody = frame.contentDocument || frame.contentWindow.document;
	var colorPicker = frameBody.querySelector("#highlightpalette");
	prevColor = colorPicker.style.backgroundColor;
}

function updateColors() {
	var frame = document.querySelector("#annotateframe");
	var frameBody = frame.contentDocument || frame.contentWindow.document;
	var inputs = frameBody.querySelectorAll("#highlightcolors label");
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].style.backgroundColor = colors[i];
	}
}

function waitForNewColors() {
	var frame = document.querySelector("#annotateframe");
	var frameBody = frame.contentDocument || frame.contentWindow.document;
	var colorPicker = frameBody.querySelector("#highlightpalette");
	if (colorPicker.style.backgroundColor != prevColor) {
		prevColor = colorPicker.style.backgroundColor;
		debugger;
		colors.shift();
		colors.push(prevColor);
		updateColors();
	}
}

// loads saved color settings
function loadColors() {
	chrome.storage.sync.get('colors', (item) => {
		colors = item['colors'];
		updateColors();
	});
}