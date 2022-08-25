import http from "http";
import fs from "fs";

export interface requestT extends http.IncomingMessage {
  body: String;
  path: String;
  params: {};
}
export interface responseT extends http.ServerResponse {}
export type next = () => void;
export type requestfn = (req: requestT, res: responseT, next: next) => void;
export type method = (path: fs.PathLike, callback: requestfn) => void;