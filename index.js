const http = require('http');

const isJson = data =>
  toString.call(data) === '[object Array]' ||
  toString.call(data) === '[object Object]';

function HTTP() {
  let METHODS = {
    GET: [],
    PUT: [],
    POST: [],
    DELETE: [],
    USE: [],
    RESPONSE: {
      404: (req, res) => {
        res.end('Error 404');
      },
    },
  };
  const server = http.createServer((req, res) => {
    const [path, params] = req.url.split('?');
    req.path = path;
    req.params = paramsToObject(params);
    req.on('data', data => (req.body += data));

    res.setHeader('Content-Type', 'text/html');
    res.json = data => {
      res.setHeader('Content-Type', 'application/json');
      if(typeof data != 'string')data=JSON.stringify(data)
      res.end(data);
    };
    res.send = data => {
      if (isJson(data)) res.json(data);
      else res.end(data)
    };

    let URLS = [
      ...METHODS.USE.filter(([path]) => req.url.startsWith(path)).map(
        ([name, fn]) => fn
      ),
      ...METHODS[req.method]
        .filter(([path]) => path == req.url)
        .map(([name, fn]) => fn),
      function code_404(req, res) {
        res.writeHead(404);
        METHODS.RESPONSE[404](req, res);
      },
    ];

    url(
      req,
      res,
      (function (URLS) {
        let count = 0;
        return {
          next: function () {
            if (count < URLS.length)
              return { value: URLS[count++], done: false };
            else return { value: undefined, done: true };
          },
        };
      })(URLS)
    )();
  });
  server.use = callback => {
    Object.keys(callback.METHODS).forEach(method => {
      METHODS[method.toUpperCase()].push(...callback.METHODS[method]);
    });
  };
  server.METHODS = METHODS;
  server.run = () => server.listen(80);
  server.get = (path, callback) => METHODS.GET.push([path, callback]);
  server.put = (path, callback) => METHODS.PUT.push([path, callback]);
  server.post = (path, callback) => METHODS.POST.push([path, callback]);
  server.delete = (path, callback) => METHODS.DELETE.push([path, callback]);
  return server;
}
HTTP.request = require('./request');
HTTP.static = require('./static');
HTTP.Router = require('./router');
HTTP.db = require('./db');

function paramsToObject(params) {
  params ||= '';
  return Object.fromEntries(params.split('&').map(text => text.split('=')));
}
function url(req, res, next) {
  return () => {
    let itr = next.next();
    if (itr.done) return;
    else itr.value(req, res, url(req, res, next));
  };
}

module['exports'] = HTTP;
