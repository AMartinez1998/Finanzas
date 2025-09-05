import { useState } from "react";
import "./App.css";

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      alert("✅ Usuario registrado con éxito");
      setIsLogin(true);
      setEmail("");
      setPassword("");
    } else {
      alert("❌ Completa todos los campos");
    }
  };

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      onLogin(); // << avisa al padre (App.jsx) de que ya inició sesión
    } else {
      alert("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="app-container">
      <div className="auth-box">
        <h2 className="auth-title">{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLogin ? (
          <button className="auth-button login" onClick={handleLogin}>
            Entrar
          </button>
        ) : (
          <button className="auth-button register" onClick={handleRegister}>
            Registrarse
          </button>
        )}

        <p className="auth-toggle">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail("");
              setPassword("");
            }}
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </span>
        </p>
      </div>
    </div>
  );
}
