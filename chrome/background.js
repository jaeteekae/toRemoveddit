chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'reddit.com' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  if (tab.url.includes("np.")) {
    var regex = /np\.reddit\.com/;
    var newurl = tab.url.replace(regex, 'www.reddit.com');
    chrome.tabs.update(null, {url: newurl});
  } else {
    var regex = /(old|www)\.reddit\.com/;
    var newurl = tab.url.replace(regex, 'www.removeddit.com');
    chrome.tabs.update(null, {url: newurl});
  }
});

