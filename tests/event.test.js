import mongoose from 'mongoose';
import request from 'supertest';
import app  from '../index.js';
import * as dotenv from "dotenv";
import userSchema from "../src/schemas/user.js";

dotenv.config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

let token = "";
let eventId = "";

describe("POST /user/registration", () => {
  it("Should create a user", async () => {
    const res = await request(app)
      .post("/user/registration")
      .send({ email: "san@gmail.com", password: "123456" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully!");
  });
});

describe("POST /user/login", () => {
  it("Should create a JWT Token", async () => {
    const res = await request(app)
        .post("/user/login")
        .send ({ email: "san@gmail.com", password: "123456" })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
    expect(res.statusCode).toBe(200);

    token = res.body.token;
  });
});

describe("POST /event", () => {
  it("Should create an event", async () => {
    const res = await request(app)
      .post("/event")
      .send({ title: "title", location: "india", date: "2023-12-12" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set({ authorization: token });
    expect(res.statusCode).toBe(201);
  });
});

describe("GET /event", () => {
  it("should return all events", async () => {
    const res = await request(app)
    .get("/event")
    .set({ authorization: token });
    expect(res.statusCode).toBe(200);

    eventId = res.body.data[0].id;
  });
});

describe("PUT /event", () => {
  it("Should update the event", async () => {
    const res = await request(app)
      .put(`/event/${eventId}`)
      .send({
        title: "title updated",
        location: "india updated",
        date: "2023-11-11",
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/x-www-form-urlencoded")
      .set({ authorization: token });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Event updated successfully!");
  });
});

describe("DELETE /event", () => {
  it("Should delete event", async () => {
    const res = await request(app)
    .delete(`/event/${eventId}`)
    .set({ authorization: token });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Event Deleted successfully");
    
    await userSchema.deleteOne({ email: "san@gmail.com" });
  });
});