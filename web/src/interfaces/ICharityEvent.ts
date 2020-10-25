export default interface ICharityEvent {
    id: number,
    latitude: number,
    longitude: number,
    name: string,
    about: string,
    wpp_number: string,
    instructions: string,
    start_hours: string,
    occurs_on_weekends: string
    images: Array<{
        id: number,
        url: string
    }>
}