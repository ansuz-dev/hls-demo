/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - state
 *         - defaultLanguage
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *           format: email
 *         state:
 *           type: string
 *           enum: [CREATED]
 *         defaultLanguage:
 *           type: string
 *           minLength: 2
 *           maxLength: 2
 */
