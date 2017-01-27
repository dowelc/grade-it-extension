window.onload = () => {
	var allLinks = getLinks();
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

	console.log(allLinks);
	return allLinks;
}