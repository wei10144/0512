let facemesh;
let video;
let predictions = [];
const pointsToDraw = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
  76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184
];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 初始化 facemesh 模型
  facemesh = ml5.facemesh(video, modelReady);

  // 當模型偵測到臉部時，更新 predictions
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // 繪製指定的點
  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i++) {
    const keypoints = predictions[i].scaledMesh;

    for (let j = 0; j < pointsToDraw.length; j++) {
      const index = pointsToDraw[j];
      const [x, y] = keypoints[index];
      fill(255, 0, 0);
      noStroke();
      ellipse(x, y, 5, 5); // 繪製紅色的點
    }
  }
}
