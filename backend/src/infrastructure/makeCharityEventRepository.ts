import { getRepository } from "typeorm";
import * as Yup from "yup";
import { CharityEvent } from "../domain/CharityEvent";
import { CharityEventRepository } from "../domain/CharityEventRepository";
import CharityEventModel from "../lib/models/CharityEvent";
import { Id } from "../domain/Id";

const makeCharityEventRepository = (): CharityEventRepository => {
  const repository = getRepository(CharityEventModel);

  const parser = (model: CharityEventModel): CharityEvent.Type => {
    return {
      ...model,
      startHours: model.start_hours,
      wppNumber: model.wpp_number,
      images: model.images as unknown as CharityEvent.Type["images"],
      occursOnWeekends: model.occurs_on_weekends === "true",
    };
  };

  const getNextId = () => Id.create();

  const find = async () => {
    const result = await repository.find({ relations: ["images"] });

    return result.map((event) => CharityEvent.create(parser(event)));
  };

  const findById = async (id: number) => {
    const result = await repository.findOneOrFail(
      { id },
      { relations: ["images"] }
    );

    return CharityEvent.create(parser(result));
  };

  const store = async (event: CharityEvent.CreateType) => {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      start_hours: Yup.string().required(),
      occurs_on_weekends: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(event, {
      abortEarly: false,
    });

    const result = repository.create(event);

    await repository.save(result);

    return CharityEvent.create(parser(result));
  };

  const remove = async (id: number) => {};

  return { find, getNextId, findById, store, remove };
};

export default makeCharityEventRepository;
