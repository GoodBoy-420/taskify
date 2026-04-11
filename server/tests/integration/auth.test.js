import test from "node:test";
import assert from "node:assert";
import request from "supertest";

import app from "../../app.js";
import { setupDB, teardownDB, cleanupUser } from "../setup/db.test.js";

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

test("login a user", async () => {
  const res = await request(app).post("/api/v1/auth/login").send({
    email: process.env.Test_EMAIL,
    password: process.env.EMAIL_PASS,
  });

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data.token);
});

test.after(async () => {
  await cleanupUser(process.env.Test_EMAIL);
  await teardownDB();
});
