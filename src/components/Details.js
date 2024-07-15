import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { useEffect,useState,useRef } from "react";
import { ReactComponent as EditIcon } from "../assets/images/green_edit_icon.svg";
import Modal from "./Modal";

function Details() {

    const userData = JSON.parse(localStorage.getItem("updated_form_data"));
    const per_address = JSON.parse(localStorage.getItem("perAddress"));
    const cor_address = JSON.parse(localStorage.getItem("corrAddress"));
    const genderMapper = {
        "M":"Male",
        "F":"Female",
        "O":"Other"
    }
    const reverseGenderMapper = {
        "Male":"M",
        "Female":"F",
        "Other":"O"
    }
    const maritalStatusMapper = {
        "02":"Unmarried",
        "01":"Married",
        "03":"Others"
    }
    const reverseMaritalStatusMapper = {
        "Unmarried":"02",
        "Married":"01",
        "Others":"03"
    }
    console.log("user_data inside details component",userData);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [forGender,setForGender] = useState(false);
    const [forMarital,setForMarital] = useState(false);
    const [maritalStatusValue,setMaritalStatusValue] = useState("");
    const [genderValue,setGenderValue] = useState("");


    const modalRef = useRef();


    const openModalForGender = () => {
        setShowModal(true);
        setForGender(true);
        setForMarital(false);
    };

    const openModalForMaritalStatus = () => {
        setShowModal(true);
        setForMarital(true);
        setForGender(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        // Load the image from localStorage
        const savedImage = localStorage.getItem('capturedImage');
        if (savedImage) {
            setProfilePhoto(savedImage);
        }
        console.log("applicant gender from storage->>",userData?.APP_GEN);
        // setGenderValue(userData?.APP_GEN);
        setGenderValue(genderMapper[userData?.APP_GEN]);
        console.log("applicant marital status from storage ->>",userData?.APP_MAR_STATUS);
        // setMaritalStatusValue(userData?.APP_MAR_STATUS);
        setMaritalStatusValue(maritalStatusMapper[userData?.APP_MAR_STATUS]);
    }, []);

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showModal]);

    const handleMaritalStatusChange = (e) => {
        let newMaritalStatus = e.target.value;
        setMaritalStatusValue(newMaritalStatus);
        console.log("marital status after selection->>>",e.target.value);
        console.log("marital status after selection->>>",maritalStatusValue);
        userData["APP_MAR_STATUS"] = reverseMaritalStatusMapper[e.target.value];
        
        localStorage.setItem("updated_form_data",JSON.stringify(userData));
    }

    const goToEsign = () => {
        const esignUrl = "https://kwikid.kyc.priv.getkwikid.com/kyc/api/v1/esign?session_id=030f6a9f-ac6f-4d0b-b883-62c1e4293004&user_id=ICICI_33389917"
        window.location.href = esignUrl;
        // const newTab = window.open(esignUrl, '_blank');
        // localStorage.setItem('isReturning', 'true');
    }

    
    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <Header title="Final review"></Header>
            </div>
            <label style={{paddingLeft:"10px", paddingRight:"10px"}} className="detail_filler">One last step before we finish your KYC process.</label>
            <hr />
        <div style={{paddingLeft:"10px", paddingRight:"10px"}} className="details-container">    
        <div className="detail_filler">
            <div className="pan_name_img_continer_combo">
                <div className="pan_and_name_container">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="title_texts" style={{ opacity: 0.7}}>Name</div>
                        </div>
                        <div className="col-md-8">
                            {userData?.APP_F_NAME ?? "NA"}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <div className="title_texts" style={{ opacity: 0.7}}>PAN Number</div>
                        </div>
                        <div className="col-md-8">
                            {userData?.APP_PAN_NO ?? "NA"}
                        </div>
                    </div>
            
                </div>
                <div className="img_container">
                    <div className="text-center">
                        <img src={profilePhoto} alt="Profile" className="profile-pic mb-3" />
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-4">
                    <div style={{ opacity: 0.7}}>Mobile number</div>
                    <div className="col-md-8">
                        +91 {userData?.APP_MOB_NO ?? "NA"}
                    </div>
                </div>
            </div>

            <div className="combo_container">
                <div className="dob_container">
                    <div className="col-md-4">
                        <div style={{ opacity: 0.7}}>Date of birth</div>
                    </div>
                    <div className="col-md-8">
                        {userData?.APP_DOB_DT ?? "NA"}
                    </div>
                </div>

                <div className="gender_container">
                    <div className="col-md-4">
                        <div style={{ opacity: 0.7}}>Gender</div>
                    </div>
                    <div className="col-md-8">
                        {genderValue} <EditIcon onClick={openModalForGender} className="details_edit_icon"/>
                    </div>
                </div>
            </div>

            <div className="row mb-3 address_block">
                <div className="col-md-4">
                    <div style={{ opacity: 0.7}}>Permanent address</div>
                </div>
                <div className="col-md-8">
                {per_address?.APP_PER_ADD1}, {per_address?.APP_PER_STATE}, {per_address?.APP_PER_CITY}, {per_address?.APP_PER_PINCD}
                </div>
            </div>

            <div className="row mb-3 address_block">
                <div className="col-md-4">
                    <div style={{ opacity: 0.7}}>Correspondence address</div>
                </div>
                <div className="col-md-8">
                {cor_address?.APP_COR_ADD1}, {cor_address?.APP_COR_STATE}, {cor_address?.APP_COR_CITY}, {cor_address?.APP_COR_PINCD}
                </div>
            </div>

            <div className="grey_detail_section">
                <div className="other_details">
                    <div className="other_details_header">
                        <label><strong>OTHER DETAILS</strong></label>
                    </div>
                    

                    <div className="col-md-4 title_texts">
                        <div style={{ opacity: 0.7}}>Email address</div>
                        <div className="col-md-8">
                            {userData?.APP_EMAIL ?? "NA"}
                        </div>
                    </div>
                    
                    <div className="col-md-4 title_texts">
                        <div style={{ opacity: 0.7 }}>Marital Status</div>
                        <div className="col-md-8">
                            {maritalStatusValue} <EditIcon onClick={openModalForMaritalStatus} className="details_edit_icon"/>
                        </div>
                        
                    </div>
                    
                    <div className="col-md-4 title_texts">
                        <div style={{ opacity: 0.7 }}>Father's/Spouse</div>
                        <div className="col-md-8">
                            NA
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>
        </div>
        {(showModal && forGender) && (<div className="option_dropdown_container fixed_div" ref={modalRef}>
            <Header className="dropdown_header" isSlider={true} title="Select Your Gender"></Header>
            <div className="button_plus_options_container">
                <div className="option_container">
                    <div onClick={()=>{
                        setGenderValue("Male");
                        userData["APP_GEN"] = "Male";
                        localStorage.setItem("updated_form_data",JSON.stringify(userData));
                    }} className="gender_option">Male</div>
                    <div onClick={()=>{
                        setGenderValue("Female");
                        userData["APP_GEN"] = reverseGenderMapper["Female"];
                        localStorage.setItem("updated_form_data",JSON.stringify(userData));
                    }} className="gender_option">Female</div>
                    <div onClick={()=>{
                        setGenderValue("Other");
                        userData["APP_GEN"] = "Other";
                        localStorage.setItem("updated_form_data",JSON.stringify(userData));
                    }} className="gender_option">Other</div>
                </div>
                <div className="button_container">
                    <button onClick={closeModal} className="btn btn-success btn-block">Confirm</button>
                </div>
            </div>      
        </div>)}

        {(showModal && forMarital) && (
                <div className="option_dropdown_container fixed_div" ref={modalRef}>
                <h4 className="dropdown_header_marital">Select Your Marital Status</h4>
                <div className="button_plus_options_container">
                    <div className="option_container_marital_status">
                        <div className="dropdown_title">
                            <label className="correspondence_address_label">
                                Marital Status
                            </label>
                        </div>
                        <div className="marital_status_dropdown">
                            <select
                            style={{height:"35px"}}
                            name="maritalStatusOption"
                            value={maritalStatusValue}
                            className="select_bar input_style"
                            onChange={handleMaritalStatusChange}
                            >
                                <option>Select Gender</option>
                                <option>Unmarried</option>
                                <option>Married</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="button_container">
                        <button onClick={closeModal} className="btn btn-success btn-block">Confirm</button>
                    </div>
                </div>      
            </div>
        )}
        {/* <Modal show={showModal} onClose={closeModal} /> */}
        {!showModal && (<div className="fixed_div">
                <p>By continuing you agree to CAMS KYC <a href="#">T&C</a> and <a href="#">Privacy Policy</a></p>
                <button onClick={goToEsign} className="btn btn-success btn-block">Looks good! Continue</button>
        </div>)}
        </div>
    );
}


export default Details;