import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { FiArrowLeft, FiRefreshCcw } from "react-icons/fi";
import InputMask from "react-input-mask";

import eventModel from "../../services/event";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function EditEvent() {
  const [eventUuid, setEventUuid] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const { uuid } = useParams();

  async function init(uuid) {
    let response = await eventModel.event(uuid);
    let { name, address, event_date } = response.data.data;

    let date = new Date(event_date);

    let day = `${date.getDate()}`.padStart(2, "0");
    let month = `${date.getMonth() + 1}`.padStart(2, "0");
    let year = `${date.getFullYear()}`;
    let hour = `${date.getHours()}`.padStart(2, "0");
    let minute = `${date.getMinutes()}`.padStart(2, "0");

    setEventUuid(response.data.data.uuid);
    setName(name);
    setAddress(address);
    setEventDate(`${day}/${month}/${year}`);
    setEventTime(`${hour}:${minute}`);
  }

  useEffect(() => {
    init(uuid);
  }, [uuid]);

  async function handleEditIncident(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const date = eventDate
        .split("/")
        .reverse()
        .join("-");

      const params = new URLSearchParams();
      params.append("name", name);
      params.append("address", address);
      params.append("event_date", `${date} ${eventTime}`);

      await eventModel.update(eventUuid, params);

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
          <h1>Editar evento</h1>
          <p>Descreva o evento detalhadamente para encontrar participantes</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleEditIncident}>
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
            placeholder="Data"
            mask="99/99/9999"
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
              "Atualizar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
