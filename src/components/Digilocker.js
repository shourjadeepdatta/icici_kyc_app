import React from "react";
import digiIcon from "../assets/images/digi_icon.png"
import { useNavigate } from "react-router-dom";

function Digilocker() {

    const proceedToDigilocker = async() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user_id": "XCICL1AFG",
            "phone_number": "8169935304",
            "pan": "GEXPD8653H",
            "callback_url": "http://localhost:3000/addressDetails"
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        console.log("hitting the api")
        try {
            const response = await fetch("https://legacyclients.kyc.getkwikid.com/kyc/cams/digi", requestOptions);
            const digi_response = await response.json();
            console.log(digi_response)
            
            // setResult(data);
            
            if(response.status === 200){
                const redirectUrl = digi_response.url;
                window.location.href = redirectUrl;
            }
          } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    return (
        <div>
            <div className="digi_container">
                <div className="digi_instruction">
                    <p>You will be redirected to Digilocker to verify your Aadhaar and PAN details.</p>
                </div>
                <div className="card_and_button">
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title"><img  className="digi_icon" src={digiIcon}></img> Why use DigiLocker?</h5>
                        <p className="card-text">DigiLocker automatically verifies the documents needed to complete your KYC. Your data is 100% safe and secure.</p>
                        </div>
                    </div>
                    <div className="digi_button">
                        <button onClick={proceedToDigilocker} type="submit" className="btn btn-success btn-block mt-3">
                            <i className="fa fa-lock"></i> Proceed to Digilocker
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Digilocker;