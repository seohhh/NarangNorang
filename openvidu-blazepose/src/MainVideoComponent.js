import React, { useEffect, createRef, useState } from 'react';
import './UserVideo.css';

// import libraries
import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/pose';
// import { DrawingUtils } from '@mediapipe/tasks-vision';
// import { POSE_CONNECTIONS } from '@mediapipe/pose';

// const POSE_CONNECTION = {
//     0:{start: 0, end: 1}, 1: {start: 1, end: 2}, 2: {start: 2, end: 3}, 3: {start: 3, end: 7}, 4: {start: 0, end: 4},
//     5: {start: 4, end: 5}, 6: {start: 5, end: 6}, 7: {start: 6, end: 8}, 8: {start: 9, end: 10}, 9: {start: 11, end: 12},
//     10: {start: 11, end: 13}, 11: {start: 13, end: 15}, 12: {start: 15, end: 17}, 13: {start: 15, end: 19}, 14: {start: 15, end: 21},
//     15: {start: 17, end: 19}, 16: {start: 12, end: 14}, 17: {start: 14, end: 16}, 18: {start: 16, end: 18}, 19: {start: 16, end: 20},
//     20: {start: 16, end: 22}, 21: {start: 18, end: 20}, 22: {start: 11, end: 23}, 23: {start: 12, end: 24}, 24: {start: 23, end: 24},
//     25: {start: 23, end: 25}, 26: {start: 24, end: 26}, 27: {start: 25, end: 27}, 28: {start: 26, end: 28}, 29: {start: 27, end: 29},
//     30: {start: 28, end: 30}, 31: {start: 29, end: 31}, 32: {start: 30, end: 32}, 33: {start: 27, end: 31}, 34: {start: 28, end: 32},
// }


const MainVideoComponent = (props) => {
    const nicknameTag = JSON.parse(props.streamManager.stream.connection.data).clientData;
    const videoRef = createRef();
    const canvasRef = createRef();

    let detector;
    let video, videoWidth, videoHeight;
    let canvas, ctx;
    // let drawingUtils;
    let rafId, showSkeleton = false;
    let startInferenceTime = 0, numInferences = 0;
    let inferenceTimeSum = 0, lastPanelUpdate = 0;

    const renderResult = async () => {
        let poses = null;
        let canvasInfo = null
    
        if(detector != null) {
            startInferenceTime = (performance || Date).now();

            poses = await detector.estimatePoses(
                video,
                {maxPoses: 4, flipHorizontal: false}
            );

            const endInferenceTime = (performance || Date).now();
            inferenceTimeSum += endInferenceTime - startInferenceTime;
            ++numInferences;
          
            // const panelUpdateMilliseconds = 1000;
            // if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {
            //   const averageInferenceTime = inferenceTimeSum / numInferences;
            //   inferenceTimeSum = 0;
            //   numInferences = 0;
            //   stats.customFpsPanel.update(
            //       1000.0 / averageInferenceTime, 120 /* maxValue */);
            //   lastPanelUpdate = endInferenceTime;
            // }           
        }

        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

        for(const pose of poses) {
            drawPose(pose);
        }
        
    }

    const drawPose = (pose) => {
        if(pose.keypoints != null) {
            drawKeypoints(pose.keypoints);
            drawSkeleton(pose.keypoints, pose.id);
        }
    }

    const drawKeypoints = (keypoints) => {
        ctx.fillStyle = 'Red';
        ctx.strokeStyle = 'White';
        ctx.lineWidth = 2;

        for(const keypoint of keypoints) {
            const score = keypoint.score != null ? keypoint.score : 1;
            const scoreThreshole = 0.65;

            if(score >= scoreThreshole) {
                const circle = new Path2D();
                // x, y, 반지름, ?, ?
                circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
                ctx.fill(circle);
                ctx.stroke(circle);
            }
        }
    }

    const drawSkeleton = (keypoints, poseId) => {
        const color = 'White';
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        poseDetection.util.getAdjacentPairs("BlazePose").forEach(([i, j]) => {
            const kp1 = keypoints[i];
            const kp2 = keypoints[j];

            const score1 = kp1.score != null ? kp1.score : 1;
            const score2 = kp2.score != null ? kp2.score : 1;
            const scoreThreshold = 0.65;

            if(score1 >= scoreThreshold && score2 >= scoreThreshold) {
                ctx.beginPath();
                ctx.moveTo(kp1.x, kp1.y);
                ctx.lineTo(kp2.x, kp2.y);
                ctx.stroke();
            }
        });
    }

    const renderPose = async () => {
        await renderResult();

        rafId = requestAnimationFrame(renderPose);
    };

    const detectPose = async (detector) => {
        video = videoRef.current;

        console.log('video');
        console.log(video);

        const estimationConfig = {enableSmoothing: true};
        // const poses = await detector.estimatePoses(video, estimationConfig);
        // const poses = await detector.estimatePoses(video);

        videoWidth = video.width;
        videoHeight = video.height;

        // console.log(video);
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // console.log('canvas');
        // console.log(canvas);

        // render
        ctx = canvas.getContext('2d');
        // ctx.scale(-1, 1);

        renderPose();




        // drawRec();
        // if(poses[0] !== undefined){
        //     // for (const pose of poses[0].keypoints3D) {
        //         // console.log(pose);
        //         const landmark = poses[0].keypoints3D;
        //         console.log(landmark);
        //         // console.log(POSE_CONNECTION);
        //         // drawingUtils.drawLandmarks(landmark, {
        //         //     radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 1),
        //         //     color: "red",
        //         // });
        //         // drawingUtils.drawConnectors(landmark, POSE_CONNECTIONS, {
        //         //     color: "blue",
        //         //     lineWidth: 3
        //         // });
        //     // }
        // }

        // return poses;
    };


    const handleDetectPoseClick = async () => {
        showSkeleton = !showSkeleton;
        
        if(showSkeleton) {
            // detectPose 함수를 호출하여 실행합니다.
            if (detector) {
                await detectPose(detector);
            } else {
                console.log("Detector not ready yet.");
            }
        } else {
            cancelAnimationFrame(rafId);
        }
    };

    useEffect(() => {
        if (props && videoRef) {
            props.streamManager.addVideoElement(videoRef.current);
        }

        canvas = canvasRef.current;
        // const context = canvas.getContext('2d');
        // drawingUtils = new DrawingUtils(context);

        const loadDetector = async () => {
            const model = poseDetection.SupportedModels.BlazePose;
            const detectorConfig = {
                runtime: 'mediapipe',
                solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
                // solutionPath: 'base/node_modules/@mediapipe/pose'
            };
            return await poseDetection.createDetector(model, detectorConfig);
        };
        
        const main = async () => {
            detector = await loadDetector();

            console.log("detector");
            console.log(detector);

         }
        main();
    }, []);

        return (
            <div>
                {props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <canvas ref={canvasRef}></canvas>
                        <video autoPlay={true} ref={videoRef} width="640" height="480" />
                        <div><p>{nicknameTag}</p></div>
                        <div><button onClick={handleDetectPoseClick}>btn</button></div>
                        {/* <div id="scatter-gl-container" ref={glRef}></div> */}
                    </div>
                ) : null}
            </div>
        );
}

export default MainVideoComponent;