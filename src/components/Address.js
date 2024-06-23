import React from "react";
import { useState } from "react";
import ReturnButton from "./ReturnButton";
import Navbar from "./Navbar";
import Header from "./Header";
import PersonalForm from "./PersonalForm";
import Button from "./Button";

function Address() {
    const [selectedOption, setSelectedOption] = useState('');
    const [correspondenceOption,setCorrespondenceOption] = useState('');
    const [UploadFileOption,setUploadFileOption] = useState('');
    const [selectedFile,setSelectedFileOption] = useState(null);

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
            <ReturnButton></ReturnButton>
            <Header title="Address details"></Header>
            <div className="dropdown_container">
                <div className="dropdown_title">
                    <label className="permanent_address_label">Permanent Address</label>
                </div>
                <select value={selectedOption} className="select_bar" onChange={handleSelectChangePermanentAddress}>
                    <option>Select an option</option>
                    <option>Address as per Aadhar</option>
                </select>

                {selectedOption === "Address as per Aadhar" &&
                <div className="display_address_container">
                    <label className="display_address">1C/702 NG Suncity phase 3, Kandivali east, thakur village, Mumbai, maharashtra, 400101</label>
                </div>
                }

                <div className="dropdown_title">
                    <label className="correspondence_address_label">Correspondence Address</label>
                </div>
                <select value={correspondenceOption} className="select_bar" onChange={handleSelectChangeCorrespondenceAddress}>
                    <option>Select an option</option>
                    <option>Address as per Aadhar</option>
                    <option>Address as per KRA</option>
                    <option>New Address</option>
                </select>

                {correspondenceOption === "New Address" && (
                    <div>
                    <PersonalForm firstTitle="Address line 1" secondTitle="Address line 2" value1="" value2=""></PersonalForm>
                    <PersonalForm firstTitle="City" secondTitle="State" value1="" value2=""></PersonalForm>
                    <div className="pincode_container">
                        <div className="form-group">
                        <label htmlFor="pincode">Pincode</label>
                        <input type="text" className="form-control" id="pincode"/>
                        </div>
                    </div>
                    
                    <div className="dropdown_title">
                        <label className="address_prood_label">Choose the address proof below</label>
                    </div>
                    <select value={UploadFileOption} className="select_bar" onChange={handleSelectChangeAddressProod}>
                        <option>Select an option</option>
                        <option>Gas receipt</option>
                        <option>Electricity Bill</option>
                        <option>Aadhaar Card</option>
                    </select>

                    <div className="file_upload_field">
                    <label htmlFor="fileUpload">Choose file:</label>
                        <input type="file" id="fileUpload" onChange={handleFileUpload}/>
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
                <Button></Button>

            </div>
        </div>
    );
}

export default Address;