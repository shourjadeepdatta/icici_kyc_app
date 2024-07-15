import React, { useEffect, useState } from "react";
import { ReactComponent as EditIcon } from "../assets/images/edit-2-svgrepo-com.svg";

function PersonalForm(props) {
    const [mobile, setMobile] = useState(props.value1);
    const [email, setEmail] = useState(props.value2);
    const [mobileError, setMobileError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isMobileFocused, setIsMobileFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    
    const [showInputOption,setShowInputOption] = useState(true);
    const [showInputValue,setShowInputValue] = useState(false);
    const [showEmailInputOption,setShowEmailInputOption] = useState(true);
    const [showEmailInputValue,setShowEmailInputValue] = useState(false);
    const [isKraSelected,setIsKraSelected] = useState(true);
    let user_form_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
    let user_data = {...user_form_data};
    console.log(" ************** ", user_form_data["APP_MOB_NO"])
    const [selectedValue, setSelectedValue] = useState(user_data["APP_MOB_NO"]);
    const [selectedEmailValue, setSelectedEmailValue] = useState(user_form_data["APP_EMAIL"]);
    const ip = atob(localStorage.getItem("icici_phone"));
    const ie = atob(localStorage.getItem("icici_email"))
    const [dropdownValue,setDropdownValue] = useState(ip);
    const [dropdownEmailValue,setDropdownEmailValue] = useState(ie);
    const [iciciPhone,setIciciPhone] = useState(ip);
    const [iciciEmail,setIciciEmail] = useState(ie);

    useEffect(()=> {
        console.log("\t&&&&& Set ");
    }, [selectedValue])
    
    const maskEmail = (value) => {
        user_form_data = JSON.parse(localStorage.getItem("updated_form_data"));
        if(!user_form_data){
            user_form_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
        }
        user_form_data["APP_EMAIL"] = value;
        localStorage.setItem("updated_form_data",JSON.stringify(user_form_data));
        const parts = value.split('@');
        const maskedPart = parts[0].replace(/.(?=.{2})/g, 'X'); // Mask all but last 2 characters
        return maskedPart + '@' + parts[1]; // Concatenate with the unmasked domain part
    };
    const maskMobile = (value) => {
        let user_form_data = JSON.parse(localStorage.getItem("updated_form_data"));
        if(!user_form_data){
           user_form_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
        }
        else{
            user_form_data["APP_MOB_NO"] = value;
        }
        const visibleDigits = value.slice(-4); // Get the last 4 visible digits
        localStorage.setItem("updated_form_data",JSON.stringify(user_form_data));
        const maskedDigits = value.slice(0, -4).replace(/\d/g, 'X'); // Mask all but first 3 and last 4 digits
        const maskedMobileNumber = '+91 ' + maskedDigits + visibleDigits;
        console.log(maskedMobileNumber);
        
        // return '+91 ' + maskedDigits + visibleDigits;
        return maskedMobileNumber;
    };

    const validateMobile = (value) => {
        const unmaskedValue = value.replace(/\D/g, ''); // Remove non-digit characters
        const mobilePattern = /^\d{10}$/;
        if (!mobilePattern.test(unmaskedValue)) {
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

    const feedPhoneNumber = (e) => {
        user_form_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
        const phone = e.target.value;
        console.log("event value->>>",e.target.value);
        console.log("event object->>",e);
        // if(phone.includes("KRA")){
        //     setSelectedValue(user_form_data["APP_MOB_NO"]);
        //     setShowInputOption(false)
        //         setShowInputValue(true);
        //     console.log("akdmdmdalkmd->>>",user_form_data["APP_MOB_NO"]);
        //     console.log("changed value of mobile number is->>",selectedValue);
        // }
        // console.log("icici mobile number is ->>>",phone);
        console.log("----> "+phone)
        setDropdownValue(selectedValue);
        console.log("Dropdown value is ->>>",dropdownValue);
        setSelectedValue(phone);
        console.log("selected_value toggled is->>>",selectedValue);
        setShowInputOption(false)
        setShowInputValue(true);
        console.log("akdmdmdalkmd->>>",phone);
        console.log("changed value of mobile number is->>",selectedValue);
        
    }

    // const handleMobileChange = (e) => {
    //     let value = e.target.value;
    //     // Remove all non-digit characters
    //     value = value.replace(/\D/g, '');
        
    //     // Ensure the value starts with '+91'
    //     if (!value.startsWith('+91')) {
    //         value = '+91' + value;
    //     }
        
    //     // Update state
    //     setMobile(value);
    //     validateMobile(value);
    // };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const getDropdownBack = ()=> {
        setShowInputOption(true);
        setShowInputValue(false);
    }

    const getEmailDropdownBack = ()=> {
        setShowEmailInputOption(true);
        setShowEmailInputValue(false);
    }


    const feedEmail = (e) => {
        user_form_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
        const email = e.target.value;
        console.log("event value->>>",e.target.value);
        // if(email.includes("KRA")){
        //     setSelectedEmailValue(user_form_data["APP_EMAIL"]);
        //     setShowEmailInputOption(false)
        //     setShowEmailInputValue(true);
        //     console.log("akdmdmdalkmd->>>",user_form_data["APP_EMAIL"]);
        //     console.log("changed value of mobile number is->>",selectedEmailValue);
        // }
        // console.log("icici_email is->>>",email);
        setDropdownEmailValue(selectedEmailValue);
        setSelectedEmailValue(email);
        setShowEmailInputOption(false)
        setShowEmailInputValue(true);
        console.log("akdmdmdalkmd->>>",user_form_data["APP_EMAIL"]);
        console.log("changed value of mobile number is->>",selectedEmailValue);
    }

    const saveMobileValue = (e) => {
        user_form_data["APP_MOB_NO"] = e.target.value;
        console.log("updated mobile number->>",user_form_data["APP_MOB_NO"]);
        localStorage.setItem("updated_form_data",JSON.stringify(user_form_data));

    }

    const saveEmailValue = (e) => {
        user_form_data["APP_EMAIL"] = e.target.value;
        console.log("updated email id->>",user_form_data["APP_EMAIL"]);
        localStorage.setItem("updated_form_data",JSON.stringify(user_form_data));

    }

    useEffect(() => {
        console.log("the initial selected value is ->>",selectedValue);
        console.log("The initial email selection is ->>",selectedEmailValue);
        
    },[])

    useEffect(()=>{
        user_form_data = JSON.parse(localStorage.getItem("updated_form_data"));
        if(!user_form_data){
            user_form_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
            
        }
        user_form_data["APP_EMAIL"] = selectedEmailValue;
        console.log("updated email id->>",user_form_data["APP_EMAIL"]);
        localStorage.setItem("updated_form_data",JSON.stringify(user_form_data));
    },[selectedEmailValue])

    useEffect(()=>{
        user_form_data = JSON.parse(localStorage.getItem("updated_form_data"));
        if(!user_form_data){
            user_form_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
            
        }
        user_form_data["APP_MOB_NO"] = selectedValue;
        console.log("updated mobile number->>",user_form_data["APP_MOB_NO"]);
        localStorage.setItem("updated_form_data",JSON.stringify(user_form_data));
    },[selectedValue])

    return (
        <div>
            <div>
                <form className="form_container_v2">
                    <div style={{ marginTop: "20px" }} className="mobile_container">
                        <div className="form-group">
                            <label style={{paddingBottom:"6px"}} htmlFor="mobile">{props.firstTitle}</label>
                            {/* <div className="input_wrapper">
                                <input
                                    type="text"
                                    className="form-control input_style"
                                    id="mobile"
                                    value={isMobileFocused ? mobile : (mobile.startsWith('+91') ? maskMobile(mobile) : maskMobile(mobile))}
                                    onChange={handleMobileChange}
                                    onFocus={() => setIsMobileFocused(true)}
                                    onBlur={() => {
                                        maskMobile(mobile);
                                        setIsMobileFocused(false);
                                        validateMobile(mobile);
                                    }}
                                />
                                <EditIcon className="edit_icon" />
                            </div>
                            {mobileError && <div className="error_message">{mobileError}</div>} */}
                            {showInputOption && (<select value={selectedValue} onChange={feedPhoneNumber} style={{height:"35px", width:"100%",backgroundColor:"rgb(226, 223, 223)"}}>
                                <option value={selectedValue} selected disabled hidden>{selectedValue}</option>
                                <option id="MOB_ICICI">{dropdownValue}</option>
                                {/* {!isKraSelected && (
                                    <option id="MOB_KRA">{user_data["APP_MOB_NO"]}</option>)} */}
                            </select>)}
                            {showInputValue && (
                                <div className="input_wrapper">
                                <input
                                    type="text"
                                    className="form-control input_style"
                                    id="mobile"
                                    value={selectedValue}
                                    disabled={true}
                                    onChange={saveMobileValue}
                                />
                                <EditIcon onClick={getDropdownBack} className="edit_icon clickable_edit_icon" />
                            </div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: "30px" }} className="email_container">
                        <div className="form-group">
                            <label style={{ paddingBottom: "4px" }} htmlFor="email">{props.secondTitle}</label>
                            {/* <div className="input_wrapper">
                                <input
                                    type="text"
                                    className="form-control input_style"
                                    id="email"
                                    value={isEmailFocused ? email : maskEmail(email)}
                                    onChange={handleEmailChange}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => {
                                        setIsEmailFocused(false);
                                        validateEmail(email);
                                    }}
                                />
                                <EditIcon className="edit_icon" />
                            </div>
                            {emailError && <div className="error_message">{emailError}</div>} */}
                            {showEmailInputOption && (<select value={selectedEmailValue} onChange={feedEmail} style={{height:"35px", width:"100%",backgroundColor:"rgb(226, 223, 223)"}}>
                                {/* <option>Select Option</option> */}
                                <option value={selectedEmailValue} selected disabled hidden>{selectedEmailValue}</option>
                                <option>{dropdownEmailValue}</option>
                                {/* <option>{user_form_data["APP_EMAIL"]}</option> */}
                            </select>)}

                            {showEmailInputValue && (<div className="input_wrapper">
                                <input
                                    type="text"
                                    className="form-control input_style"
                                    id="email"
                                    value={selectedEmailValue}
                                    disabled={true}
                                    onChange={saveEmailValue}
                                />
                                <EditIcon onClick={getEmailDropdownBack} className="edit_icon clickable_edit_icon" />
                            </div>)}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PersonalForm;
