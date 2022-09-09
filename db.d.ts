declare const _default: {
    new (): {
        data: {
            [key: string]: {
                [key: string]: any;
            }[];
        };
        load(): void;
        save(): void;
        create(db: string): void;
        add(db: string, data: {
            [key: string]: any;
        }): void;
        remove(db: string, id: Number): void;
        edit(db: string, id: Number, newData: {
            [key: string]: any;
        }): void;
        get(db: string): {
            [key: string]: any;
        }[];
        getItem(db: string, id: Number): {
            [key: string]: any;
        } | undefined;
    };
};
export = _default;
