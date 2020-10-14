import { getRepository } from 'typeorm'
import CharityEvent from '../models/CharityEvent'
import charityEventView from '../views/charityEventView'

import * as Yup from 'yup'


const index = async () => {
    const repository = getRepository(CharityEvent)

    const result = await repository.find({
        relations: ['images']
    })

    return charityEventView.renderMany(result)
}

const indexById = async (id: number) => {
    const repository = getRepository(CharityEvent)

    const result = await repository.findOneOrFail({ id }, {
        relations: ['images']
    })

    return charityEventView.render(result)
}

const store = async (event: any) => {
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        latitude: Yup.number().required(),
        longitude: Yup.number().required(),
        about: Yup.string().required().max(300),
        instructions: Yup.string().required(),
        start_hours: Yup.string().required(),
        occurs_on_weekends: Yup.string().required(),
        images: Yup.array(
            Yup.object().shape({
                path: Yup.string().required()
            })
        )
    })

    await schema.validate(event, {
        abortEarly: false
    })

    const repository = getRepository(CharityEvent)

    const result = repository.create(event)

    await repository.save(result)

    return result
}


export default { store, index, indexById }