import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/charity-event.css';
import Sidebar from "../components/Sidebar";
import mapIcon from '../utils/mapIcon'
import ICharityEvent from "../interfaces/ICharityEvent";
import API from "../services/api";
import { useParams } from "react-router-dom";


interface ICharityEventParams {
  id: string
}


export default function CharityEvent() {
  const params = useParams<ICharityEventParams>()
  const [event, setEvent] = useState<ICharityEvent>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    API.get(`charity_events/${params.id}`).then(response => {
      setEvent(response.data)
    })
  }, [params.id])

  if (!event)
    return <p>Loading...</p>

  return (
    <div id="page-charity-event">
      <Sidebar />
      <main>
        <div className="charity-event-details">
          <img src={event.images[activeImageIndex].url} alt={event.name} />

          <div className="images">
            {event.images.map((image, index) => (
              <button
                key={image.id}
                className={activeImageIndex === index ? 'active' : ''}
                type="button"
                onClick={() => {
                  setActiveImageIndex(index)
                }}>
                <img src={image.url} alt={event.name} />
              </button>
            ))}
          </div>

          <div className="charity-event-details-content">
            <h1>{event.name}</h1>
            <p>{event.about}</p>

            <div className="map-container">
              <Map
                center={[event.latitude, event.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[event.latitude, event.longitude]} />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`}>
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{event.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta às <br />
                {event.start_hours}
              </div>
              {event.occurs_on_weekends ?
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div> :
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              <a href={`https://wa.me/${event.wpp_number}`} target="_blank" rel="noopener noreferrer">
                Entrar em contato
              </a>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}