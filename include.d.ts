declare const IS_WEB = true;
declare function isURL(path: string): boolean;
declare function include(path: string): Promise<{}>;
declare interface globalThis{
    include: typeof include;
}

export = include;
