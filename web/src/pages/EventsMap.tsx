import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Map, TileLayer } from 'react-leaflet'
import '../styles/pages/event-map.css'

import { motion, AnimatePresence } from 'framer-motion'


import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg';

export default function EventsMap() {
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
                    </Map>
                    <Link to="" className="create-event">
                        <FiPlus size={32} color="#FFF" />
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
