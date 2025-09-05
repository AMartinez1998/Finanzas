import { useState } from "react";
import Login from "./Login";
import FinanceApp from "./FinanceApp";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setLoggedIn(false);
  };

  return (
    <>
      {loggedIn ? (
        <FinanceApp onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}
