import {method} from './types'

interface router {
  get: method;
  put: method;
  post: method;
  delete: method;
}
declare function Router(): router;
export = Router;
