
const { db } = require("../secrets");

const env = process.env.NODE_ENV || "development";

if (env === "test") {
  db.database = db.database + "_test";
}

module.exports = {
  [env] : db,
};
