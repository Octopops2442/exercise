let mediaDevices = navigator.mediaDevices;
let video = document.getElementById("vid");

mediaDevices
  .getUserMedia({
    video: true,
  })
  .then((stream) => {
    // Changing the source of video to current stream
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  })
  .catch(alert);
