import React, { useState, useEffect } from "react";
import GoogleLoginButton from "../connectiongoogle/GoogleLoginButton ";
import RedirigerUserButton from "../compenents/register/RegisterUser";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Login failed");
      }

      const token = await response.text();

      const userInfoResponse = await fetch(
        "http://localhost:8080/auth/getUserInfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to retrieve user information");
      }

      const userInfo = await userInfoResponse.json();

      console.log(userInfo);
      localStorage.setItem("userId", userInfo);

      window.location.href = "http://localhost:3000/home";
    } catch (error) {
      console.error("An error has occurred", error);
    }
  };

  // Utilisez useEffect pour récupérer l'ID après le rendu initial
  useEffect(() => {
    const checkUserId = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/getuserid");

        if (response.ok) {
          const userIdFromServer = await response.text();

          console.log("UserID from server:", userIdFromServer);

          // Stocker l'ID dans le local storage
          localStorage.setItem("userId", userIdFromServer);
        } else {
          console.error(
            "Erreur lors de la récupération de l'ID, statut du serveur:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'ID", error);
      }
    };
    checkUserId();
  }, []);

  return (
    <div className="w-12/12">
      <div
        className="w-4/12 border border-black text-center"
        style={{
          margin: "100px auto 0 auto",
          height: "700px",
          borderRadius: "10px",
        }}
      >
        <div
          className="bg-green-500 text-white mx-auto"
          style={{
            width: "200px",
            height: "50px",
            fontSize: "25px",
            borderRadius: "5px",
            marginTop: "50px",
          }}
        >
          Pay My Buddy
        </div>
        <input
          className="border border-black w-11/12"
          style={{ height: "60px", marginTop: "50px", fontSize: "25px" }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <input
          className="border border-black w-11/12"
          style={{ height: "60px", margin: "50px 0 40px 0", fontSize: "25px" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <RedirigerUserButton />
        <button
          className="text-white"
          style={{
            width: "200px",
            height: "55px",
            background: "#3682E8",
            fontSize: "30px",
            fontWeight: "500",
            borderRadius: "5px",
            marginTop: "170px",
          }}
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-5">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
