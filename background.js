// This lets content scripts access extension resources
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === "getIconUrl") {
      sendResponse({iconUrl: chrome.runtime.getURL('icon.png')});
    }
  }
);