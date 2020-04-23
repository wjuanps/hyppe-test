import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2, FiCheck } from "react-icons/fi";

import api from "../../services/api";
import userModel from "../../services/user";
import eventModel from "../../services/event";
import "./styles.css";

export default function Profile() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function fetchUser() {
    try {
      let response = await userModel.user();
      let { data } = response.data;

      setUser(data);
    } catch (error) {
      alert("Erro ao carregar dados do usuário");
    }
  }

  async function fetchEvents() {
    try {
      let response = await eventModel.events();
      let { data } = response.data;

      setEvents(data);
    } catch (error) {
      alert("Erro ao carregar eventos");
    }
  }

  useEffect(() => {
    fetchUser();
    fetchEvents();
  }, []);

  async function handleDeleteevent(id) {
    try {
      await api.delete(`events/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso");
    }
  }

  function handleLogout() {
    localStorage.clear();
    window.open("/profile", "_self");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo(a), {user.name}</span>

        <Link to="/events/new" className="button">
          Cadastrar novo evento
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <div className="header">
        <h1>Meus Eventos</h1>

        <button className="button-header">Todos os Eventos</button>
      </div>

      <ul>
        {events.map(event => (
          <li key={event.uuid}>
            <strong>NOME:</strong>
            <p>{event.name}</p>

            <strong>ENDEREÇO:</strong>
            <p>{event.address}</p>

            <strong>DATA E HORA:</strong>
            <p>
              <DateFormat event={event} />
            </p>

            <button
              className="marcar-presenca"
              onClick={() => handleDeleteevent(event.id)}
            >
              Marcar Presença
            </button>

            <button
              className="delete"
              type="button"
              onClick={() => handleDeleteevent(event.id)}
            >
              <FiTrash2 size={20} color="#0faab9" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const DateFormat = ({ event }) => {
  const date = new Date(event.event_date);
  const dateFormated = new Intl.DateTimeFormat("pt-br", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const [
    { value: da },
    ,
    { value: mo },
    ,
    { value: ye }
  ] = dateFormated.formatToParts(date);

  const time = new Date(event.event_time);
  const timeFormated = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const [{ value: ho }, , { value: mi }] = timeFormated.formatToParts(time);

  return `
    ${da}/${mo}/${ye} ${ho}:${mi}
  `;
};
