const twitchNames = [];

// get twitchNames: twitchNames from storage
chrome.storage.sync.get("twitchNames", ({ twitchNames }) => {
	twitchNames.forEach((twitchName) => {
		console.log(twitchName);
		let twitchNameButton = document.createElement("button");
		twitchNameButton.innerText = twitchName;
		twitchNameButton.addEventListener("click", () => {
			chrome.tabs.create({ url: `https://www.twitch.tv/${twitchName}` });
		});
		document.body.appendChild(twitchNameButton);
	});
});
