var twitchTabs = [];

async function getTwitchTabs() {
	let queryOptions = { url: "*://*.twitch.tv/*" };
	let tabs = await chrome.tabs.query(queryOptions);
	return tabs;
}

function getTwitchName(tab) {
	let url = tab.url;
	let twitchName = url.split("/")[3];
	return twitchName;
}

// print twitch channel names of all twitch tabs
async function printTwitchChannelNames() {
	let tabs = await getTwitchTabs();
	for (let tab of tabs) {
		let twitchName = getTwitchName(tab);
		console.log(twitchName);
	}
}

function isTwitchTab(url) {
	if (url.hostname === "www.twitch.tv" && url.pathname.split("/")[1] !== "directory") {
		return true;
	}
	return false;
}

// on tab removal get tab and if it is in twitchTabs remove it
chrome.tabs.onRemoved.addListener(async (tabId) => {
	// find tab by tabId in twitchTabs
	let tab = twitchTabs.find((tab) => tab.id === tabId);
	if (tab) {
		if (isTwitchTab(new URL(tab.url))) {
			if (twitchTabs.includes(tab)) {
				twitchTabs.splice(twitchTabs.indexOf(tab), 1);
			}
			console.log("removed", twitchTabs);
		}
	}
});

// onUpdate completed get twitch tabs and add to twitchTabs
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		if (isTwitchTab(new URL(tab.url))) {
			// check if tab.url is equal to any of the urls in twitchTabs.url
			// if not, add to twitchTabs
			if (!twitchTabs.some((twitchTab) => twitchTab.url === tab.url)) {
				twitchTabs.push(tab);
			}
			console.log("updated", twitchTabs);
		}
	}
});
