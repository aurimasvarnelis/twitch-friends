// async function getCurrentTab() {
// 	let queryOptions = { active: true, lastFocusedWindow: true };
// 	// `tab` will either be a `tabs.Tab` instance or `undefined`.
// 	let [tab] = await chrome.tabs.query(queryOptions);
// 	return tab;
// }

// chrome.runtime.onInstalled.addListener(async () => {
// 	//console.log("tab url");
// 	console.log(await getCurrentTab());
// 	// if (typeof window !== "undefined") {
// 	// 	console.log("You are on the browser");
// 	// 	// 👉️ can use alert()
// 	// } else {
// 	// 	console.log("You are on the server");
// 	// 	// 👉️ can't use alert()
// 	// }
// });

// get all twitch tabs
async function getTwitchTabs() {
	let queryOptions = { url: "*://*.twitch.tv/*" };
	let tabs = await chrome.tabs.query(queryOptions);
	return tabs;
}

// get twitch names from twitch tabs url
async function getTwitchNames(tabs) {
	let twitchNames = [];
	for (let tab of tabs) {
		let url = new URL(tab.url);
		let twitchName = url.pathname.split("/")[1];
		twitchNames.push(twitchName);
	}
	return twitchNames;
}

// get all twitch tabs and get twitch names from twitch tabs url
chrome.runtime.onInstalled.addListener(async () => {
	let twitchTabs = await getTwitchTabs();
	let twitchNames = await getTwitchNames(twitchTabs);

	chrome.storage.sync.set({ twitchNames: twitchNames }, () => {
		console.log("twitch names saved");
	});

	console.log(twitchNames);
});

// get all twitch tabs and get twitch names from twitch tabs url when tab is updated
chrome.tabs.onUpdated.addListener(
	async (tabId, changeInfo, tab) => {
		if (changeInfo.url) {
			let url = new URL(tab.url);
			let twitchName = url.pathname.split("/")[1];
			chrome.storage.sync.get("twitchNames", ({ twitchNames }) => {
				if (!twitchNames.includes(twitchName)) {
					twitchNames.push(twitchName);
					chrome.storage.sync.set({ twitchNames: twitchNames }, () => {
						console.log("twitch names saved");
					});
				}
				console.log(twitchNames);
			});
		}
	} // end of chrome.tabs.onUpdated.addListener
);

// remove twitch name from twitchNames storage when tab is closed
chrome.tabs.onRemoved.addListener(
	async (tabId, removeInfo) => {
		chrome.storage.sync.get("twitchNames", ({ twitchNames }) => {
			console.log(removeInfo.url);
			let twitchName = removeInfo.url.split("/")[1];
			let twitchNamesNew = twitchNames.filter((name) => name !== twitchName);
			chrome.storage.sync.set({ twitchNames: twitchNamesNew }, () => {
				console.log("twitch names deleted");
			});
			console.log(twitchNamesNew);
		});
	} // end of chrome.tabs.onRemoved.addListener
);
