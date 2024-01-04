import { CharityEvent } from "./CharityEvent";

export interface CharityEventRepository {
  getNextId: () => number;
  find: () => Promise<Array<CharityEvent.Type>>;
  findById: (id: number) => Promise<CharityEvent.Type>;
  store: (event: CharityEvent.CreateType) => Promise<CharityEvent.Type>;
}
