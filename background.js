var twitchChannelNames = [];

// get all twitch tabs
async function getTwitchTabs() {
	let queryOptions = { url: "*://*.twitch.tv/*" };
	let tabs = await chrome.tabs.query(queryOptions);
	return tabs;
}

// get unique twitch names from twitch tabs url
async function getTwitchChannelNames(tabs) {
	let twitchNames = [];
	for (let tab of tabs) {
		let url = new URL(tab.url);
		let twitchName = url.pathname.split("/")[1];
		if (twitchNames.indexOf(twitchName) === -1) {
			twitchNames.push(twitchName);
		}
	}
	return twitchNames;
}

// get current twitch names from twitch tabs url
async function getCurrentTwitchNames() {
	let tabs = await getTwitchTabs();
	let twitchNames = await getTwitchChannelNames(tabs);
	return twitchNames;
}

// get twitch name from twitch tab url
function getTwitchName(url) {
	let twitchName = url.pathname.split("/")[1];
	return twitchName;
}

// get twitch name from twitch tab url
function getTwitchName(url) {
	let twitchName = url.pathname.split("/")[1];
	return twitchName;
}

function isTwitchTab(url) {
	if (url.hostname === "www.twitch.tv" && url.pathname.split("/")[1] !== "directory") {
		return true;
	}
	return false;
}

// on tab creation get twitch name and add to twitchChannelNames if it is unique
// chrome.tabs.onCreated.addListener(async (tab) => {
// 	if (isTwitchTab(new URL(tab.pendingUrl))) {
// 		let twitchName = getTwitchName(new URL(tab.pendingUrl));
// 		if (!twitchChannelNames.includes(twitchName)) {
// 			twitchChannelNames.push(twitchName);
// 		}
// 		console.log("created", twitchChannelNames);
// 	}
// });

// on tab removal get twitch name and remove from twitchChannelNames if it is in twitchChannelNames
// TODO: remove unrelated urls from getting into twitchChannelNames
chrome.tabs.onRemoved.addListener(async (tabId) => {
	let tabs = await getTwitchTabs();
	let twitchNames = await getTwitchChannelNames(tabs);
	twitchChannelNames = twitchNames;
	console.log("removed", twitchChannelNames);
});

// onUpdate completed get twitch names and add to twitchChannelNames if it is unique
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		if (isTwitchTab(new URL(tab.url))) {
			let twitchName = getTwitchName(new URL(tab.url));
			if (!twitchChannelNames.includes(twitchName)) {
				twitchChannelNames.push(twitchName);
			}
			console.log("updated", twitchChannelNames);
		}
	}
});
