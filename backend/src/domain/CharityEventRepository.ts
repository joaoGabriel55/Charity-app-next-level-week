import { CharityEvent } from "./CharityEvent";

export interface CharityEventRepository {
  find: () => Promise<Array<CharityEvent.Type>>;
  findById: (id: number) => Promise<CharityEvent.Type>;
  store: (event: CharityEvent.CreateType) => Promise<CharityEvent.Type>;
}
