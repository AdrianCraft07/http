module["exports"] = function Router() {
  let server = {};
  let METHODS = {
    GET: [],
    PUT: [],
    POST: [],
    DELETE: [],
  };

  server.get = (path, callback) => METHODS.GET.push([path, callback]);
  server.put = (path, callback) => METHODS.PUT.push([path, callback]);
  server.post = (path, callback) => METHODS.POST.push([path, callback]);
  server.delete = (path, callback) => METHODS.DELETE.push([path, callback]);

  server.METHODS = METHODS

  return server
};
