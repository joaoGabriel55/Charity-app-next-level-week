import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import Image from "./Image";

@Entity("charity_events")
export default class CharityEvent {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  name: string;

  @Column({ type: "decimal" })
  latitude: number;

  @Column({ type: "decimal" })
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  wpp_number: string;

  @Column()
  start_hours: string;

  @Column()
  occurs_on_weekends: boolean;

  @OneToMany(() => Image, (image) => image.charityEvent, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "charity_event_id" })
  images: Image[];
}
