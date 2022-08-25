import http from 'http';

import request from './request';
import Router from './router';
import static from './static';
import db from './db';

import { requestT, method } from './types';

interface USE {
  name: String | undefined;
  METHODS: {
    get: [String, requestT][];
    put: [String, requestT][];
    post: [String, requestT][];
    delete: [String, requestT][];
  };
}
interface Server extends http.Server {
  use(callback: USE): void;
  run(): void;
  get: method;
  put: method;
  post: method;
  delete: method;
}
declare function HTTP(): Server;
HTTP.request = request;
HTTP.Router = Router;
HTTP.static = static;
HTTP.db = db;
export = HTTP;
