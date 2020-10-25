import Image from "../models/Image"

export default {
    render(image: Image) {
        return {
            id: image.id,
            // TODO - Use .env
            url: `http://172.20.10.9:3333/uploads/${image.path}`
        }
    },
    renderMany(images: Image[]) {
        return images.map(image => this.render(image))
    }
}