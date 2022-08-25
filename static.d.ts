import fs from 'fs';
import {requestfn} from './types'

declare function static<P extends String>(
  path: fs.PathLike,
  serverPath: P
): {
  METHODS: {
    USE: [P, requestfn][];
  };
};

export = static