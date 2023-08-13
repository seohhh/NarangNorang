// import libraries
import * as poseDetection from "@tensorflow-models/pose-detection";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";
import POSE from "./POSE";

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
// const COLORS = ["White", "Gray", "Blue", "Red"];
const estimationConfig = {
  // flipHorizontal: false, // 좌우 반전

  maxPoses: 3,
  flipHorizontal: false,
  scoreThreshold: 0.5,
  nmsRadius: 100,
};
const scoreThreshold = 0.5;
const similarityThreshold = 0.9;

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

  // console.log(poses);
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
    const canvas = ctx.canvas
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

const getScore = async (poseIdx, videoref) => {
  const poses = await detectPose(videoref);
  console.log("poses", poses);

  let total = 0;
  let count = 0;
  for (const pose of poses) {
    if (pose.score >= scoreThreshold) {
      count++;
      let score = computeScore(POSE[poseIdx], pose.keypoints);
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

  return similarity / scoreSum;
};

const normVector = (keypoints) => {
  let normPoints = [];

  for (const con of CONNECTION) {
    const mod = Math.sqrt(
      Math.pow(keypoints[con[0]].x - keypoints[con[1]].x, 2) +
        Math.pow(keypoints[con[0]].y - keypoints[con[1]].y, 2)
    );
    normPoints.push({
      x: (keypoints[con[0]].x - keypoints[con[1]].x) / mod,
      y: (keypoints[con[0]].y - keypoints[con[1]].y) / mod,
      score: keypoints[con[0]].score * keypoints[con[1]].score,
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
