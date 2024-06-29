import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "./ReturnButton";
import Navbar from "./Navbar";
import Header from "./Header";
import PersonalForm from "./PersonalForm";
import Button from "./Button";
import { ReactComponent as UploadIcon } from "../assets/images/upload-cloud-svgrepo-com.svg";
import {ReactComponent as DeleteIcon} from "../assets/images/delete-svgrepo-com.svg";
function Address() {
  const fileInputRef = useRef(null);
  let navigate = useNavigate();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [correspondenceOption, setCorrespondenceOption] = useState("");
  const [UploadFileOption, setUploadFileOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const user_data = JSON.parse(localStorage.getItem("user_pan_data"));

  const moveToNextPage = () => {
    console.log("going to take photo now");
    navigate("/takePhoto");
  };

  const handleSelectChangePermanentAddress = (event) => {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  };

  const handleSelectChangeCorrespondenceAddress = (event) => {
    setCorrespondenceOption(event.target.value);
    console.log(correspondenceOption);
  };

  const handleSelectChangeAddressProod = (event) => {
    setUploadFileOption(event.target.value);
    console.log(UploadFileOption);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click on the file input
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
    console.log("Selected file:", file);
  };

  const deleteSelectedFile = () => {
    setIsFileSelected(false);
    setSelectedFile(null);

  }

  return (
    <div>
      <Navbar></Navbar>
      <Header title="Address details"></Header>
      <div className="dropdown_container">
        <div className="dropdown_title">
          <label className="permanent_address_label">Permanent Address</label>
        </div>
        <select
          value={selectedOption}
          className="select_bar input_style"
          onChange={handleSelectChangePermanentAddress}
        >
          <option>Select an option</option>
          <option>Address as per Aadhar</option>
        </select>

        {selectedOption === "Address as per Aadhar" && (
          <div className="display_address_container">
            <label className="display_address">
              {user_data?.APP_PER_ADD1}, {user_data?.APP_PER_STATE},{" "}
              {user_data?.APP_PER_CITY}, {user_data?.APP_PER_PINCD}
            </label>
          </div>
        )}

        <div className="dropdown_title">
          <label className="correspondence_address_label">
            Correspondence Address
          </label>
        </div>
        <select
          value={correspondenceOption}
          className="select_bar input_style"
          onChange={handleSelectChangeCorrespondenceAddress}
        >
          <option>Select an option</option>
          <option>Address as per KRA</option>
        </select>

        {correspondenceOption === "Address as per KRA" && (
          <div>
            <PersonalForm
              firstTitle="Address line 1"
              secondTitle="Address line 2"
              value1={user_data?.APP_COR_ADD1 ?? "NA"}
              value2={user_data?.APP_COR_ADD2 ?? "NA"}
            ></PersonalForm>
            <PersonalForm
              firstTitle="City"
              secondTitle="State"
              value1={user_data?.APP_COR_CITY ?? "NA"}
              value2={user_data?.APP_COR_STATE ?? "NA"}
            ></PersonalForm>
            <div className="pincode_container">
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  className="form-control input_style"
                  id="pincode"
                  defaultValue={user_data?.APP_COR_PINCD ?? "NA"}
                />
              </div>
            </div>

            <div className="dropdown_title">
              <label className="address_prood_label">
                Choose the address proof below
              </label>
            </div>
            <select
              value={UploadFileOption}
              className="select_bar input_style"
              onChange={handleSelectChangeAddressProod}
            >
              <option>Select an option</option>
              <option>Gas receipt</option>
              <option>Electricity Bill</option>
              <option>Aadhaar Card</option>
            </select>

            
            {isFileSelected ? (
            <div className="delete_icon_container">
                <span>{selectedFile?.name ?? "kjfnndkndkand"}</span>
                <DeleteIcon onClick={deleteSelectedFile} className="delete_icon"></DeleteIcon>
            </div>) : (

                <div className="file_upload_field" onClick={handleClick}>
                <UploadIcon className="upload_icon"></UploadIcon>
                <div className="upload_text_class">
                {selectedFile ? (
                    <span>{selectedFile.name}</span>
                ) : (
                    "Drag and drop or tap to browse file"
                )}
                </div>
                <div className="upload_text_class">
                Format should be JPG/PDF and size not exceeding 500KB.
                </div>
                <input
                type="file"
                className="upload_input"
                ref={fileInputRef}
                accept=".jpg,.jpeg,.pdf"
                style={{ display: 'none' }} // Hide the file input visually
                onChange={handleFileUpload}
                />
                </div>
            )}
          </div>
        )}

        <div className="digi_button">
          <button
            onClick={moveToNextPage}
            type="submit"
            className="btn btn-success btn-block mt-3"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Address;
