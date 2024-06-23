import React from "react";
import { useNavigate } from "react-router-dom";

function Button () {
    let navigate = useNavigate();
    const navigateToPage = () => {
        let newPath = "/personalDetails";
        navigate(newPath);
    }
    return (
        <div>
            <div className="digi_button">
                <button onClick={navigateToPage} type="submit" className="btn btn-success btn-block mt-3">Continue</button>
            </div>
        </div>
    );
}

export default Button;