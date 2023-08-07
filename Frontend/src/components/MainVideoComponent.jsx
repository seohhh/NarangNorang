import React, { useEffect, useRef, useState } from "react";
import userpose from "../utils/userpose";
import "./UserVideo.css";

import * as tf from "@tensorflow/tfjs-core";

const MainVideoComponent = (props) => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const video = videoRef.current;
  const canvas = canvasRef.current;

  const [showCanvas, setShowCanvas] = useState(false);

  let detector;
  let ctx;

  const getNicknameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  const handleSkeletonClick = async () => {
    setShowCanvas(!showCanvas);

    if (showCanvas) {
      if (detector) {
        canvas.width = video.width;
        canvas.height = video.height;

        ctx = canvas.getContext("2d");
        // 거울
        // ctx.translate(canvas.width, 0);
        // ctx.scale(-1, 1);

        userpose.startRender(video, ctx);
      } else {
        console.log("Detector not ready yet.");
        detector = await userpose.loadDetector();
      }
    } else {
      userpose.stopRender();
    }
  };

  const handleDetectClick = async () => {
    if (detector) {
      const poses = await userpose.detectPose(video);
      console.log(poses);
    } else {
      console.log("Detector not ready yet.");
      detector = await userpose.loadDetector();
    }
  };

  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }

    const main = async () => {
      // eslint-disable-next-line
      detector = await userpose.loadDetector();
      console.log(await userpose.detectPose(video));
    };
    tf.setBackend("webgpu").then(() => {
      main();
    });
  });

  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <canvas ref={canvasRef}></canvas>
          <video autoPlay={true} ref={videoRef} width="640" height="480" />
          <div>
            <p>{getNicknameTag()}</p>
          </div>
          <div>
            <button onClick={handleSkeletonClick}>showSkeleton</button>
            <button onClick={handleDetectClick}>detectPose</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainVideoComponent;
