import React, { useState } from "react";

function Form({ data , setIsPanValidFun}) {
  const [pan, setPan] = useState(data?.panNo || "");
  const [error, setError] = useState("");
  // const [isPanInvalid, setIsPanValid] = useState(true);

  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const handlePanChange = (e) => {
    const value = e.target.value;
    setPan(value);

    if (!panRegex.test(value)) {
      setIsPanValidFun(false);
      setError("Please enter a valid PAN");
    } else {
      setIsPanValidFun(true);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      alert("Please fix the errors before submitting the form");
    } else {
      // Perform form submission
      alert("Form submitted successfully");
    }
  };

  return (
    <div>
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="pan_container">
          <div className="form-group">
            <label style={{ fontSize: "13px" }} htmlFor="pan">
              PAN
            </label>
            <input
              type="text"
              className="form-control input_style"
              id="pan"
              placeholder="Enter your PAN"
              value={pan}
              onChange={handlePanChange}
            />
            {error && <span style={{ color: "red", fontSize: "12px" }}>{error}</span>}
          </div>
        </div>

        <div className="checkbox_container">
          <div className="checkbox-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="terms" defaultChecked readOnly />
              <label style={{ opacity: "0.7" }} className="form-check-label" htmlFor="terms">
                I agree to the <a style={{ color: "black", opacity: "0.7" }} href="#">terms & conditions</a>
              </label>
            </div>
          </div>

          <div className="checkbox-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="resident" defaultChecked readOnly />
              <label style={{ opacity: "0.7" }} className="form-check-label" htmlFor="resident">
                I agree that I'm a tax resident of India and not a Politically Exposed Person.
              </label>
            </div>
          </div>

          <div className="checkbox-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="cams" defaultChecked readOnly />
              <label style={{ opacity: "0.7" }} className="form-check-label" htmlFor="cams">
                I allow CAMS to use my PAN and Aadhaar details to complete my KYC process.
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
