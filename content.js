var colors = ["#A0C000", "#80C0C0", "#C0C0C0", "#E08000", "#CC6699", "#B18DC9", "#D8B534"];
var prevColor;
var numColors = 7;

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

	var colorsContainer = frameBody.querySelector("#highlightcolors");
	var colorPicker = colorsContainer.lastElementChild;
	colorsContainer.removeChild(colorPicker);
	var space = colorsContainer.lastChild;
	colorsContainer.removeChild(space);

	var inputs = frameBody.querySelectorAll("#highlightcolors label");
	var newColorCount = 0;
	for (var i = 0; i < numColors; i++) {
		if (i < inputs.length) {
			inputs[i].style.backgroundColor = colors[i];
			inputs[i].title = "";
		} else {
			var clonedButton = inputs[0].cloneNode(true);
			clonedButton.style.backgroundColor = colors[i];
			colorsContainer.appendChild(clonedButton);
			newColorCount++;
			if (newColorCount % 4 == 1) {
				colorsContainer.appendChild(frameBody.createElement("br"));
			}
		}
	}
	inputs[0].children[0].checked = true;

	colorsContainer.appendChild(space);
	colorsContainer.appendChild(colorPicker);

	// simulate click so correct color is used initially
	frameBody.querySelector("#highlight").click();
	inputs[0].click();
	frameBody.querySelector("#select").click();
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
		chrome.storage.sync.get('numColors', (item) => {
			numColors = item['numColors'];
			updateColors();			
		});
	});
}