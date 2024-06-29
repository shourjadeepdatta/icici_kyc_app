import React from "react";
import { useNavigate } from "react-router-dom";

function ReturnButton() {
    let navigate = useNavigate();
    const goBack = () =>{
        navigate(-1);
    }
    return (
        <div>
            <a onClick={goBack} className="back_link">Back</a>
        </div>
    );
}


export default ReturnButton;