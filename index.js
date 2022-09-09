"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const request_1 = __importDefault(require("./request"));
const DB_1 = __importDefault(require("./DB"));
module.exports = { request: request_1.default, DB: DB_1.default };
