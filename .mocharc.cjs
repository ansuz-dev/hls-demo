module.exports = {
  diff: true,
  color: true,
  extension: ["js"],
  opts: false,
  package: "./package.json",
  reporter: "mochawesome",
  timeout: 15000,
  ui: "bdd",
  slow: 75,
  require: ["express/test/mocha.env.js"],
};
