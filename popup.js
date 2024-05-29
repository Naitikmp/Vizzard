document.addEventListener('DOMContentLoaded', function () {
    console.log("Extension function called");
    var speedSlider = document.getElementById('speedSlider');
    var speedValue = document.getElementById('speedValue');

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getPlaybackSpeed' }, function (response) {
            if (response) {
                speedSlider.value = response.speed;
                speedValue.textContent = response.speed + 'x';
            } else {
                speedSlider.value = 1.0; // Default value
                speedValue.textContent = '1.0x';
            }
        });
    });

    speedSlider.addEventListener('input', function () {
        var speed = speedSlider.value;
        speedValue.textContent = speed + 'x';

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'setPlaybackSpeed', speed: speed });
        });
    });
});
