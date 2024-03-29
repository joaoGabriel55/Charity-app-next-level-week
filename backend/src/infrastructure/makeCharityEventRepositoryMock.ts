import { CharityEvent } from "../domain/CharityEvent";
import { CharityEventRepository } from "../domain/CharityEventRepository";
import { Id } from "../domain/Id";

const mockData: Array<CharityEvent.Type> = [];

const makeCharityEventRepositoryMock = (): CharityEventRepository => {
  const getNextId = () => Id.create();

  const find = async () => {
    return mockData;
  };

  const findById = async (id: string) => {
    const result = mockData.find((event) => event.id === id);

    return result && CharityEvent.create({ ...result, images: [] });
  };

  const store = async (event: CharityEvent.CreateType) => {
    const newEvent = CharityEvent.create({
      ...event,
      images: [],
    });

    mockData.push(newEvent);

    return mockData[mockData.length - 1];
  };

  const remove = async (id: string) => {
    mockData.splice(
      mockData.findIndex((event) => event.id === id),
      1
    );
  };

  return { find, getNextId, findById, store, remove };
};

export default makeCharityEventRepositoryMock;
