import React from 'react'
import { Link } from 'react-router-dom'

import mapMarkerImg from '../images/map-marker.svg';


export default function AppIcon() {
  return (
    <>
      <Link to="/">
        <img src={mapMarkerImg} alt="Charity" />
      </Link>
    </>
  )
}
