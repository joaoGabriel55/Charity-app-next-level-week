import { CharityEvent } from "./CharityEvent";

export interface CharityEventRepository {
  getNextId: () => number;
  find: () => Promise<Array<CharityEvent.Type>>;
  findById: (id: number) => Promise<CharityEvent.Type | undefined>;
  store: (event: CharityEvent.CreateType) => Promise<CharityEvent.Type>;
  remove: (id: number) => Promise<void>;
}
