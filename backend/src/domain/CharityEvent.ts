import { Image } from "./Image";
import * as Yup from "yup";

export namespace CharityEvent {
  type Props = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
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

  export const validate = (event: CreateType) => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().min(50),
      instructions: Yup.string().required(),
      startHours: Yup.string().required(),
      occursOnWeekends: Yup.boolean().required(),
      wppNumber: Yup.string().required(),
      // images: Yup.array(Yup.object().shape({ path: Yup.string().required() }))
      //   .required()
      //   .min(1),
    });

    return schema.validateSync(event, { abortEarly: false });
  };
}
