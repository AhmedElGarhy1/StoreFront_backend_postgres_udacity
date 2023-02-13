import app from "../../server";
import supertest from "supertest";

const request = supertest(app);

const testUser = {
  first_name: "test_user",
  last_name: "test_user",
  username: "username_of_test_user_" + Date.now(),
  password: "random pass",
};

let token: string;
let userId: string;

describe("test user endpoints", () => {
  it("check if server is running", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(404);
  });
  describe("POST - api/users/", () => {
    it("create user", async () => {
      const res = await request.post("/api/users/").send(testUser);
      const body = res.body;
      token = body.token;
      userId = body.data.id;
      expect(body.data.first_name).toBe(testUser.first_name);
      expect(body.data.password).not.toBe(testUser.password);
    });
  });

  describe("GET - api/users/", () => {
    it("get all users", async () => {
      const res = await request
        .get("/api/users/")
        .set("Authorization", "barear " + token);

      const users = res.body.data;
      const lastUser = users.pop();
      expect(lastUser.first_name).toBe(testUser.first_name);
      expect(lastUser.password).not.toBe(testUser.password);
    });
  });

  describe("GET /api/users/:id", () => {
    it("get user without token", async () => {
      const res = await request.get("/api/users/" + userId);
      expect(res.status).toBe(400);
    });
    it("get user with token", async () => {
      const res = await request
        .get("/api/users/" + userId)
        .set("Authorization", "barear " + token);
      const data = res.body.data;
      expect(res.status).toBe(200);
      expect(data.first_name).toBe(testUser.first_name);
      expect(data.password).not.toBe(testUser.password);
    });
  });
});
