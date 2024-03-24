document.addEventListener('DOMContentLoaded', function() {
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.muted = true;
    video.autoplay = true;

    const canvas = document.getElementById('captureCanvas');
    const context = canvas.getContext('2d');
    const textInput = document.getElementById('textInput');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
            video.addEventListener('loadedmetadata', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            });
        })
        .catch(function(error) {
            console.error("Error accessing the webcam: ", error);
        });

    function captureFrame() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    textInput.addEventListener('input', function() {
        captureFrame();
    });

    // Additional event listener for mobile devices
    // Consider touchstart or touchend depending on the desired interaction
    textInput.addEventListener('touchstart', function() {
        captureFrame();
    });
});
