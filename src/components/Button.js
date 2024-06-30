import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Button (props) {
    

    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const navigateToPage = () => {
        let newPath = "/personalDetails";
        navigate(newPath);
    }
    const hitPanVerify = async()=>{
        setIsLoading(true);
        console.log("inside hitPanverify")
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "APP_PAN_NO": props.pan,
        "APP_PAN_DOB": "25-05-1975",
        "APP_POS_CODE": "L",
        "APP_OTHKRA_CODE": "THINKEKYC",
        "APP_OTHKRA_BATCH": "TEST 22-05-2017",
        "APP_IOP_FLG": "IE",
        "APP_TOTAL_REC": "1"
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        console.log("hitting the api")
        try {
            const response = await fetch("http://localhost:5000/ekyc_verify", requestOptions);
            const data = await response.text();
            console.log(data)
            // setResult(data);
            
            if(response.status === 200){
                localStorage.setItem("user_pan_data",data);
                localStorage.setItem("updated_user_pan_data",data);
                navigate("/personalDetails");
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }finally {
            setIsLoading(false);
          }
        }
    return (
        <div>
            <div className="digi_button">
                <button disabled={props.disabled} onClick={hitPanVerify} style={{height:"50px",opacity:"0.9", borderRadius:"0px"}} type="submit" className="btn btn-success btn-block mt-3">{isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Confirm"}</button>
            </div>
        </div>
    );
}

export default Button;