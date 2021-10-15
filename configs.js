import path from "path";

// eslint-disable-next-line no-shadow
const __dirname = path.resolve();

const configs = {
  links: {base: "http://localhost:3000"},
  dirs: {
    static: path.join(__dirname, "webapp"),
    media: path.join(__dirname, "webapp/media"),
  },
};

export default configs;
