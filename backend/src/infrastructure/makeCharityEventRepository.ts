import { getRepository } from "typeorm";
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
      occursOnWeekends: model.occurs_on_weekends,
    };
  };

  const getNextId = () => Id.create();

  const find = async () => {
    const result = await repository.find({ relations: ["images"] });

    return result.map((event) => CharityEvent.create(parser(event)));
  };

  const findById = async (id: string) => {
    const result = await repository.findOne({ id }, { relations: ["images"] });

    return result && CharityEvent.create(parser(result));
  };

  const store = async (event: CharityEvent.CreateType) => {
    const result = repository.create({
      ...event,
      wpp_number: event.wppNumber,
      start_hours: event.startHours,
      occurs_on_weekends: event.occursOnWeekends,
    });

    const saved = await repository.save(result);

    return CharityEvent.create(parser(saved));
  };

  const remove = async (id: string) => {
    await repository.delete({ id });
  };

  return { find, getNextId, findById, store, remove };
};

export default makeCharityEventRepository;
