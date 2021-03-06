export default interface ICharityEvent {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    about: string,
    instructions: string,
    wpp_number: string,
    start_hours: string,
    occurs_on_weekends: string
    images: Array<{
        id: number,
        url: string
    }>
}