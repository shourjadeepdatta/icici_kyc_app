import React from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { useEffect,useState } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Details() {
    const userData = JSON.parse(localStorage.getItem("updated_form_data"));
    console.log("user_data inside details component",userData);
    const [profilePhoto, setProfilePhoto] = useState(null);

    useEffect(() => {
        // Load the image from localStorage
        const savedImage = localStorage.getItem('capturedImage');
        if (savedImage) {
            setProfilePhoto(savedImage);
        }
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <Header title="Final review"></Header>
            </div>
            <label className="detail_filler">One last step before we finish your KYC process.</label>
            <hr />
        <div className="details-container">    
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
                        {userData?.APP_GEN ?? "NA"} <i className="fa fa-pencil-alt"></i>
                    </div>
                </div>
            </div>

            <div className="row mb-3 address_block">
                <div className="col-md-4">
                    <div style={{ opacity: 0.7}}>Permanent address</div>
                </div>
                <div className="col-md-8">
                {userData?.APP_PER_ADD1}, {userData?.APP_PER_STATE}, {userData?.APP_PER_CITY}, {userData?.APP_PER_PINCD}
                </div>
            </div>

            <div className="row mb-3 address_block">
                <div className="col-md-4">
                    <div style={{ opacity: 0.7}}>Correspondence address</div>
                </div>
                <div className="col-md-8">
                {userData?.APP_COR_ADD1}, {userData?.APP_COR_STATE}, {userData?.APP_COR_CITY}, {userData?.APP_COR_PINCD}
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
                        <div style={{ opacity: 0.7 }}>marital Status</div>
                        <div className="col-md-8">
                            Single
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
        <div className="fixed_div">
                <p>By continuing you agree to CAMS KYC <a href="#">T&C</a> and <a href="#">Privacy Policy</a></p>
                <button className="btn btn-success btn-block">Looks good! Continue</button>
        </div>
        </div>
    );
}


export default Details;