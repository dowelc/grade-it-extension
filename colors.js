var NUM_COLORS = 7;
var colors = ["#A0C000", "#80C0C0", "#C0C0C0", "#E08000", "#CC6699", "#B18DC9", "#D8B534"];

window.onload = () => {
	loadColors();
	// document.querySelector("#color").onclick = openColorMenu;
	// document.querySelector(".back").onclick = goBack;
};

function loadColors() {
	chrome.storage.sync.get('colors', (item) => { 
		if (item == null) {
			saveColors();
		} else {
			colors = item['colors'];
			addColorOptions();
			saveColors();		
		}
	});
}

function openColorMenu() {
	document.querySelector("#options").style.display = "none";
	document.querySelector("#color_menu").style.display = "block";
}

function addColorOptions() {
	var colorMenu = document.querySelector("#color_menu table");
	// colorMenu.style.display = "none";
	var tr = document.createElement("tr");
	for (var i = 0; i < NUM_COLORS; i++) {
		var optionItem = document.createElement("td");
		optionItem.innerHTML = i + 1 + ": ";
		optionItem.classList.add("color");
		
		var option = document.createElement("input");
		option.setAttribute("type", "color");
		option.value = colors[i];
		option.onchange = saveColors;

		var optionValue = document.createElement("input");
		optionValue.setAttribute("type", "text");
		optionValue.value = colors[i];
		optionValue.onchange = saveColors;

		optionItem.appendChild(option);
		optionItem.appendChild(optionValue);
		tr.append(optionItem);
		if (i % 4 == 3 || i == NUM_COLORS - 1) {
			console.log("new tr");
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

function saveColors() {
	var allColors = document.querySelectorAll(".color");
	for (var i = 0; i < NUM_COLORS; i++) {
		if (this.getAttribute("type") == "text") {
			colors[i] = allColors[i].children[1].value;
			allColors[i].children[0].value = allColors[i].children[1].value;
		} else {
			colors[i] = allColors[i].children[0].value;
			allColors[i].children[1].value = allColors[i].children[0].value;
		}
	}
	chrome.storage.sync.set({'colors': colors}, () => { console.log("colors saved"); }); 
}