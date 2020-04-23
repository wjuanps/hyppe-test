import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import api from "../../services/api";
import auth from "../../services/auth";
import userModel from "../../services/user";

import logoImg from "../../assets/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("email", email);
      params.append("password", password);

      await userModel.create(params);

      let response = await auth.authenticate(params);
      let { auth_token } = response.data;

      localStorage.setItem("hyppe_auth_token", auth_token);

      window.open("/profile", "_self");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar
            os casos da sua ONG
          </p>

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

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
