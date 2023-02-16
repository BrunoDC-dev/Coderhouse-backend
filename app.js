const express = require("express");
const app = express();
const compression = require('compression');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

// Log route and method of all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Log route and method of requests to nonexistent routes
app.use((req, res, next) => {
  res.status(404).send('Not found');
  logger.warn(`${req.method} ${req.path}`);
});

// Log errors from message and product APIs
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal server error');
});

// Add compression middleware
app.use(compression());

// Define routes
app.get("/randoms-nodebug", (req, res) => {
  let randoms = [];
  for (let i = 0; i < 10000; i++) {
    let numero = obtenerRandom(0, 9);
    randoms.push(numero);
  }
  res.send({ randoms: randoms });
});

app.get("/randoms-debug", (req, res) => {
  let randoms = [];
  for (let i = 0; i < 10000; i++) {
    let numero = obtenerRandom(0, 9);
    randoms.push(numero);
  }
  console.log(randoms);
  res.send({ randoms: randoms });
});

function obtenerRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start server
const PORT = parseInt(process.argv[2]) || 8080;
const server = app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

// Handle server errors
server.on("error", (error) => logger.error(`Server error: ${error}`));