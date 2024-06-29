import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Parent.css'; // Make sure the path to your CSS file is correct
import Navbar from './Navbar';
import Form from './Form';
import Button from './Button';
import Header from './Header';

function Parent() {
  //TODO :
  // Retrieve the PAN received from Stage 1 data from localStorage
  // localStorage.getItem("PAN", "BAMPM9343K")
  let [pan, setPan] = useState("BAMPM9343K")

  return (
    <div>
      <Navbar></Navbar>

      <div className="container">
        <Header title="KYC Modification"></Header>
        {/* <h2 className="mt-4">KYC Modification</h2> */}
        <p>Confirm your PAN below to fetch your details.</p>

        <Form data={{"panNo": pan}}></Form>
        <Button pan={pan}></Button>
      </div>
    </div>
  );
}

export default Parent;
