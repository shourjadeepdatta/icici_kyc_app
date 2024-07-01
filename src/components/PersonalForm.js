import React, { useState, useEffect } from "react";
import { ReactComponent as EditIcon } from "../assets/images/edit-2-svgrepo-com.svg";
// import './PersonalForm.css'; // Import your CSS file

function PersonalForm(props) {
    const [mobile, setMobile] = useState(props.value1);
    const [email, setEmail] = useState(props.value2);
    const [mobileError, setMobileError] = useState("");
    const [emailError, setEmailError] = useState("");

    const maskMobile = (value) => {
        const maskedNumber = value.replace(/.(?=.{4})/g, 'X');
        return `+91 ${maskedNumber.slice(-10)}`;
    };

    const maskEmail = (email) => {
        const [localPart, domainPart] = email.split('@');
        if (localPart.length <= 3) {
            return `${localPart.charAt(0)}***@${domainPart}`;
        } else if (localPart.length === 4) {
            return `${localPart.charAt(0)}**${localPart.charAt(3)}@${domainPart}`;
        } else {
            const visiblePart = `${localPart.charAt(0)}${'*'.repeat(localPart.length - 3)}${localPart.slice(-2)}`;
            return `${visiblePart}@${domainPart}`;
        }
    };

    const validateMobile = (value) => {
        const unmaskedNumber = value.replace(/\D/g, '').slice(-10);
        const mobilePattern = /^\d{10}$/;
        if (!mobilePattern.test(unmaskedNumber)) {
            setMobileError("Invalid mobile number format. Expected format: +91 XXXXXXXXXX");
        } else {
            setMobileError("");
        }
    };

    const validateEmail = (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        setMobile(value);
        validateMobile(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    useEffect(() => {
        validateMobile(mobile);
        validateEmail(email);
    }, []);

    return (
        <div>
            <div>
                <form className="form_container_v2">
                    <div style={{ marginTop: "20px" }} className="mobile_container">
                        <div className="form-group">
                            <label style={{ paddingBottom: "4px" }} htmlFor="mobile">{props.firstTitle}</label>
                            <div className="input_wrapper">
                                <input
                                    type="text"
                                    className="form-control input_style"
                                    id="mobile"
                                    value={maskMobile(mobile)}
                                    onChange={handleMobileChange}
                                    onBlur={() => validateMobile(mobile)}
                                />
                                <EditIcon className="edit_icon" />
                            </div>
                            {mobileError && <div className="error_message">{mobileError}</div>}
                        </div>
                    </div>

                    <div style={{ marginBottom: "30px" }} className="email_container">
                        <div className="form-group">
                            <label style={{ paddingBottom: "4px" }} htmlFor="email">{props.secondTitle}</label>
                            <div className="input_wrapper">
                                <input
                                    type="text"
                                    className="form-control input_style"
                                    id="email"
                                    value={maskEmail(email)}
                                    onChange={handleEmailChange}
                                    onBlur={() => validateEmail(email)}
                                />
                                <EditIcon className="edit_icon" />
                            </div>
                            {emailError && <div className="error_message">{emailError}</div>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalForm;
