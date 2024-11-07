const request = require("supertest");
const app = require("./app");

describe("Testing Endpoints", () => {
  test("GET /restaurant", async () => {
    const response = await request(app).get("/restaurant");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        name: "AppleBees",
        location: "Texas",
        cuisine: "FastFood",
        createdAt: "2024-11-06T14:22:12.037Z",
        updatedAt: "2024-11-06T14:22:12.037Z",
      },
      {
        id: 2,
        name: "LittleSheep",
        location: "Dallas",
        cuisine: "Hotpot",
        createdAt: "2024-11-06T14:22:12.037Z",
        updatedAt: "2024-11-06T14:22:12.037Z",
      },
      {
        id: 3,
        name: "Spice Grill",
        location: "Houston",
        cuisine: "Indian",
        createdAt: "2024-11-06T14:22:12.037Z",
        updatedAt: "2024-11-06T14:22:12.037Z",
      },
    ]);
    expect(response.body.length).toEqual(3);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("GET /restaurant/1", async () => {
    const response = await request(app).get("/restaurant/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Mcdonalds",
      location: "Paris",
      cuisine: "FastFood",
      createdAt: "2024-11-06T14:22:12.037Z",
      updatedAt: "2024-11-06T14:22:34.800Z",
    });
  });

  test("POST /restaurant", async () => {
    const response = await request(app)
      .post("/restaurant")
      .send({ name: "KFC", location: "London", cuisine: "FastFood" });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Successful");
  });

  test("POST Bad Request /restaurant", async () => {
    const response = await request(app)
      .post("/restaurant")
      .send({ name: "KFC", location: "London" });
    expect(response.status).toBe(200);
    expect(response.body.error).toEqual([
      {
        type: "field",
        msg: "Invalid value",
        path: "cuisine",
        location: "body",
      },
    ]);
  });

  test("PUT /restaurant/1", async () => {
    const response = await request(app)
      .put("/restaurant/1")
      .send({ name: "Mcdonalds", location: "Paris", cuisine: "FastFood" });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Successful");
  });

  test("DELETE /restaurant/3", async () => {
    const response = await request(app).delete("/restaurant/3");
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Successful");
  });
});
