import React, { useEffect } from "react";
import Navbar from "../compenents/Navbar";
import { Breadcrumb } from "flowbite-react";

const Home = () => {
  useEffect(() => {
    // Récupérer l'URL actuelle
    const currentUrl = window.location.href;

    // Vérifier si l'URL contient un paramètre userId
    if (currentUrl.includes("?userId=")) {
      // Extraire l'userId de l'URL
      const userId = currentUrl.split("?userId=")[1];

      // Stocker l'userId dans le local storage
      if (userId) {
        localStorage.setItem("userId", userId);
      }
    }
  }, []);

  return (
    <div className="main_container" style={{ width: "1500px", margin: "auto" }}>
      <header className="w-12/12">
        <Navbar />
        <Breadcrumb
          aria-label="Default breadcrumb example"
          className="bg-gray-200 w-12/12 h-10 pl-5 pt-2"
        >
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <div className="bg-gray-200 mt-10 pb-10 pt-10">
        <a href="/transfer">
          <div
            className="w-1/12 bg-green-500 text-white mx-auto text-center mb-10"
            style={{ fontSize: "25px", borderRadius: "5px" }}
          >
            <p>Transfer</p>
          </div>
        </a>
        <a href="/profile">
          <div
            className="w-1/12 bg-green-500 text-white mx-auto text-center mb-10"
            style={{ fontSize: "25px", borderRadius: "5px" }}
          >
            <p>Profile</p>
          </div>
        </a>
        <a href="/contact">
          <div
            className="w-1/12 bg-green-500 text-white mx-auto text-center"
            style={{ fontSize: "25px", borderRadius: "5px" }}
          >
            <p>Contact</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
