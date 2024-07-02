import React from 'react';
import { useRef,useState,useEffect } from 'react';
import Header from './Header';
import './Modal.css'; // Ensure you have this CSS file



function Modal({showModal}) {
    // const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();

    return (
        <div>
            {showModal && (<div className="option_dropdown_container fixed_div" ref={modalRef}>
                <Header className="dropdown_header" isSlider={true} title="Select Your Gender"></Header>
                <div className="button_plus_options_container">
                    <div className="option_container">
                        <div className="gender_option">Male</div>
                        <div className="gender_option">Female</div>
                        <div className="gender_option">Other</div>
                    </div>
                    <div className="button_container">
                        <button className="btn btn-success btn-block">Confirm</button>
                    </div>
                </div>      
            </div>)}
        </div>
    );
};

export default Modal;
