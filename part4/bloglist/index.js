const app = require('./app');
const config = require('./utils/config');
const http = require('http');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`server running on ${config.PORT}`);
});