declare const _default: (url: string, { method, headers, body }?: {
    method?: string | undefined;
    headers?: {} | undefined;
    body?: string | undefined;
}) => Promise<{buffer():Buffer,text():string,json():Object}>;
export = _default;
