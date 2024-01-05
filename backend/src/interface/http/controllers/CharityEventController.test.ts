import { app } from "../server";
import request from "supertest";

describe("/charity-events", () => {
  const mockEvent = {
    name: "test",
    latitude: "test",
    longitude: "test",
    about: "test",
    instructions: "test",
    wppNumber: "test",
    occursOnWeekends: true,
    startHours: "test",
    images: [],
  };

  beforeEach(async () => {
    await request(app)
      .post("/charity-events")
      .send(mockEvent)
      .set("Accept", "application/json");
  });

  it("GET all", async () => {
    const response = await request(app).get("/charity-events");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("GET by id", async () => {
    const createResponse = await request(app)
      .post("/charity-events")
      .send(mockEvent)
      .set("Accept", "application/json");

    const response = await request(app).get(
      `/charity-events/${createResponse.body.id}`
    );

    expect(response.body.id).toBe(createResponse.body.id);
  });

  it("POST", async () => {
    const response = await request(app)
      .post("/charity-events")
      .send(mockEvent)
      .set("Accept", "application/json");


    expect(response.status).toBe(201);
    expect(response.body.name).toBe(mockEvent.name);
  })
});
