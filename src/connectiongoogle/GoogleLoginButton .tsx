import React from "react";

const GoogleLoginButton = () => {
  const handleGitHubLogin = () => {
    // Rediriger l'utilisateur vers l'URL d'authentification google
    window.location.href = "http://localhost:8080/login/oauth2/code/google";
  };

  return <button onClick={handleGitHubLogin}>Sign in with Google</button>;
};

export default GoogleLoginButton;
