import { request, Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'

import charityEventService from './services/CharityEventService'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/charity_events', async (req, res) => {
    const result = await charityEventService.index()
    return res.status(200).json(result)
})

routes.get('/charity_events/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const result = await charityEventService.indexById(id)
    return res.status(200).json(result)
})

routes.post('/charity_events', upload.array('images'), async (req, res) => {
    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        wpp_number,
        start_hours,
        occurs_on_weekends
    } = req.body

    const requestImages = req.files as Express.Multer.File[]
    const images = requestImages.map(image => {
        return {
            path: image.filename
        }
    })

    const result = await charityEventService.store({
        name,
        latitude,
        longitude,
        about,
        instructions,
        wpp_number,
        start_hours,
        occurs_on_weekends: occurs_on_weekends === 'true' ? true : false,
        images
    })

    return res.status(201).json(result)
})

export default routes