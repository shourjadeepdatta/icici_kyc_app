import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import ReturnButton from "./ReturnButton";
import Navbar from "./Navbar";
import Header from "./Header";
// import PersonalForm from "./PersonalForm";
// import Button from "./Button";
import { ReactComponent as UploadIcon } from "../assets/images/upload-cloud-svgrepo-com.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/delete-svgrepo-com.svg";
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Address() {
  function transformApiResponse(response) {
    // Check if response is valid JSON
    let responseObject;
    try {
      responseObject = JSON.parse(response);
    } catch (error) {
      console.error("Invalid JSON response:", error);
      return null;
    }

    // Transform keys
    const transformedResponse = {};
    for (const key in responseObject) {
      if (key.startsWith('@')) {
        const newKey = key.slice(1); // Remove the '@' character
        transformedResponse[newKey] = responseObject[key];
      } else {
        transformedResponse[key] = responseObject[key];
      }
    }

    return transformedResponse;
  }
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let willNotMove = true;


  // State variables
  const [isFileSelected, setIsFileSelected] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  // const [correspondenceOption, setCorrespondenceOption] = useState("");
  // const [uploadFileOption, setUploadFileOption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [updatedFormData, setUpdatedFormData] = useState({});
  const [isPermanentAadhaarAddress, setIsPermanentAadhaarAddress] = useState(false);
  const [permanentAddressValue, setPermanentAddressValue] = useState("");
  const [correspondenceAddressValue, setCorrespondenceAddressValue] = useState("");
  const [isPerAddressFieldChosen, setIsPerAddressFieldChosen] = useState(false);
  const [isCorAddressFieldChosen, setIsCorAddressFieldChosen] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  // const [isPermanentKraAddress, setIsPermanentKraAddress] = useState(false);

  // const user_data = JSON.parse(localStorage.getItem("updated_user_pan_data"));
  const user_data = JSON.parse(localStorage.getItem("updated_form_data"));
  // const aadhaar_data  = JSON.parse(localStorage.getItem("Aadhaar_address"));
  let [aadhaar_data, setAadhaarData] = useState({});
  let [corrData, setCorrData] = useState(user_data)
  const updated_user_data = { ...user_data };
  console.log("updated_user_data->>>", updated_user_data);
  // Effect to load form data from localStorage on component mount
  useEffect(() => {
    // setFormData({
    //   selectedOption: user_data?.selectedOption ?? "",
    //   correspondenceOption: user_data?.correspondenceOption ?? "",
    //   uploadFileOption: user_data?.uploadFileOption ?? "",
    //   selectedFile: user_data?.selectedFile ?? null,
    // });
    console.log("form data is->>", formData);

  }, [formData]);

  useEffect(() => {
    
    setFormData(updated_user_data);
    setUpdatedFormData(updated_user_data);
  }, []);

  useEffect(() => {
    console.log("corrData setting as ->>>>>>>>>>>>",corrData);
  }, [corrData]);

  useEffect(() => {
    console.log("correspondence address option change", correspondenceAddressValue);
  }, [correspondenceAddressValue])

  // Function to update formData state and localStorage on form field change
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log("event->>", event.target.value, event.target.name);
    setUpdatedFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setCorrData((prevCorrData)=>({
      ...prevCorrData,
      [name]:value,
    }));
  };

  const getDigiAddress = async () => {
    console.log("hitting the api")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const NewrequestOptions = {
      method: "POST",
      headers: myHeaders,
      // body: raw,
      redirect: "follow"
    };

    try {
      const add_response = await fetch(`https://legacyclients.kyc.getkwikid.com/dev/kyc/api/v1/get_digilocker_data/${atob(localStorage.getItem("p"))}`, NewrequestOptions);
      const digi_address_response = await add_response.json();
      console.log(digi_address_response["aadhaarDetails"]["Certificate"]["CertificateData"]["KycRes"]["UidData"]["Poa"])
      const digi_address_object = digi_address_response["aadhaarDetails"]["Certificate"]["CertificateData"]["KycRes"]["UidData"]["Poa"];
      const transformedResponse = transformApiResponse(JSON.stringify(digi_address_object));
      localStorage.setItem("Aadhaar_address", JSON.stringify(transformedResponse));
    }
    catch (e) {
      console.error('Error fetching digi address data:', e);
    }

    aadhaar_data = JSON.parse(localStorage.getItem("Aadhaar_address"));
    setAadhaarData(aadhaar_data);
    console.log("aadahr adnadnwdn->>>", aadhaar_data);
  }

  const handlePerAddressInputChange = (event) => {
    event.preventDefault();
    let permanenetAddress = {}
    const perAdd = event.target.value;
    setPermanentAddressValue(event.target.value);
    if (perAdd.includes("1.")) {
      setIsPerAddressFieldChosen(true);
      permanenetAddress["APP_PER_ADD1"] = aadhaar_data.house;
      permanenetAddress["APP_PER_STATE"] = aadhaar_data.state;
      permanenetAddress["APP_PER_CITY"] = aadhaar_data.subdist;
      permanenetAddress["APP_PER_PINCD"] = aadhaar_data.pc;

      localStorage.setItem("perAddress", JSON.stringify(permanenetAddress));
    }
    else {
      setIsPerAddressFieldChosen(false);
      permanenetAddress["APP_PER_ADD1"] = user_data.APP_PER_ADD1;
      permanenetAddress["APP_PER_STATE"] = user_data.APP_PER_STATE;
      permanenetAddress["APP_PER_CITY"] = user_data.APP_PER_CITY;
      permanenetAddress["APP_PER_PINCD"] = user_data.APP_PER_PINCD;

      localStorage.setItem("perAddress", JSON.stringify(permanenetAddress));
    }
    // if(event.target.value === "Address as per KRA"){
    //   setIsPermanentAadhaarAddress(false);
    // }
    // const { name, value } = event.target;
    // console.log("event->>",event.target.value,event.target.name);
    // setUpdatedFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));
  };

  const handleCorAddressInputChange = (event) => {
    event.preventDefault();
    const corrAdd = event.target.value;
    let correspondenceAddress = {}
    setCorrespondenceAddressValue(event.target.value);
    if (corrAdd.includes("1.")) {
      setIsCorAddressFieldChosen(true);
      correspondenceAddress["APP_COR_ADD1"] = aadhaar_data.house;
      correspondenceAddress["APP_COR_STATE"] = aadhaar_data.state;
      correspondenceAddress["APP_COR_CITY"] = aadhaar_data.subdist;
      correspondenceAddress["APP_COR_PINCD"] = aadhaar_data.pc;
      setCorrData((prevData) => {
        const corrData = { ...prevData, APP_COR_ADD1: aadhaar_data.house, APP_COR_STATE: aadhaar_data.state, APP_COR_CITY: aadhaar_data.subdist, APP_COR_PINCD: aadhaar_data.pc }

        return corrData
      });

      setUpdatedFormData((prevFormData) => ({
        ...prevFormData,APP_COR_ADD1: aadhaar_data.house, APP_COR_STATE: aadhaar_data.state, APP_COR_CITY: aadhaar_data.subdist, APP_COR_PINCD: aadhaar_data.pc
      }));

      console.log("After updating from aadhaar address->>>>>>>>",corrData);
      localStorage.setItem("corrAddress", JSON.stringify(correspondenceAddress));
    }
    else {
      setIsCorAddressFieldChosen(false);
      correspondenceAddress["APP_COR_ADD1"] = user_data.APP_COR_ADD1;
      correspondenceAddress["APP_COR_STATE"] = user_data.APP_COR_STATE;
      correspondenceAddress["APP_COR_CITY"] = user_data.APP_COR_CITY;
      correspondenceAddress["APP_COR_PINCD"] = user_data.APP_COR_PINCD;

      setCorrData((prevData) => ({ ...prevData, APP_COR_ADD1: correspondenceAddress["APP_COR_ADD1"], APP_COR_STATE: correspondenceAddress["APP_COR_STATE"], APP_COR_CITY: correspondenceAddress["APP_COR_CITY"], APP_COR_PINCD: correspondenceAddress["APP_COR_PINCD"] }));

      setUpdatedFormData((prevFormData) => ({ ...prevFormData, APP_COR_ADD1: correspondenceAddress["APP_COR_ADD1"], APP_COR_STATE: correspondenceAddress["APP_COR_STATE"], APP_COR_CITY: correspondenceAddress["APP_COR_CITY"], APP_COR_PINCD: correspondenceAddress["APP_COR_PINCD"] }));

      console.log("After updating from corr address->>>>>>>>",corrData);
      localStorage.setItem("corrAddress", JSON.stringify(correspondenceAddress));
    }
    // if(event.target.value === "Address as per KRA"){
    //   setIsPermanentAadhaarAddress(false);
    // }
    // const { name, value } = event.target;
    // console.log("event->>",event.target.value,event.target.name);
    // setUpdatedFormData((prevFormData) => ({
    //   ...prevFormData,
    //   [name]: value,
    // }));
  };

  const moveToNextPage = () => {
    if (!(isPerAddressFieldChosen || isCorAddressFieldChosen)) {
      willNotMove = true;
    }
    else {
      willNotMove = false;
    }
    console.log("going to take photo now");
    console.log("set show variable->>", showErrorMessage);
    // setFormData()
    // Save updated data to localStorage under a new key
    if (!willNotMove) {
      localStorage.setItem("updated_form_data", JSON.stringify(updatedFormData));
      localStorage.setItem("corrAddress", JSON.stringify(corrData));
      navigate("/takePhoto");
    }

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

  useEffect(() => {
    console.log("is the button enabled->>", isPerAddressFieldChosen);
    console.log("is the button enabled->>", isCorAddressFieldChosen);
  }, [isPerAddressFieldChosen, isCorAddressFieldChosen])


  useEffect(() => {
    getDigiAddress();
  }, [])


  return (
    <div>
      <Navbar />
      <div className="container">
        <Header title="Address details" />

        {willNotMove && (<div className="liveliness_instruction">
          <label className="liveliness_desc" style={{ color: "red", marginLeft: "-5px" }}>Atleast one field chosen should be aadhaar field</label>
        </div>)}
        <div className="dropdown_container">
          <div style={{ width: "100%", marginTop: "20px", paddingRight: "20px" }} className="dropdown_title">
            <label className="permanent_address_label">Permanent Address</label>
          </div>
          <select
            style={{ height: "35px" }}
            name="selectedOption"
            value={permanentAddressValue}
            className="select_bar input_style"
            onChange={handlePerAddressInputChange}
          >
            <option>Select an option</option>
            <option>1. {aadhaar_data?.house}, {aadhaar_data?.street}, {aadhaar_data?.loc}, {user_data?.pc}</option>
            <option>2. {user_data?.APP_PER_ADD1}, {user_data?.APP_PER_STATE}, {user_data?.APP_PER_CITY}, {user_data?.APP_PER_PINCD}</option>
          </select>

          {/* {permanentAddressValue === "Address as per Aadhaar" ? (
          <div style={{width:"100%"}} className="display_address_container">
            <label style={{opacity:"0.8"}} className="display_address">
              {user_data?.APP_PER_ADD1}, {user_data?.APP_PER_STATE},{" "}
              {user_data?.APP_PER_CITY}, {user_data?.APP_PER_PINCD}
            </label>
          </div>
        ) : permanentAddressValue === "Address as per KRA" ? (
          <div style={{width:"100%"}} className="display_address_container">
            <label style={{opacity:"0.8"}} className="display_address">
              {user_data?.APP_COR_ADD1}, {user_data?.APP_COR_STATE},{" "}
              {user_data?.APP_COR_CITY}, {user_data?.APP_COR_PINCD}
            </label>
          </div>
        )} */}
          {permanentAddressValue.includes("1.") ? (
            <label style={{ opacity: "0.8" }} className="display_address">
              {aadhaar_data?.house}, {aadhaar_data?.street}, {aadhaar_data?.loc}, {user_data?.pc}
            </label>
          ) : permanentAddressValue.includes("2.") ? (
            <label style={{ opacity: "0.8" }} className="display_address">
              {user_data?.APP_PER_ADD1}, {user_data?.APP_PER_STATE}, {user_data?.APP_PER_CITY}, {user_data?.APP_PER_PINCD}
            </label>
          ) : null}


          <div className="dropdown_title">
            <label className="correspondence_address_label">
              Correspondence Address
            </label>
          </div>
          <select
            style={{ height: "35px" }}
            name="correspondenceOption"
            value={correspondenceAddressValue}
            className="select_bar input_style"
            onChange={handleCorAddressInputChange}
          >
            <option>Select an option</option>
            <option>1. {aadhaar_data?.house ?? "NA"},{aadhaar_data?.loc ?? "NA"},{aadhaar_data?.subdist ?? "NA"},{aadhaar_data?.state ?? "NA"},{aadhaar_data?.pc ?? ""}</option>
            <option>2. {updated_user_data?.APP_COR_ADD1 ?? "NA"},{updated_user_data?.APP_COR_ADD2 ?? "NA"},{updated_user_data?.APP_COR_CITY ?? "NA"},{updated_user_data?.APP_COR_STATE ?? "NA"},{user_data?.APP_COR_PINCD ?? ""}</option>
            <option>New Address</option>
          </select>

          {correspondenceAddressValue.includes("1.") && (
            <div>
              <div>
                <div className="form_container_v2">
                  <div className="mobile_container">
                    <div style={{ paddingTop: "10px", paddingRight: "5px" }} className="form-group">
                      <label htmlFor="email">Address Line 1</label>
                      <input
                        name="APP_COR_ADD1"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_ADD1 ?? "NA"}
                      />
                    </div>
                  </div>

                  <div className="email_container">
                    <div className="form-group">
                      <label htmlFor="email">Address Line 2</label>
                      <input
                        name="APP_COR_ADD2"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_ADD2 ?? "NA"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="form_container_v2">
                  <div className="mobile_container">
                    <div style={{ marginTop: "10px" }} className="form-group">
                      <label htmlFor="email">City</label>
                      <input
                        name="APP_COR_CITY"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_CITY ?? "NA"}
                      />
                    </div>
                  </div>

                  <div className="email_container">
                    <div className="form-group">
                      <label htmlFor="email">State</label>
                      <input
                        name="APP_COR_STATE"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_STATE ?? "NA"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ margin: "0px", paddingTop: "10px" }} className="pincode_container">
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    className="form-control input_style"
                    id="pincode"
                    name="APP_COR_PINCD"
                    disabled={true}
                    defaultValue={corrData?.APP_COR_PINCD ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* <div className="dropdown_title">
            <label className="address_prood_label">Choose the address proof below</label>
          </div>
          <select
            style={{ width: "98%" }}
            name="uploadFileOption"
            value={updatedFormData.uploadFileOption}
            className="select_bar input_style"
            onChange={handleInputChange}
          >
            <option>Select an option</option>
            <option>Gas receipt</option>
            <option>Electricity Bill</option>
            <option>Aadhaar Card</option>
          </select> */}
            </div>
          )}
          {correspondenceAddressValue.includes("2.") && (
            <div>
              <div>
                <div className="form_container_v2">
                  <div className="mobile_container">
                    <div style={{ paddingTop: "10px", paddingRight: "5px" }} className="form-group">
                      <label htmlFor="email">Address Line 1</label>
                      <input
                        name="APP_COR_ADD1"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_ADD1 ?? "NA"}
                      />
                    </div>
                  </div>

                  <div className="email_container">
                    <div className="form-group">
                      <label htmlFor="email">Address Line 2</label>
                      <input
                        name="APP_COR_ADD2"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_STATE ?? "NA"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="form_container_v2">
                  <div className="mobile_container">
                    <div style={{ marginTop: "10px" }} className="form-group">
                      <label htmlFor="email">City</label>
                      <input
                        name="APP_COR_CITY"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_CITY ?? "NA"}
                      />
                    </div>
                  </div>

                  <div className="email_container">
                    <div className="form-group">
                      <label htmlFor="email">State</label>
                      <input
                        name="APP_COR_STATE"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                        disabled={true}
                        defaultValue={corrData?.APP_COR_STATE ?? "NA"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ margin: "0px", paddingTop: "10px" }} className="pincode_container">
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    className="form-control input_style"
                    id="pincode"
                    name="APP_COR_PINCD"
                    disabled={true}
                    defaultValue={corrData?.APP_COR_PINCD ?? ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* <div className="dropdown_title">
            <label className="address_prood_label">Choose the address proof below</label>
          </div>
          <select
            style={{ width: "98%" }}
            name="uploadFileOption"
            value={updatedFormData.uploadFileOption}
            className="select_bar input_style"
            onChange={handleInputChange}
          >
            <option>Select an option</option>
            <option>Gas receipt</option>
            <option>Electricity Bill</option>
            <option>Aadhaar Card</option>
          </select> */}
            </div>
          )}
          {correspondenceAddressValue === "New Address" && (
            <div>
              <div>
                <div className="form_container_v2">
                  <div className="mobile_container">
                    <div style={{ paddingTop: "10px", paddingRight: "5px" }} className="form-group">
                      <label htmlFor="email">Address Line 1</label>
                      <input
                        name="APP_COR_ADD1"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                      />
                    </div>
                  </div>

                  <div className="email_container">
                    <div className="form-group">
                      <label htmlFor="email">Address Line 2</label>
                      <input
                        name="APP_NEW_ADD2"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="form_container_v2">
                  <div className="mobile_container">
                    <div style={{ marginTop: "10px" }} className="form-group">
                      <label htmlFor="email">City</label>
                      <input
                        name="APP_NEW_CITY"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                      />
                    </div>
                  </div>

                  <div className="email_container">
                    <div className="form-group">
                      <label htmlFor="email">State</label>
                      <input
                        name="APP_NEW_STATE"
                        onChange={handleInputChange}
                        type="text"
                        className="form-control input_style"
                        id="pan"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ margin: "0px", paddingTop: "10px" }} className="pincode_container">
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="text"
                    className="form-control input_style"
                    id="pincode"
                    name="APP_NEW_PINCD"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="dropdown_title">
                <label className="address_prood_label">Choose the address proof below</label>
              </div>
              <select
                style={{ width: "98%" }}
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
            </div>)}

          {/* <div className="digi_button">
          <Button
            onClick={moveToNextPage}
            className="btn-success"
            disabled={!isFileSelected} // Disable button if file is not selected
          >
            Continue
          </Button> */}
          <div className="digi_button">
            {(isPerAddressFieldChosen || isCorAddressFieldChosen) && (<button
              style={{ borderRadius: "0px", height: "45px", opacity: "0.9" }}
              onClick={moveToNextPage}
              type="submit"
              className="btn btn-success btn-block mt-3"
            >
              Continue
            </button>)}
            {!(isPerAddressFieldChosen || isCorAddressFieldChosen) && (<button
              style={{ borderRadius: "0px", height: "45px", opacity: "0.9", backgroundColor: "grey" }}
              onClick={moveToNextPage}
              type="submit"
              disabled={true}
              className="btn btn-success btn-block mt-3"
            >
              Continue
            </button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
