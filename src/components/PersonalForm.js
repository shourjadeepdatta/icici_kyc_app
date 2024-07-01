import React from "react";
import {ReactComponent as EditIcon} from "../assets/images/edit-2-svgrepo-com.svg";

function PersonalForm(props) {
    return (
        <div>
            <div>
                <form className="form_container_v2">
                <div style={{marginTop:"20px"}} className="mobile_container">
                    <div className="form-group">
                        <label style={{paddingBottom:"4px"}}htmlFor="email">{props.firstTitle}</label>
                        <input type="text" className="form-control input_style" id="pan" defaultValue={"+91 "+props.value1} />
                    </div>
                </div>

                <div style={{marginBottom:"30px"}} className="email_container">
                    <div className="form-group">
                        <label style={{paddingBottom:"4px"}}htmlFor="email">{props.secondTitle}</label>
                        <input type="text" className="form-control input_style" id="pan" defaultValue={props.value2} />
                    </div>
                </div>
            </form>
            </div>
        </div>
    );
}

export default PersonalForm;