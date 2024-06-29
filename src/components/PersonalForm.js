import React from "react";


function PersonalForm(props) {
    return (
        <div>
            <div>
                <form className="form_container_v2">
            <div className="mobile_container">
                <div className="form-group">
                <label htmlFor="pan">{props.firstTitle}</label>
                <input type="text" className="form-control input_style" id="pan" defaultValue={props.value1} />
                </div>
                </div>

            <div className="email_container">
                <div className="form-group">
                    <label htmlFor="pan">{props.secondTitle}</label>
                    <input type="text" className="form-control input_style" id="pan" defaultValue={props.value2} />
                </div>
            </div>
            </form>
            </div>
        </div>
    );
}

export default PersonalForm;