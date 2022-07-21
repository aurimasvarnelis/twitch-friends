// send a message to the backgroud page if url changes
// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
// 	if (changeInfo.url) {
// 		let url = new URL(tab.url);
// 		let twitchName = url.pathname.split("/")[1];
// 		chrome.runtime.sendMessage({ twitchName: twitchName });
// 		console.log(twitchName);
// 	}
// });

// send message with tab twitch name to the background
// chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
// 	if (changeInfo.url) {
// 		let url = new URL(tab.url);
// 		let twitchName = url.pathname.split("/")[1];
// 		chrome.runtime.sendMessage({ twitchName: twitchName });
// 		console.log(twitchName);
// 	}
// });
