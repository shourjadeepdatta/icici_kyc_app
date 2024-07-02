import React from "react";


function Header(props) {
    return (
        <div>
            <div className="header_dialogue">
                {props?.isSlider ? (
                    <h4 style={{marginBottom:"30px"}}>{props.title}</h4>
                ) : (
                    <h1>{props.title}</h1>
                )}
            </div>
        </div>
    );
}

export default Header;
