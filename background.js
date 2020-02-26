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
	let otherTab = browser.tabs.query({index: currentTabs[0].index - direction});
	otherTab.then(switchTab, onError);
}

function switchTab(otherTabs) {
	console.log(otherTabs.length);
	if (otherTabs.length) {
		browser.tabs.update(otherTabs[0].id, {active: true});
	} else {
		var creating = browser.tabs.create({});
		creating.then(onNewTabCreated, onError);
	}
}

function onError(msg) {
	console.log(msg);
}

function onNewTabCreated(tab) {
	console.log(tab.id);
}