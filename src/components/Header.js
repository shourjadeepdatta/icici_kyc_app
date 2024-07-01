import React from "react";


function Header(props) {
    return (
        <div>
            <div className="header_dialogue">
                <h1>{props.title}</h1>
            </div>
        </div>
    );
}

export default Header;
