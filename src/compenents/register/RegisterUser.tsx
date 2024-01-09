import React, { useState, ChangeEvent, MouseEvent } from "react";

interface RegisterFormProps {
  onRegister: (email: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegisterClick = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Utilisateur enregistré avec succès!");
        // Réinitialiser les champs après l'enregistrement
        setEmail("");
        setPassword("");
        onRegister(email, password);
      } else {
        console.error("Erreur lors de l'enregistrement de l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
    }
  };

  return (
    <form>
      <label className="">
        <input
          className="border border-black mr-5"
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label>
        <input
          className="border border-black mr-5"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button
        type="button"
        className=" w-2/12 bg-green-500 text-white"
        style={{ borderRadius: "5px" }}
        onClick={handleRegisterClick}
      >
        Send
      </button>
    </form>
  );
};

const RedirigerUser: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleRegister = () => {
    setShowForm(true);
  };

  const handleRegisterFormSubmit = (email: string, password: string) => {
    console.log(
      "Enregistrement avec email:",
      email,
      "et mot de passe:",
      password
    );
    // Réinitialiser les champs et masquer le formulaire après l'enregistrement
    setShowForm(false);
  };

  return (
    <div className=" w-11/12 mx-auto ">
      <button
        onClick={handleRegister}
        className="text-white w-2/12"
        style={{ background: "#3682E8", borderRadius: "5px" }}
      >
        register
      </button>
      <div className="mt-5">
        {showForm && <RegisterForm onRegister={handleRegisterFormSubmit} />}
      </div>
    </div>
  );
};

export default RedirigerUser;
