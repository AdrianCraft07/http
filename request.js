"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
module.exports = async function request(url, { method = 'GET', headers = {}, body = '' } = {}) {
    return new Promise((resolve, reject) => {
        const options = (0, url_1.urlToHttpOptions)(new url_1.URL(url));
        options.method = method;
        options.headers = headers;
        const req = (options.protocol === 'https:' ? https_1.default : http_1.default).request(options, res => {
            let body = '';
            let array = [];
            res
                .on('data', chunk => {
                body += chunk;
                array.push(...chunk);
            })
                .on('end', () => resolve({
                json: () => JSON.parse(body),
                text: () => body,
                buffer: () => Buffer.from(array),
            }))
                .on('error', reject);
        });
        req.write(body);
        req.end();
    });
};
