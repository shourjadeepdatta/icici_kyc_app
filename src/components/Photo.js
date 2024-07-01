import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import instructionIcon from "../assets/images/icons8-information-50.png";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Photo() {
    let navigate = useNavigate();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isVideoVisible, setIsVideoVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isShutterVisible, setIsShutterVisible] = useState(false);

    useEffect(() => {
        const getSavedCameraStream = async () => {
            try {
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
                    localStorage.setItem('cameraStream', JSON.stringify(stream));
                }
            } catch (error) {
                console.error('Error accessing the camera:', error);
            }
        };

        getSavedCameraStream();

        return () => {
            stopCameraStream();
        };
    }, []);

    const stopCameraStream = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const handleCapture = () => {
        setIsShutterVisible(true);
        setTimeout(() => {
            if (canvasRef.current && videoRef.current) {
                const context = canvasRef.current.getContext('2d');
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageDataURL = canvasRef.current.toDataURL('image/jpeg');
                setCapturedImage(imageDataURL);
                setIsVideoVisible(false);
                localStorage.setItem('capturedImage', imageDataURL);
            }
            setIsShutterVisible(false);
        }, 500);
    };

    const resetCapture = () => {
        setCapturedImage(null);
        localStorage.removeItem('capturedImage');
        window.location.reload();
    };

    const handleContinue = () => {
        console.log("Continue to the next step");
        stopCameraStream();
        localStorage.removeItem('cameraStream');
        navigate('/Details');
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <Header title="Capture Photo"/>
            </div>
            <div className="content_container">
                {isLoading && (
                    <div className="loader-overlay">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                <div className="capture_image_container_wrapper" style={{ position: 'relative' }}>
                    <div className="capture_image_container">
                        {isShutterVisible && <div className="shutter"></div>}
                        {isVideoVisible ? (
                            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
                        ) : (
                            <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        )}
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>
                    {!isVideoVisible && (
                        <button
                            onClick={resetCapture}
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '10px',
                                color: 'red',
                                backgroundColor: 'transparent',
                                border: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                paddingBottom:"20px"
                            }}
                        >
                           Reset Photo
                        </button>
                    )}
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
                    <button
                        style={{height:"40px", opacity:"0.9", borderRadius:"0px"}}
                        className="btn btn-success btn-block mt-3"
                        onClick={capturedImage ? handleContinue : handleCapture}
                    >
                        {capturedImage ? 'Continue' : 'Take Photo'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Photo;
