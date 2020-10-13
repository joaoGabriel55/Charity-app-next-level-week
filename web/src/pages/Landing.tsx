import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages/landing.css'

import { FiArrowRight } from 'react-icons/fi'

import logoImg from '../images/logo.svg'

export default function Landing() {
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Charity-logo" />
                <main>
                    <h1>Help people in your city!</h1>
                    <p>Visit or participate of Charity events around your city.</p>
                </main>
                <div className="location">
                    <strong>Natal</strong>
                    <span>Rio Grande do Norte</span>
                </div>
                <Link to="/events" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    )
}
