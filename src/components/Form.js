import React from "react";


function Form() {
    return (
        <div>
            <form className="form_container">
          <div className="pan_container">
            <div className="form-group">
              <label htmlFor="pan">PAN</label>
              <input type="text" className="form-control" id="pan" placeholder="Enter your PAN" />
            </div>
          </div>

          <div className="checkbox_container">
            <div className="checkbox-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="terms" defaultChecked />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the <a href="#">terms & conditions</a>
                </label>
              </div>
            </div>

            <div className="checkbox-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="resident" defaultChecked />
                <label className="form-check-label" htmlFor="resident">
                  I agree that I'm a tax resident of India and not a Politically Exposed Person.
                </label>
              </div>
            </div>

            <div className="checkbox-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="cams" defaultChecked />
                <label className="form-check-label" htmlFor="cams">
                  I allow CAMS to use my PAN and Aadhaar details to complete my KYC process.
                </label>
              </div>
            </div>
          </div>
        </form>
        </div>
    );
}

export default Form