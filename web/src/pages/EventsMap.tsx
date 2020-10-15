import React, { useEffect, useState } from 'react'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import '../styles/pages/event-map.css'

import { motion, AnimatePresence } from 'framer-motion'

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon'
import API from '../services/api'
import ICharityEvent from '../interfaces/ICharityEvent'

export default function EventsMap() {
  const [events, setEvents] = useState<ICharityEvent[]>([])
  
  useEffect(() => {
    API.get('charity_events').then(response => {
      setEvents(response.data)
    })
  }, [])

  return (
    <AnimatePresence>
      <motion.div initial={{ x: -500 }} animate={{ x: 0 }}>
        <div id="page-map">
          <aside>
            <header>
              <img src={mapMarkerImg} alt="icon" />
              <h2>Choose an Event on map</h2>
              <p>Make people feel good</p>
            </header>
            <footer>
              <strong>Natal</strong>
              <span>Rio Grande do Norte</span>
            </footer>
          </aside>
          <Map
            center={[-5.7834861, -35.2450641]}
            zoom={12}
            style={{ width: '100%', height: '100%' }} >
            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            {events.map((event: ICharityEvent) => (
              <Marker
                key={event.id}
                position={[event.latitude, event.longitude]}
                icon={mapIcon}
              >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                  {event.name}
                  <Link to={`/events/${event.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
                </Popup>
              </Marker>
            ))}
          </Map>
          <Link to="/events/create" className="create-event">
            <FiPlus size={32} color="#FFF" />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
