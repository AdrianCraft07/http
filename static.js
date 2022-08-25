const fs = require('fs');
const request = require('./request');

let mime = '';
request(
  'https://raw.githubusercontent.com/micnic/mime.json/master/index.json'
).then(res => (mime = res));
let type = null;

module['exports'] = function static(path, serverPath = '/') {
  return {
    METHODS: {
      USE: [
        [
          serverPath,
          (req, res, next) => {
            if (!type) type = JSON.parse(mime);
            if (fs.existsSync(path + req.path)) {
              if (
                fs.statSync(path + req.path).isDirectory() &&
                fs.existsSync(path + req.path + '/index.html')
              )
                res.end(fs.readFileSync(path + req.path + '/index.html'));
              else {
                res.setHeader(
                  'Content-Type',
                  type[req.path.split('.').reverse()[0]]
                );
                res.end(fs.readFileSync(path + req.path));
              }
            } else if (fs.existsSync(path + req.path + '.html'))
              res.end(fs.readFileSync(path + req.path + '.html'));
            else next();
          },
        ],
      ],
    },
  };
};
