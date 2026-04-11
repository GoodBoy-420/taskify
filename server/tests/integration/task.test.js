import test from "node:test";
import assert from "node:assert";
import request from "supertest";

import app from "../../app.js";
import {
  setupDB,
  teardownDB,
  cleanupUser,
  cleanupTask,
} from "../setup/db.test.js";

let token = "";
const getToken = async () => {
  const login = await request(app).post("/api/v1/auth/login").send({
    email: process.env.Test_EMAIL,
    password: process.env.EMAIL_PASS,
  });

  return login?.body?.data?.token?.token;
};

test.before(async () => {
  await setupDB();
});

test("Register a new user", async () => {
  const res = await request(app).post("/api/v1/auth/register").send({
    name: process.env.Test_Name,
    email: process.env.Test_EMAIL,
    password: process.env.EMAIL_PASS,
  });

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data);
});

test("create a task", async () => {
  const token = await getToken();

  const res = await request(app)
    .post("/api/v1/task/create")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Learn Testing",
      description: "Supertest + Assert",
    });

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.success, true);
  assert.strictEqual(res.body.data.title, "Learn Testing");
});

test("get tasks", async () => {
  const token = await getToken();
  const res = await request(app)
    .get("/api/v1/task/get-tasks")
    .set("Authorization", `Bearer ${token}`);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
});

test.after(async () => {
  await cleanupUser(process.env.Test_EMAIL);
  await cleanupTask();
  await teardownDB();
});
