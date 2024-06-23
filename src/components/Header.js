import React from "react";


function Header(props) {
    return (
        <div>
            <div className="header_dialogue">
                <h3>{props.title}</h3>
            </div>
        </div>
    );
}

export default Header;