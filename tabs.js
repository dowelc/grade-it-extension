var allLinks;

function loadTabsScript() {
	console.log("loading tabs");
	allLinks = getLinks();
	makeTabs();
}

function getLinks() {
	var allLinks = [];
	var frame = document.querySelector("#annotateframe");
	var frameBody = frame.contentDocument || frame.contentWindow.document;
	var links = frameBody.querySelector("#nextlink");
	var secondLink = links.children[0].getAttribute("href");
	var template = secondLink.substr(0, secondLink.indexOf("filename"));

	var currentFileName = frameBody.querySelectorAll("h1")[1].children[0].text.trim();

	if (links.children.length > 1) {
		var moreLinks = links.children[1].children;
		for (var i = 0; i < moreLinks.length; i++) {
			allLinks.push(moreLinks[i].children[0].getAttribute("href"));
		}
	} else {
		allLinks.push(template + "filename=" + currentFileName + "&small=1");
		allLinks.push(links.children[0].getAttribute("href"));		
	}

	return allLinks;
}

function makeTabs() {
	var allTabs = document.createElement("ul");
	allTabs.style.listStyle = "none";
	allTabs.style.textAlign = "left";
	// allTabs.style.borderBottom = "solid black 1px";
	allTabs.style.padding = "0 0 2px 0";
	allTabs.style.position = "fixed";
	allTabs.style.margin = "0";
	allTabs.style.zIndex = "100";
	for (var i = 0; i < allLinks.length; i++) {
		var tab = document.createElement("li");
		tab.classList.add("tab");
		tab.style.display = "inline";
		tab.style.border = "2px solid lightgray";
		tab.style.borderRadius = "5px";
		tab.style.backgroundColor = "lightgray";
		tab.style.margin = "2px";
		tab.onclick = makeTabs;

		var tabLink = document.createElement("a");
		tabLink.style.padding = "0 2vmax";

		tabLink.setAttribute("href", allLinks[i]);
		var start = allLinks[i].indexOf("filename=") + 9;
		var end = allLinks[i].indexOf("&small");
		var fileName = allLinks[i].substring(start, end);
		tabLink.innerHTML = fileName;

		tab.appendChild(tabLink);
		allTabs.appendChild(tab);
	}
	var frame = document.querySelector("#annotateframe");
	var frameBody = frame.contentDocument || frame.contentWindow.document;

	frameBody.querySelector(".annotationtable").style.margin = "3vmax 0 0 0";

	var nextLink = frameBody.querySelector("#nextlink");
	var previousLink = frameBody.querySelector("#previouslink");
	if (nextLink) {			
		nextLink.parentNode.removeChild(nextLink);
	}
	if (previousLink) {
		previousLink.parentNode.removeChild(previousLink);
	}
	var tabSection = frameBody.querySelectorAll("h1")[0];
	tabSection.innerHTML = "";
	tabSection.appendChild(allTabs);
	tabSection.style.fontSize = "12pt";		
}