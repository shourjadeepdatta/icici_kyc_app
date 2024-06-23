import React from "react";
import digiIcon from "../assets/images/digi_icon.png"

function Digilocker() {
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
                        <button type="submit" className="btn btn-success btn-block mt-3">
                            <i className="fa fa-lock"></i> Proceed to Digilocker
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Digilocker;