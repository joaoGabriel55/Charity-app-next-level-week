import CharityEvent from "../models/CharityEvent"
import imagesView from "./imagesView"

export default {
    render(event: CharityEvent) {
        return {
            id: event.id,
            name: event.name,
            latitude: event.latitude,
            longitude: event.longitude,
            about: event.about,
            instructions: event.instructions,
            wpp_number: event.wpp_number,
            start_hours: event.start_hours,
            occurs_on_weekends: event.occurs_on_weekends,
            images: imagesView.renderMany(event.images)
        }
    },
    renderMany(events: CharityEvent[]) {
        return events.map(event => this.render(event))
    }
}