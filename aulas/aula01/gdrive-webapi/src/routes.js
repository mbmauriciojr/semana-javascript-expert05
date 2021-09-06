import { logger } from './logger.js';
import FileHelper from './fileHelper.js';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultDownloadsFolder = resolve(__dirname, '../', 'downloads');

export default class Routes {
  constructor(downloadsFolder = defaultDownloadsFolder) {
    this.donwloadsFolder = downloadsFolder;
    this.fileHelper = FileHelper;
  };

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(request, response) {
    response.end('Hello world');
  };

  async options(request, response) {
    response.writeHead(204);
    response.end();
  };

  async post(request, response) {
    logger.info('post');
    response.end();
  };

  async get(request, response) {
    const files = await this.fileHelper.getFilesStatus(this.donwloadsFolder);

    response.writeHead(200);
    response.end(JSON.stringify(files));
  };

  handler(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute;

    return chosen.apply(this, [request, response]);
  };
};
