import React from "react";
import iciciLogo from "../assets/images/pngwing.com1.png"

function Navbar() {
        return (
        <div>
            <nav className="navbar navbar-light">
                <a className="navbar-brand" href="#">
                <img src={iciciLogo} alt="ICICI" />
                </a>
                <span className="security_logo">SECURE <i className="fa fa-lock"></i></span>
            </nav>
        </div>
    );
}

export default Navbar;