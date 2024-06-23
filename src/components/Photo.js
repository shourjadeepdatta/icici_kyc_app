import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import ReturnButton from "./ReturnButton";
import Header from "./Header";
import instructionIcon from "../assets/images/icons8-information-50.png";

function Photo() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isVideoVisible, setIsVideoVisible] = useState(true);

    useEffect(() => {
        const getSavedCameraStream = async () => {
            try {
                // Check if there's a camera stream saved in localStorage
                const savedStreamData = localStorage.getItem('cameraStream');
                if (savedStreamData) {
                    const savedStream = JSON.parse(savedStreamData);
                    if (savedStream && savedStream.type === 'MediaStream') {
                        videoRef.current.srcObject = savedStream;
                    } else {
                        await askForCameraPermission();
                    }
                } else {
                    await askForCameraPermission();
                }
            } catch (error) {
                console.error('Error accessing the camera:', error);
            }
        };

        const askForCameraPermission = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    // Save the camera stream in localStorage
                    localStorage.setItem('cameraStream', JSON.stringify(stream));
                }
            } catch (error) {
                console.error('Error accessing the camera:', error);
                // Optionally handle error (e.g., show a message to the user)
            }
        };

        getSavedCameraStream();

        return () => {
            // Clean up stream if component unmounts
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();

                tracks.forEach(track => {
                    track.stop();
                });
            }
        };
    }, []);

    const handleCapture = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            // Set canvas dimensions to match video dimensions
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;

            // Draw the current frame from the video on the canvas
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            // Get the image data URL from the canvas
            const imageDataURL = canvasRef.current.toDataURL('image/jpeg');

            // Set the captured image state
            setCapturedImage(imageDataURL);
            setIsVideoVisible(false);
        }
    };

    const reRender = () => {
        window.location.reload();
    };

    return(
        <div>
            <Navbar />
            <ReturnButton />
            <Header title="Capture Photo" />
            <div className="content_container">
                <div className="capture_image_container">
                {isVideoVisible ? (
                        <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    ) : (
                        <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    )}
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
                <div className="instruction_container">
                    <div className="instruction_logo">
                        <img className="image" src={instructionIcon} alt="instruction" />
                    </div>
                    <div className="instruction_content">
                        <label className="instruction">Please ensure your face is completely visible on screen for your KYC to be successfully processed.</label>
                    </div>
                </div>
                <div className="capture_button">
                    <button className="btn btn-success btn-block mt-3" onClick={handleCapture}>Take Photo</button>
                </div>
                {capturedImage && (
                    <div className="reset_button">
                        <button className="btn btn-danger" onClick={reRender}>Reset</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Photo;
