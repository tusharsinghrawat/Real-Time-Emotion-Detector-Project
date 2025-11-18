// // Ensure JS runs after DOM is fully loaded
// window.addEventListener('DOMContentLoaded', async () => {
//   const video = document.getElementById('video');
//   const canvas = document.getElementById('overlay');
//   const emotionText = document.getElementById('emotion');

//   // Load models from working CDN
//   const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights/';
//   await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//   await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

//   // Start camera
//   navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => {
//       video.srcObject = stream;
//     })
//     .catch(err => console.error("Camera access error:", err));

//   // Improved emotion sentence function
//   function getEmotionSentence(expressions) {
//     if (!expressions) return 'Mood detect nahi ho paaya 😐';

//     const maxEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
//     const confidence = expressions[maxEmotion];

//     if (confidence < 0.4) return 'Mood thoda unclear hai 🤔';

//     const emotionMessages = {
//       angry: 'Aap thoda gussa mein ho 😠',
//       disgusted: 'Aap disgusted feel kar rahe ho 🤢',
//       fearful: 'Aap thoda dar rahe ho 😨',
//       happy: 'Aap khush lag rahe ho 😄',
//       neutral: 'Aap abhi neutral mood mein ho 😐',
//       sad: 'Aap thoda udaas lag rahe ho 😢',
//       surprised: 'Aap surprise mein lag rahe ho 😲'
//     };

//     return emotionMessages[maxEmotion] || 'Mood detect nahi ho paaya 😐';
//   }

//   // Detect face and emotion
//   video.addEventListener('play', () => {
//     faceapi.matchDimensions(canvas, { width: video.videoWidth, height: video.videoHeight });

//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
//         .withFaceExpressions();

//       const resizedDetections = faceapi.resizeResults(detections, {
//         width: video.videoWidth,
//         height: video.videoHeight
//       });

//       const context = canvas.getContext('2d');
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       faceapi.draw.drawDetections(canvas, resizedDetections);
//       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//       if (detections[0]) {
//         emotionText.innerText = getEmotionSentence(detections[0].expressions);
//       } else {
//         emotionText.innerText = 'Face detect nahi hua 😐';
//       }
//     }, 500);
//   });
// });

// Ensure JS runs after DOM is fully loaded
window.addEventListener('DOMContentLoaded', async () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('overlay');
  const emotionText = document.getElementById('emotion');

  // Load models from working CDN
  const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights/';
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

  // Start camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(err => console.error("Camera access error:", err));

  // Improved emotion sentence function
  function getEmotionSentence(expressions) {
    if (!expressions) return 'Mood detect nahi ho paaya 😐';

    const maxEmotion = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);
    const confidence = expressions[maxEmotion];

    if (confidence < 0.4) return 'Mood thoda unclear hai 🤔';

    const emotionMessages = {
      angry: 'Aap thoda gussa mein ho 😠',
      disgusted: 'Aap disgusted feel kar rahe ho 🤢',
      fearful: 'Aap thoda dar rahe ho 😨',
      happy: 'Aap khush lag rahe ho 😄',
      neutral: 'Aap abhi neutral mood mein ho 😐',
      sad: 'Aap thoda udaas lag rahe ho 😢',
      surprised: 'Aap surprise mein lag rahe ho 😲'
    };

    return emotionMessages[maxEmotion] || 'Mood detect nahi ho paaya 😐';
  }

  // Detect face and emotion
  video.addEventListener('play', () => {
    faceapi.matchDimensions(canvas, { width: video.videoWidth, height: video.videoHeight });

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.4 }))

        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, {
        width: video.videoWidth,
        height: video.videoHeight
      });

      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      if (detections[0]) {
        emotionText.innerText = getEmotionSentence(detections[0].expressions);
      } else {
        emotionText.innerText = 'Face detect nahi hua 😐';
      }
    }, 500);
  });
});