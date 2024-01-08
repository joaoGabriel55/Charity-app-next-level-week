import { CharityEvent } from "./CharityEvent";

export interface CharityEventRepository {
  getNextId: () => string;
  find: () => Promise<Array<CharityEvent.Type>>;
  findById: (id: string) => Promise<CharityEvent.Type | undefined>;
  store: (event: CharityEvent.CreateType) => Promise<CharityEvent.Type>;
  remove: (id: string) => Promise<void>;
}
