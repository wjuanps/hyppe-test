import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import {
  FiPower,
  FiTrash2,
  FiEdit2,
  FiRefreshCcw,
  FiEye
} from "react-icons/fi";

import userModel from "../../services/user";
import eventModel from "../../services/event";
import "./styles.css";

export default function Profile() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});

  const [isDeleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [eventUpdating, setEventUpdating] = useState("");
  const [eventDeleting, setEventDeleting] = useState("");

  const history = useHistory();

  async function fetchUser() {
    try {
      setLoading(true);
      let response = await userModel.user();
      let { data } = response.data;

      setUser(data);

      response = await eventModel.events();
      data = response.data.data;

      setEvents(data);

      setUpdating(false);
    } catch (error) {
      alert("Erro ao carregar dados do usuário");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleDeleteEvent(uuid) {
    try {
      setEventDeleting(uuid);
      setDeleting(true);
      await eventModel.destroy(uuid);

      setEvents(events.filter(event => event.uuid !== uuid));
    } catch (err) {
      alert("Erro ao deletar o evento");
    } finally {
      setDeleting(false);
    }
  }

  function handleLogout() {
    localStorage.clear();
    window.open("/profile", "_self");
  }

  function eventConfirmed(uuid, user) {
    if (user.events.length <= 0) return false;

    let confirmed = user.events.some(
      event => event.is_confirmed && event.uuid === uuid
    );

    return confirmed;
  }

  async function handleConfirmEvent(confirm, uuid) {
    try {
      setEventUpdating(uuid);
      setUpdating(true);
      const params = new URLSearchParams();
      params.append("is_confirmed", confirm);

      await eventModel.confirmPresence(uuid, params);
    } catch (error) {
      alert("Erro ao atualizar evento");
    } finally {
      fetchUser();
    }
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

        <button
          onClick={() => history.push("/events")}
          className="button-header"
        >
          {loading ? (
            <FiRefreshCcw className="icon-spin" size={22} color="#ffffff" />
          ) : (
            "Todos os Eventos"
          )}
        </button>
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

            {eventConfirmed(event.uuid, user) ? (
              <button
                onClick={() => handleConfirmEvent(0, event.uuid)}
                className="presenca-confirmada"
              >
                {updating && eventUpdating === event.uuid ? (
                  <FiRefreshCcw
                    className="icon-spin"
                    size={22}
                    color="#ffffff"
                  />
                ) : (
                  "Desmarcar Presença"
                )}
              </button>
            ) : (
              <button
                onClick={() => handleConfirmEvent(1, event.uuid)}
                className="marcar-presenca"
              >
                {updating && eventUpdating === event.uuid ? (
                  <FiRefreshCcw
                    className="icon-spin"
                    size={22}
                    color="#ffffff"
                  />
                ) : (
                  "Marcar Presença"
                )}
              </button>
            )}

            <div>
              <button
                className="detail"
                type="button"
                onClick={() => history.push(`/events/${event.uuid}/detail`)}
              >
                <FiEye size={20} color="#0faab9" />
              </button>

              <button
                className="edit"
                type="button"
                onClick={() => history.push(`/events/${event.uuid}`)}
              >
                <FiEdit2 size={20} color="#0faab9" />
              </button>

              <button
                className="delete"
                type="button"
                disabled={isDeleting}
                onClick={() => handleDeleteEvent(event.uuid)}
              >
                {isDeleting && eventDeleting === event.uuid ? (
                  <FiRefreshCcw
                    className="icon-spin"
                    size={18}
                    color="#0faab9"
                  />
                ) : (
                  <FiTrash2 size={20} color="#0faab9" />
                )}
              </button>
            </div>
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
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
  const [
    { value: da },
    ,
    { value: mo },
    ,
    { value: ye },
    ,
    { value: ho },
    ,
    { value: mi }
  ] = dateFormated.formatToParts(date);

  return `
    ${da}/${mo}/${ye} ${ho}:${mi}
  `;
};
