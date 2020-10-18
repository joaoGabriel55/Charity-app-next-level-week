import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'react-simple-snackbar';

import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-charity-event.css';
import Sidebar from "../components/Sidebar";

import mapIcon from '../utils/mapIcon'
import API from "../services/api";
import SnackBarProps from '../utils/snackBarProps'

export default function CreateCharityEvent() {
  const history = useHistory()

  const { setSnackBarProps, success, error } = SnackBarProps
  const [openSnackbarSuccess] = useSnackbar(setSnackBarProps(success))
  const [openSnackbarError] = useSnackbar(setSnackBarProps(error))

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [startHours, setStartHours] = useState('')
  const [occursOnWeekends, setOccursOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedPreviewImages = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages(selectedPreviewImages)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const { latitude, longitude } = position

    const data = new FormData()
    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('start_hours', startHours)
    data.append('occurs_on_weekends', String(occursOnWeekends))

    images.forEach(image => data.append('images', image))

    await API.post('charity_events', data)
      .catch(err => {
        console.log(err)
        openSnackbarError(`Erro ao registrar Evento de caridade ${name}.`)
      })

    openSnackbarSuccess(`Evento de caridade ${name} registrado com sucesso!`)
    history.push('/events')
  }

  return (
    <div id="page-create-charity-event">
      <Sidebar />
      <main>
        <form className="create-charity-event-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Novo evento de caridade</legend>

            <Map
              center={[-5.7966384, -35.225095]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>
            <br />
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" value={about} onChange={event => setAbout(event.target.value)} maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {previewImages.map(preview => (
                  <img key={preview} src={preview} alt={name} />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple accept="image/*" onChange={handleSelectImages} type="file" id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário</label>
              <input id="opening_hours" value={startHours} onChange={event => setStartHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>
              <div className="button-select">
                <button
                  type="button"
                  className={occursOnWeekends ? 'active' : ''}
                  onClick={() => setOccursOnWeekends(true)}>
                  Sim
                </button>
                <button
                  className={!occursOnWeekends ? 'active' : ''}
                  onClick={() => setOccursOnWeekends(false)}
                  type="button">
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
