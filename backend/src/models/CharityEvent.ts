import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'


@Entity('charity_events')
export default class CharityEvent {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    start_hours: string

    @Column()
    occurs_on_weekends: string

    @OneToMany(() => Image, image => image.charityEvent, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'charity_event_id' })
    images: Image[]
}