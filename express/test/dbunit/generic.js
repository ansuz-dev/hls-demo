import db from "../../models/index.js";

const {
  Sequelize,
  User,
} = db;

const Op = Sequelize.Op;

const init = async () => {
  await User.bulkCreate([
    {
      id: 1,
      email: "johndoe20102020+1@gmail.com",
      passwordHash: "$2a$10$j7peVlx90qXMPiiqUldXpOU089ufeyN.DO1ZIVnef438yCsYfHD7C",
      type: "PERSON",
      state: "ENABLED",
      defaultLanguage: "VI",
    },
    {
      id: 2,
      email: "johndoe20102020+2@gmail.com",
      passwordHash: "$2a$10$j7peVlx90qXMPiiqUldXpOU089ufeyN.DO1ZIVnef438yCsYfHD7C",
      type: "PERSON",
      state: "CREATED",
      defaultLanguage: "VI",
    },
    {
      id: 3,
      email: "johndoe20102020+3@gmail.com",
      passwordHash: "$2a$10$j7peVlx90qXMPiiqUldXpOU089ufeyN.DO1ZIVnef438yCsYfHD7C",
      type: "PERSON",
      state: "BLOCKED",
      defaultLanguage: "VI",
    },
    {
      id: 4,
      email: "johndoe20102020+4@gmail.com",
      passwordHash: "$2a$10$j7peVlx90qXMPiiqUldXpOU089ufeyN.DO1ZIVnef438yCsYfHD7C",
      type: "PERSON",
      state: "ENABLED",
      defaultLanguage: "VI",
    },
  ]);
};

const clean = async () => {
  await User.destroy({where: {id: {[Op.ne]: null}}});
};

const dbunit = {
  init,
  clean,
};

export default dbunit;
