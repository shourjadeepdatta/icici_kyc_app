import React from "react";
import Navbar from "./Navbar";
// import "./Personal.css";
import PersonalForm from "./PersonalForm";
import Digilocker from "./Digilocker";
import ReturnButton from "./ReturnButton";
import Header from "./Header";

function Personal() {
    return (
        <div>
            <Navbar></Navbar>
            <ReturnButton></ReturnButton>
            <div className="content_container">
                <Header title="Confirm your mobile number and email address"></Header>
                {/* <div className="header_dialogue">
                    <h3>Confirm your mobile number and email address</h3>
                </div> */}
            <PersonalForm firstTitle="Mobile Number" secondTitle="Email Address" value1="XXXXXXXX04" value2="shXXXXXXX@gmail.com"></PersonalForm>
            <Digilocker></Digilocker>
            </div>
        </div>
            
    );
}

export default Personal;