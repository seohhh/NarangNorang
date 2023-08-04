import React, { useEffect, createRef } from "react";
import "./UserVideo.css";

// import libraries
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

const MainVideoComponent = (props) => {
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
  const COLORS = ["White", "Gray", "Blue", "Red"];
  const videoRef = createRef();
  const canvasRef = createRef();

  const estimationConfig = {
    // maxPoses: 4,
    // flipHorizontal: false, // 좌우 반전

    maxPoses: 4,
    flipHorizontal: false,
    scoreThreshold: 0.5,
    nmsRadius: 100,
  };
  const scoreThreshold = 0.5;

  let showSkeleton = false;
  let rafId;

  let detector;
  let video, videoWidth, videoHeight;
  let canvas, ctx;

  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  const handleSkeletonClick = async () => {
    showSkeleton = !showSkeleton;

    console.log("skeleton click", showSkeleton);

    if (showSkeleton) {
      if (detector) {
        await detectPose();
      } else {
        console.log("Detector not ready yet.");
        detector = await loadDetector();
      }
    } else {
      cancelAnimationFrame(rafId);
    }
  };

  const handleDetectClick = async () => {
    if (detector) {
      await detectPose();
    } else {
      console.log("Detector not ready yet.");
      detector = await loadDetector();
    }
  };

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
    return await poseDetection.createDetector(model, detectorConfig);
  };

  const detectPose = async () => {
    let poses = null;
    if (detector) {
      poses = await detector.estimatePoses(video, estimationConfig);
    }

    if (showSkeleton) {
      videoWidth = video.width;
      videoHeight = video.height;

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      ctx = canvas.getContext("2d");
      ctx.translate(videoWidth, 0);
      ctx.scale(-1, 1);

      renderPose();
    }

    console.log(poses);
  };

  const renderPose = async () => {
    await renderResult();

    rafId = requestAnimationFrame(renderPose);
  };

  const renderResult = async () => {
    let poses = null;

    if (detector != null) {
      poses = await detector.estimatePoses(video, estimationConfig);
    }

    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    for (var i = 0; i < poses.length; i++) {
      const pose = poses[i];
      if (pose.score >= estimationConfig.scoreThreshold) {
        drawPose(pose, COLORS[i % COLORS.length]);
      }
    }
  };

  const drawPose = (pose, color) => {
    if (pose.keypoints != null) {
      drawKeypoints(pose.keypoints, color);
      drawSkeleton(pose.keypoints, pose.id, color);
    }
  };

  const drawKeypoints = (keypoints, color) => {
    ctx.fillStyle = "Black";
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

  const drawSkeleton = (keypoints, poseId, color) => {
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

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }

    video = videoRef.current;
    canvas = canvasRef.current;

    const main = async () => {
      detector = await loadDetector();
    };
    // main();
    tf.setBackend("webgpu").then(() => main());
  }, []);

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <div>
            <button onClick={handleSkeletonClick}>showSkeleton</button>
            <button onClick={handleDetectClick}>detectPose</button>
          </div>
          <canvas ref={canvasRef}></canvas>
          <video autoPlay={true} ref={videoRef} width="640" height="480" />
          <div>
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainVideoComponent;
