import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import CharityEvent from './CharityEvent'


@Entity('images')
export default class Image {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => CharityEvent, charityEvent => charityEvent.images)
    @JoinColumn({ name: 'charity_event_id' })
    charityEvent: CharityEvent
}