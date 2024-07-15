import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Button(props) {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const hitPanVerify = async () => {
        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "APP_PAN_NO": props.pan.panNo,
            // "APP_PAN_DOB": "25-05-1975",
            "APP_PAN_DOB":props.pan.dob,
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

        try {
            const response = await fetch("https://api-dev.test.getkwikid.com/kyc/ekyc_verify", requestOptions);
            const data = await response.text();
            console.log("res->>",response.status);
            console.log("response->>>",data);

            if (response.status === 200) {
                localStorage.setItem("user_pan_data", data);
                localStorage.setItem("updated_user_pan_data", data);
                navigate("/personalDetails");
            } else {
                console.log("inside else block");
                props.onError('Entered PAN does not exist.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            props.onError('Network error. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="digi_button">
            {props.disabled && (<button
                disabled={props.disabled}
                onClick={hitPanVerify}
                style={{ height: "50px", opacity: "0.9", borderRadius: "0px" ,backgroundColor:"grey"}}
                type="submit"
                className="btn btn-success btn-block mt-3"
            >
                {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    "Confirm"
                )}
            </button>)}
            {!(props.disabled) && (<button
                disabled={props.disabled}
                onClick={hitPanVerify}
                style={{ height: "50px", opacity: "0.9", borderRadius: "0px"}}
                type="submit"
                className="btn btn-success btn-block mt-3"
            >
                {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                    "Confirm"
                )}
            </button>)}
        </div>
    );
}

export default Button;
