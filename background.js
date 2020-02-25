var direction = 1;

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
	tabQuery.then(findOtherTab, onError);
})

function findOtherTab(currentTabs) {
	// find all other tabs
	let otherTab = browser.tabs.query({index: currentTabs[0].index + direction});
	otherTab.then(switchTab, onError);
}

function switchTab(otherTab) {
	browser.tabs.update(otherTab.id, {active: true});
}

function onError(msg) {
	console.log(msg);
}