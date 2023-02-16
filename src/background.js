chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: "https://murdle.com", active: true });
});
