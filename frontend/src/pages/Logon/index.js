import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn, FiRefreshCcw } from "react-icons/fi";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.png";

import auth from "../../services/auth";

import "./styles.css";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("password", password);

      let response = await auth.authenticate(params);
      let { auth_token } = response.data;

      localStorage.setItem("hyppe_auth_token", auth_token);

      setLoading(false);
      window.open("/profile", "_self");
    } catch (err) {
      alert("Email ou senha inválidos");
      setLoading(false);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1> Faça seu logon </h1>

          <input
            type="email"
            placeholder="Seu Email"
            value={email}
            required={true}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Sua Senha"
            value={password}
            required={true}
            onChange={e => setPassword(e.target.value)}
          />
          <button disabled={loading} className="button" type="submit">
            {loading ? (
              <FiRefreshCcw className="icon-spin" size={22} color="#ffffff" />
            ) : (
              "Entrar"
            )}
          </button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
