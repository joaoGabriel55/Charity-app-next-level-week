import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import CharityEvent from "./CharityEvent";

@Entity("images")
export default class Image {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  path: string;

  @ManyToOne(() => CharityEvent, (charityEvent) => charityEvent.images)
  @JoinColumn({ name: "charity_event_id" })
  charityEvent: CharityEvent;
}
