const {checkSchema} = require("express-validator");

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     RegisterData:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - defaultLanguage
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         defaultLanguage:
 *           type: string
 *           minLength: 2
 *           maxLength: 2
 */
const registerValidator = checkSchema({
  email: {
    in: ["body"],
    errorMessage: "Email is invalid",
    isEmail: true,
  },
  password: {
    in: ["body"],
    isLength: {
      errorMessage: "Password should be at least 6 chars long",
      options: {min: 6},
    },
  },
  defaultLanguage: {
    in: ["body"],
    isLength: {
      errorMessage: "Language code should be 2 chars long",
      options: {min: 2, max: 2},
    },
  },
});

export default {
  registerValidator,
};
