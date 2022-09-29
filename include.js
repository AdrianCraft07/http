"use strict";
const IS_WEB = !!globalThis.window;
const globalThisA = globalThis;
if (!IS_WEB) {
    globalThis.fetch = require('./request');
}
if (IS_WEB) {
    globalThisA.include = async function (path) {
        const res = await fetch(path);
        const text = await res.text();
        const module = { exports: {} };
        new Function('module', 'exports', 'require', text)(module, module.exports, globalThisA.include);
        return module.exports;
    };
    globalThisA.__dirname = globalThis.location.href.split('/').slice(0, -1).join('/');
    globalThisA.__filename = globalThis.location.href;
}
else {
    globalThisA.include = async function (path) {
        if (isURL(path)) {
            const res = await fetch(path);
            const text = await res.text();
            const module = { exports: {} };
            new Function('module', 'exports', 'require', text)(module, module.exports, globalThisA.include);
            return module.exports;
        }
        return globalThis.require(path);
    };
    globalThisA.__dirname = globalThis.process.cwd();
    globalThisA.__filename = globalThis.process.argv[1];
}
function isURL(path) {
    return path.startsWith('http://') || path.startsWith('https://');
}

module.exports = globalThisA.include;