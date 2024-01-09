import React, { useState, useEffect } from "react";
import Withdraw from "../compenents/profile_components_debit/Withdraw";
import WithdrawBank from "../compenents/profile_components_crédit/WithdrawBank";
import Navbar from "../compenents/Navbar";
import { Breadcrumb } from "flowbite-react";

interface UserFO {
  id: number;
  first_name: string;
  last_name: string;
  balance: number;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserFO | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Récupérer userId depuis le stockage local
        const storedUserId = localStorage.getItem("userId");
        // Utiliser l'userID récupéré ou définir une valeur par défaut (1 dans cet exemple)
        const userId = storedUserId;

        const response = await fetch(
          `http://localhost:8080/accounts/${userId}/user`
        );
        const profile: UserFO = await response.json();

        setUserProfile(profile);
      } catch (error) {
        console.error("Erreur lors du chargement du profil :", error);
      }
    };

    fetchProfile();
  }, []);

  if (!userProfile) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="main_container" style={{ width: "1500px", margin: "auto" }}>
      <header className="w-12/12">
        <Navbar />
        <Breadcrumb
          aria-label="Default breadcrumb example"
          className="bg-gray-200 w-12/12 h-10 pl-5 pt-2"
        >
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/profile">Profile</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <div
        className="information_section bg-gray-200 mt-10 mb-10"
        style={{ padding: "20px 0 20px 20px" }}
      >
        <h2>Informations de l'utilisateur</h2>
        <p>First name : {userProfile.first_name}</p>
        <p>Last name : {userProfile.last_name}</p>
        <p>Balance : {userProfile.balance}</p>
      </div>
      <div>
        <WithdrawBank />
        <Withdraw />
      </div>
    </div>
  );
};

export default Profile;
