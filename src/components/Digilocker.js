import React from "react";
import digiIcon from "../assets/images/digi_icon.png"
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Digilocker() {

    function transformApiResponse(response) {
        // Check if response is valid JSON
        let responseObject;
        try {
          responseObject = JSON.parse(response);
        } catch (error) {
          console.error("Invalid JSON response:", error);
          return null;
        }
      
        // Transform keys
        const transformedResponse = {};
        for (const key in responseObject) {
          if (key.startsWith('@')) {
            const newKey = key.slice(1); // Remove the '@' character
            transformedResponse[newKey] = responseObject[key];
          } else {
            transformedResponse[key] = responseObject[key];
          }
        }
      
        return transformedResponse;
      }

    const proceedToDigilocker = async() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user_id": atob(localStorage.getItem("p")),
            "phone_number": "8169935304",
            "pan": atob(localStorage.getItem("p")),
            "callback_url": "https://app-dev.test.getkwikid.com/icici/addressDetails"
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        console.log("hitting the api")
        const NewrequestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const add_response = await fetch("https://legacyclients.kyc.getkwikid.com/kyc/api/v1/get_digilocker_data/XCVAD", NewrequestOptions);
            const digi_address_response = await add_response.json();
            console.log(digi_address_response["aadhaarDetails"]["Certificate"]["CertificateData"]["KycRes"]["UidData"]["Poa"])
            const digi_address_object = digi_address_response["aadhaarDetails"]["Certificate"]["CertificateData"]["KycRes"]["UidData"]["Poa"];
            const transformedResponse = transformApiResponse(JSON.stringify(digi_address_object));
            localStorage.setItem("Aadhaar_address",JSON.stringify(transformedResponse));
        }
        catch(e){
            console.error('Error fetching digi address data:', e);
        }
        
        try {
            const response = await fetch("https://legacyclients.kyc.getkwikid.com/kyc/cams/digi", requestOptions);
            const digi_response = await response.json();
            console.log(digi_response)
            
            // const digi_address_response = await fetch("/digi_address.json")
            // const address_details = await digi_address_response.json();
            // console.log("digi_address->>",address_details);
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
                        <button style={{borderRadius:"0px", height:"50px",opacity:"0.9"}} onClick={proceedToDigilocker} type="submit" className="btn btn-success btn-block mt-3">
                            <i className="fa fa-lock"></i> Proceed to Digilocker
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Digilocker;