require('dotenv').config()

import Image from "../models/Image"

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `${process.env.APP_IMAGE_URL}/${image.path}`
        }
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}