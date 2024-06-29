import React from "react";
import Navbar from "./Navbar";
import ReturnButton from "./ReturnButton";
import Header from "./Header";
// import profilePhoto from "../assets/images/profilePhoto.png"
import { useEffect,useState } from "react";

function Details() {
    const userData = JSON.parse(localStorage.getItem("user_pan_data"));
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
            <Header title="Final review"></Header>
            <label className="detail_filler">One last step before we finish your KYC process.</label>
            <hr />
        <div className="details-container">    
        <div className="detail_filler">
                <div className="pan_and_name_container">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>Name</strong>
                        </div>
                        <div className="col-md-8">
                            {userData?.APP_F_NAME ?? "NA"}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>PAN Number</strong>
                        </div>
                        <div className="col-md-8">
                            {userData?.APP_PAN_NO ?? "NA"}
                        </div>
                </div>


                <div className="text-center">
                    <img src={profilePhoto} alt="Profile" className="profile-pic mb-3" />
                </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Mobile number</strong>
            </div>
            <div className="col-md-8">
                +91 {userData?.APP_MOB_NO ?? "NA"}
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Date of birth</strong>
            </div>
            <div className="col-md-8">
                {userData?.APP_DOB_DT ?? "NA"}
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Gender</strong>
            </div>
            <div className="col-md-8">
                {userData?.APP_GEN ?? "NA"} <i className="fa fa-pencil-alt"></i>
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Permanent address</strong>
            </div>
            <div className="col-md-8">
            {userData?.APP_PER_ADD1}, {userData?.APP_PER_STATE}, {userData?.APP_PER_CITY}, {userData?.APP_PER_PINCD}
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Correspondence address</strong>
            </div>
            <div className="col-md-8">
            {userData?.APP_COR_ADD1}, {userData?.APP_COR_STATE}, {userData?.APP_COR_CITY}, {userData?.APP_COR_PINCD}
            </div>
            </div>
            <div className="grey_detail_section">
                <div className="other_details">
                    <label className="other_details">Other Details  </label>
                

                <div className="col-md-4">
                    <strong>Email address</strong>
                </div>
                <div className="col-md-8">
                {userData?.APP_EMAIL ?? "NA"}
                </div>
                <div className="col-md-4">
                    <strong>marital Status</strong>
                </div>
                <div className="col-md-8">
                    Single
                </div>
                <div className="col-md-4">
                    <strong>Father's/Spouse</strong>
                </div>
                <div className="col-md-8">
                NA
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