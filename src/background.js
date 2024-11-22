import browser from "webextension-polyfill";

console.log("hi");

browser.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === "install") {
        alert("Hello");
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { action: "iconClicked" });
});

