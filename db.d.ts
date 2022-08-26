declare class DB {
  constructor();
  load(): void;
  save(): void;
  create(db: String): void;
  add(db: String, data: any): void;
  remove(db: String, id: Number): void;
  edit(db: String, id: Number, data: any): void;
  get(db: String): any[];
  getItem(db: String, id: Number): any;
}
export = DB;
