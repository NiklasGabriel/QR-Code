// Message empfangen
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message -> " + "title: " + message.title + ", " + "message: " + message.message);
    // Antworten
    if (message.title == "getURL") {
        sendResponse({ title: "activeURL", answer: window.location.href });
    } else {
        sendResponse({ title: "title", answer: "answer" });
    }
});

// Message senden
function sendMsg(tit, msg) {
    browser.runtime.sendMessage({ title: tit, message: msg }).then((answer) => {
        console.log("answer -> " + "title: " + answer.title + ", " + "answer: ", answer.answer);
    });
}
