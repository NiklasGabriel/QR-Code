//
//  AppDelegate.swift
//  QR Code
//
//  Created by Niklas Gabriel on 09.03.23.
//

// Message empfangen
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message -> " + "title: " + message.title + ", " + "message: " + message.message);
    // Antworten
    if (message.title == "XXX") {
        sendResponse({ title: "title", answer: "answer" });
    } else {
        sendResponse({ title: "title", answer: "answer" });
    }
});

// Message senden
function sendMsg(tit, msg) {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        console.log("activeTab: " + activeTab.id + " " + activeTab.title);
        browser.tabs.sendMessage(activeTab.id, { title: tit, message: msg }, function (answer) {
            console.log("answer -> " + "title: " + answer.title + ", " + "answer: ", answer.answer);
            if (answer.title == "activeURL") {
                // URL aufbereiten
                const activeTabURL = answer.answer;
                const encodedTabURL = encodeURIComponent(activeTabURL);
                // IMG anpassen
                var qrcode = document.getElementById("qrcode");
                qrcode.src = "https://qrcode.tec-it.com/API/QRCode?data=" + encodedTabURL + "&istransparent=true";
            }
        });
    });
}

// Menu
var menuState = "m1";
function changeMenu(id) {
    if (id == "m1") {
        changeMenuActive(id);
        changeMenuNormal("m2");
        changeMenuNormal("m3");
        changeMenuNormal("m4");
        sendMsg("getURL", "none");
    } else if (id == "m2") {
        changeMenuNormal("m1");
        changeMenuActive(id);
        changeMenuNormal("m3");
        changeMenuNormal("m4");
        updateM2();
    } else if (id == "m3") {
        changeMenuNormal("m1");
        changeMenuNormal("m2");
        changeMenuActive(id);
        changeMenuNormal("m4");
        updateM3();
    } else if (id == "m4") {
        changeMenuNormal("m1");
        changeMenuNormal("m2");
        changeMenuNormal("m3");
        changeMenuActive(id);
        updateM4();
    } else {
        changeMenuNormal("m1");
        changeMenuNormal("m2");
        changeMenuNormal("m3");
        changeMenuNormal("m4");
    }
}
function changeMenuNormal(id) {
    var m = document.getElementById(id);
    m.style.setProperty('--' + id + '-color', 'black');
    var a = document.getElementById("a_" + id);
    a.style.display = "none";
}
function changeMenuActive(id) {
    var m = document.getElementById(id);
    m.style.setProperty('--' + id + '-color', '#00606d');
    var a = document.getElementById("a_" + id);
    a.style.display = "block";
    window.menuState = id;
}

document.getElementById("m1").addEventListener("click", () => { changeMenu("m1") });
document.getElementById("m2").addEventListener("click", () => { changeMenu("m2") });
document.getElementById("m3").addEventListener("click", () => { changeMenu("m3") });
document.getElementById("m4").addEventListener("click", () => { changeMenu("m4") });

// Key
/*
document.addEventListener("keyup", function(event){
    alert(event.keyCode);
});*/
window.onkeyup = function(event) {
    let key = event.key.toUpperCase();
    if ( key == 'ENTER' ) {
        if (window.menuState == "m2") {
            updateM2();
        } else if (window.menuState == "m3") {
            updateM3();
        } else if (window.menuState == "m4") {
            updateM4();
        }
    }
}

// QR Code
function updateQR(value) {
    // URL aufbereiten
    const encodedValue = encodeURIComponent(value);
    // IMG anpassen
    var qrcode = document.getElementById("qrcode");
    qrcode.src = "https://qrcode.tec-it.com/API/QRCode?data=" + encodedValue + "&istransparent=true";
}

// M1
sendMsg("getURL", "none");

// M2
document.getElementById("a_m2_btn").addEventListener("click", updateM2);
function updateM2() {
    var value = document.querySelector("#a_m2_in").value;
    if (value != "") {
        if (value.includes("http")) {
            updateQR(value);
        } else {
            updateQR("http://" + value);
        }
    }
}

// M3
document.getElementById("a_m3_btn").addEventListener("click", updateM3);
function updateM3() {
    var value = document.querySelector("#a_m3_in").value;
    if (value != "") {
        updateQR(value);
    }
}

// M4
document.getElementById("a_m4_btn").addEventListener("click", updateM4);
function updateM4() {
    var ssid = document.querySelector("#a_m4_ssid").value;
    var pw = document.querySelector("#a_m4_pw").value;
    var trans = "WPA";
    if (ssid != "" && pw != "") {
        var value = "WIFI:S:" + ssid + ";T:" + trans + ";P:" + pw + ";;";
        updateQR(value);
    }
}
