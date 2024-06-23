import React from "react";
import Navbar from "./Navbar";
import ReturnButton from "./ReturnButton";
import Header from "./Header";
import profilePhoto from "../assets/images/profilePhoto.png"

function Details() {
    return (
        <div>
            <Navbar></Navbar>
            <ReturnButton></ReturnButton>
            <Header title="Final review"></Header>
            <label className="detail_filler">One last step before we finish your KYC process.</label>
            <hr />
            
        <div className="detail_filler">
                <div className="pan_and_name_container">
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>Name</strong>
                        </div>
                        <div className="col-md-8">
                            Harsh Arakeri
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <strong>PAN Number</strong>
                        </div>
                        <div className="col-md-8">
                            STSPN8623Q
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
                +91 80450 33188
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Date of birth</strong>
            </div>
            <div className="col-md-8">
                29 Apr 1980
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Gender</strong>
            </div>
            <div className="col-md-8">
                Male <i className="fa fa-pencil-alt"></i>
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Permanent address</strong>
            </div>
            <div className="col-md-8">
                26, Ajia City, 3rd Dawara street (N), Ludhiana, Punjab, Pincode-160079
            </div>
            </div>

            <div className="row mb-3">
            <div className="col-md-4">
                <strong>Correspondence address</strong>
            </div>
            <div className="col-md-8">
                26, Ajia City, 3rd Dawara street (N), Ludhiana, Punjab, Pincode-160079
            </div>
            </div>
            <div className="other_details">

            </div>
            <hr />

            <p>By continuing you agree to CAMS KYC <a href="#">T&C</a> and <a href="#">Privacy Policy</a></p>
            <button className="btn btn-success btn-block">Looks good! Continue</button>
        </div>

        </div>
    );
}


export default Details;