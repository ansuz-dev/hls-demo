# Template

## Scripts

- `npm run init-secrets`
  Initialize the secrets file.

- `npm start`
  Start server locally on port 3000.

- `npm test`
  Run unit tests and integration tests.
  Test report is stored in `mochawesome-report` folder.

- `npm run migrate-test`
  Create / update database in `test` mode.
  Need to create the test database first.
  The test database should have `_test` suffix in the name.

- `npm run migrate`
  Create / update database in `development` mode.
  Need to create the development database first.

- `npm run lint`
  Lint source code with Eslint.
