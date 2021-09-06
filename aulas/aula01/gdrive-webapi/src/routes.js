import { logger } from "./logger";

export default class Routes {
  constructor() {

  };

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(request, response) {
    response.end('Hello world');
  };

  async options(request, response) {
    response.writeHead(204);
    response.end('Hello world');
  };

  async post(request, response) {
    logger.info('post');
    response.end();
  };

  async get(request, response) {
    logger.info('get');
    response.end();
  };

  handler(request, response) {
    response.setHeader('Acess-Control-Allow-Origin', '*');
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute;

    return chosen.apply(this, [request, response]);
  };
};
