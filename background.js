var direction = 1;
var currentIndex = -1;

browser.commands.onCommand.addListener(function(command) {
	if (command == "next-tab") {
		// move to index + 1
		direction = 1;
	} else if (command == "previous-tab") {
		// move to index - 1
		direction = -1;
	}

	// find tab that is currently open
	var tabQuery = browser.tabs.query({currentWindow: true, active: true});
	tabQuery.then(findOtherTabs, onError);
})

function findOtherTabs(tabs) {
	currentIndex = tabs[0].index;
	// find all other tabs
	let otherTabs = browser.tabs.query({currentWindow: true});
	otherTabs.then(switchTab, onError);
}

function switchTab(otherTabs) {
	// search for the tab that is 1 in the right direction of
	// the currently open tab. switch to that tab 
	for (let t of otherTabs) {
		if (t.index + direction == currentIndex) {
			browser.tabs.update(t.id, {active: true});
			break;
		}
	}
}

function onError(msg) {
	console.log(msg);
}