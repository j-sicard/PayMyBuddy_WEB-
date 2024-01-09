import Navbar from "../compenents/Navbar";
import React from "react";
import { Breadcrumb } from "flowbite-react";
import DefaultButton from "../compenents/DefaultButton";
import Table from "../compenents/Table";
import Withdraw from "../compenents/send_money_user_at_user/Withdraw_user";

export default function Transfer() {
  return (
    <div className="main_container" style={{ width: "1500px", margin: "auto" }}>
      <header className="w-12/12">
        <Navbar />
        <Breadcrumb
          aria-label="Default breadcrumb example"
          className="bg-gray-200 w-12/12 h-10 pl-5 pt-2"
        >
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/transfer">Transfer</Breadcrumb.Item>
        </Breadcrumb>
      </header>

      <div className="send_money_section w-9/12 m-auto flex justify-between pt-5">
        <h2>Send Money</h2>
        <DefaultButton
          largeur="250px"
          hauteur=""
          text="Add Connection"
          color="#3682E8"
        />
      </div>

      <div className="pay_section bg-gray-200 w-9/12 m-auto h-40 pt-5 flex items-center pb-5">
        <Withdraw />
      </div>
      <div className="w-9/12 m-auto mt-5">
        <h2 className="mb-5">My Transactions</h2>
        <Table />
      </div>
    </div>
  );
}
