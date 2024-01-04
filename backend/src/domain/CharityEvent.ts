import { Image } from "./Image";

export namespace CharityEvent {
  type Props = {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    about: string;
    instructions: string;
    wppNumber: string;
    startHours: string;
    occursOnWeekends: boolean;
    images: Array<Image.Type>;
  };

  export type Type = Readonly<Props>;

  export type CreateType = Omit<Type, "images"> & {
    images: Array<{ path: string }>;
  };

  export const create = (event: Props): Type => {
    return {
      id: event.id,
      name: event.name,
      latitude: event.latitude,
      longitude: event.longitude,
      about: event.about,
      instructions: event.instructions,
      wppNumber: event.wppNumber,
      startHours: event.startHours,
      occursOnWeekends: event.occursOnWeekends,
      images: event.images,
    };
  };
}
