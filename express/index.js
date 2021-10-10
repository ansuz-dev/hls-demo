/* eslint-disable no-console */
/* eslint-disable no-process-exit */
import http from "http";

import app from "./app.js";

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

// eslint-disable-next-line no-process-env
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case "EACCES":
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
  case "EADDRINUSE":
    console.error(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
};

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is starting on port=[${port}]`);
});
server.on("error", onError);

export default app;
