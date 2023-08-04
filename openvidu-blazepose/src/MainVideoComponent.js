import React, { useEffect, createRef } from "react";
import "./UserVideo.css";

// import libraries
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/pose";

const MainVideoComponent = (props) => {
  const POINTS = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
  const CONNECTION = [
    //   [0, 1],
    //   [0, 4],
    //   [1, 2],
    //   [2, 3],
    //   [3, 7],
    //   [4, 5],
    //   [5, 6],
    //   [6, 8],
    //   [9, 10],
    [11, 12],
    [11, 13],
    [11, 23],
    [12, 14],
    [14, 16],
    [12, 24],
    [13, 15],
    // [15, 17],
    // [16, 18],
    // [16, 20],
    // [15, 17],
    // [15, 19],
    // [15, 21],
    // [16, 22],
    // [17, 19],
    // [18, 20],
    [23, 25],
    [23, 24],
    [24, 26],
    [25, 27],
    [26, 28],
    // [27, 29],
    // [28, 30],
    // [27, 31],
    // [28, 32],
    // [29, 31],
    // [30, 32],
  ];

  const videoRef = createRef();
  const canvasRef = createRef();

  const estimationConfig = {
    maxPoses: 4,
  };
  const scoreThreshold = 0.65;

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
    const model = poseDetection.SupportedModels.BlazePose;
    const detectorConfig = {
      runtime: "mediapipe",
      modelType: "full", // lite, full, heavy
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/pose",
    };
    return await poseDetection.createDetector(model, detectorConfig);
  };

  const detectPose = async () => {
    if (detector) {
      await detector.estimatePoses(video, estimationConfig);
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

    console.log(detector.poses);
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

    for (const pose of poses) {
      drawPose(pose);
    }
  };

  const drawPose = (pose) => {
    if (pose.keypoints != null) {
      drawKeypoints(pose.keypoints);
      drawSkeleton(pose.keypoints, pose.id);
    }
  };

  const drawKeypoints = (keypoints) => {
    ctx.fillStyle = "Black";
    ctx.strokeStyle = "White";
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

  const drawSkeleton = (keypoints, poseId) => {
    const color = "White";
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
    main();
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
