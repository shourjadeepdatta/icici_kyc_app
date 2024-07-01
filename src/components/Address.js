import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReturnButton from "./ReturnButton";
import Navbar from "./Navbar";
import Header from "./Header";
import PersonalForm from "./PersonalForm";
import Button from "./Button";
import { ReactComponent as UploadIcon } from "../assets/images/upload-cloud-svgrepo-com.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/delete-svgrepo-com.svg";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Address() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  

  // State variables
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [correspondenceOption, setCorrespondenceOption] = useState("");
  const [uploadFileOption, setUploadFileOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [updatedFormData, setUpdatedFormData] = useState({});

  const user_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
  const updated_user_data = {...user_data};
  console.log("updated_user_data->>>",updated_user_data);
  // Effect to load form data from localStorage on component mount
  useEffect(() => {
    // setFormData({
    //   selectedOption: user_data?.selectedOption ?? "",
    //   correspondenceOption: user_data?.correspondenceOption ?? "",
    //   uploadFileOption: user_data?.uploadFileOption ?? "",
    //   selectedFile: user_data?.selectedFile ?? null,
    // });
    console.log("form data is->>",formData);

  }, [formData]);

  useEffect(() => {
    
    setFormData(updated_user_data);
    setUpdatedFormData(updated_user_data);
  }, []);

  // Function to update formData state and localStorage on form field change
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log("event->>",event.target.value,event.target.name);
    setUpdatedFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const moveToNextPage = () => {
    console.log("going to take photo now");
    // setFormData()
    // Save updated data to localStorage under a new key
    localStorage.setItem("updated_form_data", JSON.stringify(updatedFormData));
    navigate("/takePhoto");
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedFile: file,
    }));
    console.log("Selected file:", file);
  };

  const deleteSelectedFile = () => {
    setIsFileSelected(false);
    setSelectedFile(null);
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedFile: null,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Header title="Address details" />
      </div>
      <div className="dropdown_container">
        <div style={{width:"100%",marginTop:"20px",paddingRight:"20px"}}className="dropdown_title">
          <label className="permanent_address_label">Permanent Address</label>
        </div>
        <select
          style={{height:"35px"}}
          name="selectedOption"
          value={updatedFormData.selectedOption}
          className="select_bar input_style"
          onChange={handleInputChange}
        >
          <option>Select an option</option>
          <option>Address as per Aadhar</option>
        </select>

        {updatedFormData.selectedOption === "Address as per Aadhar" && (
          <div style={{width:"100%"}} className="display_address_container">
            <label style={{opacity:"0.8"}} className="display_address">
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
          style={{height:"35px"}}
          name="correspondenceOption"
          value={updatedFormData.correspondenceOption}
          className="select_bar input_style"
          onChange={handleInputChange}
        >
          <option>Select an option</option>
          <option>Address as per KRA</option>
        </select>

        {updatedFormData.correspondenceOption === "Address as per KRA" && (
          <div>
            {/* <PersonalForm
              firstTitle="Address line 1"
              secondTitle="Address line 2"
              value1={user_data?.APP_COR_ADD1 ?? ""}
              value2={user_data?.APP_COR_ADD2 ?? ""}
            ></PersonalForm>
            <PersonalForm
              firstTitle="City"
              secondTitle="State"
              value1={user_data?.APP_COR_CITY ?? ""}
              value2={user_data?.APP_COR_STATE ?? ""}
            ></PersonalForm> */}

            <div>
                <div className="form_container_v2">
                <div className="mobile_container">
                    <div style={{paddingTop:"10px", paddingRight:"5px"}} className="form-group">
                        <label htmlFor="email">Address Line 1</label>
                        <input name="APP_COR_ADD1" onChange={handleInputChange} type="text" className="form-control input_style" id="pan" defaultValue={updated_user_data?.APP_COR_ADD1 ?? "NA"} />
                    </div>
                </div>

                <div className="email_container">
                    <div className="form-group">
                        <label htmlFor="email">Address Line 2</label>
                        <input name="APP_COR_ADD2" onChange={handleInputChange} type="text" className="form-control input_style" id="pan" defaultValue={updated_user_data?.APP_COR_ADD2 ?? "NA"} />
                    </div>
                </div>
            </div>
            </div>

            <div>
                <div className="form_container_v2">
                <div className="mobile_container">
                    <div style={{marginTop:"10px"}} className="form-group">
                        <label htmlFor="email">City</label>
                        <input name="APP_COR_CITY" onChange={handleInputChange} type="text" className="form-control input_style" id="pan" defaultValue={updated_user_data?.APP_COR_CITY ?? "NA"} />
                    </div>
                </div>

                <div className="email_container">
                    <div className="form-group">
                        <label htmlFor="email">State</label>
                        <input name="APP_COR_STATE" onChange={handleInputChange} type="text" className="form-control input_style" id="pan" defaultValue={updated_user_data?.APP_COR_STATE ?? "NA"} />
                    </div>
                </div>
            </div>
            </div>


            <div style={{margin:"0px", paddingTop:"10px"}} className="pincode_container">
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  className="form-control input_style"
                  id="pincode"
                  name="APP_COR_PINCD"
                  defaultValue={user_data?.APP_COR_PINCD ?? ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="dropdown_title">
              <label className="address_prood_label">
                Choose the address proof below
              </label>
            </div>
            <select
              style={{width:"98%"}}
              name="uploadFileOption"
              value={updatedFormData.uploadFileOption}
              className="select_bar input_style"
              onChange={handleInputChange}
            >
              <option>Select an option</option>
              <option>Gas receipt</option>
              <option>Electricity Bill</option>
              <option>Aadhaar Card</option>
            </select>

            {isFileSelected ? (
              <div className="delete_icon_container">
                <span>{selectedFile?.name ?? ""}</span>
                <DeleteIcon
                  onClick={deleteSelectedFile}
                  className="delete_icon"
                />
              </div>
            ) : (
              <div className="file_upload_field" onClick={handleClick}>
                <UploadIcon className="upload_icon" />
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
                  name="uploadedFile"
                  type="file"
                  className="upload_input"
                  ref={fileInputRef}
                  accept=".jpg,.jpeg,.pdf"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>
        )}

        {/* <div className="digi_button">
          <Button
            onClick={moveToNextPage}
            className="btn-success"
            disabled={!isFileSelected} // Disable button if file is not selected
          >
            Continue
          </Button> */}
          <div className="digi_button">
          <button
            style={{borderRadius:"0px", height:"45px", opacity:"0.9"}}
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
