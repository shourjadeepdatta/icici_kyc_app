import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "./ReturnButton";
import Navbar from "./Navbar";
import Header from "./Header";
import PersonalForm from "./PersonalForm";
import Button from "./Button";

function Address() {
    let navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [correspondenceOption,setCorrespondenceOption] = useState('');
    const [UploadFileOption,setUploadFileOption] = useState('');
    const [selectedFile,setSelectedFileOption] = useState(null);
    const user_data = JSON.parse(localStorage.getItem("user_pan_data"));

    const moveToNextPage = ()=>{
        console.log("going to take photo now");
        navigate("/takePhoto");
    }
    const handleSelectChangePermanentAddress = (event) => {
        console.log("setting the state variable the selected option");
        setSelectedOption(event.target.value);
        console.log(selectedOption);
    }

    const handleSelectChangeCorrespondenceAddress = (event) => {
        console.log("setting the state variable for correspondence address option");
        setCorrespondenceOption(event.target.value);
        console.log(correspondenceOption);
    }

    const handleSelectChangeAddressProod = (event) => {
        console.log("setting the state variable for address proof option");
        setUploadFileOption(event.target.value);
        console.log(UploadFileOption);
    }

    const handleFileUpload = (event) => {
        console.log("setting the state variable for uploading file");
        setSelectedFileOption(event.target.files[0]);
        console.log(selectedFile);
    }
    const handleRemoveFile = () => {
        setSelectedFileOption(null);
    }
    return (
        <div>
            <Navbar></Navbar>
            <Header title="Address details"></Header>
            <div className="dropdown_container">
                <div className="dropdown_title">
                    <label className="permanent_address_label">Permanent Address</label>
                </div>
                <select value={selectedOption} className="select_bar input_style" onChange={handleSelectChangePermanentAddress}>
                    <option>Select an option</option>
                    <option>Address as per Aadhar</option>
                </select>

                {selectedOption === "Address as per Aadhar" &&
                <div className="display_address_container">
                    <label className="display_address">{user_data?.APP_PER_ADD1}, {user_data?.APP_PER_STATE}, {user_data?.APP_PER_CITY}, {user_data?.APP_PER_PINCD}</label>
                </div>
                }

                <div className="dropdown_title">
                    <label className="correspondence_address_label">Correspondence Address</label>
                </div>
                <select value={correspondenceOption} className="select_bar input_style" onChange={handleSelectChangeCorrespondenceAddress}>
                    <option>Select an option</option>
                    <option>Address as per KRA</option> 
                </select>

                {correspondenceOption === "Address as per KRA" && (
                    <div>
                    <PersonalForm firstTitle="Address line 1" secondTitle="Address line 2" value1={user_data?.APP_COR_ADD1 ?? "NA"} value2={user_data?.APP_COR_ADD2 ?? "NA"}></PersonalForm>
                    <PersonalForm firstTitle="City" secondTitle="State" value1={user_data?.APP_COR_CITY ?? "NA"} value2={user_data?.APP_COR_STATE ?? "NA"}></PersonalForm>
                    <div className="pincode_container">
                        <div className="form-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input type="text" className="form-control input_style" id="pincode" defaultValue={user_data?.APP_COR_PINCD ?? "NA"}/>
                        </div>
                    </div>
                    
                    <div className="dropdown_title">
                        <label className="address_prood_label">Choose the address proof below</label>
                    </div>
                    <select value={UploadFileOption} className="select_bar input_style" onChange={handleSelectChangeAddressProod}>
                        <option>Select an option</option>
                        <option>Gas receipt</option>
                        <option>Electricity Bill</option>
                        <option>Aadhaar Card</option>
                    </select>

                    <div className="file_upload_field">

                    </div>
                </div>
                )}

                {selectedFile && (
                    <div>
                        <h2>File Details:</h2>
                        <p>Name: {selectedFile.name}</p>
                        <p>Type: {selectedFile.type}</p>
                        <button onClick={handleRemoveFile}>Remove</button>
                    </div>
                )}
                <div className="digi_button">
                        <button onClick={moveToNextPage} type="submit" className="btn btn-success btn-block mt-3">Continue</button>
                    </div>

            </div>
        </div>
    );
}

export default Address;