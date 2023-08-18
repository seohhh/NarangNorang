// import libraries
import * as poseDetection from "@tensorflow-models/pose-detection";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

// CONSTANT
const POINTS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const CONNECTION = [
  [5, 6],
  [5, 7],
  [5, 11],
  [6, 8],
  [6, 12],
  [7, 9],
  [8, 10],
  [11, 12],
  [11, 13],
  [12, 14],
  [13, 15],
  [14, 16],
];
const WEIGHT = [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 2];
const estimationConfig = {
  // flipHorizontal: false, // 좌우 반전

  maxPoses: 3,
  flipHorizontal: false,
  scoreThreshold: 0.5,
  nmsRadius: 100,
};
const scoreThreshold = 0.5;
const similarityThreshold = 0.8;

// VARIABLE
let detector;
let video, ctx;

let rafId, raf;

const loadDetector = async () => {
  const model = poseDetection.SupportedModels.PoseNet;
  const detectorConfig = {
    // smaller, faster, less accurate
    //   architecture: "MobileNetV1",
    //   outputStride: 16,
    //   inputResolution: { width: 640, height: 480 },
    //   multiplier: 0.75,

    // larger, slower, more accurate
    architecture: "ResNet50",
    outputStride: 16,
    inputResolution: { width: 257, height: 200 },
    quantBytes: 4,
  };
  detector = await poseDetection.createDetector(model, detectorConfig);
  return detector;
};

const detectPose = async (video) => {
  let poses = null;
  if (detector) {
    poses = await detector.estimatePoses(video, estimationConfig);
  }

  return poses;
};

const startRender = async (videoref, context) => {
  video = videoref;
  ctx = context;
  raf = true;
  renderPose();
};

// const clearSkeleton = (ctx, videoWidth, videoHeight) => {
//   ctx.clearRect(0, 0, videoWidth, videoHeight);
// };

const stopRender = () => {
  raf = false;
  cancelAnimationFrame(rafId);
  if (ctx && video) {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, video.width, video.height); // 스켈레톤 지우기
    canvas.width = 0;
  }
};

const renderPose = async () => {
  if (!raf) {
    return;
  }

  await renderResult();

  rafId = requestAnimationFrame(renderPose);
};

const renderResult = async () => {
  let poses = null;
  let color = "White";

  if (video === null) {
    return;
  }

  if (detector != null) {
    poses = await detector.estimatePoses(video, estimationConfig);
  }

  ctx.clearRect(0, 0, video.width, video.height);

  for (var i = 0; i < poses.length; i++) {
    const pose = poses[i];
    if (pose.score >= estimationConfig.scoreThreshold) {
      drawPose(ctx, pose, color);
    }
  }

  // ctx.clearRect(0, 0, video.width, video.height);
};

const drawPose = (ctx, pose, color) => {
  if (pose.keypoints != null) {
    drawKeypoints(ctx, pose.keypoints, color);
    drawSkeleton(ctx, pose.keypoints, pose.id, color);
  }
};

const drawKeypoints = (ctx, keypoints, color) => {
  ctx.fillStyle = "White";
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;

  for (const i of POINTS) {
    const keypoint = keypoints[i];
    const score = keypoint.score != null ? keypoint.score : 1;

    if (score >= scoreThreshold) {
      const circle = new Path2D();
      // x, y, 반지름, ?, ?
      circle.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
      ctx.fill(circle);
      ctx.stroke(circle);
    }
  }
};

const drawSkeleton = (ctx, keypoints, poseId, color) => {
  // const color = "White";
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 7;

  CONNECTION.forEach(([i, j]) => {
    const kp1 = keypoints[i];
    const kp2 = keypoints[j];

    const score1 = kp1.score != null ? kp1.score : 1;
    const score2 = kp2.score != null ? kp2.score : 1;

    if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
      ctx.beginPath();
      ctx.moveTo(kp1.x, kp1.y);
      ctx.lineTo(kp2.x, kp2.y);
      ctx.stroke();
    }
  });
};

const getScore = async (gameRef, webcamRef) => {
  const gpose = await detectPose(gameRef);
  const wpose = await detectPose(webcamRef);

  if (gpose.length === 0) {
    return 0;
  }

  let total = 0;
  let count = 0;
  for (const pose of wpose) {
    if (pose.score >= scoreThreshold) {
      count++;
      let score = computeScore(gpose[0].keypoints, pose.keypoints);
      total += score > similarityThreshold ? score : 0.5;
    }
  }

  if (count === 0) {
    return 0;
  } else {
    return total / count;
  }
};

const computeScore = (keypoints1, keypoints2) => {
  const normPoints1 = normVector(keypoints1);
  const normPoints2 = normVector(keypoints2);

  let scoreSum = 0;
  let similarity = 0;
  for (var i = 0; i < normPoints2.length; i++) {
    scoreSum += normPoints2[i].score;

    similarity +=
      normPoints2[i].score *
      (normPoints1[i].x * normPoints2[i].x +
        normPoints1[i].y * normPoints2[i].y);
  }

  if (scoreSum === 0) {
    return 0;
  }
  return similarity / scoreSum;
};

const normVector = (keypoints) => {
  let normPoints = [];

  for (var i = 0; i < CONNECTION.length; i++) {
    const mod = Math.sqrt(
      Math.pow(
        keypoints[CONNECTION[i][0]].x - keypoints[CONNECTION[i][1]].x,
        2
      ) +
        Math.pow(
          keypoints[CONNECTION[i][0]].y - keypoints[CONNECTION[i][1]].y,
          2
        )
    );
    normPoints.push({
      x: (keypoints[CONNECTION[i][0]].x - keypoints[CONNECTION[i][1]].x) / mod,
      y: (keypoints[CONNECTION[i][0]].y - keypoints[CONNECTION[i][1]].y) / mod,
      score:
        keypoints[CONNECTION[i][0]].score *
        keypoints[CONNECTION[i][1]].score *
        WEIGHT[i],
    });
  }

  return normPoints;
};
const exportObj = {
  loadDetector,
  detectPose,
  startRender,
  stopRender,
  getScore,
};
export default exportObj;
