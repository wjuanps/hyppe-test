import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import eventModel from "../../services/event";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function NewIncident() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("address", address);
      params.append("event_date", eventDate);
      params.append("event_time", eventTime);

      await eventModel.create(params);

      history.push("/profile");
    } catch (err) {
      console.log(err);
      alert("Erro no cadastro, tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo evento</h1>
          <p>
            Descreva o evento detalhadamente para encontrar um herói para
            resolver isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Nome do evento"
            value={name}
            required={true}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Endereço"
            value={address}
            required={true}
            onChange={e => setAddress(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data"
            value={eventDate}
            required={true}
            onChange={e => setEventDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="Hora"
            value={eventTime}
            required={true}
            onChange={e => setEventTime(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
