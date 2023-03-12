// Message empfangen
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message -> " + "title: " + message.title + ", " + "message: " + message.message);
    // Antworten
    sendResponse({ title: "title", answer: "answer" });
});

// Message senden
function sendMsg(tit, msg) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        console.log("activeTab" + activeTab.id + " " + activeTab.title);
        browser.tabs.sendMessage(activeTab.id, { title: tit, message: msg }, function (answer) {
            console.log("answer -> " + "title: " + answer.title + ", " + "answer: ", answer.answer);
        });
    });
}

//Active Tab
browser.tabs.onActivated.addListener(function (tab) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        console.log("activeTab: " + activeTab.id + " " + activeTab.title);
        /*
        browser.tabs.sendMessage(activeTab.id, { title: "activeTab", message: activeTab.id + " " + activeTab.title}, function (answer) {
            console.log("answer -> " + "title: " + answer.title + "answer: ", answer.answer);
        });
        */
    });
});
