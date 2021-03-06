import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiRefreshCcw } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";
import auth from "../../services/auth";
import userModel from "../../services/user";

import logoImg from "../../assets/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("email", email);
      params.append("password", password);

      await userModel.create(params);

      let response = await auth.authenticate(params);
      let { auth_token } = response.data;

      localStorage.setItem("hyppe_auth_token", auth_token);

      setLoading(false);
      window.open("/profile", "_self");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente");
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e crie seus eventos</p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Já possuo cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            required={true}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            required={true}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button disabled={loading} className="button" type="submit">
            {loading ? (
              <FiRefreshCcw className="icon-spin" size={22} color="#ffffff" />
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
