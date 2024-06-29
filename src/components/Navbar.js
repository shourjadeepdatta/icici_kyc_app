import React from "react";
import iciciLogo from "../assets/images/pngwing.com1.png";
import { ReactComponent as MyLogo } from '../assets/images/lock.svg';

function Navbar() {
        return (
        <div>
            <nav className="navbar navbar-light">
                <a className="navbar-brand" href="#">
                <img src={iciciLogo} alt="ICICI" />
                </a>
                <span className="parent_span">
                <span className="security_logo">SECURE <MyLogo className="logo_class" width="12px" height="12px"/></span>
                </span>
            </nav>
        </div>
    );
}

export default Navbar;