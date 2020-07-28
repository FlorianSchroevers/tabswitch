var direction = 1;

browser.commands.onCommand.addListener(function(command) {
	if (command == "next-tab") {
		// move to index + 1
		direction = 1;
	} else if (command == "previous-tab") {
		// move to index - 1
		direction = -1;
	}

	// find the active window
	browser.windows.getCurrent({populate: true}).then((windowInfo) => {
		// find the active tab in the active window
		browser.tabs.query(
			{active: true, windowId: windowInfo.id}
		).then((activeTab) => {
			// find index of current active window
			i = activeTab[0].index;

			// case where the active tab is the last tab and
			// the directions is to the right (creates a new tab)
			if (i - direction >= windowInfo.tabs.length) {
				var creating = browser.tabs.create({});
				creating.then(onNewTabCreated, onError);

			// switch the active tab
			} else if (i - direction >= 0) {
				var otherTab = windowInfo.tabs[i - direction]
				browser.tabs.update(otherTab.id, {active: true});
			}
		});
	});	
})


function onError(msg) {
	console.log(msg);
}

function onNewTabCreated(tab) {
	void(0);
}