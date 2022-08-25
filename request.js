const http = require('http');
const https = require('https');
const { urlToHttpOptions, URL } = require('url');

module['exports'] = async function request(url, { method = 'GET', headers = {}, body = '' } = {}) {
  return new Promise((resolve, reject) => {
    const options = urlToHttpOptions(new URL(url));
    options.method = method;
    options.headers = headers;

    const req = (options.protocol === 'https:' ? https : http).request(
      options,
      res => {
        let body = '';
        res
          .on('data', chunk => (body += chunk))
          .on('end', () => resolve({
            json:()=>JSON.parse(body),
            text: ()=>body,
            buffer: () => Buffer.from(body)
          }))
          .on('error', reject);
      }
    );
    req.write(body);
    req.end();
  });
}