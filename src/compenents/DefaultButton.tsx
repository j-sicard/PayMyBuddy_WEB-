import { Button } from "flowbite-react";
import React, { useState } from "react";

interface DefaultButtonProps {
  text: string;
  color: string;
  largeur: string;
  hauteur: string;
}

export default function DefaultButton({
  text,
  color,
  largeur,
  hauteur,
}: DefaultButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const buttonStyle = {
    background: color,
    width: largeur,
    height: hauteur,
  };

  const getUserIdFromLocalStorage = (): number | null => {
    const userIdString = localStorage.getItem("userId");
    return userIdString ? parseInt(userIdString, 10) : null;
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userId = getUserIdFromLocalStorage();

      if (userId === null) {
        // Gérer le cas où l'userId n'est pas trouvé dans le localStorage
        setError("L'utilisateur n'est pas connecté.");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/transfers/addFriend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: userId, friendEmail: email }),
        }
      );

      if (response.ok) {
        console.log("User registered successfully");
        setShowForm(false);
        // Rafraîchir la page après une opération réussie
        window.location.reload();
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    } catch (error) {
      console.error("Error registering user:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
    }
  };

  return (
    <div>
      <Button style={buttonStyle} onClick={handleButtonClick}>
        {text}
      </Button>

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label>
            E-mail:
            <input
              className="border border-black"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <button
            type="submit"
            className="text-white"
            style={{
              borderRadius: "5px",
              width: "150px",
              background: "#63b3a2",
              margin: "20px 0 20px 20px",
            }}
          >
            Recorder
          </button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
