var numColors = 7;
var colors = ["#A0C000", "#80C0C0", "#C0C0C0", "#E08000", "#CC6699", "#B18DC9", "#D8B534"];

window.onload = () => {
	checkLoaded();
	document.querySelector("button").onclick = setNumColors;
	document.querySelector("#numColors").onchange = setNumColors;
	// document.querySelector("#color").onclick = openColorMenu;
	// document.querySelector(".back").onclick = goBack;
};

function setNumColors() {
	numColors = document.querySelector("#numColors").value;
	for (var i = 0; i < numColors; i++) {
		if (i >= colors.length) {
			colors[i] = "#000000";
		}
	}
	addColorOptions();
	saveColors();
}

function checkLoaded() {
	chrome.storage.sync.get('colors', (item) => { 
		if (!item['colors']) {
			chrome.storage.sync.set({'colors': colors}, () => { loadColors(); }); 
		} else {
			loadColors();
			// chrome.storage.sync.set({'colors': colors}, () => { loadColors(); }); 
		}
	});
}

function loadColors() {
	chrome.storage.sync.get('colors', (item) => { 
		colors = item['colors'];
		chrome.storage.sync.get('numColors', (item) => {
			numColors = item['numColors'];
			document.querySelector("#numColors").value = numColors;
			addColorOptions();
			saveColors();			
		});
	});
}

function openColorMenu() {
	document.querySelector("#options").style.display = "none";
	document.querySelector("#color_menu").style.display = "block";
}

function addColorOptions() {
	var colorMenu = document.querySelector("#color_menu table");
	colorMenu.innerHTML = "";
	// colorMenu.style.display = "none";
	var tr = document.createElement("tr");
	for (var i = 0; i < numColors; i++) {
		var optionItem = document.createElement("td");
		optionItem.innerHTML = i + 1 + ": ";
		optionItem.classList.add("color");
		optionItem.colorIndex = i;
		
		var option = document.createElement("input");
		option.setAttribute("type", "color");
		option.value = colors[i];
		option.onchange = saveSelection;

		var optionValue = document.createElement("input");
		optionValue.setAttribute("type", "text");
		optionValue.value = colors[i];
		optionValue.onchange = saveSelection;
		optionValue.style.width = "75%";

		optionItem.appendChild(option);
		optionItem.appendChild(document.createElement("br"));
		optionItem.appendChild(optionValue);
		tr.append(optionItem);
		if (i % 4 == 3 || i == numColors - 1) {
			colorMenu.appendChild(tr);
			tr = document.createElement("tr");
		}
	}
}

function goBack() {
	var allItems = document.querySelectorAll("body > *");
	for (var i = 0; i < allItems.length; i++) {
		if (allItems[i].id != "options") {
			allItems[i].style.display = "none";
		} else {
			allItems[i].style.display = "block";
		}
	}
}

function saveSelection() {
	var parent = this.parentNode;
	colors[parent.colorIndex] = this.value;
	parent.children[0].value = this.value;
	parent.children[1].value = this.value;
	saveColors();
}

function saveColors() {
	chrome.storage.sync.set({'colors': colors}, () => { 
		console.log("colors saved"); 
	});
	chrome.storage.sync.set({'numColors': numColors}, () => { 
		console.log("numColors saved"); 
	});
}