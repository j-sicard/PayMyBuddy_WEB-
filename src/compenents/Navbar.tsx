"use client";
import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DefaultNavbar() {
  const handleLogOff = () => {
    // Vider le local storage
    localStorage.clear();

    // Rediriger vers la page d'accueil
    window.location.href = "http://localhost:3000/";
  };

  return (
    <Navbar fluid rounded className="w-12/12">
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold bg-green-500 text-white w-52 h-12 text-center br-10 rounded-lg pt-2">
          Pay My Buddy
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/home">Home</Navbar.Link>
        <Navbar.Link href="/transfer">Transfer</Navbar.Link>
        <Navbar.Link href="/profile">Profile</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
        <Navbar.Link onClick={handleLogOff}>Log off</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
