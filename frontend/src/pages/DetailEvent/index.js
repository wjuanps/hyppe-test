import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import eventModel from "../../services/event";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function DetailEvent() {
  const [event, setEvent] = useState({});
  const [participants, setParticipants] = useState([]);

  const [loading, setLoading] = useState(false);

  const { uuid } = useParams();

  async function init(uuid) {
    try {
      let response = await eventModel.datail(uuid);
      let { data } = response.data;

      setEvent(data.event);
      setParticipants(data.participants);
    } catch (error) {
      alert("Erro ao carregar evento");
    }
  }

  useEffect(() => {
    init(uuid);
  }, [uuid]);

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>{event.name}</h1>
          <p>{event.event_date}</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <div>
          <h1>Participantes</h1>

          {participants.length <= 0 ? (
            <h1 style={{ color: "#CA035B", marginTop: "30px" }}>
              Nenhum Participante
            </h1>
          ) : (
            <div class="list-group">
              {participants.map(participant => (
                <a href="#" className="list-group-item list-group-item-action">
                  <h3>{participant.name}</h3>
                  <span>
                    {participant.is_confirmed
                      ? "Confirmado"
                      : "Participação Cancelada"}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
