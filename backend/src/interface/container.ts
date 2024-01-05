import { asFunction, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { isTestEnv } from "../config/environment";
import makeCharityEventRepository from "../infrastructure/makeCharityEventRepository";
import makeCharityEventRepositoryMock from "../infrastructure/makeCharityEventRepositoryMock";

export const loadContainer = (app: Application) => {
  const Container = createContainer({ injectionMode: "CLASSIC" });

  Container.register({
    charityEventRepository: asFunction(
      !isTestEnv ? makeCharityEventRepository : makeCharityEventRepositoryMock
    ).singleton(),
  });

  app.use(scopePerRequest(Container));
};
