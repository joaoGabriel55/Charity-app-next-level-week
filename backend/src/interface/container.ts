import { asFunction, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import makeCharityEventRepository from "../infrastructure/makeCharityEventRepository";

export const loadContainer = (app: Application) => {
  const Container = createContainer({ injectionMode: "CLASSIC" });

  Container.register({
    charityEventRepository: asFunction(makeCharityEventRepository).singleton(),
  });

  app.use(scopePerRequest(Container));
};
