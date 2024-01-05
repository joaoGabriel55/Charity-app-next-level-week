import { CharityEvent } from "./CharityEvent";

export namespace Image {
  export type Type = {
    id: number;
    path: string;
    charityEvent: CharityEvent.Type;
  };
}
