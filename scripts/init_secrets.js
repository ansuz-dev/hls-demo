
import fs from "fs";
import path from "path";
import crypto from "crypto";

function initSecrets() {
  // create secrets.js
  const secretsFile = path.join(__dirname, "../secrets.js");
  if (fs.existsSync(secretsFile))
    return false;

  const secrets = {
    db: {
      username: "",
      password: "",
      database: "template",
      host: "127.0.0.1",
      dialect: "mysql",
      logging: false,
    },
    cookie: {
      secret: crypto.randomBytes(48).toString("base64"),
    },
    jwt: {
      user: crypto.randomBytes(48).toString("base64"),
      confirmation: crypto.randomBytes(48).toString("base64"),
      reset: crypto.randomBytes(48).toString("base64"),
    },
  };

  fs.writeFileSync(
    secretsFile,
    `module.exports = ${JSON.stringify(secrets, null, 2)};`,
  );
}

initSecrets();
