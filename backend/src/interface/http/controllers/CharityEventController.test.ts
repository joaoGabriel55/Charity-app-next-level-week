import request from "supertest";
import { app } from "../server";

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

  const createCharityEvent = async () => {
    return await request(app)
      .post("/charity-events")
      .send(mockEvent)
      .set("Accept", "application/json");
  };

  describe("GET all", () => {
    describe("when there are no events", () => {
      it("returns an empty array", async () => {
        const response = await request(app).get("/charity-events");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
      });
    });

    describe("when there are events", () => {
      it("returns an array of events", async () => {
        await createCharityEvent();

        const response = await request(app).get("/charity-events");

        expect(response.status).toBe(200);
        expect(response.body.length > 0).toBeTruthy();
      });
    });
  });

  describe("GET by id", () => {
    describe("when event does not exist", () => {
      it("returns 404", async () => {
        const response = await request(app).get("/charity-events/33");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Charity event not found");
      });
    });

    describe("when event exists", () => {
      it("returns the event", async () => {
        const createResponse = await createCharityEvent();

        const response = await request(app).get(
          `/charity-events/${createResponse.body.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(mockEvent.name);
      });
    });
  });

  it("POST", async () => {
    const response = await createCharityEvent();

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(mockEvent.name);
  });

  describe("DELETE", () => {
    describe("when event does not exist", () => {
      it("returns 404", async () => {
        const response = await request(app).delete("/charity-events/33");

        expect(response.status).toBe(404);

        expect(response.body.error).toBe("Charity event not found");
      });
    });

    describe("when event exists", () => {
      it("returns 204", async () => {
        const createResponse = await createCharityEvent();
        const url = `/charity-events/${createResponse.body.id}`;

        const response = await request(app).delete(url);
        const responseAfterDelete = await request(app).get(url);

        expect(response.status).toBe(204);
        expect(responseAfterDelete.status).toBe(404);
      });
    });
  });
});
