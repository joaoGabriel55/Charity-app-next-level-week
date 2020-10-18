import Image from "../models/Image"

export default {
    render(image: Image) {
        return {
            id: image.id,
            // TODO - Use .env
            url: `http://192.168.0.44:3333/uploads/${image.path}`
        }
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}