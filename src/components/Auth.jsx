import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError("Error al autenticar: " + err.message);
    }
  };

  return (
    <div className="card" style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
      {error && <p style={{ color: "#ef4444", margin: "10px 0" }}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="btn btn-primary" style={{ marginTop: "8px" }}>
          {isRegister ? "Registrarse" : "Entrar"}
        </button>
      </form>

      <button
        onClick={() => setIsRegister(!isRegister)}
        style={{
          background: "none",
          border: "none",
          color: "#2563eb",
          marginTop: "16px",
          cursor: "pointer",
          width: "100%",
          textAlign: "center"
        }}
      >
        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate aquí"}
      </button>
    </div>
  );
}