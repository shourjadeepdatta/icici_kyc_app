import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Parent.css'; // Make sure the path to your CSS file is correct
import Navbar from './Navbar';
import Form from './Form';
import Button from './Button';
import Header from './Header';
import { useSearchParams } from 'react-router-dom';

function Parent() {
    const [isPanValid, setIsPanValid] = useState(true);
    const [shouldDisable,setShouldDisable] = useState(false);
    const [searchParams] = useSearchParams();
    const panNo = searchParams.get('p');
    const dob = searchParams.get('d');
    const icici_phone = searchParams.get('ip');
    const icici_email = searchParams.get('ie');
    localStorage.setItem("p",panNo);
    localStorage.setItem("d",dob);
    localStorage.setItem("icici_phone",icici_phone);
    localStorage.setItem("icici_email",icici_email);
    const [updatedPan, setUpdatedPan] = useState(atob(panNo));
    const [Dob, setDob] = useState(atob(dob));
    const [stageOneData, setStageOneData] = useState({ "panNo": updatedPan ,"dob":Dob});
    // const [updatedPan, setUpdatedPan] = useState(panNo);
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

    useEffect(()=>{
        try{
        localStorage.removeItem("user_pan_data");
        }
        catch(error){
            console.log("while removing error",error);
        }

        try{
            localStorage.removeItem("updated_user_pan_data");
        }
        catch(error){
            console.log("while removing error",error);
        }

        try{
            localStorage.removeItem("updated_form_data");
        }
        catch(error){
            console.log("while removing error",error);
        }

        try{
            localStorage.removeItem("Aadhaar_address");
        }
        catch(error){
            console.log("while removing error",error);
        }
        try{
            localStorage.removeItem("perAddress");
        }
        catch(error){
            console.log("while removing error",error);
        }
        try{
            localStorage.removeItem("corrAddress");
        }
        catch(error){
            console.log("while removing error",error);
        }

        try{
            localStorage.removeItem("capturedImage");
        }
        catch(error){
            console.log("while removing error",error);
        }
        
    },[])
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
                    pan={stageOneData}
                    onError={handlePanVerificationError}
                />
                
            </div>
        </div>
    );
}

export default Parent;
