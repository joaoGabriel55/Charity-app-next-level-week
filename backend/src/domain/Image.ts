import { CharityEvent } from "./CharityEvent";

export namespace Image {
  export type Type = {
    id: string;
    path: string;
    charityEvent: CharityEvent.Type;
  };
}
