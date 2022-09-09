import DB from './DB';
declare const _default: {
    request: (url: string, { method, headers, body }?: {
        method?: string | undefined;
        headers?: {} | undefined;
        body?: string | undefined;
    }) => Promise<unknown>;
    DB: {
        new (): DB;
    };
};
export = _default;
