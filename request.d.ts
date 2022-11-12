declare const _default: (url: string, { method, headers, body }?: {
    method?: string | undefined;
    headers?: {} | undefined;
    body?: string | undefined;
}) => Promise<{
    json: () => Object;
    text: () => string;
    buffer: () => Buffer;
}>;
export = _default;
