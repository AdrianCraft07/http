import DB from './DB';
import include from './include';
declare const _default: {
    request: (url: string, { method, headers, body }?: {
        method?: string | undefined;
        headers?: {} | undefined;
        body?: string | undefined;
    }) => Promise<unknown>;
    DB: typeof DB;
    include: typeof include;
};
export = _default;
