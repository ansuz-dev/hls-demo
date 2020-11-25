
import fs from "fs";
import path from "path";
import crypto from "crypto";

const configDir = path.join(__dirname, "config");
fs.existsSync(configDir) || fs.mkdirSync(configDir);

function initCookie() {
  // create cookie.json
  const cookieConfig = path.join(configDir, "cookie.json");
  if (fs.existsSync(cookieConfig))
    return false;

  const data = {
    secret: crypto.randomBytes(48).toString("base64"),
  };

  fs.writeFileSync(
    cookieConfig,
    JSON.stringify(data, null, 2)
  );
}

function initJWT() {
  // create jwt.json
  const jwtConfig = path.join(configDir, "jwt.json");
  if (fs.existsSync(jwtConfig))
    return false;

  const data = {
    development: {
      user: crypto.randomBytes(48).toString("base64"),
      confirmation: crypto.randomBytes(48).toString("base64"),
      reset: crypto.randomBytes(48).toString("base64"),
    },
    test: {
      user: crypto.randomBytes(48).toString("base64"),
      confirmation: crypto.randomBytes(48).toString("base64"),
      reset: crypto.randomBytes(48).toString("base64"),
    },
    beta: {
      user: crypto.randomBytes(48).toString("base64"),
      confirmation: crypto.randomBytes(48).toString("base64"),
      reset: crypto.randomBytes(48).toString("base64"),
    },
    production: {
      user: crypto.randomBytes(48).toString("base64"),
      confirmation: crypto.randomBytes(48).toString("base64"),
      reset: crypto.randomBytes(48).toString("base64"),
    }
  };

  fs.writeFileSync(
    jwtConfig,
    JSON.stringify(data, null, 2)
  );
}

function initDatabase() {
  // create database.json
  const dbConfig = path.join(configDir, "database.json");
  if (fs.existsSync(dbConfig))
    return false;

  const data = {
    development: {
      username: "",
      password: "",
      database: "template",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false
    },
    test: {
      username: "",
      password: "",
      database: "template_test",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false
    },
    beta: {
      username: "",
      password: "",
      database: "template_beta",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false
    },
    production: {
      username: "",
      password: "",
      database: "template",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false
    }
  };

  fs.writeFileSync(
    dbConfig,
    JSON.stringify(data, null, 2)
  );
}

initCookie();
initJWT();
initDatabase();
