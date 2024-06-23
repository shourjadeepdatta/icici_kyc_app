import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Parent.css'; // Make sure the path to your CSS file is correct
import Navbar from './Navbar';
import Form from './Form';
import Button from './Button';
import Header from './Header';

function Parent() {
  return (
    <div>
      <Navbar></Navbar>

      <div className="container">
        <Header title="KYC Modification"></Header>
        {/* <h2 className="mt-4">KYC Modification</h2> */}
        <p>Confirm your PAN below to fetch your details.</p>

        <Form></Form>
        <Button></Button>
      </div>
    </div>
  );
}

export default Parent;
