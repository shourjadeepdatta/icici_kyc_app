import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Parent.css'; // Make sure the path to your CSS file is correct
import Navbar from './Navbar';
import Form from './Form';
import Button from './Button';
import Header from './Header';

function Parent() {
    const [isPanValid, setIsPanValid] = useState(true);
    const [stageOneData, setStageOneData] = useState({ "panNo": "BAMPM9343K" });
    const [updatedPan, setUpdatedPan] = useState("BAMPM9343K");
    const [errorMessage, setErrorMessage] = useState('');

    const handlePanVerificationError = (error) => {
        console.log("error",error);
        setErrorMessage(error);
    };

    const panUpdater = (pan) => {
      setUpdatedPan(pan);
    }
    useEffect(() => {
      console.log("error in use effect",errorMessage);
    },[errorMessage]);
    return (
        <div>
            <Navbar />
            <div className="container">
                <Header title="KYC Modification" />
                <div className='confirmation_container'>
                    <p>Confirm your PAN below to fetch your details.</p>
                </div>
                
                <Form externalError={errorMessage} panUpdater={panUpdater} data={stageOneData} setIsPanValidFun={setIsPanValid} />
                {/* {(errorMessage && errorMessage.length > 0) && <div className="alert alert-danger mt-3">{errorMessage}</div>} */}
                <Button
                    disabled={!isPanValid || false}
                    pan={updatedPan}
                    onError={handlePanVerificationError}
                />
                
            </div>
        </div>
    );
}

export default Parent;
