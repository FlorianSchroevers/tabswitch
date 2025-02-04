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
			// find index of current active window change comment
			i = activeTab[0].index;

			// case switching tab would cause overflow
			if (i - direction >= windowInfo.tabs.length || i - direction < 0) {
				// read local settings for overflow behaviour
				let gettingSetting = browser.storage.local.get("overflowBehaviour");

				gettingSetting.then((setting) => {
					if (setting.overflowBehaviour == "loop" && i - direction >= windowInfo.tabs.length) {
						//  Loop (set tab with index 0 to current active tab)
						browser.tabs.update(windowInfo.tabs[0].id, {active: true});
					} else if (setting.overflowBehaviour == "loop" && i - direction < 0) {
						//  Loop (set tab with index of last tab to current active tab)
						browser.tabs.update(windowInfo.tabs[windowInfo.tabs.length - 1].id, {active: true});
					} else if (setting.overflowBehaviour == "newTab" && i - direction >= windowInfo.tabs.length) {
						var creating = browser.tabs.create({});
						creating.then(onNewTabCreated, onError);
					}
				});
			} else {
				// switch the active tab
				var otherTab = windowInfo.tabs[i - direction]
				browser.tabs.update(otherTab.id, {active: true});
			}
		});
	});	
})

browser.browserAction.onClicked.addListener(handleClick);

function onError(msg) {
	console.log(msg);
}

function onNewTabCreated(tab) {
	void(0);
}

function handleClick() {
	browser.runtime.openOptionsPage();
}
