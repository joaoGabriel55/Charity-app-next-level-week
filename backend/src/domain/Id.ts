import crypto from "crypto";
export namespace Id {
  export const create = () => crypto.randomUUID();
}
