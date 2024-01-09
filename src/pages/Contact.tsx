import React from "react";
import Navbar from "../compenents/Navbar";
import { Breadcrumb } from "flowbite-react";

export default function Contact() {
  return (
    <div className="main_container" style={{ width: "1500px", margin: "auto" }}>
      <header className="w-12/12">
        <Navbar />
        <Breadcrumb
          aria-label="Default breadcrumb example"
          className="bg-gray-200 w-12/12 h-10 pl-5 pt-2"
        >
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/contact">Contact</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <div>
        <div
          className="contact-section mt-10 bg-gray-200"
          style={{ padding: "50px 0 50px 50px", fontSize: "23px" }}
        >
          <p className="mb-5">
            Adress: 87 Boulevard de Courcelles 75008 Paris, France
          </p>
          <p className="mb-5">Phone Number: 01 42 27 43 04</p>
          <p className="mb-5">Email: PayMyBuddy@Gmail.com</p>
          <p className="mb-5">Site: https://www.PayMyByddy.com</p>
        </div>
      </div>
    </div>
  );
}
