import React from "react";
import Navbar from "./Navbar";
// import "./Personal.css";
import PersonalForm from "./PersonalForm";
import Digilocker from "./Digilocker";
import ReturnButton from "./ReturnButton";
import Header from "./Header";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Personal() {
    const panResult = JSON.parse(localStorage.getItem("updated_user_pan_data"));
    console.log("slkdmsldmd-.>>",panResult);
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">

                <Header title="Confirm your mobile number and email address"></Header>  
                <PersonalForm firstTitle="Mobile Number" secondTitle="Email Address" value1={panResult?.APP_MOB_NO ?? "null"} value2={panResult?.APP_EMAIL ?? "null"}></PersonalForm>
                <Digilocker></Digilocker>
            </div>
        </div>

    );
}

export default Personal;