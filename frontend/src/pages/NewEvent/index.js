import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft, FiRefreshCcw } from "react-icons/fi";
import InputMask from "react-input-mask";

import eventModel from "../../services/event";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function NewIncident() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();

      const date = eventDate
        .split("/")
        .reverse()
        .join("-");

      params.append("name", name);
      params.append("address", address);
      params.append("event_date", `${date} ${eventTime}`);

      await eventModel.create(params);

      setLoading(false);
      history.push("/profile");
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Erro no cadastro, tente novamente");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo evento</h1>
          <p>Descreva o evento detalhadamente para encontrar participantes.</p>

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
          <InputMask
            mask="99/99/9999"
            placeholder="Data"
            value={eventDate}
            required={true}
            onChange={e => setEventDate(e.target.value)}
          />
          <InputMask
            mask="99:99"
            placeholder="Hora"
            value={eventTime}
            required={true}
            onChange={e => setEventTime(e.target.value)}
          />

          <button className="button" type="submit">
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
