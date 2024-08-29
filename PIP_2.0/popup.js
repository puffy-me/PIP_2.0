document.getElementById('pipButton').addEventListener('click', async () => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        console.log('Attempting to inject script into tab:', tab);

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                const video = document.querySelector('video');
                if (video) {
                    video.requestPictureInPicture().catch(error => {
                        console.error('Error entering PiP mode:', error);
                    });
                } else {
                    console.log('No video element found on this page.');
                }
            }
        });

        console.log('Script injection results:', results);

    } catch (error) {
        console.error('Failed to enter PiP mode:', error);
    }
});
