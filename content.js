chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'getPlaybackSpeed') {
        var video = document.querySelector('video');
        if (video) {
            sendResponse({ speed: video.playbackRate });
        } else {
            sendResponse({ speed: 1.0 }); // Default speed if no video is found
        }
    } else if (request.action === 'setPlaybackSpeed') {
        var video = document.querySelector('video');
        if (video) {
            video.playbackRate = request.speed;
        } else {
            console.error("No video element found on the page.");
        }
    }
});
